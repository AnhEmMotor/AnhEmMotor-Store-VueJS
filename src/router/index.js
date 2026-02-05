import { createRouter, createWebHistory } from 'vue-router'

const AboutUs = () => import('@/views/AboutUs.vue')
// const NewsView = () => import('@/views/NewsView.vue')
const PromotionPage = () => import('@/views/PromotionListView.vue')
const PromotionPageDetails = () => import('@/views/PromotionDetailView.vue')
const ServicePage = () => import('@/views/ServicePage.vue')
const TheIndex = () => import('@/views/TheIndex.vue')
const CategorySection = () => import('@/views/CategorySection.vue')
const AccessoriesView = () => import('@/views/AccessoriesView.vue')
const MotorcyclesView = () => import('@/views/MotorcyclesView.vue')
const SparePartsView = () => import('@/views/SparePartsView.vue')
const ShoppingCartView = () => import('@/views/ShoppingCartView.vue')
const ContactView = () => import('@/views/ContactView.vue')
const LoginView = () => import('@/views/LoginForm.vue')
const RegisterView = () => import('@/views/RegisterForm.vue')
const AccessoriesDetails = () => import('@/views/AccessoryDetail.vue')
const SparePartDetails = () => import('@/views/SparePartDetail.vue')
const ProductDetails = () => import('@/views/ProductDetails.vue')
const NewsListView = () => import('@/views/NewsListView.vue')
const NewsDetailView = () => import('@/views/NewsDetailView.vue')


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
    path: '/promotion',
    name: 'PromotionList',
    component: PromotionPage,
    meta: {
      title: 'Chương trình khuyến mãi xe máy | AnhEm Motor'
    }
  },
  {
    path: '/promotion/:slug',
    name: 'PromotionDetail',
    component: PromotionPageDetails,
    meta: {
      title: 'Chi tiết khuyến mãi | AnhEm Motor'
    }
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
     {
      name: 'login',
      path: '/login',
      component: LoginView,
    },
    {
      name: 'contact',
      path: '/contact',
      component: ContactView,
    },
     {
      name: 'register',
      path: '/register',
      component: RegisterView,
    },
    {
      name: 'accessories-details',
      path: '/accessories-details/:id',
      component: AccessoriesDetails,
    },
    {
      name: 'spare-part-detail',
      path: '/spare-part-details/:id',
      component: SparePartDetails,
    },
      {
      name: 'product-details',
      path: '/product-details/:id',
      component: ProductDetails,
    },

   {
    path: '/news',
    name: 'NewsList',
    component: NewsListView,
    meta: {
      title: 'Tin tức, sự kiện | AnhEm Motor'
    }
    },
   {
    path: '/news/:slug',
    name: 'NewsDetail',
    component: NewsDetailView,
    meta: {
      title: 'Chi tiết tin tức | AnhEm Motor'
    }
  }
  ],
})

export default router

