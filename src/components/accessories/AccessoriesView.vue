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
            <div class="product-grid">
                <ProductCard 
                    v-for="product in paginatedProducts" 
                    :key="product.id"
                    :product="product"
                    @add-to-cart="$emit('addToCart', product)"
                    @view-details="openProductDetailModal"
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

    <ProductDetailModal
      v-if="selectedProduct"
      :is-open="isModalOpen"
      :product="selectedProduct"
      @close="closeProductDetailModal"
      @add-to-cart="handleAddToCartFromModal"
    />

    <div 
      v-if="isModalOpen" 
      class="backdrop-overlay active" 
      @click="closeProductDetailModal">
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { products } from '../../data/products.js';
import CategoryNav from './CategoryNav.vue';
import FilterSidebar from './FilterSidebar.vue';
import ProductCard from './ProductCard.vue';
import Pagination from './Pagination.vue';
import ProductDetailModal from './ProductDetailModal.vue';

const emit = defineEmits(['addToCart']);
const allProducts = ref(products);

// Filtering Logic
const filters = ref({
    productType: 'all',
    priceRange: 'all',
    color: 'all'
});

const clearFilters = () => {
    filters.value = {
        productType: 'all',
        priceRange: 'all',
        color: 'all'
    };
};

const filteredProducts = computed(() => {
    return allProducts.value.filter(product => {
        // Product Type Filter
        const typeMatch = filters.value.productType === 'all' || product.type === filters.value.productType;

        // Price Range Filter
        const [minPriceStr, maxPriceStr] = filters.value.priceRange.split('-');
        const minPrice = minPriceStr ? parseInt(minPriceStr) : 0;
        const maxPrice = maxPriceStr === 'max' ? Infinity : (maxPriceStr ? parseInt(maxPriceStr) : Infinity);
        const priceMatch = filters.value.priceRange === 'all' || (product.price >= minPrice && product.price <= maxPrice);

        // Color Filter
        const colorMatch = filters.value.color === 'all' || (product.colors && product.colors.includes(filters.value.color));
        
        return typeMatch && priceMatch && colorMatch;
    });
});

// Pagination Logic
const ITEMS_PER_PAGE = 8;
const currentPage = ref(1);

const totalPages = computed(() => {
    return Math.ceil(filteredProducts.value.length / ITEMS_PER_PAGE);
});

const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredProducts.value.slice(start, end);
});

const handlePageChange = (page) => {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Reset to page 1 when filters change
watch(filters, () => {
    currentPage.value = 1;
}, { deep: true });

// Product Detail Modal Logic
const isModalOpen = ref(false);
const selectedProduct = ref(null);

const openProductDetailModal = (product) => {
    selectedProduct.value = product;
    isModalOpen.value = true;
    document.body.style.overflow = 'hidden';
}

const closeProductDetailModal = () => {
    isModalOpen.value = false;
    selectedProduct.value = null;
    document.body.style.overflow = '';
}

const handleAddToCartFromModal = (quantity) => {
  emit('addToCart', selectedProduct.value, quantity);
  closeProductDetailModal();
}
</script>

