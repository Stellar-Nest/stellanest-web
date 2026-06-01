'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { indices, orders } from '@/lib/api';
import type { CityIndex, OrderBook, Trade } from '@/types';

export default function TradePage() {
  const params = useParams();
  const city = params.city as string;

  const [index, setIndex] = useState<CityIndex | null>(null);
  const [book, setBook] = useState<OrderBook | null>(null);
  const [recentTrades, setRecentTrades] = useState<Trade[]>([]);
  const [side, setSide] = useState<'long' | 'short'>('long');
  const [leverage, setLeverage] = useState(2);
  const [collateral, setCollateral] = useState(1000);
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [limitPrice, setLimitPrice] = useState('');

  useEffect(() => {
    // Load index data
    indices.get(city).then(setIndex).catch(console.error);
    orders.book(city).then(setBook).catch(console.error);
    orders.recent(city).then(setRecentTrades).catch(console.error);
  }, [city]);

  const estimatedSize = collateral * leverage;
  const estimatedPnL = index
    ? side === 'long'
      ? `+${(estimatedSize * 0.05).toFixed(2)}`
      : `-${(estimatedSize * 0.05).toFixed(2)}`
    : '—';

  return (
    <div className="flex h-[calc(100vh-73px)]">
      {/* Left: Chart & Order Book */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-surface-lighter px-6 py-3 flex items-center gap-4">
          <span className="text-2xl">{index?.flag || '🏙️'}</span>
          <div>
            <h2 className="text-lg font-bold">{index?.name || city}</h2>
            <span className="text-xs text-slate-500">{city}-RE / USDC</span>
          </div>
          <div className="ml-6">
            <span className="text-2xl font-mono font-bold">
              ${index?.current_value?.toFixed(2) || '—'}
            </span>
            <span
              className={`ml-2 text-sm font-mono ${
                (index?.change_24h || 0) >= 0 ? 'text-success' : 'text-danger'
              }`}
            >
              {(index?.change_24h || 0) >= 0 ? '+' : ''}
              {index?.change_24h?.toFixed(2) || '0.00'}%
            </span>
          </div>
        </div>

        {/* Chart Area */}
        <div className="flex-1 flex items-center justify-center text-slate-600 bg-surface-light m-4 rounded-xl">
          <div className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <p>TradingView Lightweight Charts</p>
            <p className="text-sm">Candlestick / Line / Area</p>
          </div>
        </div>

        {/* Order Book & Recent Trades */}
        <div className="h-64 border-t border-surface-lighter flex">
          {/* Order Book */}
          <div className="flex-1 overflow-auto p-4">
            <h3 className="text-sm font-semibold mb-2 text-slate-400">Order Book</h3>
            <div className="space-y-0.5 font-mono text-xs">
              {/* Asks (reversed) */}
              {book?.asks
                .slice(0, 8)
                .reverse()
                .map((ask, i) => (
                  <div key={`ask-${i}`} className="ask-row flex justify-between px-2 py-0.5">
                    <span className="text-danger">{ask.price.toFixed(2)}</span>
                    <span className="text-slate-400">{ask.size.toFixed(0)}</span>
                  </div>
                ))}
              {/* Spread */}
              <div className="text-center py-1 text-slate-500">
                Spread: ${book?.spread?.toFixed(2) || '—'}
              </div>
              {/* Bids */}
              {book?.bids.slice(0, 8).map((bid, i) => (
                <div key={`bid-${i}`} className="bid-row flex justify-between px-2 py-0.5">
                  <span className="text-success">{bid.price.toFixed(2)}</span>
                  <span className="text-slate-400">{bid.size.toFixed(0)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Trades */}
          <div className="flex-1 overflow-auto p-4 border-l border-surface-lighter">
            <h3 className="text-sm font-semibold mb-2 text-slate-400">Recent Trades</h3>
            <div className="space-y-0.5 font-mono text-xs">
              {recentTrades.slice(0, 15).map((trade, i) => (
                <div key={i} className="flex justify-between px-2 py-0.5">
                  <span className={trade.side === 'buy' ? 'text-success' : 'text-danger'}>
                    {trade.price.toFixed(2)}
                  </span>
                  <span className="text-slate-400">{trade.size.toFixed(0)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right: Trade Form */}
      <div className="w-80 border-l border-surface-lighter p-4 flex flex-col gap-4">
        <h3 className="font-semibold">Open Position</h3>

        {/* Long/Short Toggle */}
        <div className="flex rounded-lg overflow-hidden">
          <button
            onClick={() => setSide('long')}
            className={`flex-1 py-2 text-sm font-medium transition ${
              side === 'long'
                ? 'bg-success text-white'
                : 'bg-surface-lighter text-slate-400 hover:text-white'
            }`}
          >
            Long
          </button>
          <button
            onClick={() => setSide('short')}
            className={`flex-1 py-2 text-sm font-medium transition ${
              side === 'short'
                ? 'bg-danger text-white'
                : 'bg-surface-lighter text-slate-400 hover:text-white'
            }`}
          >
            Short
          </button>
        </div>

        {/* Order Type */}
        <div className="flex gap-2 text-sm">
          <button
            onClick={() => setOrderType('market')}
            className={`px-3 py-1 rounded ${
              orderType === 'market' ? 'bg-primary-600' : 'bg-surface-lighter'
            }`}
          >
            Market
          </button>
          <button
            onClick={() => setOrderType('limit')}
            className={`px-3 py-1 rounded ${
              orderType === 'limit' ? 'bg-primary-600' : 'bg-surface-lighter'
            }`}
          >
            Limit
          </button>
        </div>

        {/* Limit Price (conditional) */}
        {orderType === 'limit' && (
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Limit Price (USDC)</label>
            <input
              type="number"
              value={limitPrice}
              onChange={(e) => setLimitPrice(e.target.value)}
              placeholder="0.00"
              className="w-full bg-surface-lighter rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
        )}

        {/* Collateral */}
        <div>
          <label className="text-xs text-slate-400 mb-1 block">Collateral (USDC)</label>
          <input
            type="number"
            value={collateral}
            onChange={(e) => setCollateral(Number(e.target.value))}
            className="w-full bg-surface-lighter rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>

        {/* Leverage */}
        <div>
          <label className="text-xs text-slate-400 mb-1 block">
            Leverage: <span className="text-primary-400 font-bold">{leverage}x</span>
          </label>
          <input
            type="range"
            min={1}
            max={10}
            value={leverage}
            onChange={(e) => setLeverage(Number(e.target.value))}
            className="w-full accent-primary-500"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>1x</span>
            <span>5x</span>
            <span>10x</span>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-surface-light rounded-lg p-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Position Size</span>
            <span className="font-mono">${estimatedSize.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Entry Price</span>
            <span className="font-mono">${index?.current_value?.toFixed(2) || '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Liq. Price</span>
            <span className="font-mono text-warning">
              $
              {index
                ? side === 'long'
                  ? (index.current_value * (1 - 1 / leverage * 0.8)).toFixed(2)
                  : (index.current_value * (1 + 1 / leverage * 0.8)).toFixed(2)
                : '—'}
            </span>
          </div>
        </div>

        {/* Submit */}
        <button
          className={`w-full py-3 rounded-lg font-semibold text-white transition ${
            side === 'long'
              ? 'bg-success hover:bg-green-600'
              : 'bg-danger hover:bg-red-600'
          }`}
        >
          {side === 'long' ? 'Go Long' : 'Go Short'} {city} · {leverage}x
        </button>

        <p className="text-xs text-slate-500 text-center">
          Wallet not connected. Connect Freighter to trade.
        </p>
      </div>
    </div>
  );
}
