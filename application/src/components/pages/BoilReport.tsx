import * as React from "react";
import BreadCrumbHeader from "../headers/BreadCrumbHeader";
import { Context } from "../../main";
import MainPageHeaderWithRenewProp from "../headers/MainPageHeaderWithRenewProp";
import BoilsListTable from "../tables/boils_list_table/BoilsListTable";

export default function BoilsReport() {
  const [initial, setInitial] = React.useState(false);
  const { store } = React.useContext(Context);
  React.useEffect(() => {
    store.BoilStore.fetchBoils().then(() => setInitial(true));
  });
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Отчеты", "Основы"]} />
      <MainPageHeaderWithRenewProp title={"Основы"} renewData={() => store.BoilStore.fetchBoils()} />
      {initial && <BoilsListTable role={"reports"} />}
    </React.Fragment>
  );
}
