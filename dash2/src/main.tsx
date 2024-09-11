import * as React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App.tsx";
import "./init.css";
// import "bootstrap/dist/css/bootstrap.min.css";

import Store from "./store";
import { CssBaseline } from "@mui/material";

interface State {
  store: Store;
}

const store = new Store();
export const Context = React.createContext<State>({ store });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Context.Provider value={{ store }}>
    <CssBaseline />
    <App />
  </Context.Provider>
);
