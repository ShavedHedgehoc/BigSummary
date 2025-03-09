import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/app.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </QueryClientProvider>
);
