import * as React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../main";
import withVisible from "../common/WithVisible";
import BreadCrumbHeader from "../headers/BreadCrumbHeader";
import MainPageHeaderWithRenew from "../headers/MainPageHeaderWithRenew";
import PlantSelector from "../PlantSelector";
import CurrentSummaryTable from "../CurrentSummaryTable/CurrentSummaryTable";

function Technologist() {
  const [initial, setInitial] = React.useState(false);
  const Selector = withVisible(PlantSelector);
  const { store } = React.useContext(Context);

  React.useEffect(() => {
    console.log("render page technologist");
    store.PlantStore.fetchPlants().then(() => setInitial(true));
  }, []);

  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Технолог"]} />
      <MainPageHeaderWithRenew title={"Технолог"} />
      <Selector visible={store.PlantStore.currentPlantExists && initial} />
      {initial && <CurrentSummaryTable role={"technologist"} />}
    </React.Fragment>
  );
}

export default observer(Technologist);
