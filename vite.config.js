import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import pluginReact from "@vitejs/plugin-react";

const viteConfig = defineConfig({
  base: "/",
  server: {
    host: "localhost",
    port: 3000,
  },
  plugins: [
    pluginReact({
      jsxRuntime: "automatic",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", // 최신 api(modern-compiler) 사용
        modules: {
          scopeBehaviour: "local", // 각 컴포넌트에서만 사용할 수 있도록 설정
        },
      },
    },
  },
});

export default viteConfig;
