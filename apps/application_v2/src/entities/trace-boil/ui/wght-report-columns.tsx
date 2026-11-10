import { TApplicationTraceBoilWghtReportRowItem } from '@repo/schemas';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { cn } from '@/shared/lib';
// import { Minus } from 'lucide-react';

export const baseWghtReportColumns: ColumnDef<TApplicationTraceBoilWghtReportRowItem>[] = [
  /* Мобильные колонки, показываются либо они, либо форма */
  //   {
  //     accessorKey: 'mobile-state',
  //     meta: { grow: false, hideOnDesktop: true },
  //     header: () => <div className="text-left">Продукт</div>,
  //     cell: ({ row }) => {
  //       return (
  //         <div className="flex flex-col gap-0.5 py-1 text-left text-[11px] min-w-0 max-w-40">
  //           <div className=" font-mono text-muted-foreground flex items-center min-h-4">
  //             {row.original.productId ? (
  //               row.original.productId
  //             ) : (
  //               <Minus className="h-3 w-3 text-muted-foreground/30 stroke-3" />
  //             )}
  //           </div>
  //           <div className=" font-medium text-foreground flex items-center min-h-4">
  //             {row.original.productName ? (
  //               <span className="leading-none truncate block">{row.original.productName}</span>
  //             ) : (
  //               <Minus className="h-3 w-3 text-muted-foreground/30 stroke-3" />
  //             )}
  //           </div>
  //           {row.original.lotName ? (
  //             <span className="bg-muted px-1.5 py-1 rounded w-fit text-muted-foreground font-mono">
  //               {row.original.lotName}
  //             </span>
  //           ) : (
  //             <div className="flex items-center min-h-5">
  //               <Minus className="h-3 w-3 text-muted-foreground/30 stroke-3" />
  //             </div>
  //           )}
  //         </div>
  //       );
  //     },
  //   },

  //   {
  //     accessorKey: 'mobile-data',
  //     meta: { grow: false, hideOnDesktop: true },
  //     header: () => <div className="text-right">Данные</div>,
  //     cell: ({ row }) => {
  //       const dateObj = row.original.expDate ? new Date(row.original.expDate) : null;
  //       return (
  //         <div className="flex flex-col gap-0.5 py-1 text-right text-[11px] font-mono tabular-nums">
  //           <div
  //             className={cn(
  //               'tabular-nums font-mono',
  //               row.original.isLessThenExpRest && 'text-destructive',
  //             )}
  //           >
  //             {dateObj ? (
  //               format(dateObj, 'dd-MM-yyyy')
  //             ) : (
  //               <Minus className="h-3 w-3 text-muted-foreground/30 stroke-3" />
  //             )}
  //           </div>
  //           <div
  //             className={cn(
  //               'text-foreground flex  items-center justify-end min-h-4',
  //               row.original.isLessThenExpRest && 'text-destructive',
  //             )}
  //           >
  //             {row.original.quantity.toLocaleString('ru-RU')} кг
  //           </div>
  //           <div className="">
  //             <span
  //               className={cn(
  //                 'bg-muted px-1.5 py-1 rounded w-fit text-muted-foreground ',
  //                 row.original.isLessThenExpRest && 'text-destructive bg-destructive/20',
  //               )}
  //             >
  //               Дней: {row.original.daysToExp.toLocaleString('ru-RU')}
  //             </span>
  //           </div>
  //         </div>
  //       );
  //     },
  //   },

  /* 
    Колонки для экранов меньше FullHD.     
     header всегда text-xs text-muted-foreground
     cell text-[11px]
    */
  //   {
  //     id: 'md-product-info',
  //     meta: { grow: true, hideOnMobile: true, showBelowXL: true },
  //     header: () => <div className="text-xs text-muted-foreground text-left">Номенклатура</div>,
  //     cell: ({ row }) => {
  //       return (
  //         <div className="flex flex-col gap-0.5 py-1 text-left text-xs">
  //           <div className=" font-mono text-muted-foreground flex items-center min-h-4">
  //             {row.original.productId ? (
  //               row.original.productId
  //             ) : (
  //               <Minus className="h-3 w-3 text-muted-foreground/30 stroke-3" />
  //             )}
  //           </div>
  //           <div className="font-medium text-foreground flex items-center min-h-4 min-w-0 max-w-60">
  //             {row.original.productName ? (
  //               <span className="leading-none truncate block">{row.original.productName}</span>
  //             ) : (
  //               <Minus className="h-3 w-3 text-muted-foreground/30 stroke-3" />
  //             )}
  //           </div>
  //           {row.original.lotName ? (
  //             <span className="bg-muted px-1.5 py-1 rounded w-fit text-muted-foreground font-mono">
  //               Партия: {row.original.lotName}
  //             </span>
  //           ) : (
  //             <div className="flex items-center min-h-5">
  //               <Minus className="h-3 w-3 text-muted-foreground/30 stroke-3" />
  //             </div>
  //           )}
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     id: 'md-exp-info',
  //     meta: { grow: false, hideOnMobile: true, showBelowXL: true },
  //     header: () => <div className="text-xs text-muted-foreground text-left">Срок годности</div>,
  //     cell: ({ row }) => {
  //       const dateObj = row.original.expDate ? new Date(row.original.expDate) : null;
  //       return (
  //         <div className="flex flex-col gap-0.5 py-1 text-left text-xs font-mono tabular-nums">
  //           <div
  //             className={cn(
  //               'tabular-nums font-mono',
  //               row.original.isLessThenExpRest && 'text-destructive',
  //             )}
  //           >
  //             {dateObj ? (
  //               format(dateObj, 'dd-MM-yyyy')
  //             ) : (
  //               <Minus className="h-3 w-3 text-muted-foreground/30 stroke-3" />
  //             )}
  //           </div>
  //           <div
  //             className={cn(
  //               'text-foreground flex items-center min-h-4',
  //               row.original.isLessThenExpRest && 'text-destructive',
  //             )}
  //           >
  //             {row.original.quantity.toLocaleString('ru-RU')} кг
  //           </div>
  //           <span
  //             className={cn(
  //               'bg-muted px-1.5 py-1 rounded w-fit text-muted-foreground ',
  //               row.original.isLessThenExpRest && 'text-destructive bg-destructive/20',
  //             )}
  //           >
  //             Дней: {row.original.daysToExp.toLocaleString('ru-RU')}
  //           </span>
  //         </div>
  //       );
  //     },
  //   },

  /* Колонки для FullHD и больше. Показываются всегда вместе с формой 
  header всегда text-xs text-muted-foreground
  */

  {
    accessorKey: 'date',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left text-xs text-muted-foreground">Дата</div>,
    cell: ({ row }) => {
      const dateObj = row.original.batchDate ? new Date(row.original.batchDate) : null;
      if (!dateObj) return <div className="text-left">-</div>;
      return (
        <div
          className={cn(
            'text-left tabular-nums font-mono',
            // row.original.isLessThenExpRest && 'text-destructive',
          )}
        >
          {format(dateObj, 'dd-MM-yyyy')}
        </div>
      );
    },
  },
  {
    accessorKey: 'batch',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true, hideBelowFullHD: true },
    header: () => <div className="text-left text-xs text-muted-foreground">Партия</div>,
    cell: ({ row }) => {
      return (
        <div
          className={cn(
            'text-left font-medium tabular-nums',
            // row.original.isLessThenExpRest && 'text-destructive',
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
            // row.original.isLessThenExpRest && 'text-destructive',
          )}
        >
          <span className="text-left">{row.original.productId}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'produсtName',
    meta: { grow: true, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left text-xs text-muted-foreground">Наименование</div>,
    cell: ({ row }) => {
      return (
        <div
          className={cn(
            'text-left font-medium min-w-0 max-w-120',
            // row.original.isLessThenExpRest && 'text-destructive',
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
            // row.original.isLessThenExpRest && 'text-destructive',
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
    header: () => <div className="text-right text-xs text-muted-foreground">План</div>,
    cell: ({ row }) => {
      return (
        <div
          className={cn(
            'text-right font-mono',
            // row.original.isLessThenExpRest && 'text-destructive',
          )}
        >
          {row.original.factQuantity.toLocaleString('ru-RU')}
        </div>
      );
    },
  },
];
