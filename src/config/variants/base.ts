// Base configuration — Turkey Monitor
import type { PanelConfig, MapLayers } from '@/types';

// Shared exports
export { SECTORS, COMMODITIES, MARKET_SYMBOLS } from '../markets';
export { UNDERSEA_CABLES } from '../geo';
export { AI_DATA_CENTERS } from '../ai-datacenters';

// API URLs
export const API_URLS = {
  yahooFinance: (symbol: string) =>
    `/api/yahoo-finance?symbol=${encodeURIComponent(symbol)}`,
  earthquakes: '/api/earthquakes',
  finnhub: (_symbols: string[]) => '',
  arxiv: (_category: string, _maxResults: number) => '',
  githubTrending: (_language: string, _since: string) => '',
  hackernews: (_type: string, _limit: number) => '',
};

// Refresh intervals
export const REFRESH_INTERVALS = {
  feeds: 5 * 60 * 1000,
  markets: 2 * 60 * 1000,
  crypto: 5 * 60 * 1000,
  predictions: 10 * 60 * 1000,
  ais: 10 * 60 * 1000,
  arxiv: 60 * 60 * 1000,
  githubTrending: 30 * 60 * 1000,
  hackernews: 5 * 60 * 1000,
};

// Monitor colors
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

// Storage keys
export const STORAGE_KEYS = {
  panels: 'worldmonitor-panels',
  monitors: 'worldmonitor-monitors',
  mapLayers: 'worldmonitor-layers',
  disabledFeeds: 'worldmonitor-disabled-feeds',
} as const;

// Type definitions for variant configs
export interface VariantConfig {
  name: string;
  description: string;
  panels: Record<string, PanelConfig>;
  mapLayers: MapLayers;
  mobileMapLayers: MapLayers;
}
