import { baseBoilListColumns } from '@/entities/boil';
import { TApplicationBoilItem } from '@repo/schemas';
import { ColumnDef } from '@tanstack/react-table';
import { useLabBoilListUiParams } from '../model/use-lab-boil-list-ui-params';
import { GenericSelectCell, GenericSelectHeader } from '@/shared/ui';

function SelectHeader() {
  const { params, setParams } = useLabBoilListUiParams();
  return (
    <GenericSelectHeader
      selectedId={params.selectedBoilId}
      onClear={() => setParams({ selectedBoilId: '' })}
    />
  );
}

function SelectCell({ recordId }: { recordId: number }) {
  const { params, setParams } = useLabBoilListUiParams();
  return (
    <GenericSelectCell
      recordId={recordId}
      selectedId={params.selectedBoilId}
      onSelect={(id) => setParams({ selectedBoilId: String(id) })}
    />
  );
}

export const labBoilListColumns: ColumnDef<TApplicationBoilItem>[] = [
  ...baseBoilListColumns,
  /* Селектор. Показывается на всех экранах */
  {
    id: 'select',
    meta: { grow: false },
    size: 40,
    header: () => <SelectHeader />,
    cell: ({ row }) => <SelectCell recordId={row.original.id} />,
    enableSorting: false,
    enableHiding: false,
  },
];
