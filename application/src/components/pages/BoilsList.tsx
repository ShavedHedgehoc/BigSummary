import * as React from "react";
import BreadCrumbHeader from "../headers/BreadCrumbHeader";
import { Context } from "../../main";
// import MainPageHeaderWithRenewProp from "../headers/MainPageHeaderWithRenewProp";
import BoilsListTable from "../tables/boils_list_table/BoilsListTable";
import MainPageHeader from "../headers/MainPageHeader";

export default function BoilsList() {
  const [initial, setInitial] = React.useState(false);

  const { store } = React.useContext(Context);

  React.useEffect(() => {
    store.BoilStore.fetchBoils()
      .then(() => store.HistoryTypeStore.fetchHistoryTypes())
      .then(() => store.BoilStore.clearFilter())
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
