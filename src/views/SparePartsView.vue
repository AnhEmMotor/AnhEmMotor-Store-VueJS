<template>
  <div class="fixed top-5 right-5 z-[9999] flex flex-col gap-3">
    <div
      v-for="notification in notifications"
      :key="notification.id"
      :class="[
        'px-4 py-3 rounded-lg text-white shadow-lg flex items-center gap-3',
        notification.type === 'error'
          ? 'bg-gradient-to-r from-red-500 to-red-600'
          : 'bg-gradient-to-r from-emerald-500 to-emerald-600',
      ]"
    >
      <i
        :class="[
          'fas',
          notification.type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle',
        ]"
      ></i>
      <div>{{ notification.message }}</div>
    </div>
  </div>

  <ProductModal
    :isOpen="isProductModalOpen"
    :product="selectedProduct"
    @close="closeProductModal"
    @add-to-cart="handleAddToCartFromModal"
  />

  <div
    id="backdrop-overlay"
    :class="[isCartPanelOpen || isProductModalOpen ? 'fixed inset-0 bg-black/60 z-40' : 'hidden']"
    @click="closeAllPanels"
  ></div>

  <!-- Category Navigation -->
  <CategoryNav />

  <div class="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
    <ProductFilter
      @filter-change="applyFilters"
      @clear-filters="clearFilters"
      ref="productFilter"
    />

    <main class="flex-grow">
      <div
        id="product-list"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <ProductCard
          v-for="product in paginatedProducts"
          :key="product.id"
          :product="product"
          @add-to-cart="handleAddToCart"
          @view-details="openProductModal"
        />
      </div>

      <div class="mt-8">
        <BasePagination
          :totalPages="totalPages"
          :currentPage="currentPage"
          :loading="false"
          @update:currentPage="(val) => (currentPage = val)"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import ProductFilter from '@/components/spare-parts/ProductFilter.vue'
import ProductCard from '@/components/spare-parts/ProductCard.vue'
import ProductModal from '@/components/spare-parts/ProductModal.vue'
import BasePagination from '@/components/ui/BasePagination.vue'
import { products as allProductsData } from '@/components/spare-parts/products-data.js'
import CategoryNav from '@/components/layout/CategoryNav.vue'

// Reactive State
const allProducts = ref(allProductsData)
const cart = ref([])
const isCartPanelOpen = ref(false)
const isProductModalOpen = ref(false)
const selectedProduct = ref(null)
const notifications = ref([])
const productFilter = ref(null) // Template ref for filter component

// Filters State
const currentFilters = ref({
  productType: 'all',
  priceRange: 'all',
})

// Pagination State
const currentPage = ref(1)
const itemsPerPage = 8

// Computed Properties
const filteredProducts = computed(() => {
  return allProducts.value.filter((product) => {
    const { productType, priceRange } = currentFilters.value

    // Type filter
    const typeMatch = productType === 'all' || product.type === productType

    // Price filter
    const [minPriceStr, maxPriceStr] = priceRange.split('-')
    const minPrice = parseInt(minPriceStr) || 0
    const maxPrice = maxPriceStr === 'max' ? Infinity : parseInt(maxPriceStr) || Infinity
    const priceMatch =
      priceRange === 'all' || (product.price >= minPrice && product.price <= maxPrice)

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

// Watch for filter changes to reset pagination
watch(filteredProducts, () => {
  currentPage.value = 1
})

const showNotification = (message, type = 'success') => {
  const id = Date.now()
  notifications.value.push({ id, message, type })
  setTimeout(() => {
    notifications.value = notifications.value.filter((n) => n.id !== id)
  }, 3000)
}

const openProductModal = (product) => {
  selectedProduct.value = product
  isProductModalOpen.value = true
}

const closeProductModal = () => {
  isProductModalOpen.value = false
  selectedProduct.value = null
}

const closeAllPanels = () => {
  isCartPanelOpen.value = false
  isProductModalOpen.value = false
}

const handleAddToCart = (product) => {
  addToCart(product, 1)
  isCartPanelOpen.value = true
}

const handleAddToCartFromModal = ({ product, quantity }) => {
  addToCart(product, quantity)
  closeProductModal()
  isCartPanelOpen.value = true
}

const addToCart = (product, quantity) => {
  const existingItem = cart.value.find((item) => item.id === product.id)
  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.value.push({ ...product, quantity })
  }
  showNotification(`Đã thêm ${product.name} vào giỏ hàng!`)
}

const applyFilters = (filters) => {
  currentFilters.value = filters
}

const clearFilters = () => {
  currentFilters.value = { productType: 'all', priceRange: 'all' }
  if (productFilter.value) {
    productFilter.value.resetFilters()
  }
}

// pagination handled by BasePagination component (update:currentPage)

// Lifecycle Hooks
onMounted(() => {
  // Load cart from localStorage
  const savedCart = localStorage.getItem('hondaCart')
  if (savedCart) {
    cart.value = JSON.parse(savedCart)
  }
})

// Watch cart to save to localStorage
watch(
  cart,
  (newCart) => {
    localStorage.setItem('hondaCart', JSON.stringify(newCart))
  },
  { deep: true },
)
</script>
