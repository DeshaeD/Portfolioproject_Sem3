// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Server-only by default. Filled from NUXT_SUPABASE_URL / NUXT_SUPABASE_KEY in .env.
  runtimeConfig: {
    supabaseUrl: '',
    supabaseKey: '',
  },

  // Global stylesheet: design tokens, reset and shared utility classes.
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Deshae Dekker — Frontend developer',
      meta: [
        { name: 'description', content: 'Portfolio of Deshae Dekker, frontend developer and ICT student at Fontys.' },
        { name: 'theme-color', content: '#2c2c2c' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        // Archivo is loaded with its full width axis (62–125) — the design leans on the condensed widths.
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=JetBrains+Mono:wght@300;400;500&display=swap',
        },
      ],
    },
  },
})
