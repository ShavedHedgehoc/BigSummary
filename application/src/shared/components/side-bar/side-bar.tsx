import * as React from "react";
import {
  Avatar,
  Box,
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
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";
import OilBarrelRoundedIcon from "@mui/icons-material/OilBarrelRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import FactoryRoundedIcon from "@mui/icons-material/FactoryRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ConstructionIcon from "@mui/icons-material/Construction";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import { closeSidebar } from "../../helpers/utils";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { RouteNames } from "../../router/route-names";
import { Link as RouterLink } from "react-router-dom";
import { IUser } from "../../../store/AuthStore";
import ColorSchemeToggle from "./color-scheme-toggle";

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
          <ListItem nested sx={{ display: { xs: "none", sm: "initial" } }}>
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
                      to={RouteNames.DOCUMENTS}
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
                {/* <ListItem role="none">
                  <Link
                    component={RouterLink}
                    to={RouteNames.TUBE_RECORDS_UPLOAD}
                    color="neutral"
                    underline="none"
                    sx={{ display: "flex", gap: 1 }}
                    onClick={() => closeSidebar()}
                  >
                    <Typography level="title-sm">Загрузка сводок (тубы)</Typography>
                  </Link>
                </ListItem> */}
                <ListItem role="none">
                  <Link
                    component={RouterLink}
                    to={RouteNames.CONVEYORS}
                    color="neutral"
                    underline="none"
                    sx={{ display: "flex", gap: 1 }}
                    onClick={() => closeSidebar()}
                  >
                    <Typography level="title-sm">Конвейеры</Typography>
                  </Link>
                </ListItem>
                <ListItem role="none">
                  <Link
                    component={RouterLink}
                    to={RouteNames.BASES_UPDATE}
                    color="neutral"
                    underline="none"
                    sx={{ display: "flex", gap: 1 }}
                    onClick={() => closeSidebar()}
                  >
                    <Typography level="title-sm">Обновление основ</Typography>
                  </Link>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>
          <ListItem nested sx={{ display: { xs: "none", sm: "initial" } }}>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <ScienceRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Лаборатория</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon sx={{ transform: open ? "rotate(180deg)" : "none" }} />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem>
                  <ListItemButton role="none">
                    <ListItemContent>
                      <Link
                        component={RouterLink}
                        to={RouteNames.BOILS_LIST}
                        color="neutral"
                        underline="none"
                        sx={{ display: "flex", gap: 1 }}
                        onClick={() => closeSidebar()}
                      >
                        {/* <ScienceRoundedIcon /> */}
                        <Typography level="title-sm">Основы</Typography>
                      </Link>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton role="none">
                    <ListItemContent>
                      <Link
                        component={RouterLink}
                        to={RouteNames.LABORATORY}
                        color="neutral"
                        underline="none"
                        sx={{ display: "flex", gap: 1 }}
                        onClick={() => closeSidebar()}
                      >
                        {/* <ScienceRoundedIcon /> */}
                        <Typography level="title-sm">Продукты</Typography>
                      </Link>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>
          <ListItem nested sx={{ display: { xs: "none", sm: "initial" } }}>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <OilBarrelRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Технолог</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon sx={{ transform: open ? "rotate(180deg)" : "none" }} />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem>
                  <ListItemButton role="none">
                    <ListItemContent>
                      <Link
                        component={RouterLink}
                        to={RouteNames.CANS_DASH}
                        color="neutral"
                        underline="none"
                        sx={{ display: "flex", gap: 1 }}
                        onClick={() => closeSidebar()}
                      >
                        {/* <ScienceRoundedIcon /> */}
                        <Typography level="title-sm">Ёмкости</Typography>
                      </Link>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton role="none">
                    <ListItemContent>
                      <Link
                        component={RouterLink}
                        to={RouteNames.CANS_LIST}
                        color="neutral"
                        underline="none"
                        sx={{ display: "flex", gap: 1 }}
                        onClick={() => closeSidebar()}
                      >
                        <Typography level="title-sm">Список ёмкостей</Typography>
                      </Link>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton role="none">
                    <ListItemContent>
                      <Link
                        component={RouterLink}
                        to={RouteNames.CANS_LOCATION}
                        color="neutral"
                        underline="none"
                        sx={{ display: "flex", gap: 1 }}
                        onClick={() => closeSidebar()}
                      >
                        {/* <ScienceRoundedIcon /> */}
                        <Typography level="title-sm">Местоположение</Typography>
                      </Link>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>

          <ListItem>
            <ListItemButton role="menuitem">
              <ListItemContent>
                <Link
                  component={RouterLink}
                  to={RouteNames.FOREMAN}
                  color="neutral"
                  underline="none"
                  sx={{ display: "flex", gap: 1 }}
                  onClick={() => closeSidebar()}
                >
                  <FactoryRoundedIcon />
                  <Typography level="title-sm">Мастер </Typography>
                </Link>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem nested sx={{ display: { xs: "none", sm: "initial" } }}>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <AssessmentIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Отчеты</Typography>
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
                      to={RouteNames.TIME_REPORT}
                      color="neutral"
                      underline="none"
                      sx={{ display: "flex", gap: 1 }}
                      onClick={() => closeSidebar()}
                    >
                      <Typography level="title-sm">Тайминг сводок</Typography>
                    </Link>
                  </ListItemContent>
                </ListItem>
                <ListItem sx={{ mt: 0.5 }} role="none">
                  <ListItemContent>
                    <Link
                      component={RouterLink}
                      to={RouteNames.BOILS_REPORT}
                      color="neutral"
                      underline="none"
                      sx={{ display: "flex", gap: 1 }}
                      onClick={() => closeSidebar()}
                    >
                      <Typography level="title-sm">Основы</Typography>
                    </Link>
                  </ListItemContent>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>
          <ListItem sx={{ display: { xs: "none", sm: "initial" } }}>
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
                  <PersonRoundedIcon />
                  <Typography level="title-sm">Пользователи рабочей станции</Typography>
                </Link>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem nested sx={{ display: { xs: "none", sm: "initial" } }}>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <ConstructionIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Администратор</Typography>
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
                      to={RouteNames.USERS_LIST}
                      color="neutral"
                      underline="none"
                      sx={{ display: "flex", gap: 1 }}
                      onClick={() => closeSidebar()}
                    >
                      <Typography level="title-sm">Пользователи</Typography>
                    </Link>
                  </ListItemContent>
                </ListItem>
                <ListItem sx={{ mt: 0.5 }} role="none">
                  <ListItemContent>
                    <Link
                      component={RouterLink}
                      to={RouteNames.UI_PAGE}
                      color="neutral"
                      underline="none"
                      sx={{ display: "flex", gap: 1 }}
                      onClick={() => closeSidebar()}
                    >
                      <Typography level="title-sm">UI Page</Typography>
                    </Link>
                  </ListItemContent>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>
        </List>

        <List
          size="sm"
          sx={{
            display: { xs: "none", sm: "initial" },
            mt: "auto",
            flexGrow: 0,
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
            "--List-gap": "8px",
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemButton>
              <SettingsRoundedIcon />
              Настройки
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar
          variant="outlined"
          size="sm"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
        />
        <UserComponent {...store.AuthStore.user} />
        <IconButton size="sm" variant="plain" color="neutral" onClick={() => store.AuthStore.logout()}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
}

export default observer(SideBar);
