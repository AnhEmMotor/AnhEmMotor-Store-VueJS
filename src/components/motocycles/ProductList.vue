<template>
    <div class="products-grid">
        <p v-if="products.length === 0" class="col-span-full text-center text-gray-500" style="grid-column: 1 / -1;">
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
import ProductCard from './ProductCard.vue';

defineProps({
    products: {
        type: Array,
        required: true
    }
});

const emit = defineEmits(['add-to-cart', 'view-detail']);
</script>
