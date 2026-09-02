import React from 'react';
import { useSearchParams } from 'react-router';
import { InfoPage } from '@/shared/ui';
import { trpc } from '@/shared/api';
import { SummaryView } from '@/widgets/summary-view';

export function SummaryPage() {
  const [searchParams] = useSearchParams();
  const plant = searchParams.get('plant');

  if (plant === null) {
    return <InfoPage message=" Отсутствует выбор площадки в строке поиска..." />;
  }

  const { data, isSuccess, isError, isLoading } = trpc.dash.main.plant.getPlantByValue.useQuery({
    value: plant,
  });

  if (isLoading || isError) {
    return null;
  }

  if (!data) {
    return <InfoPage message="Площадка из строки поиска отсутствует в базе данных..." />;
  }

  return <React.Fragment>{isSuccess && <SummaryView {...data} />}</React.Fragment>;
}
