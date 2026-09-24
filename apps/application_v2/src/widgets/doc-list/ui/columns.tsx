import { ColumnDef } from '@tanstack/react-table';
import { TApplicationDocItem } from '@repo/schemas';
import { baseDocColumns } from '@/entities/doc';
import { RowDropdown } from '@/features/doc-list-actions';

export const docListColumns: ColumnDef<TApplicationDocItem>[] = [
  ...baseDocColumns,
  {
    id: 'actions',
    cell: ({ row }) => {
      const isCantDelete = !!row.original.historiesCount && row.original.historiesCount > 0;
      return (
        <div className="text-left">
          <RowDropdown id={row.original.id} isCantDelete={isCantDelete} />
        </div>
      );
    },
  },
];
