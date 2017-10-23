const { resolve } = require('path');

module.exports = {
  srcDir: resolve(__dirname, 'client'),
  dev: process.env.NODE_ENV !== 'production',
  mode: 'spa',
  head: {
    titleTemplate: 'Linda',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A Feathers + Nuxt demo/boilerplate' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/client/static/v.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  plugins: [ 
    '~plugins/vuetify.js', 
    {src: '~api/index.js', injectAs: 'feathers'}
  ],
  build: {
    vendor: [
      'feathers/client',
      'feathers-socketio/client', 
      'socket.io-client',
      'feathers-hooks',
      'feathers-authentication-client',
      'vuetify'
    ],
    extractCSS: true,
  },
  loading: { color: '#64dd17' },
  css: [
  'normalize.css',
  '~/assets/style/app.styl'
  ],
};
