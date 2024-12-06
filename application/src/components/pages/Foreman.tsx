import * as React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../main";
import withVisible from "../common/WithVisible";
import BreadCrumbHeader from "../headers/BreadCrumbHeader";
import MainPageHeaderWithRenew from "../headers/MainPageHeaderWithRenew";
import PlantSelector from "../ui/PlantSelector";
import CurrentSummaryTable from "../tables/current_summary_table/CurrentSummaryTable";

function Foreman() {
  const [initial, setInitial] = React.useState(false);
  const Selector = withVisible(PlantSelector);
  const { store } = React.useContext(Context);

  React.useEffect(() => {
    store.PlantStore.fetchPlants().then(() => setInitial(true));
  }, []);

  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Мастер"]} />
      <MainPageHeaderWithRenew title={"Мастер"} />
      {/* <MainPageHeader pageTitle="Мастер" /> */}
      <Selector visible={store.PlantStore.currentPlantExists && initial} />
      {initial && <CurrentSummaryTable role={"foreman"} />}
    </React.Fragment>
  );
}

export default observer(Foreman);
