<template>
    <div class="filter-sidebar" :class="{ open: isOpen }">
         <div id="filter-sidebar-header" class="p-4 flex justify-between items-center border-b">
            <h3 class="text-lg font-semibold">Lọc sản phẩm</h3>
            <button @click="emit('close')" class="text-2xl">&times;</button>
        </div>

        <div class="filter-group">
            <h3 class="filter-group-title">Loại xe</h3>
            <div>
                <label class="checkbox-label" v-for="type in vehicleTypes" :key="type.value">
                    <input type="checkbox" class="checkbox-input" :value="type.value" v-model="selectedTypes">
                    <span>{{ type.label }}</span>
                </label>
            </div>
        </div>

        <div class="filter-group">
            <h3 class="filter-group-title">Giá</h3>
            <div class="flex items-center space-x-2 mb-4 text-sm">
                <input type="text" :value="formatPrice(currentMinPrice)" placeholder="Tối thiểu"
                    class="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800" readonly>
                <span>-</span>
                <input type="text" :value="formatPrice(currentMaxPrice)" placeholder="Tối đa"
                    class="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800" readonly>
            </div>
            <div ref="slider" class="relative h-2 bg-gray-300 rounded-full mb-4 cursor-pointer">
                <div class="absolute h-full bg-gray-800 rounded-full" :style="{ left: minHandlePos + '%', right: (100 - maxHandlePos) + '%' }"></div>
                <div ref="minHandle" class="absolute w-5 h-5 -mt-1.5 bg-gray-800 rounded-full cursor-pointer" :style="{ left: minHandlePos + '%' }" @mousedown="startDrag('min')"></div>
                <div ref="maxHandle" class="absolute w-5 h-5 -mt-1.5 bg-gray-800 rounded-full cursor-pointer" :style="{ left: maxHandlePos + '%' }" @mousedown="startDrag('max')"></div>
            </div>
            <button @click="applyFilters"
                class="w-full bg-gray-800 text-white font-semibold py-2 rounded-md hover:bg-gray-900 transition-colors duration-200">
                Lọc
            </button>
        </div>

        <div class="filter-group">
            <h3 class="filter-group-title">Dung tích động cơ</h3>
            <div>
                <label class="checkbox-label" v-for="cc in ccRanges" :key="cc.value">
                    <input type="checkbox" class="checkbox-input" :value="cc.value" v-model="selectedCCs">
                    <span>{{ cc.label }}</span>
                </label>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

defineProps({
    isOpen: Boolean
});

const emit = defineEmits(['update-filters', 'close']);

const vehicleTypes = [
    { value: 'xe-ga', label: 'Xe ga' },
    { value: 'xe-so', label: 'Xe số' },
    { value: 'xe-con-tay', label: 'Xe côn tay' },
    { value: 'xe-the-thao', label: 'Xe phân khối lớn' },
    { value: 'xe-dien', label: 'Xe điện' },
];

const ccRanges = [
    { value: '<125', label: 'Dưới 125 cc' },
    { value: '125-150', label: '125 - 150 cc' },
    { value: '150-250', label: '150 - 250 cc' },
    { value: '>250', label: 'Trên 250 cc' },
];

const selectedTypes = ref([]);
const selectedCCs = ref([]);

const MAX_PRICE = 1300000000;
const currentMinPrice = ref(0);
const currentMaxPrice = ref(MAX_PRICE);
const minHandlePos = ref(0);
const maxHandlePos = ref(100);

const slider = ref(null);
let activeHandle = null;

function startDrag(handle) {
    activeHandle = handle;
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
}

function onDrag(e) {
    if (!activeHandle || !slider.value) return;
    const sliderRect = slider.value.getBoundingClientRect();
    let newPosition = e.clientX - sliderRect.left;
    let newPercentage = (newPosition / sliderRect.width) * 100;
    
    newPercentage = Math.max(0, Math.min(100, newPercentage));

    if (activeHandle === 'min') {
        if (newPercentage < maxHandlePos.value) {
            minHandlePos.value = newPercentage;
            currentMinPrice.value = Math.round((newPercentage / 100) * MAX_PRICE);
        }
    } else { // max handle
        if (newPercentage > minHandlePos.value) {
            maxHandlePos.value = newPercentage;
            currentMaxPrice.value = Math.round((newPercentage / 100) * MAX_PRICE);
        }
    }
}

function stopDrag() {
    activeHandle = null;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
}


function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ';
}

function applyFilters() {
    emit('update-filters', {
        types: selectedTypes.value,
        ccs: selectedCCs.value,
        minPrice: currentMinPrice.value,
        maxPrice: currentMaxPrice.value,
    });
    emit('close'); // Close sidebar on mobile after applying
}

// Watch for changes in checkboxes and apply filters automatically
watch([selectedTypes, selectedCCs], () => {
    // We can make it apply automatically, but the button provides a better UX for price range.
    // For now, let's stick to the button click to be consistent with the original design.
});
</script>
