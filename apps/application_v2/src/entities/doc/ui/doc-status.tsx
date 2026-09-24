'use client';

import { cn, useIsMobile } from '@/shared/lib';
import { TApplicationDocItem } from '@repo/schemas';
import { isBefore, startOfDay } from 'date-fns';
import { CheckCircle2Icon, Hourglass, Loader2, TriangleAlert } from 'lucide-react';

interface TDocStatusProps {
  item: TApplicationDocItem;
}

export function DocStatus({ item }: TDocStatusProps) {
  const isMobile = useIsMobile();
  const isExpired = isBefore(new Date(item.date), startOfDay(new Date()));
  const isHasProgress = item.historiesCount && item.historiesCount > 0;

  let statusConfig = {
    text: 'Ожидание',
    bg: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20',
    iconColor: 'text-slate-500 dark:text-slate-400',
    icon: Hourglass,
  };

  if (isExpired) {
    if (isHasProgress) {
      statusConfig = {
        text: 'Завершено',
        bg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
        iconColor: 'text-emerald-600 dark:text-emerald-400',
        icon: CheckCircle2Icon,
      };
    } else {
      statusConfig = {
        text: 'Просрочено',
        bg: 'bg-destructive/10 text-destructive dark:text-red-400 border-destructive/20',
        iconColor: 'text-destructive dark:text-red-400',
        icon: TriangleAlert,
      };
    }
  } else if (isHasProgress) {
    statusConfig = {
      text: 'В работе',
      bg: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
      iconColor: 'text-amber-600 dark:text-amber-400',
      icon: Loader2,
    };
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
        <Icon
          className={cn(
            isMobile ? 'h-4 w-4' : 'h-3.5 w-3.5',
            isHasProgress && !isExpired && 'animate-spin',
            statusConfig.iconColor,
          )}
        />

        {!isMobile && <span>{statusConfig.text}</span>}
      </div>
    </div>
  );
}
