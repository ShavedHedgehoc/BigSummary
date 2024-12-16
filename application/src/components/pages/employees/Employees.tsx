import * as React from "react";
import BreadCrumbHeader from "../../headers/BreadCrumbHeader";
import MainPageHeader from "../../headers/MainPageHeader";
import { AddEmployeeModal } from "./AddEmployeeModal";
import { PaginationComponent } from "./PaginationComponent";
import { TableComponent } from "./TableComponent";
import { FilterComponent } from "./FilterComponent";
import { EditEmployeeModal } from "./EditEmployeeModal";
import NotMobileVersion from "../../../shared/components/not-mobile-version";

const Employees = () => {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Пользователи рабочей станции"]} />
      <MainPageHeader pageTitle={"Пользователи рабочей станции"} />
      <NotMobileVersion />
      <FilterComponent />
      <TableComponent />
      <PaginationComponent />
      <AddEmployeeModal />
      <EditEmployeeModal />
    </React.Fragment>
  );
};

export default Employees;
