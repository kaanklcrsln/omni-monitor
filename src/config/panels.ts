import type { PanelConfig, MapLayers } from '@/types';

// ============================================
// TURKEY VARIANT — Türkiye GIS Monitor
// ============================================
const TURKEY_PANELS: Record<string, PanelConfig> = {
  map: { name: 'Türkiye Haritası', enabled: true, priority: 1 },
  'live-news': { name: 'Son Dakika', enabled: true, priority: 1 },
  turkey: { name: 'Türkiye Haberleri', enabled: true, priority: 1 },
  economy: { name: 'Ekonomi', enabled: true, priority: 1 },
  security: { name: 'Güvenlik', enabled: true, priority: 1 },
  energy: { name: 'Enerji', enabled: true, priority: 1 },
  disasters: { name: 'Afet & Deprem', enabled: true, priority: 1 },
  markets: { name: 'Piyasalar', enabled: true, priority: 1 },
  economic: { name: 'Ekonomik Göstergeler', enabled: true, priority: 1 },
  'satellite-fires': { name: 'Yangınlar', enabled: true, priority: 1 },
  climate: { name: 'İklim Anomalileri', enabled: true, priority: 2 },
  monitors: { name: 'Takip Listem', enabled: true, priority: 2 },
};

const TURKEY_MAP_LAYERS: MapLayers = {
  conflicts: false,
  bases: false,
  cables: false,
  pipelines: true,
  hotspots: true,
  ais: false,
  nuclear: false,
  irradiators: false,
  sanctions: false,
  weather: true,
  economic: false,
  waterways: true,
  outages: false,
  cyberThreats: false,
  datacenters: false,
  protests: true,
  flights: false,
  military: false,
  natural: true,
  spaceports: false,
  minerals: false,
  fires: true,
  // Data source layers
  ucdpEvents: false,
  displacement: false,
  climate: true,
  // Tech layers
  startupHubs: false,
  cloudRegions: false,
  accelerators: false,
  techHQs: false,
  techEvents: false,
  // Finance layers
  stockExchanges: false,
  financialCenters: false,
  centralBanks: false,
  commodityHubs: false,
};

const TURKEY_MOBILE_MAP_LAYERS: MapLayers = {
  ...TURKEY_MAP_LAYERS,
  pipelines: false,
  waterways: false,
  climate: false,
  protests: false,
};

// ============================================
// EXPORTS
// ============================================
export const DEFAULT_PANELS = TURKEY_PANELS;
export const DEFAULT_MAP_LAYERS = TURKEY_MAP_LAYERS;
export const MOBILE_DEFAULT_MAP_LAYERS = TURKEY_MOBILE_MAP_LAYERS;

// Monitor palette
export const MONITOR_COLORS = [
  '#44ff88',
  '#ff8844',
  '#4488ff',
  '#ff44ff',
  '#ffff44',
  '#ff4444',
  '#44ffff',
  '#88ff44',
  '#ff88ff',
  '#88ffff',
];

export const STORAGE_KEYS = {
  panels: 'worldmonitor-panels',
  monitors: 'worldmonitor-monitors',
  mapLayers: 'worldmonitor-layers',
  disabledFeeds: 'worldmonitor-disabled-feeds',
} as const;
