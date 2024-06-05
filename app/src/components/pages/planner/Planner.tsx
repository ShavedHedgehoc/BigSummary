import * as React from "react";
import SideNavPageWrapper from "../../ui/sideNavPageWrapper/sideNavPageWrapper";
import { RouteNames } from "../../../consts/routeNames";
import { Outlet } from "react-router-dom";
import SideMenu from "../../ui/sideMenu/SideMenu";

export default function Planner() {
  const items = [
    { name: "Список сводок", url: RouteNames.PLANNER },
    { name: "Загрузка сводок", url: RouteNames.SUMMARY_UPLOAD },
  ];
  return (
    <SideNavPageWrapper menu={<SideMenu items={items} header="Планировщик" />}>
      <React.Suspense fallback={<div>Loading..///.</div>}>
        <Outlet />
      </React.Suspense>
    </SideNavPageWrapper>
  );
}
