<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 min-h-[calc(100vh-150px)]">
    <!-- Cart Header -->
    <div class="bg-white p-4 sm:p-8 rounded-xl shadow mb-8 text-center">
      <h1 class="text-xl sm:text-2xl font-semibold text-gray-800">
        <i class="fas fa-shopping-cart text-red-600 mr-2"></i>Giỏ Hàng Của Bạn
      </h1>
      <p class="text-gray-500 text-sm sm:text-base mt-1">Quản lý các sản phẩm trong giỏ hàng của bạn</p>
    </div>
    <!-- Payment Confirmation Modal -->
    <PaymentConfirmationModal
      :show="isConfirmationModalVisible"
      :order-id="orderId"
      :payment-info-html="paymentInfoHtml"
      @close="onPaymentConfirmationClose"
    />

    <!-- Checkout Modal -->
    <CheckoutModal
      :show="isCheckoutModalVisible"
      :cart="cart"
      :subtotal="subtotal"
      :shipping="shipping"
      :cod-fee="codFee"
      :checkout-total="checkoutTotal"
      :requires-deposit="requiresDeposit"
      :deposit-amount="depositAmount"
      :selected-method="selectedPaymentMethod"
      @close="closeCheckoutModal"
      @update:selectedMethod="(m) => (selectedPaymentMethod = m)"
      @confirm="confirmPayment"
    />

    <!-- Cart Content -->
    <div class="cart-content">
      <div v-if="cart.length === 0" class="text-center py-16 text-gray-500">
        <i class="fas fa-shopping-cart text-4xl mb-4"></i>
        <h3 class="text-lg sm:text-xl font-semibold mb-2">Giỏ hàng của bạn đang trống</h3>
        <p class="mb-4 text-sm sm:text-base">Hãy thêm một số sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
        <a
          href="product.html"
          class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full inline-flex items-center gap-2 text-sm sm:text-base"
        >
          <i class="fas fa-shopping-bag"></i> Tiếp tục mua sắm
        </a>
      </div>
      <table v-else class="w-full table-fixed">
        <thead>
          <tr class="text-sm sm:text-base">
            <th class="p-2 sm:p-4 text-left">Sản phẩm</th>
            <th class="p-2 sm:p-4 text-center">Giá</th>
            <th class="p-2 sm:p-4 text-center">Số lượng</th>
            <th class="p-2 sm:p-4 text-center">Tổng</th>
            <th class="p-2 sm:p-4 text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.id" class="border-b last:border-b-0">
            <td class="py-2 sm:py-4 px-1 sm:px-2">
              <div class="flex items-center gap-2 sm:gap-4">
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-gray-200"
                />
                <div>
                  <h5 class="text-gray-800 font-semibold text-sm sm:text-base">{{ item.name }}</h5>
                  <small class="text-gray-500 text-xs sm:text-sm">Mã SP: {{ item.id.toUpperCase() }}</small>
                </div>
              </div>
            </td>
            <td class="py-2 sm:py-4 px-1 sm:px-2 align-top text-center">
              <span class="text-red-600 font-bold text-base sm:text-lg">{{ formatCurrency(item.price) }}</span>
            </td>
            <td class="py-2 sm:py-4 px-1 sm:px-2 align-top text-center">
              <div class="flex items-center gap-1 sm:gap-2 bg-gray-100 rounded-full px-1 sm:px-2 py-0.5 sm:py-1 w-max mx-auto">
                <button
                  class="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 text-xs sm:text-sm"
                  @click="updateQuantity(item.id, item.quantity - 1)"
                >
                  <i class="fas fa-minus"></i>
                </button>
                <input
                  type="number"
                  class="w-10 sm:w-14 text-center bg-transparent outline-none text-sm sm:text-base"
                  :value="item.quantity"
                  min="1"
                  max="3"
                  @change="updateQuantity(item.id, parseInt($event.target.value) || 1)"
                />
                <button
                  class="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 text-xs sm:text-sm"
                  @click="updateQuantity(item.id, item.quantity + 1)"
                >
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </td>
            <td class="py-2 sm:py-4 px-1 sm:px-2 align-top text-center">
              <span class="text-red-600 font-bold text-base sm:text-lg">{{
                formatCurrency(item.price * item.quantity)
              }}</span>
            </td>
            <td class="py-2 sm:py-4 px-1 sm:px-2 align-top text-center">
              <button
                class="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2 mx-auto text-xs sm:text-sm"
                @click="removeFromCart(item.id)"
              >
                <i class="fas fa-trash"></i>
                Xóa
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Cart Summary -->
    <div v-if="cart.length > 0" class="bg-gray-50 p-4 sm:p-6 rounded-xl mt-6 sm:mt-8">
      <h4 class="text-base sm:text-lg font-semibold text-gray-800 mb-4">
        <i class="fas fa-calculator text-red-600 mr-2"></i>Tổng kết đơn hàng
      </h4>
      <div class="flex justify-between py-2 border-b text-sm sm:text-base">
        <span>Tạm tính:</span>
        <span>{{ formatCurrency(subtotal) }}</span>
      </div>
      <div class="flex justify-between py-2 border-b text-sm sm:text-base">
        <span>Phí vận chuyển:</span>
        <span>{{ shipping === 0 ? 'Miễn phí' : formatCurrency(shipping) }}</span>
      </div>
      <small v-if="shipping === 0" class="text-green-600 block mb-2 mt-2 text-xs sm:text-sm"
        ><i class="fas fa-gift"></i> Bạn được miễn phí vận chuyển!</small
      >
      <div class="flex justify-between py-4 border-b text-sm sm:text-base">
        <span class="font-bold">Tổng cộng:</span>
        <span class="font-bold text-red-600">{{ formatCurrency(total) }}</span>
      </div>
      <div class="flex gap-3 sm:gap-4 mt-4 sm:mt-6 flex-wrap justify-center">
        <a
          href="product.html"
          class="border-2 border-red-600 text-red-600 px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold hover:bg-red-50 inline-flex items-center gap-2 text-sm sm:text-base"
        >
          <i class="fas fa-arrow-left"></i> Tiếp tục mua sắm
        </a>
        <button
          class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold inline-flex items-center gap-2 text-sm sm:text-base"
          @click.prevent="proceedToCheckout"
        >
          <i class="fas fa-credit-card"></i> Thanh toán
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import CheckoutModal from '@/components/cart/CheckoutModal.vue'
import PaymentConfirmationModal from '@/components/cart/PaymentConfirmationModal.vue'
import { useCart } from '../composables/useCart'

