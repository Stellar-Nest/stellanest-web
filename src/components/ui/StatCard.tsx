import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  className?: string;
}

export function StatCard({ label, value, icon, trend, className }: StatCardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          'bg-surface-light rounded-xl p-4 border border-surface-lighter',
          'hover:border-primary-600/50 transition-colors duration-200',
          className
        )
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-slate-400 uppercase tracking-wider">{label}</span>
        {icon && <span className="text-slate-500">{icon}</span>}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-white">{value}</span>
        {trend && (
          <span
            className={clsx(
              'text-sm font-mono mb-0.5',
              trend.direction === 'up' ? 'text-success' : 'text-danger'
            )}
          >
            {trend.direction === 'up' ? '↑' : '↓'} {Math.abs(trend.value).toFixed(2)}%
          </span>
        )}
      </div>
    </div>
  );
}
