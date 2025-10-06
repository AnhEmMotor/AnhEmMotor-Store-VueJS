<template>
  <div>
    <div 
      id="mobileNavOverlay" 
      class="mobile-nav-overlay"
      :class="{ active: isOpen }"
      @click="closeMenu"
    ></div>
    <nav 
      id="mobileNav" 
      class="mobile-nav" 
      :style="{ left: isOpen ? '0' : '-300px' }"
    >
      <div style="padding:20px;background:var(--grad);color:#fff;display:flex;justify-content:space-between;align-items:center">
        <h3>Menu</h3>
        <button 
          id="mobileNavClose" 
          @click="closeMenu"
          style="background:none;border:0;color:#fff;font-size:1.5rem;cursor:pointer"
        >
          ✕
        </button>
      </div>
      <ul style="list-style:none;padding:20px 0;margin:0">
        <li>
          <a href="index.html" @click="closeMenu">Trang Chủ</a>
        </li>
        <li>
          <a href="listings.html" @click="closeMenu">Sản Phẩm</a>
        </li>
        <li>
          <a href="about.html" @click="closeMenu">Giới Thiệu</a>
        </li>
        <li>
          <a href="news.html" @click="closeMenu">Tin Tức-Sự Kiện</a>
        </li>
        <li>
          <a href="promotion.html" @click="closeMenu">Khuyến Mãi</a>
        </li>
        <li>
          <a href="contact.html" @click="closeMenu">Liên Hệ</a>
        </li>
        <li>
          <a href="service.html" @click="closeMenu">Dịch Vụ</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'MobileMenu',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeMenu() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.mobile-nav-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1999;
  display: none;
}

.mobile-nav-overlay.active {
  display: block;
}

.mobile-nav {
  position: fixed;
  top: 0;
  width: 280px;
  height: 100vh;
  background: #fff;
  z-index: 2000;
  transition: left 0.3s;
  overflow: auto;
}

.mobile-nav a {
  display: block;
  padding: 15px 20px;
  color: var(--dark);
  text-decoration: none;
}

.mobile-nav a:hover {
  background: rgba(231, 76, 60, 0.1);
}
</style>