// reactive / refs
const { cartItems, fetchCart, clearCart } = useCart()
const cart = cartItems
const isCheckoutModalVisible = ref(false)
const isConfirmationModalVisible = ref(false)
const isInvoiceVisible = ref(false)
const selectedPaymentMethod = ref(null)
const paymentInfoHtml = ref('')
const orderId = ref('')
const invoiceData = ref(null)

// computed
const totalCartItems = computed(() => cart.value.reduce((sum, item) => sum + item.quantity, 0))
const subtotal = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
)
const shipping = computed(() => (subtotal.value > 10000000 ? 0 : 200000))
const total = computed(() => subtotal.value + shipping.value)
const codFee = computed(() => (selectedPaymentMethod.value === 'cod' ? 30000 : 0))
const checkoutTotal = computed(() => subtotal.value + shipping.value + codFee.value)
const requiresDeposit = computed(() => subtotal.value > 15000000)
const depositAmount = computed(() => (requiresDeposit.value ? Math.round(subtotal.value * 0.1) : 0))

// methods
function formatCurrency(value) {
  return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}

// Note: persistence is handled by the `useCart` composable (localStorage)

function updateQuantity(productId, newQuantity) {
  const quantity = parseInt(newQuantity, 10)

  if (isNaN(quantity)) return

  if (quantity > 3) {
    alert(
      'Số lượng mỗi sản phẩm chỉ có thể mua tối đa là 3. Để mua số lượng lớn hơn, vui lòng liên hệ trực tiếp tại cửa hàng.',
    )
    const item = cart.value.find((item) => item.id === productId)
    if (item) {
      // Force re-render if value is invalid
      // in composition API, changing reactive will update automatically
    }
    return
  }

  if (quantity <= 0) {
    removeFromCart(productId)
    return
  }

  const item = cart.value.find((item) => item.id === productId)
  if (item) {
    item.quantity = quantity
  }
}

function removeFromCart(productId) {
  const idx = cart.value.findIndex((i) => i.id === productId)
  if (idx !== -1) {
    // composable exposes removeItem by index; use array mutation directly to keep behavior
    cart.value.splice(idx, 1)
  }
}

function proceedToCheckout() {
  if (cart.value.length === 0) {
    alert('Giỏ hàng của bạn đang trống!')
    return
  }
  // Create an order id first and open checkout modal to choose payment method
  orderId.value = `DH${Date.now()}`
  paymentInfoHtml.value = ''
  isCheckoutModalVisible.value = true
}

function closeCheckoutModal() {
  isCheckoutModalVisible.value = false
  selectedPaymentMethod.value = null
}

