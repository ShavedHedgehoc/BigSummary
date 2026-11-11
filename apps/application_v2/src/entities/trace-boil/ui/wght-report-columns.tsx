import { TApplicationTraceBoilWghtReportRowItem } from '@repo/schemas';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { cn } from '@/shared/lib';
import { Minus } from 'lucide-react';
// import { Minus } from 'lucide-react';

export const baseWghtReportColumns: ColumnDef<TApplicationTraceBoilWghtReportRowItem>[] = [
  /* Мобильные колонки, показываются либо они, либо форма */

  {
    id: 'mobile-batch-info',
    meta: { grow: false, hideOnDesktop: true },
    header: () => <div className="text-left">Варка</div>,
    cell: ({ row }) => {
      const dateObj = row.original.batchDate ? new Date(row.original.batchDate) : null;
      return (
        <div className="flex flex-col gap-0.5 py-1 text-left text-[11px]">
          <div
            className={cn(
              'font-mono text-muted-foreground flex items-center min-h-4',
              row.original.planQuantity !== row.original.factQuantity && 'text-destructive',
            )}
          >
            {dateObj ? (
              format(dateObj, 'dd-MM-yyyy')
            ) : (
              <Minus className="h-3 w-3 text-muted-foreground/30 stroke-3" />
            )}
          </div>
          <div
            className={cn(
              'font-medium text-foreground flex items-center min-h-4 min-w-0 max-w-60',
              row.original.planQuantity !== row.original.factQuantity && 'text-destructive',
            )}
          >
            <span className="leading-none truncate block">{row.original.plantName}</span>
          </div>
          <div
            className={cn(
              'font-mono text-muted-foreground flex items-center min-h-4',
              row.original.planQuantity !== row.original.factQuantity && 'text-destructive',
            )}
          >
            {row.original.batchName ? (
              row.original.batchName
            ) : (
              <Minus className="h-3 w-3 text-muted-foreground/30 stroke-3" />
            )}
          </div>
        </div>
      );
    },
  },
  {
    id: 'mobile-product-info',
    meta: { grow: true, hideOnDesktop: true },
    header: () => <div className="text-left">Номенклатура</div>,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-0.5 py-1 text-left text-[11px]">
          <div
            className={cn(
              'font-mono text-muted-foreground flex items-center min-h-4',
              row.original.planQuantity !== row.original.factQuantity && 'text-destructive',
            )}
          >
            {row.original.productId ? (
              row.original.productId
            ) : (
              <Minus className="h-3 w-3 text-muted-foreground/30 stroke-3" />
            )}
          </div>
          <div
            className={cn(
              'font-medium text-foreground flex items-center min-h-4 min-w-0 max-w-40',
              row.original.planQuantity !== row.original.factQuantity && 'text-destructive',
            )}
          >
            {row.original.productName ? (
              <span className="leading-none truncate block">{row.original.productName}</span>
            ) : (
              <Minus className="h-3 w-3 text-muted-foreground/30 stroke-3" />
            )}
          </div>
          <span
            className={cn(
              'bg-muted px-1 py-1 rounded w-fit text-muted-foreground ',
              row.original.planQuantity !== row.original.factQuantity &&
                'text-destructive bg-destructive/20',
            )}
          >
            План-Факт: {row.original.planQuantity.toLocaleString('ru-RU')}
            {' / '}
            {row.original.factQuantity.toLocaleString('ru-RU')}
          </span>
        </div>
      );
    },
  },

  /* 
    Колонки для экранов меньше FullHD.     
     header всегда text-xs text-muted-foreground
     cell text-[11px]
    */

  {
    id: 'md-batch-info',
    meta: { grow: false, hideOnMobile: true, showBelowXL: true },
    header: () => <div className="text-xs text-muted-foreground text-left">Варка</div>,
    cell: ({ row }) => {
      const dateObj = row.original.batchDate ? new Date(row.original.batchDate) : null;

      return (
        <div className="flex flex-col gap-0.5 py-1 text-left text-xs">
          <div
            className={cn(
              'font-mono text-muted-foreground flex items-center min-h-4',
              row.original.planQuantity !== row.original.factQuantity && 'text-destructive',
            )}
          >
            {dateObj ? (
              format(dateObj, 'dd-MM-yyyy')
            ) : (
              <Minus className="h-3 w-3 text-muted-foreground/30 stroke-3" />
            )}
          </div>
          <div
            className={cn(
              'font-medium text-foreground flex items-center min-h-4 min-w-0 max-w-60',
              row.original.planQuantity !== row.original.factQuantity && 'text-destructive',
            )}
          >
            <span className="leading-none truncate block">{row.original.plantName}</span>
          </div>
          <div
            className={cn(
              'font-mono text-muted-foreground flex items-center min-h-4',
              row.original.planQuantity !== row.original.factQuantity && 'text-destructive',
            )}
          >
            {row.original.batchName ? (
              row.original.batchName
            ) : (
              <Minus className="h-3 w-3 text-muted-foreground/30 stroke-3" />
            )}
          </div>
        </div>
      );
    },
  },

  {
    id: 'md-product-info',
    meta: { grow: true, hideOnMobile: true, showBelowXL: true },
    header: () => <div className="text-xs text-muted-foreground text-left">Номенклатура</div>,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-0.5 py-1 text-left text-xs">
          <div
            className={cn(
              'font-mono text-muted-foreground flex items-center min-h-4',
              row.original.planQuantity !== row.original.factQuantity && 'text-destructive',
            )}
          >
            {row.original.productId ? (
              row.original.productId
            ) : (
              <Minus className="h-3 w-3 text-muted-foreground/30 stroke-3" />
            )}
          </div>
          <div
            className={cn(
              'font-medium text-foreground flex items-center min-h-4 min-w-0 max-w-40',
              row.original.planQuantity !== row.original.factQuantity && 'text-destructive',
            )}
          >
            {row.original.productName ? (
              <span className="leading-none truncate block">{row.original.productName}</span>
            ) : (
              <Minus className="h-3 w-3 text-muted-foreground/30 stroke-3" />
            )}
          </div>
        </div>
      );
    },
  },

  {
    id: 'md-plan-fact-info',
    meta: { grow: false, hideOnMobile: true, showBelowXL: true },
    header: () => <div className="text-xs text-muted-foreground text-right">План/Факт</div>,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-0.5 py-1 text-right text-xs font-mono text-muted-foreground">
          <div
            className={cn(
              'flex items-center justify-end flex items-center min-h-4',
              row.original.planQuantity !== row.original.factQuantity && 'text-destructive',
            )}
          >
            {row.original.planQuantity}
          </div>
          <div
            className={cn(
              'flex items-center justify-end flex items-center min-h-4',
              row.original.planQuantity !== row.original.factQuantity && 'text-destructive',
            )}
          >
            {row.original.factQuantity}
          </div>
        </div>
      );
    },
  },

  /* Колонки для FullHD и больше. Показываются всегда вместе с формой 
  header всегда text-xs text-muted-foreground
  */

  {
    accessorKey: 'date',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left text-xs text-muted-foreground">Дата</div>,
    cell: ({ row }) => {
      const dateObj = row.original.batchDate ? new Date(row.original.batchDate) : null;
      if (!dateObj)
        return (
          <div className="text-left">
            <Minus className="h-3 w-3 text-muted-foreground/30 stroke-3" />
          </div>
        );
      return (
        <div
          className={cn(
            'text-left tabular-nums font-mono',
            row.original.planQuantity !== row.original.factQuantity && 'text-destructive',
          )}
        >
          {format(dateObj, 'dd-MM-yyyy')}
        </div>
      );
    },
  },
  {
    accessorKey: 'plant',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true, hideBelowFullHD: false },
    header: () => <div className="text-left text-xs text-muted-foreground">Площадка</div>,
    cell: ({ row }) => {
      return (
        <div
          className={cn(
            'text-left font-medium tabular-nums',
            row.original.planQuantity !== row.original.factQuantity && 'text-destructive',
          )}
        >
          {row.original.plantName}
        </div>
      );
    },
  },
  {
    accessorKey: 'batch',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true, hideBelowFullHD: false },
    header: () => <div className="text-left text-xs text-muted-foreground">Партия</div>,
    cell: ({ row }) => {
      return (
        <div
          className={cn(
            'text-left font-medium tabular-nums',
            row.original.planQuantity !== row.original.factQuantity && 'text-destructive',
          )}
        >
          {row.original.batchName}
        </div>
      );
    },
  },
  {
    accessorKey: 'produсtCode',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left text-xs text-muted-foreground">Код 1С</div>,
    cell: ({ row }) => {
      return (
        <div
          className={cn(
            'text-left font-medium tabular-nums',
            row.original.planQuantity !== row.original.factQuantity && 'text-destructive',
          )}
        >
          <span className="text-left">{row.original.productId}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'produсtName',
    meta: { grow: true, hideOnMobile: true, hideBelowXL: true, hideBelowFullHD: false },
    header: () => <div className="text-left text-xs text-muted-foreground">Наименование</div>,
    cell: ({ row }) => {
      return (
        <div
          className={cn(
            'text-left font-medium min-w-0 max-w-100',
            row.original.planQuantity !== row.original.factQuantity && 'text-destructive',
          )}
        >
          <span className="leading-none truncate block">{row.original.productName}</span>
        </div>
      );
    },
  },

  {
    accessorKey: 'planQuantity',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-right text-xs text-muted-foreground">План</div>,
    cell: ({ row }) => {
      return (
        <div
          className={cn(
            'text-right font-mono',
            row.original.planQuantity !== row.original.factQuantity && 'text-destructive',
          )}
        >
          {row.original.planQuantity.toLocaleString('ru-RU')}
        </div>
      );
    },
  },
  {
    accessorKey: 'factQuantity',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-right text-xs text-muted-foreground">Факт</div>,
    cell: ({ row }) => {
      return (
        <div
          className={cn(
            'text-right font-mono',
            row.original.planQuantity !== row.original.factQuantity && 'text-destructive',
          )}
        >
          {row.original.factQuantity.toLocaleString('ru-RU')}
        </div>
      );
    },
  },
];
