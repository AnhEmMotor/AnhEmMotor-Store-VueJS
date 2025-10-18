<template>
  <teleport to="body">
    <div v-if="show" class="checkout-modal show">
      <div class="checkout-modal-content">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">
            <i class="fas fa-credit-card text-red-600 mr-2"></i>Chọn phương thức thanh toán
          </h3>
          <button class="text-2xl text-gray-600 hover:text-gray-800" @click="$emit('close')">
            &times;
          </button>
        </div>

        <div>
          <div class="payment-methods">
            <div
              class="border rounded-lg p-4 flex items-center gap-4 cursor-pointer hover:bg-red-50"
              :class="{ 'border-red-600 bg-red-50': selectedMethod === 'bank' }"
              @click="emit('update:selectedMethod', 'bank')"
            >
              <div
                class="w-16 h-16 rounded-lg flex items-center justify-center text-white bg-red-600"
              >
                <i class="fas fa-university"></i>
              </div>
              <div class="flex-1">
                <h5 class="font-semibold">Chuyển khoản ngân hàng</h5>
                <p class="text-sm text-gray-600">
                  Chuyển khoản qua ATM, Internet Banking hoặc Mobile Banking
                </p>
                <small class="text-sm text-gray-500">Thời gian xử lý: Ngay lập tức</small>
              </div>
              <div
                class="text-red-600 text-xl"
                :class="{
                  'opacity-100': selectedMethod === 'bank',
                  'opacity-0': selectedMethod !== 'bank',
                }"
              >
                <i class="fas fa-check-circle"></i>
              </div>
            </div>

            <div
              class="border rounded-lg p-4 flex items-center gap-4 cursor-pointer hover:bg-red-50"
              :class="{ 'border-red-600 bg-red-50': selectedMethod === 'momo' }"
              @click="emit('update:selectedMethod', 'momo')"
            >
              <div
                class="w-16 h-16 rounded-lg flex items-center justify-center text-white bg-gradient-to-r from-pink-500 to-pink-700"
              >
                <i class="fas fa-mobile-alt"></i>
              </div>
              <div class="flex-1">
                <h5 class="font-semibold">Ví điện tử MoMo</h5>
                <p class="text-sm text-gray-600">Thanh toán nhanh chóng qua ví MoMo</p>
                <small class="text-sm text-gray-500">Thời gian xử lý: Ngay lập tức</small>
              </div>
              <div
                class="text-red-600 text-xl"
                :class="{
                  'opacity-100': selectedMethod === 'momo',
                  'opacity-0': selectedMethod !== 'momo',
                }"
              >
                <i class="fas fa-check-circle"></i>
              </div>
            </div>

            <div
              class="border rounded-lg p-4 flex items-center gap-4 cursor-pointer hover:bg-red-50"
              :class="{ 'border-red-600 bg-red-50': selectedMethod === 'zalopay' }"
              @click="emit('update:selectedMethod', 'zalopay')"
            >
              <div
                class="w-16 h-16 rounded-lg flex items-center justify-center text-white bg-blue-600"
              >
                <i class="fas fa-wallet"></i>
              </div>
              <div class="flex-1">
                <h5 class="font-semibold">ZaloPay</h5>
                <p class="text-sm text-gray-600">Thanh toán an toàn với ZaloPay</p>
                <small class="text-sm text-gray-500">Thời gian xử lý: Ngay lập tức</small>
              </div>
              <div
                class="text-red-600 text-xl"
                :class="{
                  'opacity-100': selectedMethod === 'zalopay',
                  'opacity-0': selectedMethod !== 'zalopay',
                }"
              >
                <i class="fas fa-check-circle"></i>
              </div>
            </div>

            <div
              class="border rounded-lg p-4 flex items-center gap-4 cursor-pointer hover:bg-red-50"
              :class="{ 'border-red-600 bg-red-50': selectedMethod === 'cod' }"
              @click="emit('update:selectedMethod', 'cod')"
            >
              <div
                class="w-16 h-16 rounded-lg flex items-center justify-center text-white bg-green-600"
              >
                <i class="fas fa-money-bill-wave"></i>
              </div>
              <div class="flex-1">
                <h5 class="font-semibold">Thanh toán khi nhận hàng (COD)</h5>
                <p class="text-sm text-gray-600">Thanh toán bằng tiền mặt khi nhận hàng</p>
                <small class="text-sm text-gray-500">Phí COD: 30,000 VNĐ</small>
              </div>
              <div
                class="text-red-600 text-xl"
                :class="{
                  'opacity-100': selectedMethod === 'cod',
                  'opacity-0': selectedMethod !== 'cod',
                }"
              >
                <i class="fas fa-check-circle"></i>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg mt-4">
            <h5 class="font-semibold text-gray-800">
              <i class="fas fa-receipt text-red-600 mr-2"></i>Tóm tắt đơn hàng
            </h5>
            <div id="checkout-items-list" class="mt-3 space-y-3">
              <div
                v-for="item in cart"
                :key="item.id"
                class="flex items-center gap-3 bg-white p-3 rounded"
              >
                <img :src="item.image" :alt="item.name" class="w-12 h-12 object-cover rounded" />
                <div class="flex-1">
                  <span class="block font-semibold text-gray-800">{{ item.name }}</span>
                  <span class="text-sm text-gray-500">x{{ item.quantity }}</span>
                </div>
                <span class="font-semibold text-red-600">{{
                  formatCurrency(item.price * item.quantity)
                }}</span>
              </div>
            </div>

            <div class="mt-4 space-y-2">
              <div class="flex justify-between">
                <span>Tạm tính:</span>
                <span>{{ formatCurrency(subtotal) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Phí vận chuyển:</span>
                <span>{{ shipping === 0 ? 'Miễn phí' : formatCurrency(shipping) }}</span>
              </div>
              <div v-if="selectedMethod === 'cod'" class="flex justify-between">
                <span>Phí COD:</span>
                <span>{{ formatCurrency(codFee) }}</span>
              </div>
              <div class="mt-3 p-3 bg-white rounded border-t">
                <div v-if="requiresDeposit" class="space-y-2">
                  <div class="flex justify-between">
                    <span>Tổng giá trị:</span
                    ><span class="text-right">{{ formatCurrency(checkoutTotal) }}</span>
                  </div>
                  <div class="flex justify-between text-red-600">
                    <span>Tiền đặt cọc (10%):</span
                    ><span class="text-right">{{ formatCurrency(depositAmount) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Tiền còn lại:</span
                    ><span class="text-right">{{
                      formatCurrency(checkoutTotal - depositAmount)
                    }}</span>
                  </div>
                </div>
                <div v-else class="flex justify-between">
                  <span>Tổng cộng:</span
                  ><span class="text-right font-semibold">{{ formatCurrency(checkoutTotal) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="checkout-modal-footer mt-4">
          <button class="btn-cancel" @click="emit('close')">Hủy</button>
          <button class="btn-confirm" @click="emit('confirm')">Xác nhận thanh toán</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  show: Boolean,
  cart: { type: Array, default: () => [] },
  subtotal: { type: Number, default: 0 },
  shipping: { type: Number, default: 0 },
  codFee: { type: Number, default: 0 },
  checkoutTotal: { type: Number, default: 0 },
  requiresDeposit: { type: Boolean, default: false },
  depositAmount: { type: Number, default: 0 },
  selectedMethod: { type: String, default: null },
})

const {
  cart,
  subtotal,
  shipping,
  codFee,
  checkoutTotal,
  requiresDeposit,
  depositAmount,
  selectedMethod,
} = toRefs(props)

function formatCurrency(value) {
  if (typeof value !== 'number') return ''
  return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}
// declare emits so parent can listen without warnings
const emit = defineEmits(['close', 'confirm', 'update:selectedMethod'])
</script>

<style scoped>
/* overlay + centered modal */
.checkout-modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  z-index: 9999;
}
.checkout-modal-content {
  background: #fff;
  border-radius: 10px;
  padding: 18px;
  max-width: 980px;
  width: 96%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}
</style>
