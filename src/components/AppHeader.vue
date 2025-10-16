<template>
  <div>
    <header class="main-header">
      <div class="header-container">
        <!-- Logo -->
        <a href="index.html" class="logo">
          <img src="/public/image/logo.png" alt="Logo" class="avatar-circle">
          <span>AnhEm Motor</span>
        </a>

        <!-- Navigation Menu -->
        <nav class="main-nav">
          <ul>
            <li><a href="index.html">Trang Chủ</a></li>
            <li><a href="listings.html">Sản Phẩm</a></li>
            <li><a href="about.html">Giới Thiệu</a></li>
            <li><a href="news.html">Tin Tức-Sự Kiện</a></li>
            <li><a href="promotion.html">Khuyến Mãi</a></li>
            <li><a href="contact.html">Liên Hệ</a></li>
            <li><a href="service.html">Dịch Vụ</a></li>
          </ul>
        </nav>

        <!-- Header Icons -->
        <div class="header-icons">
          <div class="cart-icon">
            <a href="#" style="color: inherit; text-decoration: none;">
              <i class="fa-solid fa-shopping-cart"></i>
            </a>
            <span v-if="cartItemCount > 0" class="cart-count">{{ cartItemCount }}</span>
          </div>
          <button class="mobile-menu-toggle" @click="toggleMobileMenu">
            <i class="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Navigation -->
    <div class="mobile-nav-overlay" :class="{ active: isMobileMenuOpen }" @click="closeMobileMenu"></div>
    <nav class="mobile-nav" :class="{ open: isMobileMenuOpen }">
      <div class="mobile-nav-header">
        <span>Menu</span>
        <button class="mobile-nav-close" @click="closeMobileMenu">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
      <ul>
        <li><a href="index.html">Trang Chủ</a></li>
        <li><a href="listings.html">Sản Phẩm</a></li>
        <li><a href="about.html">Giới Thiệu</a></li>
        <li><a href="news.html">Tin Tức-Sự Kiện</a></li>
        <li><a href="promotion.html">Khuyến Mãi</a></li>
        <li><a href="contact.html">Liên Hệ</a></li>
        <li><a href="service.html">Dịch Vụ</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    cartItemCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isMobileMenuOpen: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    }
  }
}
</script>
