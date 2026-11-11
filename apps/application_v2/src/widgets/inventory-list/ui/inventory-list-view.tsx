'use client';

import {
  DataTableSkeleton,
  PaginationSkeleton,
  TablePagination,
  DataTableNew,
  UniversalLayoutWithPagination,
} from '@/shared/ui';
import { PageHeader } from '@/widgets/page-header';
// import { SidePanel } from '@/widgets/side-panel';
import { useInventoryList } from '../model/use-inventory-list';
import WeightingsInventoryListFilter from './filter';
import { DeleteInventoryDialog } from '@/features/inventory-list-actions';

export default function InventoryListView() {
  const { isLoading, paginationProps, isMobile, params, columns, data, uiParams, setUiParams } =
    useInventoryList();

  const paginationElement = isLoading ? (
    <PaginationSkeleton />
  ) : (
    <TablePagination {...paginationProps} />
  );

  const handleDelete = () => setUiParams({ deleteId: null });

  return (
    <div>
      <UniversalLayoutWithPagination
        isLoading={isLoading}
        pageHeader={<PageHeader />}
        filters={<WeightingsInventoryListFilter />}
        pagination={paginationElement}
        table={<DataTableNew data={data?.rows ?? []} columns={columns} isLoading={isLoading} />}
        tableSkeleton={<DataTableSkeleton columns={isMobile ? 3 : 5} rows={params.limit} />}
      />
      <DeleteInventoryDialog deleteId={uiParams.deleteId} onDelete={handleDelete} />
    </div>
  );
}
