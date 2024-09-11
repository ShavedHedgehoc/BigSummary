// /* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography, Button, TextField } from "@mui/material";

function Login() {
  const [isLogin, setIsLogin] = React.useState(true);
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const { store } = React.useContext(Context);
  const navigate = useNavigate();

  interface LoginButtonProps {
    func(): void;
    msg: string;
  }

  const LoginButton = (props: LoginButtonProps) => {
    return (
      <Button
        sx={{ paddingTop: "10px", paddingBottom: "10px", fontSize: "1.2rem" }}
        variant="contained"
        fullWidth
        size="large"
        color="warning"
        onClick={() => props.func()}
      >
        {props.msg}
      </Button>
    );
  };

  const handleLogin = () => {
    store.AuthStore.login(email, password).then(() => {
      if (store.AuthStore.error.length) {
        console.log("fail");
      }
      if (store.AuthStore.isAuth) {
        navigate(-1);
      }
    });
  };

  const handleRegister = () => {
    store.AuthStore.register(name, email, password).then(() => {
      if (store.AuthStore.error.length) {
        console.log("fail");
        // props.showMessage(store.AuthStore.error, "fail");
      }
      if (store.AuthStore.isAuth) {
        navigate(-1);
      }
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px ",
      }}
    >
      <Grid direction={"column"} container gap={2} xs={11} lg={4} xl={2} md={4} h-full>
        <Grid item container justifyContent={"flex-start"} alignItems={"center"}>
          <Typography variant="h4">{isLogin ? "Вход" : "Регистрация"}</Typography>
        </Grid>
        {!isLogin && (
          <Grid item container justifyContent={"center"} alignItems={"center"}>
            <TextField
              fullWidth
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Никнэйм"
            />
          </Grid>
        )}
        <Grid item container justifyContent={"center"} alignItems={"center"}>
          <TextField
            fullWidth
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Электропочта"
          />
        </Grid>
        <Grid item container justifyContent={"center"} alignItems={"center"}>
          <TextField
            fullWidth
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Пароль"
          />
        </Grid>
        <Grid item container justifyContent={"center"} alignItems={"center"}>
          {isLogin && <LoginButton func={() => handleLogin()} msg={"Войти"} />}
          {!isLogin && <LoginButton func={() => handleRegister()} msg={"Зарегистрироваться"} />}
        </Grid>
        <Grid item container justifyContent={"flex-end"} alignItems={"center"} gap={1}>
          <Typography variant="overline">{isLogin ? "В первый раз? " : "Уже зарегистрирован? "}</Typography>
          <Typography variant="overline" color={"secondary"}>
            <span onClick={() => setIsLogin(!isLogin)} style={{ color: "info" }}>
              {isLogin ? "Зарегистрироваться" : "Войти"}
            </span>
          </Typography>
        </Grid>
      </Grid>
    </Box>
    // </div>
  );
}

export default observer(Login);
