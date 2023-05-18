import { createRouter, createWebHistory } from 'vue-router'
import ListHotel from '../views/ListHotel'

const routes = [
  {
    path: '/',
    name: 'listHotel',
    component: ListHotel
  },
  {
    path: '/addHotel',
    name: 'addHotel',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AddHotel.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
