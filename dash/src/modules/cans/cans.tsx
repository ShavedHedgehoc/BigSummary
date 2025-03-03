import { useSearchParams } from "react-router";
import { usePlants } from "../../shared/api/use-plants";
import InfoPage from "../../shared/components/info-page";
import TechLayout from "../../shared/layouts/tech-layout";

import CansView from "./cans-view";
import CansHeader from "./cans-header";
import AppFooter from "../app-footer";
import CansFilterModal from "./cans-filter-modal";

export default function Cans() {
  let [searchParams] = useSearchParams();
  const plant = searchParams.get("plant");
  const { data } = usePlants(plant);

  if (!data) {
    return <InfoPage message="Площадка из строки поиска отсутствует в базе данных..." />;
  }

  if (plant === null) {
    return <InfoPage message=" Отсутствует выбор площадки в строке поиска..." />;
  }

  return (
    <TechLayout>
      <TechLayout.Header>
        <CansFilterModal />
        <CansHeader />
      </TechLayout.Header>
      <TechLayout.Main>
        <CansView />
      </TechLayout.Main>
      <TechLayout.Footer>
        <AppFooter plant={plant} disabled={1} />
      </TechLayout.Footer>
    </TechLayout>
  );
}
