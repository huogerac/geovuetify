import prettier from "eslint-plugin-prettier/recommended"
import simpleImportSort from "eslint-plugin-simple-import-sort"

import withNuxt from "./.nuxt/eslint.config.mjs"

const config = withNuxt(
  prettier,
  {
    ignores: ["node_modules/**/*", "lib/**/*"],
  },
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
)

export default config
