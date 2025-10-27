import * as React from "react";
import { Routes, Navigate, Outlet, Route, BrowserRouter } from "react-router-dom";
import { RouteNames } from "./route-names";
import { DbRoles } from "../db-roles";
import { useCheckAuth } from "../../modules/auth/use-check-auth";
import { useAuthStore } from "../../modules/auth/store/auth-store";

import Layout from "../layouts/layout";
import { useShallow } from "zustand/shallow";
// import Login from "../../modules/auth/login";

// import Users from "../../modules/users/users";
// import Products from "../../modules/records/records";
// import Boils from "../../modules/boils/boils";
// import Conveyors from "../../modules/conveyors/conveyors";
// import Foreman from "../../modules/foreman/foreman";
// import Dash from "../../modules/dash/dash";

// import Documents from "../../modules/documents/documents";
// import UiPage from "../../modules/ui-page/ui-page";
// import Employees from "../../modules/employees/employees";
// import DocumentDetail from "../../modules/document-detail/document-detail";
// import DocsUpload from "../../modules/docs-upload/docs-upload";
// import BasesUpload from "../../modules/bases-upload/bases-upload";
// import Forbidden from "../../modules/forbidden/forbidden";
// import Cans from "../../modules/cans/cans";
// import CansList from "../../modules/cans-list/cans-list";
// import CansDash from "../../modules/cans-dash/cans-dash";
// import BoilsReport from "../../modules/boils-report/boils-report";
// import TubeRecordsUpload from "../../modules/tube-records-upload/tube-records-upload";
// import TimeReport from "../../modules/time-report.tsx/time-report";
// import Inventories from "../../modules/inventories/inventories";
// import InventoryDetail from "../../modules/inventory-detail/inventory-detail";
// import Trademarks from "../../modules/trademarks/trademarks";
// import TraceBatchs from "../../modules/trace-batchs/trace-batchs";
// import TraceBatchDetail from "../../modules/trace-batch-detail/trace-batch-detail";
// import TraceBatchWghtReport from "../../modules/trace-batch-wght-report/trace-batch-wght-report";
// import TraceBatchWghtReportDetail from "../../modules/trace-batch-wght-report-detail/trace-batch-wght-report-detail";
// import TraceBatchWeightingsSummary from "../../modules/trace-batch-weightings-summary/trace-batch-weightings-summary";
// import TraceBatchWeightingsSummaryDetail from "../../modules/trace-weighting-summary-detail/trace-batch-weighting-summary-detail";
// import BoilsUpload from "../../modules/boils-upload/boils-upload";

// const Layout = React.lazy(() => import("../layouts/layout"));
const Login = React.lazy(() => import("../../modules/auth/login"));
const Users = React.lazy(() => import("../../modules/users/users"));
const Products = React.lazy(() => import("../../modules/records/records"));
const Boils = React.lazy(() => import("../../modules/boils/boils"));
const Conveyors = React.lazy(() => import("../../modules/conveyors/conveyors"));
const Foreman = React.lazy(() => import("../../modules/foreman/foreman"));
const Dash = React.lazy(() => import("../../modules/dash/dash"));
const Documents = React.lazy(() => import("../../modules/documents/documents"));
const UiPage = React.lazy(() => import("../../modules/ui-page/ui-page"));
const Employees = React.lazy(() => import("../../modules/employees/employees"));
const DocumentDetail = React.lazy(() => import("../../modules/document-detail/document-detail"));
const DocsUpload = React.lazy(() => import("../../modules/docs-upload/docs-upload"));
const BasesUpload = React.lazy(() => import("../../modules/bases-upload/bases-upload"));
const Forbidden = React.lazy(() => import("../../modules/forbidden/forbidden"));
const Cans = React.lazy(() => import("../../modules/cans/cans"));
const CansList = React.lazy(() => import("../../modules/cans-list/cans-list"));
const CansDash = React.lazy(() => import("../../modules/cans-dash/cans-dash"));
const BoilsReport = React.lazy(() => import("../../modules/boils-report/boils-report"));
const TubeRecordsUpload = React.lazy(() => import("../../modules/tube-records-upload/tube-records-upload"));
const TimeReport = React.lazy(() => import("../../modules/time-report.tsx/time-report"));
const Inventories = React.lazy(() => import("../../modules/inventories/inventories"));
const InventoryDetail = React.lazy(() => import("../../modules/inventory-detail/inventory-detail"));
const Trademarks = React.lazy(() => import("../../modules/trademarks/trademarks"));
const TraceBatchs = React.lazy(() => import("../../modules/trace-batchs/trace-batchs"));
const TraceBatchDetail = React.lazy(() => import("../../modules/trace-batch-detail/trace-batch-detail"));
const TraceBatchWghtReport = React.lazy(() => import("../../modules/trace-batch-wght-report/trace-batch-wght-report"));
const TraceBatchWghtReportDetail = React.lazy(
  () => import("../../modules/trace-batch-wght-report-detail/trace-batch-wght-report-detail")
);
const TraceBatchWeightingsSummary = React.lazy(
  () => import("../../modules/trace-batch-weightings-summary/trace-batch-weightings-summary")
);
const TraceBatchWeightingsSummaryDetail = React.lazy(
  () => import("../../modules/trace-weighting-summary-detail/trace-batch-weighting-summary-detail")
);
const BoilsUpload = React.lazy(() => import("../../modules/boils-upload/boils-upload"));