function confirmPayment() {
  if (!selectedPaymentMethod.value) {
    alert('Vui lòng chọn phương thức thanh toán!')
    return
  }

  const totalWithFees = checkoutTotal.value
  let paymentInfo = ''

  switch (selectedPaymentMethod.value) {
    case 'bank': {
      const bankAmount = requiresDeposit.value ? depositAmount.value : totalWithFees
      paymentInfo = `\n                    <h4>Thông tin chuyển khoản:</h4>\n                    <div class="bank-info">\n                        <p><strong>Ngân hàng:</strong> Vietcombank</p>\n                        <p><strong>Số tài khoản:</strong> 1234567890</p>\n                        <p><strong>Chủ tài khoản:</strong> CONG TY TNHH ANHEM MOTOR</p>\n                        <p><strong>Số tiền:</strong> ${formatCurrency(bankAmount)}</p>\n                        <p><strong>Nội dung:</strong> ${orderId.value}</p>\n                    </div>\n                    ${requiresDeposit.value ? `<p class="text-warning">Bạn cần thanh toán đặt cọc ${formatCurrency(depositAmount.value)}. Số tiền còn lại ${formatCurrency(totalWithFees - depositAmount.value)} sẽ thanh toán khi nhận hàng.</p>` : '<p class="text-warning">Vui lòng chuyển khoản đúng nội dung để đơn hàng được xử lý nhanh chóng!</p>'}\n                `
      break
    }
    case 'momo': {
      const momoAmount = requiresDeposit.value ? depositAmount.value : totalWithFees
      paymentInfo = `\n                    <h4>Thanh toán MoMo:</h4>\n                    <p>Số điện thoại: <strong>0123456789</strong></p>\n                    <p>Tên: <strong>AnhEm Motor</strong></p>\n                    <p>Số tiền: <strong>${formatCurrency(momoAmount)}</strong></p>\n                    <p>Nội dung: <strong>${orderId.value}</strong></p>\n                     ${requiresDeposit.value ? `<p class="text-warning">Bạn cần thanh toán đặt cọc ${formatCurrency(depositAmount.value)}. Số tiền còn lại ${formatCurrency(totalWithFees - depositAmount.value)} sẽ thanh toán khi nhận hàng.</p>` : ''}\n                `
      break
    }
    case 'zalopay': {
      const zalopayAmount = requiresDeposit.value ? depositAmount.value : totalWithFees
      paymentInfo = `\n                    <h4>Thanh toán ZaloPay:</h4>\n                    <p>Số điện thoại: <strong>0123456789</strong></p>\n                    <p>Tên: <strong>AnhEm Motor</strong></p>\n                    <p>Số tiền: <strong>${formatCurrency(zalopayAmount)}</strong></p>\n                    <p>Nội dung: <strong>${orderId.value}</strong></p>\n                     ${requiresDeposit.value ? `<p class="text-warning">Bạn cần thanh toán đặt cọc ${formatCurrency(depositAmount.value)}. Số tiền còn lại ${formatCurrency(totalWithFees - depositAmount.value)} sẽ thanh toán khi nhận hàng.</p>` : ''}\n                `
      break
    }
    case 'cod': {
      const codAmount = requiresDeposit.value ? totalWithFees - depositAmount.value : totalWithFees
      paymentInfo = `\n                    <h4>Thanh toán khi nhận hàng:</h4>\n                    <p>Đơn hàng của bạn sẽ được giao trong 2-3 ngày làm việc.</p>\n                    <p>Vui lòng chuẩn bị: <strong>${formatCurrency(codAmount)}</strong></p>\n                    ${requiresDeposit.value ? `<p style="color: #de0000; font-weight: 600;">Bạn đã đặt cọc ${formatCurrency(depositAmount.value)}. Số tiền còn lại cần thanh toán khi nhận hàng.</p>` : ''}\n                    <p>Chúng tôi sẽ liên hệ xác nhận đơn hàng trong vòng 24 giờ.</p>\n                `
      break
    }
  }

  paymentInfoHtml.value = paymentInfo
  // After confirming payment method in checkout, close checkout and show confirmation
  closeCheckoutModal()
  isConfirmationModalVisible.value = true
}

function onPaymentConfirmationClose() {
  isConfirmationModalVisible.value = false

  // Xóa giỏ hàng sau khi hoàn tất quy trình
  clearCart()

  // Các logic khác
  prepareInvoiceData()
  isInvoiceVisible.value = true
}
function prepareInvoiceData() {
  invoiceData.value = {
    orderId: orderId.value,
    date: new Date(),
    cart: JSON.parse(JSON.stringify(cart.value)), // Deep copy
    totals: {
      subtotal: subtotal.value,
      shipping: shipping.value,
      codFee: codFee.value,
      total: checkoutTotal.value,
      requiresDeposit: requiresDeposit.value,
      depositAmount: depositAmount.value,
    },
    paymentMethod: selectedPaymentMethod.value,
  }
}

// function closeInvoice() {
//   isInvoiceVisible.value = false
//   clearCart()
//   selectedPaymentMethod.value = null
//   invoiceData.value = null
// }

// watch and lifecycle
watch(
  cart,
  () => {
    // persistence handled by composable; dispatch cart-updated for listeners
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: totalCartItems.value }))
  },
  { deep: true },
)

onMounted(async () => {
  await fetchCart()
})
</script>
