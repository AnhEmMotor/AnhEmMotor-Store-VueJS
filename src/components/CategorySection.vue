<script setup>
import { ref } from 'vue';

const categories = ref([
    {
        href: 'product.html',
        imgSrc: '/list/xe.jpg',
        alt: 'Xe',
        title: 'Xe'
    },
    {
        href: 'spareparts.html',
        imgSrc: '/list/spareparts.png',
        alt: 'Phụ tùng',
        title: 'Phụ Tùng'
    },
    {
        href: 'accessories.html',
        imgSrc: '/list/accessories.jpg',
        alt: 'Phụ kiện',
        title: 'Phụ Kiện'
    }
]);
</script>

<template>
    <div class="container">
        <div class="section-header">
            <h1 class="section-title">Danh Mục Sản Phẩm</h1>
            <p class="section-subtitle">Khám phá bộ sưu tập xe máy đa dạng với chất lượng hàng đầu từ các thương
                hiệu uy tín</p>
        </div>

        <div class="categories-grid">
            <a v-for="(category, index) in categories" :key="index" :href="category.href" class="category-card">
                <div class="category-image-wrapper">
                    <img :src="category.imgSrc" :alt="category.alt">
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
