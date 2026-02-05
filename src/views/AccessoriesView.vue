<template>
  <div class="pt-6 md:pt-0 bg-gray-50">
    <CategoryNav />
  </div>

  <div class="container mx-auto px-4 mt-8 pb-12">

    <div class="md:hidden flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Phụ Kiện</h2>
      <button
        @click="isFilterOpen = true"
        class="bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-sm flex items-center gap-2 text-gray-700 hover:text-[#de0000] hover:border-[#de0000] transition"
      >
        <i class="fas fa-filter"></i>
        <span class="font-bold">LỌC</span>
      </button>
    </div>

    <div class="flex flex-col md:flex-row gap-8 relative">

      <div
        v-if="isFilterOpen"
        class="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
        @click="isFilterOpen = false"
      ></div>

      <FilterSidebar
        id="filter-sidebar"
        :products="allProducts"
        v-model="filters"
        @clear-filters="clearFilters"
        @close="isFilterOpen = false"
        class="transition-transform duration-300 ease-in-out bg-white"
        :class="[
          !isDesktop ? 'fixed top-0 left-0 h-full w-[85%] max-w-[320px] z-50 shadow-2xl' : '',
          !isDesktop && !isFilterOpen ? '-translate-x-full' : 'translate-x-0',
          isDesktop ? 'md:w-1/4 md:block' : ''
        ]"
      />

      <main class="flex-grow">
        <h2 class="hidden md:block text-3xl font-bold text-gray-800 mb-6">Phụ Kiện Chính Hãng</h2>

        <div v-if="paginatedProducts.length === 0" class="text-center py-10 bg-gray-50 rounded-xl">
          <p class="text-gray-500 text-lg">Không tìm thấy sản phẩm nào phù hợp với bộ lọc.</p>
          <button @click="clearFilters" class="mt-2 text-[#de0000] font-semibold hover:underline">Xóa bộ lọc</button>
        </div>

        <div v-else class="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          <ProductCard
            v-for="product in paginatedProducts"
            :key="product.id"
            :product="product"
            @add-to-cart="handleAddToCart"
            @view-details="goToDetail"
          />
        </div>

        <div class="mt-8">
          <Pagination
            v-if="totalPages > 1"
            :current-page="currentPage"
            :total-pages="totalPages"
            @page-change="handlePageChange"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router' // 1. Import Router
import { products } from '../data/products.js' // Đảm bảo đường dẫn này đúng với máy bạn

import CategoryNav from '@/components/layout/CategoryNav.vue'
import FilterSidebar from '@/components/accessories/FilterSidebar.vue'
import ProductCard from '@/components/accessories/ProductCard.vue'
import Pagination from '@/components/ui/BasePagination.vue'
import { useCart } from '@/composables/useCart'

const router = useRouter() // 2. Khởi tạo Router

const allProducts = ref(products)

const filters = ref({
  productType: 'all',
  priceRange: 'all',
  color: 'all',
})

const clearFilters = () => {
  filters.value = {
    productType: 'all',
    priceRange: 'all',
    color: 'all',
  }
}

const filteredProducts = computed(() => {
  return allProducts.value.filter((product) => {
    const typeMatch = filters.value.productType === 'all' || product.type === filters.value.productType
    const [minPriceStr, maxPriceStr] = filters.value.priceRange.split('-')
    const minPrice = minPriceStr ? parseInt(minPriceStr) : 0
    const maxPrice = maxPriceStr === 'max' ? Infinity : maxPriceStr ? parseInt(maxPriceStr) : Infinity
    const priceMatch = filters.value.priceRange === 'all' || (product.price >= minPrice && product.price <= maxPrice)
    const colorMatch = filters.value.color === 'all' || (product.colors && product.colors.includes(filters.value.color))
    return typeMatch && priceMatch && colorMatch
  })
})

const ITEMS_PER_PAGE = 8
const currentPage = ref(1)

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / ITEMS_PER_PAGE)
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE
  return filteredProducts.value.slice(start, end)
})

const handlePageChange = (page) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch(filters, () => { currentPage.value = 1 }, { deep: true })

const { addItem } = useCart()
const handleAddToCart = (product) => {
  addItem(product, 1)
}

// 3. Hàm chuyển trang (MỚI)
const goToDetail = (product) => {
  router.push({
    name: 'accessories-details',
    params: { id: product.id }
  })
}

// Responsive Filter Logic
const isFilterOpen = ref(false)
const isDesktop = ref(true)

const checkScreenSize = () => {
  isDesktop.value = window.innerWidth >= 768
  if (isDesktop.value) {
    isFilterOpen.value = false
  }
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>
