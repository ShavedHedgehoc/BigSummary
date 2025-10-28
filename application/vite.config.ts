import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: ["**/*.bs.mjs"],
    }),
    visualizer({ open: true }),
    nodePolyfills(),
  ],

  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks(id) {
  //         // if (id.includes("node_modules")) {
  //         //   return "vendor"; // Split vendor libraries
  //         // }
  //         if (id.includes("src/components/")) {
  //           return "components"; // Split components into their own chunk
  //         }
  //       },
  //     },
  //   },
  // },

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
