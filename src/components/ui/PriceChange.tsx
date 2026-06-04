import { clsx } from 'clsx';

interface PriceChangeProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  showSign?: boolean;
  animate?: boolean;
}

const sizeStyles = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export function PriceChange({ value, size = 'md', showSign = true, animate = false }: PriceChangeProps) {
  const isPositive = value >= 0;
  const prefix = showSign ? (isPositive ? '+' : '') : '';

  return (
    <span
      className={clsx(
        'font-mono font-medium',
        isPositive ? 'text-success' : 'text-danger',
        sizeStyles[size],
        animate && (isPositive ? 'price-flash-up' : 'price-flash-down')
      )}
    >
      {prefix}
      {value.toFixed(2)}%
    </span>
  );
}
