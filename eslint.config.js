import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";

// ESLint v9+ - Flat Config
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"], // 린트 적용 대상
  },
  {
    settings: {
      react: {
        version: "detect", // React 버전 감지
      },
    },
    plugins: {
      react: pluginReact, // React 관련 린트 규칙 제공
      "react-hooks": pluginReactHooks, // React Hooks 관련 린트 규칙 제공
      "react-refresh": pluginReactRefresh, // React Fast Refresh 관련 린트 규칙 제공
    },
  },
  {
    languageOptions: {
      // ECMAScript 기능 설정
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // JSX 구문 사용
        },
      },
      // Node.js 환경에서 사용할 수 있는 전역 변수 설정
      globals: {
        ...globals.browser, // globalThis, window, console, alert, ...
        ...globals.node, // global, process
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended, // jsxRuntime : classic
  {
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": "warn",
      "react/react-in-jsx-scope": "off", // react-in-jsx-scope 규칙 비활성화 (JSX 변환 시, React 변수 필요 없음)
    },
  },
];
