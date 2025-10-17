<script setup>
import { ref } from 'vue'

const categories = ref([
  {
    href: 'product.html',
    imgSrc: '/list/xe.jpg',
    alt: 'Xe',
    title: 'Xe',
  },
  {
    href: 'spareparts.html',
    imgSrc: '/list/spareparts.png',
    alt: 'Phụ tùng',
    title: 'Phụ Tùng',
  },
  {
    href: 'accessories.html',
    imgSrc: '/list/accessories.jpg',
    alt: 'Phụ kiện',
    title: 'Phụ Kiện',
  },
])
</script>

<template>
  <div class="container">
    <div class="section-header">
      <h1 class="section-title">Danh Mục Sản Phẩm</h1>
      <p class="section-subtitle">
        Khám phá bộ sưu tập xe máy đa dạng với chất lượng hàng đầu từ các thương hiệu uy tín
      </p>
    </div>

    <div class="categories-grid">
      <a
        v-for="(category, index) in categories"
        :key="index"
        :href="category.href"
        class="category-card"
      >
        <div class="category-image-wrapper">
          <img :src="category.imgSrc" :alt="category.alt" />
          <div class="red-arrow">
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
        <div class="category-content">
          <h3 class="category-title">{{ category.title }}</h3>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
:root {
  --primary-color: #e74c3c;
  --secondary-color: #6c757d;
  --accent-color: #e74c3c;
  --light-bg: #f8ebea;
  --dark-text: #333333;
  --white: #ffffff;
  --border-color: #cccccc;
  --placeholder-text: #aaaaaa;
  --gradient-bg: linear-gradient(135deg, #e74c3c, #c0392b);
}

/* ========== RESET & BASE STYLES ========== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: var(--dark-text);
  background-color: var(--white);
  overflow-x: hidden;
}

/* ========== HEADER ========== */
.main-header {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(248, 235, 234, 0.95));
  backdrop-filter: blur(10px);
  padding: 10px 0;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  transition: all 0.3s ease;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  position: relative;
}

/* Mobile Menu Button */
.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--primary-color);
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  transition: all 0.3s ease;
  z-index: 2500;
}

.mobile-menu-toggle:hover {
  background: rgba(231, 76, 60, 0.1);
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.2em;
  font-weight: 800;
  color: var(--primary-color);
  text-decoration: none;
  transition: transform 0.3s ease;
  white-space: nowrap;
}

.logo-icon img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--primary-color);
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
}

.logo:hover .logo-text {
  color: var(--primary-light);
}

/* Navigation */

.main-nav {
  margin: auto;
}

.main-nav ul {
  list-style: none;
  display: flex;
  gap: 30px;
}

.main-nav a {
  text-decoration: none;
  color: var(--dark-text);
  font-weight: 700;
  font-size: 16px;
  padding: 10px;
  border-radius: 25px;
  transition: all 0.3s ease;
  position: relative;
  white-space: nowrap;
}

.main-nav a:hover {
  color: var(--primary-color);
  background: rgba(231, 76, 60, 0.0675);
  transform: translateY(-2px);
}

/* Mobile Navigation */
.mobile-nav-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 1500;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.mobile-nav-overlay.active {
  opacity: 1;
  visibility: visible;
}

.mobile-nav {
  position: fixed;
  top: 0;
  left: -300px;
  width: 280px;
  height: 100vh;
  background: white;
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.1);
  z-index: 2000;
  transition: left 0.3s ease;
  overflow-y: auto;
}

.mobile-nav.active {
  left: 0;
}

.mobile-nav-header {
  padding: 20px;
  background: var(--gradient-bg);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile-nav-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
}

.mobile-nav ul {
  list-style: none;
  padding: 20px 0;
}

.mobile-nav li {
  margin: 0;
}

.mobile-nav a {
  display: block;
  padding: 15px 20px;
  color: var(--dark-text);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border-bottom: 1px solid #f0f0f0;
}

.mobile-nav a:hover {
  background: var(--light-bg);
  color: var(--primary-color);
  padding-left: 30px;
}

/* ========== MAIN CONTENT ========== */
.main-content {
  padding: 120px 0 60px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  /* min-height: 100vh; */
}

.section-header {
  text-align: center;
  margin-bottom: 50px;
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--primary-color);
  margin-bottom: 15px;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), #c0392b);
  border-radius: 2px;
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--secondary-color);
  max-width: 600px;
  margin: 0 auto;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 0 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.categories-grid .row-1 {
  display: contents;
}

.categories-grid .row-2 {
  display: contents;
}

.category-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s ease forwards;
  text-decoration: none;
  color: inherit;
}

.category-card:nth-child(1) {
  animation-delay: 0.1s;
}

.category-card:nth-child(2) {
  animation-delay: 0.2s;
}

.category-card:nth-child(3) {
  animation-delay: 0.3s;
}

.category-card:nth-child(4) {
  animation-delay: 0.4s;
}

.category-card:nth-child(5) {
  animation-delay: 0.5s;
}

.category-card:nth-child(6) {
  animation-delay: 0.6s;
}

.category-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(231, 76, 60, 0.1), transparent);
  transform: rotate(-45deg);
  transition: all 0.6s ease;
  opacity: 0;
}

.category-card:hover::before {
  animation: shimmer 0.6s ease-in-out;
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.category-image-wrapper {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.category-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.category-card:hover .category-image-wrapper img {
  transform: scale(1.05);
}

.red-arrow {
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.category-card:hover .red-arrow {
  background: #c0392b;
  transform: scale(1.1);
}

.category-content {
  padding: 20px;
  background: #f8f9fa;
  text-align: center;
}

.category-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #666;
  margin: 0;
}

/* ========== FOOTER ========== */
footer {
  background: linear-gradient(135deg, #333333, #34495e);
  color: white;
  padding: 60px 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

footer ul {
  list-style: none;
  padding-left: 0;
}

footer li {
  margin-bottom: 8px;
}

.footer-col h3 {
  color: var(--primary-color);
  margin-bottom: 20px;
  font-size: 1.4rem;
}

.footer-col p,
.footer-col ul li a {
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.3s ease;
  text-decoration: none;
}

.footer-col ul li a:hover {
  color: var(--primary-color);
}

.social-links {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.social-links a {
  width: 45px;
  height: 45px;
  background: rgba(231, 76, 60, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: white;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.social-links a:hover {
  background: var(--primary-color);
  transform: translateY(-3px);
}

.copyright {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
}

/* ========== ANIMATIONS ========== */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(-45deg);
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    transform: translateX(100%) translateY(100%) rotate(-45deg);
    opacity: 0;
  }
}

/* ========== RESPONSIVE ========== */
@media (max-width: 1200px) {
  .main-nav {
    display: none;
    /* Ẩn menu desktop trên màn hình nhỏ hơn */
  }

  .mobile-menu-toggle {
    display: block;
    /* Hiện nút menu mobile */
  }
}

@media (max-width: 992px) {
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 100px 0 40px;
  }

  .section-title {
    font-size: 2rem;
  }

  .categories-grid {
    grid-template-columns: 1fr;
    gap: 15px;
    padding: 0 15px;
  }

  .category-image-wrapper {
    height: 180px;
  }
}
</style>
