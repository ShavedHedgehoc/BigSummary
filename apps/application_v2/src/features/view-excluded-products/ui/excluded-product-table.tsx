'use client';

import { useEffect, useMemo, useCallback } from 'react';
import { useIsMobile } from '@/shared/lib';
import { ScrollArea } from '@/shared/ui';
import { DataTableNew } from '@/shared/ui/table-layout/ui/data-table-new';
import { getExcludedProductsColumns } from './columns';
import { useExcludedProductsStore } from '../model/use-excluded-products-store';
import { useWeightingListSearchParams } from '@/entities/weighting';

interface IExcludedProductViewProps {
  onClose?: () => void;
  onRestore?: (productId: string) => void;
}

export function ExcludedProductsTable({ onClose, onRestore }: IExcludedProductViewProps) {
  const { params, setParams } = useWeightingListSearchParams();
  const items = useExcludedProductsStore((s) => s.items);
  const removeExcludedProduct = useExcludedProductsStore((s) => s.removeExcludedProduct);
  const syncFromIds = useExcludedProductsStore((s) => s.syncFromIds);

  const isMobile = useIsMobile();

  useEffect(() => {
    syncFromIds(params.excludeProductIds ?? []);
  }, [params.excludeProductIds, syncFromIds]);

  const handleRestoreProduct = useCallback(
    (productId: string) => {
      removeExcludedProduct(productId);
      setParams((prev) => {
        const next = (prev.excludeProductIds ?? []).filter((id) => id !== productId);
        return { excludeProductIds: next.length > 0 ? next : null };
      });
      onRestore?.(productId);
    },
    [removeExcludedProduct, setParams, onRestore],
  );

  const columns = useMemo(() => {
    const allColumns = getExcludedProductsColumns(handleRestoreProduct);

    return isMobile
      ? allColumns.filter((col) => !col.meta?.hideOnMobile)
      : allColumns.filter((col) => !col.meta?.hideOnDesktop);
  }, [handleRestoreProduct, isMobile]);

  return (
    <div className="h-full flex flex-col min-h-0">
      <ScrollArea className="h-full w-full min-h-0">
        <DataTableNew
          data={items ?? []}
          columns={columns}
          meta={{ onRowActionSuccess: onClose }}
          isCardTable={true}
        />
      </ScrollArea>
    </div>
  );
}
