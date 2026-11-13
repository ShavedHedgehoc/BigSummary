import { ColumnDef } from '@tanstack/react-table';
import { TApplicationTraceWeightingDetailItem } from '@repo/schemas';
import { baseWeightingDetailColumns } from '@/entities/weighting';
import { RowDropdown } from '@/features/weighting-detail-actions';

export const weightingDetailColumns: ColumnDef<TApplicationTraceWeightingDetailItem>[] = [
  ...baseWeightingDetailColumns,
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const meta = table.options.meta as { onRowActionSuccess?: () => void } | undefined;
      const onClose = meta?.onRowActionSuccess;
      const item = row.original;
      const hasLoads = Boolean(item.loadingDate);
      return (
        <div className="flex items-center justify-end">
          <RowDropdown id={item.weightingId} hasLoads={hasLoads} onSuccess={onClose} />
        </div>
      );
    },
  },
];
