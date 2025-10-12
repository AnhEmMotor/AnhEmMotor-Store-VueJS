<template>
  <div class="notification-container">
      <div v-for="notification in notifications" :key="notification.id" 
           :class="['notification', notification.type]">
        <i :class="['fas', notification.type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle']"></i>
        {{ notification.message }}
      </div>
  </div>

  <AppHeader :cartItemCount="cartItemCount" @toggle-cart="toggleCartPanel" />
  
  <CartPanel 
    :isOpen="isCartPanelOpen" 
    :cartItems="cart" 
    :total="cartTotal"
    @close="toggleCartPanel"
    @update-quantity="updateCartQuantity"
    @remove-item="removeFromCart"
  />

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
      <ProductFilter @filter-change="applyFilters" @clear-filters="clearFilters" ref="productFilter" />

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
               <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">&laquo; Trước</button>
                <button 
                  v-for="page in totalPages" 
                  :key="page" 
                  @click="changePage(page)"
                  :class="{ active: currentPage === page }">
                  {{ page }}
                </button>
               <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Sau &raquo;</button>
          </div>
      </main>
  </div>

  <AppFooter />
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
import ProductFilter from './ProductFilter.vue';
import ProductCard from './ProductCard.vue';
import CartPanel from './CartPanel.vue';
import ProductModal from './ProductModal.vue';
import { products as allProductsData } from './products-data.js';

// Reactive State
const allProducts = ref(allProductsData);
const cart = ref([]);
const isCartPanelOpen = ref(false);
const isProductModalOpen = ref(false);
const selectedProduct = ref(null);
const notifications = ref([]);
const productFilter = ref(null); // Template ref for filter component

// Filters State
const currentFilters = ref({
  productType: 'all',
  priceRange: 'all'
});

// Pagination State
const currentPage = ref(1);
const itemsPerPage = 8;


// Computed Properties
const filteredProducts = computed(() => {
  return allProducts.value.filter(product => {
    const { productType, priceRange } = currentFilters.value;
    
    // Type filter
    const typeMatch = productType === 'all' || product.type === productType;

    // Price filter
    const [minPriceStr, maxPriceStr] = priceRange.split('-');
    const minPrice = parseInt(minPriceStr) || 0;
    const maxPrice = maxPriceStr === 'max' ? Infinity : (parseInt(maxPriceStr) || Infinity);
    const priceMatch = priceRange === 'all' || (product.price >= minPrice && product.price <= maxPrice);

    return typeMatch && priceMatch;
  });
});

const totalPages = computed(() => {
    return Math.ceil(filteredProducts.value.length / itemsPerPage);
});

const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredProducts.value.slice(start, end);
});

const cartItemCount = computed(() => {
  return cart.value.reduce((total, item) => total + item.quantity, 0);
});

const cartTotal = computed(() => {
  return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0);
});

// Watch for filter changes to reset pagination
watch(filteredProducts, () => {
    currentPage.value = 1;
});


// Methods
const formatCurrency = (amount) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const showNotification = (message, type = 'success') => {
    const id = Date.now();
    notifications.value.push({ id, message, type });
    setTimeout(() => {
        notifications.value = notifications.value.filter(n => n.id !== id);
    }, 3000);
};

const toggleCartPanel = () => {
  isCartPanelOpen.value = !isCartPanelOpen.value;
};

const openProductModal = (product) => {
  selectedProduct.value = product;
  isProductModalOpen.value = true;
};

const closeProductModal = () => {
  isProductModalOpen.value = false;
  selectedProduct.value = null;
};

const closeAllPanels = () => {
    isCartPanelOpen.value = false;
    isProductModalOpen.value = false;
};

const handleAddToCart = (product) => {
    addToCart(product, 1);
    isCartPanelOpen.value = true;
};

const handleAddToCartFromModal = ({ product, quantity }) => {
    addToCart(product, quantity);
    closeProductModal();
    isCartPanelOpen.value = true;
};

const addToCart = (product, quantity) => {
  const existingItem = cart.value.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.value.push({ ...product, quantity });
  }
  showNotification(`Đã thêm ${product.name} vào giỏ hàng!`);
};

const removeFromCart = (productId) => {
  cart.value = cart.value.filter(item => item.id !== productId);
};

const updateCartQuantity = ({ productId, change }) => {
  const item = cart.value.find(item => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    }
  }
};

const applyFilters = (filters) => {
    currentFilters.value = filters;
};

const clearFilters = () => {
    currentFilters.value = { productType: 'all', priceRange: 'all' };
    if (productFilter.value) {
        productFilter.value.resetFilters();
    }
};

const changePage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};

// Lifecycle Hooks
onMounted(() => {
  // Load cart from localStorage
  const savedCart = localStorage.getItem('hondaCart');
  if (savedCart) {
    cart.value = JSON.parse(savedCart);
  }
});

// Watch cart to save to localStorage
watch(cart, (newCart) => {
  localStorage.setItem('hondaCart', JSON.stringify(newCart));
}, { deep: true });

</script>
