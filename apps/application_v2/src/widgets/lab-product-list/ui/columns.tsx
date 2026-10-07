import { TApplicationDocDetailRowItem } from '@repo/schemas';
import { ColumnDef } from '@tanstack/react-table';
import { GenericSelectCell, GenericSelectHeader } from '@/shared/ui';
import { baseRecordColumns } from '@/entities/record';
import { useLabProductListUiParams } from '../model/use-lab-product-list-ui-params';

function SelectHeader() {
  const { params, setParams } = useLabProductListUiParams();

  return (
    <GenericSelectHeader
      selectedId={params.selectedRecordId}
      onClear={() => setParams({ selectedRecordId: '' })}
    />
  );
}

function SelectCell({ recordId }: { recordId: number }) {
  const { params, setParams } = useLabProductListUiParams();
  return (
    <GenericSelectCell
      recordId={recordId}
      selectedId={params.selectedRecordId}
      onSelect={(id) => setParams({ selectedRecordId: String(id) })}
    />
  );
}

export const labProductListColumns: ColumnDef<TApplicationDocDetailRowItem>[] = [
  ...baseRecordColumns,
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
