import { ColumnDef } from '@tanstack/react-table';
import { TCommonTraceCanRecordItem } from '@repo/schemas';
import { baseCanStateColumns } from '@/entities/can-state';

export const canStateViewColumns: ColumnDef<TCommonTraceCanRecordItem>[] = [
  ...baseCanStateColumns,
  //   {
  //     id: 'actions',
  //     cell: ({ row, table }) => {
  //       const meta = table.options.meta as { onRowActionSuccess?: () => void } | undefined;
  //       const onClose = meta?.onRowActionSuccess;
  //       return (
  //         <div className="text-center">
  //           <RowDropdown id={row.original.id} onSuccess={onClose} />
  //         </div>
  //       );
  //     },
  //   },
];
