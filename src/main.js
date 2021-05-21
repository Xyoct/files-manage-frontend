import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from './axios'
import { Container, Header, Main, Row, Col, Upload, Loading, Message, MessageBox, Dialog, Pagination, Input, Button, Table, TableColumn } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

if (process.env.NODE_ENV === 'production') {
    Vue.prototype.$baseUrl = 'http://www.bestlifebestyue.com/file-manage/'
} else {
    Vue.prototype.$baseUrl = 'http://localhost:3050/'
}

Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(Input)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Loading.directive);

Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

Vue.config.productionTip = false

Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
