<template>
  <CategoryNav />

  <div class="container mx-auto px-4 mt-8 flex gap-8">
    <FilterSidebar
      id="filter-sidebar"
      :products="allProducts"
      v-model="filters"
      @clear-filters="clearFilters"
    />
    <main class="flex-grow">
      <div class="grid gap-6 grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
        <ProductCard
          v-for="product in paginatedProducts"
          :key="product.id"
          :product="product"
          @add-to-cart="handleAddToCart"
          @view-details="() => {}"
        />
      </div>

      <Pagination
        v-if="totalPages > 1"
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="handlePageChange"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { products } from '../data/products.js'
import CategoryNav from '@/components/accessories/CategoryNav.vue'
import FilterSidebar from '@/components/accessories/FilterSidebar.vue'
import ProductCard from '@/components/accessories/ProductCard.vue'
import Pagination from '@/components/ui/BasePagination.vue'
import { useCart } from '@/composables/useCart'

const allProducts = ref(products)

// Filtering Logic
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
    // Product Type Filter
    const typeMatch =
      filters.value.productType === 'all' || product.type === filters.value.productType

    // Price Range Filter
    const [minPriceStr, maxPriceStr] = filters.value.priceRange.split('-')
    const minPrice = minPriceStr ? parseInt(minPriceStr) : 0
    const maxPrice =
      maxPriceStr === 'max' ? Infinity : maxPriceStr ? parseInt(maxPriceStr) : Infinity
    const priceMatch =
      filters.value.priceRange === 'all' || (product.price >= minPrice && product.price <= maxPrice)

    // Color Filter
    const colorMatch =
      filters.value.color === 'all' ||
      (product.colors && product.colors.includes(filters.value.color))

    return typeMatch && priceMatch && colorMatch
  })
})

// Pagination Logic
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

// Reset to page 1 when filters change
watch(
  filters,
  () => {
    currentPage.value = 1
  },
  { deep: true },
)

// Cart
const { addItem } = useCart()

const handleAddToCart = (product) => {
  // For now we simply add to local cart via composable. Easy to replace with API later.
  addItem(product, 1)
}
</script>
