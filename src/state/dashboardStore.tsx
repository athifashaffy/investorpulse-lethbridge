import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  INDICATORS,
  latestValue,
  type IndicatorCategory,
  type IndicatorSeries,
} from '../data/indicators';
import { SITES, type InvestmentSite } from '../data/sites';

export interface DashboardState {
  categoryFilter: IndicatorCategory | 'All';
  keyword: string;
  selectedIndicatorId: string;
  compareYears: [number, number];
  siteQuery: string;
  highlightedSiteIds: string[];
  briefMarkdown: string;
  lastToolEvent: string;
  webmcpStatus: 'unknown' | 'active' | 'unavailable';
}

export interface DashboardActions {
  setCategoryFilter: (c: IndicatorCategory | 'All') => void;
  setKeyword: (k: string) => void;
  setSelectedIndicatorId: (id: string) => void;
  setCompareYears: (years: [number, number]) => void;
  setSiteQuery: (q: string) => void;
  setHighlightedSiteIds: (ids: string[]) => void;
  setBriefMarkdown: (md: string) => void;
  noteToolEvent: (msg: string) => void;
  setWebmcpStatus: (s: DashboardState['webmcpStatus']) => void;
  filteredIndicators: () => IndicatorSeries[];
  filteredSites: () => InvestmentSite[];
  buildInvestorBrief: () => string;
}

type Store = DashboardState & DashboardActions;

const DashboardContext = createContext<Store | null>(null);

const initial: DashboardState = {
  categoryFilter: 'All',
  keyword: '',
  selectedIndicatorId: INDICATORS[0].id,
  compareYears: [2023, 2025],
  siteQuery: '',
  highlightedSiteIds: [],
  briefMarkdown: '',
  lastToolEvent: 'No tool calls yet.',
  webmcpStatus: 'unknown',
};

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DashboardState>(initial);

  const setCategoryFilter = useCallback((categoryFilter: IndicatorCategory | 'All') => {
    setState((s) => ({ ...s, categoryFilter }));
  }, []);

  const setKeyword = useCallback((keyword: string) => {
    setState((s) => ({ ...s, keyword }));
  }, []);

  const setSelectedIndicatorId = useCallback((selectedIndicatorId: string) => {
    setState((s) => ({ ...s, selectedIndicatorId }));
  }, []);

  const setCompareYears = useCallback((compareYears: [number, number]) => {
    setState((s) => ({ ...s, compareYears }));
  }, []);

  const setSiteQuery = useCallback((siteQuery: string) => {
    setState((s) => ({ ...s, siteQuery }));
  }, []);

  const setHighlightedSiteIds = useCallback((highlightedSiteIds: string[]) => {
    setState((s) => ({ ...s, highlightedSiteIds }));
  }, []);

  const setBriefMarkdown = useCallback((briefMarkdown: string) => {
    setState((s) => ({ ...s, briefMarkdown }));
  }, []);

  const noteToolEvent = useCallback((lastToolEvent: string) => {
    setState((s) => ({ ...s, lastToolEvent }));
  }, []);

  const setWebmcpStatus = useCallback((webmcpStatus: DashboardState['webmcpStatus']) => {
    setState((s) => ({ ...s, webmcpStatus }));
  }, []);

  const filteredIndicators = useCallback(() => {
    const kw = state.keyword.trim().toLowerCase();
    return INDICATORS.filter((ind) => {
      const catOk = state.categoryFilter === 'All' || ind.category === state.categoryFilter;
      const kwOk =
        !kw ||
        ind.name.toLowerCase().includes(kw) ||
        ind.description.toLowerCase().includes(kw) ||
        ind.category.toLowerCase().includes(kw);
      return catOk && kwOk;
    });
  }, [state.categoryFilter, state.keyword]);

  const filteredSites = useCallback(() => {
    const q = state.siteQuery.trim().toLowerCase();
    if (!q) return SITES;
    return SITES.filter(
      (site) =>
        site.name.toLowerCase().includes(q) ||
        site.sector.toLowerCase().includes(q) ||
        site.status.toLowerCase().includes(q) ||
        site.address.toLowerCase().includes(q) ||
        site.summary.toLowerCase().includes(q),
    );
  }, [state.siteQuery]);

  const buildInvestorBrief = useCallback(() => {
    const inds = filteredIndicators();
    const sites = filteredSites();
    const [y1, y2] = state.compareYears;
    const lines: string[] = [
      '# InvestorPulse Lethbridge — Investor Brief',
      '',
      '> SAMPLE DATA — hackathon demo, not official City statistics.',
      '',
      `Generated from current dashboard filters.`,
      `- Category filter: **${state.categoryFilter}**`,
      `- Keyword: **${state.keyword || '(none)'}**`,
      `- Site query: **${state.siteQuery || '(none)'}**`,
      `- Compare years: **${y1}** vs **${y2}**`,
      '',
      '## Indicator snapshot',
      '',
    ];
    for (const ind of inds.slice(0, 8)) {
      const v1 = ind.values[y1];
      const v2 = ind.values[y2];
      const delta = v1 !== undefined && v2 !== undefined ? v2 - v1 : undefined;
      lines.push(
        `- **${ind.name}** (${ind.category}): latest ${latestValue(ind)} ${ind.unit}` +
          (delta !== undefined ? `; ${y1}→${y2} Δ ${delta > 0 ? '+' : ''}${delta} ${ind.unit}` : ''),
      );
    }
    lines.push('', '## Matching investment sites', '');
    if (sites.length === 0) {
      lines.push('_No sites matched current query._');
    } else {
      for (const site of sites) {
        lines.push(
          `- **${site.name}** — ${site.sector}, ${site.acres} acres, ${site.status} (${site.address})`,
        );
      }
    }
    lines.push(
      '',
      '## Why WebMCP',
      'Agents can call `list_indicators`, `filter_indicators`, `compare_years`, `export_investor_brief`, and `search_sites` in-page without scraping.',
      '',
    );
    return lines.join('\n');
  }, [filteredIndicators, filteredSites, state]);

  const value = useMemo<Store>(
    () => ({
      ...state,
      setCategoryFilter,
      setKeyword,
      setSelectedIndicatorId,
      setCompareYears,
      setSiteQuery,
      setHighlightedSiteIds,
      setBriefMarkdown,
      noteToolEvent,
      setWebmcpStatus,
      filteredIndicators,
      filteredSites,
      buildInvestorBrief,
    }),
    [
      state,
      setCategoryFilter,
      setKeyword,
      setSelectedIndicatorId,
      setCompareYears,
      setSiteQuery,
      setHighlightedSiteIds,
      setBriefMarkdown,
      noteToolEvent,
      setWebmcpStatus,
      filteredIndicators,
      filteredSites,
      buildInvestorBrief,
    ],
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard(): Store {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error('useDashboard must be used within DashboardProvider');
  return ctx;
}

/** Mutable bridge so WebMCP execute handlers can reach React state without re-registering. */
export const dashboardBridge: { current: Store | null } = { current: null };
