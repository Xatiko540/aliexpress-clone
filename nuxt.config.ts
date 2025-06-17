// https://nuxt.com/docs/api/configuration/nuxt-config



export default defineNuxtConfig(<any>{
  pages: true,

  modules: [
    'nuxt-icon',
    'nuxt-lodash',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@vite-pwa/nuxt'
  ],

  


  plugins: [
    '~/plugins/piniaPersist.client.ts',
    '~/plugins/apexcharts.client.ts' 
  ],

  // 👇 PWA конфигурация
  pwa: {
    registerType: 'autoUpdate',
        workbox: {
      navigateFallback: '/', // ✅ вот сюда добавь
      globPatterns: ['**/*.{js,css,html,ico,png,svg}']
    },
    manifest: {
      name: 'AliExpress',
      short_name: 'AliApp',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#FF4646',
      icons: [
        {
          src: '/AliExpress-logo.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/AliExpress-logo.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ]
    }
  },

i18n: {
  locales: [
    { code: 'ru', file: 'ru.json' },
    { code: 'en', file: 'en.json' }
  ],
  lazy: true,
  langDir: 'locales/',
  defaultLocale: 'en',
  strategy: 'prefix_except_default',

experimental: {
    bundle: {
      optimizeTranslationDirective: false
    }
  },

},


runtimeConfig: {
  jwtSecret: process.env.JWT_SECRET || 'supersecretkey123',
  smtpUser: process.env.SMTP_USER,
  smtpPass: process.env.SMTP_PASS,
  public: {
    stripePk: process.env.STRIPE_PK_KEY || '',
  },
},

app: {
  head: {
    link: [
      { rel: 'manifest', href: '/manifest.webmanifest' }
    ],
    script: [
      { src: 'https://js.stripe.com/v3/', defer: true },
    ],
    meta: [
      { name: 'referrer', content: 'no-referrer-when-downgrade' },
    ],
  },
},

  nitro: {
    preset: 'node-server',
    routeRules: {
      '/**': { cors: true },
    },
    externals: {
      inline: ['jsonwebtoken']
    }
  },



})