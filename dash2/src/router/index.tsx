import { createBrowserRouter } from "react-router-dom";
import { RouteNames } from "../consts/routeNames";
import Page from "../components/page/Page";
import Detail from "../components/detail/Detail";
import Selector from "../components/selector/Selector";
import Login from "../components/login/Login";

const AppRouter = () => {
  const routes = [
    { path: RouteNames.HOME, element: <Selector /> },
    { path: RouteNames.PAGE, element: <Page /> },
    { path: RouteNames.DETAIL, element: <Detail /> },
    { path: RouteNames.LOGIN, element: <Login /> },
  ];

  return createBrowserRouter([...routes]);
};

export default AppRouter;
