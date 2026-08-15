import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
export default function TraceBatchWeightingsSummaryHeader() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Весовой участок", "Выработка сотрудников"]} />
      <MainPageHeader pageTitle={"Выработка"} />
    </React.Fragment>
  );
}
