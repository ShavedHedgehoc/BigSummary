import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App.tsx";
import "./styles/reset.css";

import Store from "./store";

interface State {
  store: Store;
}

const store = new Store();
export const Context = createContext<State>({ store });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Context.Provider value={{ store }}>
    <App />
  </Context.Provider>
);
