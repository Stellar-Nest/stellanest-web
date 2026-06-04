# Stellanest — Frontend

Next.js 14+ trading dashboard for the Stellanest real estate index trading platform.

**Live:** [stellarnest.netlify.app](https://stellarnest.netlify.app/)

## Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** TradingView Lightweight Charts
- **Wallet:** Freighter (Stellar wallet extension)

## Structure

```
src/
  app/
    page.tsx                    Landing page with city index grid
    trade/[city]/page.tsx       Trading dashboard
    explore/                    Browse indices, heatmap, compare
    portfolio/                  Positions, orders, history, performance
    analytics/                  Volume, open interest, leaderboard
  components/
    charts/                     Chart components (TradingView)
    trading/                    Order book, trade form, depth chart
    portfolio/                  Position cards, P&L charts
    layout/                     Navigation, sidebar
    ui/                         Shared UI primitives
  hooks/                        Custom React hooks
  lib/                          API client, WebSocket, utilities
  types/                        TypeScript type definitions
```

## Setup

```bash
# Install dependencies
npm install

# Set environment variables
cp .env.example .env.local
# Edit .env.local with your API URL and WebSocket URL

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Key Pages

### `/` — Landing
City index grid with real-time prices, 24h change, and stats bar.

### `/trade/[city]` — Trading Dashboard
- Candlestick chart (TradingView)
- Real-time order book (bids/asks)
- Trade form (long/short, collateral, leverage slider)
- Recent trades feed

### `/explore` — Browse Indices
- Heatmap of global real estate performance
- City comparison tool

### `/portfolio` — Position Management
- Open positions with live P&L
- Health factor indicators
- Trade history

### `/analytics` — Platform Analytics
- Trading volume by city
- Open interest
- Top traders leaderboard
