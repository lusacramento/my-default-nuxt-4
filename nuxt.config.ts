// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      devPort: process.env.DEV_PORT,
      host: process.env.HOST,
    },
  },

  devServer: {
    port: process.env.DEV_PORT ? parseInt(process.env.DEV_PORT) : 8081,
  },

  modules: ["@nuxt/eslint", "@nuxt/fonts", "@nuxt/icon", "@nuxt/test-utils"],
});