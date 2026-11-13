import { cn } from '@/shared/lib';
import { EmptyDash } from '@/shared/ui';
import { TApplicationTraceWeightingDetailItem } from '@repo/schemas';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { LoadStatus } from '../model/load-status';

export const baseWeightingDetailColumns: ColumnDef<TApplicationTraceWeightingDetailItem>[] = [
  {
    accessorKey: 'mobile-state',
    meta: {
      grow: false,
      // hideOnDesktop: true
    },
    header: () => <div className="text-center">?</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center ">
          <LoadStatus item={row.original} />
        </div>
      );
    },
  },

  {
    accessorKey: 'weighting',
    meta: { grow: true },
    header: () => (
      <div className="text-left font-semibold text-xs text-muted-foreground">Взвешивание</div>
    ),
    cell: ({ row }) => {
      const item = row.original;
      const dateObj = item.weightingDate ? new Date(item.weightingDate) : null;
      return (
        <div className={cn('flex flex-col gap-0.5 py-1 text-left text-[11px]')}>
          <div className={cn('font-medium flex items-center min-h-4 min-w-0 max-w-40')}>
            {item.productName ? (
              <span className="leading-none truncate block">{item.authorName}</span>
            ) : (
              <EmptyDash />
            )}
          </div>
          <div className={cn('font-mono flex items-center min-h-4')}>
            {dateObj ? (
              `${format(dateObj, 'dd-MM-yyyy')} ${format(dateObj, 'HH:mm:ss')}`
            ) : (
              <EmptyDash />
            )}
          </div>
          <div className={cn('font-mono tabular-nums flex items-center min-h-4 min-w-0 max-w-40')}>
            {item.productName ? (
              <span className="leading-none truncate block">{item.lotName}</span>
            ) : (
              <EmptyDash />
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'quantity',
    meta: { grow: false },
    header: () => (
      <div className="text-right font-semibold text-xs text-muted-foreground">К-во</div>
    ),
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className={cn('font-mono tabular-nums flex items-center justify-end min-h-4 text-xs')}>
          {item.quantity.toLocaleString('ru-RU')}
        </div>
      );
    },
  },
];
