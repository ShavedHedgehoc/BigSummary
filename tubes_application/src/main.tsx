import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "@/components/ui/provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "./theme";
import App from "./App.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <SnackbarProvider>
          <ChakraProvider value={system}>
            <App />
          </ChakraProvider>
        </SnackbarProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
