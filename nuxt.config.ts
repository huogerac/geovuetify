// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  srcDir: "src",
  modules: ["radix-vue/nuxt", "@nuxt/eslint", "@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],
  tailwindcss: {
    cssPath: "~/assets/styles/tailwind.css",
    viewer: false,
  },
  radix: {
    prefix: "internal",
  },
  components: [
    {
      path: "~/components/nyx",
      extensions: [".vue"],
      prefix: "nyx",
    },
  ],
})
