import * as React from "react";
// import { Navigate, Outlet, createBrowserRouter, redirect } from "react-router-dom";
import { Navigate, Outlet, createBrowserRouter, redirect } from "react-router-dom";
// import { Context } from "../main";
import { RouteNames } from "./routeNames";
import { DbRoles } from "../dbRoles";

import CurrentSummary from "../components/CurrentSummary";
// import SummaryUpload from "../components/SummaryUpload";
// import Login from "../components/Login";
import Layout from "../components/Layout";
// import SummaryList from "../components/SummaryList";
// import { observer } from "mobx-react-lite";
import { Context } from "../main";
import Login from "../components/Login";
// import SideBar from "../components/SideBar";

const AppRouter = () => {
  const { store } = React.useContext(Context);

  const AuthentificatedRoute = () => {
    console.log("render authroutes");
    if (!store.AuthStore.isAuth) {
      console.log("redirect");
      return <Navigate to="/" />;
    }
    return <Layout />;
  };

  const routesForNotAuthenticatedOnly = [{ path: "/", element: <Login /> }];

  // const adminLoader = () => {
  //   const userRoles = store.AuthStore.user.roles;
  //   if (userRoles && userRoles.indexOf(DbRoles.ADMIN) === -1 && store.AuthStore.isAuth) {
  //     return redirect(RouteNames.FORBIDDEN);
  //   }
  //   return null;
  // };
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

  // const plannerLoader = () => {
  //   const userRoles = store.AuthStore.user.roles;
  //   if (userRoles && userRoles.indexOf(DbRoles.PLANNER) === -1 && store.AuthStore.isAuth) {
  //     return redirect(RouteNames.FORBIDDEN);
  //   }
  //   return null;
  // };

  // const reportLoader = () => {
  //   const userRoles = store.AuthStore.user.roles;
  //   if (userRoles && userRoles.indexOf(DbRoles.REPORTS) === -1 && store.AuthStore.isAuth) {
  //     return redirect(RouteNames.FORBIDDEN);
  //   }
  //   return null;
  // };

  const routes = [
    {
      path: "/",
      element: <AuthentificatedRoute />,
      children: [
        {
          // element: <Layout />,
          element: <Outlet />,
          children: [
            { path: RouteNames.HOME, element: <CurrentSummary role={"user"} /> },
            // { path: RouteNames.FORBIDDEN, element: <Forbidden /> },
            {
              loader: () => laboratoryLoader(),
              children: [{ path: RouteNames.LABORATORY, element: <CurrentSummary role={"laboratory"} /> }],
            },
            {
              loader: () => technologistLoader(),
              children: [{ path: RouteNames.TECHNOLOGIST, element: <CurrentSummary role={"technologist"} /> }],
            },
          ],
        },
      ],
    },

    // {
    //   element: <CommonRoute />,
    //   children: [
    //     { path: RouteNames.HOME, element: <CurrentSummary role={"user"} /> },
    //     // { path: RouteNames.FORBIDDEN, element: <Forbidden /> },
    //     {
    //       loader: () => laboratoryLoader(),
    //       children: [{ path: RouteNames.LABORATORY, element: <CurrentSummary role={"laboratory"} /> }],
    //     },
    //     {
    //       loader: () => technologistLoader(),
    //       children: [{ path: RouteNames.TECHNOLOGIST, element: <CurrentSummary role={"technologist"} /> }],
    //     },
    //   ],
    // },
    // {
    //   path: "/",
    //   // element: <Layout />,
    //   children: [
    //     { path: RouteNames.HOME, element: <CurrentSummary role={"user"} /> },
    //     // { path: RouteNames.FORBIDDEN, element: <Forbidden /> },
    //     {
    //       loader: () => laboratoryLoader(),
    //       children: [{ path: RouteNames.LABORATORY, element: <CurrentSummary role={"laboratory"} /> }],
    //     },
    //     {
    //       loader: () => technologistLoader(),
    //       children: [{ path: RouteNames.TECHNOLOGIST, element: <CurrentSummary role={"technologist"} /> }],
    //     },
    //   ],
    //   //   },
    //   // ],
    // },
  ];

  return createBrowserRouter([
    ...(!store.AuthStore.isAuth && !store.AuthStore.pending ? routesForNotAuthenticatedOnly : []),
    ...routes,
  ]);
};

export default AppRouter;
