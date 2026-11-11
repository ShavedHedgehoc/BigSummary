import { TApplicationTraceCanDataItem } from '@repo/schemas';
import { cn } from '@/shared/lib';
import { format } from 'date-fns';
import { CAN_CARD_CONFIG } from '../model/can-card-config';

export function CanCard({
  record,
  isCanSelected,
  isSelected,
  onSelect,
}: {
  record: TApplicationTraceCanDataItem;
  isCanSelected: boolean;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const currentStatus = record?.stateValue;
  const configKey = (currentStatus ?? 'null') as keyof typeof CAN_CARD_CONFIG;
  const config = CAN_CARD_CONFIG[configKey];
  const stateTimeDateObj = record.stateTime ? new Date(record.stateTime) : null;

  return (
    <div
      onClick={() => isCanSelected && onSelect()}
      className={cn(
        'relative flex flex-col gap-1 p-3 rounded-md text-[13px] font-medium transition-all duration-200 select-none shadow-xs min-h-44 justify-between',
        record.isUpdated && 'animate-pulse',
        config.bg,
        config.text,
        isSelected && 'outline-2 outline-neutral-900/80 dark:outline-white/80',
        isCanSelected && !isSelected && 'cursor-pointer hover:opacity-90 active:scale-[0.99]',
      )}
    >
      <div className="flex w-full justify-between items-center">
        <span className="text-2xl">{record.name}</span>
        <span className="text-lg">
          {`V - ${record.volume} м`}
          <sup>3</sup>
        </span>
      </div>

      {record.state && (
        <div className="flex w-full justify-between items-baseline gap-2 text-base">
          <div>{record.baseContainMarking}</div>
          <div>{record.baseContain}</div>
        </div>
      )}

      {record.state && (
        <div className="flex w-full justify-between items-center">
          <span>{record.state ?? '-'}</span>
        </div>
      )}
      {record.state && (
        <div className="flex w-full justify-between items-center text-xs">
          <span>{record.author ?? '-'}</span>
        </div>
      )}

      {stateTimeDateObj && (
        <div className="flex w-full justify-between items-center">
          <div>{format(stateTimeDateObj, 'dd/MM/yyyy')}</div>
          <div>{format(stateTimeDateObj, 'HH:mm:ss')}</div>
        </div>
      )}
    </div>
  );
}
