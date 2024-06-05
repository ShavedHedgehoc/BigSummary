import * as React from "react";
import classes from "./sideNavPageWrapper.module.css";

interface wrapperProps {
  menu: React.JSX.Element;
  children: React.JSX.Element;
}
export default function SideNavPageWrapper({ menu, children }: wrapperProps) {
  return (
    <>
      <div className={classes.sidenav_page_wrapper_menu}>{menu}</div>
      <div className={classes.sidenav_page_wrapper_content}>{children}</div>
    </>
  );
}
