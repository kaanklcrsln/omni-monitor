import { Panel } from './Panel';
import type { FredSeries } from '@/services/fred';
import type { OilAnalytics } from '@/services/oil-analytics';
import type { SpendingSummary } from '@/services/usa-spending';

const CHARTS: { symbol: string; name: string }[] = [
  { symbol: 'OANDA:XAUTRYZ', name: 'Altın / TRY (XAUTRYZ)' },
  { symbol: 'TVC:UKOIL',     name: 'Brent Ham Petrol (UKOIL)' },
  { symbol: 'OANDA:XAGUSD',  name: 'Gümüş / USD (XAGUSD)' },
];

export class EconomicPanel extends Panel {
  constructor() {
    super({ id: 'economic', title: 'EKONOMİ' });
    this.element.classList.add('panel-full');
    this.renderCharts();
  }

  // Stubs — called from App.ts via optional chaining, kept for type compatibility
  public update(_data: FredSeries[]): void {}
  public updateOil(_data: OilAnalytics): void {}
  public updateSpending(_data: SpendingSummary): void {}
  public setLoading(_loading: boolean): void {}
  public setErrorState(_isError: boolean, _message?: string): void {}

  private renderCharts(): void {
    this.content.innerHTML = '';

    const container = document.createElement('div');
    container.style.cssText = 'display:flex;flex-direction:column;gap:6px;padding:6px;height:100%;overflow-y:auto;box-sizing:border-box;';

    for (const chart of CHARTS) {
      const config = JSON.stringify({
        symbol: chart.symbol,
        width: '100%',
        height: 160,
        locale: 'tr',
        dateRange: '3M',
        colorTheme: 'dark',
        isTransparent: true,
        autosize: false,
        largeChartUrl: '',
      });

      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'flex-shrink:0;';

      const label = document.createElement('div');
      label.textContent = chart.name;
      label.style.cssText = 'font-size:10px;color:var(--muted,#8899aa);padding:2px 4px 2px 2px;letter-spacing:0.06em;text-transform:uppercase;';
      wrapper.appendChild(label);

      const iframe = document.createElement('iframe');
      iframe.src = `https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.html?locale=tr#${JSON.stringify(config)}`;
      iframe.style.cssText = 'width:100%;height:160px;border:0;display:block;';
      iframe.setAttribute('allowtransparency', 'true');
      wrapper.appendChild(iframe);

      container.appendChild(wrapper);
    }

    this.content.appendChild(container);
  }
}
