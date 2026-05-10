import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import unusedImports from "eslint-plugin-unused-imports";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ["node_modules/", "dist/", "build/", ".vite/", "coverage/"] },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { settings: { react: { version: "detect" } } },
  { 
    languageOptions: { 
      globals: globals.node,
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.js", "*.mjs", "*.cjs"],
        },
        tsconfigRootDir: import.meta.dirname,
      }
    } 
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    ...tseslint.configs.disableTypeChecked,
  },
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      "unused-imports": unusedImports
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/ban-ts-ignore": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "comma-dangle": "off",
      "@typescript-eslint/comma-dangle": "off",
      indent: ["error", 2],
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_"
        }
      ],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0, maxBOF: 0 }],
      "quotes": [
        "error",
        "double"]
   
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // Soften/relax strict TypeScript-ESLint rules
      "@typescript-eslint/consistent-type-definitions": "off", // allows 'type' or 'interface' freely
      "@typescript-eslint/restrict-template-expressions": "off", // allows numbers, booleans, etc. in `${value}`
      "@typescript-eslint/no-confusing-void-expression": "off", 
      "@typescript-eslint/no-unnecessary-condition": "off", 
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off", 
      "@typescript-eslint/no-misused-promises": "off", 
      "@typescript-eslint/no-floating-promises": "warn", 
      "@typescript-eslint/use-unknown-in-catch-callback-variable": "off",
      "@typescript-eslint/restrict-plus-operands": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unused-expressions": "off"
    }
  }
];
