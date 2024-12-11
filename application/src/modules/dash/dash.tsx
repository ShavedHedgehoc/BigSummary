import * as React from "react";
import BreadCrumbHeader from "../../components/headers/BreadCrumbHeader";
import MainPageHeader from "../../components/headers/MainPageHeader";
import DashFilter from "./dash-filter";
import DashView from "./dash-view";

export default function Dash() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Текущая сводка"]} />
      <MainPageHeader pageTitle={"Текущая сводка"} />
      <DashFilter />
      <DashView />
    </React.Fragment>
  );
}
