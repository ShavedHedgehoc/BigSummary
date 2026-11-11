import { TApplicationTraceCanLocationDataItem } from '@repo/schemas';
import { cn } from '@/shared/lib';
import { CAN_CARD_CONFIG } from '../model/can-card-config';

export function CanSmallCard({ record }: { record: TApplicationTraceCanLocationDataItem }) {
  const currentStatus = record?.stateValue;
  const configKey = (currentStatus ?? 'null') as keyof typeof CAN_CARD_CONFIG;
  const config = CAN_CARD_CONFIG[configKey];

  return (
    <div
      className={cn(
        'flex justify-center items-center px-1 py-2 w-full rounded-md',
        config.bg,
        config.text,
      )}
    >
      {record.name}
    </div>
  );
}