export default function AppRouter() {
  const { checkAuth, isCheckPending } = useCheckAuth();

  // const { isAuth, user } = useAuthStore();

  const isAuth = useAuthStore(useShallow((state) => state.isAuth));
  const user = useAuthStore(useShallow((state) => state.user));
  const accessToken = localStorage.getItem("accessToken");
  const ProtectedRoutes = () => {
    // const accessToken = localStorage.getItem("accessToken");
    if (accessToken && !isAuth && !isCheckPending) checkAuth();
    if (!accessToken) return <Navigate to={RouteNames.LOGIN} />;
    return <Outlet />;
  };

  interface RoleProtectedRoutesProps {
    role: string;
  }

  const RoleProtectedRoutes = (props: RoleProtectedRoutesProps) => {
    if (accessToken && isAuth && !isCheckPending && !user) checkAuth();
    if (user?.roles && user?.roles?.includes(props.role)) return <Outlet />;
    return <Navigate to={RouteNames.FORBIDDEN} />;
  };

  const router = (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path={RouteNames.HOME} element={<Layout />}>
            <Route index element={<Dash />} />
            <Route element={<RoleProtectedRoutes role={DbRoles.LABORATORY} />}>
              <Route path={RouteNames.BOILS_LIST} element={<Boils />} />
              <Route path={RouteNames.LABORATORY} element={<Products />} />
            </Route>
            <Route element={<RoleProtectedRoutes role={DbRoles.EMPLOYERS} />}>
              <Route path={RouteNames.EMPLOYERS} element={<Employees />} />
            </Route>
            <Route element={<RoleProtectedRoutes role={DbRoles.FOREMAN} />}>
              <Route path={RouteNames.FOREMAN} element={<Foreman />} />
            </Route>
            <Route element={<RoleProtectedRoutes role={DbRoles.PLANNER} />}>
              <Route path={RouteNames.DOCUMENTS} element={<Documents />} />
              <Route path={RouteNames.SUMMARY_UPLOAD} element={<DocsUpload />} />
              <Route path={RouteNames.TUBE_RECORDS_UPLOAD} element={<TubeRecordsUpload />} />
              <Route path={RouteNames.SUMMARY_DETAIL} element={<DocumentDetail />} />
              <Route path={RouteNames.CONVEYORS} element={<Conveyors />} />
              <Route path={RouteNames.BASES_UPDATE} element={<BasesUpload />} />
            </Route>
            <Route element={<RoleProtectedRoutes role={DbRoles.REPORTS} />}>
              <Route path={RouteNames.BOILS_REPORT} element={<BoilsReport />} />
              <Route path={RouteNames.TIME_REPORT} element={<TimeReport />} />
            </Route>
            <Route element={<RoleProtectedRoutes role={DbRoles.ADMIN} />}>
              <Route path={RouteNames.USERS_LIST} element={<Users />} />
              <Route path={RouteNames.UI_PAGE} element={<UiPage />} />
            </Route>
            <Route element={<RoleProtectedRoutes role={DbRoles.TECHNOLOGIST} />}>
              <Route path={RouteNames.CANS_DASH} element={<Cans />} />
              <Route path={RouteNames.CANS_LIST} element={<CansList />} />
              <Route path={RouteNames.CANS_LOCATION} element={<CansDash />} />
            </Route>
            <Route element={<RoleProtectedRoutes role={DbRoles.WEIGHER} />}>
              <Route path={RouteNames.INVENTORIES} element={<Inventories />} />
              <Route path={RouteNames.INVENTORY_DETAIL} element={<InventoryDetail />} />
              <Route path={RouteNames.TRACE_WGHT_REPORT} element={<TraceBatchWghtReport />} />
              <Route path={RouteNames.TRACE_WGHT_REPORT_DETAIL} element={<TraceBatchWghtReportDetail />} />
              <Route path={RouteNames.TRACE_WGHT_SUMMARY} element={<TraceBatchWeightingsSummary />} />
              <Route path={RouteNames.TRACE_WGHT_SUMMARY_DETAIL} element={<TraceBatchWeightingsSummaryDetail />} />
              <Route element={<RoleProtectedRoutes role={DbRoles.WGHT_GODMODE} />}>
                <Route path={RouteNames.TRACE_UPLOAD_BOILS} element={<BoilsUpload />} />
              </Route>
            </Route>
            <Route element={<RoleProtectedRoutes role={DbRoles.TRACE} />}>
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
}
