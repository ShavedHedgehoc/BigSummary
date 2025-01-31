import * as React from "react";
import { Context } from "../../main";
import { BoilFilterParams } from "../../store/BoilStore";
import BreadCrumbHeader from "../headers/BreadCrumbHeader";
import MainPageHeader from "../headers/MainPageHeader";
import BoilsListTable from "../tables/boils_list_table/BoilsListTable";

export default function BoilsReport() {
  const [initial, setInitial] = React.useState(false);
  const { store } = React.useContext(Context);

  React.useEffect(() => {
    store.HistoryTypeStore.fetchHistoryTypes()
      .then(() => store.PlantStore.fetchPlants())
      .then(() => store.HistoryTypeStore.fetchHistoryTypesForBases())
      .then(() => store.BoilStore.clearFilter())
      .then(() =>
        store.BoilStore.changeFilter({
          key: BoilFilterParams.STATES,
          value: "",
          values: store.HistoryTypeStore.historyTypes.map((item) => item.id),
        })
      )
      .then(() => setInitial(true))
      .then(() => store.BoilStore.fetchBoils());
  }, []);

  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Отчеты", "Основы"]} />
      <MainPageHeader pageTitle={"Основы"} />
      {initial && <BoilsListTable role={"reports"} />}
    </React.Fragment>
  );
}
