<template>
  <div class="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <p v-if="products.length === 0" class="col-span-full text-center text-gray-500">
      Không tìm thấy sản phẩm phù hợp.
    </p>
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @add-to-cart="emit('add-to-cart', product)"
      @view-detail="emit('view-detail', product)"
    />
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue'

defineProps({
  products: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['add-to-cart', 'view-detail'])
</script>
