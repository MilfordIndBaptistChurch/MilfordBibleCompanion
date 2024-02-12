import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createHead } from '@vueuse/head';
import Antd from 'ant-design-vue';
import VCollapse from 'v-collapse-it';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

const head = createHead()

library.add(faCopy)

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(head)
app.use(router)
app.use(Antd)
app.use(VCollapse)

app.mount('#app')
