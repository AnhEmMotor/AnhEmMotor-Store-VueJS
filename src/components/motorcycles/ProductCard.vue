<template>
    <div class="product-card">
        <div class="product-info">
            <a href="#" @click.prevent="emit('view-detail')" class="product-name">
                <h3>{{ product.name }}</h3>
            </a>
        </div>
        <div class="product-image-box" @click="emit('view-detail')" style="cursor: pointer;">
            <img :src="product.image" :alt="product.name">
        </div>
        <p class="product-price">Giá: {{ formatPrice(product.price) }}</p>
        <button class="add-to-cart" @click="emit('add-to-cart')">
            Thêm vào giỏ
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['add-to-cart', 'view-detail']);

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}
</script>
