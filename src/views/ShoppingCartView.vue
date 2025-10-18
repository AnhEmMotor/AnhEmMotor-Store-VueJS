<template>
  <main class="max-w-6xl mx-auto p-6 min-h-[calc(100vh-200px)]">
    <!-- Cart Header -->
    <div class="bg-white p-8 rounded-xl shadow mb-8 text-center">
      <h1 class="text-2xl font-semibold text-gray-800"><i class="fas fa-shopping-cart text-red-600 mr-2"></i>Giỏ Hàng Của Bạn</h1>
      <p class="text-gray-500 mt-1">Quản lý các sản phẩm trong giỏ hàng của bạn</p>
    </div>

    <!-- Cart Content -->
    <div class="cart-content">
      <div v-if="cart.length === 0" class="text-center py-16 text-gray-500">
        <i class="fas fa-shopping-cart text-4xl mb-4"></i>
        <h3 class="text-xl font-semibold mb-2">Giỏ hàng của bạn đang trống</h3>
        <p class="mb-4">Hãy thêm một số sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
        <a href="product.html" class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full inline-flex items-center gap-2">
          <i class="fas fa-shopping-bag"></i> Tiếp tục mua sắm
        </a>
      </div>
      <table v-else class="w-full table-auto">
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Tổng</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.id" class="border-b last:border-b-0">
            <td class="py-4">
              <div class="flex items-center gap-4">
                <img :src="item.image" :alt="item.name" class="w-20 h-20 object-cover rounded-lg border border-gray-200" />
                <div>
                  <h5 class="text-gray-800 font-semibold">{{ item.name }}</h5>
                  <small class="text-gray-500">Mã SP: {{ item.id.toUpperCase() }}</small>
                </div>
              </div>
            </td>
            <td class="py-4 align-top">
              <span class="text-red-600 font-bold text-lg">{{ formatCurrency(item.price) }}</span>
            </td>
            <td class="py-4 align-top">
              <div class="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1 w-max">
                <button class="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700" @click="updateQuantity(item.id, item.quantity - 1)">
                  <i class="fas fa-minus"></i>
                </button>
                <input
                  type="number"
                  class="w-14 text-center bg-transparent outline-none"
                  :value="item.quantity"
                  min="1"
                  max="3"
                  @change="updateQuantity(item.id, parseInt($event.target.value) || 1)"
                />
                <button class="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700" @click="updateQuantity(item.id, item.quantity + 1)">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </td>
            <td class="py-4 align-top">
              <span class="text-red-600 font-bold">{{ formatCurrency(item.price * item.quantity) }}</span>
            </td>
            <td class="py-4 align-top">
              <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full flex items-center gap-2" @click="removeFromCart(item.id)">
                <i class="fas fa-trash"></i>
                Xóa
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Cart Summary -->
    <div v-if="cart.length > 0" class="bg-gray-50 p-6 rounded-xl mt-8">
      <h4 class="text-lg font-semibold text-gray-800 mb-4"><i class="fas fa-calculator text-red-600 mr-2"></i>Tổng kết đơn hàng</h4>
      <div class="flex justify-between py-2 border-b">
        <span>Tạm tính:</span>
        <span>{{ formatCurrency(subtotal) }}</span>
      </div>
      <div class="flex justify-between py-2 border-b">
        <span>Phí vận chuyển:</span>
        <span>{{ shipping === 0 ? 'Miễn phí' : formatCurrency(shipping) }}</span>
      </div>
      <small v-if="shipping === 0" class="text-green-600 block mb-2 mt-2"><i class="fas fa-gift"></i> Bạn được miễn phí vận chuyển!</small>
      <div class="flex justify-between py-4 border-b">
        <span class="font-bold">Tổng cộng:</span>
        <span class="font-bold text-red-600">{{ formatCurrency(total) }}</span>
      </div>
      <div class="flex gap-4 mt-6 flex-wrap justify-center">
        <a href="product.html" class="border-2 border-red-600 text-red-600 px-6 py-3 rounded-full font-semibold hover:bg-red-50 inline-flex items-center gap-2">
          <i class="fas fa-arrow-left"></i> Tiếp tục mua sắm
        </a>
        <button class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2" @click.prevent="proceedToCheckout">
          <i class="fas fa-credit-card"></i> Thanh toán
        </button>
      </div>
    </div>

    <!-- Checkout Modal -->
    <div class="checkout-modal" :class="{ show: isCheckoutModalVisible }">
      <div class="checkout-modal-content">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold"><i class="fas fa-credit-card text-red-600 mr-2"></i>Chọn phương thức thanh toán</h3>
          <button class="text-2xl text-gray-600 hover:text-gray-800" @click="closeCheckoutModal">&times;</button>
        </div>
        <div>
          <div class="payment-methods">
            <div
              class="border rounded-lg p-4 flex items-center gap-4 cursor-pointer hover:bg-red-50"
              :class="{ 'border-red-600 bg-red-50': selectedPaymentMethod === 'bank' }"
              @click="selectPaymentMethod('bank')"
            >
              <div class="w-16 h-16 rounded-lg flex items-center justify-center text-white bg-red-600"><i class="fas fa-university"></i></div>
              <div class="flex-1">
                <h5 class="font-semibold">Chuyển khoản ngân hàng</h5>
                <p class="text-sm text-gray-600">Chuyển khoản qua ATM, Internet Banking hoặc Mobile Banking</p>
                <small class="text-sm text-gray-500">Thời gian xử lý: Ngay lập tức</small>
              </div>
              <div class="text-red-600 text-xl" :class="{ 'opacity-100': selectedPaymentMethod === 'bank', 'opacity-0': selectedPaymentMethod !== 'bank' }"><i class="fas fa-check-circle"></i></div>
            </div>
            <div
              class="border rounded-lg p-4 flex items-center gap-4 cursor-pointer hover:bg-red-50"
              :class="{ 'border-red-600 bg-red-50': selectedPaymentMethod === 'momo' }"
              @click="selectPaymentMethod('momo')"
            >
              <div class="w-16 h-16 rounded-lg flex items-center justify-center text-white bg-gradient-to-r from-pink-500 to-pink-700"><i class="fas fa-mobile-alt"></i></div>
              <div class="flex-1">
                <h5 class="font-semibold">Ví điện tử MoMo</h5>
                <p class="text-sm text-gray-600">Thanh toán nhanh chóng qua ví MoMo</p>
                <small class="text-sm text-gray-500">Thời gian xử lý: Ngay lập tức</small>
              </div>
              <div class="text-red-600 text-xl" :class="{ 'opacity-100': selectedPaymentMethod === 'momo', 'opacity-0': selectedPaymentMethod !== 'momo' }"><i class="fas fa-check-circle"></i></div>
            </div>
            <div
              class="border rounded-lg p-4 flex items-center gap-4 cursor-pointer hover:bg-red-50"
              :class="{ 'border-red-600 bg-red-50': selectedPaymentMethod === 'zalopay' }"
              @click="selectPaymentMethod('zalopay')"
            >
              <div class="w-16 h-16 rounded-lg flex items-center justify-center text-white bg-blue-600"><i class="fas fa-wallet"></i></div>
              <div class="flex-1">
                <h5 class="font-semibold">ZaloPay</h5>
                <p class="text-sm text-gray-600">Thanh toán an toàn với ZaloPay</p>
                <small class="text-sm text-gray-500">Thời gian xử lý: Ngay lập tức</small>
              </div>
              <div class="text-red-600 text-xl" :class="{ 'opacity-100': selectedPaymentMethod === 'zalopay', 'opacity-0': selectedPaymentMethod !== 'zalopay' }"><i class="fas fa-check-circle"></i></div>
            </div>
            <div
              class="border rounded-lg p-4 flex items-center gap-4 cursor-pointer hover:bg-red-50"
              :class="{ 'border-red-600 bg-red-50': selectedPaymentMethod === 'cod' }"
              @click="selectPaymentMethod('cod')"
            >
              <div class="w-16 h-16 rounded-lg flex items-center justify-center text-white bg-green-600"><i class="fas fa-money-bill-wave"></i></div>
              <div class="flex-1">
                <h5 class="font-semibold">Thanh toán khi nhận hàng (COD)</h5>
                <p class="text-sm text-gray-600">Thanh toán bằng tiền mặt khi nhận hàng</p>
                <small class="text-sm text-gray-500">Phí COD: 30,000 VNĐ</small>
              </div>
              <div class="text-red-600 text-xl" :class="{ 'opacity-100': selectedPaymentMethod === 'cod', 'opacity-0': selectedPaymentMethod !== 'cod' }"><i class="fas fa-check-circle"></i></div>
            </div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <h5 class="font-semibold text-gray-800"><i class="fas fa-receipt text-red-600 mr-2"></i>Tóm tắt đơn hàng</h5>
            <div id="checkout-items-list" class="mt-3 space-y-3">
              <div v-for="item in cart" :key="item.id" class="flex items-center gap-3 bg-white p-3 rounded">
                <img :src="item.image" :alt="item.name" class="w-12 h-12 object-cover rounded" />
                <div class="flex-1">
                  <span class="block font-semibold text-gray-800">{{ item.name }}</span>
                  <span class="text-sm text-gray-500">x{{ item.quantity }}</span>
                </div>
                <span class="font-semibold text-red-600">{{ formatCurrency(item.price * item.quantity) }}</span>
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
              <div v-if="selectedPaymentMethod === 'cod'" class="flex justify-between">
                <span>Phí COD:</span>
                <span>{{ formatCurrency(codFee) }}</span>
              </div>
              <div class="mt-3 p-3 bg-white rounded border-t">
                <div v-if="requiresDeposit" class="space-y-2">
                  <div class="flex justify-between"><span>Tổng giá trị:</span><span class="text-right">{{ formatCurrency(checkoutTotal) }}</span></div>
                  <div class="flex justify-between text-red-600"><span>Tiền đặt cọc (10%):</span><span class="text-right">{{ formatCurrency(depositAmount) }}</span></div>
                  <div class="flex justify-between"><span>Tiền còn lại:</span><span class="text-right">{{ formatCurrency(checkoutTotal - depositAmount) }}</span></div>
                </div>
                <div v-else class="flex justify-between"><span>Tổng cộng:</span><span class="text-right font-semibold">{{ formatCurrency(checkoutTotal) }}</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="checkout-modal-footer">
          <button class="btn-cancel" @click="closeCheckoutModal">Hủy</button>
          <button class="btn-confirm" @click="confirmPayment">Xác nhận thanh toán</button>
        </div>
      </div>
    </div>

    <!-- Payment Confirmation Modal -->
    <div class="payment-confirmation-modal" :class="{ show: isConfirmationModalVisible }">
      <div class="payment-confirmation-content">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h3>Đặt hàng thành công!</h3>
        <p>
          Mã đơn hàng: <strong>{{ orderId }}</strong>
        </p>
        <div v-html="paymentInfoHtml"></div>
        <div class="confirmation-actions">
          <button class="btn-primary" @click="closePaymentConfirmation">Đã hiểu</button>
        </div>
      </div>
    </div>

    <!-- Invoice Modal -->
    <InvoiceModal :show="isInvoiceVisible" :order-data="invoiceData" @close="closeInvoice" />
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import InvoiceModal from './InvoiceModal.vue'
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
const subtotal = computed(() => cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0))
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
  isCheckoutModalVisible.value = true
}

