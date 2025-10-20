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

  sourcemap: {
    server: true,
    client: true,
  },

  css: ["~/assets/styles/main.scss"],

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/test-utils",
    "usebootstrap",
    "@pinia/nuxt",
    [
      "nuxt-mongoose",
      {
        uri: process.env.MONGODB_URI, // Recommended: Use environment variables for sensitive data
        options: {
          // Mongoose connection options (e.g., useNewUrlParser, useUnifiedTopology)
        },
        modelsDir: "server/models", // Default directory for Mongoose schemas
      },
    ],
  ],
});
