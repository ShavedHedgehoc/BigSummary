import { ColumnDef } from '@tanstack/react-table';
import { TApplicationTraceInventoryItem } from '@repo/schemas';
import { baseInventoryColumns } from '@/entities/inventory';
import { RowDropdown } from '@/features/inventory-list-actions';
import { useInventoryListUiParams } from '../model/use-inventory-list-ui-params';

function ActionDropdown({ recordId, isCantDelete }: { recordId: number; isCantDelete: boolean }) {
  const { setParams: setUiParams } = useInventoryListUiParams();
  return (
    <RowDropdown
      id={recordId}
      isCantDelete={isCantDelete}
      onSelect={() => setUiParams({ deleteId: recordId })}
    />
  );
}
export const inventoryListColumns: ColumnDef<TApplicationTraceInventoryItem>[] = [
  ...baseInventoryColumns,
  {
    id: 'actions',
    meta: { grow: false },
    cell: ({ row }) => {
      const isCantDelete = !!row.original.recordsCount && row.original.recordsCount > 0;
      return (
        <div className="flex  justify-end">
          <ActionDropdown recordId={row.original.id} isCantDelete={isCantDelete} />
        </div>
      );
    },
  },
];
