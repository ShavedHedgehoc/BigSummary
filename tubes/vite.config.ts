import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    host: true,
    port: 5000,
    proxy: {
      "/api2": {
        target: "http://localhost:8000",
      },
      "/api": {
        target: "http://localhost:7000",
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
