'use client';

import { Button } from '@/shared/ui';
import { FileSpreadsheet } from 'lucide-react';
import { useReportButton } from '../model/use-report-button';
import { useIsMobile } from '@/shared/lib';

export function DownloadWeightingReportButton() {
  const { handleMakeReportClick, actionDisabled } = useReportButton();
  const isMobile = useIsMobile();
  return (
    <div>
      <Button
        size="sm"
        variant={isMobile ? 'outline' : 'ghost'}
        className="w-full px-5 min-h-0 text-xs "
        onClick={handleMakeReportClick}
        disabled={actionDisabled}
      >
        <FileSpreadsheet className="h-4 w-4" />
        Отчет
      </Button>
    </div>
  );
}
