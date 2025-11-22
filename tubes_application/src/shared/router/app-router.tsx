import { lazy } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { RouteNames } from "./route-names";
import RouteSuspense from "./route-suspense";
import { useHealthStore } from "./use-health-store";
import { useShallow } from "zustand/react/shallow";
import { useCheckHealth } from "../api/use-check-health";
import NotFound from "../components/info/not-found-full-screen";
import { AppMessages } from "../resources/app-messages";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { Theme } from "@chakra-ui/react";
import Posts from "../../modules/posts/posts";

const Home = lazy(() => import("../../modules/home/home"));
const Post = lazy(() => import("../../modules/posts/posts"));
const Extrusion = lazy(() => import("../../modules/extrusion/extrusion"));
const ExtrusionAddEntry = lazy(() => import("../../modules/extrusion/extrusion-add-entry"));
const Varnish = lazy(() => import("../../modules/varnish/varnish"));
const VarnishAddEntry = lazy(() => import("../../modules/varnish/varnish-add-entry"));
const Offset = lazy(() => import("../../modules/offset/offset"));
const OffsetAddEntry = lazy(() => import("../../modules/offset/offset-add-entry"));
const Sealant = lazy(() => import("../../modules/sealant/sealant"));
const SealantAddEntry = lazy(() => import("../../modules/sealant/sealant-add-entry"));
const Pictures = lazy(() => import("../../modules/pictures/pictures"));

const AppRouter = () => {
  const isHealthy = useHealthStore(useShallow((state) => state.isHealthy));
  const init = useHealthStore(useShallow((state) => state.init));

  useCheckHealth();
  if (!isHealthy && init) return <NotFound message={AppMessages.SERVER_FALLDOWN} />;
  const router = (
    <ColorModeProvider forcedTheme="dark">
      <Theme appearance="dark" colorPalette="gray">
        <BrowserRouter>
          <Routes>
            <Route path={RouteNames.ROOT} element={<RouteSuspense children={<Home />} />} />
            <Route path={RouteNames.POSTS} element={<RouteSuspense children={<Posts />} />} />
            <Route path={RouteNames.EXTRUSION} element={<RouteSuspense children={<Extrusion />} />} />
            <Route path={RouteNames.EXTRUSION_ADD_ENTRY} element={<RouteSuspense children={<ExtrusionAddEntry />} />} />
            <Route path={RouteNames.VARNISH} element={<RouteSuspense children={<Varnish />} />}></Route>
            <Route
              path={RouteNames.VARNISH_ADD_ENTRY}
              element={<RouteSuspense children={<VarnishAddEntry />} />}
            ></Route>
            <Route path={RouteNames.OFFSET} element={<RouteSuspense children={<Offset />} />} />
            <Route path={RouteNames.OFFSET_ADD_ENTRY} element={<RouteSuspense children={<OffsetAddEntry />} />} />
            <Route path={RouteNames.SEALANT} element={<RouteSuspense children={<Sealant />} />} />
            <Route path={RouteNames.SEALANT_ADD_ENTRY} element={<RouteSuspense children={<SealantAddEntry />} />} />
            <Route path={RouteNames.PICTURES} element={<RouteSuspense children={<Pictures />} />}></Route>
            <Route path={RouteNames.NOT_FOUND} element={<NotFound message={AppMessages.ROUTE_NOT_FOUND} />} />
          </Routes>
        </BrowserRouter>
      </Theme>
    </ColorModeProvider>
  );
  return router;
};
export default AppRouter;
