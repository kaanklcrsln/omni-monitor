import type { MonitoredAirport } from '@/types';

// Türkiye havalimanları
export const MONITORED_AIRPORTS: MonitoredAirport[] = [
  { iata: 'IST', icao: 'LTFM', name: 'İstanbul Havalimanı', city: 'İstanbul', country: 'Turkey', lat: 41.2753, lon: 28.7519, region: 'turkey' },
  { iata: 'SAW', icao: 'LTFJ', name: 'Sabiha Gökçen', city: 'İstanbul', country: 'Turkey', lat: 40.8986, lon: 29.3092, region: 'turkey' },
  { iata: 'ESB', icao: 'LTAC', name: 'Esenboğa', city: 'Ankara', country: 'Turkey', lat: 40.1281, lon: 32.9951, region: 'turkey' },
  { iata: 'ADB', icao: 'LTBJ', name: 'Adnan Menderes', city: 'İzmir', country: 'Turkey', lat: 38.2924, lon: 27.1570, region: 'turkey' },
  { iata: 'AYT', icao: 'LTAI', name: 'Antalya Havalimanı', city: 'Antalya', country: 'Turkey', lat: 36.8987, lon: 30.8005, region: 'turkey' },
  { iata: 'DLM', icao: 'LTBS', name: 'Dalaman Havalimanı', city: 'Muğla', country: 'Turkey', lat: 36.7131, lon: 28.7925, region: 'turkey' },
  { iata: 'TZX', icao: 'LTCG', name: 'Trabzon Havalimanı', city: 'Trabzon', country: 'Turkey', lat: 40.9950, lon: 39.7897, region: 'turkey' },
  { iata: 'GZT', icao: 'LTAJ', name: 'Gaziantep Havalimanı', city: 'Gaziantep', country: 'Turkey', lat: 36.9472, lon: 37.4787, region: 'turkey' },
];

export const FAA_AIRPORTS: string[] = [];

export const DELAY_SEVERITY_THRESHOLDS = {
  severe: { avgDelayMinutes: 60, delayedPct: 50 },
  major: { avgDelayMinutes: 45, delayedPct: 35 },
  moderate: { avgDelayMinutes: 30, delayedPct: 25 },
  minor: { avgDelayMinutes: 15, delayedPct: 15 },
};
