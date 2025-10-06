<script setup>

// setupScrollAnimation sẽ được gọi trong App.vue
</script>

<template>
    <!-- FOOTER -->
    <footer class="bg-gray-800 text-white">
        <div class="container mx-auto px-4 py-12">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <!-- About Us -->
                <div class="fade-in-up">
                    <h3 class="text-xl font-bold mb-4 text-primary">Về AnhEm Motor</h3>
                    <p class="text-gray-400 leading-relaxed">Đại lý chính thức của Honda, chuyên cung cấp xe máy, phụ
                        tùng chính hãng và dịch vụ hậu mãi uy tín hàng đầu.</p>
                </div>
                <!-- Quick Links -->
                <div class="fade-in-up" style="transition-delay: 100ms;">
                    <h3 class="text-xl font-bold mb-4 text-primary">Chính sách</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-gray-400 hover:text-white transition duration-300">Chính sách bảo
                                mật</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition duration-300">Chính sách đổi
                                trả</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition duration-300">Điều khoản sử
                                dụng</a></li>
                    </ul>
                </div>
                <!-- Contact Info -->
                <div class="fade-in-up" style="transition-delay: 200ms;">
                    <h3 class="text-xl font-bold mb-4 text-primary">Liên hệ</h3>
                    <ul class="space-y-3 text-gray-400">
                        <li class="flex items-start"><i
                                class="fas fa-map-marker-alt mt-1 mr-3 w-4 text-primary"></i><span>193 Đỗ Văn Thi, P.
                                Hiệp Hoà, TP. Biên Hoà, Đồng Nai</span></li>
                        <li class="flex items-center"><i class="fas fa-phone-alt mr-3 w-4 text-primary"></i><span>(024)
                                8582 0808</span></li>
                        <li class="flex items-center"><i
                                class="fas fa-envelope mr-3 w-4 text-primary"></i><span>anhemmotor@gmail.com</span></li>
                    </ul>
                </div>
                <!-- Social Media -->
                <div class="fade-in-up" style="transition-delay: 300ms;">
                    <h3 class="text-xl font-bold mb-4 text-primary">Theo dõi chúng tôi</h3>
                    <div class="flex space-x-4">
                        <a href="#"
                            class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-primary transition duration-300"><i
                                class="fab fa-facebook-f"></i></a>
                        <a href="#"
                            class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-primary transition duration-300"><i
                                class="fab fa-instagram"></i></a>
                        <a href="#"
                            class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-primary transition duration-300"><i
                                class="fab fa-youtube"></i></a>
                        <a href="#"
                            class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-primary transition duration-300"><i
                                class="fab fa-tiktok"></i></a>
                    </div>
                </div>
            </div>

            <!-- Copyright -->
            <div class="mt-12 border-t border-gray-700 pt-8 text-center text-gray-500">
                <p>&copy; 2025 AnhEm Motor. All Rights Reserved. Designed by AnhEm Team.</p>
            </div>
        </div>
    </footer>
</template>
