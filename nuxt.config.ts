// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@scalar/nuxt', '@nuxt/ui'],
  nitro: {
    experimental: {
      openAPI: true,
    },
    serveStatic: true,
  },
  scalar: {
    configurations: [
      {
        // spec: {
        //   url: '/openapi.json',
        // },
        pathRouting: {
          basePath: '/docs',
        },
      },
    ],
  },
})