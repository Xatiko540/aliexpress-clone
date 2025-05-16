// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    pages: true,
  
    modules: [
      'nuxt-icon',
      'nuxt-lodash',
      '@pinia/nuxt',
      '@pinia-plugin-persistedstate/nuxt',
      '@nuxtjs/tailwindcss',
      
    ],
  
    runtimeConfig: {
      jwtSecret: process.env.JWT_SECRET || 'supersecretkey123',
      public: {
        stripePk: process.env.STRIPE_PK_KEY || '',
      },
    },
  
    app: {
      head: {
        script: [
          { src: 'https://js.stripe.com/v3/', defer: true },
        ],
        meta: [
          { name: 'referrer', content: 'no-referrer-when-downgrade' }, // ⚔️ fixes `opaque response blocking`
        ],
      },
    },
  
    // server: {
    //   port: 3000,
    //   host: '0.0.0.0',
    // },
  
    nitro: {
      preset: 'node-server',
      routeRules: {
        '/**': { cors: true }, // ✅ enable CORS for all routes
      },

      externals: {
        inline: ['jsonwebtoken']
      }
      
    },
  })