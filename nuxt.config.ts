// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@scalar/nuxt",
    "@nuxt/ui",
    "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss",
    "@nuxt/eslint",
  ],
  nitro: {
    experimental: {
      openAPI: true,
    },
    serveStatic: true,
  },
  scalar: {
    configurations: [
      {
        pathRouting: {
          basePath: "/docs",
        },
      },
    ],
  },
  ui: { safelistColors: ["green", "yellow", "red", "gray"] },
  experimental: {
    renderJsonPayloads: false,
  },
});
