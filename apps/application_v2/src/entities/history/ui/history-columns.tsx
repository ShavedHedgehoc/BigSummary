import { cn } from '@/shared/lib';
import { TCommonHistoryItem } from '@repo/schemas';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { getStatusConfig } from '../model';
import { HistoryNoteCell } from './history-note-cell';

export const baseHistoryColumns: ColumnDef<TCommonHistoryItem>[] = [
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
      const dateObj = row.original.createdAt ? new Date(row.original.createdAt) : null;
      if (!dateObj) return <div className="text-center">-</div>;
      return (
        <div className="text-left tabular-nums text-[11px] font-mono text-muted-foreground">
          <span className="block">{format(dateObj, 'dd-MM-yyyy')}</span>
          <span className="block">{format(dateObj, 'HH:mm:ss')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'state',
    meta: { grow: false },
    header: () => (
      <div className="text-left font-semibold text-xs text-muted-foreground">Статус</div>
    ),
    cell: ({ row }) => {
      const config = getStatusConfig(row.original.value);
      return (
        <div className="text-left tabular-nums  text-xs text-foreground ">
          <div className="text-[10px] uppercase text-foreground ">
            {row.original.user ?? row.original.employee ?? '-'}
          </div>
          <div
            className={cn(
              config.color,
              'font-semibold  text-[10px] uppercase tracking-wider min-w-25 whitespace-normal wrap-break-words',
            )}
          >
            {row.original.description}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'desktop-note',
    meta: { grow: false, hideOnMobile: true, hideOnDesktop: false },
    header: () => (
      <div className="text-left font-semibold text-xs text-muted-foreground">Прим.</div>
    ),
    cell: ({ row }) => <HistoryNoteCell note={row.original.history_note} />,
  },
  {
    accessorKey: 'mobile-note',
    meta: { grow: false, hideOnMobile: false, hideOnDesktop: true },
    header: () => null,
    cell: ({ row }) => <HistoryNoteCell note={row.original.history_note} />,
  },
];
