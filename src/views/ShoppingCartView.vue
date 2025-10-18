<template>
  <main class="cart-container">
    <!-- Cart Header -->
    <div class="cart-header">
      <h1><i class="fas fa-shopping-cart text-honda-red"></i> Giỏ Hàng Của Bạn</h1>
      <p class="mb-0">Quản lý các sản phẩm trong giỏ hàng của bạn</p>
    </div>

    <!-- Cart Content -->
    <div class="cart-content">
      <div v-if="cart.length === 0" class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <h3>Giỏ hàng của bạn đang trống</h3>
        <p>Hãy thêm một số sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
        <a href="product.html" class="btn-primary">
          <i class="fas fa-shopping-bag"></i> Tiếp tục mua sắm
        </a>
      </div>
      <table v-else class="cart-table">
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
          <tr v-for="item in cart" :key="item.id" class="cart-item-row">
            <td>
              <div class="product-info">
                <img :src="item.image" :alt="item.name" class="product-image" />
                <div class="product-details">
                  <h5>{{ item.name }}</h5>
                  <small class="text-muted">Mã SP: {{ item.id.toUpperCase() }}</small>
                </div>
              </div>
            </td>
            <td>
              <span class="product-price">{{ formatCurrency(item.price) }}</span>
            </td>
            <td>
              <div class="quantity-controls">
                <button class="quantity-btn" @click="updateQuantity(item.id, item.quantity - 1)">
                  <i class="fas fa-minus"></i>
                </button>
                <input
                  type="number"
                  class="quantity-display"
                  :value="item.quantity"
                  min="1"
                  max="3"
                  @change="updateQuantity(item.id, parseInt($event.target.value) || 1)"
                />
                <button class="quantity-btn" @click="updateQuantity(item.id, item.quantity + 1)">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </td>
            <td>
              <span class="product-price">{{ formatCurrency(item.price * item.quantity) }}</span>
            </td>
            <td>
              <button class="remove-btn" @click="removeFromCart(item.id)">
                <i class="fas fa-trash"></i>
                Xóa
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Cart Summary -->
    <div v-if="cart.length > 0" class="cart-summary">
      <h4><i class="fas fa-calculator"></i> Tổng kết đơn hàng</h4>
      <div class="summary-row">
        <span>Tạm tính:</span>
        <span>{{ formatCurrency(subtotal) }}</span>
      </div>
      <div class="summary-row">
        <span>Phí vận chuyển:</span>
        <span>{{ shipping === 0 ? 'Miễn phí' : formatCurrency(shipping) }}</span>
      </div>
      <small v-if="shipping === 0" class="text-success d-block mb-2"
        ><i class="fas fa-gift"></i> Bạn được miễn phí vận chuyển!</small
      >
      <div class="summary-row">
        <span>Tổng cộng:</span>
        <span>{{ formatCurrency(total) }}</span>
      </div>
      <div class="checkout-actions">
        <a href="product.html" class="btn-secondary">
          <i class="fas fa-arrow-left"></i> Tiếp tục mua sắm
        </a>
        <a href="#" class="btn-primary" @click.prevent="proceedToCheckout">
          <i class="fas fa-credit-card"></i> Thanh toán
        </a>
      </div>
    </div>

    <!-- Checkout Modal -->
    <div class="checkout-modal" :class="{ show: isCheckoutModalVisible }">
      <div class="checkout-modal-content">
        <div class="checkout-modal-header">
          <h3><i class="fas fa-credit-card"></i> Chọn phương thức thanh toán</h3>
          <button class="close-checkout-modal" @click="closeCheckoutModal">&times;</button>
        </div>
        <div class="checkout-modal-body">
          <div class="payment-methods">
            <div
              class="payment-option"
              :class="{ selected: selectedPaymentMethod === 'bank' }"
              @click="selectPaymentMethod('bank')"
            >
              <div class="payment-icon"><i class="fas fa-university"></i></div>
              <div class="payment-details">
                <h5>Chuyển khoản ngân hàng</h5>
                <p>Chuyển khoản qua ATM, Internet Banking hoặc Mobile Banking</p>
                <small>Thời gian xử lý: Ngay lập tức</small>
              </div>
              <div class="payment-check"><i class="fas fa-check-circle"></i></div>
            </div>
            <div
              class="payment-option"
              :class="{ selected: selectedPaymentMethod === 'momo' }"
              @click="selectPaymentMethod('momo')"
            >
              <div class="payment-icon momo-color"><i class="fas fa-mobile-alt"></i></div>
              <div class="payment-details">
                <h5>Ví điện tử MoMo</h5>
                <p>Thanh toán nhanh chóng qua ví MoMo</p>
                <small>Thời gian xử lý: Ngay lập tức</small>
              </div>
              <div class="payment-check"><i class="fas fa-check-circle"></i></div>
            </div>
            <div
              class="payment-option"
              :class="{ selected: selectedPaymentMethod === 'zalopay' }"
              @click="selectPaymentMethod('zalopay')"
            >
              <div class="payment-icon zalopay-color"><i class="fas fa-wallet"></i></div>
              <div class="payment-details">
                <h5>ZaloPay</h5>
                <p>Thanh toán an toàn với ZaloPay</p>
                <small>Thời gian xử lý: Ngay lập tức</small>
              </div>
              <div class="payment-check"><i class="fas fa-check-circle"></i></div>
            </div>
            <div
              class="payment-option"
              :class="{ selected: selectedPaymentMethod === 'cod' }"
              @click="selectPaymentMethod('cod')"
            >
              <div class="payment-icon cod-color"><i class="fas fa-money-bill-wave"></i></div>
              <div class="payment-details">
                <h5>Thanh toán khi nhận hàng (COD)</h5>
                <p>Thanh toán bằng tiền mặt khi nhận hàng</p>
                <small>Phí COD: 30,000 VNĐ</small>
              </div>
              <div class="payment-check"><i class="fas fa-check-circle"></i></div>
            </div>
          </div>

          <div class="order-summary-checkout">
            <h5><i class="fas fa-receipt"></i> Tóm tắt đơn hàng</h5>
            <div id="checkout-items-list">
              <div v-for="item in cart" :key="item.id" class="checkout-item">
                <img :src="item.image" :alt="item.name" />
                <div class="checkout-item-info">
                  <span class="item-name">{{ item.name }}</span>
                  <span class="item-quantity">x{{ item.quantity }}</span>
                </div>
                <span class="item-total">{{ formatCurrency(item.price * item.quantity) }}</span>
              </div>
            </div>
            <div class="checkout-totals">
              <div class="total-row">
                <span>Tạm tính:</span>
                <span>{{ formatCurrency(subtotal) }}</span>
              </div>
              <div class="total-row">
                <span>Phí vận chuyển:</span>
                <span>{{ shipping === 0 ? 'Miễn phí' : formatCurrency(shipping) }}</span>
              </div>
              <div class="total-row" v-if="selectedPaymentMethod === 'cod'">
                <span>Phí COD:</span>
                <span>{{ formatCurrency(codFee) }}</span>
              </div>
              <div class="total-row final-total">
                <div v-if="requiresDeposit" style="width: 100%; text-align: left">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Tổng giá trị:</span>
                    <span style="text-align: right">{{ formatCurrency(checkoutTotal) }}</span>
                  </div>
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      margin-bottom: 0.5rem;
                      color: #de0000;
                    "
                  >
                    <span>Tiền đặt cọc (10%):</span>
                    <span style="text-align: right">{{ formatCurrency(depositAmount) }}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between">
                    <span>Tiền còn lại:</span>
                    <span style="text-align: right">{{
                      formatCurrency(checkoutTotal - depositAmount)
                    }}</span>
                  </div>
                </div>
                <div v-else style="display: flex; justify-content: space-between; width: 100%">
                  <span>Tổng cộng:</span>
                  <span>{{ formatCurrency(checkoutTotal) }}</span>
                </div>
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

