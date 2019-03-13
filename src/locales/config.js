import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'

const options = {
  fallbackLng: 'de',

  ns: ['translations'],
  defaultNS: 'translations',

  debug: false,

  interpolation: {
    escapeValue: false
  },

  react: {
    wait: true
  },

  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json'
  }
}

if (process.browser) {
  i18n.use(Backend)
}

if (!process.browser) {
  i18n.loadNamespaces(['translations'])
}

i18n.use(initReactI18next)

if (!i18n.isInitialized) i18n.init(options)

export default i18n
