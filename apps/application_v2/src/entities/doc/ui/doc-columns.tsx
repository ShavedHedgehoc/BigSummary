import { TApplicationDocItem } from '@repo/schemas';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { DocStatus } from './doc-status';
import { cn } from '@/shared/lib';

export const baseDocColumns: ColumnDef<TApplicationDocItem>[] = [
  /* Мобильные колонки, показываются либо они, либо форма */
  {
    accessorKey: 'mobile-state',
    meta: { grow: false, hideOnDesktop: true },
    header: () => <div className="text-center">?</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center ">
          <DocStatus item={row.original} />
        </div>
      );
    },
  },
  {
    accessorKey: 'mobile-date',
    meta: { grow: false, hideOnDesktop: true },
    header: () => <div className="text-left">Дата</div>,
    cell: ({ row }) => {
      const dateObj = row.original.date ? new Date(row.original.date) : null;
      if (!dateObj) return <div className="text-left">-</div>;
      return (
        <div className="text-left tabular-nums font-mono">
          <span className=" text-xs text-muted-foreground ">{format(dateObj, 'dd-MM-yyyy')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'mobile-plant',
    meta: { grow: true, hideOnDesktop: true },
    header: () => <div className="text-center">П</div>,
    cell: ({ row }) => {
      const plantName = row.original.plant || '';
      const firstLetter = plantName.charAt(0).toUpperCase();
      return (
        <div className="text-center">
          <span className="text-muted-foreground bg-muted w-6 h-6 text-center leading-6 rounded-md text-xs">
            {firstLetter}
          </span>
        </div>
      );
    },
  },
  /* Колонки для FullHD и больше. Показываются всегда вместе с формой 
  header всегда text-xs text-muted-foreground
  */

  {
    accessorKey: 'date',
    meta: { grow: false, hideOnMobile: true },
    header: () => <div className="text-left text-xs text-muted-foreground">Дата</div>,
    cell: ({ row }) => {
      const dateObj = row.original.date ? new Date(row.original.date) : null;
      if (!dateObj) return <div className="text-left">-</div>;
      return (
        <div className="text-left tabular-nums font-mono">{format(dateObj, 'dd-MM-yyyy')}</div>
      );
    },
  },

  {
    accessorKey: 'plant',
    meta: { grow: false, hideOnMobile: true },
    header: () => <div className="text-left text-xs text-muted-foreground">Площадка</div>,
    cell: ({ row }) => {
      const plantName = row.original.plant || '';

      return (
        <div className="text-left font-medium">
          <span className="text-left">{plantName}</span>
        </div>
      );
    },
  },

  {
    accessorKey: 'recordsCount',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-right text-xs text-muted-foreground">Строк сводки</div>,
    cell: ({ row }) => {
      return (
        <div
          className={cn(
            'text-right font-mono',
            row.original.recordsCount === 0
              ? 'text-muted-foreground'
              : ' text-emerald-600 dark:text-emerald-400',
          )}
        >
          {row.original.historiesCount}
        </div>
      );
    },
  },

  {
    accessorKey: 'historiesCount',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-right text-xs text-muted-foreground">Записей</div>,
    cell: ({ row }) => {
      return (
        <div
          className={cn(
            'text-right font-mono',
            row.original.historiesCount === 0
              ? 'text-muted-foreground'
              : ' text-emerald-600 dark:text-emerald-400',
          )}
        >
          {row.original.historiesCount}
        </div>
      );
    },
  },
  {
    accessorKey: 'state',
    meta: { grow: true, hideOnMobile: true },
    header: () => <div className="text-right text-xs text-muted-foreground">Статус</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end w-full ">
          <DocStatus item={row.original} />
        </div>
      );
    },
  },
];
