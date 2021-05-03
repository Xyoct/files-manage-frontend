import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from './axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

if (process.env.NODE_ENV === 'production') {
    Vue.prototype.$baseUrl = ''
} else {
    Vue.prototype.$baseUrl = 'http://localhost:3050/'
}

Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
