import { lazy } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { RouteNames } from "./route-names";
import RouteSuspense from "./route-suspense";
import { useHealthStore } from "./use-health-store";
import { useShallow } from "zustand/react/shallow";
import { useCheckHealth } from "../api/use-check-health";
import NotFound from "../components/not-found";
import { AppMessages } from "../resources/app-messages";

const Extrusion = lazy(() => import("../../modules/extrusion/extrusion"));

const AppRouter = () => {
  const isHealthy = useHealthStore(useShallow((state) => state.isHealthy));
  const init = useHealthStore(useShallow((state) => state.init));

  useCheckHealth();
  if (!isHealthy && init) return <NotFound message={AppMessages.SERVER_FALLDOWN} />;
  const router = (
    <BrowserRouter>
      <Routes>
        <Route path={RouteNames.EXTRUSION} element={<RouteSuspense children={<Extrusion />} />}></Route>
      </Routes>
    </BrowserRouter>
  );
  return router;
};
export default AppRouter;
