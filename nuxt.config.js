import { config } from 'dotenv'

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
        href:
          'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@200,400;500;700&family=Roboto:wght@200,400;500;700&display=swap',
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
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/moment',
    '@nuxtjs/color-mode',
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
    // https://go.nuxtjs.dev/pwa
    // '@nuxtjs/pwa',
    '@nuxtjs/markdownit',
    '@nuxtjs/sitemap',
  ],

  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://hiro-degawa.me',
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    generate: false,
  },

  markdownit: {
    injected: true,
  },

  // pwa: {
  //   icon: {
  //     source: '~/icon.png',
  //   },
  // },

  env: {
    BIRTHDAY: process.env.BIRTHDAY,
    DATE_FORMAT: process.env.DATE_FORMAT,
    GA_TOKEN: process.env.GA_TOKEN,
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
    extend: function (config) {
      config.node = {
        fs: 'empty',
      }
    },
  },
}
