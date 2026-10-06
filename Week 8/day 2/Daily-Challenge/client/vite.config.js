import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    include: /\.js$/,
    exclude: /node_modules/,
    loader: "jsx",
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
});
