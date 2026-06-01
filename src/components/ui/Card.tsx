import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export function Card({ children, className, header, hover = false, padding = 'md' }: CardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          'bg-surface-light rounded-xl border border-surface-lighter',
          hover && 'hover:border-primary-600 hover:bg-surface-lighter transition-all duration-200 cursor-pointer',
          className
        )
      )}
    >
      {header && (
        <div className="px-4 py-3 border-b border-surface-lighter">
          {header}
        </div>
      )}
      <div className={paddingStyles[padding]}>{children}</div>
    </div>
  );
}
