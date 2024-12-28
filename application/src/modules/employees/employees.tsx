import * as React from "react";
import BreadCrumbHeader from "../../components/headers/BreadCrumbHeader";
import MainPageHeader from "../../components/headers/MainPageHeader";

import NotMobileVersion from "../../shared/components/not-mobile-version";
import EmployeesFilter from "./employees-filter";
import EmployeesPagination from "./employees-pagination";
import EmployeesTable from "./employees-table";
import EmployeesAddModal from "./employees-add-modal";
import EmployeesEditModal from "./employees-edit-modal";

const Employees = () => {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Пользователи рабочей станции"]} />
      <MainPageHeader pageTitle={"Пользователи рабочей станции"} />
      <NotMobileVersion />
      <EmployeesFilter />
      <EmployeesTable />
      <EmployeesPagination />
      <EmployeesAddModal />
      <EmployeesEditModal />
    </React.Fragment>
  );
};

export default Employees;
