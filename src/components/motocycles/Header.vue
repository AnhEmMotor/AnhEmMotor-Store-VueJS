<template>
    <header class="main-header">
        <div class="header-container">
            <!-- Logo -->
            <a href="#" class="logo">
                <img src="/image/logo.png" alt="Logo" class="avatar-circle">
                <span>AnhEm Motor</span>
            </a>

            <!-- Navigation Menu -->
            <nav class="main-nav">
                <ul>
                    <li><a href="#">Trang Chủ</a></li>
                    <li class="has-submenu">
                        <a href="#">Sản Phẩm <i class="fas fa-chevron-down"></i></a>
                        <ul class="submenu">
                            <li><a href="#">Phụ Tùng & Phụ Kiện</a></li>
                        </ul>
                    </li>
                    <li><a href="#">Giới Thiệu</a></li>
                    <li><a href="#">Tin Tức-Sự Kiện</a></li>
                    <li><a href="#">Khuyến Mãi</a></li>
                    <li><a href="#">Liên Hệ</a></li>
                    <li><a href="#">Dịch Vụ</a></li>
                </ul>
            </nav>

            <!-- Header Icons -->
            <div class="header-icons">
                <div class="cart-icon" @click="emit('toggle-cart')">
                    <i class="fa-solid fa-shopping-cart"></i>
                    <span class="cart-count" v-if="cartItemCount > 0">{{ cartItemCount }}</span>
                </div>
                <button class="mobile-menu-toggle" @click="toggleMobileMenu(true)">
                    <i class="fa-solid fa-bars"></i>
                </button>
            </div>
        </div>
    </header>

    <!-- Mobile Navigation -->
    <div class="mobile-nav-overlay" v-show="isMobileMenuOpen" @click="toggleMobileMenu(false)"></div>
    <nav class="mobile-nav" :class="{ open: isMobileMenuOpen }">
        <div class="mobile-nav-header">
            <span>Menu</span>
            <button class="mobile-nav-close" @click="toggleMobileMenu(false)">
                <i class="fa-solid fa-times"></i>
            </button>
        </div>
        <ul>
            <li><a href="#">Trang Chủ</a></li>
            <li class="has-submenu">
                <a href="#">Sản Phẩm <i class="fas fa-chevron-down"></i></a>
                <ul class="submenu">
                    <li><a href="#">Phụ Tùng & Phụ Kiện</a></li>
                </ul>
            </li>
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

// Props to receive data from parent (App.vue)
defineProps({
    cartItemCount: {
        type: Number,
        required: true,
        default: 0
    }
});

// Emits to send events to parent (App.vue)
const emit = defineEmits(['toggle-cart']);

// Local state for mobile menu
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = (state) => {
    isMobileMenuOpen.value = state;
};
</script>
