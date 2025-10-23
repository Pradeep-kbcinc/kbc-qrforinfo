// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'light', 
      themes: {
        light: {
          colors: {
            primary: '#2663eb', // your blue
            lightBlack: '#78808a',
            grey:'#e7e9ec',
            secondary: '#6c757d', // optional, example
            accent: '#82B1FF', // optional
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FB8C00',
          },
        },
      },
    },
  })
  app.vueApp.use(vuetify)
})
