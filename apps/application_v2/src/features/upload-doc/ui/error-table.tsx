import { type TApplicationUploadDocRecordRowValError as ValError } from '@repo/schemas';
import { DataTableNew, ScrollArea } from '@/shared/ui';
import { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<ValError>[] = [
  {
    accessorKey: 'number',
    meta: { grow: false },
    header: () => <div className="text-[11px] text-center px-2">Строка</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-mono tabular-nums text-[11px] px-2">
          {row.original.row}
        </div>
      );
    },
  },
  {
    accessorKey: 'field',
    meta: { grow: false },
    header: () => (
      <div className="text-left font-semibold text-xs text-muted-foreground px-3">Поле</div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-left text-xs font-medium text-foreground px-3">
          {row.original.field}
        </div>
      );
    },
  },
  {
    accessorKey: 'error',
    meta: { grow: true },
    header: () => (
      <div className="text-left font-semibold text-xs text-muted-foreground px-3">Ошибка</div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-left text-[11px] text-status-fail whitespace-normal wrap-break-words leading-relaxed py-1 px-3">
          {row.original.error}
        </div>
      );
    },
  },
];

export function UploadErrorsTable({ errors }: { errors: ValError[] }) {
  return (
    <div className="h-full flex flex-col min-h-0 overflow-hidden">
      <ScrollArea className="h-full w-full rounded-xl border">
        <DataTableNew data={errors} columns={columns} />
      </ScrollArea>
    </div>
  );
}
