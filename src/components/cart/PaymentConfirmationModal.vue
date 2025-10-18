<template>
  <teleport to="body">
    <div v-if="show" class="payment-confirmation-modal show">
      <div class="payment-confirmation-content">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h3>Đặt hàng thành công!</h3>
        <p>
          Mã đơn hàng: <strong>{{ orderId }}</strong>
        </p>
        <div v-html="paymentInfoHtml"></div>
        <div class="confirmation-actions mt-4">
          <button class="btn-primary" @click="emit('close')">Đã hiểu</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
defineProps({
  show: Boolean,
  orderId: String,
  paymentInfoHtml: String,
})

// declare emitted events so parent listeners are accepted without warnings
const emit = defineEmits(['close'])
</script>

<style scoped>
/* simple overlay + centered modal styles to ensure the component overlays the page */
.payment-confirmation-modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  z-index: 9999;
}
.payment-confirmation-content {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  max-width: 820px;
  width: 92%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}
.success-icon {
  font-size: 2rem;
  color: #16a34a; /* green */
  margin-bottom: 6px;
}
.confirmation-actions {
  display: flex;
  justify-content: flex-end;
}
</style>
