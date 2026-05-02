export interface OHLCV {
  timestamp: number; // ms
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
  [key: string]: unknown;
}

export async function fetchYahooChart(
  symbol: string,
  range = '3mo',
  interval = '1d',
): Promise<OHLCV[]> {
  const path = `/v8/finance/chart/${encodeURIComponent(symbol)}?interval=${interval}&range=${range}`;
  const res = await fetch(`/api/yahoo${path}`);
  if (!res.ok) throw new Error(`Yahoo ${symbol} HTTP ${res.status}`);
  const json = await res.json();
  const result = json?.chart?.result?.[0];
  if (!result) throw new Error(`Yahoo ${symbol} no data`);
  const ts: number[] = result.timestamp ?? [];
  const q = result.indicators?.quote?.[0] ?? {};
  const out: OHLCV[] = [];
  for (let i = 0; i < ts.length; i++) {
    const t = ts[i];
    const o = q.open?.[i];
    const h = q.high?.[i];
    const l = q.low?.[i];
    const c = q.close?.[i];
    if (t == null || o == null || h == null || l == null || c == null) continue;
    out.push({
      timestamp: t * 1000,
      open: o,
      high: h,
      low: l,
      close: c,
      volume: q.volume?.[i] ?? 0,
    });
  }
  return out;
}

// Combine two series by timestamp using a transform function on close prices
export async function fetchCombinedChart(
  symbolA: string,
  symbolB: string,
  combine: (a: OHLCV, b: OHLCV) => number,
  range = '3mo',
  interval = '1d',
): Promise<OHLCV[]> {
  const [seriesA, seriesB] = await Promise.all([
    fetchYahooChart(symbolA, range, interval),
    fetchYahooChart(symbolB, range, interval),
  ]);
  const mapB = new Map(seriesB.map(b => [b.timestamp, b]));
  const out: OHLCV[] = [];
  for (const a of seriesA) {
    const b = mapB.get(a.timestamp);
    if (!b) continue;
    out.push({
      timestamp: a.timestamp,
      open: combine({ ...a, open: a.open, close: a.open, high: a.open, low: a.open }, { ...b, open: b.open, close: b.open, high: b.open, low: b.open }),
      high: combine({ ...a, close: a.high }, { ...b, close: b.high }),
      low: combine({ ...a, close: a.low }, { ...b, close: b.low }),
      close: combine(a, b),
    });
  }
  return out;
}
