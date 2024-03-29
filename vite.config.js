import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import dns from "dns";

dns.setDefaultResultOrder("verbatim");

export default ({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()))

  return defineConfig({
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
    },
    build: {
      // ...
      define: {
        'import.meta.env': JSON.stringify(process.env),
      },
    }
  });
}

