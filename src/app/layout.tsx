import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Stellanest — Real Estate Index Trading on Stellar',
  description:
    'Trade synthetic real estate indices for cities worldwide on Stellar. Long, short, and hedge city real estate markets with 5-second settlement.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-surface text-slate-200 antialiased">
        <header className="border-b border-surface-lighter px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-primary-400">⌂</span>
            <h1 className="text-xl font-semibold">Stellanest</h1>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <a href="/trade/NYC" className="hover:text-primary-400 transition">
              Trade
            </a>
            <a href="/explore" className="hover:text-primary-400 transition">
              Explore
            </a>
            <a href="/portfolio" className="hover:text-primary-400 transition">
              Portfolio
            </a>
            <a href="/analytics" className="hover:text-primary-400 transition">
              Analytics
            </a>
            <button className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg text-sm font-medium transition">
              Connect Wallet
            </button>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
