import { BrowserRouter, Route, Routes } from "react-router";
import { RouteNames } from "./route-names";
import Record from "../../modules/record/record";
import Summary from "../../modules/summary/summary";
import AppSummary from "../../modules/app-summary/app-summary";
// import Apparatus from "../../modules/apparatus/apparatus";
// import ApparatusStates from "../../modules/apparatus/apparatus-states";
import Cans from "../../modules/cans/cans";

export default function AppRouter() {
  const router = (
    <BrowserRouter>
      <Routes>
        <Route index element={<Summary />} />
        <Route path={RouteNames.RECORD_DETAIL} element={<Record />} />
        <Route path={RouteNames.APP_SUMMARY} element={<AppSummary />} />
        <Route path={RouteNames.CANS} element={<Cans />} />
        {/* <Route path={RouteNames.APPARATUS_DETAIL} element={<Apparatus />} />
        <Route path={RouteNames.APPARATUS_STATE_DETAIL} element={<ApparatusStates />} /> */}
      </Routes>
    </BrowserRouter>
  );
  return router;
}
