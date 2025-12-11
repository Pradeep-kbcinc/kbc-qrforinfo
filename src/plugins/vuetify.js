// plugins/vuetify.js

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { VFileUpload } from 'vuetify/labs/VFileUpload'
import { VDateInput } from 'vuetify/labs/VDateInput'
// Composables
import { createVuetify } from 'vuetify'

export default createVuetify({
  components: {
    VFileUpload,
    VDateInput
  },
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
