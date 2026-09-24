'use client';

import { cn } from '@/shared/lib';
import { Badge, Button, Calendar, Popover, PopoverContent, PopoverTrigger } from '@/shared/ui';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export interface IFilterDatePickerProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'value' | 'onChange'
> {
  value: Date | undefined;
  onChange: (val: Date | undefined) => void;
  className?: string;
  placeholder?: string;
}

export function FilterDatePicker({
  value,
  onChange,
  className,
  placeholder = 'Дата',
  ...props
}: IFilterDatePickerProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [month, setMonth] = useState<Date | undefined>(value || new Date());

  const handleOpenChange = (open: boolean) => {
    setIsCalendarOpen(open);
    if (open && value) {
      setMonth(value);
    }
  };

  return (
    <Popover open={isCalendarOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          {...props}
          size="sm"
          variant="outline"
          className={cn(
            'h-8 py-0 pl-3 pr-2 text-xs font-normal bg-background! flex items-center justify-between gap-2 min-w-50 shadow-none border-input w-full',
            className,
          )}
        >
          <div className="flex items-center gap-2 min-w-0 flex-1 text-muted-foreground/40">
            <CalendarIcon className="h-4 w-4 shrink-0" />
            <span className="shrink-0">{placeholder}</span>

            <div className="h-4 w-px bg-border shrink-0 mx-0.5" />

            <div className="flex items-center min-w-0 flex-1">
              {!value ? (
                <span className="text-muted-foreground/50 truncate text-[11px]">Не выбрано</span>
              ) : (
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1.5 font-normal h-5 bg-muted/80 text-[11px] text-foreground border border-border/40 max-w-full inline-flex items-center min-w-0"
                >
                  <span className="truncate">{format(value, 'dd.MM.yyyy', { locale: ru })}</span>
                </Badge>
              )}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          locale={ru}
          selected={value}
          month={month}
          onMonthChange={setMonth}
          onSelect={(date) => {
            onChange(date);
            setIsCalendarOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
