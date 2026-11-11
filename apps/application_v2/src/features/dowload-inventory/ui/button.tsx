'use client';

import { Button } from '@/shared/ui';
import { FileSpreadsheet } from 'lucide-react';
import { makeXLSX } from '../lib/make-xlsx';
import { TApplicationTraceInventoryDetailResponse } from '@repo/schemas';

export function DownloadInventoryButton({
  data,
}: {
  data: TApplicationTraceInventoryDetailResponse | null;
}) {
  const handleClick = () => {
    if (!data) return;
    makeXLSX(data);
  };

  const actionDisabled = !data || !data.rows || data.rows.length === 0;
  return (
    <div>
      <Button
        size="sm"
        variant="outline"
        className="w-full px-3 h-8 min-h-0 text-xs bg-background!"
        onClick={handleClick}
        disabled={actionDisabled}
      >
        <FileSpreadsheet className="h-4 w-4" />
        Отчет
      </Button>
    </div>
  );
}
