import * as React from "react";
import classes from "./header.module.css";
import TopMenu from "../topMenu/TopMenu";
import UserPane from "../../userPane/userPane";

interface HeaderProps {
  name: string;
  logout(): void;
}
export default function Header(props: HeaderProps) {
  return (
    <div className={classes.header_container}>
      <div className={classes.header_menu}>
        <TopMenu />
      </div>
      <div className={classes.header_user_pane}>
        <UserPane {...props} />
      </div>
    </div>
  );
}
