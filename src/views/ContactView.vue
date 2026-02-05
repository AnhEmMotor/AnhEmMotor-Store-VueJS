<script setup>
import { ref } from 'vue';
import ContactInfo from '../components/contact/ContactInfo.vue';
import ContactForm from '../components/contact/ContactForm.vue';

// Mobile menu state
const isMobileMenuOpen = ref(false);



const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>

<template>
  <div class="page-container">



    <div
      class="mobile-nav-overlay"
      :class="{ active: isMobileMenuOpen }"
      @click="closeMobileMenu"
    ></div>

    <nav class="mobile-nav" :class="{ active: isMobileMenuOpen }">
      <div class="mobile-nav-header">
        <h3>Menu</h3>
        <button @click="closeMobileMenu" style="background:none; border:none; font-size:1.5rem; cursor:pointer;">×</button>
      </div>
      <ul>
        <li><a href="/" @click="closeMobileMenu">Home</a></li>
        <li><a href="/about" @click="closeMobileMenu">About</a></li>
        <li><a href="/services" @click="closeMobileMenu">Services</a></li>
        <li><a href="/contact" @click="closeMobileMenu">Contact</a></li>
      </ul>
    </nav>

    <div class="main-container">
      <div class="form-wrapper">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>

    <footer>
      <div class="container">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
        <div class="footer-icons">
          <a href="#">F</a>
          <a href="#">T</a>
          <a href="#">I</a>
        </div>
      </div>
    </footer>

  </div>
</template>

<style scoped>
/* ... Your existing styles remain exactly the same ... */
/* Global Layout Styles specific to Contact Page */
.page-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background-color: #f4f4f4;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header Styles */
.main-header {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(248, 235, 234, 0.95));
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
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
}

.logo {
  display: flex;
  align-items: center;
  gap: 15px;
  text-decoration: none;
  color: #E74C3C;
  font-weight: 800;
  font-size: 1.2em;
}

.logo-icon img {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  border-radius: 50%;
  padding: 5px; /* Adjust based on your logo */
}

.main-nav ul {
  display: flex;
  gap: 20px;
  list-style: none;
}

.main-nav a {
  text-decoration: none;
  color: #333;
  font-weight: 600;
  padding: 8px 15px;
  border-radius: 20px;
  transition: all 0.3s;
}

.main-nav a:hover, .main-nav a.active {
  color: #E74C3C;
  background: rgba(231, 76, 60, 0.1);
}

/* Main Body Styles */
.main-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.form-wrapper {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(226, 88, 88, 0.2);
  overflow: hidden;
  max-width: 900px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 600px;
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Footer Styles */
footer {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: #fff;
  padding: 40px 0;
  text-align: center;
}

.footer-icons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.footer-icons a {
  color: white;
  width: 40px;
  height: 40px;
  background: rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: 0.3s;
}

.footer-icons a:hover {
  background: #E74C3C;
  transform: translateY(-3px);
}

/* Mobile Nav Styles */
.mobile-menu-toggle { display: none; background: none; border: none; font-size: 1.5rem; cursor: pointer; }
.mobile-nav-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); visibility: hidden; opacity: 0; transition: 0.3s; z-index: 1001; }
.mobile-nav-overlay.active { visibility: visible; opacity: 1; }
.mobile-nav { position: fixed; top: 0; left: -300px; width: 280px; height: 100vh; background: white; z-index: 1002; transition: 0.3s; padding: 20px; }
.mobile-nav.active { left: 0; }
.mobile-nav-header { display: flex; justify-content: space-between; margin-bottom: 20px; }
.mobile-nav ul { list-style: none; }
.mobile-nav li { margin-bottom: 15px; }
.mobile-nav a { text-decoration: none; color: #333; font-weight: 600; display: block; }

@media (max-width: 768px) {
  .main-nav { display: none; }
  .mobile-menu-toggle { display: block; }
  .form-wrapper { grid-template-columns: 1fr; margin: 0; }
  .header-container { height: 60px; }
}
</style>
