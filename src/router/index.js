import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "index" */ '../views/cli'),
    redirect: '/tab',
    children: [
      {
        path: '/tab',
        redirect: '/tab/0'
      },
      {
        path: '/tab/:id',
        component: () => import(/* webpackChunkName: "screen" */ '../views/cli/Screen'),
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
