import { useSearchParams } from "react-router";
import { usePlants } from "../../shared/api/use-plants";
import InfoPage from "../../shared/components/info-page";
import TechLayout from "../../shared/layouts/tech-layout";

import AppFooter from "../app-footer";
import BoilsHeader from "./boils-header";
import BoilsView from "./boils-view";

export default function Boils() {
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
        <BoilsHeader />
      </TechLayout.Header>
      <TechLayout.Main>
        <BoilsView />
      </TechLayout.Main>
      <TechLayout.Footer>
        <AppFooter plant={plant} disabled={3} />
      </TechLayout.Footer>
    </TechLayout>
  );
}
