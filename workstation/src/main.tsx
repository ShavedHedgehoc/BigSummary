import * as React from "react";
import ReactDOM from "react-dom/client";
import { CssVarsProvider } from "@mui/joy/styles";
import { CssBaseline } from "@mui/joy";
import App from "./components/app/App.tsx";
import "./styles/reset.css";
import "./styles/main.css";

import Store from "./store";

interface State {
  store: Store;
}
const store = new Store();
export const Context = React.createContext<State>({ store });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Context.Provider value={{ store }}>
    <CssVarsProvider>
      <CssBaseline />
      <App />
    </CssVarsProvider>
  </Context.Provider>
);
