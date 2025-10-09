<script setup>
import { ref, onMounted } from 'vue'
import PromotionCard from '@/components/promotion/PromotionCard.vue'
const promotions = ref([
  {
    id: 1,
    date: '15/07/2025',
    title: 'Honda Việt Nam tri ân khách hàng với loạt ưu đãi hấp dẫn chào hè...',
    imageSrc:
      'https://cdn.honda.com.vn/news-motorbike/July2025/xQD9vsxGTpqh2umWS1vjvvCsDiMcrgTYmiOqfxDb.jpeg',
    isHot: true,
    delay: '0ms',
  },
  {
    id: 2,
    date: '01/06/2025',
    title: 'Honda Việt Nam triển khai chương trình khuyến mại “Chốt xế liền tay,...',
    imageSrc:
      'https://cdn.honda.com.vn/news-motorbike/May2025/LGEoMNCjsDrOjIrhuLEoGc3t88MZFg2GshuBYUoO.png',
    isHot: false,
    delay: '100ms',
  },
  {
    id: 3,
    date: '05/07/2024',
    title: 'Honda Việt Nam thông báo ngừng nhận đăng ký chương trình “Chinh...',
    imageSrc:
      'https://cdn.honda.com.vn/news-motorbike/September2024/vAPKaxLnIWMHzrVpyWdhLaXzZ7RiUT7ooeMOMoIC.png',
    isHot: false,
    delay: '200ms',
  },
  {
    id: 4,
    date: '20/08/2025',
    title: 'Honda Việt Nam giới thiệu ưu đãi đặc biệt mừng tháng 8...',
    imageSrc:
      'https://yamaha-motor.com.vn/wp/wp-content/uploads/2025/06/d04a4d192a9d8e6f36b63cdcda96c412.jpg',
    isHot: false,
    delay: '0ms',
  },
  {
    id: 5,
    date: '10/08/2025',
    title: 'Khuyến mãi “Sắm xe sang - Nhận quà vàng” áp dụng toàn quốc...',
    imageSrc:
      'https://yamaha-motor.com.vn/wp/wp-content/uploads/2024/11/4a28f54f7fd3763a3cf0cc7ca9fefa76-768x432.jpg',
    isHot: false,
    delay: '100ms',
  },
  {
    id: 6,
    date: '01/08/2025',
    title: 'Honda Việt Nam ra mắt chiến dịch “Tiết kiệm xăng - Rinh quà lớn”...',
    imageSrc:
      'https://yamaha-motor.com.vn/wp/wp-content/uploads/2024/07/Thumb_1720661013-1-768x432.jpg',
    isHot: false,
    delay: '200ms',
  },
])
const setupScrollAnimation = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    },
    {
      threshold: 0.1,
    },
  )
  const elementsToAnimate = document.querySelectorAll('.fade-in-up')
  elementsToAnimate.forEach((el) => observer.observe(el))
}
onMounted(() => {
  setupScrollAnimation()
})
</script>

<template>
  <div class="promotion-page text-gray-800">
    <main class="pb-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12 fade-in-up">
          <h1 class="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">Ưu Đãi Hấp Dẫn</h1>
          <p class="text-lg text-gray-500 max-w-2xl mx-auto">
            Đừng bỏ lỡ các chương trình khuyến mãi đặc biệt từ AnhEm Motor. Cập nhật ngay để nhận
            nhiều quà tặng giá trị!
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PromotionCard
            v-for="promotion in promotions"
            :key="promotion.id"
            :promotion="promotion"
          />
        </div>
      </div>
    </main>
  </div>
</template>
