import { TApplicationEmployeeItem } from '@repo/schemas';
import { ColumnDef } from '@tanstack/react-table';
import { EmployeeActivityCell } from './employee-activity-cell';

export const baseEmployeeColumns: ColumnDef<TApplicationEmployeeItem>[] = [
  /* Мобильные колонки, показываются либо они, либо форма */
  {
    id: 'mobile-employee-info',
    meta: { grow: false, hideOnDesktop: true },
    header: () => <div className="text-left text-xs text-muted-foreground">Сотрудник</div>,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col min-w-0 max-w-40">
          <span className="font-medium leading-none text-[11px] truncate block">
            {row.original.name}
          </span>
          <span className="text-[11px] text-muted-foreground mt-1 leading-none truncate block w-full">
            {row.original.barcode}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'mobile-role',
    meta: { grow: true, hideOnDesktop: true },
    header: () => <div className="text-center  text-xs text-muted-foreground"></div>,
    cell: ({ row }) => (
      <div className="text-[11px] font-medium">
        {row.original.occupation?.description ?? 'Нет роли'}
      </div>
    ),
  },
  {
    accessorKey: 'mobile-activity',
    meta: { grow: true, hideOnDesktop: true },
    header: () => <div className="text-center  text-xs text-muted-foreground"></div>,
    cell: ({ row }) => <EmployeeActivityCell employee={row.original} showTitle={false} />,
  },
  /* 
  Колонки для экранов меньше FullHD, показываются вместе с формой, пока есть место. 
  Если места нет и форма активна - заменяются на форму.
   header всегда text-xs text-muted-foreground
   cell text-[11px]
  */
  {
    id: 'md-user-info',
    meta: { grow: true, hideOnMobile: true, showBelowXL: true },
    header: () => <div className="text-xs text-muted-foreground text-left">Пользователь</div>,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col min-w-0 max-w-40 text-xs">
          <span className="font-medium leading-none  truncate block">{row.original.name}</span>
          <span className="text-muted-foreground mt-1 leading-none truncate block w-full">
            {row.original.barcode}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: 'md-role',
    meta: { grow: false, hideOnMobile: true, showBelowXL: true },
    header: () => <div className="text-left  text-xs text-muted-foreground">Роль</div>,
    cell: ({ row }) => (
      <div className="text-left text-xs"> {row.original.occupation?.description ?? 'Нет роли'}</div>
    ),
  },
  {
    accessorKey: 'md-activity',
    meta: { grow: false, hideOnMobile: true, showBelowXL: true },
    header: () => <div className="text-left  text-xs text-muted-foreground">Активность</div>,
    cell: ({ row }) => <EmployeeActivityCell employee={row.original} />,
  },
  /* Колонки для FullHD и больше. Показываются всегда вместе с формой 
  header всегда text-xs text-muted-foreground
  */
  {
    accessorKey: 'name',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left text-xs text-muted-foreground pl-3">Сотрудник</div>,
    cell: ({ row }) => <div className="text-left ">{row.original.name}</div>,
  },
  {
    accessorKey: 'barcode',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left  text-xs text-muted-foreground">Штрихкод</div>,
    cell: ({ row }) => <div className="text-left">{row.original.barcode}</div>,
  },
  {
    accessorKey: 'role',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left text-xs text-muted-foreground ">Роль</div>,
    cell: ({ row }) => (
      <div className="text-left "> {row.original.occupation?.description ?? 'Нет роли'}</div>
    ),
  },

  {
    accessorKey: 'activity',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="pl-2 text-left text-xs text-muted-foreground">Активность</div>,
    cell: ({ row }) => <EmployeeActivityCell employee={row.original} />,
  },

  /* 
  Селектор. Показывается на всех экранах 
  Перенесен в виджеты.
  */
];
