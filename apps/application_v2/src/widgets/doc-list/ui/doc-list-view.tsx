'use client';

import { DocListParams, useDocListSearchParams } from '@/entities/doc';
import { trpc } from '@/shared/api';
import { useMemo } from 'react';
import { docListColumns } from './columns';
import { keepPreviousData } from '@tanstack/react-query';
import { useIsMobile } from '@/shared/lib';
import {
  DataTableSkeleton,
  ITablePaginationProps,
  PaginationSkeleton,
  TablePagination,
  DataTableNew,
  UniversalLayoutWithPagination,
} from '@/shared/ui';
import { DocListFilter } from '@/features/filter-doc-list';
import { PageHeader } from '@/widgets/page-header';
import { DeleteDocDialog } from '@/features/doc-list-actions';
import { SidePanel } from '@/widgets/side-panel';

export default function DocListView() {
  const isMobile = useIsMobile();
  const { params, setParams } = useDocListSearchParams();
  const { data, isLoading } = trpc.application.main.doc.getDocList.useQuery(params, {
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
  });

  const { data: plantData } = trpc.application.main.plant.getPlantList.useQuery(undefined, {
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });

  const columns = useMemo(() => {
    return isMobile ? docListColumns.filter((col) => !col.meta?.hideOnMobile) : docListColumns;
  }, [isMobile]);

  const paginationProps: ITablePaginationProps<DocListParams> = {
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    params: params,
    setParams: setParams,
  };

  const paginationElement = isLoading ? (
    <PaginationSkeleton />
  ) : (
    <TablePagination {...paginationProps} />
  );

  return (
    <div>
      <UniversalLayoutWithPagination
        isLoading={isLoading}
        pageHeader={<PageHeader />}
        filters={<DocListFilter plantData={plantData ?? []} />}
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
      <DeleteDocDialog />
    </div>
  );
}
