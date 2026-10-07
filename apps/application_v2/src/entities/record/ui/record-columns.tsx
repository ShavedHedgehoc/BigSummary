import { TApplicationDocDetailRowItem } from '@repo/schemas';
import { ColumnDef } from '@tanstack/react-table';

import { TableStatus } from '@/entities/history';
import { RecordNoteCell } from './record-note-cell';

export const baseRecordColumns: ColumnDef<TApplicationDocDetailRowItem>[] = [
  /* Мобильные колонки, показываются либо они, либо форма */
  {
    id: 'mobile-product-info',
    meta: { grow: true, hideOnDesktop: true },
    header: () => <div className="text-left">Продукт</div>,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-0.5 py-1 text-left">
          <span className="text-xs font-mono text-muted-foreground">
            {row.original.productCode}
          </span>
          <span className="text-xs font-medium text-foreground">{row.original.marking}</span>
          <span className="text-xs bg-muted py-0.5 rounded w-fit text-muted-foreground font-mono">
            {row.original.boil}
          </span>
        </div>
      );
    },
  },
  {
    id: 'mobile-conveyor-info',
    meta: { grow: true, hideOnDesktop: true },
    header: () => <div className="text-left">Статус</div>,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-0.5 py-1 text-left">
          <span className="text-xs  text-muted-foreground">Конвейер: {row.original.conveyor}</span>
          <span className="text-xs  text-muted-foreground">План: {row.original.plan}</span>
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
            {row.original.productCode}
          </span>
          <span className="text-[11px] font-medium text-foreground">{row.original.marking}</span>
          <span className="text-[11px] bg-muted py-0.5 rounded w-fit text-muted-foreground font-mono">
            {row.original.boil}
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
          <span className="text-[11px] text-muted-foreground">
            Конвейер: {row.original.conveyor}
          </span>
          <span className="text-[11px] text-muted-foreground">
            Аппарат: {row.original.apparatus}
          </span>
          <span className="text-[11px] text-muted-foreground">Емкость: {row.original.can}</span>
          <span className="text-[11px] text-muted-foreground">
            План: {row.original.plan?.toLocaleString()}
          </span>
        </div>
      );
    },
  },

  /* Колонки для FullHD и больше. Показываются всегда вместе с формой 
  header всегда text-xs text-muted-foreground
  */
  {
    accessorKey: 'code',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left text-xs text-muted-foreground">Код 1С</div>,
    cell: ({ row }) => {
      return <div className="text-left font-mono ">{row.original.productCode}</div>;
    },
  },
  {
    accessorKey: 'marking',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left text-xs text-muted-foreground">Артикул</div>,
    cell: ({ row }) => <div className="text-left  font-medium">{row.original.marking}</div>,
  },
  {
    accessorKey: 'boil',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left text-xs text-muted-foreground">Партия</div>,
    cell: ({ row }) => {
      return <div className="text-left ">{row.original.boil}</div>;
    },
  },
  {
    accessorKey: 'plan',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-right text-xs text-muted-foreground">План</div>,
    cell: ({ row }) => (
      <div className="text-right  font-medium tabular-nums">
        {row.original.plan.toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: 'apparat',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left text-xs text-muted-foreground">Аппарат</div>,
    cell: ({ row }) => {
      return <div className="text-left ">{row.original.apparatus}</div>;
    },
  },
  {
    accessorKey: 'can',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left text-xs text-muted-foreground">Емкость</div>,
    cell: ({ row }) => {
      return <div className="text-left ">{row.original.can}</div>;
    },
  },
  {
    accessorKey: 'conveyor',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left text-xs text-muted-foreground">Конвейер</div>,
    cell: ({ row }) => {
      return <div className="text-left ">{row.original.conveyor}</div>;
    },
  },
  {
    accessorKey: 'note',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left text-xs text-muted-foreground">Прим.</div>,
    cell: ({ row }) => <RecordNoteCell note={row.original.note} />,
  },
  /* Статус, на больших экранах всегда справа */
  {
    accessorKey: 'state',
    meta: { grow: false, hideOnMobile: true },
    header: () => <div className="text-right text-xs text-muted-foreground">Статус</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-right w-full ">
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
