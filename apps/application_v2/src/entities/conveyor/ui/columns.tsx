import { TApplicationConveyorItem } from '@repo/schemas';
import { ColumnDef } from '@tanstack/react-table';
import { Minus } from 'lucide-react';
import { ConveyorRecordCell } from './conveyor-records-cell';

export const baseConveyorColumns: ColumnDef<TApplicationConveyorItem>[] = [
  /* Мобильные колонки, показываются либо они, либо форма */

  {
    accessorKey: 'mobile-value',
    meta: { grow: true, hideOnDesktop: true },
    header: () => <div className="text-left text-xs text-muted-foreground pl-3">Конвейер</div>,
    cell: ({ row }) => <div className="text-xs text-left pl-3">{row.original.value}</div>,
  },
  {
    accessorKey: 'mobile-records',
    meta: { grow: true, hideOnDesktop: true },
    header: () => <div className="text-left text-xs text-muted-foreground"></div>,
    cell: ({ row }) => (
      <div className="text-xs text-left pl-3">
        <ConveyorRecordCell conveyor={row.original} showTitle={false} />
      </div>
    ),
  },
  {
    accessorKey: 'mobile-barcode',
    meta: { grow: true, hideOnDesktop: true },
    header: () => <div className="text-left  text-xs text-muted-foreground">Штрихкод</div>,
    cell: ({ row }) => (
      <div className="text-xs text-left tabular-nums">
        {row.original.barcode ? (
          row.original.barcode
        ) : (
          <Minus className="h-3 w-3 text-muted-foreground/30 stroke-3" />
        )}
      </div>
    ),
  },
  /* 
  Колонки для экранов меньше FullHD, показываются вместе с формой, пока есть место. 
  Если места нет и форма активна - заменяются на форму.
   header всегда text-xs text-muted-foreground
   cell text-[11px]
  */

  {
    accessorKey: 'md-value',
    meta: { grow: false, hideOnMobile: true, showBelowXL: true },
    header: () => <div className="text-left text-xs text-muted-foreground pl-3">Конвейер</div>,
    cell: ({ row }) => <div className="text-left pl-3">{row.original.value}</div>,
  },
  {
    accessorKey: 'md-records',
    meta: { grow: false, hideOnMobile: true, showBelowXL: true },
    header: () => <div className="text-left text-xs text-muted-foreground pl-3">Записи</div>,
    cell: ({ row }) => (
      <div className="text-xs text-left">
        <ConveyorRecordCell conveyor={row.original} showTitle={true} />
      </div>
    ),
  },
  {
    accessorKey: 'md-barcode',
    meta: { grow: true, hideOnMobile: true, showBelowXL: true },
    header: () => <div className="text-left  text-xs text-muted-foreground">Штрихкод</div>,
    cell: ({ row }) => (
      <div className="text-left  tabular-nums">
        {row.original.barcode ? (
          row.original.barcode
        ) : (
          <Minus className="h-3 w-3 text-muted-foreground/30 stroke-3" />
        )}
      </div>
    ),
  },
  /* Колонки для FullHD и больше. Показываются всегда вместе с формой 
  header всегда text-xs text-muted-foreground
  */
  {
    accessorKey: 'value',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left text-xs text-muted-foreground pl-3">Конвейер</div>,
    cell: ({ row }) => <div className="text-left pl-3">{row.original.value}</div>,
  },
  {
    accessorKey: 'Записи',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left text-xs text-muted-foreground pl-3">Записи</div>,
    cell: ({ row }) => (
      <div className="text-xs text-left">
        <ConveyorRecordCell conveyor={row.original} showTitle={true} />
      </div>
    ),
  },
  {
    accessorKey: 'barcode',
    meta: { grow: true, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left  text-xs text-muted-foreground">Штрихкод</div>,
    cell: ({ row }) => (
      <div className="text-left tabular-nums">
        {row.original.barcode ? (
          row.original.barcode
        ) : (
          <Minus className="h-3 w-3 text-muted-foreground/30 stroke-3" />
        )}
      </div>
    ),
  },

  /* 
  Селектор. Показывается на всех экранах 
  Перенесен в виджеты.
  */
];
