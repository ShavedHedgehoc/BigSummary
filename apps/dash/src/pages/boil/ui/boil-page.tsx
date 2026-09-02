import { useSearchParams } from 'react-router';

import { InfoPage } from '@/shared/ui';
import { TechLayout } from '@/shared/layouts';
import { BoilHeader } from '@/widgets/boil-header';
import { AppFooter } from '@/widgets/app-footer';
import { trpc } from '@/shared/api';
import { BoilView } from '@/widgets/boil-view';

export function BoilPage() {
  const [searchParams] = useSearchParams();
  const plant = searchParams.get('plant');

  if (plant === null) {
    return <InfoPage message=" Отсутствует выбор площадки в строке поиска..." />;
  }

  const { data, isLoading, isError } = trpc.dash.main.plant.getPlantByValue.useQuery({
    value: plant,
  });

  if (isLoading || isError) {
    return null;
  }

  if (!data) {
    return <InfoPage message="Площадка из строки поиска отсутствует в базе данных..." />;
  }

  return (
    <TechLayout>
      <TechLayout.Header>
        <BoilHeader />
      </TechLayout.Header>
      <TechLayout.Main>
        <BoilView />
      </TechLayout.Main>
      <TechLayout.Footer>
        <AppFooter plant={plant} disabled={3} />
      </TechLayout.Footer>
    </TechLayout>
  );
}
