export default function AnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      <p className="text-muted-foreground">
        Deep dive into market analytics, volume data, and trading patterns.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="border rounded-lg p-6">
          <h3 className="font-semibold mb-2">24h Volume</h3>
          <p className="text-2xl font-bold">--</p>
        </div>
        <div className="border rounded-lg p-6">
          <h3 className="font-semibold mb-2">Open Interest</h3>
          <p className="text-2xl font-bold">--</p>
        </div>
      </div>
    </div>
  );
}
