<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Banner -->
    <PromotionBanner />

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-12 md:py-16">
      <!-- Promotions Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div
          v-for="(promotion, index) in promotions"
          :key="promotion.id"
          class="animate-fade-in-up"
          :style="{ animationDelay: `${(index % 3) * 100}ms` }"
        >
          <PromotionCard :promotion="promotion" />
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="promotions.length === 0" class="text-center py-20">
        <i class="fas fa-tags text-6xl text-gray-300 mb-4"></i>
        <h3 class="text-2xl font-bold text-gray-600 mb-2">Chưa có chương trình khuyến mãi</h3>
        <p class="text-gray-500">Vui lòng quay lại sau để cập nhật các ưu đãi mới nhất</p>
      </div>
    </main>

    <!-- Scroll to Top Button -->
    <ScrollToTop />
  </div>
</template>

<script>
import PromotionBanner from '@/components/promotion/PromotionBanner.vue';
import PromotionCard from '@/components/promotion/PromotionCard.vue';
import ScrollToTop from '@/components/promotion/ScrollToTop.vue';
import { getAllPromotions } from '@/data/promotionData';

export default {
  name: 'PromotionListView',
  components: {
    PromotionBanner,
    PromotionCard,
    ScrollToTop
  },
  data() {
    return {
      promotions: []
    };
  },
  mounted() {
    this.promotions = getAllPromotions();
  },
  metaInfo: {
    title: 'Chương trình khuyến mãi xe máy | AnhEm Motor'
  }
};
</script>

<style scoped>
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

.animate-fade-in-up {
  animation: fadeInUp 0.6s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
  opacity: 0;
}
</style>
