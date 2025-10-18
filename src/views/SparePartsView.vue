<template>
  <!-- notifications removed from this view; handled globally or elsewhere -->

  <!-- ProductModal removed from this view per requirement -->

  <div
    id="backdrop-overlay"
    :class="[isCartPanelOpen ? 'fixed inset-0 bg-black/60 z-40' : 'hidden']"
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
import { ref, computed, watch } from 'vue'
import { useCart } from '@/composables/useCart.js'
import ProductFilter from '@/components/spare-parts/ProductFilter.vue'
import ProductCard from '@/components/spare-parts/ProductCard.vue'
import BasePagination from '@/components/ui/BasePagination.vue'
import { products as allProductsData } from '@/components/spare-parts/products-data.js'
import CategoryNav from '@/components/layout/CategoryNav.vue'

// Reactive State
const allProducts = ref(allProductsData)
const { addItem } = useCart()
const isCartPanelOpen = ref(false)
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

// notifications are handled elsewhere; local view no longer shows toasts on add

// product modal handled elsewhere (removed from this view)

const closeAllPanels = () => {
  isCartPanelOpen.value = false
}

const handleAddToCart = (product) => {
  addItem(product, 1)
}

// handleAddToCartFromModal removed (no modal in this view)

// addToCart logic is handled by useCart.addItem; local helper removed

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

// Lifecycle Hooks (cart persistence handled by useCart composable)
</script>
