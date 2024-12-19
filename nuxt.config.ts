// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  srcDir: "src",
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "radix-vue/nuxt",
    "@vueuse/nuxt",
  ],
  app: {
    head: {
      title: "Generate your SBTN report",
      titleTemplate: "%s | opendata4nature",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        {
          charset: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
      ],
    },
  },
  tailwindcss: {
    cssPath: "~/assets/styles/tailwind.css",
    viewer: false,
  },
  colorMode: {
    classSuffix: "",
  },
  components: [
    {
      path: "~/components/nyx",
      extensions: [".vue"],
      prefix: "nyx",
    },
  ],
})
