import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";

export default function TubeMonitor() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Тубы", "Монитор"]} />
      <MainPageHeader pageTitle={"Монитор"} />
    </React.Fragment>
  );
}
