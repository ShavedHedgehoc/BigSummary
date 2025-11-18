import { lazy } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { RouteNames } from "./route-names";
import RouteSuspense from "./route-suspense";
import { useHealthStore } from "./use-health-store";
import { useShallow } from "zustand/react/shallow";
import { useCheckHealth } from "../api/use-check-health";
import NotFound from "../components/not-found-full-screen";
import { AppMessages } from "../resources/app-messages";
import { ClientMessages } from "../resources/client-messages";
// import Test from "@/test";
// import Test2 from "@/modules/extrusion/test2";
// const Test2 = lazy(() => import("../../modules/extrusion/test2"));
const Extrusion = lazy(() => import("../../modules/extrusion/extrusion"));
const ExtrusionAddEntry = lazy(() => import("../../modules/extrusion/extrusion-add-entry"));
const Offset = lazy(() => import("../../modules/offset/offset"));

const AppRouter = () => {
  const isHealthy = useHealthStore(useShallow((state) => state.isHealthy));
  const init = useHealthStore(useShallow((state) => state.init));

  useCheckHealth();
  if (!isHealthy && init) return <NotFound message={AppMessages.SERVER_FALLDOWN} />;
  const router = (
    <BrowserRouter>
      <Routes>
        {/* <Route path={RouteNames.TEST} element={<RouteSuspense children={<Test2 />} />}></Route> */}

        <Route path={RouteNames.EXTRUSION} element={<RouteSuspense children={<Extrusion />} />}></Route>
        <Route
          path={RouteNames.EXTRUSION_ADD_ENTRY}
          element={<RouteSuspense children={<ExtrusionAddEntry />} />}
        ></Route>
        <Route path={RouteNames.OFFSET} element={<RouteSuspense children={<Offset />} />}></Route>
        <Route path={RouteNames.NOT_FOUND} element={<NotFound message={ClientMessages.ROUTE_NOT_FOUND} />} />
      </Routes>
    </BrowserRouter>
  );
  return router;
};
export default AppRouter;
