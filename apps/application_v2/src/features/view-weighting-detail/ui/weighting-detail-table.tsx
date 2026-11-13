'use client';

import { useMemo } from 'react';
import { useIsMobile } from '@/shared/lib';
import { ScrollArea } from '@/shared/ui';
import { DataTableNew } from '@/shared/ui/table-layout/ui/data-table-new';
import { TApplicationTraceWeightingDetailItem } from '@repo/schemas';
import { weightingDetailColumns } from './columns';

interface IWeightingDetailTableProps {
  rows: TApplicationTraceWeightingDetailItem[];
  onClose?: () => void;
}

export function WeightingDetailTable({ rows, onClose }: IWeightingDetailTableProps) {
  const isMobile = useIsMobile();
  const columns = useMemo(() => {
    let base = weightingDetailColumns;
    if (isMobile) {
      base = weightingDetailColumns.filter((col) => !col.meta?.hideOnMobile);
    } else {
      base = weightingDetailColumns.filter((col) => !col.meta?.hideOnDesktop);
    }
    return base;
  }, [isMobile]);

  return (
    <div className="h-full flex flex-col min-h-0">
      <ScrollArea className="h-full w-full min-h-0">
        <DataTableNew data={rows ?? []} columns={columns} meta={{ onRowActionSuccess: onClose }} />
      </ScrollArea>
    </div>
  );
}
