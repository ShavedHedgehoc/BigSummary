import { TApplicationDocDetailRowItem } from '@repo/schemas';
import { RECORD_CARD_CONFIG } from '../model/record-card.config';
import { cn } from '@/shared/lib';
import { format } from 'date-fns';
import { DigitalMarkingNames } from '@/shared/constants';
import { QrCode } from 'lucide-react';

export function RecordCard({
  record,
  isCanSelected,
  isSelected,
  onSelect,
}: {
  record: TApplicationDocDetailRowItem;
  isCanSelected: boolean;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const currentStatus = record?.stateValue;
  const configKey = (currentStatus ?? 'null') as keyof typeof RECORD_CARD_CONFIG;
  const config = RECORD_CARD_CONFIG[configKey];
  const stateTimeDateObj = record.stateTime ? new Date(record.stateTime) : null;
  const planToLocale = record.plan?.toLocaleString('ru-Ru') ?? '-';
  const factToLocale = record.fact?.toLocaleString('ru-Ru') ?? '-';
  const digitalMarking = DigitalMarkingNames.includes(record.dm);

  return (
    <div
      onClick={() => isCanSelected && onSelect()}
      className={cn(
        'relative flex flex-col gap-1 p-3 rounded-md text-[13px] font-medium transition-all duration-200 select-none shadow-xs min-h-32 justify-between',
        record.isUpdated && 'animate-pulse',
        config.bg,
        config.text,
        isSelected && 'outline-2 outline-neutral-900/80 dark:outline-white/80',
        isCanSelected && !isSelected && 'cursor-pointer hover:opacity-90 active:scale-[0.99]',
      )}
    >
      <div className="flex w-full justify-between items-center">
        <span className="text-base ">{record.conveyor}</span>
        {stateTimeDateObj && (
          <span className=" tracking-tight">{format(stateTimeDateObj, 'HH:mm:ss')}</span>
        )}
      </div>
      <div className="flex w-full justify-between items-baseline gap-2">
        <span className="truncate max-w-[65%]">{record.marking || '-'}</span>
        <span className=" text-[12px]">{record.boil}</span>
      </div>
      <div className="flex w-full justify-between items-center">
        <span className="opacity-90">{digitalMarking ? `Выпуск/План` : `План`}</span>
        <span className="text-[12px]">
          {digitalMarking ? `${factToLocale}/ ${planToLocale}` : `${planToLocale}`}
        </span>
      </div>
      <div
        className={cn(
          'flex w-full  mt-1 items-center',
          digitalMarking ? 'justify-between' : 'justify-start',
        )}
      >
        <div className={cn('w-full text-left text-[12px] mt-1', config.stateColor)}>
          {record.state}
        </div>
        {digitalMarking && <QrCode className="h-5 w-5" />}
      </div>
    </div>
  );
}
