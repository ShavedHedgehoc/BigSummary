'use client';

import { ModalLayout } from '@/shared/ui';
import { LoaderCard } from '@/shared/ui';
import { useModalState } from '@/shared/lib';
import { useWghtReportUiParams } from '@/entities/trace-boil';

export function PendingReportModal() {
  const { params, setParams } = useWghtReportUiParams();
  const { isOpen, onOpenChange } = useModalState(params, setParams, 'pendingReport');

  return (
    <ModalLayout
      title="Фрмирую отчет"
      description="Дождитесь окончания загрузки"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <LoaderCard message={'Формирую отчет'} />
    </ModalLayout>
  );
}
