import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
import NotMobileVersion from "../../shared/components/not-mobile-version";
import UsersFilter from "./filter/users-filter";
import UsersPagination from "./users-pagination";
import UsersTable from "./users-table";
import UpdateUserModal from "./update-user-modal/update-user-modal";
import UpdateUserRolesModal from "./update-user-roles-modal/update-user-roles-modal";

const Users = () => {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Администратор", "Пользователи БД"]} />
      <MainPageHeader pageTitle={"Пользователи БД"} />
      <UsersFilter />
      <NotMobileVersion />
      <UsersTable />
      <UpdateUserRolesModal />
      <UpdateUserModal />
      <UsersPagination />
    </React.Fragment>
  );
};

export default Users;
