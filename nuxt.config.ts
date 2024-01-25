// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "nuxt-graphql-request",
  ],
  build: {
    transpile: ["nuxt-graphql-request"],
  },
  ssr: false,

  graphql: {
    clients: {
      default: {
        endpoint: "http://localhost:8080/v1/graphql",
        // httpEndpoint: "http://localhost:8080/v1/graphql",
      },
    },
  },
  alias: {
    "cross-fetch": "cross-fetch/dist/browser-ponyfill.js",
  },
});
