import { config } from 'dotenv'
import { GraphQLClient, gql } from 'graphql-request'

config()

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Hiro Degawa.',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'twitter:card', content: 'summary_large_image' },
      {
        name: 'twitter:image',
        content: 'https://hiro-degawa.me/OGP.png',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://hiro-degawa.me/OGP.png',
      },
      {
        name: 'twitter:description',
        content: 'Hiro Degawa - Designer, Engineer.',
      },
      { name: 'twitter:title', content: 'Hiro Degawa' },
      {
        hid: 'description',
        name: 'description',
        content: 'Hiro Degawa - Designer, Engineer.',
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://hiro-degawa.me',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'Hiro Degawa?',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Hiro Degawa?',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Hiro Degawa?',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico' },
      {
        rel: 'stylesheets',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@200,400;500;700&family=Roboto:wght@200,400;500;700&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/graphcms.ts',
    { src: '~/plugins/ga.js', mode: 'client' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: false,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/moment',
    '@nuxtjs/color-mode',
    '@nuxtjs/pwa',
  ],

  styleResources: {
    scss: [
      '~/assets/scss/_variables.scss',
      '~/assets/scss/_global.scss',
      '~/assets/scss/_markdown.scss',
    ],
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/sentry',
    // https://go.nuxtjs.dev/pwa
    // '@nuxtjs/pwa',
    '@nuxtjs/markdownit',
    '@nuxtjs/sitemap',
    'nuxt-lazy-load',
  ],

  sentry: {
    dsn: process.env.SENTRY_DSN,
    // Additional Module Options go here
    // https://sentry.nuxtjs.org/sentry/options
    config: {
      // Add native Sentry config here
      // https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/
    },
    tracing: {
      tracesSampleRate: 1.0,
    },
  },

  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://hiro-degawa.me',
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    generate: false,
    async routes() {
      const graphcmsClient = new GraphQLClient(process.env.CMS_URL)

      const { works } = await graphcmsClient.request(
        gql`
          {
            works(orderBy: date_DESC) {
              title
              slug
              url
              body
              date
              thumbnail {
                url
              }
            }
          }
        `
      )

      const exp01 = Object.keys(works).map(
        (contact) => '/' + works[contact].slug
      )

      const array = [exp01]

      const flattened = array.reduce(
        (accumulator, currentValue) => accumulator.concat(currentValue),
        []
      )

      return flattened
    },
  },

  markdownit: {
    injected: true,
  },

  pwa: {
    icon: {
      source: '~/static/icon.png',
    },
  },

  env: {
    BIRTHDAY: process.env.BIRTHDAY,
    DATE_FORMAT: process.env.DATE_FORMAT,
    GA_TOKEN: process.env.GA_TOKEN,
    CMS_URL: process.env.CMS_URL,
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue'),
      })
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend: (config) => {
      config.node = {
        fs: 'empty',
      }
    },
  },
}
