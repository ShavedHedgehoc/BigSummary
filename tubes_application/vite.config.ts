import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
// import { visualizer } from "rollup-plugin-visualizer";
// import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    // visualizer({ open: true })
  ],
  server: {
    host: true,
    port: 3001,
    proxy: {
      "/api_tubes": {
        target: "http://localhost:8000",
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
