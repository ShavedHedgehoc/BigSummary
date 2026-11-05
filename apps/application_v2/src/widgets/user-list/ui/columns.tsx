import { baseUserColumns } from '@/entities/user/index.server';
import { TApplicationUserItem } from '@repo/schemas';
import { ColumnDef } from '@tanstack/react-table';
import { GenericSelectCell, GenericSelectHeader } from '@/shared/ui';
import { useUserListUiParams } from '@/entities/user/index.client';

function SelectHeader() {
  const { params, setParams } = useUserListUiParams();
  return (
    <GenericSelectHeader
      selectedId={params.selectedUserId}
      onClear={() => setParams({ selectedUserId: '' })}
    />
  );
}

function SelectCell({ userId }: { userId: number }) {
  const { params, setParams } = useUserListUiParams();
  return (
    <GenericSelectCell
      recordId={userId}
      selectedId={params.selectedUserId}
      onSelect={(id) => setParams({ selectedUserId: String(id) })}
    />
  );
}

export const userListColumns: ColumnDef<TApplicationUserItem>[] = [
  ...baseUserColumns,
  /* Селектор. Показывается на всех экранах */
  {
    id: 'select',
    meta: { grow: false },
    size: 40,
    header: () => <SelectHeader />,
    cell: ({ row }) => <SelectCell userId={row.original.id} />,
    enableSorting: false,
    enableHiding: false,
  },
];
