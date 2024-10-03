import * as React from "react";
import { Context } from "../../main";
import BreadCrumbHeader from "../headers/BreadCrumbHeader";
import SummaryListTable from "../tables/summary_list_table/SummaryListTable";
import MainPageHeaderWithRenewProp from "../headers/MainPageHeaderWithRenewProp";

export default function SummaryList() {
  const [initial, setInitial] = React.useState(false);
  const { store } = React.useContext(Context);
  React.useEffect(() => {
    store.DocStore.fetchDocs().then(() => setInitial(true));
  });
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Планировщик", "Список сводок"]} />
      <MainPageHeaderWithRenewProp title={"Список сводок"} renewData={() => store.DocStore.fetchDocs()} />
      {initial && <SummaryListTable role={"planner"} />}
    </React.Fragment>
  );
}
