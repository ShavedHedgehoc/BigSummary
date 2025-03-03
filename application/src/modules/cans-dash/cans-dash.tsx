import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
import CansDashView from "./cans-dash-view";

export default function CansDash() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Технолог", "Местоположение емкостей"]} />
      <MainPageHeader pageTitle={"Местоположение емкостей"} />
      <CansDashView />
    </React.Fragment>
  );
}
