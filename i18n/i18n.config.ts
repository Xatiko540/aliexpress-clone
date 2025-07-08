export default () => ({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  lazy: true,
  langDir: 'locales',

  experimental: {
    bundle: {
      optimizeTranslationDirective: false
    }
  }
})