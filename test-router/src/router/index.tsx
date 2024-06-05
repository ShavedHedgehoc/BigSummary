import * as React from "react";

import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import Login from "../components/login/Login";
import { Context } from "../main";

function AppRouter() {
  const { store } = React.useContext(Context);

  const AuthentificateddRoute = () => {
    if (!store.AuthStore.isAuth && !store.AuthStore.pending) {
      return <Navigate to="/" />;
    }
    return <Outlet />;
  };

  const routesForNotAuthenticatedOnly = [{ path: "/", element: <Login /> }];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,

      children: [
        {
          path: "/",
          element: <div>User Home Page</div>,
        },
        {
          path: "/profile",
          element: <div>User Profile</div>,
        },
        {
          path: "/logout",
          element: <div>Logout</div>,
        },
      ],
    },
  ];

  return createBrowserRouter([
    ...(!store.AuthStore.isAuth && !store.AuthStore.pending ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
    // {
    //   element: <Layout />,
    //   loader: () => adminLoader(),
    //   children: adminRoutes,
    // },
    // // {
    // //   element: <Layout />,
    // //   loader: () => protectedLoader(),
    // //   children: protectedRoutes,
    // // },
    // {
    //   element: <Layout />,
    //   children: routes,
    // },
  ]);
}

// eslint-disable-next-line react-refresh/only-export-components
export default AppRouter;
