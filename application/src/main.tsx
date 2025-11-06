import ReactDOM from "react-dom/client";
import { CssVarsProvider } from "@mui/joy/styles";
import { CssBaseline } from "@mui/joy";
import App from "./App.tsx";
import "@fontsource/inter";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SnackbarProvider } from "notistack";
import { additionalTheme } from "./shared/additional-theme.ts";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <CssVarsProvider theme={additionalTheme}>
      <CssBaseline />
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </CssVarsProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
