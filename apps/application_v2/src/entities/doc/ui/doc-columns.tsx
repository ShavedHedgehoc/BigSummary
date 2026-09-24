import { TApplicationDocItem } from '@repo/schemas';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { DocStatus } from './doc-status';
import { cn } from '@/shared/lib';

export const baseDocColumns: ColumnDef<TApplicationDocItem>[] = [
  {
    accessorKey: 'state',
    meta: { grow: false },

    header: () => (
      <div className="flex justify-center text-center font-semibold text-xs text-muted-foreground">
        <span className="hidden md:block">Статус</span>
        <span className="block md:hidden w-6 ">C</span>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-center ">
          <DocStatus item={row.original} />
        </div>
      );
    },
  },

  {
    accessorKey: 'date',
    meta: { grow: false },
    header: () => (
      <div className="text-left font-semibold text-xs text-muted-foreground">
        <span className="hidden md:block">Дата</span>
        <span className="block md:hidden ">Дата</span>
      </div>
    ),
    cell: ({ row }) => {
      const dateObj = row.original.date ? new Date(row.original.date) : null;
      if (!dateObj) return <div className="text-left">-</div>;
      return (
        <div className="text-left tabular-nums font-mono">
          <span className="hidden md:block">{format(dateObj, 'dd-MM-yyyy')}</span>
          <span className="block md:hidden text-xs text-foreground bg-muted/60 px-1.5 py-0.5 rounded-md">
            {format(dateObj, 'dd-MM-yyyy')}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: 'plant',
    meta: { grow: false },
    header: () => (
      <div className="text-left font-semibold text-xs text-muted-foreground">
        <span className="hidden md:block">Площадка</span>
        <span className="block md:hidden w-6 text-center">П</span>
      </div>
    ),
    cell: ({ row }) => {
      const plantName = row.original.plant || '';
      const firstLetter = plantName.charAt(0).toUpperCase();

      return (
        <div className="text-left font-medium">
          <span className="hidden md:block">{plantName}</span>
          <span className="block md:hidden text-muted-foreground bg-muted w-6 h-6 text-center leading-6 rounded-md text-xs">
            {firstLetter}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: 'recordsCount',
    meta: { hideOnMobile: true },
    header: () => (
      <div className="hidden lg:block text-right pr-4 font-semibold text-xs text-muted-foreground">
        Строк сводки
      </div>
    ),
    cell: ({ getValue }) => {
      const count = getValue<number>();
      return (
        <div className="hidden lg:block text-right pr-4 font-mono font-medium">
          {count ?? <span className="text-muted-foreground/40">—</span>}
        </div>
      );
    },
  },

  {
    accessorKey: 'historiesCount',
    meta: { hideOnMobile: true },
    header: () => (
      <div className="hidden lg:block text-right pr-4 font-semibold text-xs text-muted-foreground">
        Записей
      </div>
    ),
    cell: ({ getValue }) => {
      const count = getValue<number>();

      return (
        <div
          className={cn(
            'hidden lg:block text-right pr-4 font-mono',
            count === 0
              ? 'text-muted-foreground/35 font-normal'
              : 'font-semibold text-emerald-600 dark:text-emerald-400',
          )}
        >
          {count}
        </div>
      );
    },
  },
];
