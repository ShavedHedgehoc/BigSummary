'use client';

import { cn, useIsMobile } from '@/shared/lib';
import { TApplicationTraceInventoryItem } from '@repo/schemas';
import { CheckCircle2Icon, Hourglass, TriangleAlert } from 'lucide-react';

interface TInventoryStatusProps {
  item: TApplicationTraceInventoryItem;
}

export function InventoryStatus({ item }: TInventoryStatusProps) {
  const isMobile = useIsMobile();
  const startOfCurrentDay = new Date().setHours(0, 0, 0, 0);
  const itemDateTimestamp = new Date(item.date).setHours(0, 0, 0, 0);
  const isDatePast = itemDateTimestamp < startOfCurrentDay;
  const isEmpty = item.isFinished && (!item.recordsCount || item.recordsCount === 0);

  let statusConfig = {
    text: 'Выполняется',
    bg: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
    iconColor: 'text-amber-600 dark:text-amber-400',
    icon: Hourglass,
  };

  if (isDatePast) {
    if (isEmpty) {
      statusConfig = {
        text: 'Нет записей',
        bg: 'bg-destructive/10 text-destructive dark:text-red-400 border-destructive/20',
        iconColor: 'text-destructive dark:text-red-400',
        icon: TriangleAlert,
      };
    } else {
      statusConfig = {
        text: 'Завершено',
        bg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
        iconColor: 'text-emerald-600 dark:text-emerald-400',
        icon: CheckCircle2Icon,
      };
    }
  }

  const Icon = statusConfig.icon;

  return (
    <div className="flex justify-center">
      <div
        className={cn(
          'inline-flex items-center gap-1.5 font-medium border transition-colors rounded-md',
          isMobile
            ? 'p-1 rounded-full border-none bg-transparent'
            : `px-2 py-0.5 text-xs ${statusConfig.bg}`,
        )}
      >
        <Icon className={cn(isMobile ? 'h-4 w-4' : 'h-3.5 w-3.5', statusConfig.iconColor)} />

        {!isMobile && <span>{statusConfig.text}</span>}
      </div>
    </div>
  );
}
