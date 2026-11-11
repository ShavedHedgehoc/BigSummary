import { useState } from 'react';
import { toast } from 'sonner';
import { makeXLSX } from '../lib/make-xlsx';
import { useTraceBoilWghtReportSearchParams, useWghtReportUiParams } from '@/entities/trace-boil';
import { useRoles } from '@/entities/user/index.client';
import { trpc } from '@/shared/api/trpc';

export function useReportButton() {
  const { params } = useTraceBoilWghtReportSearchParams();
  const { setParams: setUiParams } = useWghtReportUiParams();
  const { isWeighter } = useRoles();
  const [isPending, setIsPending] = useState(false);
  const utils = trpc.useUtils();

  const handleMakeReportClick = async () => {
    const actionDisabled = !isWeighter || isPending;
    if (actionDisabled) return;

    setIsPending(true);
    setUiParams({ pendingReport: true });

    try {
      const data = await utils.application.trace.boil.getWghtReport.fetch({
        ...params,
        getAllRows: true,
      });

      if (data) {
        makeXLSX(data);
      }
    } catch (error) {
      console.error('Ошибка при генерации или скачивании отчета:', error);
      toast.error('Не удалось скачать отчет');
    } finally {
      setIsPending(false);
      setUiParams({ pendingReport: false });
    }
  };

  const actionDisabled = !isWeighter || isPending;

  return {
    handleMakeReportClick,
    actionDisabled,
  };
}
