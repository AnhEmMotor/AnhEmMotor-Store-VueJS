import { ref, computed, watch } from 'vue'

// Simple cart composable that uses localStorage by default.
// Replace fetchCart / syncWithServer with API calls later.

const CART_KEY = 'cartItems'

const cartItems = ref(JSON.parse(localStorage.getItem(CART_KEY)) || [])

const cartTotal = computed(() => {
  return cartItems.value.reduce((t, item) => t + item.price * item.quantity, 0)
})

// Persist changes to localStorage
watch(
  cartItems,
  (val) => {
    localStorage.setItem(CART_KEY, JSON.stringify(val))
  },
  { deep: true },
)

// Helper to find item index by id
const findIndex = (product) => cartItems.value.findIndex((i) => i.id === product.id)

// Public API
async function fetchCart() {
  // Stub: fetch cart from server in future. For now, we read localStorage (already loaded).
  // Keep as async so swapping to API is straightforward.
  return cartItems.value
}

function addItem(product, quantity = 1) {
  const idx = findIndex(product)
  if (idx === -1) {
    cartItems.value.push({ ...product, quantity })
  } else {
    cartItems.value[idx].quantity += quantity
  }
}

function removeItem(index) {
  cartItems.value.splice(index, 1)
}

function updateQuantity({ index, change }) {
  const item = cartItems.value[index]
  if (!item) return
  item.quantity += change
  if (item.quantity <= 0) cartItems.value.splice(index, 1)
}

function clearCart() {
  cartItems.value = []
}

export function useCart() {
  return {
    cartItems,
    cartTotal,
    fetchCart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }
}

export default useCart
