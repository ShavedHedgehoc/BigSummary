import { cn } from '@/shared/lib';
import { TCommonTraceCanRecordItem } from '@repo/schemas';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { CAN_STATE_CONFIG } from '../model/can-state-config';

export const baseCanStateColumns: ColumnDef<TCommonTraceCanRecordItem>[] = [
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
      const dateObj = row.original.stateTime ? new Date(row.original.stateTime) : null;
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
      const currentStatus = row.original.stateValue;
      const configKey = (currentStatus ?? 'null') as keyof typeof CAN_STATE_CONFIG;
      const config = CAN_STATE_CONFIG[configKey];
      return (
        <div className="text-left tabular-nums  text-xs text-foreground ">
          <div className="text-[10px] uppercase text-foreground ">{row.original.author ?? '-'}</div>
          <div
            className={cn(
              config.text,
              'font-semibold  text-[10px] uppercase tracking-wider min-w-25 whitespace-normal wrap-break-words',
            )}
          >
            {row.original.state}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'base',
    meta: { grow: false },
    header: () => (
      <div className="text-left font-semibold text-xs text-muted-foreground">Основа</div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-left tabular-nums  text-xs text-foreground ">
          <div className="font-semibold  text-[10px] uppercase text-foreground ">
            {row.original.baseContain ?? ''}
          </div>
          <div
            className={cn(
              //   config.color,
              'text-[10px] uppercase tracking-wider min-w-25 whitespace-normal wrap-break-words',
            )}
          >
            {row.original.baseContainMarking ?? ''}
          </div>
        </div>
      );
    },
  },
];
