import { cn } from '@/shared/lib';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui';
import { TCommonHistoryItem } from '@repo/schemas';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { HelpCircle } from 'lucide-react';
import { getStatusConfig } from '../model';

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

    cell: ({ row }) => {
      const note = row.original.history_note;
      if (!note) {
        return <div className="text-left text-xs text-muted-foreground/50 pl-2">—</div>;
      }
      return (
        <div className="flex justify-start pl-1">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-help p-1 rounded-md hover:bg-muted"
                  aria-label="Показать примечание"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" align="start" className="max-w-xs wrap-break-words">
                <p className="text-xs">{note}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: 'mobile-note',
    meta: { grow: false, hideOnMobile: false, hideOnDesktop: true },
    header: () => (
      <div className="text-left font-semibold text-xs text-muted-foreground">Прим.</div>
    ),
    cell: ({ row }) => {
      const note = row.original.history_note;
      if (!note) {
        return <div className="text-left text-xs text-muted-foreground/50 pl-2">—</div>;
      }
      return (
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground transition-colors cursor-help p-1 rounded-md hover:bg-muted"
              aria-label="Показать примечание"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-60 text-xs p-3">
            <p>{note}</p>
          </PopoverContent>
        </Popover>
      );
    },
  },
];
