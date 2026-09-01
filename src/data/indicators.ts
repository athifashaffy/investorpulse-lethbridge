export type IndicatorCategory =
  | 'Demographics'
  | 'Real Estate'
  | 'Labour'
  | 'Business'
  | 'Tourism';

export interface IndicatorSeries {
  id: string;
  name: string;
  category: IndicatorCategory;
  unit: string;
  description: string;
  values: Record<number, number>;
}

export const YEARS = [2020, 2021, 2022, 2023, 2024, 2025] as const;

export const INDICATORS: IndicatorSeries[] = [
  {
    id: 'pop-growth',
    name: 'Population growth rate',
    category: 'Demographics',
    unit: '%',
    description: 'Year-over-year estimated population growth for Lethbridge CMA.',
    values: { 2020: 1.1, 2021: 1.4, 2022: 1.8, 2023: 2.1, 2024: 2.0, 2025: 1.9 },
  },
  {
    id: 'building-permits',
    name: 'Building permit value',
    category: 'Real Estate',
    unit: '$M',
    description: 'Total value of building permits issued (residential + non-residential).',
    values: { 2020: 312, 2021: 355, 2022: 401, 2023: 428, 2024: 456, 2025: 471 },
  },
  {
    id: 'unemployment',
    name: 'Unemployment rate',
    category: 'Labour',
    unit: '%',
    description: 'Annual average unemployment rate.',
    values: { 2020: 8.4, 2021: 7.1, 2022: 5.6, 2023: 5.1, 2024: 4.9, 2025: 5.0 },
  },
  {
    id: 'median-income',
    name: 'Median household income',
    category: 'Demographics',
    unit: '$',
    description: 'Estimated median household income (current dollars).',
    values: { 2020: 78500, 2021: 81200, 2022: 84600, 2023: 87100, 2024: 89900, 2025: 92400 },
  },
  {
    id: 'downtown-vacancy',
    name: 'Downtown vacancy rate',
    category: 'Real Estate',
    unit: '%',
    description: 'Street-front commercial vacancy in downtown core.',
    values: { 2020: 11.2, 2021: 10.4, 2022: 9.1, 2023: 8.3, 2024: 7.8, 2025: 7.5 },
  },
  {
    id: 'industrial-absorption',
    name: 'Industrial land absorption',
    category: 'Business',
    unit: 'acres',
    description: 'Net industrial land absorbed for development.',
    values: { 2020: 18, 2021: 22, 2022: 31, 2023: 27, 2024: 35, 2025: 33 },
  },
  {
    id: 'tourism-stays',
    name: 'Tourism overnight stays',
    category: 'Tourism',
    unit: 'nights',
    description: 'Estimated hotel and short-stay overnight visits.',
    values: { 2020: 210000, 2021: 245000, 2022: 318000, 2023: 352000, 2024: 371000, 2025: 386000 },
  },
  {
    id: 'business-licenses',
    name: 'Business license count',
    category: 'Business',
    unit: 'licenses',
    description: 'Active municipal business licenses at year end.',
    values: { 2020: 6420, 2021: 6588, 2022: 6810, 2023: 7025, 2024: 7210, 2025: 7395 },
  },
  {
    id: 'avg-home-price',
    name: 'Average home price',
    category: 'Real Estate',
    unit: '$',
    description: 'Average residential sale price.',
    values: { 2020: 312000, 2021: 345000, 2022: 378000, 2023: 392000, 2024: 401000, 2025: 412000 },
  },
  {
    id: 'labour-participation',
    name: 'Labour force participation',
    category: 'Labour',
    unit: '%',
    description: 'Labour force participation rate (15+).',
    values: { 2020: 66.2, 2021: 67.0, 2022: 67.8, 2023: 68.1, 2024: 68.4, 2025: 68.6 },
  },
  {
    id: 'agri-food-exports',
    name: 'Agri-food export proxy index',
    category: 'Business',
    unit: 'index',
    description: 'Indexed proxy for regional agri-food shipment intensity (2020=100).',
    values: { 2020: 100, 2021: 108, 2022: 117, 2023: 121, 2024: 129, 2025: 134 },
  },
  {
    id: 'airport-passengers',
    name: 'Airport passenger volume',
    category: 'Tourism',
    unit: 'passengers',
    description: 'Lethbridge Airport annual passenger count (sample).',
    values: { 2020: 42000, 2021: 51000, 2022: 78000, 2023: 92000, 2024: 101000, 2025: 108000 },
  },
];

export function latestYear(): number {
  return YEARS[YEARS.length - 1];
}

export function latestValue(ind: IndicatorSeries): number {
  return ind.values[latestYear()];
}
