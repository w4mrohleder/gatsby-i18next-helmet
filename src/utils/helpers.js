import i18n from 'i18next'

import { links } from './constants'

export const localizeLink = (originalLink, lang = i18n.language) => {
  let link = originalLink

  Object.keys(links).forEach(pageName => {
    if (link.includes(`/${pageName}`)) {
      const reg = new RegExp(`(/${pageName})(?=[/?]|$)`, 'g')
      link = link.replace(reg, `/${links[pageName][lang]}`)
    }
  })

  return link
}
