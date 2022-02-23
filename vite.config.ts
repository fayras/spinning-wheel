import { fileURLToPath, URL } from "url";

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from "@vitejs/plugin-legacy";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/spinning-wheel/",
  plugins: [react(), tsconfigPaths(), legacy()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react"],
          "react-dom": ["react-dom"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@assets": fileURLToPath(new URL("./assets", import.meta.url)),
    },
  },
})
