import { useDashboard } from '../state/dashboardStore';

export function InvestorBriefPanel() {
  const { briefMarkdown, setBriefMarkdown, buildInvestorBrief, noteToolEvent } = useDashboard();

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Investor brief</h2>
        <button
          type="button"
          className="btn"
          onClick={() => {
            const md = buildInvestorBrief();
            setBriefMarkdown(md);
            noteToolEvent('UI: generated investor brief');
          }}
        >
          Generate brief
        </button>
      </div>
      {briefMarkdown ? (
        <pre className="brief">{briefMarkdown}</pre>
      ) : (
        <p className="muted">
          Call <code>export_investor_brief</code> via WebMCP (or generate here) to populate this panel.
        </p>
      )}
    </section>
  );
}
