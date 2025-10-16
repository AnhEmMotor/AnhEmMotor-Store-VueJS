<template>
    <div class="cart-modal" v-show="isOpen">
        <div class="cart-modal-content">
            <div class="cart-modal-header">
                <h2><i class="fas fa-shopping-cart"></i> Giỏ hàng</h2>
                <button class="close-cart-modal" @click="emit('close')">&times;</button>
            </div>
            <div class="cart-modal-body">
                <div id="full-cart-items">
                    <div v-if="cart.length === 0" class="text-center py-8 text-gray-500">
                        <i class="fas fa-shopping-cart" style="font-size: 4rem; opacity: 0.3; margin-bottom: 1rem;"></i>
                        <p>Giỏ hàng của bạn đang trống</p>
                    </div>
                    <div v-else>
                        <div v-for="item in cart" :key="item.id" class="cart-item" style="display: flex; align-items: center; margin-bottom: 15px; padding: 10px; border: 1px solid #eee; border-radius: 8px;">
                            <img :src="item.image" :alt="item.name" style="width: 80px; height: 80px; object-fit: cover; border-radius: 5px;">
                            <div style="flex: 1; margin-left: 15px;">
                                <h4 style="margin: 0 0 5px 0; font-size: 16px;">{{ item.name }}</h4>
                                <p style="margin: 0; color: #de0000; font-weight: bold;">{{ formatPrice(item.price) }}</p>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <button @click="updateQty(item.id, item.quantity - 1)" style="background: #f0f0f0; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">-</button>
                                <span style="font-weight: bold; min-width: 30px; text-align: center;">{{ item.quantity }}</span>
                                <button @click="updateQty(item.id, item.quantity + 1)" style="background: #f0f0f0; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">+</button>
                                <button @click="emit('remove-from-cart', item.id)" style="background: #ff4444; color: white; border: none; padding: 5px 8px; border-radius: 3px; cursor: pointer; margin-left: 10px;">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cart-modal-footer">
                <h3>Tổng cộng: <span id="modal-total-amount">{{ formatPrice(totalAmount) }}</span></h3>
                <div class="button-group">
                    <button class="btn-continue-shopping bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded" @click="emit('close')">Tiếp tục mua sắm</button>
                    <a href="#">
                        <button class="cart-btn view-cart">Xem giỏ hàng</button>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    isOpen: Boolean,
    cart: Array,
});

const emit = defineEmits(['close', 'update-quantity', 'remove-from-cart']);

const totalAmount = computed(() => {
    return props.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
});

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

function updateQty(productId, newQuantity) {
    emit('update-quantity', { productId, newQuantity });
}
</script>
