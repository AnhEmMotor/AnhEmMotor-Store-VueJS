<template>
    <header class="main-header">
        <div class="header-container">
            <button class="mobile-menu-toggle" @click="$emit('toggleMobileNav')">
                <i class="fas fa-bars"></i>
            </button>

            <a href="#" class="logo">
                <img src="/image/logo.png" alt="AnhEm Motor">
                <span>AnhEm Motor</span>
            </a>

            <nav class="main-nav">
                <ul>
                    <li><a href="#">Trang Chủ</a></li>
                    <li><a href="#">Sản Phẩm</a></li>
                    <li><a href="#">Giới Thiệu</a></li>
                    <li><a href="#">Tin Tức-Sự Kiện</a></li>
                    <li><a href="#">Khuyến Mãi</a></li>
                    <li><a href="#">Liên Hệ</a></li>
                    <li><a href="#">Dịch Vụ</a></li>
                </ul>
            </nav>

            <div class="flex items-center space-x-4">
                <div class="cart-icon" @click="$emit('toggleCart')">
                    <i class="fas fa-shopping-cart"></i>
                    <span v-if="cartItemCount > 0" class="cart-count">{{ cartItemCount }}</span>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
defineProps({
  cartItemCount: {
    type: Number,
    default: 0
  }
});
defineEmits(['toggleCart', 'toggleMobileNav']);
</script>
