<template>
  <div class="invoice-modal" :class="{ show: props.show }">
    <div id="invoice-printable" v-if="props.orderData" class="invoice-content">
      <div class="text-center border-b pb-4 mb-4">
        <h2 class="text-2xl font-bold text-red-600">HÓA ĐƠN BÁN HÀNG</h2>
        <p class="mt-1">Số HD: {{ props.orderData.orderId }}</p>
        <p class="mt-1">Ngày {{ formatDate(props.orderData.date) }}</p>
      </div>

      <div class="invoice-body">
        <div class="mb-6">
          <h4 class="text-red-600 font-semibold mb-2">Thông tin cửa hàng</h4>
          <div class="flex justify-between border-b py-1"><strong>Tên cửa hàng:</strong><span>AnhEm Motor</span></div>
          <div class="flex justify-between border-b py-1"><strong>Địa chỉ:</strong><span>193 Đỗ Văn Thi, Trảng Biên, Biên Hòa, Đồng Nai</span></div>
          <div class="flex justify-between py-1"><strong>Điện thoại:</strong><span>012 3456 7890</span></div>
        </div>

        <div class="mb-6">
          <h4 class="text-red-600 font-semibold mb-2">Thông tin khách hàng</h4>
          <div class="flex justify-between border-b py-1"><strong>Khách hàng:</strong><span>(Tên khách hàng)</span></div>
          <div class="flex justify-between border-b py-1"><strong>Số điện thoại:</strong><span>(Số điện thoại)</span></div>
          <div class="flex justify-between py-1"><strong>Địa chỉ:</strong><span>(Địa chỉ khách hàng)</span></div>
        </div>

        <h4 class="text-red-600 font-semibold mb-3">Chi tiết đơn hàng</h4>
        <table class="w-full border-collapse mb-4">
          <thead>
            <tr class="bg-gray-100">
              <th class="text-left p-2">Tên hàng hóa</th>
              <th class="text-center p-2">SL</th>
              <th class="text-right p-2">Đơn giá</th>
              <th class="text-right p-2">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in props.orderData.cart" :key="item.id" class="border-b last:border-b-0">
              <td class="p-2">{{ item.name }}</td>
              <td class="p-2 text-center">{{ item.quantity }}</td>
              <td class="p-2 text-right">{{ formatCurrency(item.price) }}</td>
              <td class="p-2 text-right">{{ formatCurrency(item.price * item.quantity) }}</td>
            </tr>
          </tbody>
        </table>

        <div class="space-y-2 border-t pt-3">
          <div class="flex justify-between"><span>Tổng tiền hàng:</span><span>{{ formatCurrency(props.orderData.totals.subtotal) }}</span></div>
          <div class="flex justify-between"><span>Phí vận chuyển:</span><span>{{ props.orderData.totals.shipping === 0 ? 'Miễn phí' : formatCurrency(props.orderData.totals.shipping) }}</span></div>
          <div v-if="props.orderData.totals.codFee > 0" class="flex justify-between"><span>Phí COD:</span><span>{{ formatCurrency(props.orderData.totals.codFee) }}</span></div>
          <div class="flex justify-between"><span>Chiết khấu:</span><span>{{ formatCurrency(0) }}</span></div>

          <template v-if="props.orderData.totals.requiresDeposit">
            <div class="flex justify-between pt-2 text-red-600 font-semibold"><span>Tổng giá trị:</span><span>{{ formatCurrency(props.orderData.totals.total) }}</span></div>
            <div class="flex justify-between text-red-600 font-semibold"><span>Tiền đặt cọc (10%):</span><span>{{ formatCurrency(props.orderData.totals.depositAmount) }}</span></div>
            <div class="flex justify-between pt-2 font-semibold"><span>Tiền còn lại:</span><span>{{ formatCurrency(props.orderData.totals.total - props.orderData.totals.depositAmount) }}</span></div>
          </template>
          <template v-else>
            <div class="flex justify-between pt-2 text-red-600 font-semibold"><span>Tổng thanh toán:</span><span>{{ formatCurrency(props.orderData.totals.total) }}</span></div>
          </template>
        </div>

        <div class="mt-4">
          <div class="flex justify-between"><strong>Phương thức thanh toán:</strong><span>{{ paymentMethodText }}</span></div>
        </div>
      </div>

      <div class="flex justify-center gap-4 mt-6">
        <button class="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full" @click="printInvoice"><i class="fas fa-print mr-2"></i>In hóa đơn</button>
        <button class="border border-gray-300 px-5 py-2 rounded-full text-gray-700" @click="close">Đóng</button>
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
