import { useMemo } from 'react';
import { useIsMobile } from '@/shared/lib';
import { docListColumns } from '../ui/columns';
import { DocListParams, useDocListSearchParams } from '@/entities/doc';
import { useDocListUiParams } from './use-doc-list-ui-params';
import { ITablePaginationProps } from '@/shared/ui';

export function usePlannerDocList() {
  const isMobile = useIsMobile();
  const { data, isLoading, plantData, params, setParams } = useDocListSearchParams();
  const { params: uiParams, setParams: setUiParams } = useDocListUiParams();

  const columns = useMemo(() => {
    // return isMobile ? docListColumns.filter((col) => !col.meta?.hideOnMobile) : docListColumns;
    return docListColumns.filter((col) =>
      isMobile ? !col.meta?.hideOnMobile : !col.meta?.hideOnDesktop,
    );
  }, [isMobile]);

  const paginationProps: ITablePaginationProps<DocListParams> = {
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    params: params,
    setParams: setParams,
  };

  return {
    params,
    setParams,
    uiParams,
    setUiParams,
    data,
    isLoading,
    plantData,
    columns,
    paginationProps,
    isMobile,
  };
}
