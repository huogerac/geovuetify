import prettier from "eslint-plugin-prettier/recommended"
import withNuxt from "./.nuxt/eslint.config.mjs"

const config = withNuxt(prettier, {
  ignores: ["node_modules/**/*", "lib/**/*"],
})

export default config
