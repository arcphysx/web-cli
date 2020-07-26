import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/tab',
  },
  {
    path: '/tab',
    component: () => import(/* webpackChunkName: "index" */ '../views/cli'),
    redirect: '/tab/0',
    children: [
      {
        path: ':id',
        component: () => import(/* webpackChunkName: "screen" */ '../views/cli/Screen'),
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
