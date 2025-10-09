<template>
  <div id="app">
    <MobileMenu :isOpen="mobileMenuOpen" @close="mobileMenuOpen = false" />
    <ServiceHero />
    <ServiceList />
    <ServiceContact />
  </div>
</template>

<script>
import ServiceHero from '@/components/service-page/ServiceHero.vue'
import ServiceList from '@/components/service-page/ServiceList.vue'

export default {
  name: 'ServicePage',
  components: {
    ServiceHero,
    ServiceList,
  },
  data() {
    return {
      mobileMenuOpen: false,
    }
  },
  mounted() {
    this.initScrollEffects()
    this.initFadeInObserver()
  },
  methods: {
    initScrollEffects() {
      const header = document.querySelector('header')
      if (!header) return
      window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
          header.style.background = 'rgba(255,255,255,.98)'
        } else {
          header.style.background = 'rgba(255,255,255,.95)'
        }
      })
    },
    initFadeInObserver() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
            }
          })
        },
        { threshold: 0.1 },
      )

      document.querySelectorAll('.fade-in').forEach((el) => {
        observer.observe(el)
      })
    },
  },
}
</script>

<style>
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

.animate-fadeInUp {
  animation: fadeInUp 1s;
}

.animation-delay-200 {
  animation-delay: 0.2s;
  animation-fill-mode: both;
}

.fade-in {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
