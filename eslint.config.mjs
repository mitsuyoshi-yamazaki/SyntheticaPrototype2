import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import tseslint from "@typescript-eslint/eslint-plugin"
import tsparser from "@typescript-eslint/parser"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  // JavaScript recommended rules
  js.configs.recommended,

  // TypeScript configurations
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      // TypeScript strict rules
      ...tseslint.configs.strict.rules,
      // TypeScript recommended type-checked rules
      ...tseslint.configs["recommended-type-checked"].rules,
      // TypeScript stylistic type-checked rules
      ...tseslint.configs["stylistic-type-checked"].rules,

      // Custom rules
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: ["error", "always", { null: "never" }],
      // null/undefinedの比較では == を強制
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      curly: "error",
      "@typescript-eslint/prefer-function-type": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "prefer-arrow-callback": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-member-accessibility": "error",
      "@typescript-eslint/strict-boolean-expressions": [
        "error",
        {
          allowString: false,
          allowNumber: false,
          allowNullableObject: false,
          allowNullableBoolean: false,
          allowNullableString: false,
          allowNullableNumber: false,
          allowNullableEnum: false,
          allowAny: false,
        },
      ],
      "@typescript-eslint/member-ordering": [
        "error",
        {
          default: [
            // publicプロパティ
            "public-static-field",
            "public-instance-field",
            // privateプロパティ
            "private-static-field",
            "private-instance-field",
            // アクセサ
            "public-static-get",
            "public-static-set",
            "public-instance-get",
            "public-instance-set",
            "private-static-get",
            "private-static-set",
            "private-instance-get",
            "private-instance-set",
            // constructor
            "public-constructor",
            "private-constructor",
            // メソッドは役割で順序を決めるため順序指定から除外
            "method",
          ],
        },
      ],
    },
  },

  // Next.js and Prettier rules
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
]

export default eslintConfig
