import * as React from "react";
import ReactDOM from "react-dom/client";
import { CssVarsProvider } from "@mui/joy/styles";
import { CssBaseline } from "@mui/joy";
import App from "./App.tsx";
import Store from "./store";
import "@fontsource/inter";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SnackbarProvider } from "notistack";
import { additionalTheme } from "./additional-theme.ts";

const queryClient = new QueryClient();

interface State {
  store: Store;
}

const store = new Store();
export const Context = React.createContext<State>({ store });

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <Context.Provider value={{ store }}>
      <CssVarsProvider theme={additionalTheme}>
        <CssBaseline />
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </CssVarsProvider>
    </Context.Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  // </React.StrictMode>
);
