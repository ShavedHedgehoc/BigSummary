import * as React from "react";
import BreadCrumbHeader from "../../components/headers/BreadCrumbHeader";
import MainPageHeader from "../../components/headers/MainPageHeader";
import { TableComponent } from "./TableComponent";
import { ChangeUserRolesModal } from "./ChangeUserRolesModal";
import NotMobileVersion from "../../shared/components/not-mobile-version";
import UsersFilter from "./users-filter";
import UsersPagination from "./users-pagination";

const Users = () => {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Администратор", "Пользователи БД"]} />
      <MainPageHeader pageTitle={"Пользователи БД"} />
      <UsersFilter />
      <NotMobileVersion />
      <TableComponent />
      <ChangeUserRolesModal />
      <UsersPagination />
    </React.Fragment>
  );
};

export default Users;
