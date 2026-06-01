export interface CityIndex {
  city_code: string;
  name: string;
  country: string;
  flag: string;
  description?: string;
  current_value: number;
  change_24h: number;
  change_7d: number;
  change_30d: number;
  change_1y: number;
  volume_24h: number;
  open_interest: number;
  data_sources: number;
  stellar_asset_code?: string;
  stellar_asset_issuer?: string;
  status: string;
  last_updated: string;
}

export interface IndexCandle {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Position {
  id: string;
  city_code: string;
  direction: 'long' | 'short';
  leverage: number;
  entry_price: number;
  collateral: number;
  size: number;
  liquidation_price: number;
  current_price: number;
  unrealized_pnl: number;
  unrealized_pnl_percent: number;
  health_factor: number;
  funding_paid: number;
  status: 'open' | 'closed' | 'liquidated';
  opened_at: string;
}

export interface Order {
  id: string;
  city_code: string;
  side: 'buy' | 'sell';
  type: 'limit' | 'market';
  price: number | null;
  size: number;
  filled: number;
  status: 'open' | 'filled' | 'partial' | 'cancelled';
  created_at: string;
}

export interface OrderBookLevel {
  price: number;
  size: number;
  orders: number;
}

export interface OrderBook {
  city: string;
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
  spread: number;
  mid_price: number;
  volume_24h: number;
  trades_24h: number;
}

export interface Trade {
  price: number;
  size: number;
  side: 'buy' | 'sell';
  timestamp: string;
}

export interface DataSource {
  name: string;
  weight: number;
  last_value: number;
}

export interface CityDetail extends CityIndex {
  data_sources: DataSource[];
  composition?: Record<string, number>;
}
