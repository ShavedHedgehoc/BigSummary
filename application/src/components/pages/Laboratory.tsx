import * as React from "react";
import BreadCrumbHeader from "../headers/BreadCrumbHeader";
import MainPageHeaderWithRenew from "../headers/MainPageHeaderWithRenew";
import PlantSelector from "../ui/PlantSelector";

import CurrentSummaryTable from "../tables/current_summary_table/CurrentSummaryTable";
import { observer } from "mobx-react-lite";
import { Context } from "../../main";
import withVisible from "../common/WithVisible";

function Laboratory() {
  const [initial, setInitial] = React.useState(false);
  const Selector = withVisible(PlantSelector);
  const { store } = React.useContext(Context);
  React.useEffect(() => {
    // console.log("render page currentsummary");
    store.PlantStore.fetchPlants().then(() => setInitial(true));
  }, []);
  return (
    <React.Fragment>
      <React.Fragment>
        <BreadCrumbHeader breadcrumbs={["Лаборатория", "Продукты"]} />
        <MainPageHeaderWithRenew title={"Продукты"} />
        <Selector visible={store.PlantStore.currentPlantExists && initial} />
        {initial && <CurrentSummaryTable role={"laboratory"} />}
      </React.Fragment>
    </React.Fragment>
  );
}

export default observer(Laboratory);
