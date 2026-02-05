<template>
  <div class="min-h-screen bg-gray-50">
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="flex items-center space-x-2">
            <li>
              <router-link to="/" class="text-gray-500 hover:text-gray-700">Trang chủ</router-link>
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <router-link to="/motorcycles" class="text-gray-500 hover:text-gray-700"
                >Xe máy</router-link
              >
            </li>
            <li v-if="product" class="flex items-center">
              <svg class="w-4 h-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="text-gray-900 font-medium">{{ product.name }}</span>
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <div v-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
          <div class="space-y-4">
            <div
              class="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center relative"
            >
              <img
                :src="selectedImage || product.image"
                :alt="product.name"
                class="w-full h-full object-contain transition-all duration-300"
              />
            </div>

            <div
              v-if="product.gallery && product.gallery.length > 0"
              class="grid grid-cols-4 gap-2"
            >
              <div
                v-for="(image, index) in product.gallery"
                :key="index"
                class="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 transition-colors"
                :class="{
                  'border-red-500': selectedImage === image,
                  'border-transparent hover:border-red-300': selectedImage !== image,
                }"
                @click="selectedImage = image"
              >
                <img
                  :src="image"
                  :alt="`${product.name} ${index + 1}`"
                  class="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <div>
              <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{{ product.name }}</h1>
              <div class="flex items-center space-x-4">
                <span class="text-3xl font-bold text-red-600">{{
                  formatPrice(product.price)
                }}</span>
                <span class="text-sm text-gray-500">Giá niêm yết</span>
              </div>
            </div>

            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Thông số kỹ thuật</h3>
              <div class="grid grid-cols-2 gap-4 text-sm sm:text-base">
                <div class="flex justify-between">
                  <span class="text-gray-600">Dung tích:</span>
                  <span class="font-medium">{{ product.cc ? product.cc + 'cc' : 'N/A' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Loại xe:</span>
                  <span class="font-medium">{{ getTypeLabel(product.type) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Thương hiệu:</span>
                  <span class="font-medium">{{ getBrandLabel(product.name) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Tình trạng:</span>
                  <span class="font-medium text-green-600">Còn hàng</span>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Mô tả sản phẩm</h3>
              <p class="text-gray-700 leading-relaxed">{{ product.desc }}</p>
            </div>

            <div class="space-y-4">
              <button
                @click="addToCart"
                class="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
              >
                <i class="fas fa-shopping-cart"></i>
                <span>Thêm vào giỏ hàng</span>
              </button>

              <div class="flex space-x-4">
                <button
                  class="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <i class="fas fa-heart mr-2"></i>
                  Yêu thích
                </button>
                <button
                  class="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <i class="fas fa-share mr-2"></i>
                  Chia sẻ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Sản phẩm liên quan</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
            @click="$router.push(`/product-details/${relatedProduct.id}`)"
          >
            <div
              class="aspect-square bg-gray-100 p-4 group-hover:scale-105 transition-transform duration-300"
            >
              <img
                :src="relatedProduct.image"
                :alt="relatedProduct.name"
                class="w-full h-full object-contain"
              />
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
                {{ relatedProduct.name }}
              </h3>
              <p class="text-red-600 font-bold">{{ formatPrice(relatedProduct.price) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"
        ></div>
        <p class="text-gray-600">Đang tải thông tin sản phẩm...</p>
      </div>
    </div>

    <div v-else class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <i class="fas fa-exclamation-triangle text-6xl text-gray-400 mb-4"></i>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Sản phẩm không tồn tại</h2>
        <p class="text-gray-600 mb-6">Sản phẩm bạn tìm kiếm không có trong hệ thống.</p>
        <router-link
          to="/motorcycles"
          class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Quay lại danh sách xe máy
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue' // SỬA LỖI: Thêm watch
import { useRoute } from 'vue-router'
import { useCart } from '@/composables/useCart.js'

// Route
const route = useRoute()

// Cart composable
const { addItem: addItemToCart } = useCart()

// State
const product = ref(null)
const selectedImage = ref('')
const loading = ref(true)

// Mock product data
const allProducts = ref([
  {
    id: 'adv350',
    name: 'ADV350',
    price: 165990000,
    image: 'moto/adv350_1.jpg',
    type: 'xe-ga',
    cc: 330,
    desc: 'Mẫu xe tay ga adventure độc đáo, mạnh mẽ và linh hoạt trên mọi địa hình.',
    gallery: [
      'moto/adv/1.jpg',
      'moto/adv/2.jpg',
      'moto/adv/3.jpg',
      'moto/adv/4.jpg',
      'moto/adv/5.jpg',
      'moto/adv/6.jpg',
    ],
    specifications: {
      engine: 'SOHC, 4 van, làm mát bằng dung dịch',
      power: '21.1 kW (28.7 PS) / 7,500 rpm',
      torque: '31.5 Nm / 5,250 rpm',
      transmission: 'Vô cấp CVT',
      fuelCapacity: '11.7 L',
      weight: '186 kg',
      dimensions: '2,200 x 895 x 1,395 mm',
      groundClearance: '165 mm',
      seatHeight: '795 mm',
      tires: 'Trước: 120/80-17, Sau: 150/70-17',
    },
  },
  {
    id: 'sh350i',
    name: 'SH350i',
    price: 151190000,
    image: 'moto/SH250i.png',
    type: 'xe-ga',
    cc: 330,
    desc: 'Biểu tượng của sự sang trọng và đẳng cấp, với động cơ eSP+ mạnh mẽ.',
  },
  {
    id: 'sh160i',
    name: 'SH160i/125i',
    price: 73921091,
    image: 'moto/SH160i.png',
    type: 'xe-ga',
    cc: 125,
    desc: 'Thiết kế châu Âu lịch lãm, công nghệ hiện đại và khả năng vận hành vượt trội.',
  },
  {
    id: 'shmode125',
    name: 'Sh Mode 125',
    price: 57132000,
    image: 'moto/ShMode.png',
    type: 'xe-ga',
    cc: 125,
    desc: 'Sự kết hợp hoàn hảo giữa thời trang và tiện ích, dành cho phái nữ hiện đại.',
  },
  {
    id: 'airblade',
    name: 'Air Blade 160/125',
    price: 42012000,
    image: 'moto/airblade160.webp',
    type: 'xe-ga',
    cc: 125,
    desc: 'Thiết kế thể thao, góc cạnh cùng động cơ eSP+ 4 van mạnh mẽ, tiết kiệm nhiên liệu.',
  },
  {
    id: 'vario125',
    name: 'Vario 125',
    price: 40735637,
    image: 'moto/vario125.png',
    type: 'xe-ga',
    cc: 125,
    desc: 'Mẫu xe tay ga thể thao với thiết kế nhỏ gọn, linh hoạt trong đô thị.',
  },
  {
    id: 'leadabs',
    name: 'Lead ABS',
    price: 39557455,
    image: 'moto/leads.png',
    type: 'xe-ga',
    cc: 125,
    desc: 'Mẫu xe tay ga với cốp chứa đồ siêu rộng và các tiện ích vượt trội cho gia đình.',
  },
  {
    id: 'supercub',
    name: 'Super Cub C125',
    price: 86292000,
    image: 'moto/cupc125.webp',
    type: 'xe-so',
    cc: 124,
    desc: 'Huyền thoại trở lại với thiết kế hoài cổ và công nghệ hiện đại.',
  },
  {
    id: 'future125',
    name: 'Future 125 FI',
    price: 30524727,
    image: 'moto/Future125.png',
    type: 'xe-so',
    cc: 125,
    desc: 'Mẫu xe số cao cấp, bền bỉ, tiết kiệm nhiên liệu và thiết kế sang trọng.',
  },
  {
    id: 'wavealpha',
    name: 'Wave Alpha cổ điển',
    price: 18939273,
    image: 'moto/wave alpha.webp',
    type: 'xe-so',
    cc: 110,
    desc: 'Mẫu xe số quốc dân, bền bỉ và tiết kiệm nhiên liệu, nay có phiên bản cổ điển.',
  },
  {
    id: 'blade',
    name: 'Blade',
    price: 18900000,
    image: 'moto/blade.webp',
    type: 'xe-so',
    cc: 110,
    desc: 'Thiết kế thể thao, nhỏ gọn, phù hợp với giới trẻ năng động.',
  },
  {
    id: 'exciter',
    name: 'Exciter',
    price: 45800000,
    image: 'moto/exciter.png',
    type: 'xe-con-tay',
    cc: 155,
    desc: '"Ông vua đường phố" với động cơ 155 VVA mạnh mẽ và thiết kế thể thao.',
  },
  {
    id: 'sirius',
    name: 'Sirius FI',
    price: 21208000,
    image: 'moto/siriusFI.png',
    type: 'xe-so',
    cc: 115,
    desc: 'Mẫu xe số phổ thông bền bỉ, tiết kiệm xăng của Yamaha.',
  },
  {
    id: 'goldwing',
    name: 'Gold Wing 2025',
    price: 1231500000,
    image: 'moto/gold.png',
    type: 'xe-the-thao',
    cc: 1833,
    desc: 'Mẫu xe touring hạng sang, biểu tượng của sự sang trọng và công nghệ đỉnh cao.',
  },
  {
    id: 'cbr1000',
    name: 'CBR1000RR-RFireblade SP 2024',
    price: 1051000000,
    image: 'moto/CBR1000RR.png',
    type: 'xe-the-thao',
    cc: 1000,
    desc: 'Siêu phẩm Sportbike, được phát triển từ công nghệ của đường đua MotoGP.',
  },
  {
    id: 'africatwin_sport',
    name: 'Africa Twin 2025 - Bản Adventure Sports',
    price: 620990000,
    image: 'moto/africatwin.png',
    type: 'xe-the-thao',
    cc: 1084,
    desc: 'Mẫu xe Adventure đầu bảng, sẵn sàng chinh phục mọi cung đường off-road.',
  },
  {
    id: 'africatwin_std',
    name: 'Africa Twin 2025 – Bản Tiêu chuẩn',
    price: 540990000,
    image: 'moto/africatc.png',
    type: 'xe-the-thao',
    cc: 1084,
    desc: 'Phiên bản tiêu chuẩn của huyền thoại Adventure, linh hoạt và mạnh mẽ.',
  },
  {
    id: 'cb1000r',
    name: 'CB1000R 2023',
    price: 510500000,
    image: 'moto/CBR10002023.jpg',
    type: 'xe-the-thao',
    cc: 998,
    desc: 'Thiết kế Neo Sports Café độc đáo, kết hợp giữa cổ điển và hiện đại.',
  },
  {
    id: 'rabel1100',
    name: 'Rabel 1100 2025',
    price: 399990000,
    image: 'moto/Rabell 1100.png',
    type: 'xe-the-thao',
    cc: 1084,
    desc: 'Mẫu xe Cruiser mạnh mẽ với động cơ từ Africa Twin, mang lại trải nghiệm lái phấn khích.',
  },
  {
    id: 'cb1000hornet',
    name: 'CB1000 Hornet',
    price: 339900000,
    image: 'moto/CB1000 Hornet.png',
    type: 'xe-the-thao',
    cc: 999,
    desc: 'Sự trở lại của "ong bắp cày" với thiết kế hầm hố và hiệu suất vượt trội.',
  },
  {
    id: 'transalp',
    name: 'Transalp 2025',
    price: 299990000,
    image: 'moto/CB1000 Hornet.png',
    type: 'xe-the-thao',
    cc: 755,
    desc: 'Mẫu xe Adventure tầm trung, linh hoạt trên cả đường trường và off-road.',
  },
  {
    id: 'cbr650r',
    name: 'CBR650R 2024',
    price: 264990000,
    image: 'moto/CBR650R.webp',
    type: 'xe-the-thao',
    cc: 649,
    desc: 'Thiết kế Sportbike thể thao, âm thanh động cơ 4 xi-lanh đầy uy lực.',
  },
  {
    id: 'cbr500r',
    name: 'CBR500R 2024',
    price: 192990000,
    image: 'moto/CBR500R.png',
    type: 'xe-the-thao',
    cc: 471,
    desc: 'Mẫu xe Sportbike tầm trung, phù hợp cho người mới chơi xe phân khối lớn.',
  },
  {
    id: 'cb500hornet',
    name: 'CB500 Hormet',
    price: 184990000,
    image: 'moto/CB1000 Hornet.png',
    type: 'xe-the-thao',
    cc: 471,
    desc: 'Thiết kế Streetlight hầm hố, thừa hưởng DNA từ CB1000 Hornet.',
  },
  {
    id: 'cl500',
    name: 'CL500',
    price: 180990000,
    image: 'moto/CL500.png',
    type: 'xe-the-thao',
    cc: 471,
    desc: 'Phong cách Scrambler cổ điển, dễ dàng tùy biến theo cá tính riêng.',
  },
  {
    id: 'cbr150r',
    name: 'CBR150R',
    price: 72290000,
    image: 'moto/CBR150R.webp',
    type: 'xe-con-tay',
    cc: 149,
    desc: 'Mẫu xe Sportbike 150cc, thiết kế lấy cảm hứng từ các đàn anh phân khối lớn.',
  },
  {
    id: 'winnerr',
    name: 'Winner X', // SỬA LỖI: Sửa tên hiển thị cho chuẩn
    price: 46160000,
    image: 'moto/Winner.webp',
    type: 'xe-con-tay',
    cc: 150,
    desc: 'Mẫu xe côn tay thể thao, hiệu suất cao và trang bị phanh ABS an toàn.',
  },
  {
    id: 'vstrom250',
    name: 'V-STROM 250',
    price: 132900000,
    image: 'moto/V-Storm.jpg',
    type: 'xe-con-tay',
    cc: 248,
    desc: 'Mẫu xe Adventure cỡ nhỏ của Suzuki, bền bỉ và đa dụng.',
  },
  {
    id: 'satria',
    name: 'SATRIA F150',
    price: 53490000,
    image: 'moto/Satria.webp',
    type: 'xe-con-tay',
    cc: 147,
    desc: 'Mẫu xe Hyper Underdone với tốc độ và khả năng tăng tốc ấn tượng.',
  },
  {
    id: 'icone',
    name: 'ICON E',
    price: 26803637,
    image: 'moto/ICON.webp',
    type: 'xe-dien',
    cc: 0,
    desc: 'Mẫu xe máy điện với thiết kế thời trang, nhỏ gọn và thân thiện môi trường.',
  },
  {
    id: 'neos',
    name: "NEO'S",
    price: 49091637,
    image: 'moto/NEO.jpg',
    type: 'xe-dien',
    cc: 0,
    desc: 'Xe điện Yamaha với thiết kế hiện đại, pin có thể tháo rời tiện lợi.',
  },
])

// Computed
const relatedProducts = computed(() => {
  if (!product.value) return []
  return allProducts.value
    .filter((p) => p.type === product.value.type && p.id !== product.value.id)
    .slice(0, 4)
})

// Methods
function formatPrice(price) {
  if (typeof price !== 'number') return ''
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

function getTypeLabel(type) {
  const typeMap = {
    'xe-ga': 'Xe tay ga',
    'xe-so': 'Xe số',
    'xe-con-tay': 'Xe côn tay',
    'xe-the-thao': 'Xe thể thao',
    'xe-dien': 'Xe điện',
  }
  return typeMap[type] || type
}

function getBrandLabel(productName) {
  const name = productName.toLowerCase()

  // SỬA LỖI: Thêm winner vào danh sách Honda
  if (
    name.includes('honda') ||
    name.includes('winner') ||
    name.includes('cb') ||
    name.includes('cbr') ||
    name.includes('sh') ||
    name.includes('air blade') ||
    name.includes('vario') ||
    name.includes('lead') ||
    name.includes('future') ||
    name.includes('wave') ||
    name.includes('blade') ||
    name.includes('super cub') ||
    name.includes('adv') ||
    name.includes('africa') ||
    name.includes('gold wing') ||
    name.includes('rebel') ||
    name.includes('transalp') ||
    name.includes('cl500')
  ) {
    return 'Honda'
  }
  if (
    name.includes('yamaha') ||
    name.includes('exciter') ||
    name.includes('sirius') ||
    name.includes('jupiter') ||
    name.includes('janus') ||
    name.includes('grande') ||
    name.includes('nvx') ||
    name.includes('latte') ||
    name.includes('neo')
  ) {
    return 'Yamaha'
  }
  if (
    name.includes('suzuki') ||
    name.includes('satria') ||
    name.includes('v-strom') ||
    name.includes('raider') ||
    name.includes('burgman')
  ) {
    return 'Suzuki'
  }
  return 'Khác'
}

function addToCart() {
  if (product.value) {
    addItemToCart(product.value, 1)
    alert('Đã thêm sản phẩm vào giỏ hàng!')
  }
}

// Hàm load sản phẩm (để tái sử dụng)
const loadProduct = (productId) => {
  loading.value = true
  selectedImage.value = '' // Reset ảnh khi chuyển sản phẩm

  // Giả lập delay mạng nhẹ
  setTimeout(() => {
    product.value = allProducts.value.find((p) => p.id === productId)
    loading.value = false
    // Cuộn lên đầu trang
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, 200)
}

// Lifecycle
onMounted(() => {
  loadProduct(route.params.id)
})

// SỬA LỖI: Watch để phát hiện thay đổi trên URL (chuyển sản phẩm)
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      loadProduct(newId)
    }
  },
)
</script>

<style scoped>
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}
</style>
