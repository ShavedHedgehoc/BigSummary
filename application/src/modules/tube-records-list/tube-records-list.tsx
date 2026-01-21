import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
import TubeRecordsListPagination from "./tube-records-list-pagination";
import TubeRecordsListTable from "./tube-records-list-table";
import TubeRecordsListFilter from "./filter/tube-records-list-filter";

export default function TubeRecordsList() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Тубы", "Список выпусков"]} />
      <MainPageHeader pageTitle={"Список выпусков"} />
      <TubeRecordsListFilter />
      <TubeRecordsListTable />
      <TubeRecordsListPagination />
    </React.Fragment>
  );
}
