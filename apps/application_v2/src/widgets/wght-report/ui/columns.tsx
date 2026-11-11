import { TApplicationTraceBoilWghtReportRowItem } from '@repo/schemas';
import { ColumnDef } from '@tanstack/react-table';
import { GenericSelectCell, GenericSelectHeader } from '@/shared/ui';
import { baseWghtReportColumns, useWghtReportUiParams } from '@/entities/trace-boil';

const getRowKey = (batchId: string | number, productId: string | number) =>
  `${batchId}_${productId}`;

function SelectHeader() {
  const { params, setParams } = useWghtReportUiParams();
  const currentSelectedId =
    params.selectedBatchId && params.selectedProductId
      ? getRowKey(params.selectedBatchId, params.selectedProductId)
      : '';
  return (
    <GenericSelectHeader
      selectedId={currentSelectedId}
      onClear={() => setParams({ selectedBatchId: '', selectedProductId: '' })}
    />
  );
}

function SelectCell({
  batchId,
  productId,
}: {
  batchId: string | number;
  productId: string | number;
}) {
  const { params, setParams } = useWghtReportUiParams();
  const recordId = getRowKey(batchId, productId);

  const currentSelectedId =
    params.selectedBatchId && params.selectedProductId
      ? getRowKey(params.selectedBatchId, params.selectedProductId)
      : '';

  return (
    <GenericSelectCell
      recordId={recordId}
      selectedId={currentSelectedId}
      onSelect={(nextId) => {
        if (!nextId) {
          setParams({
            selectedBatchId: '',
            selectedProductId: '',
          });
        } else {
          setParams({
            selectedBatchId: String(batchId),
            selectedProductId: String(productId),
          });
        }
      }}
    />
  );
}

export const traceBoilWghtReportColumns: ColumnDef<TApplicationTraceBoilWghtReportRowItem>[] = [
  ...baseWghtReportColumns,
  /* Селектор. Показывается на всех экранах */
  {
    id: 'select',
    meta: { grow: false },
    size: 40,
    header: () => <SelectHeader />,
    cell: ({ row }) => (
      <SelectCell batchId={row.original.batchId} productId={row.original.productId} />
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
