import {
  Button,
  Checkbox,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui';
import { TApplicationDocDetailRowItem } from '@repo/schemas';
import { ColumnDef } from '@tanstack/react-table';
import { useDocDetailUiParams } from '../lib';
import { Check, HelpCircle, X } from 'lucide-react';
import { TableStatus } from '@/entities/history';

function SelectHeader() {
  const { params, setParams } = useDocDetailUiParams();
  const hasSelectedRow = params.selectedRecordId !== '';

  return (
    <div className="flex justify-center items-center mx-auto ">
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors"
        disabled={!hasSelectedRow}
        onClick={() => setParams({ selectedRecordId: '' })}
        title="Сбросить выбор строки"
      >
        {params.selectedRecordId ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
      </Button>
    </div>
  );
}

function SelectCell({ recordId }: { recordId: number }) {
  const { params, setParams } = useDocDetailUiParams();
  const isSelected = Number(params.selectedRecordId) === recordId;

  return (
    <div className="flex justify-center items-center mx-auto">
      <Checkbox
        checked={isSelected}
        onCheckedChange={(checked) => {
          setParams({ selectedRecordId: checked ? recordId.toString() : '' });
        }}
        aria-label="Выбрать строку"
      />
    </div>
  );
}

export const baseRecordColumns: ColumnDef<TApplicationDocDetailRowItem>[] = [
  {
    id: 'mobile-product-info',
    meta: { grow: true, hideOnDesktop: true },
    header: () => <div className="text-left">Продукт</div>,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-0.5 py-1 text-left">
          <span className="text-xs font-mono text-muted-foreground">
            {row.original.productCode}
          </span>
          <span className="text-xs font-medium text-foreground">{row.original.marking}</span>
          <span className="text-xs bg-muted py-0.5 rounded w-fit text-muted-foreground font-mono">
            {row.original.boil}
          </span>
        </div>
      );
    },
  },
  {
    id: 'mobile-conveyor-info',
    meta: { grow: true, hideOnDesktop: true },
    header: () => <div className="text-left">Статус</div>,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-0.5 py-1 text-left">
          <span className="text-xs  text-muted-foreground">Конвейер: {row.original.conveyor}</span>
          <span className="text-xs  text-muted-foreground">План: {row.original.plan}</span>
          <span className="w-fit">
            <TableStatus state={row.original.stateValue} stateDescription={row.original.state} />
          </span>
        </div>
      );
    },
  },
  {
    id: 'md-product-info',
    meta: { grow: true, hideOnMobile: true, showBelowXL: true },
    header: () => <div className="text-left">Продукт</div>,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-0.5 py-1 text-left">
          <span className="text-[11px] font-mono text-muted-foreground">
            {row.original.productCode}
          </span>
          <span className="text-[11px] font-medium text-foreground">{row.original.marking}</span>
          <span className="text-[11px] bg-muted py-0.5 rounded w-fit text-muted-foreground font-mono">
            {row.original.boil}
          </span>
        </div>
      );
    },
  },

  {
    id: 'md-conveyor-info',
    meta: { grow: true, hideOnMobile: true, showBelowXL: true },
    header: () => <div className="text-left font-semibold ">Данные</div>,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-0.5 py-1 text-left  min-w-0 w-full">
          <span className="text-[11px] text-muted-foreground">
            Конвейер: {row.original.conveyor}
          </span>
          <span className="text-[11px] text-muted-foreground">
            Аппарат: {row.original.apparatus}
          </span>
          <span className="text-[11px] text-muted-foreground">Емкость: {row.original.can}</span>
          <span className="text-[11px] text-muted-foreground">
            План: {row.original.plan?.toLocaleString()}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: 'code',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left ">Код 1С</div>,
    cell: ({ row }) => {
      return <div className="text-left font-mono ">{row.original.productCode}</div>;
    },
  },
  {
    accessorKey: 'marking',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left ">Артикул</div>,
    cell: ({ row }) => <div className="text-left  font-medium">{row.original.marking}</div>,
  },
  {
    accessorKey: 'boil',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left ">Партия</div>,
    cell: ({ row }) => {
      return <div className="text-left ">{row.original.boil}</div>;
    },
  },
  {
    accessorKey: 'plan',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-right ">План</div>,
    cell: ({ row }) => (
      <div className="text-right  font-medium tabular-nums">
        {row.original.plan.toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: 'apparat',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left ">Аппарат</div>,
    cell: ({ row }) => {
      return <div className="text-left ">{row.original.apparatus}</div>;
    },
  },
  {
    accessorKey: 'can',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left ">Емкость</div>,
    cell: ({ row }) => {
      return <div className="text-left ">{row.original.can}</div>;
    },
  },
  {
    accessorKey: 'conveyor',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left ">Конвейер</div>,
    cell: ({ row }) => {
      return <div className="text-left ">{row.original.conveyor}</div>;
    },
  },
  {
    accessorKey: 'note',
    meta: { grow: false, hideOnMobile: true, hideBelowXL: true },
    header: () => <div className="text-left font-semibold">Прим.</div>,
    cell: ({ row }) => {
      const note = row.original.note;
      if (!note) {
        return <div className="text-left text-xs text-muted-foreground/50 pl-2">—</div>;
      }

      return (
        <div className="flex justify-start pl-1">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-help p-1 rounded-md hover:bg-muted"
                  aria-label="Показать примечание"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" align="start" className="max-w-xs wrap-break-words">
                <p className="text-xs">{note}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },

  {
    accessorKey: 'state',
    meta: { grow: false, hideOnMobile: true },
    header: () => <div className="text-center font-semibold">Статус</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center w-full ">
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
