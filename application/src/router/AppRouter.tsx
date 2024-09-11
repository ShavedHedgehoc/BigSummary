import * as React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../main";
import { Routes, Navigate, Outlet, Route, BrowserRouter } from "react-router-dom";
import { RouteNames } from "./routeNames";
import { DbRoles } from "../dbRoles";
import Layout from "../components/Layout";
import CurrentSummary from "../components/CurrentSummary";
import Login from "../components/Login";
import Forbidden from "../components/Forbidden";
import SummaryDetail from "../components/SummaryDetail";
import SummaryUpload from "../components/SummaryUpload";
import SummaryList from "../components/SummaryList";
import Technologist from "../components/Technologist";
import Laboratory from "../components/Laboratory";

const AppRouter = () => {
  const { store } = React.useContext(Context);
  const ProtectedRoutes = () => {
    if (localStorage.getItem("accessToken")) {
      store.AuthStore.checkAuth();
    }
    if (!store.AuthStore.isAuth && !store.AuthStore.pending) {
      return <Navigate to={RouteNames.LOGIN} />;
    }
    return <Outlet />;
  };
  const ObservedProtectedRoutes = observer(ProtectedRoutes);

  interface RoleProtectedRoutesProps {
    role: string;
  }

  const RoleProtectedRoutes = (props: RoleProtectedRoutesProps) => {
    if (store.AuthStore.user?.roles) {
      if (store.AuthStore.user?.roles?.includes(props.role)) {
        return <Outlet />;
      }
      return <Navigate to={RouteNames.FORBIDDEN} />;
    }
  };

  const ObservedRoleProtectedRoutes = observer(RoleProtectedRoutes);

  const router = (
    <BrowserRouter>
      <Routes>
        <Route element={<ObservedProtectedRoutes />}>
          <Route path={RouteNames.HOME} element={<Layout />}>
            <Route index element={<CurrentSummary />} />
            <Route element={<ObservedRoleProtectedRoutes role={DbRoles.LABORATORY} />}>
              <Route path={RouteNames.LABORATORY} element={<Laboratory />} />
            </Route>
            <Route element={<ObservedRoleProtectedRoutes role={DbRoles.TECHNOLOGIST} />}>
              <Route path={RouteNames.TECHNOLOGIST} element={<Technologist />} />
            </Route>
            <Route element={<ObservedRoleProtectedRoutes role={DbRoles.PLANNER} />}>
              <Route path={RouteNames.SUMMARY_LIST} element={<SummaryList />} />
              <Route path={RouteNames.SUMMARY_UPLOAD} element={<SummaryUpload />} />
              <Route path={RouteNames.SUMMARY_DETAIL} element={<SummaryDetail />} />
            </Route>
            <Route path={RouteNames.FORBIDDEN} element={<Forbidden />} />
          </Route>
        </Route>

        <Route path={RouteNames.LOGIN} element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
  return router;
};
export default AppRouter;
