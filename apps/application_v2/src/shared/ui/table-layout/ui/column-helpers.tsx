import { ColumnDef } from '@tanstack/react-table';
import { Minus } from 'lucide-react';
import { cn } from '@/shared/lib';

export const EmptyDash = () => <Minus className="h-3 w-3 text-muted-foreground/30 stroke-3" />;

export const renderHeader = (title: string, align: 'left' | 'right' = 'left') =>
  function HeaderCell() {
    return (
      <div
        className={cn(
          'text-xs text-muted-foreground',
          align === 'right' ? 'text-right' : 'text-left',
        )}
      >
        {title}
      </div>
    );
  };

export interface FullHdColumnOptions<TData> {
  key: string;
  title: string;
  renderValue: (item: TData) => React.ReactNode;
  getTextClassName?: (item: TData) => string;
  align?: 'left' | 'right';
  grow?: boolean;
  hideBelowFullHD?: boolean;
  cellClassName?: string;
}

export const createFullHdColumn = <TData,>({
  key,
  title,
  renderValue,
  getTextClassName,
  align = 'left',
  grow = false,
  hideBelowFullHD,
  cellClassName,
}: FullHdColumnOptions<TData>): ColumnDef<TData> => ({
  accessorKey: key,
  meta: {
    grow,
    hideOnMobile: true,
    hideBelowXL: true,
    ...(hideBelowFullHD !== undefined && { hideBelowFullHD }),
  },
  header: renderHeader(title, align),
  cell: ({ row }) => {
    const content = renderValue(row.original);
    const dynamicTextClass = getTextClassName?.(row.original);

    return (
      <div
        className={cn(
          align === 'right' ? 'text-right' : 'text-left',
          dynamicTextClass,
          cellClassName,
        )}
      >
        {content ?? <EmptyDash />}
      </div>
    );
  },
});
