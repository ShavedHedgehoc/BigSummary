import { Button, Checkbox } from '@/shared/ui';
import { TApplicationBoilItem } from '@repo/schemas';
import { ColumnDef } from '@tanstack/react-table';
import { Check, X } from 'lucide-react';
import { useLabBoilListUiParams } from '../lib';
import { TableStatus } from '@/entities/history';

function SelectHeader() {
  const { params, setParams } = useLabBoilListUiParams();
  const hasSelectedRow = params.selectedBoilId !== '';

  return (
    <div className="flex justify-center items-center mx-auto ">
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors"
        disabled={!hasSelectedRow}
        onClick={() => setParams({ selectedBoilId: '' })}
        title="Сбросить выбор строки"
      >
        {params.selectedBoilId ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
      </Button>
    </div>
  );
}

function SelectCell({ recordId }: { recordId: number }) {
  const { params, setParams } = useLabBoilListUiParams();
  const isSelected = Number(params.selectedBoilId) === recordId;

  return (
    <div className="flex justify-center items-center mx-auto">
      <Checkbox
        checked={isSelected}
        onCheckedChange={(checked) => {
          setParams({ selectedBoilId: checked ? recordId.toString() : '' });
        }}
        aria-label="Выбрать строку"
      />
    </div>
  );
}

export const baseBoilListColumns: ColumnDef<TApplicationBoilItem>[] = [
  {
    accessorKey: 'boil',
    meta: { grow: false },
    header: () => <div className="text-left ">Партия</div>,
    cell: ({ row }) => {
      return <div className="text-left ">{row.original.boilValue}</div>;
    },
  },

  {
    accessorKey: 'marking',
    meta: { grow: false },
    header: () => <div className="text-left ">Артикул</div>,
    cell: ({ row }) => <div className="text-left  font-medium">{row.original.baseMarking}</div>,
  },
  {
    accessorKey: 'code',
    meta: { grow: false },
    header: () => <div className="text-left ">Код 1С</div>,
    cell: ({ row }) => {
      return <div className="text-left font-mono ">{row.original.baseCode}</div>;
    },
  },
  {
    accessorKey: 'plant',
    meta: { grow: false },
    header: () => <div className="text-left ">Площадка</div>,
    cell: ({ row }) => {
      return <div className="text-left ">{row.original.plant}</div>;
    },
  },

  {
    accessorKey: 'state',
    meta: { grow: false, hideOnMobile: true },
    header: () => <div className="text-right font-semibold">Статус</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-right w-full ">
          <TableStatus state={row.original.stateValue} stateDescription={row.original.state} />
        </div>
      );
    },
  },
  {
    id: 'select',
    meta: { grow: false },
    size: 40,
    header: () => (
      <div className="flex items-center justify-center h-full w-10 pr-4 shrink-0!">
        <SelectHeader />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center h-full w-10 pr-4 shrink-0!">
        <SelectCell recordId={row.original.id} />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
