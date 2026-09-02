import { useSearchParams } from 'react-router';
import { TechLayout } from '@/shared/layouts';
import { trpc } from '@/shared/api';
import { InfoPage } from '@/shared/ui';
import { AppSummaryHeader } from '@/widgets/app-summary-header';
import { AppSummaryView } from '@/widgets/app-summary-view';
import { AppFooter } from '@/widgets/app-footer';

export function AppSummaryPage() {
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

  return (
    <TechLayout>
      <TechLayout.Header>
        <AppSummaryHeader />
      </TechLayout.Header>
      <TechLayout.Main>{isSuccess && <AppSummaryView {...data} />}</TechLayout.Main>
      <TechLayout.Footer>
        <AppFooter plant={plant} disabled={2} />
      </TechLayout.Footer>
    </TechLayout>
  );
}
