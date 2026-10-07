'use client';

import * as React from 'react';
import { cn } from '@/shared/lib';
import { X, Search } from 'lucide-react';

export interface IFilterInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
> {
  value: string | undefined;
  onChange: (val: string | undefined | null) => void;
  className?: string;
}

export function FilterInput({ value, onChange, className, ...props }: IFilterInputProps) {
  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    onChange(null);
  };

  const hasValue = Boolean(value);

  return (
    <div className={cn('relative flex items-center w-auto', className)}>
      <Search className="absolute left-2.5 h-3.5 w-3.5 text-muted-foreground/40 pointer-events-none" />

      <input
        {...props}
        value={value || ''}
        autoComplete="off"
        autoFocus={false}
        onChange={(e) => onChange(e.target.value || undefined)}
        className={cn(
          'h-8 w-full rounded-md border border-input bg-background px-3 text-xs transition-colors',
          'pl-8',
          hasValue ? 'pr-7' : 'pr-3',
          'text-foreground placeholder:text-muted-foreground/40 font-normal',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-input',
        )}
      />

      {hasValue && (
        <span
          role="button"
          tabIndex={0}
          onClick={handleReset}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onChange(undefined);
            }
          }}
          className={cn(
            'absolute right-1.5 p-0.5 rounded-sm text-muted-foreground/60',
            'hover:text-foreground hover:bg-muted transition-colors cursor-pointer',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
          )}
        >
          <X className="h-3.5 w-3.5" />
        </span>
      )}
    </div>
  );
}
