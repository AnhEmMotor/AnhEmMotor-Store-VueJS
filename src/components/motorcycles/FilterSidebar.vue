<template>
  <!-- Desktop sidebar (sticky) -->
  <aside class="hidden lg:block w-64 mb-8">
    <div
      class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-y-auto sticky top-24 p-5"
    >
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold text-red-600 flex items-center gap-2">
          <i class="fas fa-filter"></i>
          <span>Bộ Lọc Sản Phẩm</span>
        </h3>
      </div>

      <div class="mb-6">
        <h4 class="font-semibold mb-3 text-gray-700">Loại xe</h4>
        <div class="space-y-3">
          <label
            class="flex items-center text-sm cursor-pointer"
            v-for="type in vehicleTypes"
            :key="type.value"
          >
            <input
              type="checkbox"
              class="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-600"
              :value="type.value"
              v-model="selectedTypes"
            />
            <span class="ml-3 text-gray-600">{{ type.label }}</span>
          </label>
        </div>
      </div>

      <div class="mb-6">
        <h4 class="font-semibold mb-3 text-gray-700">Giá</h4>
        <div class="flex items-center gap-2 mb-4 text-sm pr-2">
          <input
            type="text"
            :value="formatPrice(currentMinPrice)"
            placeholder="Tối thiểu"
            class="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            readonly
          />
          <span class="text-sm text-gray-600">-</span>
          <input
            type="text"
            :value="formatPrice(currentMaxPrice)"
            placeholder="Tối đa"
            class="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            readonly
          />
        </div>

        <div class="mb-4">
          <input
            type="range"
            :min="0"
            :max="MAX_PRICE"
            step="100000"
            v-model.number="currentMinPrice"
            @input="onRangeInput('min')"
            class="w-full"
          />
          <input
            type="range"
            :min="0"
            :max="MAX_PRICE"
            step="100000"
            v-model.number="currentMaxPrice"
            @input="onRangeInput('max')"
            class="w-full mt-2"
          />
        </div>

        <button
          @click="applyFilters"
          class="w-full bg-gray-800 text-white font-semibold py-2 rounded-md hover:bg-gray-900 transition-colors duration-200"
        >
          Lọc
        </button>
      </div>

      <div class="mb-6">
        <h4 class="font-semibold mb-3 text-gray-700">Dung tích động cơ</h4>
        <div class="space-y-3">
          <label
            class="flex items-center text-sm cursor-pointer"
            v-for="cc in ccRanges"
            :key="cc.value"
          >
            <input
              type="checkbox"
              class="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-600"
              :value="cc.value"
              v-model="selectedCCs"
            />
            <span class="ml-3 text-gray-600">{{ cc.label }}</span>
          </label>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, watch } from 'vue'

defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['update-filters', 'close'])

const vehicleTypes = [
  { value: 'xe-ga', label: 'Xe ga' },
  { value: 'xe-so', label: 'Xe số' },
  { value: 'xe-con-tay', label: 'Xe côn tay' },
  { value: 'xe-the-thao', label: 'Xe phân khối lớn' },
  { value: 'xe-dien', label: 'Xe điện' },
]

const ccRanges = [
  { value: '<125', label: 'Dưới 125 cc' },
  { value: '125-150', label: '125 - 150 cc' },
  { value: '150-250', label: '150 - 250 cc' },
  { value: '>250', label: 'Trên 250 cc' },
]

const selectedTypes = ref([])
const selectedCCs = ref([])

const MAX_PRICE = 1300000000
const currentMinPrice = ref(0)
const currentMaxPrice = ref(MAX_PRICE)
// slider replaced by native input ranges; remove custom handle state

function onRangeInput(which) {
  // Ensure min is not greater than max
  if (currentMinPrice.value > currentMaxPrice.value) {
    if (which === 'min') {
      currentMaxPrice.value = currentMinPrice.value
    } else {
      currentMinPrice.value = currentMaxPrice.value
    }
  }
}

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ'
}

function applyFilters() {
  emit('update-filters', {
    types: selectedTypes.value,
    ccs: selectedCCs.value,
    minPrice: currentMinPrice.value,
    maxPrice: currentMaxPrice.value,
  })
  emit('close') // Close sidebar on mobile after applying
}

// Watch for changes in checkboxes and apply filters automatically
watch([selectedTypes, selectedCCs], () => {
  // We can make it apply automatically, but the button provides a better UX for price range.
  // For now, let's stick to the button click to be consistent with the original design.
})
</script>
