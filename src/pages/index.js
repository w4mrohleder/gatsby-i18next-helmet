import React from 'react'
import { withTranslation } from 'react-i18next'

import { Link } from '../locales'
import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = ({ t }) => (
  <Layout>
    <SEO title={t('index.seo.title')} description={t('index.seo.description')} />

    <p>{t('index.one')}</p>
    <p>{t('index.two')}</p>
    <p>{t('index.three')}</p>

    <Link to='/page-2/'>Go to page 2</Link>
  </Layout>
)

export default withTranslation()(IndexPage)
