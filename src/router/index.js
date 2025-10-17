import { createRouter, createWebHistory } from 'vue-router'
import AboutUs from '@/views/AboutUs.vue'
import NewsView from '@/views/NewsView.vue'
import PromotionPage from '@/views/PromotionPage.vue'
import ServicePage from '@/views/ServicePage.vue'
import TheIndex from '@/views/TheIndex.vue'
import CategorySection from '@/views/CategorySection.vue'
import AccessoriesView from '@/views/AccessoriesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'index',
      path: '/',
      component: TheIndex,
    },
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
    {
<<<<<<< HEAD
      name: 'category',
      path: '/category',
      component: CategorySection,
    },
    {
      name: 'accessories',
      path: '/accessories',
=======
      name: 'list-category',
      path: '/listings',
>>>>>>> 7f0d990eefadf423b46dcd334d47cfe6ad6ed59c
      component: AccessoriesView,
    },
  ],
})

export default router
