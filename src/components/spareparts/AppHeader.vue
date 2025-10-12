<template>
    <header class="main-header">
        <div class="header-container">
            <!-- Mobile menu button -->
            <button class="mobile-menu-toggle" @click="isMobileMenuOpen = true">
                <i class="fas fa-bars"></i>
            </button>

            <!-- Logo -->
            <a href="#" class="logo">
                <img src="/image/logo.png" alt="AnhEm Motor">
                <span>AnhEm Motor</span>
            </a>

            <!-- Navigation Menu -->
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

            <!-- Header Icons -->
            <div class="flex items-center space-x-4">
                <div id="cart-icon-button" class="cart-icon" @click="$emit('toggleCart')">
                    <i class="fas fa-shopping-cart"></i>
                    <span id="cart-item-count" class="cart-count" v-if="cartItemCount > 0">{{ cartItemCount }}</span>
                </div>
            </div>
        </div>
    </header>

    <!-- Mobile Navigation -->
    <div :class="['mobile-nav-overlay', { active: isMobileMenuOpen }]" @click="isMobileMenuOpen = false"></div>
    <nav :class="['mobile-nav', { open: isMobileMenuOpen }]">
        <div class="mobile-nav-header">
            <h3>Menu</h3>
            <button class="mobile-nav-close" @click="isMobileMenuOpen = false">
                <i class="fas fa-times"></i>
            </button>
        </div>
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
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  cartItemCount: {
    type: Number,
    required: true
  }
});

defineEmits(['toggleCart']);

const isMobileMenuOpen = ref(false);
</script>
