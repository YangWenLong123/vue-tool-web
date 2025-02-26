/*
 * @Author: along
 * @Description:
 * @Date: 2025-02-21 11:18:20
 * @LastEditors: along
 * @LastEditTime: 2025-02-27 14:33:22
 * @FilePath: /vue-tool-web/vite.config.ts
 */
import path from "node:path";
import { defineConfig, loadEnv, splitVendorChunkPlugin } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import commpressPlugin from "vite-plugin-compression";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { lazyImport, VxeResolver } from "vite-plugin-lazy-import";
import eslintPlugin from "vite-plugin-eslint";

export default defineConfig(({ mode }) => {
  const config = loadEnv(mode, __dirname);

  return {
    base: "/",
    mode: "development",
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
        imports: ["vue", "pinia", "vue-router"],
        dts: "./auto-import.d.ts",
        eslintrc: {
          enabled: true,
          filepath: "./.eslintrc-auto-import.json",
          globalsPropValue: true,
        },
        resolvers: [AntDesignVueResolver()],
      }),
      Components({
        resolvers: [AntDesignVueResolver({ importStyle: "less" })],
      }),
      commpressPlugin({
        verbose: true,
        disable: false,
        deleteOriginFile: false,
        threshold: 1024,
        algorithm: "gzip",
        ext: ".gz",
      }),
      splitVendorChunkPlugin(),
      lazyImport({
        resolvers: [
          VxeResolver({
            libraryName: "vxe-table",
          }),
          VxeResolver({
            libraryName: "vxe-pc-ui",
          }),
        ],
      }),
      eslintPlugin({
        include: [
          "src/**/*.ts",
          "src/**/*.js",
          "src/**/**/*.vue",
          "src/**/**/**/*.vue",
          "src/**/**/**/**/*.vue",
          "src/*.ts",
          "src/*.vue",
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            hack: 'true; @import "@/assets/css/theme.less"',
          },
        },
        scss: {
          silenceDeprecations: ["legacy-js-api"],
        },
      },
    },
    server: {
      host: "0.0.0.0",
      port: config.VITE_APP_PORT,
      open: true,
      cors: true,
      warmup: {
        clientFiles: [
          "./src/layout/**/*.*",
          "./src/stores/**/*.*",
          "./src/router/**/*.*",
        ],
      },
    },
    build: {
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        },
      },
    },
    esbuild: {
      pure: ["console.log"],
      minify: true,
    },
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
        "@": path.resolve(__dirname, "./src"),
      },
      extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"],
    },
    define: {
      __APP_VERSION__: JSON.stringify("v1.0.0"),
    },
  };
});
