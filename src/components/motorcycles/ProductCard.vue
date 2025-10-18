<template>
  <div
    class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all w-full max-w-xs"
  >
    <div class="p-4">
      <a
        href="#"
        @click.prevent="emit('view-detail')"
        class="block text-gray-800 font-semibold truncate"
      >
        <h3 class="text-lg">{{ product.name }}</h3>
      </a>
    </div>
    <div class="flex items-center justify-center p-2 cursor-pointer" @click="emit('view-detail')">
      <img :src="product.image" :alt="product.name" class="w-full h-36 object-contain" />
    </div>
    <div class="p-4 text-center">
      <p class="text-gray-900 font-bold">{{ formatPrice(product.price) }}</p>
      <button
        class="mt-3 bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700"
        @click="emit('add-to-cart')"
      >
        Thêm vào giỏ
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

const emit = defineEmits(['add-to-cart', 'view-detail'])

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}
</script>
