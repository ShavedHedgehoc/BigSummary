'use client';

import { cn } from '@/shared/lib';
import { RadioGroup, RadioGroupItem } from '@/shared/ui';
import { LucideIcon } from 'lucide-react';
import { useId } from 'react';

export interface IChangeStateOption {
  value: string;
  label: string;
  icon: LucideIcon;
  colorClass: string;
  iconColor: string;
}

interface StateButtonSelectorProps {
  options: readonly IChangeStateOption[] | IChangeStateOption[];
  value: string | undefined | null;
  onChange: (value: string) => void;
}

export function StateButtonSelector({ options, value, onChange }: StateButtonSelectorProps) {
  const baseId = useId();
  return (
    <RadioGroup value={value ?? ''} onValueChange={onChange} className="w-full">
      <div className="flex flex-col w-full min-w-0 overflow-hidden ">
        {options.map((option) => {
          const Icon = option.icon;
          const id = `${baseId}-${option.value}`;
          const isChecked = value === option.value;

          return (
            <div className="relative w-full min-w-0 " key={option.value}>
              <RadioGroupItem id={id} value={option.value} className="sr-only " />
              <label
                htmlFor={id}
                className={cn(
                  'flex items-center gap-2.5 px-3 h-9 w-full text-[11px] font-semibold tracking-wider rounded-md border transition-all select-none cursor-pointer justify-start min-w-0',
                  isChecked
                    ? cn('bg-muted/50 font-bold', option.colorClass.split(' ').slice(2).join(' '))
                    : cn(
                        'border-border/40 text-muted-foreground bg-transparent hover:bg-muted/30',
                        option.colorClass.split(' ').slice(0, 2).join(' '),
                      ),
                )}
              >
                <Icon className={cn('h-3.5 w-3.5 shrink-0', option.iconColor)} />
                <div className="text-foreground text-left truncate">{option.label}</div>
              </label>
            </div>
          );
        })}
      </div>
    </RadioGroup>
  );
}
