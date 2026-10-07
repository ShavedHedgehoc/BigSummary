'use client';

import { ReactNode } from 'react';
import { cn, useIsMobile } from '@/shared/lib';
import { ScrollArea } from '@/shared/ui';
import { EmptyState } from './empty-state';

interface UniversalLayoutWithPaginationSelectorProps {
  isLoading?: boolean;
  pageHeader?: ReactNode;
  subHeader?: ReactNode;
  filters: ReactNode;
  pagination?: ReactNode;
  table: ReactNode;
  tableSkeleton: ReactNode;
  sidebarPanel?: ReactNode;
  hasSelection: boolean;
  mobileSubHeader?: ReactNode;
  emptyState?: ReactNode;
}

export function UniversalLayoutWithPaginationSelector({
  hasSelection,
  isLoading,
  pageHeader,
  subHeader,
  mobileSubHeader,
  filters,
  pagination,
  table,
  tableSkeleton,
  sidebarPanel,
  emptyState,
}: UniversalLayoutWithPaginationSelectorProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex flex-col gap-4 py-4 px-4 h-[calc(100vh-(--spacing(16)))] w-full overflow-hidden">
        {hasSelection ? (
          sidebarPanel
        ) : (
          <div className="flex flex-col gap-4 flex-1 min-h-0">
            {mobileSubHeader}
            {filters}
            {pagination}
            <div className="flex-1 min-h-0 w-full overflow-hidden">
              <ScrollArea className="h-full w-full rounded-xl border">
                {isLoading ? tableSkeleton : table}
              </ScrollArea>
            </div>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-6 h-[calc(100vh-(--spacing(16)))] w-full overflow-hidden @container-main">
      {pageHeader}
      {subHeader}
      <div
        className={cn('w-full transition-all @container', hasSelection && '@max-6xl/main:hidden')}
      >
        {filters}
      </div>
      <div className="flex flex-row w-full gap-4 h-full min-h-0">
        <div
          className={cn(
            'flex flex-col grow min-h-0 gap-4 justify-between @container',
            hasSelection && '@max-6xl/main:hidden',
          )}
        >
          <div className="relative min-h-0 max-h-full flex shrink @container">
            <ScrollArea className="h-full w-full rounded-xl border ">
              {isLoading ? tableSkeleton : table}
            </ScrollArea>
          </div>
          <div className="pt-2">{pagination}</div>
        </div>

        {hasSelection ? sidebarPanel : (emptyState ?? <EmptyState />)}
      </div>
    </div>
  );
}
