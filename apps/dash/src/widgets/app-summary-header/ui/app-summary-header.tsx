import { AppSummaryTopMenu } from '@/features';
import { DocumentIcon } from '@/shared/ui';

export function AppSummaryHeader() {
  return (
    <div className="flex flex-row justify-between items-center px-6 w-full">
      <div className="flex flex-row justify-center items-center gap-4">
        <DocumentIcon size={12} />
        <div className="flex text-4xl font-semibold">Сводки</div>
      </div>
      <AppSummaryTopMenu />
    </div>
  );
}
