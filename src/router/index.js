import { createRouter, createWebHistory } from 'vue-router'
import AboutUs from '@/views/AboutUs.vue'
import NewsView from '@/views/NewsView.vue'
import PromotionPage from '@/views/PromotionPage.vue'

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
  ],
})

export default router
