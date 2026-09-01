import { latestValue, type IndicatorCategory } from '../data/indicators';
import { useDashboard } from '../state/dashboardStore';

const CATS: Array<IndicatorCategory | 'All'> = [
  'All',
  'Demographics',
  'Real Estate',
  'Labour',
  'Business',
  'Tourism',
];

export function IndicatorCards() {
  const {
    categoryFilter,
    keyword,
    selectedIndicatorId,
    setCategoryFilter,
    setKeyword,
    setSelectedIndicatorId,
    filteredIndicators,
  } = useDashboard();
  const list = filteredIndicators();

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Indicators</h2>
        <div className="filters">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as IndicatorCategory | 'All')}
            aria-label="Category filter"
          >
            {CATS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Filter keyword…"
            aria-label="Keyword filter"
          />
        </div>
      </div>
      <div className="card-grid">
        {list.map((ind) => (
          <button
            key={ind.id}
            type="button"
            className={`ind-card ${selectedIndicatorId === ind.id ? 'selected' : ''}`}
            onClick={() => setSelectedIndicatorId(ind.id)}
          >
            <span className="ind-cat">{ind.category}</span>
            <strong>{ind.name}</strong>
            <span className="ind-val">
              {latestValue(ind)} <small>{ind.unit}</small>
            </span>
          </button>
        ))}
        {list.length === 0 && <p className="muted">No indicators match current filters.</p>}
      </div>
    </section>
  );
}
