<script setup>
const props = defineProps({
  promotion: {
    type: Object,
    required: true,
    default: () => ({
      id: 0,
      date: 'N/A',
      title: 'Tiêu đề khuyến mãi',
      imageSrc:
        '[https://placehold.co/600x400/E65151/FFFFFF?text=Promotion](https://placehold.co/600x400/E65151/FFFFFF?text=Promotion)',
      link: '#',
      isHot: false,
      delay: '0ms', // Dùng cho hiệu ứng fade-in-up
    }),
  },
})

// Tạo đường dẫn chi tiết
const detailLink = `promotion_${props.promotion.id}.html`
</script>

<template>
  <!-- Promotion Card -->
  <div
    class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 group fade-in-up"
    :style="{ 'transition-delay': promotion.delay }"
  >
    <div class="relative">
      <img
        :src="promotion.imageSrc"
        :alt="promotion.title"
        class="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div
        v-if="promotion.isHot"
        class="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full"
      >
        HOT
      </div>
    </div>
    <div class="p-6">
      <p class="text-sm text-gray-500 mb-2">{{ promotion.date }}</p>
      <h3 class="text-xl font-bold text-gray-800 mb-4 h-20">{{ promotion.title }}</h3>
      <a :href="detailLink" class="font-semibold text-primary group-hover:underline"
        >Xem chi tiết
        <i
          class="fas fa-arrow-right ml-1 transition-transform duration-300 group-hover:translate-x-1"
        ></i
      ></a>
    </div>
  </div>
</template>

<style scoped>
/* Định nghĩa màu primary nếu cần cho Tailwind/CSS */
.bg-primary {
  background-color: var(--primary-color);
}
.text-primary {
  color: var(--primary-color);
}
/* h-20 được giữ nguyên như trong HTML gốc để đảm bảo chiều cao cố định cho tiêu đề */
.h-20 {
  height: 5rem; /* 80px */
}
</style>
