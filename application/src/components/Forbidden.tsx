import { Typography } from "@mui/joy";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { Context } from "../main";
function Forbidden() {
  const { store } = React.useContext(Context);
  return (
    <React.Fragment>
      <Typography level="h2" component="h1">
        Forbidden
      </Typography>
      <Typography level="h2" component="h1">
        {store.AuthStore.user.name}
      </Typography>
      <div>{store.AuthStore.isAuth && !store.AuthStore.pending && <div>{store.AuthStore.user.name}</div>}</div>
      {store.AuthStore.user?.roles?.map((item) => (
        <div>{item}</div>
      ))}
    </React.Fragment>
  );
}

export default observer(Forbidden);
