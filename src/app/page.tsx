export default function Home() {
  const cities = [
    { code: 'NYC', name: 'New York', country: 'US', flag: '🇺🇸', value: 485.23, change: 0.32 },
    { code: 'LON', name: 'London', country: 'UK', flag: '🇬🇧', value: 312.67, change: -0.15 },
    { code: 'LAG', name: 'Lagos', country: 'NG', flag: '🇳🇬', value: 45.89, change: 1.20 },
    { code: 'TOK', name: 'Tokyo', country: 'JP', flag: '🇯🇵', value: 412.50, change: 0.45 },
    { code: 'DUB', name: 'Dubai', country: 'AE', flag: '🇦🇪', value: 278.90, change: 0.89 },
    { code: 'MUM', name: 'Mumbai', country: 'IN', flag: '🇮🇳', value: 156.30, change: 2.10 },
    { code: 'NAI', name: 'Nairobi', country: 'KE', flag: '🇰🇪', value: 34.20, change: 3.45 },
    { code: 'SAO', name: 'São Paulo', country: 'BR', flag: '🇧🇷', value: 89.10, change: -0.67 },
    { code: 'BER', name: 'Berlin', country: 'DE', flag: '🇩🇪', value: 234.50, change: 0.12 },
    { code: 'SYD', name: 'Sydney', country: 'AU', flag: '🇦🇺', value: 367.80, change: -0.34 },
  ];

  return (
    <div className="px-6 py-8">
      {/* Hero */}
      <section className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">
          Trade Real Estate Markets Like Stocks
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Go long or short city real estate indices on Stellar. $0.00001 per trade.
          5-second settlement. 24/7 markets.
        </p>
      </section>

      {/* City Index Grid */}
      <section>
        <h3 className="text-lg font-semibold mb-4">City Indices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {cities.map((city) => (
            <a
              key={city.code}
              href={`/trade/${city.code}`}
              className="bg-surface-light rounded-xl p-4 hover:bg-surface-lighter transition border border-surface-lighter hover:border-primary-600"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{city.flag}</span>
                <div>
                  <div className="font-semibold">{city.name}</div>
                  <div className="text-xs text-slate-500">{city.code}-RE</div>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-xl font-mono font-bold">
                  ${city.value.toFixed(2)}
                </span>
                <span
                  className={`text-sm font-mono ${
                    city.change >= 0 ? 'text-success' : 'text-danger'
                  }`}
                >
                  {city.change >= 0 ? '+' : ''}
                  {city.change.toFixed(2)}%
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <section className="mt-12 grid grid-cols-4 gap-6">
        <div className="bg-surface-light rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-primary-400">20+</div>
          <div className="text-sm text-slate-400 mt-1">Cities Covered</div>
        </div>
        <div className="bg-surface-light rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-primary-400">$0.00001</div>
          <div className="text-sm text-slate-400 mt-1">Per Trade</div>
        </div>
        <div className="bg-surface-light rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-primary-400">5s</div>
          <div className="text-sm text-slate-400 mt-1">Settlement</div>
        </div>
        <div className="bg-surface-light rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-primary-400">24/7</div>
          <div className="text-sm text-slate-400 mt-1">Trading</div>
        </div>
      </section>
    </div>
  );
}
