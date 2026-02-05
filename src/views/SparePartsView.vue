<template>
  <div
    id="backdrop-overlay"
    :class="[isCartPanelOpen ? 'fixed inset-0 bg-black/60 z-40' : 'hidden']"
    @click="closeAllPanels"
  ></div>

  <div class="pt-6 md:pt-0 bg-gray-50">
    <CategoryNav />
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-8 pb-12">

    <div class="lg:hidden flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Phụ Tùng</h1>
      <button
        @click="openFilter"
        class="bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-sm flex items-center gap-2 text-gray-700 hover:text-[#de0000] hover:border-[#de0000] transition"
      >
        <i class="fas fa-filter"></i>
        <span class="font-bold">LỌC</span>
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 sm:gap-6 md:gap-8 relative">

      <div
        v-if="isFilterOpen"
        class="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
        @click="closeFilter"
      ></div>

      <div
        :class="[
          'fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:shadow-none lg:w-auto lg:bg-transparent lg:z-auto',
          isFilterOpen ? 'translate-x-0' : '-translate-x-full'
        ]"
      >
        <div class="h-full overflow-y-auto p-4 lg:p-0">
          <div class="flex justify-between items-center lg:hidden mb-4">
            <h2 class="text-xl font-bold text-gray-800">Bộ Lọc</h2>
            <button @click="closeFilter" class="text-gray-500 hover:text-red-500">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>

          <ProductFilter
            ref="productFilter"
            :products="products"
            @filter-change="applyFilters"
            @reset-filters="clearFilters"
          />
        </div>
      </div>

      <main class="w-full min-w-0">
        <div class="flex justify-between items-center mb-6">
          <h2 class="hidden lg:block text-3xl font-bold text-gray-800">Phụ Tùng Chính Hãng</h2>
        </div>

        <div v-if="paginatedProducts.length === 0" class="text-center py-12 bg-white rounded-xl shadow-sm">
          <div class="text-6xl text-gray-300 mb-4"><i class="fas fa-search"></i></div>
          <p class="text-gray-500 text-lg">Không tìm thấy phụ tùng phù hợp.</p>
          <button @click="clearFilters" class="mt-4 text-[#de0000] font-semibold hover:underline">
            Xóa bộ lọc
          </button>
        </div>

        <div v-else class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          <ProductCard
            v-for="product in paginatedProducts"
            :key="product.id"
            :product="product"
            @add-to-cart="handleAddToCart"
            @view-details="goToDetail"
          />
        </div>

        <div class="mt-10">
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router' // [MỚI] Import Router
import { products as allProductsData } from '../components/spare-parts/products-data' // Đường dẫn tới file dữ liệu phụ tùng
import { useCart } from '@/composables/useCart'

// Components
import CategoryNav from '@/components/layout/CategoryNav.vue'
import ProductFilter from '@/components/spare-parts/ProductFilter.vue'
import ProductCard from '@/components/accessories/ProductCard.vue' // Dùng chung Card với phụ kiện
import Pagination from '@/components/ui/BasePagination.vue'

const router = useRouter() // [MỚI] Khởi tạo Router
const { addItem } = useCart()

// State
const products = ref(allProductsData)
const currentPage = ref(1)
const itemsPerPage = 8
const isFilterOpen = ref(false)
const isCartPanelOpen = ref(false)
const isDesktop = ref(true)
const productFilter = ref(null)

const currentFilters = ref({
  productType: 'all',
  priceRange: 'all',
})

// [MỚI] Hàm chuyển hướng sang trang chi tiết
const goToDetail = (product) => {
  router.push({
    name: 'spare-part-detail',
    params: { id: product.id }
  })
}

// Logic Filter & Pagination (Giữ nguyên logic cũ của bạn)
const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    // Filter by Type
    const typeMatch = currentFilters.value.productType === 'all' || product.type === currentFilters.value.productType

    // Filter by Price
    let priceMatch = true
    if (currentFilters.value.priceRange !== 'all') {
      const [minPriceStr, maxPriceStr] = currentFilters.value.priceRange.split('-')
      const minPrice = parseInt(minPriceStr) || 0
      const maxPrice = maxPriceStr === 'max' ? Infinity : parseInt(maxPriceStr) || Infinity
      priceMatch = product.price >= minPrice && product.price <= maxPrice
    }

    return typeMatch && priceMatch
  })
})

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage)
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProducts.value.slice(start, end)
})

// Methods
const handleAddToCart = (product) => {
  addItem(product, 1)
}

const applyFilters = (filters) => {
  currentFilters.value = filters
  currentPage.value = 1
  closeFilter()
}

const clearFilters = () => {
  currentFilters.value = {
    productType: 'all',
    priceRange: 'all',
  }
  currentPage.value = 1
  if (productFilter.value) productFilter.value.resetFilters()
}

const handlePageChange = (page) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const openFilter = () => {
  isFilterOpen.value = true
}

const closeFilter = () => {
  isFilterOpen.value = false
}

const closeAllPanels = () => {
  isCartPanelOpen.value = false
  isFilterOpen.value = false
}

// Responsive Logic
const checkScreenSize = () => {
  isDesktop.value = window.innerWidth >= 1024
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
