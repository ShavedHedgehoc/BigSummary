import * as React from "react";
import BreadCrumbHeader from "../headers/BreadCrumbHeader";
// import MainPageHeader from "./MainPageHeader";
import SummaryListTable from "../SummaryListTable";
import { Context } from "../../main";
import MainPageHeaderWithRenew from "../headers/MainPageHeaderWithRenew";

export default function SummaryList() {
  const { store } = React.useContext(Context);
  React.useEffect(() => {
    store.DocStore.fetchDocs();
  });
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Планировщик", "Список сводок"]} />
      {/* <MainPageHeaderWithRenew title={"Список сводок"} renewData={() => store.DocStore.fetchDocs()} /> */}
      <MainPageHeaderWithRenew title={"Список сводок"} />
      <SummaryListTable />
    </React.Fragment>
  );
}
