<script setup>
import { ref } from 'vue';

const isMobileNavOpen = ref(false);

const toggleMobileNav = () => {
  isMobileNavOpen.value = !isMobileNavOpen.value;
};

const closeMobileNav = () => {
  isMobileNavOpen.value = false;
};

const navLinks = ref([
  { text: 'Trang Chủ', href: 'index.html' },
  { text: 'Sản Phẩm', href: 'listings.html' },
  { text: 'Giới Thiệu', href: 'about.html' },
  { text: 'Tin Tức-Sự Kiện', href: 'news.html' },
  { text: 'Khuyến Mãi', href: 'promotion.html' },
  { text: 'Liên Hệ', href: 'contact.html' },
  { text: 'Dịch Vụ', href: 'service.html' },
]);
</script>

<template>
  <header class="main-header">
    <div class="container">
      <div class="header-container">
        <!-- Mobile Menu Toggle -->
        <button class="mobile-menu-toggle" @click="toggleMobileNav">
          <i class="fas fa-bars"></i>
        </button>

        <!-- Logo -->
        <a href="index.html" class="logo">
          <div class="logo-icon">
            <!-- Đường dẫn hình ảnh phải bắt đầu từ / để trỏ vào thư mục public -->
            <img src="/image/logo.png" alt="AnhEm Motor">
          </div>
          <span class="logo-text">AnhEm Motor</span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="main-nav">
          <ul>
            <li v-for="link in navLinks" :key="link.text">
              <a :href="link.href">{{ link.text }}</a>
            </li>
          </ul>
        </nav>

      </div>
    </div>

    <!-- Mobile Navigation Overlay -->
    <div 
      class="mobile-nav-overlay" 
      :class="{ active: isMobileNavOpen }"
      @click="closeMobileNav"
    ></div>

    <!-- Mobile Navigation Menu -->
    <nav class="mobile-nav" :class="{ active: isMobileNavOpen }">
      <div class="mobile-nav-header">
        <h3>Menu</h3>
        <button class="mobile-nav-close" @click="closeMobileNav">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <ul>
        <li v-for="link in navLinks" :key="link.text">
          <a :href="link.href" @click="closeMobileNav">{{ link.text }}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>
