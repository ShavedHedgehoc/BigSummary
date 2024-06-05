import * as React from "react";
import { RouteNames } from "../consts/routeNames";
import { Navigate, Outlet, createBrowserRouter, redirect } from "react-router-dom";
// import { Context } from "../main";
import { DbRoles } from "../consts/dbRoles";

// import Layout from "../components/ui/layout/Layout";
// import SideNavLayout from "../components/sideNavLayout/SideNavLayout";
// import Forbidden from "../components/pages/forbidden/Forbidden";
import { Context } from "../main";
import Admin from "../components/pages/admin/Admin";
import Users from "../components/pages/admin/Users";
import AdminMain from "../components/pages/admin/AdminMain";
// import LoginNew from "../components/login/LoginNew";
import Login from "../components/login/Login";
import Layout from "../components/ui/layout/Layout";
import Forbidden from "../components/pages/forbidden/Forbidden";
import Laboratory from "../components/pages/laboratory/Laboratory";
import Technologist from "../components/pages/technologist/Technologist";
import Planner from "../components/pages/planner/Planner";
import PlannerMain from "../components/pages/planner/PlannerMain";
import SummaryUpload from "../components/pages/planner/SummaryUpload";
import Report from "../components/pages/report/Report";
import ReportMain from "../components/pages/report/ReportMain";
import ReportOne from "../components/pages/report/ReportOne";
// import Laboratory from "../components/pages/laboratory/laboratory";
// import NotFound from "../components/pages/notFound/NotFound";
// import Login from "../components/login/Login";

const AppRouter = () => {
  const Home = React.lazy(() => import("../components/pages/home/Home"));

  //   const Summary = React.lazy(() => import("../components/Summary/Summary"));
  //   const Upload = React.lazy(() => import("../components/Upload/Upload"));
  //   const User = React.lazy(() => import("../components/User/User"));
  //   const Forbidden = React.lazy(() => import("../components/Forbidden/Forbidden"));

  const { store } = React.useContext(Context);

  const AuthentificatedRoute = () => {
    if (!store.AuthStore.isAuth && !store.AuthStore.pending) {
      return <Navigate to="/" />;
    }
    return <Outlet />;
  };

  const routesForNotAuthenticatedOnly = [{ path: "/", element: <Login /> }];

  const adminLoader = () => {
    const userRoles = store.AuthStore.user.roles;
    if (userRoles && userRoles.indexOf(DbRoles.ADMIN) === -1 && store.AuthStore.isAuth) {
      return redirect(RouteNames.FORBIDDEN);
    }
    return null;
  };
  const laboratoryLoader = () => {
    const userRoles = store.AuthStore.user.roles;
    if (userRoles && userRoles.indexOf(DbRoles.LABORATORY) === -1 && store.AuthStore.isAuth) {
      return redirect(RouteNames.FORBIDDEN);
    }
    return null;
  };

  const technologistLoader = () => {
    const userRoles = store.AuthStore.user.roles;
    if (userRoles && userRoles.indexOf(DbRoles.TECHNOLOGIST) === -1 && store.AuthStore.isAuth) {
      return redirect(RouteNames.FORBIDDEN);
    }
    return null;
  };

  const plannerLoader = () => {
    const userRoles = store.AuthStore.user.roles;
    if (userRoles && userRoles.indexOf(DbRoles.PLANNER) === -1 && store.AuthStore.isAuth) {
      return redirect(RouteNames.FORBIDDEN);
    }
    return null;
  };

  const reportLoader = () => {
    const userRoles = store.AuthStore.user.roles;
    if (userRoles && userRoles.indexOf(DbRoles.REPORTS) === -1 && store.AuthStore.isAuth) {
      return redirect(RouteNames.FORBIDDEN);
    }
    return null;
  };

  const routes = [
    {
      path: "/",
      element: <AuthentificatedRoute />,
      children: [
        {
          element: <Layout />,
          children: [
            { path: RouteNames.HOME, element: <Home /> },
            { path: RouteNames.FORBIDDEN, element: <Forbidden /> },
            { loader: () => laboratoryLoader(), children: [{ path: RouteNames.LABORATORY, element: <Laboratory /> }] },
            {
              loader: () => technologistLoader(),
              children: [{ path: RouteNames.TECHNOLOGIST, element: <Technologist /> }],
            },
            {
              element: <Admin />,
              loader: () => adminLoader(),
              children: [
                { path: RouteNames.ADMIN, element: <AdminMain /> },
                { path: RouteNames.USERS, element: <Users /> },
              ],
            },
            {
              element: <Planner />,
              loader: () => plannerLoader(),
              children: [
                { path: RouteNames.PLANNER, element: <PlannerMain /> },
                { path: RouteNames.SUMMARY_UPLOAD, element: <SummaryUpload /> },
              ],
            },
            {
              element: <Report />,
              loader: () => reportLoader(),
              children: [
                { path: RouteNames.REPORTS, element: <ReportMain /> },
                { path: RouteNames.REPORT1, element: <ReportOne /> },
              ],
            },
          ],
        },
      ],
    },
  ];

  return createBrowserRouter([
    ...(!store.AuthStore.isAuth && !store.AuthStore.pending ? routesForNotAuthenticatedOnly : []),
    ...routes,
  ]);
};

export default AppRouter;
