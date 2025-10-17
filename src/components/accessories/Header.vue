<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
      <!-- Mobile menu toggle -->
      <button class="md:hidden text-gray-700 text-2xl" @click="$emit('toggleMobileNav')">
        <i class="fas fa-bars"></i>
      </button>

      <!-- Logo -->
      <a href="#" class="flex items-center gap-3 font-bold text-lg text-gray-800">
        <img
          src="/image/logo.png"
          alt="AnhEm Motor"
          class="h-10 w-10 rounded-full object-cover border border-gray-100 shadow-sm"
        />
        <span>AnhEm Motor</span>
      </a>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center flex-1 justify-center">
        <ul class="flex gap-8 items-center text-gray-700">
          <li><a href="#" class="hover:text-[#de0000] transition">Trang Chủ</a></li>
          <li><a href="#" class="hover:text-[#de0000] transition">Sản Phẩm</a></li>
          <li><a href="#" class="hover:text-[#de0000] transition">Giới Thiệu</a></li>
          <li><a href="#" class="hover:text-[#de0000] transition">Tin Tức-Sự Kiện</a></li>
          <li><a href="#" class="hover:text-[#de0000] transition">Khuyến Mãi</a></li>
          <li><a href="#" class="hover:text-[#de0000] transition">Liên Hệ</a></li>
          <li><a href="#" class="hover:text-[#de0000] transition">Dịch Vụ</a></li>
        </ul>
      </nav>

      <!-- Cart -->
      <div class="flex items-center space-x-4">
        <button
          class="relative text-gray-700 text-xl"
          @click="$emit('toggleCart')"
          aria-label="Open cart"
        >
          <i class="fas fa-shopping-cart"></i>
          <span
            v-if="cartItemCount > 0"
            class="absolute -top-2 -right-2 bg-[#de0000] text-white text-xs rounded-full px-1.5 h-5 leading-5 flex items-center justify-center"
            >{{ cartItemCount }}</span
          >
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  cartItemCount: {
    type: Number,
<<<<<<< HEAD
    default: 0,
  },
})
defineEmits(['toggleCart', 'toggleMobileNav'])
=======
    default: 0
  }
});
defineEmits(['toggleCart', 'toggleMobileNav']);
>>>>>>> 7f0d990eefadf423b46dcd334d47cfe6ad6ed59c
</script>
