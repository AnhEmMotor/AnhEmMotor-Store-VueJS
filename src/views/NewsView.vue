<template>
    <div>
        <NewsBanner />
        <FeaturedNews />
        <NewsList />
        <Pagination />
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import NewsBanner from '../news/NewsBanner.vue';
import FeaturedNews from '../news/FeaturedNews.vue';
import NewsList from '../news/NewsList.vue';
import Pagination from '../news/Pagination.vue';

// Xử lý hiệu ứng fade-in khi component được mount
onMounted(() => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Dừng quan sát sau khi hiển thị
            }
        });
    }, observerOptions);

    // Chọn tất cả các phần tử có lớp "fade-in-up" để quan sát
    document.querySelectorAll('.fade-in-up').forEach(element => {
        observer.observe(element);
    });
});
</script>
