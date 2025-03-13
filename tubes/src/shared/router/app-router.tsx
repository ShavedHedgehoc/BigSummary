import { BrowserRouter, Route, Routes } from "react-router";

import MainPage from "../../modules/main-page/main-page";
import { RouteNames } from "./route-names";
import LayoutPage from "../../modules/layout-page/layout-page";
import Components from "../../modules/components/components";
import Checks from "../../modules/checks/checks";
import Report from "../../modules/report/report";

export default function AppRouter() {
  const router = (
    <BrowserRouter>
      <Routes>
        {/* <Route index element={<MainPage />} /> */}
        <Route path={RouteNames.HOME} element={<LayoutPage />}>
          <Route index element={<MainPage />} />
          <Route path={RouteNames.COMPONENTS} element={<Components />} />
          <Route path={RouteNames.CHECKS} element={<Checks />} />
          <Route path={RouteNames.REPORT} element={<Report />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
  return router;
}
