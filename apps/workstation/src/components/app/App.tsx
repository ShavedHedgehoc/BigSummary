import * as React from "react";
import { Context } from "../../main";
import { useColorScheme } from "@mui/joy";
import { observer } from "mobx-react-lite";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FalldownComponent from "../falldownComponent/FalldownComponent";
import AppComponent from "../appComponent/AppComponent";

function App() {
  const { store } = React.useContext(Context);
  const { setMode } = useColorScheme();
  setMode("dark");

  if (store.HealthStore.serverFalldown) {
    return <FalldownComponent />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<AppComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default observer(App);
