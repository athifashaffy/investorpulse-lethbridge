import { YEARS, type IndicatorSeries } from '../data/indicators';

interface Props {
  indicator: IndicatorSeries;
  compareYears: [number, number];
}

export function TrendChart({ indicator, compareYears }: Props) {
  const width = 560;
  const height = 220;
  const pad = 36;
  const vals = YEARS.map((y) => indicator.values[y]);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const span = max - min || 1;
  const points = YEARS.map((y, i) => {
    const x = pad + (i / (YEARS.length - 1)) * (width - pad * 2);
    const yPix = height - pad - ((indicator.values[y] - min) / span) * (height - pad * 2);
    return { y, x, yPix, v: indicator.values[y] };
  });
  const poly = points.map((p) => `${p.x},${p.yPix}`).join(' ');
  const [a, b] = compareYears;

  return (
    <div className="panel chart-card">
      <div className="chart-head">
        <h3>{indicator.name}</h3>
        <span className="muted">
          {indicator.category} · {indicator.unit}
        </span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="chart" role="img" aria-label={`Trend for ${indicator.name}`}>
        <polyline fill="none" stroke="#7CFFB2" strokeWidth="3" points={poly} />
        {points.map((p) => {
          const isCompare = p.y === a || p.y === b;
          return (
            <g key={p.y}>
              <circle cx={p.x} cy={p.yPix} r={isCompare ? 6 : 3.5} fill={isCompare ? '#F4C95F' : '#7CFFB2'} />
              <text x={p.x} y={height - 12} textAnchor="middle" className="axis">
                {p.y}
              </text>
              {isCompare && (
                <text x={p.x} y={p.yPix - 12} textAnchor="middle" className="axis accent">
                  {p.v}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <p className="chart-compare">
        Comparing <strong>{a}</strong> ({indicator.values[a]} {indicator.unit}) vs <strong>{b}</strong> (
        {indicator.values[b]} {indicator.unit}) — Δ{' '}
        <strong>
          {indicator.values[b] - indicator.values[a] > 0 ? '+' : ''}
          {(indicator.values[b] - indicator.values[a]).toFixed(2)}
        </strong>
      </p>
    </div>
  );
}
