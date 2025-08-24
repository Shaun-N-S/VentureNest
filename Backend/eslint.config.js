// eslint.config.js
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import pluginPrettier from "eslint-plugin-prettier";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: "./tsconfig.json",
      },
      globals: globals.node,
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: pluginPrettier,
    },
    rules: {
      "no-unused-vars": "off", // turn off base rule
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "none", // ignore unused function arguments
          ignoreRestSiblings: true,
          // argsIgnorePattern: "^_", // ignore args starting with _
        },
      ],
      "prettier/prettier": "error",
    },
  },
];
