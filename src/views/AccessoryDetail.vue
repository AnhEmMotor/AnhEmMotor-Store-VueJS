<template>
  <div v-if="product" class="container mx-auto px-4 py-8 mt-4 min-h-screen">
    <nav class="flex text-sm text-gray-500 mb-6 gap-2">
      <router-link to="/" class="hover:text-red-600">Trang chủ</router-link>
      <span>/</span>
      <router-link to="/accessories" class="hover:text-red-600">Phụ kiện</router-link>
      <span>/</span>
      <span class="text-gray-900 font-medium">{{ product.name }}</span>
    </nav>

    <div class="flex flex-col lg:row gap-12 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-16">
      <div class="flex flex-col md:flex-row gap-12">
        <div class="w-full md:w-1/2">
          <div class="bg-gray-50 rounded-2xl p-10 flex items-center justify-center border border-gray-50">
            <img :src="product.image" :alt="product.name" class="max-w-full h-auto object-contain hover:scale-105 transition-transform duration-500" />
          </div>
        </div>

        <div class="w-full md:w-1/2 flex flex-col">
          <span class="inline-block w-fit px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
            {{ product.type }}
          </span>
          <h1 class="text-3xl font-extrabold text-gray-900 mb-4 leading-tight">{{ product.name }}</h1>
          <div class="text-3xl font-bold text-[#de0000] mb-8">
            {{ formatCurrency(product.price) }} VNĐ
          </div>

          <div class="space-y-6 flex-grow">
            <div>
              <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Mô tả sản phẩm</h3>
              <p class="text-gray-600 leading-relaxed text-lg">{{ product.description }}</p>
            </div>

            <div class="pt-6 border-t border-gray-100">
              <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Số lượng</h3>
              <div class="flex items-center gap-4">
                <div class="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden w-fit">
                  <button @click="changeQty(-1)" class="px-4 py-2 bg-gray-50 hover:bg-gray-200 transition-colors border-r border-gray-200">
                    <i class="fas fa-minus text-gray-600"></i>
                  </button>
                  <input type="number" v-model.number="quantity" class="w-16 text-center font-bold text-lg focus:outline-none" min="1" />
                  <button @click="changeQty(1)" class="px-4 py-2 bg-gray-50 hover:bg-gray-200 transition-colors border-l border-gray-200">
                    <i class="fas fa-plus text-gray-600"></i>
                  </button>
                </div>
                <span class="text-gray-400 text-sm italic">Sẵn có trong kho</span>
              </div>
            </div>

            <div class="pt-8">
              <button
                @click="handleAddToCart"
                class="w-full md:w-auto px-12 py-4 bg-[#de0000] text-white rounded-xl font-bold text-lg hover:bg-black transition-all transform active:scale-95 shadow-lg shadow-red-200 flex items-center justify-center gap-3"
              >
                <i class="fas fa-cart-plus"></i> THÊM VÀO GIỎ HÀNG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-20">
      <div class="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
        <h2 class="text-2xl font-bold text-gray-800 uppercase tracking-tight">Sản phẩm tương tự</h2>
        <router-link to="/accessories" class="text-red-600 font-semibold hover:underline">Xem tất cả</router-link>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <ProductCard
          v-for="item in relatedProducts"
          :key="item.id"
          :product="item"
          @add-to-cart="quickAddToCart"
          @view-details="goToRelatedDetail"
        />
      </div>
    </div>
  </div>

  <div v-else class="flex justify-center items-center h-screen text-gray-400">
    <div class="animate-pulse text-xl font-medium">Đang tìm dữ liệu phụ kiện...</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products } from '../data/products.js' // Đường dẫn dữ liệu phụ kiện
import { useCart } from '@/composables/useCart'
import ProductCard from '@/components/accessories/ProductCard.vue'

const route = useRoute()
const router = useRouter()
const { addItem } = useCart()

const product = ref(null)
const quantity = ref(1)

const formatCurrency = (val) => val?.toLocaleString('vi-VN')

// Logic chọn số lượng
const changeQty = (val) => {
  const newQty = quantity.value + val
  if (newQty >= 1) quantity.value = newQty
}

// Lấy sản phẩm hiện tại và lọc sản phẩm liên quan
const loadData = () => {
  const id = route.params.id
  product.value = products.find(p => p.id === id)
  quantity.value = 1 // Reset số lượng về 1 khi đổi sản phẩm
}

const relatedProducts = computed(() => {
  if (!product.value) return []
  return products
    .filter(p => p.type === product.value.type && p.id !== product.value.id)
    .slice(0, 4) // Lấy tối đa 4 sản phẩm cùng loại
})

const handleAddToCart = () => {
  if (product.value) {
    addItem(product.value, quantity.value)
    alert(`Đã thêm ${quantity.value} sản phẩm vào giỏ hàng!`)
  }
}

// Click vào sản phẩm liên quan
const goToRelatedDetail = (p) => {
  router.push({ name: 'accessories-details', params: { id: p.id } })
}

const quickAddToCart = (p) => addItem(p, 1)

onMounted(loadData)
watch(() => route.params.id, loadData)
</script>
