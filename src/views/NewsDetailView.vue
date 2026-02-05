<template>
  <div class="bg-white min-h-screen">
    <div v-if="news" class="pt-20 lg:pt-24">
      <main class="container mx-auto px-4 py-8 md:py-12">
        <div class="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <!-- Main Article -->
          <article class="flex-1 lg:w-2/3">
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-dark-text mb-4 leading-tight">
              {{ news.title }}
            </h1>
            
            <div class="flex items-center space-x-4 text-sm text-gray-600 mb-6 border-b border-gray-200 pb-4">
              <span class="text-primary-red font-bold uppercase">{{ news.category }}</span>
              <span class="text-gray-400">|</span>
              <span><i class="far fa-clock mr-1"></i>{{ news.date }}</span>
            </div>

            <!-- Featured Image -->
            <img 
              :src="news.image" 
              :alt="news.title"
              class="w-full rounded-xl shadow-lg mb-8 object-cover max-h-[500px]"
            >

            <!-- Content -->
            <div class="prose prose-lg max-w-none text-gray-800 leading-relaxed">
              <div v-html="news.content"></div>
            </div>

            <!-- Share Buttons -->
            <div class="mt-10 pt-6 border-t border-gray-200">
              <h3 class="text-lg font-bold mb-4">Chia sẻ bài viết</h3>
              <div class="flex space-x-3">
                <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <i class="fab fa-facebook-f mr-2"></i>Facebook
                </button>
                <button class="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                  <i class="fab fa-twitter mr-2"></i>Twitter
                </button>
                <button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  <i class="fas fa-link mr-2"></i>Copy Link
                </button>
              </div>
            </div>
          </article>

          <!-- Sidebar -->
          <aside class="lg:w-1/3">
            <NewsSidebar :relatedNews="relatedNews" />
          </aside>
        </div>
      </main>
    </div>

    <!-- Not Found -->
    <div v-else class="container mx-auto px-4 py-20 text-center">
      <i class="fas fa-exclamation-triangle text-6xl text-gray-400 mb-4"></i>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy tin tức</h2>
      <router-link to="/news" class="text-primary-red hover:underline">
        ← Quay lại trang tin tức
      </router-link>
    </div>
  </div>
</template>

<script>
import NewsSidebar from '@/components/news/NewsSidebar.vue';
import { getNewsBySlug, getAllNews } from '@/data/newsData';

export default {
  name: 'NewsDetailView',
  components: {
    NewsSidebar
  },
  data() {
    return {
      news: null,
      relatedNews: []
    };
  },
  methods: {
    loadNews() {
      const slug = this.$route.params.slug;
      this.news = getNewsBySlug(slug);
      
      if (this.news) {
        // Get related news (exclude current article)
        const allNews = getAllNews();
        this.relatedNews = allNews
          .filter(n => n.id !== this.news.id)
          .slice(0, 4);
      }
    }
  },
  mounted() {
    this.loadNews();
  },
  watch: {
    '$route.params.slug': {
      handler() {
        this.loadNews();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }
};
</script>

<style scoped>
.prose {
  font-size: 1.125rem;
  line-height: 1.75;
}

.prose p {
  margin-bottom: 1.25rem;
  text-align: justify;
}

.prose img {
  width: 100%;
  margin: 1.5rem 0;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.prose strong {
  font-weight: 700;
  color: #1F2937;
}
</style>