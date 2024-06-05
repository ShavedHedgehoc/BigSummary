import * as React from "react";
import SideNavPageWrapper from "../../ui/sideNavPageWrapper/sideNavPageWrapper";
import { RouteNames } from "../../../consts/routeNames";
import { Outlet } from "react-router-dom";
import SideMenu from "../../ui/sideMenu/SideMenu";

export default function Admin() {
  const items = [
    { name: "Главная", url: RouteNames.ADMIN },
    { name: "Пользователи БД", url: RouteNames.USERS },
  ];
  return (
    <SideNavPageWrapper menu={<SideMenu items={items} header="Администратор" />}>
      <React.Suspense fallback={<div>Loading..///.</div>}>
        <Outlet />
      </React.Suspense>
    </SideNavPageWrapper>
  );
}
