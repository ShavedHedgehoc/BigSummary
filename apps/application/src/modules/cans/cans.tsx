import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
import CansView from "./cans-view";
import CansFilter from "./filter/cans-filter";
import CansHistoryModal from "./history-modal/cans-history-modal";

export default function Cans() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Технолог", "Статусы емкостей"]} />
      <MainPageHeader pageTitle={"Статусы емкостей"} />
      <CansFilter />
      <CansView />
      <CansHistoryModal />
    </React.Fragment>
  );
}
