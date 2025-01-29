import * as React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../main";
import { Routes, Navigate, Outlet, Route, BrowserRouter } from "react-router-dom";
import { RouteNames } from "./routeNames";
import { DbRoles } from "../../dbRoles";
import Layout from "../../components/common/Layout";

import Login from "../../components/pages/Login";
import Forbidden from "../../components/pages/Forbidden";
// import SummaryUpload from "../../components/pages/SummaryUpload";
import RecordDetail from "../../components/pages/RecordDetail";
import BoilsReport from "../../components/pages/BoilReport";
import Users from "../../modules/users/users";
import Products from "../../modules/records/records";
import Boils from "../../modules/boils/boils";
import Conveyors from "../../modules/conveyors/conveyors";
import Foreman from "../../modules/foreman/foreman";
import Dash from "../../modules/dash/dash";
import UpdateBases from "../../modules/bases/update-bases";
import Documents from "../../modules/documents/documents";
import UiPage from "../../modules/ui-page/ui-page";
import Employees from "../../modules/employees/employees";
import DocumentDetail from "../../modules/document-detail/document-detail";
import DocsUpload from "../../modules/docs-upload/docs-upload";

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
            <Route index element={<Dash />} />
            <Route path={RouteNames.BOILS_REPORT} element={<BoilsReport />} />
            <Route element={<ObservedRoleProtectedRoutes role={DbRoles.LABORATORY} />}>
              <Route path={RouteNames.BOILS_LIST} element={<Boils />} />
              <Route path={RouteNames.LABORATORY} element={<Products />} />
            </Route>
            <Route element={<ObservedRoleProtectedRoutes role={DbRoles.EMPLOYERS} />}>
              <Route path={RouteNames.EMPLOYERS} element={<Employees />} />
            </Route>
            <Route element={<ObservedRoleProtectedRoutes role={DbRoles.FOREMAN} />}>
              <Route path={RouteNames.FOREMAN} element={<Foreman />} />
            </Route>
            <Route element={<ObservedRoleProtectedRoutes role={DbRoles.PLANNER} />}>
              <Route path={RouteNames.DOCUMENTS} element={<Documents />} />
              {/* <Route path={RouteNames.SUMMARY_UPLOAD} element={<SummaryUpload />} /> */}
              <Route path={RouteNames.SUMMARY_UPLOAD} element={<DocsUpload />} />
              <Route path={RouteNames.SUMMARY_DETAIL} element={<DocumentDetail />} />
              <Route path={RouteNames.RECORD_DETAIL} element={<RecordDetail />} />
              <Route path={RouteNames.CONVEYORS} element={<Conveyors />} />
              <Route path={RouteNames.BASES_UPDATE} element={<UpdateBases />} />
            </Route>
            <Route element={<ObservedRoleProtectedRoutes role={DbRoles.ADMIN} />}>
              <Route path={RouteNames.USERS_LIST} element={<Users />} />
              <Route path={RouteNames.UI_PAGE} element={<UiPage />} />
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
