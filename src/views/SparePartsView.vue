<template>
  <div class="notification-container">
    <div
      v-for="notification in notifications"
      :key="notification.id"
      :class="['notification', notification.type]"
    >
      <i
        :class="[
          'fas',
          notification.type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle',
        ]"
      ></i>
      {{ notification.message }}
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
    :class="['backdrop-overlay', { active: isCartPanelOpen || isProductModalOpen }]"
    @click="closeAllPanels"
  ></div>

  <!-- Category Navigation -->
  <div class="category-nav">
    <div class="container mx-auto px-4 text-center overflow-x-auto whitespace-nowrap">
      <a href="#">Phụ kiện</a>
      <a href="#" class="active">Phụ tùng</a>
    </div>
  </div>

  <div class="container mx-auto px-4 mt-8 flex gap-8">
    <ProductFilter
      @filter-change="applyFilters"
      @clear-filters="clearFilters"
      ref="productFilter"
    />

    <main class="flex-grow">
      <div id="product-list" class="product-grid">
        <ProductCard
          v-for="product in paginatedProducts"
          :key="product.id"
          :product="product"
          @add-to-cart="handleAddToCart"
          @view-details="openProductModal"
        />
      </div>
      <div class="pagination-container flex justify-center items-center space-x-2 mt-8">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
          &laquo; Trước
        </button>
        <button
          v-for="page in totalPages"
          :key="page"
          @click="changePage(page)"
          :class="{ active: currentPage === page }"
        >
          {{ page }}
        </button>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
          Sau &raquo;
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import ProductFilter from '@/components/spare-parts/ProductFilter.vue'
import ProductCard from '@/components/spare-parts/ProductCard.vue'
import ProductModal from '@/components/spare-parts/ProductModal.vue'
import { products as allProductsData } from '@/components/spare-parts/products-data.js'

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

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

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
