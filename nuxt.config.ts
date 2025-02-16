import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  runtimeConfig: {
    // Keys within public, will be also exposed to the client-side
    public: {
      botId: "",
      jwtSecret: "",
    },
  },
  devtools: { enabled: true },
  modules: [
    "@scalar/nuxt",
    "@nuxt/ui",
    "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss",
    "@nuxt/eslint",
    "@pinia/nuxt",
  ],
  nitro: {
    experimental: {
      openAPI: true,
    },
    serveStatic: true,
  },
  pinia: {
    storesDirs: ["./stores/**"],
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
  vite: {
    server: {
      allowedHosts: ["short-planes-slide.loca.lt"],
    },
    plugins: [nodePolyfills()],
  },
  supabase: {
    redirect: false,
  },
});
