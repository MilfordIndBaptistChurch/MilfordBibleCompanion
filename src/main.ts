import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VCollapse from 'v-collapse-it'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VCollapse)

app.mount('#app')
