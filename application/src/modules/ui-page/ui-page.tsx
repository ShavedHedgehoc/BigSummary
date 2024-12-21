import * as React from "react";
import BreadCrumbHeader from "../../components/headers/BreadCrumbHeader";
import MainPageHeader from "../../components/headers/MainPageHeader";
import TableButtons from "./table-buttons";
import FilterElements from "./filter-controls";

export default function UiPage() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Администратор"]} />
      <MainPageHeader pageTitle={"UI Page"} />
      <FilterElements />
      <TableButtons />
    </React.Fragment>
  );
}
