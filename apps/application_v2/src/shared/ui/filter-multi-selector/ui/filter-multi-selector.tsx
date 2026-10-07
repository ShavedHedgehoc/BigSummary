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
import { Check, PlusCircle, X } from 'lucide-react';
import { useMemo, useState } from 'react';

export interface IListItem<T extends string = string> {
  value: T;
  description: string;
}

export interface IFilterMultiSelectorProps<T extends string = string> extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'value' | 'onChange'
> {
  value: T[] | undefined;
  onChange: (val: T[] | undefined | null) => void;
  className?: string;
  placeholder: string;
  items: readonly IListItem<T>[];
}

export function FilterMultiSelector<T extends string>({
  value,
  onChange,
  className,
  items,
  placeholder,
  ...props
}: IFilterMultiSelectorProps<T>) {
  const [open, setOpen] = useState(false);
  const selectedValuesSet = useMemo(() => new Set(value || []), [value]);

  const handleSelect = (itemValue: T) => {
    const newSelected = new Set(selectedValuesSet);
    if (newSelected.has(itemValue)) {
      newSelected.delete(itemValue);
    } else {
      newSelected.add(itemValue);
    }
    const arrayResult = Array.from(newSelected);
    onChange(arrayResult.length > 0 ? arrayResult : undefined);
  };

  const handleClearAll = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          {...props}
          variant="outline"
          size="sm"
          className={cn(
            'h-8 py-0 pl-3 pr-2 text-xs font-normal bg-background! flex items-center justify-between gap-2 min-w-50 shadow-none',
            className,
          )}
        >
          <div className="flex items-center gap-2 min-w-0 flex-1 text-muted-foreground/40">
            <PlusCircle className="h-4 w-4 shrink-0  " />
            <span className=" shrink-0">{placeholder}</span>

            <div className="h-4 w-px bg-border shrink-0 mx-0.5" />

            <div className="flex items-center min-w-0 flex-1">
              {selectedValuesSet.size === 0 ? (
                <span className="text-muted-foreground/50 truncate text-[11px]">Не выбрано</span>
              ) : selectedValuesSet.size > 1 ? (
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1.5 font-normal h-5 bg-muted/80 text-[11px] text-foreground border border-border/40 shrink-0"
                >
                  Выбрано: {selectedValuesSet.size}
                </Badge>
              ) : (
                items
                  .filter((item) => selectedValuesSet.has(item.value))
                  .map((item) => (
                    <Badge
                      variant="secondary"
                      key={item.value}
                      className="rounded-sm px-1.5 font-normal h-5 bg-muted/80 text-[11px] text-foreground border border-border/40 truncate max-w-full block"
                    >
                      {item.description}
                    </Badge>
                  ))
              )}
            </div>
          </div>
          <div className="flex items-center shrink-0 w-5 justify-end">
            {selectedValuesSet.size > 0 && (
              <span
                role="button"
                tabIndex={0}
                onClick={handleClearAll}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClearAll(e);
                  }
                }}
                className="rounded-sm p-0.5 text-muted-foreground/60 hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </span>
            )}
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-50 p-0 shadow-md" align="start">
        <Command className="bg-background shadow-none">
          <CommandList>
            <CommandGroup className="p-1">
              {items.map((item) => {
                const isSelected = selectedValuesSet.has(item.value);
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
