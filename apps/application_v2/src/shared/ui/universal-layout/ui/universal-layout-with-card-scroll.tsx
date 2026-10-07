'use client';

import { ReactNode } from 'react';
import { cn, useIsMobile } from '@/shared/lib';
import { LoaderCard } from '@/shared/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface UniversalLayoutWithScrollProps {
  hasSelection: boolean;
  isLoading?: boolean;
  pageHeader?: ReactNode;
  subHeader?: ReactNode;
  mobileSubHeader?: ReactNode;
  filters: ReactNode;
  scrollContent: ReactNode;
  loadingContent?: ReactNode;
  sidebarPanel: ReactNode;
}

export function UniversalLayoutWithCardScroll({
  hasSelection,
  isLoading,
  pageHeader,
  subHeader,
  mobileSubHeader,
  filters,
  scrollContent,
  sidebarPanel,
}: UniversalLayoutWithScrollProps) {
  const isMobile = useIsMobile();
  const isEmpty = !scrollContent || (Array.isArray(scrollContent) && scrollContent.length === 0);

  if (isMobile) {
    return (
      <div className="flex flex-col gap-4 py-4 px-4 h-[calc(100vh-(--spacing(16)))] w-full overflow-hidden">
        {hasSelection ? (
          sidebarPanel
        ) : (
          <div className="flex flex-col gap-4 flex-1 min-h-0">
            {mobileSubHeader}
            {filters}
            <div className="flex-1 min-h-0 w-full overflow-y-auto scrollbar-none ">
              {isLoading ? (
                <div
                  className={cn(
                    'flex flex-col grow items-center justify-center',
                    'h-full w-full my-auto text-muted-foreground text-sm font-medium',
                    'border border-muted-foreground/20 rounded-xl',
                  )}
                >
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <p>Загрузка данных...</p>
                </div>
              ) : isEmpty ? (
                <div
                  className={cn(
                    'flex flex-col grow items-center justify-center',
                    'h-full w-full my-auto text-muted-foreground/50 text-xs font-medium',
                    'border border-muted-foreground/20 rounded-xl',
                  )}
                >
                  Записей не найдено
                </div>
              ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3 ">
                  {scrollContent}
                </div>
              )}
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

      <div className="flex flex-row w-full gap-4 items-center shrink-0">
        <div
          className={cn(
            'flex flex-col grow min-w-0 @container ',
            hasSelection && '@max-6xl/main:hidden',
          )}
        >
          {filters}
        </div>

        <AnimatePresence mode="popLayout">
          {hasSelection && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 'auto' }}
              exit={{ width: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="shrink-0 overflow-hidden"
            >
              <div className="w-full @min-6xl/main:w-110 h-1" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-row w-full gap-4 h-full overflow-hidden">
        <div
          className={cn(
            'flex flex-col grow min-w-0 h-full @container',
            hasSelection && '@max-6xl/main:hidden',
          )}
        >
          <div
            className={cn(
              'py-1 h-full w-full rounded-md overflow-y-auto scrollbar-thin scrollbar-track-card scrollbar-thumb-muted-foreground/50 pr-1',
            )}
          >
            {isLoading ? (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3 px-1">
                <LoaderCard />
              </div>
            ) : isEmpty ? (
              <div className="pr-1 w-full h-full  flex flex-col">
                <div
                  className={cn(
                    'flex flex-col grow items-center justify-center h-full w-full',
                    'border border-muted-foreground/20 rounded-xl',
                    'text-muted-foreground/50 text-sm font-medium',
                  )}
                >
                  Записей не найдено
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3 px-1">
                {scrollContent}
              </div>
            )}
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {hasSelection && (
            <motion.div
              initial={{ width: 0, opacity: 0, x: 20 }}
              // animate={{ width: 'auto', opacity: 1, x: 0 }}
              animate={{ width: isMobile ? '100%' : 'auto', opacity: 1, x: 0 }}
              exit={{ width: 0, opacity: 0, x: 20 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              // className="h-full shrink-0 overflow-hidden pt-1"
              className="h-full shrink-0 overflow-hidden pt-1 flex-1 @min-6xl/main:flex-none w-full"
            >
              {/* <div className="w-full @min-6xl/main:w-110 h-full "> */}
              <div className="w-full @max-6xl/main:w-full @min-6xl/main:w-110 h-full">
                {sidebarPanel}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
