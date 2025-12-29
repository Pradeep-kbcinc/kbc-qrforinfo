/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import './config/axios-interceptor'
import 'vue3-toastify/dist/index.css';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
// Components
import VueKonva from 'vue-konva'
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'

const app = createApp(App)

registerPlugins(app)
app.component('QuillEditor', QuillEditor)
app.use(VueKonva)
app.mount('#app')

