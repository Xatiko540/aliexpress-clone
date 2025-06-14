import { defineI18nConfig } from '@nuxtjs/i18n'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'en',
  messages: {
    ru: {
      message: 'Используя этот сайт, Вы выражаете согласие на сбор...',
      privacy: 'Политике о персональных данных',
      agree: 'Вы принимаете условия нашего',
      terms: 'Пользовательского соглашения',
      button: 'Понятно'
    },
    en: {
      message: 'By using this site, you consent to the collection...',
      privacy: 'Privacy Policy',
      agree: 'You also accept our',
      terms: 'Terms of Use',
      button: 'Got it'
    }
  },
  experimental: {
    bundle: {
      optimizeTranslationDirective: false
    }
  }
}))