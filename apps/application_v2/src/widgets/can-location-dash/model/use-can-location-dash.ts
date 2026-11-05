import { trpc } from '@/shared/api';
import { useIsMobile } from '@/shared/lib';
import { keepPreviousData } from '@tanstack/react-query';

export function useCanLocationDash() {
  const isMobile = useIsMobile();

  const { data, isLoading } = trpc.application.trace.can.getCanLocationDataList.useQuery(
    undefined,
    {
      placeholderData: keepPreviousData,
      staleTime: 30 * 1000,
      refetchInterval: 10 * 1000,
    },
  );

  return {
    isMobile,
    data,
    isLoading,
  };
}
