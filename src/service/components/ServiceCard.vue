<template>
  <div 
    class="service-card fade-in"
    @mouseenter="handleHover(true)"
    @mouseleave="handleHover(false)"
  >
    <span class="service-icon">{{ service.icon }}</span>
    <h3>{{ service.title }}</h3>
    <p>{{ service.description }}</p>
    <div class="price">{{ service.price }}</div>
    <ul class="features">
      <li v-for="(feature, index) in service.features" :key="index">
        {{ feature }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ServiceCard',
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleHover(isHovering) {
      const card = this.$el
      if (isHovering) {
        card.style.transform = 'translateY(-15px) scale(1.02)'
      } else {
        card.style.transform = 'translateY(0) scale(1)'
      }
    }
  }
}
</script>