import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  runtimeConfig: {
    botToken: "",
    webappUrl: "",
    jwtSecret: "",
    // Keys within public, will be also exposed to the client-side
    public: {
      botId: "",
    },
  },
  sourcemap: {
    server: true,
    client: true
  },
  devtools: { enabled: false },
  future: {
    typescriptBundlerResolution: false,
  },
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
      allowedHosts: [
        "fca4-77-251-156-81.ngrok-free.app",
        "light-track.vercel.app",
      ],
    },
    plugins: [nodePolyfills()],
  },
  supabase: {
    redirect: false,
  },
});
