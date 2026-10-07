import { ColumnDef } from '@tanstack/react-table';
import { TApplicationDocItem } from '@repo/schemas';
import { baseDocColumns } from '@/entities/doc';
import { RowDropdown } from '@/features/doc-list-actions';
import { useDocListUiParams } from '../model/use-doc-list-ui-params';

function ActionDropdown({ recordId, isCantDelete }: { recordId: number; isCantDelete: boolean }) {
  const { setParams: setUiParams } = useDocListUiParams();
  return (
    <RowDropdown
      id={recordId}
      isCantDelete={isCantDelete}
      onSelect={() => setUiParams({ deleteId: recordId })}
    />
  );
}
export const docListColumns: ColumnDef<TApplicationDocItem>[] = [
  ...baseDocColumns,
  {
    id: 'actions',
    meta: { grow: false },
    cell: ({ row }) => {
      const isCantDelete = !!row.original.historiesCount && row.original.historiesCount > 0;
      return (
        <div className="flex  justify-end">
          <ActionDropdown recordId={row.original.id} isCantDelete={isCantDelete} />
        </div>
      );
    },
  },
];
