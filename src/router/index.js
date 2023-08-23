import { createRouter, createWebHistory } from 'vue-router'
import vProdicts from '../components/v-products.vue'

const routes = [
  {
    path: '/',
    component: vProdicts
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
