import { useMemo } from 'react';
import { useIsMobile } from '@/shared/lib';
import { inventoryListColumns } from '../ui/columns';
import { ITablePaginationProps } from '@/shared/ui';
import { InventoryListParams, useInventoryListSearchParams } from '@/entities/inventory';
import { useInventoryListUiParams } from './use-inventory-list-ui-params';

export function useInventoryList() {
  const isMobile = useIsMobile();
  const { data, isLoading, plantData, params, setParams } = useInventoryListSearchParams();
  const { params: uiParams, setParams: setUiParams } = useInventoryListUiParams();

  const columns = useMemo(() => {
    return inventoryListColumns.filter((col) =>
      isMobile ? !col.meta?.hideOnMobile : !col.meta?.hideOnDesktop,
    );
  }, [isMobile]);

  const paginationProps: ITablePaginationProps<InventoryListParams> = {
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
