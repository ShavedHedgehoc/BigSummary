import { TApplicationConveyorItem } from '@repo/schemas';
import { ColumnDef } from '@tanstack/react-table';
import { GenericSelectCell, GenericSelectHeader } from '@/shared/ui';
import { baseConveyorColumns, useConveyorListUiParams } from '@/entities/conveyor';

function SelectHeader() {
  const { params, setParams } = useConveyorListUiParams();
  return (
    <GenericSelectHeader
      selectedId={params.selectedConveyorId}
      onClear={() => setParams({ selectedConveyorId: '' })}
    />
  );
}

function SelectCell({ conveyorId }: { conveyorId: number }) {
  const { params, setParams } = useConveyorListUiParams();
  return (
    <GenericSelectCell
      recordId={conveyorId}
      selectedId={params.selectedConveyorId}
      onSelect={(id) => setParams({ selectedConveyorId: String(id) })}
    />
  );
}

export const conveyorListColumns: ColumnDef<TApplicationConveyorItem>[] = [
  ...baseConveyorColumns,
  /* Селектор. Показывается на всех экранах */
  {
    id: 'select',
    meta: { grow: false },
    size: 40,
    header: () => <SelectHeader />,
    cell: ({ row }) => <SelectCell conveyorId={row.original.id} />,
    enableSorting: false,
    enableHiding: false,
  },
];
