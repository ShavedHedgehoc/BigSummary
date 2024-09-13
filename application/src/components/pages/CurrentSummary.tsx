import * as React from "react";
import BreadCrumbHeader from "../headers/BreadCrumbHeader";
import MainPageHeaderWithRenew from "../headers/MainPageHeaderWithRenew";
import PlantSelector from "../PlantSelector";
import CurrentSummaryTable from "../CurrentSummaryTable/CurrentSummaryTable";
import { observer } from "mobx-react-lite";
import { Context } from "../../main";
import withVisible from "../common/WithVisible";

function CurrentSummary() {
  const [initial, setInitial] = React.useState(false);
  const { store } = React.useContext(Context);
  const Selector = withVisible(PlantSelector);

  React.useEffect(() => {
    store.PlantStore.fetchPlants().then(() => setInitial(true));
  }, []);

  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Текущая сводка"]} />
      <MainPageHeaderWithRenew title={"Текущая сводка"} />
      <Selector visible={store.PlantStore.currentPlantExists && initial} />
      {initial && <CurrentSummaryTable role={"user"} />}
    </React.Fragment>
  );
}

export default observer(CurrentSummary);
