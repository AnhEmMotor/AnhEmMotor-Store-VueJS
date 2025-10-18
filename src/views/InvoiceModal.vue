<template>
  <div class="invoice-modal" :class="{ show: show }">
    <div id="invoice-printable" class="invoice-content" v-if="orderData">
      <div class="invoice-header">
        <h2>HÓA ĐƠN BÁN HÀNG</h2>
        <p style="margin: 0">Số HD: {{ orderData.orderId }}</p>
        <p style="margin: 0">Ngày {{ formatDate(orderData.date) }}</p>
      </div>
      <div class="invoice-body">
        <div class="invoice-info-section">
          <h4 style="color: #de0000; margin-bottom: 1rem">Thông tin cửa hàng</h4>
          <div class="invoice-info-row"><strong>Tên cửa hàng:</strong><span>AnhEm Motor</span></div>
          <div class="invoice-info-row">
            <strong>Địa chỉ:</strong><span>193 Đỗ Văn Thi, Trảng Biên, Biên Hòa, Đồng Nai</span>
          </div>
          <div class="invoice-info-row"><strong>Điện thoại:</strong><span>012 3456 7890</span></div>
        </div>
        <div class="invoice-info-section">
          <h4 style="color: #de0000; margin-bottom: 1rem">Thông tin khách hàng</h4>
          <div class="invoice-info-row">
            <strong>Khách hàng:</strong><span>(Tên khách hàng)</span>
          </div>
          <div class="invoice-info-row">
            <strong>Số điện thoại:</strong><span>(Số điện thoại)</span>
          </div>
          <div class="invoice-info-row">
            <strong>Địa chỉ:</strong><span>(Địa chỉ khách hàng)</span>
          </div>
        </div>
        <h4 style="color: #de0000; margin-bottom: 1rem">Chi tiết đơn hàng</h4>
        <table class="invoice-table">
          <thead>
            <tr>
              <th>Tên hàng hóa</th>
              <th style="text-align: center">SL</th>
              <th style="text-align: right">Đơn giá</th>
              <th style="text-align: right">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in orderData.cart" :key="item.id">
              <td>{{ item.name }}</td>
              <td style="text-align: center">{{ item.quantity }}</td>
              <td style="text-align: right">{{ formatCurrency(item.price) }}</td>
              <td style="text-align: right">{{ formatCurrency(item.price * item.quantity) }}</td>
            </tr>
          </tbody>
        </table>
        <div class="invoice-totals">
          <div class="invoice-total-row">
            <span>Tổng tiền hàng:</span><span>{{ formatCurrency(orderData.totals.subtotal) }}</span>
          </div>
          <div class="invoice-total-row">
            <span>Phí vận chuyển:</span
            ><span>{{
              orderData.totals.shipping === 0
                ? 'Miễn phí'
                : formatCurrency(orderData.totals.shipping)
            }}</span>
          </div>
          <div v-if="orderData.totals.codFee > 0" class="invoice-total-row">
            <span>Phí COD:</span><span>{{ formatCurrency(orderData.totals.codFee) }}</span>
          </div>
          <div class="invoice-total-row">
            <span>Chiết khấu:</span><span>{{ formatCurrency(0) }}</span>
          </div>

          <template v-if="orderData.totals.requiresDeposit">
            <div class="invoice-total-row final">
              <span>Tổng giá trị:</span><span>{{ formatCurrency(orderData.totals.total) }}</span>
            </div>
            <div
              class="invoice-total-row"
              style="color: #de0000; font-size: 1.1rem; font-weight: 600"
            >
              <span>Tiền đặt cọc (10%):</span
              ><span>{{ formatCurrency(orderData.totals.depositAmount) }}</span>
            </div>
            <div class="invoice-total-row final">
              <span>Tiền còn lại:</span
              ><span>{{
                formatCurrency(orderData.totals.total - orderData.totals.depositAmount)
              }}</span>
            </div>
          </template>
          <template v-else>
            <div class="invoice-total-row final">
              <span>Tổng thanh toán:</span><span>{{ formatCurrency(orderData.totals.total) }}</span>
            </div>
          </template>
        </div>
        <div class="invoice-info-section" style="margin-top: 2rem">
          <div class="invoice-info-row">
            <strong>Phương thức thanh toán:</strong><span>{{ paymentMethodText }}</span>
          </div>
        </div>
      </div>
      <div class="invoice-footer">
        <button class="btn-print" @click="printInvoice">
          <i class="fas fa-print"></i> In hóa đơn
        </button>
        <button class="btn-close-invoice" @click="close">Đóng</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  show: Boolean,
  orderData: Object,
})

const emit = defineEmits(['close'])

const paymentMethodText = computed(() => {
  const orderData = props.orderData || undefined
  if (!orderData) return ''
  switch (orderData.paymentMethod) {
    case 'bank':
      return 'Chuyển khoản ngân hàng'
    case 'momo':
      return 'Ví điện tử MoMo'
    case 'zalopay':
      return 'ZaloPay'
    case 'cod':
      return 'Thanh toán khi nhận hàng (COD)'
    default:
      return 'Không xác định'
  }
})

function formatCurrency(value) {
  if (typeof value !== 'number') return ''
  return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}

function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
}

function printInvoice() {
  window.print()
}

function close() {
  emit('close')
}
</script>
