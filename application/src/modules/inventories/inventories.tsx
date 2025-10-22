import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
import InventoriesFilter from "./filter/inventories-filter";
import InventoriesTable from "./inventories-table";
import InventoriesPagination from "./inventories-pagination";

export default function Inventories() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Весовой участок", "Переучеты"]} />
      <MainPageHeader pageTitle={"Переучеты"} />
      <InventoriesFilter />
      <InventoriesTable />
      <InventoriesPagination />
    </React.Fragment>
  );
}
