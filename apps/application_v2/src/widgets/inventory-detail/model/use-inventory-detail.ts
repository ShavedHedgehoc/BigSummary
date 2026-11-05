import { trpc } from '@/shared/api';
import { useIsMobile } from '@/shared/lib';
import { keepPreviousData } from '@tanstack/react-query';
import { useMemo } from 'react';

import { inventoryDetailProductListColumns } from '../ui/columns';
import { useInventoryDetailSearchParams } from '@/entities/inventory';

export function useInventoryDetail(inventoryId?: number) {
  const isMobile = useIsMobile();
  const { params, setParams } = useInventoryDetailSearchParams();

  const queryArgs = useMemo(() => {
    if (!inventoryId) return null;
    return { inventoryId, ...params };
  }, [inventoryId, params]);

  const { data, isLoading } = trpc.application.trace.inventory.getInventoryDetail.useQuery(
    queryArgs!,
    {
      placeholderData: keepPreviousData,
      staleTime: 30 * 1000,
      refetchInterval: 30 * 1000,
      enabled: !!queryArgs,
    },
  );

  const columns = useMemo(() => {
    const base = [...inventoryDetailProductListColumns];
    return base.filter((col) => (isMobile ? !col.meta?.hideOnMobile : !col.meta?.hideOnDesktop));
  }, [isMobile]);

  return {
    isMobile,
    params,
    setParams,
    isLoading,
    data,
    columns,
  };
}
