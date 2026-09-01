import { useDashboard } from '../state/dashboardStore';

export function SitesList() {
  const { siteQuery, setSiteQuery, setHighlightedSiteIds, filteredSites, highlightedSiteIds } =
    useDashboard();
  const sites = filteredSites();

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Investment sites</h2>
        <input
          value={siteQuery}
          onChange={(e) => {
            setSiteQuery(e.target.value);
            setHighlightedSiteIds([]);
          }}
          placeholder="Search sites (industrial, agri-food…)"
          aria-label="Search sites"
        />
      </div>
      <div className="sites-layout">
        <ul className="site-list">
          {sites.map((site) => {
            const on = highlightedSiteIds.includes(site.id) || (!highlightedSiteIds.length && !!siteQuery);
            return (
              <li key={site.id} className={`site-item ${on ? 'highlight' : ''}`}>
                <div>
                  <strong>{site.name}</strong>
                  <div className="muted">
                    {site.sector} · {site.acres} acres · {site.status}
                  </div>
                  <div className="muted">{site.address}</div>
                </div>
                <div className="coords">
                  {site.lat.toFixed(3)}, {site.lng.toFixed(3)}
                </div>
              </li>
            );
          })}
          {sites.length === 0 && <li className="muted">No sites matched.</li>}
        </ul>
        <div className="mini-map" aria-label="Schematic map of Lethbridge sample sites">
          <div className="map-label">Lethbridge (schematic)</div>
          {sites.map((site) => {
            const left = ((site.lng + 112.9) / 0.15) * 100;
            const top = ((49.76 - site.lat) / 0.15) * 100;
            const on = highlightedSiteIds.includes(site.id);
            return (
              <span
                key={site.id}
                className={`map-pin ${on ? 'on' : ''}`}
                style={{ left: `${Math.min(92, Math.max(4, left))}%`, top: `${Math.min(92, Math.max(4, top))}%` }}
                title={site.name}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
