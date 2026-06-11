import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  suffix?: string;
  error?: string;
  size?: 'sm' | 'md';
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-3 py-2 text-sm',
};

export function Input({
  label,
  suffix,
  error,
  size = 'md',
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs text-slate-400 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          className={twMerge(
            clsx(
              'w-full bg-surface-lighter rounded-lg font-mono',
              'border border-transparent',
              'focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500',
              'placeholder:text-slate-600',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error && 'ring-1 ring-danger border-danger',
              sizeStyles[size],
              className
            )
          )}
          {...props}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
            {suffix}
          </span>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  );
}
