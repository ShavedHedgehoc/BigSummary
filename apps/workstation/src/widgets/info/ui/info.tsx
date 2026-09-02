import { TPlantByValueOutput } from '@repo/schemas';
import { trpc } from '@/shared/api';
import { LoadingComponent } from '@/shared/ui';
import NotFoundComponent from './not-found-component';
import { InfoTable } from './info-table';

interface IInfoWidgetProps {
  plant: TPlantByValueOutput;
}

export function InfoWidget({ plant }: IInfoWidgetProps) {
  const { data, isLoading, isSuccess } =
    trpc.workstation.history.getLastEmployeeHistoriesByPlantId.useQuery(
      { plantId: plant.id },
      {
        refetchInterval: 10000,
        retry: (failureCount, error) => {
          if (error.shape?.data?.code === 'NOT_FOUND') return false;
          return failureCount < 3;
        },
      },
    );
  if (isLoading) return <LoadingComponent />;
  if (isSuccess && (!data || data.length === 0)) return <NotFoundComponent />;
  return <InfoTable data={data || []} />;
}
