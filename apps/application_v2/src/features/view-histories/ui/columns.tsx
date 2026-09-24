import { ColumnDef } from '@tanstack/react-table';
import { TCommonHistoryItem } from '@repo/schemas';
import { baseHistoryColumns } from '@/entities/history';
import { RowDropdown } from '@/features/history-actions';

export const historyViewColumns: ColumnDef<TCommonHistoryItem>[] = [
  ...baseHistoryColumns,
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const meta = table.options.meta as { onRowActionSuccess?: () => void } | undefined;
      const onClose = meta?.onRowActionSuccess;
      return (
        <div className="text-center">
          <RowDropdown id={row.original.id} onSuccess={onClose} />
        </div>
      );
    },
  },
];
