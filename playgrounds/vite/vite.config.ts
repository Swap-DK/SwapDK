import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/SwapDK",

  build: {
    commonjsOptions: { transformMixedEsModules: true },
    reportCompressedSize: true,
    rollupOptions: { plugins: [nodePolyfills()] },
    sourcemap: true,
    target: "es2022",
  },

  // NOTE: Have to be added to fix: Uncaught ReferenceError: process & global is not defined
  define: { global: "globalThis", "process.browser": true, "process.env": {} },

  esbuild: { logOverride: { "this-is-undefined-in-esm": "silent" }, target: "es2022" },
  optimizeDeps: {
    esbuildOptions: {
      // NOTE: Have to be added to fix: Uncaught ReferenceError: global is not defined
      define: { global: "globalThis" },
    },
    exclude: ["libsodium-wrappers-sumo", "libsodium"],
  },
  plugins: [
    nodePolyfills({
      // Whether to polyfill specific globals.
      globals: {
        Buffer: true, // can also be 'build', 'dev', or false
        global: true,
        process: true,
      },
    }),
    react(),
    wasm(),
    topLevelAwait(),
  ].concat(
    process.env.VISUALISE === "true"
      ? [visualizer({ filename: "dist/stats.html", gzipSize: true, open: true, sourcemap: true })]
      : [],
  ),
  resolve: {
    alias: {
      "./libsodium-sumo.mjs": "identity-obj-proxy",
      "@swapdk/core": resolve("../../packages/core/src"),
      "@swapdk/helpers": resolve("../../packages/helpers/src"),
      "@swapdk/plugins": resolve("../../packages/plugins/src"),
      "@swapdk/sdk": resolve("../../packages/sdk/src"),
      "@swapdk/toolboxes": resolve("../../packages/toolboxes/src"),
      "@swapdk/wallet-core": resolve("../../packages/wallet-core/src"),
      "@swapdk/wallet-hardware": resolve("../../packages/wallet-hardware/src"),
      "@swapdk/wallet-hardware/ledger": resolve("../../packages/wallet-hardware/src/ledger"),
      "@swapdk/wallets": resolve("../../packages/wallets/src"),

      crypto: "crypto-browserify",
      http: "stream-http",
      https: "https-browserify",
      os: "os-browserify/browser",
      path: "path-browserify",
      stream: "stream-browserify",
    },
  },
  server: { port: 3000 },
});
