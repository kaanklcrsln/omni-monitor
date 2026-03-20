// Removed — not needed for Turkey-focused version

export interface StartupHub {
  id: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
  tier: 'mega' | 'major' | 'emerging';
  unicorns?: number;
  description?: string;
}

export interface Accelerator {
  id: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
  tier: 'top' | 'major' | 'regional';
  type?: string;
  notable?: string[];
  founded?: number | string;
  description?: string;
}

export interface TechHQ {
  id: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
  category: string;
  type: string;
  company: string;
  marketCap?: string;
  employees?: number;
  description?: string;
}

export interface CloudRegion {
  id: string;
  name: string;
  provider: string;
  lat: number;
  lon: number;
  region: string;
  city?: string;
  country?: string;
  zones?: number;
  description?: string;
}

export const STARTUP_HUBS: StartupHub[] = [];
export const ACCELERATORS: Accelerator[] = [];
export const TECH_HQS: TechHQ[] = [];
export const CLOUD_REGIONS: CloudRegion[] = [];
