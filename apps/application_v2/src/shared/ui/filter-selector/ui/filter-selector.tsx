'use client';

import * as React from 'react';
import {
  Badge,
  Button,
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui';
import { cn } from '@/shared/lib';
import { Check, PlusCircle } from 'lucide-react';
import { useMemo, useState } from 'react';

export interface IListItem<T extends string = string> {
  value: T;
  description: string;
}

export interface IFilterSelectorProps<T extends string = string> extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'value' | 'onChange'
> {
  value: T[] | undefined;
  onChange: (val: T[] | undefined | null) => void;
  className?: string;
  placeholder?: string;
  items: readonly IListItem<T>[];
}

export function FilterSelector<T extends string>({
  value,
  onChange,
  className,
  items,
  placeholder = 'Выбрать',
  ...props
}: IFilterSelectorProps<T>) {
  const [open, setOpen] = useState(false);

  const currentValue = (value?.[0] ?? 'All') as T | 'All';

  const currentDescription = useMemo(() => {
    return items.find((x) => (x.value as string) === currentValue)?.description || 'Все';
  }, [currentValue, items]);

  const handleSelect = (itemValue: string) => {
    if (itemValue === 'All') {
      onChange(undefined);
    } else {
      onChange([itemValue as T]);
    }
    setOpen(false);
  };

  const isAllSelected = currentValue === 'All';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          {...props}
          variant="outline"
          size="sm"
          className={cn(
            'h-8 py-0 pl-3 pr-2 text-xs font-normal bg-background! flex items-center justify-between gap-2 min-w-50 shadow-none w-full',
            className,
          )}
        >
          <div className="flex items-center gap-2 min-w-0 flex-1 text-muted-foreground/40">
            <PlusCircle className="h-4 w-4 shrink-0" />
            <span className="shrink-0">{placeholder}</span>

            <div className="h-4 w-px bg-border shrink-0 mx-0.5" />

            <div className="flex items-center min-w-0 flex-1">
              {isAllSelected ? (
                <span className="text-muted-foreground/50 truncate text-[11px]">Все</span>
              ) : (
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1.5 font-normal h-5 bg-muted/80 text-[11px] text-foreground border border-border/40 max-w-full inline-flex items-center min-w-0"
                >
                  <span className="truncate">{currentDescription}</span>
                </Badge>
              )}
            </div>
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-(--radix-popover-trigger-width) min-w-50 p-0 shadow-md"
        align="start"
      >
        <Command className="bg-background shadow-none">
          <CommandList>
            <CommandGroup className="p-1">
              {items.map((item) => {
                const isSelected = currentValue === item.value;
                return (
                  <CommandItem
                    key={item.value}
                    onSelect={() => handleSelect(item.value)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-sm cursor-pointer text-sm"
                  >
                    <div
                      className={cn(
                        'mr-1.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm border border-input transition-all',
                        isSelected
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'opacity-50 [&_svg]:invisible',
                      )}
                    >
                      <Check className="h-2 w-2" />
                    </div>
                    <span className="flex-1 truncate text-xs">{item.description}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
