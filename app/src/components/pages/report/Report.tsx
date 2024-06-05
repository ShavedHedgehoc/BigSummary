import * as React from "react";
import SideNavPageWrapper from "../../ui/sideNavPageWrapper/sideNavPageWrapper";
import { RouteNames } from "../../../consts/routeNames";
import { Outlet } from "react-router-dom";
import SideMenu from "../../ui/sideMenu/SideMenu";

export default function Report() {
  const items = [
    { name: "Главная", url: RouteNames.REPORTS },
    { name: "Отчет 1", url: RouteNames.REPORT1 },
  ];
  return (
    <SideNavPageWrapper menu={<SideMenu items={items} header="Отчеты" />}>
      <React.Suspense fallback={<div>Loading..///.</div>}>
        <Outlet />
      </React.Suspense>
    </SideNavPageWrapper>
  );
}
