<template>
  <div class="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
    <div
      :class="[
        'w-[90%] max-w-lg max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-auto transition-all duration-300 transform',
        isOpen
          ? 'opacity-100 scale-100 pointer-events-auto'
          : 'opacity-0 scale-95 pointer-events-none',
      ]"
    >
      <div
        class="flex items-center justify-between p-6 border-b bg-gradient-to-r from-[#de0000] to-[#b30000] rounded-t-2xl"
      >
        <h3 class="text-xl font-bold text-white">{{ product.name }}</h3>
        <button
          @click="$emit('close')"
          class="text-white text-2xl hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="p-6">
        <div class="text-center mb-6">
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-80 object-contain mb-4 bg-gray-100 rounded-xl"
          />
        </div>

        <div class="text-center mb-6">
          <p class="text-[#de0000] font-bold text-3xl mb-4">
            Giá: {{ formatCurrency(product.price) }} VNĐ
          </p>
          <p class="text-gray-700 mb-6 leading-relaxed">{{ product.description }}</p>
        </div>

        <div class="mb-6" v-if="product.colors && product.colors.length > 0">
          <h4 class="font-semibold mb-3 text-center">Màu sắc có sẵn:</h4>
          <div class="flex justify-center space-x-3 mb-6">
            <span
              v-for="color in product.colors"
              :key="color"
              class="w-8 h-8 rounded-full border-2 border-gray-300"
              :style="{ backgroundColor: color }"
            ></span>
          </div>
        </div>

        <div class="flex items-center justify-center mb-6">
          <label class="mr-3 font-semibold">Số lượng:</label>
          <div class="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
            <button class="px-3 py-1 hover:bg-gray-100" @click="quantity > 1 ? quantity-- : 1">
              -
            </button>
            <input
              type="number"
              v-model.number="quantity"
              min="1"
              class="w-16 text-center border-none outline-none"
            />
            <button class="px-3 py-1 hover:bg-gray-100" @click="quantity++">+</button>
          </div>
        </div>

        <button
          @click="$emit('addToCart', quantity)"
          class="bg-gradient-to-r from-[#de0000] to-[#b30000] text-white w-full py-4 rounded-xl text-lg font-semibold hover:from-red-700 hover:to-red-800 transition duration-300 transform hover:scale-105"
        >
          <i class="fas fa-shopping-cart mr-2"></i> Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  product: {
    type: Object,
    required: true,
  },
  isOpen: Boolean,
})
defineEmits(['close', 'addToCart'])

const quantity = ref(1)

const formatCurrency = (amount) => {
  if (typeof amount !== 'number') return amount
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
</script>
