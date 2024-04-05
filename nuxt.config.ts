// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ///load tailwind model
  modules: ["@nuxtjs/tailwindcss"],
  // define Nuxt page transition
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
})