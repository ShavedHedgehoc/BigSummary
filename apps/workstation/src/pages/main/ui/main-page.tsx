import { trpc } from '@/shared/api';
import { NoSelectPlantComponent } from '@/shared/ui';
import { MainWidget } from '@/widgets/main-widger';

export function MainPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const plant = searchParams.get('plant');

  if (plant === null) {
    return <NoSelectPlantComponent msg=" Отсутствует выбор площадки в строке поиска..." />;
  }

  const { data, isError, isLoading } = trpc.workstation.plant.getPlantByValue.useQuery({
    value: plant,
  });

  if (isLoading || isError) {
    return null;
  }

  if (!data) {
    return <NoSelectPlantComponent msg="Площадка из строки поиска отсутствует в базе данных..." />;
  }
  return <MainWidget plant={data} />;
}
