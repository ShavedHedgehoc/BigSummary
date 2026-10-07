'use client';

import { getStatusConfig } from '@/entities/history';
import { cn } from '@/shared/lib';
import { THistoryStatus } from '@repo/schemas';

interface TDocStatusProps {
  state: THistoryStatus | null | string;
  stateDescription: string | null;
}

export function TableStatus({ state, stateDescription }: TDocStatusProps) {
  const config = getStatusConfig(state);

  const Icon = config.icon;
  const commonState = state ? stateDescription : 'undefined';
  const isDash = !stateDescription || stateDescription === '-';

  return (
    <div className="flex justify-end w-full ">
      <div
        className={cn(
          'inline-flex items-center gap-1.5 font-medium border transition-colors select-none',
          'text-xs px-2 py-0.5 rounded-md',
          '@max-5xl:text-[10px] @max-5xl:px-1.5 @max-5xl:rounded-sm',
          config.bg,
        )}
      >
        {!isDash && (
          <Icon
            className={cn(
              'shrink-0 h-3.5 w-3.5',
              config.iconColor,
              commonState === 'progress' && 'animate-spin',
              '@max-5xl:hidden',
            )}
          />
        )}
        <span className="font-medium tracking-tight whitespace-nowrap">
          {isDash ? 'Нет записей' : stateDescription}
        </span>
      </div>
    </div>
  );
}
