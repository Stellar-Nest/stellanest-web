export default function ExplorePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Explore</h1>
      <p className="text-muted-foreground">
        Discover real estate indices across global cities. Compare performance,
        analyze trends, and find investment opportunities.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {/* City index cards will be populated here */}
        <div className="border rounded-lg p-6 animate-pulse">
          <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-muted rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}
