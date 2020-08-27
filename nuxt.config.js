const getAppRoutes = require('./utils/getRoutes.js');
require('dotenv').config();
export default {
  mode: 'universal',
  env: {
    baseUrl: process.env.BASE_URL,
    mapKey: process.env.GOOGLE_MAP_KEY,
    // proxyUrl: 'https://cors-anywhere.herokuapp.com/',
    bearer: process.env.COLIV_HQ_KEY,
    prismicEndPoint: process.env.PRISMIC_ENDPOINT,
    googleApiKey: process.env.GOOGLE_MAP_KEY
  },
  /*
  ** Headers of the page
  */
  head: {
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:400,700,900,400italic,700italic' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-vue/2.14.0/bootstrap-vue.css' }
    ],
    script: [
      { src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js' },
      { src: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js' }
    ],
    meta: [
      { name:"viewport", content: "width=device-width, initial-scale=1"}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/resetr.css',
    '@/assets/css/common.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/bootstrap-vue' },
    { src: '@/plugins/vue-carousel', ssr: false },
    { src: '@/plugins/social-share', ssr: false },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // mofules for full static before `nuxt export` (coming in v2.12)
    '@/modules/static',
    '@/modules/crawler',
    // https://prismic-nuxt.js.org/
    '@nuxtjs/prismic',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/sitemap'
    /* '@nuxtjs/pwa', */
  ],
  axios: {
    proxy: true // Can be also an object with default options
  },
  proxy: {
	  '/api/': {
		  target: 'http://localhost:3000',
		  changeOrigin: true,
		  Headers: {
			  connection: 'keep-alive'
		  }
	  }
  },
  prismic: {
    endpoint: 'https://newcolive.cdn.prismic.io/api/v2',
    linkResolver: '@/plugins/link-resolver',
    htmlSerializer: '@/plugins/html-serializer',
  },

  sitemap: {
    routes() {
      return getAppRoutes();
    },
    generate: false
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // to transform link with <nuxt-link> for the htmlSerializer
      config.resolve.alias['vue'] = 'vue/dist/vue.common'
    }
  },
  buildModules: [
    '@nuxtjs/gtm',
    '@nuxtjs/dotenv'
  ],
  gtm: {
    id: process.env.GTM_KEY
  },
  
  generate: {
    fallback: '404.html' // Netlify reads a 404.html, Nuxt will load as an SPA
  }
}
