const path = require('path')
const Consts = require("./src/appconsts");
console.log(Consts);
require('dotenv').config({
  silent: true,
  path: process.env.NODE_ENV === 'production' ? '.prod.env' : '.dev.env'
})

module.exports = {
  build: {
    extractCSS: true,
    vendor: ['vuetify', 'jwt-decode', 'axios']
  },
  buildDir: 'dist/client',
  cache: true,
  css: [
    { src: 'vuetify/dist/vuetify.min.css', lang: 'css' },
    { src: '~/assets/style/app.styl', lang: 'styl' }
  ],
  env: {
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    CONSTS: {
      ...Consts
    }

  },
  head: {
    title: 'getmechef',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  manifest: {
    name: 'getmechef',
    description: 'A Vueniverse project',
    theme_color: '#188269'
  },
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/component-cache',
    '@nuxtjs/axios'
  ],
  axios: {
    baseUrl: `http://${process.env.HOST}:${process.env.PORT}`,
    browserBaseURL: ''
  },
  plugins: ['~/plugins/vuetify.js', '~/plugins/axios.js'],
  render: {
    static: {
      maxAge: '1y',
      setHeaders (res, path) {
        if (path.includes('sw.js')) {
          res.setHeader('Cache-Control', 'public, max-age=0')
        }
      }
    }
  },
  router: {
    middleware: ['ssr-cookie', 'https']
  },
  srcDir: path.resolve(__dirname, 'src', 'client')
}
