<template>
    <div id="cart-panel" :class="{ open: isOpen }">
        <div class="flex justify-between items-center p-4 border-b bg-gradient-to-r from-gray-50 to-white">
            <h3 class="text-xl font-bold flex items-center gap-2">
                <i class="fas fa-shopping-cart text-honda-red"></i>
                Giỏ hàng của bạn
            </h3>
            <button id="close-cart-panel" @click="$emit('close')" class="text-gray-700 text-2xl hover:text-honda-red transition-colors">
                <i class="fas fa-times"></i>
            </button>
        </div>

        <div id="cart-items" class="flex-grow overflow-y-auto p-4">
            <div v-if="cartItems.length === 0" id="empty-cart-message" class="text-center py-8 text-gray-500">
                <i class="fas fa-shopping-cart text-4xl mb-4 opacity-30"></i>
                <p>Giỏ hàng của bạn đang trống.</p>
            </div>
            <div v-else>
                 <div v-for="item in cartItems" :key="item.id" class="cart-item">
                    <img :src="item.image" :alt="item.name">
                    <div class="cart-item-details">
                        <div class="cart-item-name">{{ item.name }}</div>
                        <div class="cart-item-price">{{ formatCurrency(item.price * item.quantity) }} VNĐ</div>
                        <div class="cart-item-quantity">
                            <button @click="$emit('updateQuantity', { productId: item.id, change: -1 })">-</button>
                            <span>{{ item.quantity }}</span>
                            <button @click="$emit('updateQuantity', { productId: item.id, change: 1 })">+</button>
                        </div>
                    </div>
                    <button class="cart-item-remove" @click="$emit('removeItem', item.id)">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>

        <div class="p-4 border-t bg-gradient-to-r from-gray-50 to-white">
            <div class="flex justify-between items-center mb-4">
                <span class="font-semibold text-lg">Tổng cộng:</span>
                <span id="cart-total" class="font-bold text-honda-red text-xl">{{ formatCurrency(total) }} VNĐ</span>
            </div>
            <button id="checkout-button"
                class="text-white w-full py-3 rounded-xl text-lg font-semibold transition duration-300 transform hover:scale-105">
                <i class="fas fa-credit-card mr-2"></i>
                Xem giỏ hàng
            </button>
        </div>
    </div>
</template>

<script setup>
defineProps({
    isOpen: Boolean,
    cartItems: Array,
    total: Number,
});

defineEmits(['close', 'updateQuantity', 'removeItem']);

const formatCurrency = (amount) => {
  if (typeof amount !== 'number') return '0';
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
</script>
