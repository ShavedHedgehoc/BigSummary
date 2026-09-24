'use client';

import { useMemo } from 'react';
import { useIsMobile } from '@/shared/lib';
import { ScrollArea } from '@/shared/ui';
import { DataTableNew } from '@/shared/ui/table-layout/ui/data-table-new';
import { historyViewColumns } from './columns';
import { TCommonHistoryItem } from '@repo/schemas';

interface IHistoryViewProps {
  rows: TCommonHistoryItem[];
  onClose?: () => void;
}

export function HistoryTable({ rows, onClose }: IHistoryViewProps) {
  const isMobile = useIsMobile();
  const columns = useMemo(() => {
    let base = historyViewColumns;
    if (isMobile) {
      base = historyViewColumns.filter((col) => !col.meta?.hideOnMobile);
    } else {
      base = historyViewColumns.filter((col) => !col.meta?.hideOnDesktop);
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
