import type { Sector, Commodity, MarketSymbol } from '@/types';

export const SECTORS: Sector[] = [
  { symbol: 'XU100.IS', name: 'BIST 100' },
  { symbol: 'XU030.IS', name: 'BIST 30' },
  { symbol: 'XBANK.IS', name: 'BIST Banka' },
  { symbol: 'XUSIN.IS', name: 'BIST Sınai' },
];

export const COMMODITIES: Commodity[] = [
  { symbol: 'GC=F', name: 'Altın', display: 'ALTIN' },
  { symbol: 'CL=F', name: 'Brent Petrol', display: 'PETROL' },
  { symbol: 'NG=F', name: 'Doğalgaz', display: 'DOGALGAZ' },
  { symbol: 'SI=F', name: 'Gümüş', display: 'GUMUS' },
  { symbol: 'HG=F', name: 'Bakır', display: 'BAKIR' },
];

export const MARKET_SYMBOLS: MarketSymbol[] = [
  { symbol: 'XU100.IS', name: 'BIST 100', display: 'BIST100' },
  { symbol: 'USDTRY=X', name: 'USD/TRY', display: 'USD/TRY' },
  { symbol: 'EURTRY=X', name: 'EUR/TRY', display: 'EUR/TRY' },
  { symbol: 'GBPTRY=X', name: 'GBP/TRY', display: 'GBP/TRY' },
  { symbol: 'GARAN.IS', name: 'Garanti BBVA', display: 'GARAN' },
  { symbol: 'THYAO.IS', name: 'Türk Hava Yolları', display: 'THYAO' },
  { symbol: 'ASELS.IS', name: 'Aselsan', display: 'ASELS' },
  { symbol: 'SISE.IS', name: 'Şişecam', display: 'SISE' },
  { symbol: 'EREGL.IS', name: 'Ereğli Demir Çelik', display: 'EREGL' },
  { symbol: 'KCHOL.IS', name: 'Koç Holding', display: 'KCHOL' },
  { symbol: 'TUPRS.IS', name: 'Tüpraş', display: 'TUPRS' },
  { symbol: 'SAHOL.IS', name: 'Sabancı Holding', display: 'SAHOL' },
  { symbol: 'AKBNK.IS', name: 'Akbank', display: 'AKBNK' },
  { symbol: 'BIMAS.IS', name: 'BİM', display: 'BIMAS' },
  { symbol: 'TCELL.IS', name: 'Turkcell', display: 'TCELL' },
  { symbol: 'PETKM.IS', name: 'Petkim', display: 'PETKM' },
  { symbol: 'TOASO.IS', name: 'Tofaş', display: 'TOASO' },
  { symbol: 'FROTO.IS', name: 'Ford Otosan', display: 'FROTO' },
  { symbol: 'HEKTS.IS', name: 'Hektaş', display: 'HEKTS' },
  { symbol: 'ENKAI.IS', name: 'Enka İnşaat', display: 'ENKAI' },
];

export const CRYPTO_IDS = [] as const;

export const CRYPTO_MAP: Record<string, { name: string; symbol: string }> = {};
