// import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import dns from "dns";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    origin: "http://localhost:8080",
    port: 8080,
  },
  // devServer: {
  //   proxy: {
  //     "^/api": {
  //       target: "http://localhost:8000",
  //       changeOrigin: true,
  //     },
  //   },
  // // proxy: 'http://localhost:8001',
  // },
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/css/main.scss";`,
      },
    },
  },
  resolve: {
    alias: {
      // "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@": path.resolve(__dirname, "./src"),
    },
  } 
});
