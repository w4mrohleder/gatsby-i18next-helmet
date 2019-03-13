/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import i18n from './src/locales'

import createStore from './src/state/createStore'

const store = createStore()

// store.subscribe(() => {})

const detectLanguage = () => {
  const segments = window.location.pathname.split('/')
  if (segments[1]) {
    return ['de', 'fr'].includes(segments[1]) ? segments[1] : 'de'
  }

  let found = []
  let lang = []

  if (typeof navigator !== 'undefined') {
    if (navigator.languages) {
      for (let i = 0; i < navigator.languages.length; i++) {
        found.push(navigator.languages[i])
      }
    }
    if (navigator.userLanguage) {
      found.push(navigator.userLanguage)
    }
    if (navigator.language) {
      found.push(navigator.language)
    }
  }

  found.forEach(f => {
    if (['de', 'fr'].includes(f)) {
      lang.push(f)
    }
  })

  return lang.length > 0 ? lang[0] : 'de'
}

const lang = detectLanguage()

if (window.location.pathname === '/' && lang === 'fr') {
  window.location.replace(`${window.location.origin}/fr`)
}

export const wrapRootElement = ({ element }) => {
  const ConnectedRootElement = (
    <I18nextProvider i18n={i18n} defaultNS='translations' initialLanguage={lang}>
      <Provider store={store}>{element}</Provider>
    </I18nextProvider>
  )

  return ConnectedRootElement
}
