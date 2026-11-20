import { TApplicationEmployeeItem } from '@repo/schemas';
import { ColumnDef } from '@tanstack/react-table';
import { GenericSelectCell, GenericSelectHeader } from '@/shared/ui';

import { baseEmployeeColumns, useEmployeeListUiParams } from '@/entities/employee';

function SelectHeader() {
  const { params, setParams } = useEmployeeListUiParams();
  return (
    <GenericSelectHeader
      selectedId={params.selectedEmployeeId}
      onClear={() => setParams({ selectedEmployeeId: '' })}
    />
  );
}

function SelectCell({ employeeId }: { employeeId: number }) {
  const { params, setParams } = useEmployeeListUiParams();
  return (
    <GenericSelectCell
      recordId={employeeId}
      selectedId={params.selectedEmployeeId}
      onSelect={(id) => setParams({ selectedEmployeeId: String(id) })}
    />
  );
}

export const employeeListColumns: ColumnDef<TApplicationEmployeeItem>[] = [
  ...baseEmployeeColumns,
  /* Селектор. Показывается на всех экранах */
  {
    id: 'select',
    meta: { grow: false },
    size: 40,
    header: () => <SelectHeader />,
    cell: ({ row }) => <SelectCell employeeId={row.original.id} />,
    enableSorting: false,
    enableHiding: false,
  },
];
