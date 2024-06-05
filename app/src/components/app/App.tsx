/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import "@fontsource/roboto";
// import classes from "./app.module.css";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";
// import Login from "../login/Login";
// import Message from "../message/Message";

import { RouterProvider } from "react-router-dom";
import AppRouter from "../../router";

// import Header from "../ui/header/Header";

function App() {
  const { store } = React.useContext(Context);

  const router = AppRouter();

  React.useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      store.AuthStore.checkAuth();
    }
  }, []);

  // const [msgVisible, setMsgVisible] = React.useState(false);
  // const [msgSeverity, setMsgSeverity] = React.useState("fail");
  // const [msgText, setMsgText] = React.useState<string[]>([]);

  // const [isLogin, setIsLogin] = React.useState<boolean>(true);

  // const showMessage = (msg: string[], severity: string) => {
  //   setMsgVisible(true);
  //   setMsgText(msg);
  //   setMsgSeverity(severity);
  //   setTimeout(() => {
  //     setMsgVisible(false);
  //     setMsgText([]);
  //   }, 3000);
  // };
  // const headerProps = {
  //   name: store.AuthStore.user.name,
  //   logout: () => store.AuthStore.logout(),
  // };
  return (
    <div>
      {/* {!store.AuthStore.isAuth && !store.AuthStore.pending && (
        <Login
          showMessage={(msg, severity) => showMessage(msg, severity)}
          isLogin={isLogin}
          setIsLogin={(val) => setIsLogin(val)}
        />
      )}
      {store.AuthStore.isAuth && (
        <div className={classes.main_container}>
          <div className={classes.header}>
            <Header {...headerProps} />
          </div>
          <div className={classes.main_pane}>
            <RouterProvider router={router} />
          </div>
        </div>
      )} */}
      {/* <div className={classes.main_container}> */}
      <RouterProvider router={router} />
      {/* </div> */}

      {/* {msgVisible && <Message severity={msgSeverity} message={msgText} />} */}
    </div>
  );
}

export default observer(App);
