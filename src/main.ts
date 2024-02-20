import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createHead } from '@vueuse/head';
import Antd from 'ant-design-vue';
import VCollapse from 'v-collapse-it';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCopy, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularFaStar } from '@fortawesome/free-regular-svg-icons';

import App from './App.vue';
import router from './router';

const pinia = createPinia();
const head = createHead();

library.add(faCopy);
library.add(faStar);
library.add(regularFaStar);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(head)
app.use(router)
app.use(pinia)
app.use(Antd)
app.use(VCollapse)

app.mount('#app')
