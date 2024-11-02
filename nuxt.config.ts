// https://nuxt.com/docs/api/configuration/nuxt-config//
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Morning Moxie',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { name: 'charset', content: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'msapplication-TileColor', content: '#f4f2f0' },
        { name: 'theme-color', content: '#f4f2f0' },
        { name: 'description', content: 'Daily inspiration via text or WhatsApp' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: "180x180", href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#ff3904' },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        }
      ],
    },
  },
  compatibilityDate: '2024-09-30',
  features: {
    devLogs: false
  },
  modules: ['@nuxtjs/supabase'],
  supabase: {
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsbmZ2Y2V2a3hjaHJkd25rZ3lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwMDI3MjIsImV4cCI6MjA0NDU3ODcyMn0.01sr5QfiI36ZivATnnCt9Grvqxs3IxKtOf0FPIwxHRY',
    url: 'https://ulnfvcevkxchrdwnkgyf.supabase.co',
    redirect: false, // https://github.com/supabase/supabase/issues/16551
  },
  css: [
        'primevue/resources/themes/mdc-light-deeppurple/theme.css',
        'primevue/resources/primevue.min.css',
        'primeicons/primeicons.css',
        'primeflex/primeflex.css',
        '@/assets/styles/main.scss',
  ],
  components: true,
    build: {
        transpile: ['primevue'],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
  },
  runtimeConfig: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    public: {
      environment: process.env.environment ?? 'local',
      supabaseAuthSignInRedirectTo: process.env.environment === 'local' ? 'http://localhost:3000' : 'https://morningmoxie.com',
      supabaseSuccessRedirectTo: process.env.environment === 'local' ? 'http://localhost:3000/success' : 'https://morningmoxie.com/success',
      supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsbmZ2Y2V2a3hjaHJkd25rZ3lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwMDI3MjIsImV4cCI6MjA0NDU3ODcyMn0.01sr5QfiI36ZivATnnCt9Grvqxs3IxKtOf0FPIwxHRY',
      supabaseUrl: 'https://ulnfvcevkxchrdwnkgyf.supabase.co',
      supabaseAuthTokenName: 'sb-ulnfvcevkxchrdwnkgyf-auth-token',
    }
  },
})
