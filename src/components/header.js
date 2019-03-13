import PropTypes from 'prop-types'
import React from 'react'

import { Link } from '../locales'

class Header extends React.Component {
  render () {
    const { siteTitle } = this.props
    return (
      <header
        style={{
          background: `rebeccapurple`,
          marginBottom: `1.45rem`
        }}
      >
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `1.45rem 1.0875rem`
          }}
        >
          <h1 style={{ margin: 0 }}>
            <Link to='/'>
              <span
                style={{
                  color: `white`,
                  textDecoration: `none`
                }}
              >
                {siteTitle}
              </span>
            </Link>
          </h1>
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
