<template>
    <div class="product-detail-modal" :class="{ show: isOpen }">
        <div v-if="product" class="product-detail-content">
            <button class="close-detail-modal" @click="emit('close')">&times;</button>
            <div class="row">
                <div class="col-md-6 text-center">
                    <img :src="product.image" :alt="product.name">
                </div>
                <div class="col-md-6">
                    <h2>{{ product.name }}</h2>
                    <h4 class="price">{{ formatPrice(product.price) }}</h4>
                    <p>{{ product.desc }}</p>
                    
                    <button @click="addToCartAndClose" class="add-to-cart mt-3">Thêm vào giỏ</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    isOpen: Boolean,
    product: Object
});

const emit = defineEmits(['close', 'add-to-cart']);

function formatPrice(price) {
    if (typeof price !== 'number') return '';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

function addToCartAndClose() {
    if (props.product) {
        emit('add-to-cart', props.product);
    }
    emit('close');
}
</script>
