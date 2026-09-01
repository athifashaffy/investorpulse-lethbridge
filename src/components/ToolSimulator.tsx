import { INDICATORS } from '../data/indicators';
import { useDashboard } from '../state/dashboardStore';

/** Lets judges demo UI updates without WebMCP-enabled Chrome. */
export function ToolSimulator() {
  const store = useDashboard();

  return (
    <section className="panel simulator">
      <div className="panel-head">
        <h2>Simulate tool calls</h2>
        <span className="muted">Works without WebMCP flag</span>
      </div>
      <div className="sim-actions">
        <button
          type="button"
          className="btn"
          onClick={() => {
            store.noteToolEvent(`simulate list_indicators → ${INDICATORS.length}`);
            alert(`list_indicators: ${INDICATORS.length} indicators (see cards)`);
          }}
        >
          list_indicators
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => {
            store.setCategoryFilter('Labour');
            store.setKeyword('');
            store.noteToolEvent('simulate filter_indicators → Labour');
          }}
        >
          filter_indicators (Labour)
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => {
            store.setSelectedIndicatorId('building-permits');
            store.setCompareYears([2021, 2025]);
            store.noteToolEvent('simulate compare_years → building-permits 2021 vs 2025');
          }}
        >
          compare_years
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => {
            store.setSiteQuery('industrial');
            store.setHighlightedSiteIds(
              store
                .filteredSites()
                .filter((s) => s.sector.toLowerCase().includes('industrial') || s.name.toLowerCase().includes('industrial'))
                .map((s) => s.id),
            );
            // set query first then highlight broadly
            store.setHighlightedSiteIds(['site-north-industrial', 'site-airport-logistics']);
            store.noteToolEvent('simulate search_sites → industrial');
          }}
        >
          search_sites (industrial)
        </button>
        <button
          type="button"
          className="btn primary"
          onClick={() => {
            const md = store.buildInvestorBrief();
            store.setBriefMarkdown(md);
            store.noteToolEvent('simulate export_investor_brief');
          }}
        >
          export_investor_brief
        </button>
      </div>
    </section>
  );
}
