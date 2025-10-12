import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: ["**/*.bs.mjs"],
    }),
    nodePolyfills(),
  ],
  preview: { port: 4000 },
  server: {
    host: true,
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:7000",
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
