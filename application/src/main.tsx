import * as React from "react";
import ReactDOM from "react-dom/client";
import { CssVarsProvider } from "@mui/joy/styles";
import { CssBaseline } from "@mui/joy";
import App from "./App.tsx";
import Store from "./store";
import "@fontsource/inter";

interface State {
  store: Store;
}

const store = new Store();
export const Context = React.createContext<State>({ store });

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Context.Provider value={{ store }}>
    <CssVarsProvider>
      <CssBaseline />
      <App />
    </CssVarsProvider>
  </Context.Provider>
  // </React.StrictMode>
);
