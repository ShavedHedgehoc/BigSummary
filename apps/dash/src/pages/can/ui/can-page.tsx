import { useSearchParams } from 'react-router';
import { trpc } from '@/shared/api';
import { InfoPage } from '@/shared/ui';
import { TechLayout } from '@/shared/layouts';
import { CanFilterModal } from '@/features/can-filter';
import { CanHistoryModal } from '@/features/can-history';
import { CanView } from '@/widgets/can-view';
import { CanHeader } from '@/widgets/can-header';
import { AppFooter } from '@/widgets/app-footer';

export function CanPage() {
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
        <CanFilterModal />
        <CanHeader />
      </TechLayout.Header>
      <TechLayout.Main>
        <CanHistoryModal />
        <CanView />
      </TechLayout.Main>
      <TechLayout.Footer>
        <AppFooter plant={plant} disabled={1} />
      </TechLayout.Footer>
    </TechLayout>
  );
}
