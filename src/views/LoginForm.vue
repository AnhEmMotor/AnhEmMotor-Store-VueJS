<script setup>
import { ref } from 'vue';
import { supabase } from '../components/supabaseClient.js';

// --- State (Trạng thái) ---
const identifier = ref('');
const password = ref('');

const feedback = ref({
  message: '',
  type: ''
});

const isLoading = ref(false);
const passwordFieldType = ref('password');

// --- Methods (Phương thức) ---
function togglePassword() {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
}

function showFeedback(msg, ok) {
  feedback.value = {
    message: msg,
    type: ok ? 'success' : 'error'
  };

  setTimeout(() => {
    feedback.value = { message: '', type: '' };
  }, 4000);
}

async function handleLogin() {
  if (!identifier.value || !password.value) {
    return showFeedback("Vui lòng nhập đầy đủ thông tin đăng nhập!", false);
  }

  isLoading.value = true;
  feedback.value = { message: '', type: '' };

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: identifier.value,
      password: password.value,
    });

    if (error) {
      console.error("Lỗi Supabase:", error.message);
      if (error.message.includes("Invalid login credentials")) {
        showFeedback("Email hoặc mật khẩu không đúng!", false);
      } else {
        showFeedback(`Lỗi đăng nhập: ${error.message}`, false);
      }
    } else if (data.user) {
      showFeedback("✅ Đăng nhập thành công!", true);
      identifier.value = '';
      password.value = '';
      setTimeout(() => window.location.href = "/dashboard.html", 1500); 
    }

  } catch (err) {
    console.error("Lỗi hệ thống khi xử lý đăng nhập:", err);
    showFeedback("Lỗi hệ thống! Vui lòng thử lại.", false);
  } finally {
    if (feedback.value.type !== "success") {
      isLoading.value = false;
    }
  }
}
</script>

<template>
  <div class="login-container">
    <div class="card">
      <div class="form-header">
        <h1>🔒 Đăng Nhập</h1>
        <p>Truy cập hệ thống của bạn</p>
      </div>

      <div 
        id="global-feedback" 
        v-if="feedback.message" 
        :class="feedback.type"
      >
        {{ feedback.message }}
      </div>

      <form id="login-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <input 
            type="text" 
            id="identifier" 
            placeholder="Email *" 
            autocomplete="username" 
            v-model="identifier"
          />
        </div>
        <div class="form-group relative-group">
          <input 
            :type="passwordFieldType" 
            id="password" 
            placeholder="Mật khẩu *" 
            autocomplete="current-password" 
            v-model="password"
          />
          <span 
            class="togglePassword" 
            @click="togglePassword"
          >
            {{ passwordFieldType === 'password' ? '🐵' : '🙈' }}
          </span>
        </div>

        <button type="submit" class="btn" id="submitBtn" :disabled="isLoading">
          {{ isLoading ? 'Đang xử lý...' : 'Đăng Nhập' }}
        </button>

        <div class="loading" id="loading" v-if="isLoading">
          <div class="spinner"></div>
          <p>Đang xử lý đăng nhập...</p>
        </div>
      </form>

      <div class="register-link">
        Chưa có tài khoản? 
        <a href="/register.html">Đăng ký ngay</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 1. Container bao ngoài để căn giữa form trên mọi thiết bị */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh; /* Chiều cao bằng 100% màn hình thiết bị */
  padding: 20px; /* Khoảng cách an toàn với mép màn hình điện thoại */
  background-color: #f4f6f8; /* Màu nền nhẹ cho toàn trang */
}

/* 2. Card chính */
.card {
  background: #ffffff;
  border-radius: 16px; /* Bo tròn mềm mại hơn */
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05); /* Bóng đổ nhẹ hiện đại */
  padding: 40px;
  width: 100%;
  max-width: 400px; /* Giới hạn chiều rộng trên PC */
  text-align: center;
  box-sizing: border-box; /* Đảm bảo padding không làm vỡ khung */
}

.form-header h1 {
  color: #2c3e50;
  font-weight: 700;
  margin-bottom: 8px;
  font-size: 24px;
}

.form-header p {
  color: #7f8c8d;
  margin-bottom: 30px;
  font-size: 14px;
}

.form-group {
  margin-bottom: 18px;
  text-align: left;
}

/* CSS cho input */
.form-group input {
  width: 100%;
  padding: 14px; /* Tăng vùng đệm để dễ bấm trên điện thoại */
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 16px; /* Font 16px ngăn iOS tự động zoom khi nhập liệu */
  transition: all 0.3s ease;
  background-color: #f9fafb;
}

.form-group input:focus {
  border-color: #e74c3c;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
  outline: none;
}

/* Định vị icon mắt */
.relative-group {
  position: relative;
}

.togglePassword {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 20px;
  user-select: none;
  z-index: 10;
  padding: 5px; /* Tăng diện tích bấm cho ngón tay */
}

/* Button */
.btn {
  width: 100%;
  padding: 14px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;
  margin-top: 10px;
}

.btn:hover {
  background-color: #c0392b;
}

.btn:active {
  transform: scale(0.98);
}

.btn:disabled {
  background-color: #fab1a0;
  cursor: not-allowed;
}

/* Feedback messages */
#global-feedback {
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 8px;
  font-size: 14px;
  text-align: left;
  border: 1px solid transparent;
}

#global-feedback.success {
  background-color: #ecfdf5;
  color: #047857;
  border-color: #6ee7b7;
}

#global-feedback.error {
  background-color: #fef2f2;
  color: #b91c1c;
  border-color: #fca5a5;
}

/* Loading Spinner */
.loading {
  text-align: center;
  margin-top: 20px;
  color: #2c3e50;
}

.loading .spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #e74c3c;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
}

.loading p {
  display: inline-block;
  font-size: 14px;
  margin: 0;
  vertical-align: middle;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.register-link {
  text-align: center;
  margin-top: 25px;
  font-size: 14px;
  color: #666;
}

.register-link a {
  color: #e74c3c;
  font-weight: 600;
  text-decoration: none;
}

/* --- MEDIA QUERIES (RESPONSIVE) --- */

/* 1. Màn hình điện thoại nhỏ (dưới 480px) */
@media (max-width: 480px) {
  .login-container {
    padding: 15px; /* Giảm lề ngoài */
    background-color: #ffffff; /* Trên mobile có thể để nền trắng hoàn toàn */
  }

  .card {
    box-shadow: none; /* Bỏ bóng để trông phẳng hơn trên mobile */
    padding: 20px 10px; /* Giảm padding trong card */
    width: 100%;
    border-radius: 0;
  }

  .form-header h1 {
    font-size: 22px; /* Giảm cỡ chữ tiêu đề */
  }
}

/* 2. Màn hình Tablet hoặc xoay ngang (481px - 768px) */
@media (min-width: 481px) and (max-width: 768px) {
  .card {
    padding: 30px;
    max-width: 90%; /* Chiếm 90% chiều rộng màn hình */
  }
}
</style>