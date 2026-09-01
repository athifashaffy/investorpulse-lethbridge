import { useDashboard } from '../state/dashboardStore';

export function Header() {
  const { webmcpStatus, lastToolEvent } = useDashboard();
  return (
    <header className="header">
      <div className="brand">
        <div className="logo" aria-hidden />
        <div>
          <h1>InvestorPulse Lethbridge</h1>
          <p className="tagline">Municipal economic &amp; investment indicators — WebMCP-native demo</p>
        </div>
      </div>
      <div className="header-meta">
        <span className="sample-badge">SAMPLE DATA</span>
        {webmcpStatus === 'active' && <span className="mcp-badge ok">WebMCP tools active</span>}
        {webmcpStatus === 'unavailable' && (
          <span className="mcp-badge warn" title="Enable chrome://flags/#enable-webmcp-testing">
            WebMCP unavailable
          </span>
        )}
        {webmcpStatus === 'unknown' && <span className="mcp-badge">WebMCP checking…</span>}
        <span className="tool-event" title={lastToolEvent}>
          Last tool: {lastToolEvent}
        </span>
      </div>
    </header>
  );
}
