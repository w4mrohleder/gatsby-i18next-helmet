export default {
  name: 'myLangDetector',

  lookup(options) {
    // options -> are passed in options
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
  },

  cacheUserLanguage(lng, options) {
    // options -> are passed in options
    // lng -> current language, will be called after init and on changeLanguage

    // store it
  }
};