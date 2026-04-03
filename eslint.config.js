import js from "@eslint/js";
import globals from "globals";

/**
 * ESLint flat config for browser ES modules (no bundler).
 * Educational note: `languageOptions.globals` tells ESLint that `document`,
 * `window`, etc. exist at runtime in the browser.
 */
export default [
  js.configs.recommended,
  {
    ignores: ["node_modules/**", "dist/**"],
  },
  {
    files: ["js/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  {
    files: ["eslint.config.js", "scripts/**/*.mjs"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { ...globals.node },
    },
  },
];
