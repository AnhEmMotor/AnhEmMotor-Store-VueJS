<template>
  <NewsBanner />
  <FeaturedNews />
  <NewsList />
</template>

<script setup>
import { onMounted } from 'vue'
import NewsBanner from '@/components/news/NewsBanner.vue'
import FeaturedNews from '@/components/news/FeaturedNews.vue'
import NewsList from '@/components/news/NewsList.vue'

onMounted(() => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  }
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target) // Dừng quan sát sau khi hiển thị
      }
    })
  }, observerOptions)
  document.querySelectorAll('.fade-in-up').forEach((element) => {
    observer.observe(element)
  })
})
</script>
