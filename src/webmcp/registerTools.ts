import { INDICATORS, YEARS, type IndicatorCategory } from '../data/indicators';
import { SITES } from '../data/sites';
import { dashboardBridge } from '../state/dashboardStore';

const CATEGORIES: Array<IndicatorCategory | 'All'> = [
  'All',
  'Demographics',
  'Real Estate',
  'Labour',
  'Business',
  'Tourism',
];

function store() {
  const s = dashboardBridge.current;
  if (!s) throw new Error('Dashboard store not ready');
  return s;
}

function getModelContext() {
  const docCtx = document.modelContext;
  const navCtx = navigator.modelContext;
  return docCtx || navCtx || null;
}

export async function registerWebMcpTools(signal?: AbortSignal): Promise<'active' | 'unavailable'> {
  const modelContext = getModelContext();
  if (!modelContext || typeof modelContext.registerTool !== 'function') {
    return 'unavailable';
  }

  const opts = signal ? { signal } : undefined;

  await modelContext.registerTool(
    {
      name: 'list_indicators',
      description:
        'List municipal economic indicators available on InvestorPulse Lethbridge (sample data). Returns id, name, category, unit, latest year value, and description.',
      inputSchema: {
        type: 'object',
        properties: {},
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: async () => {
        const s = store();
        const rows = INDICATORS.map((ind) => ({
          id: ind.id,
          name: ind.name,
          category: ind.category,
          unit: ind.unit,
          latestYear: YEARS[YEARS.length - 1],
          latestValue: ind.values[YEARS[YEARS.length - 1]],
          description: ind.description,
        }));
        s.noteToolEvent(`list_indicators → ${rows.length} indicators`);
        return {
          disclaimer: 'SAMPLE DATA — hackathon demo, not official City statistics.',
          count: rows.length,
          indicators: rows,
        };
      },
    },
    opts,
  );

  await modelContext.registerTool(
    {
      name: 'filter_indicators',
      description:
        'Filter visible indicators by category and/or keyword. Updates the dashboard UI to match. Categories: All, Demographics, Real Estate, Labour, Business, Tourism.',
      inputSchema: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            enum: CATEGORIES,
            description: 'Category filter. Use All to clear category filter.',
          },
          keyword: {
            type: 'string',
            description: 'Optional keyword matched against name, description, and category.',
          },
        },
        additionalProperties: false,
      },
      execute: async (input) => {
        const s = store();
        const category = (input.category as IndicatorCategory | 'All' | undefined) ?? 'All';
        const keyword = typeof input.keyword === 'string' ? input.keyword : '';
        s.setCategoryFilter(category);
        s.setKeyword(keyword);
        // Allow React to apply state before reading filtered list via bridge snapshot fields
        const matched = INDICATORS.filter((ind) => {
          const catOk = category === 'All' || ind.category === category;
          const kw = keyword.trim().toLowerCase();
          const kwOk =
            !kw ||
            ind.name.toLowerCase().includes(kw) ||
            ind.description.toLowerCase().includes(kw) ||
            ind.category.toLowerCase().includes(kw);
          return catOk && kwOk;
        }).map((ind) => ({ id: ind.id, name: ind.name, category: ind.category }));
        s.noteToolEvent(
          `filter_indicators → category=${category}, keyword="${keyword}", matches=${matched.length}`,
        );
        return {
          category,
          keyword,
          matchCount: matched.length,
          matches: matched,
          uiUpdated: true,
        };
      },
    },
    opts,
  );

  await modelContext.registerTool(
    {
      name: 'compare_years',
      description:
        'Compare a specific indicator between two years (2020–2025). Selects the indicator in the UI and updates the comparison chart.',
      inputSchema: {
        type: 'object',
        properties: {
          indicatorId: {
            type: 'string',
            description: `Indicator id. One of: ${INDICATORS.map((i) => i.id).join(', ')}`,
          },
          yearA: { type: 'number', description: 'First year (2020–2025)' },
          yearB: { type: 'number', description: 'Second year (2020–2025)' },
        },
        required: ['indicatorId', 'yearA', 'yearB'],
        additionalProperties: false,
      },
      execute: async (input) => {
        const s = store();
        const indicatorId = String(input.indicatorId);
        const yearA = Number(input.yearA);
        const yearB = Number(input.yearB);
        const ind = INDICATORS.find((i) => i.id === indicatorId);
        if (!ind) {
          return { error: `Unknown indicatorId: ${indicatorId}` };
        }
        if (!YEARS.includes(yearA as (typeof YEARS)[number]) || !YEARS.includes(yearB as (typeof YEARS)[number])) {
          return { error: 'yearA and yearB must be in 2020–2025' };
        }
        s.setSelectedIndicatorId(indicatorId);
        s.setCompareYears([yearA, yearB]);
        const vA = ind.values[yearA];
        const vB = ind.values[yearB];
        const delta = vB - vA;
        const pct = vA === 0 ? null : (delta / vA) * 100;
        s.noteToolEvent(`compare_years → ${ind.name}: ${yearA}=${vA} vs ${yearB}=${vB}`);
        return {
          indicatorId,
          name: ind.name,
          unit: ind.unit,
          yearA,
          yearB,
          valueA: vA,
          valueB: vB,
          delta,
          pctChange: pct === null ? null : Number(pct.toFixed(2)),
          uiUpdated: true,
          disclaimer: 'SAMPLE DATA — hackathon demo.',
        };
      },
    },
    opts,
  );

  await modelContext.registerTool(
    {
      name: 'export_investor_brief',
      description:
        'Generate a short markdown investor brief from the current dashboard filters and visible sites. Displays the brief in the UI and returns the markdown text.',
      inputSchema: {
        type: 'object',
        properties: {
          titleNote: {
            type: 'string',
            description: 'Optional note appended to the brief header.',
          },
        },
        additionalProperties: false,
      },
      execute: async (input) => {
        const s = store();
        let md = s.buildInvestorBrief();
        if (typeof input.titleNote === 'string' && input.titleNote.trim()) {
          md = md.replace(
            '# InvestorPulse Lethbridge — Investor Brief',
            `# InvestorPulse Lethbridge — Investor Brief\n\n_${input.titleNote.trim()}_`,
          );
        }
        s.setBriefMarkdown(md);
        s.noteToolEvent('export_investor_brief → brief panel updated');
        return { markdown: md, uiUpdated: true };
      },
    },
    opts,
  );

  await modelContext.registerTool(
    {
      name: 'search_sites',
      description:
        'Search sample Lethbridge investment/development sites by free-text query (name, sector, status, address). Highlights matches in the sites panel.',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search text, e.g. industrial, agri-food, available, downtown.',
          },
        },
        required: ['query'],
        additionalProperties: false,
      },
      execute: async (input) => {
        const s = store();
        const query = String(input.query ?? '');
        s.setSiteQuery(query);
        const q = query.trim().toLowerCase();
        const matches = SITES.filter(
          (site) =>
            !q ||
            site.name.toLowerCase().includes(q) ||
            site.sector.toLowerCase().includes(q) ||
            site.status.toLowerCase().includes(q) ||
            site.address.toLowerCase().includes(q) ||
            site.summary.toLowerCase().includes(q),
        );
        s.setHighlightedSiteIds(matches.map((m) => m.id));
        s.noteToolEvent(`search_sites → query="${query}", matches=${matches.length}`);
        return {
          query,
          matchCount: matches.length,
          sites: matches.map((m) => ({
            id: m.id,
            name: m.name,
            sector: m.sector,
            acres: m.acres,
            status: m.status,
            address: m.address,
            lat: m.lat,
            lng: m.lng,
          })),
          uiUpdated: true,
          disclaimer: 'SAMPLE DATA — hackathon demo.',
        };
      },
    },
    opts,
  );

  return 'active';
}
