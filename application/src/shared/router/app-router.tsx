import * as React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../main";
import { Routes, Navigate, Outlet, Route, BrowserRouter } from "react-router-dom";
import { RouteNames } from "./route-names";
import { DbRoles } from "../db-roles";
import Layout from "../layouts/layout";
import Login from "../../modules/login/login";
// import SummaryUpload from "../../components/pages/SummaryUpload";
// import RecordDetail from "../../components/pages/RecordDetail";

import Users from "../../modules/users/users";
import Products from "../../modules/records/records";
import Boils from "../../modules/boils/boils";
import Conveyors from "../../modules/conveyors/conveyors";
import Foreman from "../../modules/foreman/foreman";
import Dash from "../../modules/dash/dash";
// import UpdateBases from "../../modules/bases/update-bases";
import Documents from "../../modules/documents/documents";
import UiPage from "../../modules/ui-page/ui-page";
import Employees from "../../modules/employees/employees";
import DocumentDetail from "../../modules/document-detail/document-detail";
import DocsUpload from "../../modules/docs-upload/docs-upload";
import BasesUpload from "../../modules/bases-upload/bases-upload";
import Forbidden from "../../modules/forbidden/forbidden";
import Cans from "../../modules/cans/cans";
import CansList from "../../modules/cans-list/cans-list";
import CansDash from "../../modules/cans-dash/cans-dash";
import BoilsReport from "../../modules/boils-report/boils-report";
import TubeRecordsUpload from "../../modules/tube-records-upload/tube-records-upload";
import TimeReport from "../../modules/time-report.tsx/time-report";
import Inventories from "../../modules/inventories/inventories";
import InventoryDetail from "../../modules/inventory-detail/inventory-detail";
import Trademarks from "../../modules/trademarks/trademarks";
import TraceBatchs from "../../modules/trace-batchs/trace-batchs";
import TraceBatchDetail from "../../modules/trace-batch-detail/trace-batch-detail";
import TraceBatchWghtReport from "../../modules/trace-batch-wght-report/trace-batch-wght-report";
import TraceBatchWghtReportDetail from "../../modules/trace-batch-wght-report-detail/trace-batch-wght-report-detail";
// import RegulationsUpsert from "../../modules/regulations-upsert/regulations-upsert";

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
              <Route path={RouteNames.SUMMARY_UPLOAD} element={<DocsUpload />} />
              <Route path={RouteNames.TUBE_RECORDS_UPLOAD} element={<TubeRecordsUpload />} />
              <Route path={RouteNames.SUMMARY_DETAIL} element={<DocumentDetail />} />
              <Route path={RouteNames.CONVEYORS} element={<Conveyors />} />
              <Route path={RouteNames.BASES_UPDATE} element={<BasesUpload />} />
            </Route>
            <Route element={<ObservedRoleProtectedRoutes role={DbRoles.REPORTS} />}>
              <Route path={RouteNames.BOILS_REPORT} element={<BoilsReport />} />
              <Route path={RouteNames.TIME_REPORT} element={<TimeReport />} />
            </Route>
            <Route element={<ObservedRoleProtectedRoutes role={DbRoles.ADMIN} />}>
              <Route path={RouteNames.USERS_LIST} element={<Users />} />
              <Route path={RouteNames.UI_PAGE} element={<UiPage />} />
            </Route>
            <Route element={<ObservedRoleProtectedRoutes role={DbRoles.TECHNOLOGIST} />}>
              <Route path={RouteNames.CANS_DASH} element={<Cans />} />
              <Route path={RouteNames.CANS_LIST} element={<CansList />} />
              <Route path={RouteNames.CANS_LOCATION} element={<CansDash />} />
            </Route>
            <Route element={<ObservedRoleProtectedRoutes role={DbRoles.WEIGHER} />}>
              <Route path={RouteNames.INVENTORIES} element={<Inventories />} />
              <Route path={RouteNames.INVENTORY_DETAIL} element={<InventoryDetail />} />
              <Route path={RouteNames.TRACE_WGHT_REPORT} element={<TraceBatchWghtReport />} />
              <Route path={RouteNames.TRACE_WGHT_REPORT_DETAIL} element={<TraceBatchWghtReportDetail />} />
            </Route>
            <Route element={<ObservedRoleProtectedRoutes role={DbRoles.TRACE} />}>
              <Route path={RouteNames.TRACE_TRADEMARKS} element={<Trademarks />} />
              <Route path={RouteNames.TRACE_BATCHS} element={<TraceBatchs />} />
              <Route path={RouteNames.TRACE_BATCH_DETAIL} element={<TraceBatchDetail />} />
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
