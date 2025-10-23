import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      script: [
        {
          src: ``,
          async: true,
          defer: true
        }
      ]
    }
  },

  devtools: { enabled: false },

  css: [
    '@mdi/font/css/materialdesignicons.css', 
    '~/assets/scss/main.scss',
    'vuetify/styles'
  ],

  runtimeConfig: {
    public: {
      apiBase: import.meta.env.VITE_API_BASE_URL,
    },
  },

  plugins: [ ],

  build: {
    transpile: ['vuetify', '@vuepic/vue-datepicker'],
    // filenames: {
    //   app: ({ isDev }) => isDev ? '[name].js' : '[name].[contenthash].js',
    //   chunk: ({ isDev }) => isDev ? '[name].js' : '[name].[contenthash].js',
    // }
  },

  modules: [
    // '@funken-studio/sitemap-nuxt-3',
    // '@nuxtjs/robots',
    // '@nuxt/image',
    '@pinia/nuxt',
    // ...(process.env.NODE_ENV === 'production' ? ['nuxt3-meta-pixel'] : []),
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  nitro: {
    devServer: {
      host: '0.0.0.0', 
    },
  },

//   nitro: {
//     prerender: {
//         routes: [
//             '/about-us',
//             '/forgot-password',
//             '/how-it-works',
//             '/login',
//             '/register-now',
//             '/success-payment',
//             '/vendor-registration' 
//         ]
//         }
//     },

  // sitemap: {
  //   hostname: '',
  //   cacheTime: 1,
  //   exclude: [],
  //   defaults: {
  //       changefreq: 'daily',
  //       priority: 1,
  //       lastmod: ''
  //   },
  //   routes: async () => {
  //       let url = null;
  //       url = ''; // sitemap json url //
  //       const apiPath = url;

  //       const dynamicUrls = await $fetch(`${apiPath}`);
  //       // console.log(dynamicUrls, 'dynamicUrl')
  //       const siteMap = dynamicUrls.data.map(item => item.url);
  //       return siteMap;
  //         }
  //     },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  debug: false,
  ssr: false,

  compatibilityDate: '2024-07-26'
})