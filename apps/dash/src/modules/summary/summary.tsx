import React from 'react';
import { useSearchParams } from 'react-router';
// import { usePlants } from '../../shared/api/use-plants';
import InfoPage from '../../shared/components/info-page';
import SummaryView from './summary-view';
import { trpc } from '../../shared/api/trpc';

export default function Summary() {
  const [searchParams] = useSearchParams();
  const plant = searchParams.get('plant');
  // const { data, isSuccess } = usePlants(plant);

  // if (!data) {
  //   return <InfoPage message="Площадка из строки поиска отсутствует в базе данных..." />;
  // }

  if (plant === null) {
    return <InfoPage message=" Отсутствует выбор площадки в строке поиска..." />;
  }
  const { data, isSuccess } = trpc.dash.plant.getPlantByValue.useQuery({ value: plant });
  if (!data) {
    return <InfoPage message="Площадка из строки поиска отсутствует в базе данных..." />;
  }

  return <React.Fragment>{isSuccess && <SummaryView {...data} />}</React.Fragment>;
}
