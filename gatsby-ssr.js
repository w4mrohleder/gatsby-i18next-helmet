import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import Backend from 'i18next-sync-fs-backend'

import i18n from './src/locales'

import createStore from './src/state/createStore'

export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
  i18n
    .use(Backend)
    .init({
      initImmediate: false,
      backend: {
        // when this site renders serverside we want to get the locales from the src folder
        loadPath: 'src/locales/{{lng}}/{{ns}}.json'
      }
    })
    // load the namespace
    .loadNamespaces(['translations'], () => {
      const store = createStore()
      const ConnectedBody = () => <Provider store={store}>{bodyComponent}</Provider>
      replaceBodyHTMLString(renderToString(<ConnectedBody />))
    })
}
