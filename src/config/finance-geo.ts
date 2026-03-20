// Removed — not needed for Turkey-focused version

export interface StockExchange {
  id: string;
  name: string;
  shortName: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
  tier: 'mega' | 'major' | 'emerging';
  marketCap?: number;
  tradingHours?: string;
  timezone?: string;
  description?: string;
}

export interface FinancialCenter {
  id: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
  tier: 'global' | 'regional' | 'emerging';
  type?: string;
  gfciRank?: number;
  specialties?: string[];
  description?: string;
}

export interface CentralBank {
  id: string;
  name: string;
  shortName?: string;
  country: string;
  city?: string;
  lat: number;
  lon: number;
  currency: string;
  type?: string;
  description?: string;
}

export interface CommodityHub {
  id: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
  type: string;
  commodities?: string[];
  description?: string;
}

export const STOCK_EXCHANGES: StockExchange[] = [];
export const FINANCIAL_CENTERS: FinancialCenter[] = [];
export const CENTRAL_BANKS: CentralBank[] = [];
export const COMMODITY_HUBS: CommodityHub[] = [];
