export type SiteStatus = 'Available' | 'Under review' | 'Committed';
export type SiteSector =
  | 'Industrial'
  | 'Agri-food'
  | 'Tech / Office'
  | 'Mixed-use'
  | 'Logistics';

export interface InvestmentSite {
  id: string;
  name: string;
  sector: SiteSector;
  acres: number;
  status: SiteStatus;
  address: string;
  lat: number;
  lng: number;
  summary: string;
}

/** Approximate coordinates around Lethbridge, Alberta */
export const SITES: InvestmentSite[] = [
  {
    id: 'site-north-industrial',
    name: 'North Industrial Expansion Parcel',
    sector: 'Industrial',
    acres: 42,
    status: 'Available',
    address: '36 St N corridor',
    lat: 49.72,
    lng: -112.82,
    summary: 'Serviced industrial land with rail adjacency (sample listing).',
  },
  {
    id: 'site-agri-hub',
    name: 'Agri-Food Processing Hub',
    sector: 'Agri-food',
    acres: 18,
    status: 'Under review',
    address: 'Sherring Business & Industrial Park',
    lat: 49.735,
    lng: -112.79,
    summary: 'Cold-chain ready pad sites for value-added agriculture.',
  },
  {
    id: 'site-downtown-innovation',
    name: 'Downtown Innovation Floorplate',
    sector: 'Tech / Office',
    acres: 1.2,
    status: 'Available',
    address: '3 Ave S / 5 St S',
    lat: 49.694,
    lng: -112.843,
    summary: 'Adaptive reuse office opportunity near City Hall.',
  },
  {
    id: 'site-river-mixed',
    name: 'River Valley Mixed-Use Block',
    sector: 'Mixed-use',
    acres: 3.5,
    status: 'Under review',
    address: 'Scenic Drive corridor',
    lat: 49.688,
    lng: -112.86,
    summary: 'Residential-over-retail concept site with river views.',
  },
  {
    id: 'site-airport-logistics',
    name: 'Airport Logistics Pad',
    sector: 'Logistics',
    acres: 12,
    status: 'Available',
    address: 'Lethbridge Airport vicinity',
    lat: 49.63,
    lng: -112.8,
    summary: 'Last-mile / air-cargo supportive logistics parcel.',
  },
  {
    id: 'site-west-campus',
    name: 'West Campus Commercial Node',
    sector: 'Mixed-use',
    acres: 6.0,
    status: 'Committed',
    address: 'University Drive W',
    lat: 49.678,
    lng: -112.87,
    summary: 'Anchor tenant committed; remaining pad for complementary retail.',
  },
];
