'use client';

import {
  DataTableSkeleton,
  PaginationSkeleton,
  TablePagination,
  DataTableNew,
  UniversalLayoutWithPagination,
} from '@/shared/ui';
import { PageHeader } from '@/widgets/page-header';
import { DeleteDocDialog } from '@/features/doc-list-actions';
import { SidePanel } from '@/widgets/side-panel';
import PlannerDocListFilter from './filter';
import { usePlannerDocList } from '../model/use-planeer-doc-list';

export default function DocListView() {
  const { isLoading, paginationProps, setUiParams, isMobile, params, columns, data, uiParams } =
    usePlannerDocList();

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
        filters={<PlannerDocListFilter />}
        pagination={paginationElement}
        table={<DataTableNew data={data?.rows ?? []} columns={columns} isLoading={isLoading} />}
        tableSkeleton={<DataTableSkeleton columns={isMobile ? 3 : 5} rows={params.limit} />}
        sidebarPanel={
          <SidePanel
            mode="upload_doc"
            className="w-full m-0 @min-6xl/main:w-110 shrink-0 h-full max-w-2xl"
          />
        }
      />
      <DeleteDocDialog deleteId={uiParams.deleteId} onDelete={handleDelete} />
    </div>
  );
}
