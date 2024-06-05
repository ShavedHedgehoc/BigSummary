/* eslint-disable react-refresh/only-export-components */
import * as React from "react";

import classes from "./login.module.css";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";

function LoginNew() {
  //   const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const { store } = React.useContext(Context);

  const handleLogin = () => {
    store.AuthStore.login(email, password).then(() => {
      if (store.AuthStore.error.length) {
        console.log("fail");
      }
    });
  };

  //   const handleRegister = () => {
  //     store.AuthStore.register(name, email, password).then(() => {
  //       if (store.AuthStore.error.length) {
  //         // props.showMessage(store.AuthStore.error, "fail");
  //       }
  //     });
  //   };

  return (
    <div>
      <div className={classes.login_container}>
        {/* <div className={classes.login_header}>{props.isLogin ? "Вход" : "Регистрация"}</div> */}
        <div className={classes.login_header}>"Вход"</div>
        <div className={classes.login_form}>
          {/* {!props.isLogin && (
            <input
              type="text"
              className={classes.login_input}
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Никнэйм"
            />
          )} */}
          <input
            type="text"
            className={classes.login_input}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Электропочта"
          />
          <input
            type="password"
            className={classes.login_input}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Пароль"
          />
          {/* {props.isLogin && ( */}
          <button className={classes.login_button} onClick={() => handleLogin()}>
            Войти
          </button>
          {/* )} */}

          {/* {!props.isLogin && (
            <button className={classes.login_button} onClick={() => handleRegister()}>
              Зарегистрироваться
            </button>
          )} */}
          {/* <div className={classes.login_selector}>
            {props.isLogin ? "В первый раз? " : "Уже зарегистрирован? "}
            <span className={classes.login_selector_span} onClick={() => props.setIsLogin(!props.isLogin)}>
              {props.isLogin ? "Зарегистрироваться" : "Войти"}
            </span>
          </div> */}
        </div>

        <div className={classes.login_copyright}>Йож 2024</div>
      </div>
    </div>
  );
}

export default observer(LoginNew);
