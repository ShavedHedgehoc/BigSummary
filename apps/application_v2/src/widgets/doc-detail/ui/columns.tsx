import { TApplicationDocDetailRowItem } from '@repo/schemas';
import { ColumnDef } from '@tanstack/react-table';

import { GenericSelectCell, GenericSelectHeader } from '@/shared/ui';
import { baseRecordColumns } from '@/entities/record';
import { useDocDetailUiParams } from '../model/use-doc-detail-ui-params';

function SelectHeader() {
  const { params, setParams } = useDocDetailUiParams();

  return (
    <GenericSelectHeader
      selectedId={params.selectedRecordId}
      onClear={() => setParams({ selectedRecordId: '' })}
    />
  );
}

function SelectCell({ recordId }: { recordId: number }) {
  const { params, setParams } = useDocDetailUiParams();
  return (
    <GenericSelectCell
      recordId={recordId}
      selectedId={params.selectedRecordId}
      onSelect={(id) => setParams({ selectedRecordId: String(id) })}
    />
  );
}

export const docDetailProductListColumns: ColumnDef<TApplicationDocDetailRowItem>[] = [
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
