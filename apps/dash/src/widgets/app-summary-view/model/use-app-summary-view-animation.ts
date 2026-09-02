import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { trpc } from '@/shared/api';
import { useAppSummaryViewStore } from '@/entities/summary';

interface UseSummaryAnimationProps {
  plantId: number;
}

export function useAppSummaryViewAnimation({ plantId }: UseSummaryAnimationProps) {
  const notScrollingCardsQuantity = window.innerWidth > 1280 ? 48 : 30;
  const scrollDelay = 30000;

  const [scrolling, setScrolling] = React.useState(false);
  const [recordsCount, setRecordsCount] = React.useState(0);

  const timerRef = React.useRef<number | undefined>(undefined);

  const current = useAppSummaryViewStore(useShallow((state) => state.current));

  const { data, isSuccess, isLoading, isError, error } =
    trpc.dash.main.doc.getDocDataCurrentApp.useQuery(
      { current, plantId },
      {
        refetchInterval: 10000,
        retry: (failureCount, error) => {
          if (error.shape?.data?.code === 'NOT_FOUND') return false;
          return failureCount < 3;
        },
      },
    );

  const isDocNotFound = isError && error?.shape?.data?.code === 'NOT_FOUND';

  const resetTimer = React.useCallback(() => {
    setScrolling(false);

    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }

    timerRef.current = window.setInterval(() => {
      setScrolling(true);
    }, scrollDelay);
  }, [scrollDelay]);

  React.useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [resetTimer, current, plantId]);

  React.useEffect(() => {
    if (isSuccess && data?.records) {
      setRecordsCount(data.records.length);
    }
  }, [data, isSuccess]);
  return {
    data,
    isSuccess,
    isLoading,
    scrolling,
    isAnimationNeeded: recordsCount > notScrollingCardsQuantity,
    isDocNotFound,
    resetTimer,
  };
}