<script>
import InvoiceModal from './InvoiceModal.vue'

export default {
  name: 'ShoppingCartView',
  components: {
    InvoiceModal,
  },
  data() {
    return {
      cart: [],
      isCheckoutModalVisible: false,
      isConfirmationModalVisible: false,
      isInvoiceVisible: false,
      selectedPaymentMethod: null,
      paymentInfoHtml: '',
      orderId: '',
      invoiceData: null,
    }
  },
  computed: {
    totalCartItems() {
      return this.cart.reduce((sum, item) => sum + item.quantity, 0)
    },
    subtotal() {
      return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
    shipping() {
      return this.subtotal > 10000000 ? 0 : 200000
    },
    total() {
      return this.subtotal + this.shipping
    },
    codFee() {
      return this.selectedPaymentMethod === 'cod' ? 30000 : 0
    },
    checkoutTotal() {
      return this.subtotal + this.shipping + this.codFee
    },
    requiresDeposit() {
      return this.subtotal > 15000000
    },
    depositAmount() {
      return this.requiresDeposit ? Math.round(this.subtotal * 0.1) : 0
    },
  },
  watch: {
    cart: {
      handler() {
        this.saveCartToCookie()
        this.$emit('cart-updated', this.totalCartItems)
      },
      deep: true,
    },
  },
  created() {
    this.loadCartFromCookie()
  },
  methods: {
    formatCurrency(value) {
      return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    },
    saveCartToCookie() {
      try {
        const cartData = JSON.stringify(this.cart)
        const expires = new Date()
        expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000)
        document.cookie = `hondaCart=${encodeURIComponent(cartData)}; expires=${expires.toUTCString()}; path=/`
      } catch (error) {
        console.error('Không thể lưu giỏ hàng:', error)
      }
    },
    loadCartFromCookie() {
      try {
        const cookies = document.cookie.split(';')
        for (let cookie of cookies) {
          const [name, value] = cookie.trim().split('=')
          if (name === 'hondaCart') {
            const cartData = decodeURIComponent(value)
            if (cartData) {
              const parsedCart = JSON.parse(cartData)
              if (Array.isArray(parsedCart)) {
                this.cart = parsedCart
                return
              }
            }
          }
        }
        // Add sample data if cart is empty for demonstration
        if (this.cart.length === 0) {
          this.cart = [
            {
              id: 'cbr150r',
              name: 'Honda CBR150R',
              price: 72000000,
              quantity: 1,
              image: 'https://placehold.co/80x80/de0000/ffffff?text=CBR150R',
            },
            {
              id: 'vario160',
              name: 'Honda Vario 160',
              price: 55000000,
              quantity: 2,
              image: 'https://placehold.co/80x80/333333/ffffff?text=Vario160',
            },
          ]
        }
      } catch (error) {
        console.error('Không thể tải giỏ hàng:', error)
        this.cart = []
      }
    },
    updateQuantity(productId, newQuantity) {
      const quantity = parseInt(newQuantity, 10)

      if (isNaN(quantity)) return

      if (quantity > 3) {
        alert(
          'Số lượng mỗi sản phẩm chỉ có thể mua tối đa là 3. Để mua số lượng lớn hơn, vui lòng liên hệ trực tiếp tại cửa hàng.',
        )
        const item = this.cart.find((item) => item.id === productId)
        if (item) {
          // Force re-render if value is invalid
          this.$forceUpdate()
        }
        return
      }

      if (quantity <= 0) {
        this.removeFromCart(productId)
        return
      }

      const item = this.cart.find((item) => item.id === productId)
      if (item) {
        item.quantity = quantity
      }
    },
    removeFromCart(productId) {
      this.cart = this.cart.filter((item) => item.id !== productId)
    },
    proceedToCheckout() {
      if (this.cart.length === 0) {
        alert('Giỏ hàng của bạn đang trống!')
        return
      }
      this.isCheckoutModalVisible = true
    },
    closeCheckoutModal() {
      this.isCheckoutModalVisible = false
      this.selectedPaymentMethod = null
    },
    selectPaymentMethod(method) {
      this.selectedPaymentMethod = method
    },
    confirmPayment() {
      if (!this.selectedPaymentMethod) {
        alert('Vui lòng chọn phương thức thanh toán!')
        return
      }

      this.orderId = `DH${Date.now()}`
      const totalWithFees = this.checkoutTotal
      let paymentInfo = ''

      switch (this.selectedPaymentMethod) {
        case 'bank':
          const bankAmount = this.requiresDeposit ? this.depositAmount : totalWithFees
          paymentInfo = `
                    <h4>Thông tin chuyển khoản:</h4>
                    <div class="bank-info">
                        <p><strong>Ngân hàng:</strong> Vietcombank</p>
                        <p><strong>Số tài khoản:</strong> 1234567890</p>
                        <p><strong>Chủ tài khoản:</strong> CONG TY TNHH ANHEM MOTOR</p>
                        <p><strong>Số tiền:</strong> ${this.formatCurrency(bankAmount)}</p>
                        <p><strong>Nội dung:</strong> ${this.orderId}</p>
                    </div>
                    ${this.requiresDeposit ? `<p class="text-warning">Bạn cần thanh toán đặt cọc ${this.formatCurrency(this.depositAmount)}. Số tiền còn lại ${this.formatCurrency(totalWithFees - this.depositAmount)} sẽ thanh toán khi nhận hàng.</p>` : '<p class="text-warning">Vui lòng chuyển khoản đúng nội dung để đơn hàng được xử lý nhanh chóng!</p>'}
                `
          break
        case 'momo':
          const momoAmount = this.requiresDeposit ? this.depositAmount : totalWithFees
          paymentInfo = `
                    <h4>Thanh toán MoMo:</h4>
                    <p>Số điện thoại: <strong>0123456789</strong></p>
                    <p>Tên: <strong>AnhEm Motor</strong></p>
                    <p>Số tiền: <strong>${this.formatCurrency(momoAmount)}</strong></p>
                    <p>Nội dung: <strong>${this.orderId}</strong></p>
                     ${this.requiresDeposit ? `<p class="text-warning">Bạn cần thanh toán đặt cọc ${this.formatCurrency(this.depositAmount)}. Số tiền còn lại ${this.formatCurrency(totalWithFees - this.depositAmount)} sẽ thanh toán khi nhận hàng.</p>` : ''}
                `
          break
        case 'zalopay':
          const zalopayAmount = this.requiresDeposit ? this.depositAmount : totalWithFees
          paymentInfo = `
                    <h4>Thanh toán ZaloPay:</h4>
                    <p>Số điện thoại: <strong>0123456789</strong></p>
                    <p>Tên: <strong>AnhEm Motor</strong></p>
                    <p>Số tiền: <strong>${this.formatCurrency(zalopayAmount)}</strong></p>
                    <p>Nội dung: <strong>${this.orderId}</strong></p>
                     ${this.requiresDeposit ? `<p class="text-warning">Bạn cần thanh toán đặt cọc ${this.formatCurrency(this.depositAmount)}. Số tiền còn lại ${this.formatCurrency(totalWithFees - this.depositAmount)} sẽ thanh toán khi nhận hàng.</p>` : ''}
                `
          break
        case 'cod':
          const codAmount = this.requiresDeposit
            ? totalWithFees - this.depositAmount
            : totalWithFees
          paymentInfo = `
                    <h4>Thanh toán khi nhận hàng:</h4>
                    <p>Đơn hàng của bạn sẽ được giao trong 2-3 ngày làm việc.</p>
                    <p>Vui lòng chuẩn bị: <strong>${this.formatCurrency(codAmount)}</strong></p>
                    ${this.requiresDeposit ? `<p style="color: #de0000; font-weight: 600;">Bạn đã đặt cọc ${this.formatCurrency(this.depositAmount)}. Số tiền còn lại cần thanh toán khi nhận hàng.</p>` : ''}
                    <p>Chúng tôi sẽ liên hệ xác nhận đơn hàng trong vòng 24 giờ.</p>
                `
          break
      }

      this.paymentInfoHtml = paymentInfo
      this.closeCheckoutModal()
      this.isConfirmationModalVisible = true
    },
    closePaymentConfirmation() {
      this.isConfirmationModalVisible = false
      this.prepareInvoiceData()
      this.isInvoiceVisible = true
    },
    prepareInvoiceData() {
      this.invoiceData = {
        orderId: this.orderId,
        date: new Date(),
        cart: JSON.parse(JSON.stringify(this.cart)), // Deep copy
        totals: {
          subtotal: this.subtotal,
          shipping: this.shipping,
          codFee: this.codFee,
          total: this.checkoutTotal,
          requiresDeposit: this.requiresDeposit,
          depositAmount: this.depositAmount,
        },
        paymentMethod: this.selectedPaymentMethod,
      }
    },
    closeInvoice() {
      this.isInvoiceVisible = false
      this.cart = [] // Clear cart after finishing the order
      this.selectedPaymentMethod = null
      this.invoiceData = null
    },
  },
}
</script>
