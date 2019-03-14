import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import Backend from 'i18next-sync-fs-backend'
import { I18nextProvider } from 'react-i18next';

import i18n from './src/locales'

import createStore from './src/state/createStore'

// we create a main instance using the serverside backend and has all namespaces and languages preloaded
// from this fully loaded main instance we create a cloned instance having set lng needed
let mainInstance;
function getCloneInstance(lng, cb) {
  function mainReady() {
    const clone = mainInstance.cloneInstance({ lng });
    cb(null, clone);
  }

  if (!mainInstance) {
    const inst = i18n.createInstance();
    inst.use(Backend);
    inst.init({
      lng: 'de',
      fallbackLng: 'de',
      whitelist: ['de', 'fr'], // make sure we have only valid lngs
      preload: ['de', 'fr'], // make sure we preload all lngs
      initImmediate: false,
      ns: ['translations'], // make sure we have all namespaces needed for the app
      defaultNS: 'translations',
      debug: false,
      interpolation: {
        escapeValue: false
      },
      backend: {
        // when this site renders serverside we want to get the locales from the src folder
        loadPath: 'src/locales/{{lng}}/{{ns}}.json'
      }
    }, () => {
      mainInstance = inst;
      mainReady();
    })
  } else {
    mainReady();
  }
}

export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString, pathname }) => {
  // only way to get current language was extraction from pathname
  // -> not sure there is a way to access context
  const p = pathname.split('/');
  const lng = p[1] || 'de';

  // get a cloned instance set to the language from path
  // pass this to the I18nextProvider
  //
  // why it's important to not use the main instance?
  //
  // -> it's a singleton if rendering has any async operation a render of a page
  // done in parallel in different language will override the language for the previous not
  // yet finished render cycle
  getCloneInstance(lng, (err, i18nClone) => {
    const store = createStore()
    const ConnectedBody = () => <I18nextProvider i18n={i18nClone}><Provider store={store}>{bodyComponent}</Provider></I18nextProvider>
    replaceBodyHTMLString(renderToString(<ConnectedBody />))
  });
}
