import * as React from "react";
import { Outlet } from "react-router-dom";
import { Context } from "../../../main";
import Header from "../header/Header";
import classes from "./layout.module.css";

export default function Layout() {
  const { store } = React.useContext(Context);
  const headerProps = {
    name: store.AuthStore.user.name,
    logout: () => store.AuthStore.logout(),
  };
  return (
    <div className={classes.main_container}>
      <div className={classes.header}>
        <Header {...headerProps} />
      </div>
      <div className={classes.main_pane}>
        <React.Suspense fallback={<div>Loading..///.</div>}>
          <Outlet />
        </React.Suspense>
      </div>
    </div>
  );
}
