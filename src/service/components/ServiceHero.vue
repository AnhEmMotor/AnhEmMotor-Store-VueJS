<template>
  <section id="home" class="hero">
    <div class="container">
      <div class="hero-content">
        <h1>Dịch Vụ Xe Máy Chuyên Nghiệp</h1>
        <p>Chăm sóc xe máy của bạn với dịch vụ tốt nhất tại Việt Nam</p>
        <a href="#services" class="cta-button" @click.prevent="scrollToServices">
          Xem Dịch Vụ
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ServiceHero',
  methods: {
    scrollToServices(e) {
      e.preventDefault()
      const target = document.querySelector('#services')
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }
}
</script>