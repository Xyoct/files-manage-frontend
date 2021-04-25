import Vue from 'vue'
import VueRouter from 'vue-router'

import homeRoutes from './home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/home',
    component: () => import('../views/Layout.vue'),
    children: [
        ...homeRoutes
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
