import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  }
]

export default routes
