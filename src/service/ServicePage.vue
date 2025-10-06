<template>
  <div id="app">
    <ServiceHeader />
    <MobileMenu 
      :isOpen="mobileMenuOpen"
      @close="mobileMenuOpen = false"
    />
    <ServiceHero />
    <ServiceList />
    <ServiceContact />
    <ServiceFooter />
   
  </div>
</template>

<script>
import ServiceHeader from './components/ServiceHeader.vue'
import ServiceHero from './components/ServiceHero.vue'
import ServiceList from './components/ServiceList.vue'
import ServiceContact from './components/ServiceContact.vue'
import ServiceFooter from './components/ServiceFooter.vue'
import MobileMenu from './components/MobileMenu.vue'
import './styles/service.css'

export default {
  name: 'ServicePage',
  components: {
    ServiceHeader,
    ServiceHero,
    ServiceList,
    ServiceContact,
    ServiceFooter,
    MobileMenu
  },
  data() {
    return {
      mobileMenuOpen: false
    }
  },
  mounted() {
    this.initScrollEffects()
    this.initFadeInObserver()
  },
  methods: {
    initScrollEffects() {
      const header = document.querySelector('header')
      window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
          header.style.background = 'rgba(255,255,255,.98)'
        } else {
          header.style.background = 'rgba(255,255,255,.95)'
        }
      })
    },
    initFadeInObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      }, { threshold: 0.1 })

      document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el)
      })
    }
  }
}
</script>

<style src="./styles/service.css"></style>