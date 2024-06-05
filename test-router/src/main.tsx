import * as React from "react";
import * as ReactDOMClient from "react-dom/client";
import Store from "./store";
import App from "./App.tsx";
import "./styles/reset.css";
import "./styles/main.css";

interface State {
  store: Store;
}
const store = new Store();
export const Context = React.createContext<State>({ store });

ReactDOMClient.createRoot(document.getElementById("root")!).render(
  <Context.Provider value={{ store }}>
    <App />
  </Context.Provider>
);
