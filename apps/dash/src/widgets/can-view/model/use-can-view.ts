import { useCanFilterStore } from '@/features/can-filter';
import { trpc } from '@/shared/api';
import React from 'react';
import { useShallow } from 'zustand/react/shallow';

export function useCanView() {
  const filter = useCanFilterStore(useShallow((state) => state.filter));
  const notScrollingCardsQuantity = window.innerWidth > 1280 ? 36 : 30;
  const scrollDelay = 30000;

  const [scrolling, setScrolling] = React.useState(false);
  const [recordsCount, setRecordsCount] = React.useState(0);

  const timerRef = React.useRef<number | undefined>(undefined);

  const { isLoading, data, isSuccess } = trpc.dash.trace.can.getCanDataList.useQuery(
    { filter },
    { refetchInterval: 10000 },
  );

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
  }, [resetTimer]);

  React.useEffect(() => {
    if (isSuccess && data) {
      setRecordsCount(data.length);
    }
  }, [data, isSuccess]);

  return {
    notScrollingCardsQuantity,
    scrolling,
    recordsCount,
    isLoading,
    isSuccess,
    data,
    resetTimer,
  };
}
