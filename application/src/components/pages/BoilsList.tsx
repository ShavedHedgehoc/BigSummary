import * as React from "react";
import BreadCrumbHeader from "../headers/BreadCrumbHeader";
import { Context } from "../../main";
import BoilsListTable from "../tables/boils_list_table/BoilsListTable";
import MainPageHeader from "../headers/MainPageHeader";
import { BoilFilterParams } from "../../store/BoilStore";

export default function BoilsList() {
  const [initial, setInitial] = React.useState(false);

  const { store } = React.useContext(Context);

  React.useEffect(() => {
    store.BoilStore.fetchBoils()
      .then(() => store.HistoryTypeStore.fetchHistoryTypes())
      .then(() => store.HistoryTypeStore.fetchHistoryTypesForBases())
      .then(() => store.BoilStore.clearFilter())
      .then(() => store.BoilStore.changeFilter({ key: BoilFilterParams.STATES, value: "", values: [1] }))
      .then(() => setInitial(true))
      .then(() => store.BoilStore.fetchBoils());
  }, []);

  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Лаборатория", "Основы"]} />
      <MainPageHeader pageTitle={"Основы"} />
      {initial && <BoilsListTable role={"laboratory"} />}
    </React.Fragment>
  );
}
