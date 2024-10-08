import * as React from "react";
import {
  Avatar,
  Box,
  // Chip,
  Divider,
  GlobalStyles,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemContent,
  Sheet,
  Typography,
} from "@mui/joy";
import LogoutIcon from "@mui/icons-material/Logout";
// import FactoryIcon from "@mui/icons-material/Factory";
// import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
// import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
// import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";

import OilBarrelRoundedIcon from "@mui/icons-material/OilBarrelRounded";
// import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
// import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
// import SupportRoundedIcon from "@mui/icons-material/SupportRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
// import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
// import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
// import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ColorSchemeToggle from "./ColorSchemeToggle";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";

import { closeSidebar } from "../../utils";

import { Context } from "../../main";
import { observer } from "mobx-react-lite";
import { RouteNames } from "../../router/routeNames";
import { Link as RouterLink } from "react-router-dom";
import { IUser } from "../../store/AuthStore";

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);

  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

const UserComponent = observer((user: IUser) => (
  <Box sx={{ minWidth: 0, flex: 1 }}>
    <Typography level="title-sm">{user.name}</Typography>
    <Typography level="body-xs">{user.email}</Typography>
  </Box>
));

function SideBar() {
  const { store } = React.useContext(Context);
  // const navigate = useNavigate();
  // console.log("render sidebar");
  return (
    <Sheet
      className="SideBar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      {/* SideBar Header */}
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Typography level="title-sm">Юникосметик</Typography>
        <ColorSchemeToggle sx={{ ml: "auto" }} />
      </Box>
      <Divider />
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton role="menuitem">
              <ListItemContent>
                <Link
                  component={RouterLink}
                  to={RouteNames.HOME}
                  color="neutral"
                  underline="none"
                  sx={{ display: "flex", gap: 1 }}
                  onClick={() => closeSidebar()}
                >
                  <HomeRoundedIcon />
                  <Typography level="title-sm">Текущая сводка</Typography>
                </Link>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <AssignmentRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Планировщик</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon sx={{ transform: open ? "rotate(180deg)" : "none" }} />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }} role="none">
                  <ListItemContent>
                    <Link
                      component={RouterLink}
                      to={RouteNames.SUMMARY_LIST}
                      color="neutral"
                      underline="none"
                      sx={{ display: "flex", gap: 1 }}
                      onClick={() => closeSidebar()}
                    >
                      <Typography level="title-sm">Список сводок</Typography>
                    </Link>
                  </ListItemContent>
                </ListItem>
                <ListItem role="none">
                  <Link
                    component={RouterLink}
                    to={RouteNames.SUMMARY_UPLOAD}
                    color="neutral"
                    underline="none"
                    sx={{ display: "flex", gap: 1 }}
                    onClick={() => closeSidebar()}
                  >
                    <Typography level="title-sm">Загрузка сводок</Typography>
                  </Link>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>

          <ListItem>
            <ListItemButton role="menuitem">
              <ListItemContent>
                <Link
                  component={RouterLink}
                  to={RouteNames.TECHNOLOGIST}
                  color="neutral"
                  underline="none"
                  sx={{ display: "flex", gap: 1 }}
                  onClick={() => closeSidebar()}
                >
                  <OilBarrelRoundedIcon />
                  <Typography level="title-sm">Технолог</Typography>
                </Link>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton role="menuitem">
              <ListItemContent>
                <Link
                  component={RouterLink}
                  to={RouteNames.LABORATORY}
                  color="neutral"
                  underline="none"
                  sx={{ display: "flex", gap: 1 }}
                  onClick={() => closeSidebar()}
                >
                  <ScienceRoundedIcon />
                  <Typography level="title-sm">Лаборатория</Typography>
                </Link>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton role="menuitem">
              <ListItemContent>
                <Link
                  component={RouterLink}
                  to={RouteNames.EMPLOYERS}
                  color="neutral"
                  underline="none"
                  sx={{ display: "flex", gap: 1 }}
                  onClick={() => closeSidebar()}
                >
                  <SettingsRoundedIcon />
                  <Typography level="title-sm">Пользователи рабочей станции</Typography>
                </Link>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          {/* <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <AssignmentRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Администратор</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon sx={{ transform: open ? "rotate(180deg)" : "none" }} />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton>Пользователи</ListItemButton>
                </ListItem>
          
              </List>
            </Toggler>
          </ListItem> */}
        </List>

        {/* <List
          size="sm"
          sx={{
            mt: "auto",
            flexGrow: 0,
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
            "--List-gap": "8px",
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemButton>
              <SupportRoundedIcon />
              Support
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <SettingsRoundedIcon />
              Settings
            </ListItemButton>
          </ListItem>
        </List> */}
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar
          variant="outlined"
          size="sm"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
        />
        <UserComponent {...store.AuthStore.user} />
        {/* <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">{store.AuthStore.user.name}</Typography>
          <Typography level="body-xs">{store.AuthStore.user.email}</Typography>
        </Box> */}
        <IconButton size="sm" variant="plain" color="neutral" onClick={() => store.AuthStore.logout()}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
}

export default observer(SideBar);
