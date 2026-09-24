import { cn } from '@/shared/lib';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import { useMemo } from 'react';

export interface ISelectorWithIconListItem<T extends string = string> {
  value: T;
  description: string;
}

export interface IFilterSelectorProps<T extends string = string> extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'value' | 'onChange'
> {
  value: T | undefined;
  onChange: (val: T | undefined | null) => void;
  className?: string;
  contentClassName?: string;
  itemClassName?: string;
  items: readonly ISelectorWithIconListItem<T>[];
  icon?: React.ReactNode;
}

export function SelectorWithIcon<T extends string>({
  value,
  onChange,
  className,
  contentClassName,
  itemClassName,
  items,
  icon,
  ...props
}: IFilterSelectorProps<T>) {
  const currentValue = (value ?? 'All') as T | 'All';
  const currentDescription = useMemo(() => {
    return items.find((x) => (x.value as string) === currentValue)?.description || 'All';
  }, [currentValue, items]);

  const onValueChange = (val: string) => {
    if (val === 'All') {
      onChange(undefined);
    } else {
      onChange(val as T);
    }
  };

  return (
    <Select value={currentValue as string} onValueChange={onValueChange}>
      <SelectTrigger
        {...props}
        size="sm"
        className={cn('w-full justify-between focus:ring-0 focus:ring-offset-0', className)}
      >
        <div
          className={cn(
            'flex items-center gap-3 w-full',
            currentValue !== 'All' ? 'text-foreground' : 'text-muted-foreground',
          )}
        >
          {icon}
          <SelectValue>{currentDescription}</SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent className={cn('bg-background shadow-none', contentClassName)}>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value} className={cn(itemClassName)}>
              {item.description}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
