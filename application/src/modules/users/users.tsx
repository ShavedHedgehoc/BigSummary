import * as React from "react";
import BreadCrumbHeader from "../../components/headers/BreadCrumbHeader";
import MainPageHeader from "../../components/headers/MainPageHeader";
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
     
      <PaginationComponent />
      
      <EditUserModal /> */}
    </React.Fragment>
  );
};

export default Users;
