import router from '@/router'
import { createPinia } from 'pinia'
import { createApp, markRaw } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { VueQueryPlugin } from '@tanstack/vue-query'


const app = createApp(App)

VueQueryPlugin.install(app, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60,
      },
    },
  },
})
const pinia = createPinia()
pinia.use(({ store }) => {
  store.router = markRaw(router)
})
const vuetify = createVuetify({
  components,
  directives,
})

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
