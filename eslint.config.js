/*
 * @Author: along
 * @Description:
 * @Date: 2025-02-21 14:41:17
 * @LastEditors: along
 * @LastEditTime: 2025-02-27 14:36:13
 * @FilePath: /vue-tool-web/eslint.config.js
 */
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import unusedImportsPlugin from "eslint-plugin-unused-imports";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    plugins: {
      vue: pluginVue,
      "unused-imports": unusedImportsPlugin,
    },
    rules: {
      // 允许自动导入的 API
      "no-undef": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      'vue/multi-word-component-names': ['error', {
        "ignores": ['index'] // 允许 index 作为组件名
      }]
    },
    languageOptions: {
      globals: {
        // 添加自动导入的全局变量
        ref: "readonly",
        computed: "readonly",
        watch: "readonly",
        onMounted: "readonly",
        // 其他你自动导入的 API
      },
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
];
