import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";

import { ChangeUserRolesModal } from "./ChangeUserRolesModal";
import NotMobileVersion from "../../shared/components/not-mobile-version";
import UsersFilter from "./users-filter";
import UsersPagination from "./users-pagination";
import UsersTable from "./users-table";

const Users = () => {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Администратор", "Пользователи БД"]} />
      <MainPageHeader pageTitle={"Пользователи БД"} />
      <UsersFilter />
      <NotMobileVersion />
      <UsersTable />
      <ChangeUserRolesModal />
      <UsersPagination />
    </React.Fragment>
  );
};

export default Users;
