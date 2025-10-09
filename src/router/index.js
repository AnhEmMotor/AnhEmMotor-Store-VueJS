import { createRouter, createWebHistory } from 'vue-router'
import AboutUs from '@/views/AboutUs.vue'
import NewsView from '@/views/NewsView.vue'
import PromotionPage from '@/views/PromotionPage.vue'
import ServicePage from '@/views/ServicePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'about',
      path: '/about',
      component: AboutUs,
    },
    {
      name: 'news',
      path: '/news',
      component: NewsView,
    },
    {
      name: 'promotion',
      path: '/promotion',
      component: PromotionPage,
    },
    {
      name: 'service',
      path: '/service',
      component: ServicePage,
    },
  ],
})

export default router
