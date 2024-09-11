import * as React from "react";
import { observer } from "mobx-react-lite";
import { RouterProvider } from "react-router-dom";
import AppRouter from "../../router";

import { Box } from "@mui/material";
import { Context } from "../../main";

function App() {
  const router = AppRouter();
  const { store } = React.useContext(Context);

  React.useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      store.AuthStore.checkAuth();
    }
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      
      <RouterProvider router={router} />
    </Box>
  );
}

export default observer(App);
