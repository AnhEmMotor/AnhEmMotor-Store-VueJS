<template>
  <div
    class="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform transition-all hover:-translate-y-2 cursor-pointer flex flex-col"
    @click="$emit('viewDetails', product)"
  >
    <div class="relative overflow-hidden h-56 md:h-56">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-contain p-5 transition-transform duration-300 group-hover:scale-110"
      />
    </div>

    <div class="p-4 flex flex-col flex-1">
      <div class="text-base font-semibold text-gray-800 mb-2 line-clamp-2">{{ product.name }}</div>
      <div class="text-lg font-bold text-[#de0000] mb-4">
        {{ formatCurrency(product.price) }} VNĐ
      </div>

      <button
        class="w-full bg-gradient-to-r from-[#de0000] to-[#b30000] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:scale-105 transition transform mt-auto"
        @click.stop="$emit('addToCart', product)"
      >
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
    required: true,
  },
})

defineEmits(['addToCart', 'viewDetails'])

const formatCurrency = (amount) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
</script>
