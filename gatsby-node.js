const path = require(`path`)
const fs = require('fs-extra')

const languages = ['de', 'fr']
const links = require('./src/utils/constants').links

function addLocalePage (page, lang) {
  return {
    ...page,
    path: `/${lang}${page.path}`,
    context: {
      ...page.context,
      lang
    }
  }
}

exports.onPreBootstrap = () => {
  console.log('Copying locales...')
  fs.copySync(path.join(__dirname, '/src/locales'), path.join(__dirname, '/public/locales'))
}

/**
 * Custom Webpack configuration
 */
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules']
    }
  })
}

/**
 * LOCALE BASIC PAGES CONFIGURATION
 * We setup links with locale prefix 'de' or 'fr' except for homepage which
 * will be with default language 'de'
 */
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions

  return new Promise(resolve => {
    if (page.path === '/' || page.path === '/404/' || page.path === '/404.html') {
      page.context.lang = 'de'
      createPage(page)
    } else {
      deletePage(page)
    }

    const pageName = page.path.replace(/\//g, '')

    languages.forEach(lang => {
      if (links[pageName]) {
        page.path = `/${links[pageName][lang]}`
      }

      const localePage = addLocalePage(page, lang)
      createPage(localePage)
    })

    resolve()
  })
}

// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions

//   return new Promise((resolve, reject) => {
//     graphql(`
//       {
//         allWordpressPost {
//           edges {
//             node {
//               id
//               wordpress_id
//               date
//               slug
//               featured_media {
//                 localFile {
//                   childImageSharp {
//                     fluid(maxWidth: 768, cropFocus: ATTENTION) {
//                       base64
//                       aspectRatio
//                       src
//                       srcSet
//                       srcWebp
//                       srcSetWebp
//                       sizes
//                     }
//                   }
//                 }
//               }
//               author {
//                 name
//               }
//               acf {
//                 blog_author
//                 language
//               }
//               title
//               excerpt
//               yoast {
//                 metadesc
//               }
//             }
//           }
//         }
//         allWordpressPage {
//           edges {
//             node {
//               id
//               wordpress_id
//               title
//               slug
//               acf {
//                 language
//               }
//             }
//           }
//         }
//         allFirestoreCountry {
//           edges {
//             node {
//               lang
//               title
//               slug
//               redirect {
//                 slug
//               }
//             }
//           }
//         }
//         allFirestoreTour {
//           edges {
//             node {
//               lang
//               title
//               slug
//               countrySlug
//               redirect {
//                 slug
//                 countrySlug
//               }
//               collection
//             }
//           }
//         }
//         allFirestoreTrip {
//           edges {
//             node {
//               lang
//               title
//               slug
//               countrySlug
//               redirect {
//                 slug
//                 countrySlug
//               }
//               collection
//             }
//           }
//         }
//         allFirestoreHotel {
//           edges {
//             node {
//               lang
//               title
//               slug
//               countrySlug
//               redirect {
//                 slug
//                 countrySlug
//               }
//               collection
//             }
//           }
//         }
//       }
//     `
//     ).then(result => {
//       languages.forEach(lang => {
//         createPaginatedPages({
//           edges: result.data.allWordpressPost.edges.filter(({ node: { acf } }) => acf.language === lang),
//           createPage: createPage,
//           pageTemplate: './src/templates/blog.js',
//           pageLength: 9,
//           pathPrefix: 'blog',
//           buildPath: (index, pathPrefix) => index > 1 ? `/${lang}/${pathPrefix}/${index}` : `/${lang}/${pathPrefix}`,
//           context: { lang }
//         })

//         result.data.allWordpressPost.edges.forEach(({ node }) => {
//           createPage({
//             path: `/${lang}/blog/${node.slug}`,
//             component: path.resolve(`./src/templates/blogPage.js`),
//             context: {
//               wordpress_id: node.wordpress_id,
//               slug: node.slug
//             }
//           })
//         })

//         result.data.allWordpressPage.edges.forEach(({ node }) => {
//           createPage({
//             path: `/${lang}/${node.slug}`,
//             component: path.resolve(`./src/templates/wpPage.js`),
//             context: {
//               wordpress_id: node.wordpress_id,
//               slug: node.slug
//             }
//           })
//         })
//       })

//       result.data.allFirestoreCountry.edges.forEach(({ node }) => {
//         let countrySlug = node.slug
//         let country = node.title
//         let redirect = node.redirect
//         let lang = node.lang
//         let originalPage = {}

//         // pages for country main filters with list of services
//         originalPage = {
//           path: `/${lang}/${links.destinations[lang]}/${countrySlug}`,
//           component: path.resolve(`./src/templates/filtersPage.js`),
//           context: {
//             country,
//             countrySlug,
//             redirect: {
//               countrySlug: redirect.slug
//             },
//             lang
//           }
//         }
//         createPage(originalPage)

//         // pages for country info site
//         originalPage = {
//           path: `/${lang}/${links.countries[lang]}/${countrySlug}`,
//           component: path.resolve(`./src/templates/countryPage.js`),
//           context: {
//             countrySlug,
//             redirect: {
//               countrySlug: redirect.slug
//             },
//             lang
//           }
//         }
//         createPage(originalPage)
//       })

//       // pages for tour info site
//       result.data.allFirestoreTour.edges.forEach(({ node }) => {
//         let originalPage = {
//           path: `/${node.lang}/${links.destinations[node.lang]}/${node.countrySlug}/${links[node.collection][node.lang]}/${node.slug}`,
//           component: path.resolve(`./src/templates/tourPage.js`),
//           context: {
//             slug: node.slug,
//             countrySlug: node.countrySlug,
//             redirect: node.redirect,
//             lang: node.lang
//           }
//         }

//         createPage(originalPage)
//       })

//       // pages for trip info site
//       result.data.allFirestoreTrip.edges.forEach(({ node }) => {
//         let originalPage = {
//           path: `/${node.lang}/${links.destinations[node.lang]}/${node.countrySlug}/${links[node.collection][node.lang]}/${node.slug}`,
//           component: path.resolve(`./src/templates/tripPage.js`),
//           layout: 'index',
//           context: {
//             slug: node.slug,
//             countrySlug: node.countrySlug,
//             redirect: node.redirect,
//             lang: node.lang
//           }
//         }
//         createPage(originalPage)
//       })

//       // pages for hotel info site
//       result.data.allFirestoreHotel.edges.forEach(({ node }) => {
//         let originalPage = {
//           path: `/${node.lang}/${links.destinations[node.lang]}/${node.countrySlug}/${links[node.collection][node.lang]}/${node.slug}`,
//           component: path.resolve(`./src/templates/hotelPage.js`),
//           layout: 'index',
//           context: {
//             slug: node.slug,
//             countrySlug: node.countrySlug,
//             redirect: node.redirect,
//             lang: node.lang
//           }
//         }
//         createPage(originalPage)
//       })

//       resolve()
//     })
//   })
// }
