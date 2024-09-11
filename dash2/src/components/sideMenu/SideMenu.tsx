import * as React from "react";

import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  Divider,
  Drawer,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { IUser } from "../../store/AuthStore";

export interface SideMenuProps {
  isAuth: boolean;
  user: IUser;
  open: boolean;
  setOpen(val: boolean): void;
  navigateToLogin(): void;
  logout(): void;
}

export default function SideMenu(props: SideMenuProps) {
  // const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    props.setOpen(newOpen);
  };
  const [logged, setLogged] = React.useState(false);
  return (
    <>
      <Drawer open={props.open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            <ListSubheader component="div" sx={{ justifyContent: "left", alignItems: "center", display: "flex" }}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              {props.user?.name ? props.user.name : "Не авторизован"}
            </ListSubheader>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              {/* <ListItemButton onClick={() => setLogged(!logged)}> */}
              <ListItemButton onClick={props.isAuth ? () => props.logout() : () => props.navigateToLogin()}>
                <ListItemIcon>{logged ? <LogoutIcon /> : <LoginIcon />}</ListItemIcon>
                <ListItemText primary={props.user?.name ? "Выйти" : "Войти"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      {/* <Fab
        color="warning"
        style={{ margin: "0", top: "auto", left: "20px", bottom: "20px", right: "auto", position: "fixed" }}
        onClick={toggleDrawer(true)}
      >
        <PersonIcon />
      </Fab> */}
    </>
  );
}
