import type { Feed } from '@/types';

// Helper to create RSS proxy URL (Vercel)
const rss = (url: string) => `/api/rss-proxy?url=${encodeURIComponent(url)}`;

// Source tier system for prioritization (lower = more authoritative)
export const SOURCE_TIERS: Record<string, number> = {
  // Tier 1 - Official & Wire Services
  'Anadolu Ajansı': 1,
  'Reuters Türkiye': 1,
  'AP Türkiye': 1,

  // Tier 2 - Major Turkish Outlets
  'TRT Haber': 2,
  'Hürriyet Daily News': 2,
  'Daily Sabah': 2,
  'Ahval News': 2,
  'Bianet': 2,
  'BBC Türkiye': 2,
  'Al Jazeera Türkiye': 2,
  'DW Türkiye': 2,

  // Tier 2 - Economy
  'TCMB': 2,
  'BIST Haberleri': 2,
  'Türkiye Ekonomi': 2,
  'Bloomberg HT': 2,

  // Tier 3 - Specialty
  'Türkiye Güvenlik': 3,
  'Türkiye Suriye': 3,
  'Türkiye Enerji': 3,
  'Türkiye Deprem': 3,
  'Türkiye Afet': 3,
  'AFAD': 2,
  'Kandilli': 2,
};

export function getSourceTier(sourceName: string): number {
  return SOURCE_TIERS[sourceName] ?? 4;
}

export type SourceType = 'wire' | 'gov' | 'intel' | 'mainstream' | 'market' | 'tech' | 'other';

export const SOURCE_TYPES: Record<string, SourceType> = {
  'Anadolu Ajansı': 'wire',
  'Reuters Türkiye': 'wire',
  'AP Türkiye': 'wire',
  'TRT Haber': 'gov',
  'TCMB': 'gov',
  'AFAD': 'gov',
  'Hürriyet Daily News': 'mainstream',
  'Daily Sabah': 'mainstream',
  'BBC Türkiye': 'mainstream',
  'Al Jazeera Türkiye': 'mainstream',
  'DW Türkiye': 'mainstream',
  'Ahval News': 'mainstream',
  'Bianet': 'mainstream',
  'Bloomberg HT': 'market',
  'BIST Haberleri': 'market',
  'Türkiye Ekonomi': 'market',
};

export function getSourceType(sourceName: string): SourceType {
  return SOURCE_TYPES[sourceName] ?? 'other';
}

export type PropagandaRisk = 'low' | 'medium' | 'high';

export interface SourceRiskProfile {
  risk: PropagandaRisk;
  reason?: string;
  stateAffiliated?: string;
  note?: string;
}

export const SOURCE_PROPAGANDA_RISK: Record<string, SourceRiskProfile> = {
  'TRT Haber': { risk: 'medium', reason: 'State broadcaster', stateAffiliated: 'Turkey' },
  'Anadolu Ajansı': { risk: 'medium', reason: 'State news agency', stateAffiliated: 'Turkey' },
  'Daily Sabah': { risk: 'medium', reason: 'Pro-government outlet' },
};

export function getSourcePropagandaRisk(sourceName: string): SourceRiskProfile {
  return SOURCE_PROPAGANDA_RISK[sourceName] ?? { risk: 'low' };
}

export function isStateAffiliatedSource(sourceName: string): boolean {
  return !!SOURCE_PROPAGANDA_RISK[sourceName]?.stateAffiliated;
}

