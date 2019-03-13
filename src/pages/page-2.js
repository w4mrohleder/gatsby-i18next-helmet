import React from 'react'

import { Link } from '../locales'
import Layout from '../components/layout'
import SEO from '../components/seo'

const SecondPage = () => (
  <Layout>
    <SEO title='Page 2 title' description='Page 2 description' />

    <p>Page 2</p>

    <Link to='/'>Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
