import * as React from "react";

import { createRoot } from "react-dom/client";
import { CssVarsProvider } from "@mui/joy/styles";
import { CssBaseline } from "@mui/joy";
import App from "./App.tsx";
import "@fontsource/inter";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssVarsProvider>
      <CssBaseline />
      <App />
    </CssVarsProvider>
  </React.StrictMode>
);
