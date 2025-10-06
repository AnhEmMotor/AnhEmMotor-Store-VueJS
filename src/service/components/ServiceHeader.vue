<template>
  <header class="main-header">
    <div class="container">
      <div class="header-container">
        <button 
          class="mobile-menu-toggle" 
          id="mobileMenuToggle"
          @click="toggleMobileMenu"
        >
          ☰
        </button>
        <a href="index.html" class="logo">
          <div class="logo-icon">
            <img src="./assets/images/logo.png" alt="AnhEm Motor">
          </div>
          <span class="logo-text">AnhEm Motor</span>
        </a>
        <nav class="main-nav">
          <ul>
            <li><a href="index.html">Trang Chủ</a></li>
            <li class="has-submenu">
              <a href="listings.html">Sản Phẩm</a>
            </li>
            <li><a href="about.html">Giới Thiệu</a></li>
            <li><a href="news.html">Tin Tức-Sự Kiện</a></li>
            <li><a href="promotion.html">Khuyến Mãi</a></li>
            <li><a href="contact.html">Liên Hệ</a></li>
            <li><a href="service.html">Dịch Vụ</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'ServiceHeader',
  methods: {
    toggleMobileMenu() {
      this.$emit('toggle-menu')
    }
  }
}
</script>