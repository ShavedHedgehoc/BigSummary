import { TApplicationUserItem } from '@repo/schemas';
import { ColumnDef } from '@tanstack/react-table';
import { UserRolesCell } from './user-roles-cell';
import { UserBannedCell } from './user-banned-cell';
import { UserNameCell } from './user-name-cell';

export const baseUserColumns: ColumnDef<TApplicationUserItem>[] = [
  /* Мобильные колонки, показываются либо они, либо форма */
  {
    id: 'mobile-user-info',
    meta: { grow: false, hideOnDesktop: true },
    header: () => <div className="text-left text-xs text-muted-foreground">Пользователь</div>,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col min-w-0 max-w-40">
          <span className="font-medium leading-none text-[11px] truncate block">
            {row.original.name}
          </span>
          <span className="text-[11px] text-muted-foreground mt-1 leading-none truncate block w-full">
            {row.original.email}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'mobile-roles',
    meta: { grow: true, hideOnDesktop: true },
    header: () => <div className="text-center  text-xs text-muted-foreground"></div>,
    cell: ({ row: { original: user } }) => (
      <UserRolesCell roles={user.roles ?? []} isMobile={true} />
    ),
  },
  {
    accessorKey: 'mobile-access',
    meta: { grow: true, hideOnDesktop: true },
    header: () => <div className="text-center text-xs text-muted-foreground"></div>,
    cell: ({ row: { original: user } }) => <UserBannedCell user={user} showTitle={false} />,
  },
  /* 
  Колонки для экранов меньше FullHD, показываются вместе с формой, пока есть место. 
  Если места нет и форма активна - заменяются на форму.
   header всегда text-xs text-muted-foreground
   cell text-[11px]
  */
  {
    id: 'md-user-info',
    meta: { grow: false, hideOnMobile: true, showBelowXL: true },
    header: () => <div className="text-xs text-muted-foreground text-left">Пользователь</div>,
    cell: ({ row }) => <UserNameCell user={row.original} showEmail={true} />,
  },
  {
    accessorKey: 'md-access',
    meta: { grow: false, hideOnMobile: true, showBelowXL: true },
    header: () => <div className="text-center  text-xs text-muted-foreground">Доступ</div>,
    cell: ({ row: { original: user } }) => <UserBannedCell user={user} showTitle={false} />,
  },
  {
    accessorKey: 'md-plant',
    meta: { grow: false, hideOnMobile: true, showBelowXL: true },
    header: () => <div className="text-left text-xs text-muted-foreground">П</div>,
    cell: ({ row }) => {
      const plantName = row.original.user_settings?.plant ?? '-';
      const firstLetter = plantName.charAt(0).toUpperCase();

      return (
        <div className="text-left font-medium">
          <span className="text-left text-xs">{firstLetter}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'md-roles',
    meta: { grow: false, hideOnMobile: true, showBelowXL: true },
    header: () => <div className="text-left  text-xs text-muted-foreground">Роли</div>,
    cell: ({ row: { original: user } }) => (
      <UserRolesCell roles={user.roles ?? []} isMobile={true} />
    ),
  },
  /* Колонки для FullHD и больше. Показываются всегда вместе с формой 
  header всегда text-xs text-muted-foreground
  */
  {
    accessorKey: 'name',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left text-xs text-muted-foreground pl-3">Пользователь</div>,
    cell: ({ row }) => <UserNameCell user={row.original} />,
  },
  {
    accessorKey: 'email',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left  text-xs text-muted-foreground">Электопочта</div>,
    cell: ({ row }) => <div className="text-left  ">{row.original.email}</div>,
  },
  {
    accessorKey: 'plant',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left text-xs text-muted-foreground ">Площадка</div>,
    cell: ({ row }) => <div className="text-left ">{row.original.user_settings?.plant ?? '-'}</div>,
  },
  {
    accessorKey: 'roles',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="pl-2 text-left text-xs text-muted-foreground">Роли</div>,
    cell: ({ row: { original: user } }) => <UserRolesCell roles={user.roles ?? []} />,
  },
  {
    accessorKey: 'access',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-center  text-xs text-muted-foreground">Доступ</div>,
    cell: ({ row: { original: user } }) => <UserBannedCell user={user} />,
  },
  /* 
  Селектор. Показывается на всех экранах 
  Перенесен в виджеты.
  */
];