function closeCheckoutModal() {
  isCheckoutModalVisible.value = false
  selectedPaymentMethod.value = null
}

function selectPaymentMethod(method) {
  selectedPaymentMethod.value = method
}

function confirmPayment() {
  if (!selectedPaymentMethod.value) {
    alert('Vui lòng chọn phương thức thanh toán!')
    return
  }

  orderId.value = `DH${Date.now()}`
  const totalWithFees = checkoutTotal.value
  let paymentInfo = ''

  switch (selectedPaymentMethod.value) {
    case 'bank': {
      const bankAmount = requiresDeposit.value ? depositAmount.value : totalWithFees
      paymentInfo = `
                    <h4>Thông tin chuyển khoản:</h4>
                    <div class="bank-info">
                        <p><strong>Ngân hàng:</strong> Vietcombank</p>
                        <p><strong>Số tài khoản:</strong> 1234567890</p>
                        <p><strong>Chủ tài khoản:</strong> CONG TY TNHH ANHEM MOTOR</p>
                        <p><strong>Số tiền:</strong> ${formatCurrency(bankAmount)}</p>
                        <p><strong>Nội dung:</strong> ${orderId.value}</p>
                    </div>
                    ${requiresDeposit.value ? `<p class="text-warning">Bạn cần thanh toán đặt cọc ${formatCurrency(depositAmount.value)}. Số tiền còn lại ${formatCurrency(totalWithFees - depositAmount.value)} sẽ thanh toán khi nhận hàng.</p>` : '<p class="text-warning">Vui lòng chuyển khoản đúng nội dung để đơn hàng được xử lý nhanh chóng!</p>'}
                `
      break
    }
    case 'momo': {
      const momoAmount = requiresDeposit.value ? depositAmount.value : totalWithFees
      paymentInfo = `
                    <h4>Thanh toán MoMo:</h4>
                    <p>Số điện thoại: <strong>0123456789</strong></p>
                    <p>Tên: <strong>AnhEm Motor</strong></p>
                    <p>Số tiền: <strong>${formatCurrency(momoAmount)}</strong></p>
                    <p>Nội dung: <strong>${orderId.value}</strong></p>
                     ${requiresDeposit.value ? `<p class="text-warning">Bạn cần thanh toán đặt cọc ${formatCurrency(depositAmount.value)}. Số tiền còn lại ${formatCurrency(totalWithFees - depositAmount.value)} sẽ thanh toán khi nhận hàng.</p>` : ''}
                `
      break
    }
    case 'zalopay': {
      const zalopayAmount = requiresDeposit.value ? depositAmount.value : totalWithFees
      paymentInfo = `
                    <h4>Thanh toán ZaloPay:</h4>
                    <p>Số điện thoại: <strong>0123456789</strong></p>
                    <p>Tên: <strong>AnhEm Motor</strong></p>
                    <p>Số tiền: <strong>${formatCurrency(zalopayAmount)}</strong></p>
                    <p>Nội dung: <strong>${orderId.value}</strong></p>
                     ${requiresDeposit.value ? `<p class="text-warning">Bạn cần thanh toán đặt cọc ${formatCurrency(depositAmount.value)}. Số tiền còn lại ${formatCurrency(totalWithFees - depositAmount.value)} sẽ thanh toán khi nhận hàng.</p>` : ''}
                `
      break
    }
    case 'cod': {
      const codAmount = requiresDeposit.value
        ? totalWithFees - depositAmount.value
        : totalWithFees
      paymentInfo = `
                    <h4>Thanh toán khi nhận hàng:</h4>
                    <p>Đơn hàng của bạn sẽ được giao trong 2-3 ngày làm việc.</p>
                    <p>Vui lòng chuẩn bị: <strong>${formatCurrency(codAmount)}</strong></p>
                    ${requiresDeposit.value ? `<p style="color: #de0000; font-weight: 600;">Bạn đã đặt cọc ${formatCurrency(depositAmount.value)}. Số tiền còn lại cần thanh toán khi nhận hàng.</p>` : ''}
                    <p>Chúng tôi sẽ liên hệ xác nhận đơn hàng trong vòng 24 giờ.</p>
                `
      break
    }
  }

  paymentInfoHtml.value = paymentInfo
  closeCheckoutModal()
  isConfirmationModalVisible.value = true
}

function closePaymentConfirmation() {
  isConfirmationModalVisible.value = false
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

function closeInvoice() {
  isInvoiceVisible.value = false
  clearCart()
  selectedPaymentMethod.value = null
  invoiceData.value = null
}

// watch and lifecycle
watch(cart, () => {
  // persistence handled by composable; dispatch cart-updated for listeners
  window.dispatchEvent(new CustomEvent('cart-updated', { detail: totalCartItems.value }))
}, { deep: true })

onMounted(async () => {
  await fetchCart()
})
</script>
