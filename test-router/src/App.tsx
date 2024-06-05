/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./router";
import { Context } from "./main";
import { observer } from "mobx-react-lite";

function App() {
  const { store } = React.useContext(Context);

  React.useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      store.AuthStore.checkAuth();
    }
  }, []);

  const router = AppRouter();
  return <RouterProvider router={router} />;
}

export default observer(App);
