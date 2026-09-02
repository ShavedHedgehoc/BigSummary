import { useShallow } from 'zustand/react/shallow';
import { useAppSummaryViewStore } from '@/entities/summary';

export function useAppSummaryTopMenu() {
  const current = useAppSummaryViewStore(useShallow((state) => state.current));
  const setCurrent = useAppSummaryViewStore(useShallow((state) => state.setCurrent));
  return {
    current,
    setCurrent,
  };
}
