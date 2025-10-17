<template>
  <header
    class="fixed top-0 w-full z-50 bg-gradient-to-br from-white/98 to-rose-50/95 py-2.5 shadow-lg backdrop-blur-lg transition-all duration-300 ease-in-out"
  >
    <div class="max-w-7xl mx-auto px-5">
      <div class="relative flex h-20 items-center justify-between">
        <button
          class="lg:hidden p-2.5 text-red-500 rounded-lg text-xl transition-all duration-300 ease-in-out hover:bg-red-500/10"
          @click="openMobileNav"
        >
          <i class="fas fa-bars"></i>
        </button>

        <RouterLink
          to="/"
          class="flex items-center gap-4 whitespace-nowrap text-red-500 transition-transform duration-300 ease-in-out hover:scale-105"
        >
          <div
            class="w-10 h-10 sm:w-12 sm:h-12 bg-red-500 rounded-full flex items-center justify-center overflow-hidden"
          >
            <img
              src="../../../assets/image/logo.png"
              alt="AnhEm Motor"
              class="w-full h-full object-cover"
            />
          </div>
          <span class="text-2xl sm:text-3xl font-extrabold text-red-500">AnhEm Motor</span>
        </RouterLink>

        <nav class="hidden lg:flex ml-auto">
          <ul class="flex list-none gap-5 m-0 p-0">
            <li class="whitespace-nowrap">
              <RouterLink to="/" class="desktop-nav-link">Trang Chủ</RouterLink>
            </li>
            <li class="whitespace-nowrap">
              <RouterLink to="/category" class="desktop-nav-link">Sản Phẩm</RouterLink>
            </li>
            <li class="whitespace-nowrap">
              <RouterLink to="/about" class="desktop-nav-link">Giới Thiệu</RouterLink>
            </li>
            <li class="whitespace-nowrap">
              <RouterLink to="/news" class="desktop-nav-link">Tin Tức-Sự Kiện</RouterLink>
            </li>
            <li class="whitespace-nowrap">
              <RouterLink to="/promotion" class="desktop-nav-link">Khuyến Mãi</RouterLink>
            </li>
            <li class="whitespace-nowrap">
              <RouterLink to="/contact" class="desktop-nav-link">Liên Hệ</RouterLink>
            </li>
            <li class="whitespace-nowrap">
              <RouterLink to="/service" class="desktop-nav-link">Dịch Vụ</RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div
      class="fixed inset-0 z-[1050] h-full w-full bg-black/50 transition-opacity duration-300 ease-in-out"
      :class="mobileNavActive ? 'block opacity-100' : 'hidden opacity-0'"
      @click="closeMobileNav"
    ></div>

    <nav
      class="fixed top-0 h-screen w-[280px] bg-red-500 shadow-lg z-[1100] flex flex-col transition-all duration-300 ease-in-out"
      :class="mobileNavActive ? 'left-0' : '-left-[300px]'"
    >
      <div class="flex items-center justify-between border-b border-white/20 p-5">
        <h3 class="m-0 text-2xl text-white">Menu</h3>
        <button
          class="cursor-pointer rounded-md border-none bg-transparent p-1 text-2xl text-white transition-all duration-300 ease-in-out hover:bg-white/10"
          @click="closeMobileNav"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      <ul class="m-0 flex-grow list-none bg-white p-5">
        <li>
          <RouterLink
            to="/"
            @click="closeMobileNav"
            class="mobile-nav-link border-b border-gray-200"
            >Trang Chủ</RouterLink
          >
        </li>
        <li>
          <RouterLink
            to="/listings"
            @click="closeMobileNav"
            class="mobile-nav-link border-b border-gray-200"
            >Sản Phẩm</RouterLink
          >
        </li>
        <li>
          <RouterLink
            to="/about"
            @click="closeMobileNav"
            class="mobile-nav-link border-b border-gray-200"
            >Giới Thiệu</RouterLink
          >
        </li>
        <li>
          <RouterLink
            to="/news"
            @click="closeMobileNav"
            class="mobile-nav-link border-b border-gray-200"
            >Tin Tức-Sự Kiện</RouterLink
          >
        </li>
        <li>
          <RouterLink
            to="/promotion"
            @click="closeMobileNav"
            class="mobile-nav-link border-b border-gray-200"
            >Khuyến Mãi</RouterLink
          >
        </li>
        <li>
          <RouterLink
            to="/contact"
            @click="closeMobileNav"
            class="mobile-nav-link border-b border-gray-200"
            >Liên Hệ</RouterLink
          >
        </li>
        <li>
          <RouterLink to="/service" @click="closeMobileNav" class="mobile-nav-link"
            >Dịch Vụ</RouterLink
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref, onBeforeUnmount, watch } from 'vue'

const mobileNavActive = ref(false)

const openMobileNav = () => {
  mobileNavActive.value = true
}

const closeMobileNav = () => {
  mobileNavActive.value = false
}

watch(mobileNavActive, (isActive) => {
  document.body.style.overflow = isActive ? 'hidden' : ''
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
@reference "../../assets/main.css";

.desktop-nav-link {
  @apply relative rounded-full py-2 px-4 text-base font-semibold text-gray-800 no-underline transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-red-500/10 hover:text-red-500;
}

.mobile-nav-link {
  @apply block rounded-none py-4 px-5 font-semibold text-gray-800 no-underline transition-all duration-300 ease-in-out hover:bg-rose-50 hover:text-red-500;
}
</style>
