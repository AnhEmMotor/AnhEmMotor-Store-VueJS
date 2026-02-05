<template>
  <div class="bg-white min-h-screen">
    <!-- Banner -->
    <NewsBanner />

    <main class="pt-12 md:pt-16 pb-12">
      <!-- Featured News Section -->
      <section class="container mx-auto px-4 mb-12 md:mb-16">
        <h2 class="text-3xl md:text-4xl font-extrabold text-center text-primary-red mb-8 md:mb-12 border-b-2 border-primary-light pb-4">
          NỔI BẬT TRONG TUẦN
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div
            v-for="(news, index) in featuredNews"
            :key="news.id"
            class="animate-fade-in-up"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <NewsCard :news="news" />
          </div>
        </div>
      </section>

      <!-- All News Section -->
      <section class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-extrabold text-center text-primary-red mb-8 md:mb-12 border-b-2 border-primary-light pb-4">
          TẤT CẢ TIN TỨC
        </h2>

        <div class="space-y-6">
          <div
            v-for="(news, index) in paginatedNews"
            :key="news.id"
            class="animate-fade-in-up"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <NewsCardHorizontal :news="news" />
          </div>
        </div>

        <!-- Pagination -->
        <Pagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          @page-change="handlePageChange"
        />
      </section>
    </main>
  </div>
</template>

<script>
import NewsBanner from '@/components/news/NewsBanner.vue'
import NewsCard from '@/components/news/NewsCard.vue'
import NewsCardHorizontal from '@/components/news/NewsCardHorizontal.vue'
import Pagination from '@/components/common/Pagination.vue'
import { getFeaturedNews, getAllNews } from '@/data/newsData'

export default {
  name: 'NewsListView',
  components: {
    NewsBanner,
    NewsCard,
    NewsCardHorizontal,
    Pagination
  },
  data() {
    return {
      featuredNews: [],
      allNews: [],
      currentPage: 1,
      itemsPerPage: 5
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.allNews.length / this.itemsPerPage)
    },
    paginatedNews() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.allNews.slice(start, end)
    }
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
  mounted() {
    this.featuredNews = getFeaturedNews()
    this.allNews = getAllNews()
  }
}
</script>


<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}
</style>
