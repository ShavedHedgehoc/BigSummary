// import * as React from "react";
import classes from "./sideMenu.module.css";

interface SideItem {
  name: string;
  url: string;
}

interface SideMenuProps {
  header: string;
  items: SideItem[];
}
export default function SideMenu(props: SideMenuProps) {
  return (
    <div className={classes.sidemenu_container}>
      <div className={classes.sidemenu_header}>{props.header}</div>
      <div className={classes.sidemenu_items}>
        {props.items.map((item) => (
          <div key={item.name}>
            <a className={classes.sidemenu_a} href={item.url}>
              {item.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
