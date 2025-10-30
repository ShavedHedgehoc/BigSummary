import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";

import NotMobileVersion from "../../shared/components/not-mobile-version";
import EmployeesFilter from "./filter/employees-filter";
import EmployeesPagination from "./employees-pagination";
import EmployeesTable from "./employees-table";
import EmployeesAddModal from "./employees-add-modal/employees-add-modal";
import EmployeesEditModal from "./employees-eidt-modal/employees-edit-modal";

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
