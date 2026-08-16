import { useSearchParams } from 'react-router';
// import { usePlants } from '../../shared/api/use-plants';
import InfoPage from '../../shared/components/info-page';
// import AppSummaryView from "./app-summary-view";

import TechLayout from '../../shared/layouts/tech-layout';

import AppFooter from '../app-footer';
import AppSummaryHeader from './app-summary-header';
import AppSummaryViewTemp from './app-summary-view-temp';
import { trpc } from '../../shared/trpc';

export default function AppSummary() {
  let [searchParams] = useSearchParams();
  const plant = searchParams.get('plant');

  // const { data, isSuccess } = usePlants(plant);
  if (plant === null) {
    return <InfoPage message=" Отсутствует выбор площадки в строке поиска..." />;
  }
  const { data, isSuccess } = trpc.dash.plant.getPlantByValue.useQuery({ value: plant });


  if (!data) {
    return <InfoPage message="Площадка из строки поиска отсутствует в базе данных..." />;
  }



  return (
    <TechLayout>
      <TechLayout.Header>
        <AppSummaryHeader />
      </TechLayout.Header>
      {/* <TechLayout.Main>{isSuccess && <AppSummaryView {...data} />}</TechLayout.Main> */}
      <TechLayout.Main>{isSuccess && <AppSummaryViewTemp {...data} />}</TechLayout.Main>
      <TechLayout.Footer>
        <AppFooter plant={plant} disabled={2} />
      </TechLayout.Footer>
    </TechLayout>
  );
}
