import type { Hotspot, ConflictZone, MilitaryBase, UnderseaCable, NuclearFacility, StrategicWaterway, APTGroup, EconomicCenter, Spaceport, CriticalMineralProject } from '@/types';

// Hotspot levels are dynamically calculated based on news activity
// Escalation scores: 1=stable, 2=watchlist, 3=elevated, 4=high tension, 5=critical
export const INTEL_HOTSPOTS: Hotspot[] = [
  {
    id: 'ankara',
    name: 'Ankara',
    subtext: 'Başkent/Siyaset',
    lat: 39.9,
    lon: 32.9,
    location: 'Türkiye',
    keywords: ['turkey', 'ankara', 'erdogan', 'turkish', 'mit', 'tbmm', 'meclis', 'hükümet'],
    agencies: ['MİT', 'TSK', 'Cumhurbaşkanlığı'],
    description: 'Başkent. Siyasi merkez, MİT ve TSK karargahları.',
    status: 'Monitoring',
    escalationScore: 2,
    escalationTrend: 'stable',
    escalationIndicators: ['Siyasi gelişmeler', 'Güvenlik kararları'],
    history: {
      lastMajorEvent: 'Genel seçimler',
      lastMajorEventDate: '2023-05-28',
      precedentCount: 1,
      precedentDescription: 'Cumhurbaşkanlığı ve milletvekili seçimleri',
      cyclicalRisk: 'Yerel seçim dönemleri',
    },
    whyItMatters: 'NATO üyesi. Bölgesel güç. Suriye/Libya operasyonları. Kürt sorunu.',
  },
  {
    id: 'istanbul',
    name: 'İstanbul',
    subtext: 'Ekonomi/Ticaret',
    lat: 41.0,
    lon: 29.0,
    location: 'Türkiye',
    keywords: ['istanbul', 'bist', 'borsa', 'boğaz', 'bosphorus', 'marmara'],
    agencies: ['BDDK', 'SPK', 'Borsa İstanbul'],
    description: 'Ekonomik başkent. Borsa İstanbul. Boğaz geçişi.',
    status: 'Monitoring',
    escalationScore: 1,
    escalationTrend: 'stable',
    escalationIndicators: ['Piyasa hareketleri', 'Boğaz trafiği'],
    history: {
      lastMajorEvent: 'İstanbul depremi riski',
      lastMajorEventDate: '2023-01-01',
      precedentCount: 1,
      precedentDescription: '1999 Marmara depremi',
      cyclicalRisk: 'Deprem riski sürekli',
    },
    whyItMatters: 'Türkiye ekonomisinin kalbi. Boğaz stratejik geçiş noktası. Büyük deprem riski.',
  },
  {
    id: 'diyarbakir',
    name: 'Diyarbakır',
    subtext: 'Güneydoğu/Güvenlik',
    lat: 37.9,
    lon: 40.2,
    location: 'Türkiye',
    keywords: ['diyarbakir', 'pkk', 'kurdish', 'kürt', 'terör', 'güneydoğu', 'southeastern'],
    agencies: ['TSK', 'Jandarma', 'Emniyet'],
    description: 'Güneydoğu Anadolu güvenlik merkezi. PKK ile mücadele bölgesi.',
    status: 'Monitoring',
    escalationScore: 3,
    escalationTrend: 'stable',
    escalationIndicators: ['Sınır ötesi operasyonlar', 'İç güvenlik operasyonları'],
    history: {
      lastMajorEvent: 'Pençe operasyonları',
      lastMajorEventDate: '2024-01-01',
      precedentCount: 5,
      precedentDescription: 'Kuzey Irak ve Suriye operasyonları',
      cyclicalRisk: 'Bahar-yaz dönemi operasyonları',
    },
    whyItMatters: 'PKK terör sorunu. Sınır ötesi operasyonlar. Irak-Suriye sınırı.',
  },
  {
    id: 'hatay',
    name: 'Hatay',
    subtext: 'Suriye Sınırı',
    lat: 36.4,
    lon: 36.3,
    location: 'Türkiye',
    keywords: ['hatay', 'syria border', 'suriye sınırı', 'antakya', 'iskenderun', 'mülteci'],
    agencies: ['TSK', 'AFAD', 'Göç İdaresi'],
    description: 'Suriye sınırı. Mülteci akını. Deprem bölgesi (2023 Kahramanmaraş).',
    status: 'Monitoring',
    escalationScore: 3,
    escalationTrend: 'stable',
    escalationIndicators: ['Sınır güvenliği', 'Mülteci hareketleri', 'Deprem sonrası yeniden yapılanma'],
    history: {
      lastMajorEvent: 'Kahramanmaraş depremleri',
      lastMajorEventDate: '2023-02-06',
      precedentCount: 2,
      precedentDescription: '6 Şubat 2023 depremleri (M7.7 ve M7.6)',
      cyclicalRisk: 'Deprem riski sürekli, sınır gerginlikleri',
    },
    whyItMatters: 'Suriye iç savaşı sınır etkisi. 2023 deprem yıkımı. Mülteci sorunu.',
  },
];

