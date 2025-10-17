<template>
  <transition name="slide">
    <nav v-show="isOpen" class="fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-50">
      <div class="flex items-center justify-between p-4 border-b">
        <h3 class="font-semibold">Menu</h3>
        <button class="text-xl" @click="$emit('close')"><i class="fas fa-times"></i></button>
      </div>
      <ul class="p-4 space-y-2">
        <li><a href="#" class="block py-2">Trang Chủ</a></li>
        <li><a href="#" class="block py-2">Sản Phẩm</a></li>
        <li><a href="#" class="block py-2">Giới Thiệu</a></li>
        <li><a href="#" class="block py-2">Tin Tức-Sự Kiện</a></li>
        <li><a href="#" class="block py-2">Khuyến Mãi</a></li>
        <li><a href="#" class="block py-2">Liên Hệ</a></li>
        <li><a href="#" class="block py-2">Dịch Vụ</a></li>
      </ul>
    </nav>
  </transition>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
})
defineEmits(['close'])
</script>
