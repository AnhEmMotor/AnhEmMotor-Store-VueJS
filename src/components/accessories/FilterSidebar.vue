<template>
  <aside class="w-64 flex-shrink-0">
    <div class="sticky top-36 bg-white p-5 rounded-2xl shadow-lg border border-gray-100">
      <h3 class="text-xl font-bold mb-4 text-[#de0000] border-b pb-2">
        <i class="fas fa-filter mr-2"></i>Bộ Lọc Sản Phẩm
      </h3>

      <!-- Category Filter -->
      <div class="mb-6">
        <h4 class="font-semibold mb-3 text-gray-700">Danh mục</h4>
        <div class="space-y-2">
          <label
            class="flex items-center text-sm cursor-pointer"
            v-for="cat in productTypes"
            :key="cat.value"
          >
            <input
              type="radio"
              name="product_type"
              :value="cat.value"
              :checked="modelValue.productType === cat.value"
              @change="updateFilter('productType', cat.value)"
              class="w-4 h-4 text-[#de0000] border-gray-300 focus:ring-[#de0000]"
            />
            <span class="ml-2 text-gray-600">{{ cat.label }}</span>
          </label>
        </div>
      </div>

      <!-- Price Filter -->
      <div class="mb-6">
        <h4 class="font-semibold mb-3 text-gray-700">Phạm vi giá (VNĐ)</h4>
        <div class="space-y-2">
          <label
            class="flex items-center text-sm cursor-pointer"
            v-for="range in priceRanges"
            :key="range.value"
          >
            <input
              type="radio"
              name="price"
              :value="range.value"
              :checked="modelValue.priceRange === range.value"
              @change="updateFilter('priceRange', range.value)"
              class="w-4 h-4 text-honda-red border-gray-300 focus:ring-honda-red"
            />
            <span class="ml-2 text-gray-600">{{ range.label }}</span>
          </label>
        </div>
      </div>

      <!-- Color Filter -->
      <div class="mb-6">
        <h4 class="font-semibold mb-3 text-gray-700">Màu sắc</h4>
        <div class="flex flex-wrap gap-2">
          <button
            class="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs"
            :class="
              modelValue.color === 'all'
                ? 'border-[#de0000] shadow-[0_0_0_6px_rgba(222,0,0,0.12)]'
                : 'border-gray-300'
            "
            @click="updateFilter('color', 'all')"
          >
            <i v-if="modelValue.color === 'all'" class="fas fa-check text-xs text-[#de0000]"></i>
          </button>

          <button
            v-for="color in availableColors"
            :key="color"
            :style="{ backgroundColor: color }"
            class="w-6 h-6 rounded-full border-2"
            :class="
              modelValue.color === color
                ? 'border-[#de0000] shadow-[0_0_0_6px_rgba(222,0,0,0.12)]'
                : 'border-gray-300'
            "
            @click="updateFilter('color', color)"
          ></button>
        </div>
      </div>

      <button
        @click="$emit('clearFilters')"
        class="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition duration-200"
      >
        Xóa Bộ Lọc
      </button>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  products: Array,
  modelValue: Object,
})
const emit = defineEmits(['update:modelValue', 'clearFilters'])

const updateFilter = (key, value) => {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}

const productTypes = [
  { value: 'all', label: 'Tất cả Phụ kiện' },
  { value: 'trang-phuc', label: 'Trang Phục' },
  { value: 'mu-bao-hiem', label: 'Mũ bảo hiểm' },
]

const priceRanges = [
  { value: 'all', label: 'Tất cả' },
  { value: '0-300000', label: 'Dưới 300.000' },
  { value: '300000-500000', label: '300.000 - 500.000' },
  { value: '500000-1000000', label: '500.000 - 1.000.000' },
  { value: '1000000-max', label: 'Trên 1.000.000' },
]

const availableColors = computed(() => {
  const colors = new Set()
  props.products.forEach((p) => {
    if (p.colors) {
      p.colors.forEach((c) => colors.add(c))
    }
  })
  return Array.from(colors)
})
</script>
