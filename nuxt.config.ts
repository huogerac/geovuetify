// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  srcDir: "src",
  modules: ["@nuxt/eslint", "@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "shadcn-nuxt"],
  tailwindcss: {
    cssPath: "~/assets/styles/tailwind.css",
  },
  shadcn: {
    prefix: "Nyx",
    componentDir: "./src/components/nyx",
  },
})
