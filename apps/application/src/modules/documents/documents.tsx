import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
import DocumentsFilter from "./documents-filter";
import DocumentsTable from "./documents-table";
import DocumentsPagination from "./documents-pagination";

export default function Documents() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Планировщик", "Список сводок"]} />
      <MainPageHeader pageTitle={"Список сводок"} />
      <DocumentsFilter />
      <DocumentsTable />
      <DocumentsPagination />
    </React.Fragment>
  );
}
