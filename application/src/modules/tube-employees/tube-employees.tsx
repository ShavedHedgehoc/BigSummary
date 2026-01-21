import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
import TubeEmployeesPagination from "./tube-employees-pagination";
import TubeEmployeesTable from "./tube-employees-table";
import TubeEmployeesFilter from "./filter/tube-employees-filter";
import TubeEmployeesAddModal from "./add-modal/tube-employees-add-modal";
import TubeEmployeesEditModal from "./edit-modal/tube-employees-edit-modal";

export default function TubeEmployees() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Тубы", "Сотрудники"]} />
      <MainPageHeader pageTitle={"Сотрудники"} />
      <TubeEmployeesFilter />
      <TubeEmployeesTable />
      <TubeEmployeesPagination />
      <TubeEmployeesAddModal />
      <TubeEmployeesEditModal />
    </React.Fragment>
  );
}
