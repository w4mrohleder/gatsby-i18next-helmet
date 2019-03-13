import { createStore as reduxCreateStore } from 'redux'
import rootReducer from './index'

const store = (persistedState = {}) => {
  const devtools =
    process.env.NODE_ENV === 'development' && window.devToolsExtension
      ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f

  return reduxCreateStore(rootReducer, { ...persistedState }, devtools)
}

export default store
