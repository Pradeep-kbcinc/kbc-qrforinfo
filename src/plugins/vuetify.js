/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

// #2663eb

export default createVuetify({
  theme: {
    defaultTheme: 'system',
    colors:{
      primary: '#2663eb'
    }
  },
})
