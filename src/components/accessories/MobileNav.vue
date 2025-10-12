<template>
  <nav class="mobile-nav" :class="{ 'open': isOpen }">
      <div class="mobile-nav-header">
          <h3>Menu</h3>
          <button class="mobile-nav-close" @click="$emit('close')">
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
defineProps({
  isOpen: Boolean
});
defineEmits(['close']);
</script>
