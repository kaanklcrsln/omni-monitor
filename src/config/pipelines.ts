import type { Pipeline } from '@/types';

export const PIPELINE_COLORS: Record<string, string> = {
  oil: '#ff6644',
  gas: '#44aaff',
};

// Türkiye'den geçen veya Türkiye'ye bağlanan boru hatları
export const PIPELINES: Pipeline[] = [
  // ===== PETROL BORU HATLARI =====
  {
    id: 'btc',
    name: 'BTC (Bakü-Tiflis-Ceyhan)',
    type: 'oil',
    status: 'operating',
    points: [[49.9, 40.4], [47.5, 41.3], [44.8, 41.7], [41.6, 41.6], [36.8, 39.5], [35.9, 37.0]],
    capacity: '1.2 milyon varil/gün',
    length: '1,768 km',
    operator: 'BP',
    countries: ['Azerbaycan', 'Gürcistan', 'Türkiye'],
  },
  {
    id: 'kirkuk-ceyhan',
    name: 'Kerkük-Ceyhan',
    type: 'oil',
    status: 'operating',
    points: [[44.4, 35.5], [42.5, 36.5], [40.0, 37.0], [37.0, 37.5], [35.9, 37.0]],
    capacity: '1.6 milyon varil/gün',
    length: '970 km',
    operator: 'BOTAŞ/SOMO',
    countries: ['Irak', 'Türkiye'],
  },

  // ===== DOĞALGAZ BORU HATLARI =====
  {
    id: 'tanap',
    name: 'TANAP (Trans Anadolu)',
    type: 'gas',
    status: 'operating',
    points: [[42.0, 41.6], [39.0, 40.0], [35.0, 39.0], [32.0, 38.5], [29.0, 39.5], [26.5, 40.5]],
    capacity: '16 bcm/yıl',
    length: '1,850 km',
    operator: 'TANAP',
    countries: ['Azerbaycan', 'Gürcistan', 'Türkiye'],
  },
  {
    id: 'turkstream',
    name: 'TürkAkım',
    type: 'gas',
    status: 'operating',
    points: [[38.5, 44.6], [35.0, 43.5], [31.0, 42.5], [29.0, 41.3]],
    capacity: '31.5 bcm/yıl',
    length: '930 km',
    operator: 'Gazprom',
    countries: ['Rusya', 'Türkiye'],
  },
  {
    id: 'blue-stream',
    name: 'Mavi Akım',
    type: 'gas',
    status: 'operating',
    points: [[37.8, 44.6], [35.5, 43.0], [33.0, 42.0], [31.0, 41.5]],
    capacity: '16 bcm/yıl',
    length: '1,213 km',
    operator: 'Gazprom/BOTAŞ',
    countries: ['Rusya', 'Türkiye'],
  },
  {
    id: 'iran-turkey',
    name: 'İran-Türkiye Doğalgaz',
    type: 'gas',
    status: 'operating',
    points: [[48.0, 38.5], [45.0, 38.2], [43.5, 37.0], [42.0, 37.2]],
    capacity: '14 bcm/yıl',
    length: '2,577 km',
    operator: 'NIGC/BOTAŞ',
    countries: ['İran', 'Türkiye'],
  },
];
