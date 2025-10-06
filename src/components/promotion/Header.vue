<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Dữ liệu menu
const menuItems = ref([
    { name: 'Trang Chủ', href: 'index.html' },
    { name: 'Sản Phẩm', href: 'listings.html' },
    { name: 'Giới Thiệu', href: 'about.html' },
    { name: 'Tin Tức-Sự Kiện', href: 'news.html' },
    { name: 'Khuyến Mãi', href: 'promotion.html', active: true },
    { name: 'Liên Hệ', href: 'contact.html' },
    { name: 'Dịch Vụ', href: 'service.html' },
]);

// Trạng thái menu di động
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<template>
    <!-- HEADER SECTION -->
    <header class="main-header">
        <div class="container">
            <div class="header-container">
                <!-- Logo -->
                <a href="index.html" class="logo">
                    <div class="logo-icon">
                        <!-- Sử dụng đường dẫn tương đối từ thư mục public -->
                        <img src="/public/image/logo.png" alt="AnhEm Motor">
                    </div>
                    <span class="logo-text">AnhEm Motor</span>
                </a>

                <!-- Desktop Navigation -->
                <nav class="main-nav">
                    <ul>
                        <li v-for="item in menuItems" :key="item.name">
                            <a :href="item.href" :class="{ 'active': item.active }">{{ item.name }}</a>
                        </li>
                    </ul>
                </nav>

                <!-- Mobile Menu Toggle -->
                <button class="mobile-menu-toggle" @click="toggleMobileMenu">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
        </div>

        <!-- Mobile Navigation Overlay -->
        <div class="mobile-nav-overlay" :class="{ 'active': isMobileMenuOpen }" @click="toggleMobileMenu"></div>

        <!-- Mobile Navigation Menu -->
        <nav class="mobile-nav" :class="{ 'active': isMobileMenuOpen }">
            <div class="mobile-nav-header">
                <h3>Menu</h3>
                <button class="mobile-nav-close" @click="toggleMobileMenu">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <ul>
                <li v-for="item in menuItems" :key="item.name">
                    <a :href="item.href">{{ item.name }}</a>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
/* Không cần thêm CSS ở đây vì tất cả đã nằm trong style.css */
/* Các class như .main-header, .container, .mobile-nav-overlay.active, v.v. được định nghĩa trong file style.css */
/* Vue sẽ tự động sử dụng các style từ file asset được import trong main.js */
</style>
