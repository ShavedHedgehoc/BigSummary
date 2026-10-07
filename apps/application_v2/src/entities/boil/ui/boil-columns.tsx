import { TApplicationBoilItem } from '@repo/schemas';
import { ColumnDef } from '@tanstack/react-table';
import { Minus } from 'lucide-react';
import { TableStatus } from '@/entities/history';
import { cn } from 'cn';
import { TableNoteCell } from '@/shared/ui';

export const baseBoilListColumns: ColumnDef<TApplicationBoilItem>[] = [
  /* Мобильные колонки, показываются либо они, либо форма */
  {
    id: 'mobile-boil-info',
    meta: { grow: true, hideOnDesktop: true },
    header: () => <div className="text-left">Продукт</div>,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-0.5 py-1 text-left">
          <div className="text-xs font-mono text-muted-foreground flex items-center min-h-4">
            {row.original.baseCode ? (
              row.original.baseCode
            ) : (
              <Minus className="h-3 w-3 text-muted-foreground/30 stroke-3" />
            )}
          </div>
          <div className="text-xs font-medium text-foreground flex items-center min-h-4">
            {row.original.baseMarking ? (
              row.original.baseMarking
            ) : (
              <Minus className="h-3 w-3 text-muted-foreground/30 stroke-3" />
            )}
          </div>
          {row.original.boilValue ? (
            <span className="text-xs bg-muted px-1.5 py-0.5 rounded w-fit text-muted-foreground font-mono">
              {row.original.boilValue}
            </span>
          ) : (
            <div className="flex items-center min-h-5">
              <Minus className="h-3 w-3 text-muted-foreground/30 stroke-3" />
            </div>
          )}
        </div>
      );
    },
  },
  {
    id: 'mobile-data-info',
    meta: { grow: true, hideOnDesktop: true },
    header: () => <div className="text-left">Статус</div>,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-0.5 py-1 text-left">
          <span className="text-xs text-muted-foreground inline-flex items-center gap-1.5 vertical-align-middle">
            Площадка:{' '}
            {row.original.plant ?? (
              <Minus className="h-3 w-3 text-muted-foreground/50 stroke-[2.5] inline-block" />
            )}
          </span>
          <span className="text-xs  text-muted-foreground pb-0.5">
            Записей:{' '}
            <span
              className={cn(
                'text-[11px]',
                row.original.historiesCount === 0
                  ? 'text-muted-foreground '
                  : ' text-emerald-600 dark:text-emerald-400',
              )}
            >
              {row.original.historiesCount}
            </span>
          </span>
          <span className="w-fit">
            <TableStatus state={row.original.stateValue} stateDescription={row.original.state} />
          </span>
        </div>
      );
    },
  },
  /* 
  Колонки для экранов меньше FullHD, показываются вместе с формой, пока есть место. 
  Если места нет и форма активна - заменяются на форму.
   header всегда text-xs text-muted-foreground
   cell text-[11px]
  */
  {
    id: 'md-product-info',
    meta: { grow: true, hideOnMobile: true, showBelowXL: true },
    header: () => <div className="text-xs text-muted-foreground text-left">Продукт</div>,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-0.5 py-1 text-left">
          <span className="text-[11px] font-mono text-muted-foreground">
            {row.original.baseCode ?? <Minus className="h-3 w-3 text-muted-foreground/50" />}
          </span>
          <span className="text-[11px] font-medium text-foreground">
            {row.original.baseMarking ?? <Minus className="h-3 w-3 text-muted-foreground/50" />}
          </span>
          <span className="text-[11px] bg-muted py-0.5 rounded w-fit text-muted-foreground font-mono">
            {row.original.boilValue ?? <Minus className="h-3 w-3 text-muted-foreground/50" />}
          </span>
        </div>
      );
    },
  },
  {
    id: 'md-conveyor-info',
    meta: { grow: true, hideOnMobile: true, showBelowXL: true },
    header: () => <div className="text-xs text-muted-foreground text-left ">Данные</div>,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-0.5 py-1 text-left  min-w-0 w-full">
          <span className="text-[11px] text-muted-foreground">Площадка: {row.original.plant}</span>
          <span className="text-[11px] text-muted-foreground">
            В сводках:{' '}
            <span
              className={cn(
                row.original.recordsCount === 0
                  ? 'text-muted-foreground'
                  : ' text-emerald-600 dark:text-emerald-400',
              )}
            >
              {row.original.recordsCount}
            </span>
          </span>
          <span className="text-[11px] text-muted-foreground">
            Записей:{' '}
            <span
              className={cn(
                row.original.historiesCount === 0
                  ? 'text-muted-foreground'
                  : ' text-emerald-600 dark:text-emerald-400',
              )}
            >
              {row.original.historiesCount}
            </span>
          </span>
        </div>
      );
    },
  },

  /* Колонки для FullHD и больше. Показываются всегда вместе с формой 
  header всегда text-xs text-muted-foreground
  */
  {
    accessorKey: 'boil',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left text-xs text-muted-foreground">Партия</div>,
    cell: ({ row }) => {
      return <div className="text-left ">{row.original.boilValue}</div>;
    },
  },

  {
    accessorKey: 'marking',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left text-xs text-muted-foreground">Артикул</div>,
    cell: ({ row }) => (
      <div className="text-left  font-medium">
        {row.original.baseMarking ?? <Minus className="h-4 w-4 text-muted-foreground/50" />}
      </div>
    ),
  },
  {
    accessorKey: 'code',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left text-xs text-muted-foreground">Код 1С</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-mono ">
          {row.original.baseCode ?? <Minus className="h-4 w-4 text-muted-foreground/50" />}
        </div>
      );
    },
  },
  {
    accessorKey: 'plant',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left text-xs text-muted-foreground">Площадка</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left ">
          {row.original.plant ?? <Minus className="h-4 w-4 text-muted-foreground/50" />}
        </div>
      );
    },
  },
  {
    accessorKey: 'recordsCount',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-right text-xs text-muted-foreground">В сводках</div>,
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
          {row.original.recordsCount}
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
    accessorKey: 'historiesNote',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-center text-xs text-muted-foreground">Прим.</div>,
    cell: ({ row }) => {
      const histories = row.original.histories;
      const lastHistory = histories?.length ? histories[histories.length - 1] : null;
      return <TableNoteCell note={lastHistory?.history_note ?? null} className="justify-center" />;
    },
  },
  /* Статус, на больших экранах всегда справа */
  {
    accessorKey: 'state',
    meta: { grow: false, hideOnMobile: true },
    header: () => <div className="text-right text-xs text-muted-foreground pr-4">Статус</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-right w-full pr-4 ">
          <TableStatus state={row.original.stateValue} stateDescription={row.original.state} />
        </div>
      );
    },
  },
  /* 
  Селектор. Показывается на всех экранах 
  Перенесен в виджеты.
  */
];
