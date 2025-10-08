<template>
  <div class="bg-gray-100 font-sans text-gray-800">
    <!-- Header -->
    <header
      class="fixed top-0 w-full z-50 bg-gradient-to-br from-white/98 to-rose-50/95 py-2.5 shadow-lg backdrop-blur-lg transition-all duration-300 ease-in-out"
    >
      <div class="max-w-7xl mx-auto px-5">
        <div class="relative flex h-20 items-center justify-between">
          <!-- Mobile menu toggle -->
          <button
            class="lg:hidden p-2.5 text-red-500 rounded-lg text-xl transition-all duration-300 ease-in-out hover:bg-red-500/10"
            @click="openMobileNav"
          >
            <i class="fas fa-bars"></i>
          </button>

          <!-- Logo -->
          <a
            href="index.html"
            class="flex items-center gap-4 whitespace-nowrap text-red-500 transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <div
              class="w-10 h-10 sm:w-12 sm:h-12 bg-red-500 rounded-full flex items-center justify-center overflow-hidden"
            >
              <img
                src="/src/assets/image/logo.png"
                alt="AnhEm Motor"
                class="w-full h-full object-cover"
              />
            </div>
            <span class="text-2xl sm:text-3xl font-extrabold text-red-500">AnhEm Motor</span>
          </a>

          <!-- Desktop nav -->
          <nav class="hidden lg:flex ml-auto">
            <ul class="flex list-none gap-5 m-0 p-0">
              <li class="whitespace-nowrap">
                <a
                  href="index.html"
                  class="relative rounded-full py-2 px-4 text-base font-semibold text-gray-800 no-underline transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-red-500/10 hover:text-red-500"
                  >Trang Chủ</a
                >
              </li>
              <li class="whitespace-nowrap">
                <a
                  href="listings.html"
                  class="relative rounded-full py-2 px-4 text-base font-semibold text-gray-800 no-underline transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-red-500/10 hover:text-red-500"
                  >Sản Phẩm</a
                >
              </li>
              <li class="whitespace-nowrap">
                <a
                  href="about.html"
                  class="relative rounded-full py-2 px-4 text-base font-semibold text-gray-800 no-underline transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-red-500/10 hover:text-red-500"
                  >Giới Thiệu</a
                >
              </li>
              <li class="whitespace-nowrap">
                <a
                  href="news.html"
                  class="relative rounded-full py-2 px-4 text-base font-semibold text-gray-800 no-underline transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-red-500/10 hover:text-red-500"
                  >Tin Tức-Sự Kiện</a
                >
              </li>
              <li class="whitespace-nowrap">
                <a
                  href="promotion.html"
                  class="relative rounded-full py-2 px-4 text-base font-semibold text-gray-800 no-underline transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-red-500/10 hover:text-red-500"
                  >Khuyến Mãi</a
                >
              </li>
              <li class="whitespace-nowrap">
                <a
                  href="contact.html"
                  class="relative rounded-full py-2 px-4 text-base font-semibold text-gray-800 no-underline transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-red-500/10 hover:text-red-500"
                  >Liên Hệ</a
                >
              </li>
              <li class="whitespace-nowrap">
                <a
                  href="service.html"
                  class="relative rounded-full py-2 px-4 text-base font-semibold text-gray-800 no-underline transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-red-500/10 hover:text-red-500"
                  >Dịch Vụ</a
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <!-- mobile overlay -->
      <div
        class="fixed inset-0 z-[1050] h-full w-full bg-black/50 transition-opacity duration-300 ease-in-out"
        :class="mobileNavActive ? 'block opacity-100' : 'hidden opacity-0'"
        @click="closeMobileNav"
      ></div>

      <!-- mobile nav -->
      <nav
        class="fixed top-0 h-screen w-[280px] bg-red-500 shadow-lg z-[1100] flex flex-col transition-all duration-300 ease-in-out"
        :class="mobileNavActive ? 'left-0' : '-left-[300px]'"
      >
        <div class="flex items-center justify-between border-b border-white/20 p-5">
          <h3 class="m-0 text-2xl text-white">Menu</h3>
          <button
            class="cursor-pointer rounded-md border-none bg-transparent p-1 text-2xl text-white transition-all duration-300 ease-in-out hover:bg-white/10"
            @click="closeMobileNav"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        <ul class="m-0 flex-grow list-none bg-white p-5">
          <li>
            <a
              href="index.html"
              @click="closeMobileNav"
              class="block rounded-none border-b border-gray-200 py-4 px-5 font-semibold text-gray-800 no-underline transition-all duration-300 ease-in-out hover:bg-rose-50 hover:text-red-500"
              >Trang Chủ</a
            >
          </li>
          <li>
            <a
              href="listings.html"
              @click="closeMobileNav"
              class="block rounded-none border-b border-gray-200 py-4 px-5 font-semibold text-gray-800 no-underline transition-all duration-300 ease-in-out hover:bg-rose-50 hover:text-red-500"
              >Sản Phẩm</a
            >
          </li>
          <li>
            <a
              href="about.html"
              @click="closeMobileNav"
              class="block rounded-none border-b border-gray-200 py-4 px-5 font-semibold text-gray-800 no-underline transition-all duration-300 ease-in-out hover:bg-rose-50 hover:text-red-500"
              >Giới Thiệu</a
            >
          </li>
          <li>
            <a
              href="news.html"
              @click="closeMobileNav"
              class="block rounded-none border-b border-gray-200 py-4 px-5 font-semibold text-gray-800 no-underline transition-all duration-300 ease-in-out hover:bg-rose-50 hover:text-red-500"
              >Tin Tức-Sự Kiện</a
            >
          </li>
          <li>
            <a
              href="promotion.html"
              @click="closeMobileNav"
              class="block rounded-none border-b border-gray-200 py-4 px-5 font-semibold text-gray-800 no-underline transition-all duration-300 ease-in-out hover:bg-rose-50 hover:text-red-500"
              >Khuyến Mãi</a
            >
          </li>
          <li>
            <a
              href="contact.html"
              @click="closeMobileNav"
              class="block rounded-none border-b border-gray-200 py-4 px-5 font-semibold text-gray-800 no-underline transition-all duration-300 ease-in-out hover:bg-rose-50 hover:text-red-500"
              >Liên Hệ</a
            >
          </li>
          <li>
            <a
              href="service.html"
              @click="closeMobileNav"
              class="block rounded-none py-4 px-5 font-semibold text-gray-800 no-underline transition-all duration-300 ease-in-out hover:bg-rose-50 hover:text-red-500"
              >Dịch Vụ</a
            >
          </li>
        </ul>
      </nav>
    </header>

    <!-- Main content (About) -->
    <main class="max-w-7xl mx-auto pt-28 sm:pt-32 pb-10 px-5 sm:px-10">
      <h2 class="text-3xl md:text-4xl text-center mb-8 font-bold text-red-500">
        Sứ Mệnh Của Chúng Tôi
      </h2>
      <p class="mb-6 leading-relaxed">
        Tại AnhEm Moto, chúng tôi không chỉ đơn thuần là một cửa hàng xe máy – chúng tôi là người
        bạn đồng hành tin cậy trên mỗi chặng đường. Sứ mệnh của chúng tôi là mang đến cho khách hàng
        những phương tiện di chuyển an toàn, bền bỉ và phù hợp nhất với nhu cầu cá nhân, đồng thời
        xây dựng một cộng đồng người yêu xe mạnh mẽ và gắn kết.
      </p>

      <h2 class="text-3xl md:text-4xl text-center mb-8 font-bold text-red-500">
        Dịch Vụ Tại AnhEm Moto
      </h2>
      <ul class="list-disc ml-5 mb-8 space-y-2.5">
        <li>
          <strong>Bán xe mới và xe đã qua sử dụng:</strong> Đầy đủ giấy tờ, chất lượng kiểm định kỹ
          càng, giá cạnh tranh.
        </li>
        <li>
          <strong>Dịch vụ bảo trì – sửa chữa:</strong> Đội ngũ kỹ thuật viên chuyên nghiệp, phụ tùng
          chính hãng, quy trình minh bạch.
        </li>
        <li>
          <strong>Thu mua – đổi xe:</strong> Hỗ trợ định giá nhanh chóng, thủ tục đơn giản, hỗ trợ
          sang tên.
        </li>
        <li>
          <strong>Tư vấn và hỗ trợ trả góp:</strong> Hợp tác cùng nhiều đơn vị tài chính uy tín, thủ
          tục dễ dàng, lãi suất ưu đãi.
        </li>
      </ul>

      <h2 class="text-3xl md:text-4xl text-center mb-8 font-bold text-red-500">
        Cam Kết Từ AnhEm Moto
      </h2>
      <p class="mb-6 leading-relaxed">
        ✅ Xe đúng chất lượng như cam kết <br />
        ✅ Không xe tai nạn, ngập nước <br />
        ✅ Giá bán hợp lý, minh bạch <br />
        ✅ Bảo hành rõ ràng, dịch vụ hậu mãi tận tâm <br />
        ✅ Hỗ trợ khách hàng từ khâu tư ván đến sau khi mua
      </p>

      <h2 class="text-3xl md:text-4xl text-center mb-8 font-bold text-red-500">
        Tại Sao Chọn Chúng Tôi?
      </h2>
      <p class="mb-6 leading-relaxed">
        ✔ Hơn <strong>10 năm kinh nghiệm</strong> trong lĩnh vực xe máy tại TP.HCM <br />
        ✔ <strong>Hàng ngàn khách hàng hài lòng</strong> và quay lại mua xe lần 2, lần 3 <br />
        ✔ Không gian cửa hàng hiện đại, dễ tiếp cận, đội ngũ nhân viên thân thiện, hỗ trợ nhiệt
        tình <br />
        ✔ Cập nhật liên tục các dòng xe mới nhất trên thị trường
      </p>

      <h2 class="text-3xl md:text-4xl text-center mb-8 font-bold text-red-500">
        Liên Hệ Với Chúng Tôi
      </h2>
      <p class="mb-6 leading-relaxed">
        Hãy ghé thăm cửa hàng AnhEm Moto để trải nghiệm thực tế và nhận tư vấn chi tiết về chiếc xe
        phù hợp nhất với bạn. Chúng tôi luôn sẵn sàng hỗ trợ!
      </p>
      <p><strong>Hotline:</strong> 0901 234 567 | <strong>Email:</strong> info@anhemmotor.vn</p>
    </main>

    <!-- Video section -->
    <section
      class="py-10 sm:py-16 px-4 sm:px-5 mb-10 bg-gradient-to-br from-gray-900 to-gray-800 text-white"
    >
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl md:text-4xl text-center mb-4 font-bold text-white drop-shadow-md">
          Yamaha - Revs Your Heart
        </h2>
        <p class="text-center text-lg text-gray-300 mb-10">
          Khám phá thế giới xe máy Yamaha đầy cảm hứng
        </p>

        <div
          class="relative w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black"
        >
          <iframe
            class="absolute inset-0 w-full h-full border-none rounded-2xl"
            src="https://www.youtube.com/embed/HMpEe4_Gnd4"
            title="Yamaha Video Trailer - Revs Your Heart"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          >
          </iframe>
        </div>
      </div>
    </section>

    <!-- Map section -->
    <section class="bg-white py-10 sm:py-16 px-4 sm:px-5 mb-10">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl md:text-4xl text-center mb-4 font-bold text-red-500">
          Bản Đồ Các Cơ Sở
        </h2>
        <p class="text-center text-lg text-gray-500 mb-10">Tìm cơ sở AnhEm Moto gần bạn nhất</p>

        <div class="rounded-2xl overflow-hidden shadow-xl h-[350px] md:h-[500px] relative mb-8">
          <iframe
            id="mapFrame"
            class="w-full h-full border-none"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251637.95196238213!2d106.36556092593408!3d10.755292865496954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2zVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1709123456789!5m2!1svi!2s"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          >
          </iframe>
        </div>

        <div class="mt-8 bg-white p-5 rounded-xl shadow-lg">
          <h3 class="text-red-500 mb-5 text-center font-bold text-2xl">🗺️ Các Cơ Sở Trên Bản Đồ</h3>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div
              class="flex flex-col sm:flex-row items-center justify-between p-4 border-l-4 border-red-500 bg-gray-50 rounded-lg transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg text-center sm:text-left gap-2.5"
              v-for="(loc, idx) in locations"
              :key="idx"
            >
              <div class="flex items-center">
                <span class="text-red-500 text-xl mr-2.5">📍</span>
                <div class="location-details">
                  <strong class="block mb-1">{{ loc.title }}</strong>
                  <small class="text-gray-600">{{ loc.address }}</small>
                </div>
              </div>
              <button
                class="bg-red-500 text-white border-none py-2 px-4 rounded-md cursor-pointer text-xs font-bold transition-all duration-300 ease-in-out hover:bg-red-600 hover:scale-105"
                @click="searchLocation(loc.address)"
              >
                🔍 Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gradient-to-br from-gray-800 to-slate-800 text-white pt-16 pb-5">
      <div class="max-w-7xl mx-auto px-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div class="footer-col">
            <h3 class="text-red-500 mb-5 text-xl font-bold">Thông Tin Liên Hệ</h3>
            <p class="text-white/80 leading-loose mb-2">
              <i class="fas fa-map-marker-alt mr-2"></i>193 Đỗ Văn Thi, Phường Trấn Biên, TP. Biên
              Hoà, Tỉnh Đồng Nai
            </p>
            <p class="text-white/80 leading-loose mb-2">
              <i class="fas fa-phone mr-2"></i>(024) 8582 0808
            </p>
            <p class="text-white/80 leading-loose mb-2">
              <i class="fas fa-envelope mr-2"></i>anhemmotor@gmail.com
            </p>
            <div class="flex gap-4 mt-5">
              <a
                href="#"
                class="w-11 h-11 bg-red-500/20 flex items-center justify-center rounded-full text-white text-lg transition-all duration-300 ease-in-out hover:bg-red-500 hover:-translate-y-1"
                ><i class="fab fa-facebook-f"></i
              ></a>
              <a
                href="#"
                class="w-11 h-11 bg-red-500/20 flex items-center justify-center rounded-full text-white text-lg transition-all duration-300 ease-in-out hover:bg-red-500 hover:-translate-y-1"
                ><i class="fab fa-youtube"></i
              ></a>
              <a
                href="#"
                class="w-11 h-11 bg-red-500/20 flex items-center justify-center rounded-full text-white text-lg transition-all duration-300 ease-in-out hover:bg-red-500 hover:-translate-y-1"
                ><i class="fab fa-instagram"></i
              ></a>
              <a
                href="#"
                class="w-11 h-11 bg-red-500/20 flex items-center justify-center rounded-full text-white text-lg transition-all duration-300 ease-in-out hover:bg-red-500 hover:-translate-y-1"
                ><i class="fab fa-tiktok"></i
              ></a>
            </div>
          </div>
          <div class="footer-col">
            <h3 class="text-red-500 mb-5 text-xl font-bold">Sản Phẩm</h3>
            <ul class="space-y-2">
              <li>
                <a
                  href="#"
                  class="text-white/80 leading-loose transition-colors duration-300 ease-in-out hover:text-red-500"
                  >Xe máy Honda</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-white/80 leading-loose transition-colors duration-300 ease-in-out hover:text-red-500"
                  >Xe máy Yamaha</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-white/80 leading-loose transition-colors duration-300 ease-in-out hover:text-red-500"
                  >Xe máy Suzuki</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-white/80 leading-loose transition-colors duration-300 ease-in-out hover:text-red-500"
                  >Xe máy Kawasaki</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-white/80 leading-loose transition-colors duration-300 ease-in-out hover:text-red-500"
                  >Phụ kiện xe máy</a
                >
              </li>
            </ul>
          </div>
          <div class="footer-col">
            <h3 class="text-red-500 mb-5 text-xl font-bold">Dịch Vụ</h3>
            <ul class="space-y-2">
              <li>
                <a
                  href="#"
                  class="text-white/80 leading-loose transition-colors duration-300 ease-in-out hover:text-red-500"
                  >Bảo dưỡng định kỳ</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-white/80 leading-loose transition-colors duration-300 ease-in-out hover:text-red-500"
                  >Sửa chữa xe máy</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-white/80 leading-loose transition-colors duration-300 ease-in-out hover:text-red-500"
                  >Đăng ký xe</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-white/80 leading-loose transition-colors duration-300 ease-in-out hover:text-red-500"
                  >Bảo hiểm xe máy</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-white/80 leading-loose transition-colors duration-300 ease-in-out hover:text-red-500"
                  >Tư vấn mua xe</a
                >
              </li>
            </ul>
          </div>
          <div class="footer-col">
            <h3 class="text-red-500 mb-5 text-xl font-bold">Hỗ Trợ</h3>
            <ul class="space-y-2">
              <li>
                <a
                  href="#"
                  class="text-white/80 leading-loose transition-colors duration-300 ease-in-out hover:text-red-500"
                  >Chính sách bảo hành</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-white/80 leading-loose transition-colors duration-300 ease-in-out hover:text-red-500"
                  >Hướng dẫn sử dụng</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-white/80 leading-loose transition-colors duration-300 ease-in-out hover:text-red-500"
                  >FAQ</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-white/80 leading-loose transition-colors duration-300 ease-in-out hover:text-red-500"
                  >Liên hệ hỗ trợ</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-white/80 leading-loose transition-colors duration-300 ease-in-out hover:text-red-500"
                  >Sitemap</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="text-center pt-8 border-t border-white/10 text-white/60">
          <p>© 2025 AnhEm Motor. Mọi quyền được bảo lưu. | Thiết kế bởi AnhEm Team</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      mobileNavActive: false,
      locations: [
        { title: 'Cơ Sở 1 - TP.HCM', address: '123 Nguyễn Văn Cừ, Quận 5, TP.HCM' },
        { title: 'Cơ Sở 2 - Hà Nội', address: '456 Giải Phóng, Hai Bà Trưng, Hà Nội' },
        { title: 'Cơ Sở 3 - Đà Nẵng', address: '789 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng' },
        { title: 'Cơ Sở 4 - Cần Thơ', address: '321 3 Tháng 2, Ninh Kiều, Cần Thơ' },
        { title: 'Cơ Sở 5 - Nha Trang', address: '654 Trần Phú, Nha Trang, Khánh Hòa' },
        { title: 'Cơ Sở 6 - Hải Phòng', address: '147 Lê Hồng Phong, Ngô Quyền, Hải Phòng' },
      ],
    }
  },
  methods: {
    openMobileNav() {
      this.mobileNavActive = true
      document.body.style.overflow = 'hidden'
    },
    closeMobileNav() {
      this.mobileNavActive = false
      document.body.style.overflow = ''
    },
    searchLocation(address) {
      const encodedAddress = encodeURIComponent(address)
      const searchUrl = `https://www.google.com/maps/search/${encodedAddress}/@10.755,106.965,12z`
      window.open(searchUrl, '_blank')
      this.showNotification(`Đang tìm kiếm: ${address}`)
    },
    showNotification(message) {
      const notification = document.createElement('div')
      notification.innerHTML = `
        <div style="
          position: fixed;
          top: 20px;
          right: 20px;
          background: #E65151;
          color: white;
          padding: 15px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          z-index: 9999;
          animation: slideIn 0.3s ease;
        ">
          <strong>🗺️ ${message}</strong>
          <div style="font-size: 12px; margin-top: 5px; opacity: 0.9;">
              Đã mở Google Maps trong tab mới
          </div>
        </div>
      `

      const style = document.createElement('style')
      style.textContent = `
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `
      document.head.appendChild(style)
      document.body.appendChild(notification)

      setTimeout(() => {
        const child = notification.firstElementChild
        if (child) child.style.animation = 'slideOut 0.3s ease forwards'
        setTimeout(() => {
          if (notification.parentNode) notification.parentNode.removeChild(notification)
          if (style.parentNode) style.parentNode.removeChild(style)
        }, 300)
      }, 3000)
    },
  },
  mounted() {
    // nếu page load với mobileNav active, đảm bảo body overflow
    if (this.mobileNavActive) document.body.style.overflow = 'hidden'
  },
  beforeUnmount() {
    document.body.style.overflow = ''
  },
}
</script>
