import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
import CansListTable from "./cans-list-table";
import CansListPagination from "./cans-list-pagination";
import CansListFilter from "./cans-list-filter";

export default function CansList() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Технолог", "Список емкостей"]} />
      <MainPageHeader pageTitle={"Список емкостей"} />
      <CansListFilter />
      <CansListTable />
      <CansListPagination />

      {/* 
      <ConveyorEditModal /> */}
    </React.Fragment>
  );
}
