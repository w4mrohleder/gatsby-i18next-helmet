import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import { reactI18nextModule } from 'react-i18next'

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

i18n.use(reactI18nextModule)

if (!i18n.isInitialized) i18n.init(options)

export default i18n
