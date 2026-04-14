import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/index.js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: ({ names }) => {
          const originalName = names?.[0] || "";

          if (originalName.endsWith(".css")) {
            return "assets/index.css";
          }

          if (originalName.endsWith(".avif")) {
            return "assets/[name][extname]";
          }

          return "assets/[name][extname]";
        }
      }
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true
      }
    }
  }
});
