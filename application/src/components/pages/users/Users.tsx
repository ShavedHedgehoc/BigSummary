import * as React from "react";
import BreadCrumbHeader from "../../headers/BreadCrumbHeader";
import MainPageHeader from "../../headers/MainPageHeader";
import { TableComponent } from "./TableComponent";
import { ChangeUserRolesModal } from "./ChangeUserRolesModal";

const Users = () => {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Администратор", "Пользователи БД"]} />
      <MainPageHeader pageTitle={"Пользователи БД"} />
      <TableComponent />
      <ChangeUserRolesModal />
      {/* <FilterComponent />
      <TableComponent />
      <PaginationComponent />
      <AddEmployeeModal />
      <EditEmployeeModal /> */}
    </React.Fragment>
  );
};

export default Users;