export const STRATEGIC_WATERWAYS: StrategicWaterway[] = [
  { id: 'bosphorus', name: 'İSTANBUL BOĞAZI', lat: 41.1, lon: 29.0, description: 'Karadeniz erişimi. Montrö Sözleşmesi. Günlük 48.000+ gemi geçişi.' },
  { id: 'dardanelles', name: 'ÇANAKKALE BOĞAZI', lat: 40.2, lon: 26.4, description: 'Ege-Marmara bağlantısı. Stratejik deniz geçişi.' },
];

// No APT groups — removed for Turkey-focused version
export const APT_GROUPS: APTGroup[] = [];

// No active conflict zones within Turkey borders
export const CONFLICT_ZONES: ConflictZone[] = [];

// Military bases — only Turkey-related
export const MILITARY_BASES: MilitaryBase[] = [
  { id: 'incirlik', name: 'İncirlik Üssü', lat: 37.0, lon: 35.43, type: 'us-nato', description: 'ABD/Türkiye ortak kullanım. NATO üssü. Nükleer silah deposu.' },
  { id: 'izmir_nato', name: 'İzmir NATO Karargahı', lat: 38.42, lon: 27.14, type: 'us-nato', description: 'NATO Kara Komutanlığı karargahı.' },
  { id: 'kurecik', name: 'Kürecik Radar Üssü', lat: 38.84, lon: 37.95, type: 'us-nato', description: 'NATO füze savunma radar istasyonu.' },
  { id: 'ankara_tsk', name: 'TSK Karargahı', lat: 39.93, lon: 32.86, type: 'turkey', description: 'Türk Silahlı Kuvvetleri Genelkurmay Başkanlığı.' },
  { id: 'aksaz', name: 'Aksaz Deniz Üssü', lat: 36.81, lon: 28.38, type: 'turkey', description: 'Türk Deniz Kuvvetleri. Güney Ege ve Akdeniz.' },
  { id: 'golcuk', name: 'Gölcük Deniz Üssü', lat: 40.72, lon: 29.83, type: 'turkey', description: 'Donanma Komutanlığı. Marmara Denizi.' },
];

// No undersea cables — removed for Turkey-focused version
export const UNDERSEA_CABLES: UnderseaCable[] = [];

// Nuclear facilities — only Turkey
export const NUCLEAR_FACILITIES: NuclearFacility[] = [
  { id: 'akkuyu', name: 'Akkuyu NGS', lat: 36.14, lon: 33.53, type: 'plant', status: 'construction' },
];

export const SANCTIONED_COUNTRIES: Record<number, 'severe' | 'high' | 'moderate'> = {};

export const MAP_URLS = {
  world: 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json',
  us: 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json',
};

// Economic Centers — Turkey only
export const ECONOMIC_CENTERS: EconomicCenter[] = [
  { id: 'bist', name: 'Borsa İstanbul', type: 'exchange', lat: 41.0082, lon: 28.9784, country: 'Turkey', marketHours: { open: '10:00', close: '18:00', timezone: 'Europe/Istanbul' }, description: 'Borsa İstanbul (BIST) — Türkiye menkul kıymetler borsası' },
  { id: 'tcmb', name: 'TCMB', type: 'central-bank', lat: 39.9334, lon: 32.8597, country: 'Turkey', description: 'Türkiye Cumhuriyet Merkez Bankası — Para politikası, faiz kararları' },
  { id: 'bddk', name: 'BDDK', type: 'financial-hub', lat: 41.0082, lon: 28.9784, country: 'Turkey', description: 'Bankacılık Düzenleme ve Denetleme Kurumu' },
  { id: 'spk', name: 'SPK', type: 'financial-hub', lat: 39.9334, lon: 32.8597, country: 'Turkey', description: 'Sermaye Piyasası Kurulu' },
];

// No spaceports in Turkey
export const SPACEPORTS: Spaceport[] = [];

// Critical minerals — Turkey has significant boron and chromium
export const CRITICAL_MINERALS: CriticalMineralProject[] = [
  { id: 'eskisehir_boron', name: 'Eskişehir Bor', lat: 39.77, lon: 30.52, mineral: 'Boron', country: 'Turkey', operator: 'Eti Maden', status: 'producing', significance: 'Dünya bor rezervlerinin %73\'ü Türkiye\'de' },
  { id: 'elazig_chromium', name: 'Elazığ Krom', lat: 38.67, lon: 39.22, mineral: 'Chromium', country: 'Turkey', operator: 'Çeşitli', status: 'producing', significance: 'Türkiye dünya krom üretiminde ilk 10' },
];
