import { BrowserRouter, Route, Routes } from "react-router";
import { RouteNames } from "./route-names";
import RecordDetail from "../../modules/record/record-detail";
import Summary from "../../modules/summary/summary";

export default function AppRouter() {
  const router = (
    <BrowserRouter>
      <Routes>
        <Route index element={<Summary />} />
        <Route path={RouteNames.RECORD_DETAIL} element={<RecordDetail />} />
      </Routes>
    </BrowserRouter>
  );
  return router;
}
