import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { trpc } from '@/shared/api';
import { useSummaryViewStore } from './use-summary-view-store';

interface UseSummaryAnimationProps {
  plantId: number;
}
export function useSummaryViewAnimation({ plantId }: UseSummaryAnimationProps) {
  const notScrollingCardsQuantity = window.innerWidth > 1280 ? 48 : 42;
  const notScrollingRowsQuantity = 14;
  const scrollDelay = 30000;

  const cardsView = useSummaryViewStore(useShallow((state) => state.cardsView));
  const setCardsView = useSummaryViewStore(useShallow((state) => state.setCardsView));
  const [hideFinished, setHideFinished] = React.useState(false);
  const [scrolling, setScrolling] = React.useState(false);
  const [recordsCount, setRecordsCount] = React.useState(0);
  const [activeRecordsCount, setActiveRecordsCount] = React.useState(0);

  const timerRef = React.useRef<number | undefined>(undefined);

  const { data, isLoading, error, isError, isSuccess } =
    trpc.dash.main.doc.getDocDataCurrent.useQuery(
      { plantId },
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

  const switchHide = () => setHideFinished((prev) => !prev);
  const switchCardsView = () => setCardsView(!cardsView);

  React.useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  React.useEffect(() => {
    if (isSuccess && data?.records) {
      const activeRecord = data.records.filter((x) => x.stateValue !== 'product_finished');
      setRecordsCount(data.records.length);
      setActiveRecordsCount(activeRecord.length);
    }
  }, [data, isSuccess]);
  return {
    data,
    isSuccess,
    isLoading,
    isDocNotFound,
    scrolling,
    cardsView,
    recordsCount,
    notScrollingCardsQuantity,
    hideFinished,
    activeRecordsCount,
    notScrollingRowsQuantity,
    resetTimer,
    switchCardsView,
    switchHide,
  };
}
