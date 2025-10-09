<template>
  <section
    id="home"
    class="relative w-screen left-1/2 -translate-x-1/2 bg-cover bg-center bg-no-repeat text-white text-center py-[225px] mb-10 mt-[-28px]"
    :style="{ backgroundImage: `url(${heroImage})` }"
  >
    <div class="absolute inset-0 bg-black/50"></div>
    <div class="relative max-w-[1400px] mx-auto px-5">
      <div class="hero-content">
        <h1 class="text-[3.5rem] mb-4 text-white animate-fadeInUp">Dịch Vụ Xe Máy Chuyên Nghiệp</h1>
        <p class="text-[1.3rem] mb-8 text-white animate-fadeInUp animation-delay-200">
          Chăm sóc xe máy của bạn với dịch vụ tốt nhất tại Việt Nam
        </p>
        <a
          href="#services"
          class="inline-block bg-red-600 text-white py-4 px-10 rounded-full font-bold no-underline transition-all duration-300 shadow-[0_8px_25px_rgba(220,38,38,0.3)] cursor-pointer hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(220,38,38,0.4)]"
          @click.prevent="scrollToServices"
        >
          Xem Dịch Vụ
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import heroImage from '@/assets/images/pngtree-auto-mechanic-working-in-garage-repair-service-image_15647943.jpg'
const scrollToServices = (e) => {
  e.preventDefault()
  const target = document.querySelector('#services')
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>
