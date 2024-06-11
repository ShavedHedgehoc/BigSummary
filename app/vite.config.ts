import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    // define: {
    //   BACKEND_URL: "http://api:7000"
    // }
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:7000",
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
  },
});
