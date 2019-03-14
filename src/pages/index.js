import React from 'react'
import { useTranslation, useSSR } from 'react-i18next'

import { Link } from '../locales'
import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = ({ pageContext }) => {
  // not sure if needed but this useSSR or withSSR is what was initialLanguage on I18nextProvider in old version
  // https://react.i18next.com/latest/ssr
  useSSR({}, pageContext && pageContext.lang);

  // using the hook in functional components is nicer than using the HOC
  const { t, i18n } = useTranslation();

  // check language and loaded translations
  // console.warn(pageContext, i18n.language, i18n.services.resourceStore.data)

  return (
    <Layout>
      <SEO title={t('index.seo.title')} description={t('index.seo.description')} lang={i18n.language} />

      <p>{t('index.one')}</p>
      <p>{t('index.two')}</p>
      <p>{t('index.three')}</p>

      <Link to='/page-2/'>Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage;
