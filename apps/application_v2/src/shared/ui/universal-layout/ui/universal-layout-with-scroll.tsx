'use client';

import { ReactNode } from 'react';
import { cn, useIsMobile } from '@/shared/lib';
import { EmptyState } from './empty-state';
import { ScrollArea } from '@/shared/ui';

interface UniversalLayoutWithScrollProps {
  hasSelection: boolean;
  isLoading?: boolean;
  pageHeader?: ReactNode;
  subHeader?: ReactNode;
  mobileSubHeader?: ReactNode;
  filters: ReactNode;
  table: ReactNode;
  tableSkeleton: ReactNode;
  sidebarPanel: ReactNode;
  emptyState?: ReactNode;
}

export function UniversalLayoutWithScroll({
  hasSelection,
  isLoading,
  pageHeader,
  subHeader,
  mobileSubHeader,
  filters,
  table,
  tableSkeleton,
  sidebarPanel,
  emptyState,
}: UniversalLayoutWithScrollProps) {
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

      <div className="flex flex-row w-full gap-4 h-full overflow-hidden">
        <div
          className={cn(
            'flex flex-col grow min-w-0 h-full @container',
            hasSelection && '@max-6xl/main:hidden',
          )}
        >
          <ScrollArea className="h-full w-full rounded-xl border">
            {isLoading ? tableSkeleton : table}
          </ScrollArea>
        </div>

        {hasSelection ? sidebarPanel : (emptyState ?? <EmptyState />)}
      </div>
    </div>
  );
}
