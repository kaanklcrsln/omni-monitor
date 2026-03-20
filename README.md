> **Attribution Notice:** This project is forked from [https://github.com/koala73/worldmonitor](https://github.com/koala73/worldmonitor). The original codebase was adapted and scoped down to Turkey only for academic presentation purposes. I am **not** the original author of this project.

---

# Omni Monitor — Türkiye GIS & Durum İzleme Platformu

A real-time GIS intelligence dashboard scoped exclusively to Turkey. Monitors earthquakes, wildfires, protests, energy infrastructure, financial markets, and news feeds — all within Turkey's geographic boundaries.

---

## License

This project is derived from [worldmonitor](https://github.com/koala73/worldmonitor) and is used solely for academic/educational purposes. All rights belong to the original author.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Browser)                   │
│                                                             │
│   App.ts (Orchestrator ~3900 LOC)                           │
│   ┌─────────────────┐  ┌──────────────────────────────────┐ │
│   │  Map Engine     │  │  Panel System                    │ │
│   │  ┌───────────┐  │  │  ┌──────────┐  ┌─────────────┐  │ │
│   │  │ DeckGLMap │  │  │  │NewsPanel │  │ MarketPanel │  │ │
│   │  │ (WebGL)   │  │  │  │ (RSS/TR) │  │  (BIST)     │  │ │
│   │  └───────────┘  │  │  └──────────┘  └─────────────┘  │ │
│   │  ┌───────────┐  │  │  ┌──────────┐  ┌─────────────┐  │ │
│   │  │   Map.ts  │  │  │  │SatFires  │  │ ClimatePanel│  │ │
│   │  │ (D3/SVG)  │  │  │  │  (FIRMS) │  │  (NOAA)     │  │ │
│   │  └───────────┘  │  │  └──────────┘  └─────────────┘  │ │
│   └─────────────────┘  └──────────────────────────────────┘ │
│                                                             │
│   Services Layer                                            │
│   rss.ts · markets.ts · earthquakes.ts · firms-satellite.ts │
│   protests.ts · conflicts.ts · climate.ts · flights.ts      │
│   country-instability.ts · signal-aggregator.ts             │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP / Proxy API
┌──────────────────────────▼──────────────────────────────────┐
│                   Vite Dev Server / Proxy                    │
│   /api/rss-proxy    →  Turkish news RSS feeds               │
│   /api/earthquakes  →  USGS Earthquake API                  │
│   /api/yahoo-finance→  Yahoo Finance (BIST stocks)          │
│   /api/firms        →  NASA FIRMS (wildfire detection)      │
│   /api/acled        →  ACLED conflict/protest data          │
└──────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Desktop Runtime | **Tauri 2** (Rust backend, WebView frontend) |
| Build Tool | **Vite 6** + TypeScript 5 |
| Language | **Vanilla TypeScript** (no React/Vue) |
| Primary Map | **Deck.GL 9** (WebGL, GPU-accelerated) + **MapLibre GL JS 5** |
| Fallback Map | **D3 v7** + SVG (mobile / low-power devices) |
| Tile Provider | MapLibre vector tiles, hard-bounded to Turkey |
| Data Viz | D3 scales, projections, geo utilities |
| PWA | vite-plugin-pwa (offline support, service worker) |
| ML/NLP | ONNX Runtime Web + Xenova Transformers (local inference) |

---

## Geographic Scope

Map is hard-locked to Turkey via MapLibre `maxBounds`:

```typescript
const TURKEY_BOUNDS: [[number, number], [number, number]] = [[24, 34], [47, 44]];
// center: { longitude: 35.5, latitude: 39.0, zoom: 5.5 }
```

All data sources are filtered or queried with Turkey's bounding box. No global data is rendered.

---

## Data Sources

| Category | Source | Interval |
|----------|--------|----------|
| Haber (Türkçe) | AA, TRT, Hürriyet, BBC TR, Reuters TR, DW TR, Bianet | 5 min |
| Ekonomi Haberleri | Bloomberg HT, TCMB, BIST | 5 min |
| Borsa (BIST) | Yahoo Finance (GARAN, THYAO, ASELS, TUPRS …) | 2 min |
| Döviz | Yahoo Finance (USDTRY, EURTRY, GBPTRY) | 2 min |
| Emtia | Yahoo Finance (Altın, Petrol, Doğalgaz) | 2 min |
| Deprem | USGS Earthquake API | realtime |
| Orman Yangını | NASA FIRMS (MODIS/VIIRS) | 5 min |
| Çatışma/Protesto | ACLED | on demand |
| Hava Durumu | Open-Meteo / NOAA | 10 min |
| İklim Anomalisi | Climate service | 30 min |
| Göç/Yerinden Edilme | UNHCR | daily |
| İnsani Yardım | HAPI | daily |
| İnternet Kesintisi | IODA / Cloudflare Radar | 10 min |

---

## Panel System

Panels are defined in `src/config/panels.ts` and dynamically instantiated in `App.ts`.

Active panels for Turkey:

| Panel ID | Component | Veri |
|----------|-----------|------|
| `son-dakika` | NewsPanel | Tüm Türkiye haberleri |
| `ekonomi` | NewsPanel | Ekonomi/finans haberleri |
| `guvenlik` | NewsPanel | Güvenlik haberleri |
| `enerji` | NewsPanel | Enerji sektörü |
| `afet` | NewsPanel | Deprem, sel, afet |
| `piyasalar` | MarketPanel | BIST, döviz, emtia |
| `yanginlar` | SatelliteFiresPanel | NASA FIRMS yangın noktaları |
| `iklim` | ClimateAnomalyPanel | İklim anomalileri |
| `takiplistem` | MonitorPanel | Özel kelime takibi |

---

## Map Layers

```typescript
// Active layers for Turkey
pipelines: true   // BTC, TANAP, TürkAkım, Mavi Akım, Kerkük-Ceyhan
hotspots: true    // Ankara, İstanbul, Diyarbakır, Hatay
weather: true     // Hava durumu uyarıları
waterways: true   // İstanbul Boğazı, Çanakkale Boğazı
protests: true    // Protesto/sosyal hareketler
fires: true       // NASA FIRMS yangın tespiti
climate: true     // İklim anomalileri
natural: true     // Doğal afetler (EONET)

// Disabled
bases: false, cables: false, ais: false
nuclear: false, flights: false, military: false
```

---

## Key Config Files

```
src/config/
├── variant.ts      SITE_VARIANT = 'turkey'
├── panels.ts       Active panel definitions (Turkish)
├── feeds.ts        15+ Turkish news RSS sources + propaganda risk scoring
├── markets.ts      BIST 100, BIST 30, BIST Banka + 20 Turkish stocks
├── geo.ts          Hotspots, military bases, waterways, Akkuyu NGS
├── pipelines.ts    6 pipelines (BTC, TANAP, TürkAkım, Mavi Akım ...)
├── ports.ts        14 Turkish ports (Mersin, Ambarlı, Kocaeli, Ceyhan ...)
└── airports.ts     8 Turkish airports (IST, SAW, ESB, ADB, AYT ...)
```

---

## Project Structure

```
src/
├── App.ts                      Main orchestrator (~3900 LOC)
├── config/                     Turkey-specific configuration
├── components/
│   ├── DeckGLMap.ts            WebGL map (Deck.GL + MapLibre) ~149KB
│   ├── Map.ts                  D3/SVG fallback map ~123KB
│   ├── MapContainer.ts         Map abstraction layer
│   ├── MapPopup.ts             Interactive map popups
│   ├── NewsPanel.ts            RSS news panel
│   ├── MarketPanel.ts          BIST financial data
│   ├── SatelliteFiresPanel.ts  NASA FIRMS wildfires
│   └── ClimateAnomalyPanel.ts  Climate data
└── services/
    ├── rss.ts                  RSS feed aggregation
    ├── markets.ts              Yahoo Finance integration
    ├── earthquakes.ts          USGS earthquake data
    ├── firms-satellite.ts      NASA FIRMS wildfire data
    ├── protests.ts             ACLED protest events
    ├── climate.ts              Climate anomaly data
    ├── country-instability.ts  CII scoring engine
    └── signal-aggregator.ts    Multi-source signal fusion
```

---

## Running Locally

```bash
npm install
npm run dev     # Development server with hot reload
npm run start   # Build + serve on http://localhost:5000
npm run build   # Production build only
```

---


