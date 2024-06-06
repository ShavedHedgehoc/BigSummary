// import * as React from "react";
import classes from "./topmenu.module.css";
import { RouteNames } from "../../../consts/routeNames";

export default function TopMenu() {
  const items = [
    { name: "Текущая сводка", url: RouteNames.HOME },
    { name: "Планировщик", url: RouteNames.PLANNER },
    { name: "Главный технолог", url: RouteNames.TECHNOLOGIST },
    { name: "Лаборатория", url: RouteNames.LABORATORY },
    { name: "Отчеты", url: RouteNames.REPORTS },
    { name: "Администратор", url: RouteNames.ADMIN },
  ];

  return (
    <div className={classes.top_menu_container}>
      {items.map((item) => (
        <div key={item.name}>
          <a className={classes.topmenu_a} href={item.url}>
            {item.name}
          </a>
        </div>
      ))}
    </div>
  );
}
