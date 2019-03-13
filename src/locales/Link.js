import React from 'react'
import { Link } from 'gatsby'
import i18n from 'i18next'

import { localizeLink } from '../utils/helpers'

const I18nLink = ({ to, partially, noRedirect, noActive, className, children, state, onClick }) => {
  const lang = i18n.language
  const toWithLang = localizeLink(`/${lang}${to}`, lang)

  const isActive = ({ isCurrent }) => {
    return isCurrent && !noActive
      ? { className: `${className || ''} active` }
      : { className: `${className || ''}` }
  }

  const isPartiallyActive = ({ isPartiallyCurrent }) => {
    return isPartiallyCurrent && !noActive
      ? { className: `${className || ''} active` }
      : { className: `${className || ''}` }
  }

  const preventRedirect = e => {
    e.preventDefault()
    onClick()
  }

  return (
    <Link
      onClick={noRedirect ? preventRedirect : onClick}
      to={toWithLang}
      getProps={partially ? isPartiallyActive : isActive}
      state={state}
      className={className || ''}
    >
      {children}
    </Link>
  )
}

export default I18nLink
