import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { visualizer } from "rollup-plugin-visualizer";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: ["**/*.bs.mjs"],
    }),
    // visualizer({ open: true }),
    nodePolyfills(),
  ],

  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE" && warning.message.includes(`"use client"`)) {
          return;
        }
        warn(warning);
      },
    },
  },

  preview: { port: 4000 },
  server: {
    host: true,
    port: 3000,
    proxy: {
      "/api_tubes": {
        target: "http://localhost:8000",
      },
      "/api": {
        target: "http://localhost:7000",
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