// ============================================
// TURKEY FEEDS
// ============================================
const TURKEY_FEEDS: Record<string, Feed[]> = {
  turkey: [
    { name: 'Anadolu Ajansı', url: rss('https://www.aa.com.tr/en/rss/default?cat=turkey'), type: 'turkey' },
    { name: 'TRT Haber', url: rss('https://news.google.com/rss/search?q=site:trthaber.com+when:1d&hl=tr&gl=TR&ceid=TR:tr'), type: 'turkey', stateAffiliated: 'Turkey' },
    { name: 'Hürriyet Daily News', url: rss('https://www.hurriyetdailynews.com/rss'), type: 'turkey' },
    { name: 'Daily Sabah', url: rss('https://www.dailysabah.com/rssFeed/turkey'), type: 'turkey' },
    { name: 'Ahval News', url: rss('https://ahvalnews.com/rss.xml'), type: 'turkey' },
    { name: 'Bianet', url: rss('https://bianet.org/english/rss'), type: 'turkey' },
    { name: 'Reuters Türkiye', url: rss('https://news.google.com/rss/search?q=Turkey+Turkish+when:1d&hl=en-US&gl=US&ceid=US:en'), type: 'turkey' },
    { name: 'BBC Türkiye', url: rss('https://news.google.com/rss/search?q=site:bbc.com+Turkey+when:2d&hl=en-US&gl=US&ceid=US:en'), type: 'turkey' },
    { name: 'Al Jazeera Türkiye', url: rss('https://news.google.com/rss/search?q=site:aljazeera.com+Turkey+when:2d&hl=en-US&gl=US&ceid=US:en'), type: 'turkey' },
    { name: 'DW Türkiye', url: rss('https://news.google.com/rss/search?q=site:dw.com+Turkey+when:2d&hl=en-US&gl=US&ceid=US:en'), type: 'turkey' },
  ],
  economy: [
    { name: 'TCMB', url: rss('https://news.google.com/rss/search?q=TCMB+OR+"Central+Bank+Turkey"+OR+"Merkez+Bankasi"+when:3d&hl=en-US&gl=US&ceid=US:en'), type: 'economy' },
    { name: 'BIST Haberleri', url: rss('https://news.google.com/rss/search?q=BIST+OR+"Borsa+Istanbul"+when:3d&hl=en-US&gl=US&ceid=US:en'), type: 'economy' },
    { name: 'Türkiye Ekonomi', url: rss('https://news.google.com/rss/search?q=(Turkey+economy+OR+Turkish+lira+OR+inflation+Turkey+OR+TUIK)+when:2d&hl=en-US&gl=US&ceid=US:en'), type: 'economy' },
    { name: 'Bloomberg HT', url: rss('https://news.google.com/rss/search?q=site:bloomberght.com+when:2d&hl=tr&gl=TR&ceid=TR:tr'), type: 'economy' },
  ],
  security: [
    { name: 'Türkiye Güvenlik', url: rss('https://news.google.com/rss/search?q=(Turkey+military+OR+PKK+OR+Turkish+defense+OR+Turkish+drone+OR+TAI+OR+Bayraktar)+when:3d&hl=en-US&gl=US&ceid=US:en'), type: 'security' },
    { name: 'Türkiye Suriye', url: rss('https://news.google.com/rss/search?q=(Turkey+Syria+OR+Turkish+forces+Syria+OR+Turkiye+Libya)+when:3d&hl=en-US&gl=US&ceid=US:en'), type: 'security' },
  ],
  energy: [
    { name: 'Türkiye Enerji', url: rss('https://news.google.com/rss/search?q=(Turkey+energy+OR+TANAP+OR+TurkStream+OR+BOTAS+OR+Turkish+gas+OR+Akkuyu)+when:3d&hl=en-US&gl=US&ceid=US:en'), type: 'energy' },
  ],
  disasters: [
    { name: 'Türkiye Deprem', url: rss('https://news.google.com/rss/search?q=(Turkey+earthquake+OR+deprem+OR+AFAD)+when:3d&hl=en-US&gl=US&ceid=US:en'), type: 'disaster' },
    { name: 'Türkiye Afet', url: rss('https://news.google.com/rss/search?q=(Turkey+flood+OR+Turkey+wildfire+OR+Turkey+disaster+OR+sel+felaketi+OR+orman+yangini)+when:3d&hl=en-US&gl=US&ceid=US:en'), type: 'disaster' },
  ],
};

export const FEEDS = TURKEY_FEEDS;

export const INTEL_SOURCES: Feed[] = [
  { name: 'Anadolu Ajansı', url: rss('https://www.aa.com.tr/en/rss/default?cat=turkey'), type: 'turkey' },
  { name: 'Reuters Türkiye', url: rss('https://news.google.com/rss/search?q=Turkey+Turkish+when:1d&hl=en-US&gl=US&ceid=US:en'), type: 'turkey' },
  { name: 'Al Jazeera Türkiye', url: rss('https://news.google.com/rss/search?q=site:aljazeera.com+Turkey+when:2d&hl=en-US&gl=US&ceid=US:en'), type: 'turkey' },
];

// Keywords that trigger alert status
export const ALERT_KEYWORDS = [
  'deprem', 'earthquake', 'tsunami', 'sel', 'flood',
  'yangın', 'wildfire', 'patlama', 'explosion',
  'saldırı', 'attack', 'terör', 'terror',
  'çatışma', 'conflict', 'operasyon', 'operation',
  'AFAD', 'acil', 'emergency', 'uyarı', 'warning',
  'fay hattı', 'fault line', 'heyelan', 'landslide',
  'kaza', 'accident', 'göçük', 'collapse',
];

// Patterns that indicate non-alert content
export const ALERT_EXCLUSIONS = [
  'protein', 'couples', 'relationship', 'dating', 'diet', 'fitness',
  'recipe', 'cooking', 'shopping', 'fashion', 'celebrity', 'movie',
  'tv show', 'sports', 'game', 'concert', 'festival', 'wedding',
  'vacation', 'travel tips', 'life hack', 'self-care', 'wellness',
];
