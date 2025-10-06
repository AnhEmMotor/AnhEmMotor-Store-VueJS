<template>
    <!-- Thanh Điều Hướng (Header) -->
    <header class="bg-white border-b-4 border-primary-red fixed top-0 w-full z-50 shadow-xl">
        <div class="container mx-auto px-4 py-3 flex items-center justify-between h-20">
            <!-- Logo -->
            <a href="#" class="flex items-center space-x-2">
                <img src="/image/logo.png" alt="AnhEm Motor Logo" class="h-10 w-10 rounded-full">
                <span class="text-2xl font-extrabold text-primary-red">AnhEm Motor</span>
            </a>

            <!-- Menu Desktop -->
            <nav class="hidden lg:block">
                <ul class="flex space-x-8 text-gray-700 font-medium text-lg">
                    <li><a href="#" class="hover:text-primary-red transition-colors">Trang Chủ</a></li>
                    <li><a href="#" class="hover:text-primary-red transition-colors">Sản Phẩm</a></li>
                    <li><a href="#" class="hover:text-primary-red transition-colors">Giới Thiệu</a></li>
                    <li><a href="#" class="text-primary-red font-bold border-b-2 border-primary-red pb-1 transition-colors">Tin Tức-Sự Kiện</a></li>
                    <li><a href="#" class="hover:text-primary-red transition-colors">Khuyến Mãi</a></li>
                    <li><a href="#" class="hover:text-primary-red transition-colors">Liên Hệ</a></li>
                    <li><a href="#" class="hover:text-primary-red transition-colors">Dịch Vụ</a></li>
                </ul>
            </nav>

            <!-- Search & Menu Mobile Button -->
            <div class="flex items-center space-x-4">
                <button class="text-gray-800 hover:text-primary-red focus:outline-none hidden lg:block p-2 rounded-full hover:bg-primary-light transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
                <button @click="toggleMobileMenu" class="lg:hidden text-gray-800 hover:text-primary-red focus:outline-none text-2xl p-2 rounded-md transition-colors">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
        </div>
    </header>

    <!-- Menu Mobile -->
    <!-- <div @click="toggleMobileMenu" :class="['mobile-menu-overlay', { 'active': isMobileMenuOpen }]"></div>
    <nav :class="['mobile-menu flex flex-col p-6', { 'mobile-menu-open': isMobileMenuOpen }]">
        <div class="flex justify-end mb-8">
            <button @click="toggleMobileMenu" class="text-gray-600 text-3xl hover:text-primary-red transition-colors">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <ul class="space-y-4 text-gray-800 font-semibold text-xl">
            <li><a href="#" class="block py-2 hover:text-primary-red transition-colors border-b border-gray-100">Trang Chủ</a></li>
            <li><a href="#" class="block py-2 hover:text-primary-red transition-colors border-b border-gray-100">Sản Phẩm</a></li>
            <li><a href="#" class="block py-2 hover:text-primary-red transition-colors border-b border-gray-100">Giới Thiệu</a></li>
            <li><a href="#" class="block py-2 text-primary-red font-bold border-b border-gray-100">Tin Tức-Sự Kiện</a></li>
            <li><a href="#" class="block py-2 hover:text-primary-red transition-colors border-b border-gray-100">Khuyến Mãi</a></li>
            <li><a href="#" class="block py-2 hover:text-primary-red transition-colors border-b border-gray-100">Liên Hệ</a></li>
            <li><a href="#" class="block py-2 hover:text-primary-red transition-colors">Dịch Vụ</a></li>
        </ul>
        <button class="mt-8 w-full bg-primary-red text-white py-3 rounded-xl font-bold hover:bg-red-700 transition duration-300 shadow-lg">Tìm Kiếm</button>
    </nav> -->
</template>

<script setup>
import { ref } from 'vue';

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
    if (isMobileMenuOpen.value) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
};
</script>
