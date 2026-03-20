export type PortType = 'container' | 'oil' | 'lng' | 'naval' | 'mixed' | 'bulk';

export interface Port {
  id: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
  type: PortType;
  rank?: number;
  note: string;
}

export const PORTS: Port[] = [
  // Konteyner Limanları
  { id: 'mersin', name: 'Mersin Limanı', lat: 36.80, lon: 34.63, country: 'Türkiye', type: 'container', rank: 1, note: 'Türkiye\'nin en büyük konteyner limanı. Akdeniz\'in ana kapısı. ~2M TEU.' },
  { id: 'ambarli', name: 'Ambarlı Limanı', lat: 41.00, lon: 28.69, country: 'Türkiye', type: 'container', rank: 2, note: 'İstanbul\'un en büyük konteyner terminali. Marmara Denizi. ~3.5M TEU.' },
  { id: 'kocaeli', name: 'Kocaeli (Derince)', lat: 40.75, lon: 29.82, country: 'Türkiye', type: 'mixed', rank: 3, note: 'Sanayi bölgesi limanı. Otomotiv ve kimya ihracatı.' },

  // Petrol/Enerji Terminalleri
  { id: 'ceyhan', name: 'Ceyhan Terminali', lat: 36.88, lon: 35.80, country: 'Türkiye', type: 'oil', note: 'BTC ve Kerkük-Ceyhan boru hatlarının denize çıkış noktası. BOTAŞ terminali.' },
  { id: 'aliaga', name: 'Aliağa (İzmir)', lat: 38.80, lon: 26.96, country: 'Türkiye', type: 'mixed', note: 'TÜPRAŞ rafinerisi. Gemi söküm, petrokimya. LNG terminali (EGEGAZ).' },
  { id: 'dortyol', name: 'Dörtyol (İskenderun)', lat: 36.85, lon: 36.22, country: 'Türkiye', type: 'oil', note: 'BOTAŞ petrol terminali. Kerkük-Ceyhan hattı çıkışı.' },

  // Deniz Kuvvetleri Üsleri
  { id: 'aksaz_port', name: 'Aksaz Deniz Üssü', lat: 36.81, lon: 28.38, country: 'Türkiye', type: 'naval', note: 'Türk Deniz Kuvvetleri güney üssü. Ege ve Akdeniz operasyonları.' },
  { id: 'golcuk_port', name: 'Gölcük Deniz Üssü', lat: 40.72, lon: 29.83, country: 'Türkiye', type: 'naval', note: 'Donanma Komutanlığı karargahı. Marmara Denizi.' },

  // Diğer Önemli Limanlar
  { id: 'trabzon', name: 'Trabzon Limanı', lat: 41.00, lon: 39.72, country: 'Türkiye', type: 'mixed', note: 'Karadeniz\'in en önemli limanı. Orta Asya transit ticareti.' },
  { id: 'samsun', name: 'Samsun Limanı', lat: 41.29, lon: 36.33, country: 'Türkiye', type: 'bulk', note: 'Karadeniz. Tahıl ve dökme yük.' },
  { id: 'izmir', name: 'İzmir Limanı (Alsancak)', lat: 38.44, lon: 27.14, country: 'Türkiye', type: 'container', note: 'Ege\'nin ana ticaret limanı. Kruvaziyer terminali.' },
  { id: 'antalya', name: 'Antalya Limanı', lat: 36.84, lon: 30.61, country: 'Türkiye', type: 'mixed', note: 'Turizm ve ticaret limanı. Batı Akdeniz.' },
  { id: 'iskenderun', name: 'İskenderun Limanı', lat: 36.59, lon: 36.17, country: 'Türkiye', type: 'mixed', note: 'Doğu Akdeniz. İSDEMİR çelik ihracatı. 2023 depreminden etkilendi.' },
];

export function getPortsByType(type: PortType): Port[] {
  return PORTS.filter((p) => p.type === type);
}

export function getTopContainerPorts(limit = 5): Port[] {
  return PORTS.filter((p) => p.type === 'container' && p.rank)
    .sort((a, b) => (a.rank ?? Infinity) - (b.rank ?? Infinity))
    .slice(0, limit);
}
