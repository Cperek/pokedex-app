import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { store, key, useStore } from '@/store/store'

const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
    },
    directives,
    components
  })

const app = createApp(App)

app.use(vuetify)
app.use(store, key)
app.use(router)
app.mount('#app')
