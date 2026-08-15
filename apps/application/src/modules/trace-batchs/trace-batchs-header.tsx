import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
export default function TraceBatchsHeader() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Прослеживаемость", "Варки"]} />
      <MainPageHeader pageTitle={"Варки"} />
    </React.Fragment>
  );
}
