<template>
     <aside id="filter-sidebar" class="w-64 flex-shrink-0">
        <div class="sticky top-[160px] bg-white p-5 rounded-xl shadow-lg border border-gray-100">
            <h3 class="text-xl font-bold mb-4 text-honda-red border-b pb-2">
                <i class="fas fa-filter mr-2"></i>Bộ Lọc Sản Phẩm
            </h3>

            <div class="mb-6">
                <h4 class="font-semibold mb-3 text-gray-700">Loại Sản phẩm</h4>
                <div class="space-y-2">
                    <label class="flex items-center text-sm cursor-pointer">
                        <input type="radio" name="product_type" value="all" v-model="selectedType" @change="emitFilters"
                            class="w-4 h-4 text-honda-red border-gray-300 focus:ring-honda-red">
                        <span class="ml-2 text-gray-600">Tất cả</span>
                    </label>
                    <label class="flex items-center text-sm cursor-pointer">
                        <input type="radio" name="product_type" value="phu-tung" v-model="selectedType" @change="emitFilters"
                            class="w-4 h-4 text-honda-red border-gray-300 focus:ring-honda-red">
                        <span class="ml-2 text-gray-600">Phụ tùng</span>
                    </label>
                    <label class="flex items-center text-sm cursor-pointer">
                        <input type="radio" name="product_type" value="hoa-chat" v-model="selectedType" @change="emitFilters"
                            class="w-4 h-4 text-honda-red border-gray-300 focus:ring-honda-red">
                        <span class="ml-2 text-gray-600">Hóa chất</span>
                    </label>
                </div>
            </div>

            <div class="mb-6">
                <h4 class="font-semibold mb-3 text-gray-700">Phạm vi giá (VNĐ)</h4>
                <div class="space-y-2" id="price-filters">
                     <label class="flex items-center text-sm cursor-pointer">
                        <input type="radio" name="price" value="all" v-model="selectedPrice" @change="emitFilters"
                            class="w-4 h-4 text-honda-red border-gray-300 focus:ring-honda-red">
                        <span class="ml-2 text-gray-600">Tất cả</span>
                    </label>
                    <label class="flex items-center text-sm cursor-pointer">
                        <input type="radio" name="price" value="0-300000" v-model="selectedPrice" @change="emitFilters"
                            class="w-4 h-4 text-honda-red border-gray-300 focus:ring-honda-red">
                        <span class="ml-2 text-gray-600">Dưới 300.000</span>
                    </label>
                    <label class="flex items-center text-sm cursor-pointer">
                        <input type="radio" name="price" value="300000-500000" v-model="selectedPrice" @change="emitFilters"
                            class="w-4 h-4 text-honda-red border-gray-300 focus:ring-honda-red">
                        <span class="ml-2 text-gray-600">300.000 - 500.000</span>
                    </label>
                    <label class="flex items-center text-sm cursor-pointer">
                        <input type="radio" name="price" value="500000-1000000" v-model="selectedPrice" @change="emitFilters"
                            class="w-4 h-4 text-honda-red border-gray-300 focus:ring-honda-red">
                        <span class="ml-2 text-gray-600">500.000 - 1.000.000</span>
                    </label>
                    <label class="flex items-center text-sm cursor-pointer">
                        <input type="radio" name="price" value="1000000-max" v-model="selectedPrice" @change="emitFilters"
                            class="w-4 h-4 text-honda-red border-gray-300 focus:ring-honda-red">
                        <span class="ml-2 text-gray-600">Trên 1.000.000</span>
                    </label>
                </div>
            </div>

            <button @click="$emit('clearFilters')"
                class="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition duration-200">
                Xóa Bộ Lọc
            </button>
        </div>
    </aside>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['filterChange', 'clearFilters']);

const selectedType = ref('all');
const selectedPrice = ref('all');

const emitFilters = () => {
    emit('filterChange', { 
        productType: selectedType.value, 
        priceRange: selectedPrice.value 
    });
};

const resetFilters = () => {
    selectedType.value = 'all';
    selectedPrice.value = 'all';
};

defineExpose({ resetFilters });
</script>
