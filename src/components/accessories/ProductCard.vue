<template>
  <div class="product-card" @click="$emit('viewDetails', product)">
      <div class="product-image-container">
          <img :src="product.image" :alt="product.name">
      </div>
      <div class="product-info">
          <div class="product-name">{{ product.name }}</div>
          <div class="product-price">{{ formatCurrency(product.price) }} VNĐ</div>
          <div class="color-options">
              <span v-for="color in product.colors" :key="color" class="color-dot" :style="{ backgroundColor: color }"></span>
          </div>
          <button class="add-to-cart-btn" @click.stop="$emit('addToCart', product)">
              <i class="fas fa-shopping-cart"></i>
              Thêm vào giỏ hàng
          </button>
      </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
});
defineEmits(['addToCart', 'viewDetails']);

const formatCurrency = (amount) => {
    if (typeof amount !== 'number') return amount;
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
</script>
