import { createRouter, createWebHistory } from 'vue-router'
const AboutUs = () => import('@/views/AboutUs.vue')
const NewsView = () => import('@/views/NewsView.vue')
const PromotionPage = () => import('@/views/PromotionPage.vue')
const ServicePage = () => import('@/views/ServicePage.vue')
const TheIndex = () => import('@/views/TheIndex.vue')
const CategorySection = () => import('@/views/CategorySection.vue')
const AccessoriesView = () => import('@/views/AccessoriesView.vue')
const MotorcyclesView = () => import('@/views/MotorcyclesView.vue')
const SparePartsView = () => import('@/views/SparePartsView.vue')
const ShoppingCartView = () => import('@/views/ShoppingCartView.vue')

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
      name: 'category',
      path: '/category',
      component: CategorySection,
    },
    {
      name: 'accessories',
      path: '/accessories',
      component: AccessoriesView,
    },
    {
      name: 'motorcycles',
      path: '/motorcycles',
      component: MotorcyclesView,
    },
    {
      name: 'spare-parts',
      path: '/spare-parts',
      component: SparePartsView,
    },
    {
      name: 'process-order',
      path: '/process-order',
      component: ShoppingCartView,
    },
  ],
})

export default router
