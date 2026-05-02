import { Panel } from './Panel';
import { init, dispose, type Chart } from 'klinecharts';
import { fetchYahooChart, fetchCombinedChart, type OHLCV } from '@/services/yahoo-chart';
import type { FredSeries } from '@/services/fred';
import type { OilAnalytics } from '@/services/oil-analytics';
import type { SpendingSummary } from '@/services/usa-spending';

interface ChartDef {
  id: string;
  name: string;
  load: () => Promise<OHLCV[]>;
}

const TROY_OUNCE_GRAMS = 31.1035;

const CHARTS: ChartDef[] = [
  {
    id: 'gram-altin',
    name: 'Gram Altın / TRY',
    load: () =>
      fetchCombinedChart(
        'GC=F',
        'TRY=X',
        (gold, usdtry) => (gold.close * usdtry.close) / TROY_OUNCE_GRAMS,
      ),
  },
  {
    id: 'brent',
    name: 'Brent Ham Petrol (USD)',
    load: () => fetchYahooChart('BZ=F'),
  },
  {
    id: 'gumus',
    name: 'Gümüş / USD',
    load: () => fetchYahooChart('SI=F'),
  },
];

const REFRESH_INTERVAL_MS = 60 * 1000;

export class EconomicPanel extends Panel {
  private charts = new Map<string, Chart>();
  private chartContainerIds = new Map<string, string>();
  private refreshTimers = new Map<string, ReturnType<typeof setInterval>>();

  constructor() {
    super({ id: 'economic', title: 'EKONOMİ' });
    this.renderCharts();
  }

  // Stubs — kept for type compatibility
  public update(_data: FredSeries[]): void {}
  public updateOil(_data: OilAnalytics): void {}
  public updateSpending(_data: SpendingSummary): void {}
  public setLoading(_loading: boolean): void {}
  public setErrorState(_isError: boolean, _message?: string): void {}

  private renderCharts(): void {
    this.content.innerHTML = '';

    const container = document.createElement('div');
    container.style.cssText =
      'display:flex;flex-direction:column;gap:8px;padding:8px;height:100%;overflow-y:auto;box-sizing:border-box;';

    for (const def of CHARTS) {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'flex-shrink:0;display:flex;flex-direction:column;gap:4px;';

      const label = document.createElement('div');
      label.textContent = def.name;
      label.style.cssText =
        'font-size:10px;color:var(--muted,#8899aa);padding:2px 4px;letter-spacing:0.06em;text-transform:uppercase;display:flex;justify-content:space-between;align-items:center;';
      const value = document.createElement('span');
      value.style.cssText = 'font-family:monospace;color:var(--fg,#cfd8dc);font-size:11px;';
      value.textContent = '...';
      label.appendChild(value);
      wrapper.appendChild(label);

      const chartId = `kline-${def.id}-${Date.now()}`;
      this.chartContainerIds.set(def.id, chartId);
      const chartEl = document.createElement('div');
      chartEl.id = chartId;
      chartEl.style.cssText = 'width:100%;height:200px;';
      wrapper.appendChild(chartEl);

      container.appendChild(wrapper);

      // Defer init until element is in DOM
      requestAnimationFrame(() => this.initChart(def, chartEl, value));
    }

    this.content.appendChild(container);
  }

  private initChart(def: ChartDef, el: HTMLElement, valueEl: HTMLSpanElement): void {
    const chart = init(el, {
      styles: {
        grid: {
          horizontal: { color: 'rgba(255,255,255,0.04)' },
          vertical: { color: 'rgba(255,255,255,0.04)' },
        },
        candle: {
          bar: {
            upColor: '#26a69a',
            downColor: '#ef5350',
            upBorderColor: '#26a69a',
            downBorderColor: '#ef5350',
            upWickColor: '#26a69a',
            downWickColor: '#ef5350',
          },
          priceMark: {
            high: { color: '#cfd8dc' },
            low: { color: '#cfd8dc' },
            last: {
              upColor: '#26a69a',
              downColor: '#ef5350',
              text: { color: '#fff' },
            },
          },
        },
        xAxis: {
          axisLine: { color: 'rgba(255,255,255,0.1)' },
          tickLine: { color: 'rgba(255,255,255,0.1)' },
          tickText: { color: '#8899aa' },
        },
        yAxis: {
          axisLine: { color: 'rgba(255,255,255,0.1)' },
          tickLine: { color: 'rgba(255,255,255,0.1)' },
          tickText: { color: '#8899aa' },
        },
        crosshair: {
          horizontal: { line: { color: 'rgba(255,255,255,0.2)' } },
          vertical: { line: { color: 'rgba(255,255,255,0.2)' } },
        },
      },
    });

    if (!chart) {
      valueEl.textContent = 'init failed';
      return;
    }

    this.charts.set(def.id, chart);

    chart.setSymbol({ ticker: def.id, pricePrecision: 2, volumePrecision: 0 });
    chart.setPeriod({ type: 'day', span: 1 });

    const loader = {
      getBars: async ({ callback }: { callback: (data: OHLCV[]) => void }) => {
        try {
          const data = await def.load();
          if (data.length === 0) {
            valueEl.textContent = 'no data';
            callback([]);
            return;
          }
          callback(data);
          const last = data[data.length - 1]!;
          valueEl.textContent = last.close.toFixed(2);
        } catch (e) {
          console.error(`[EconomicPanel] ${def.id} load failed:`, e);
          valueEl.textContent = 'error';
          callback([]);
        }
      },
    };
    chart.setDataLoader(loader);

    // Refresh every minute by re-applying loader (triggers getBars)
    const timer = setInterval(() => {
      if (!this.charts.has(def.id)) return;
      chart.setDataLoader(loader);
    }, REFRESH_INTERVAL_MS);
    this.refreshTimers.set(def.id, timer);
  }

  public destroy(): void {
    for (const timer of this.refreshTimers.values()) clearInterval(timer);
    this.refreshTimers.clear();
    for (const [id] of this.charts) {
      const elId = this.chartContainerIds.get(id);
      if (elId) {
        const el = document.getElementById(elId);
        if (el) dispose(el);
      }
    }
    this.charts.clear();
  }
}
