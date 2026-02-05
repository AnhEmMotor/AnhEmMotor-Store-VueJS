Lỗi này báo rằng bạn đã khai báo 2 hàm `togglePassword` và `handleRegister` trong phần Script nhưng **chưa sử dụng chúng** ở phần Template (HTML).

Nguyên nhân thường là do bạn mới chỉ copy phần code Script mà quên cập nhật lại phần HTML, hoặc trong HTML đang thiếu các sự kiện `@click` và `@submit`.

Dưới đây là **TOÀN BỘ CODE (Full File)** đã được đồng bộ hóa. Code này bao gồm:

1. **Script đã sửa lỗi:** Xóa biến thừa `signUpData`.
2. **Template đã gắn kết:** Đã thêm `@submit.prevent="handleRegister"` vào form và `@click="togglePassword"` vào icon mắt.
3. **CSS:** Đã căn chỉnh responsive.

Bạn hãy **Copy toàn bộ** và dán đè vào file hiện tại để đảm bảo không còn lỗi nào nhé.

```html
<script setup>
import { ref } from 'vue';
// Import supabase client
import { supabase } from '../components/supabaseClient.js';

// --- State (Trạng thái) ---
const formData = ref({
  username: '',
  email: '',
  phone: '',
  password: '',
  confirm_password: ''
});
const terms = ref(false);
const privacy = ref(false);

const feedback = ref({
  message: '',
  type: ''
});

const isLoading = ref(false);

// State cho việc ẩn/hiện mật khẩu
const passwordFieldType = ref('password');
const confirmPasswordFieldType = ref('password');

// --- Methods (Phương thức) ---

function showFeedback(msg, ok) {
  feedback.value = {
    message: msg,
    type: ok ? 'success' : 'error'
  };
  setTimeout(() => {
    feedback.value = { message: '', type: '' };
  }, 4000);
}

// Hàm này được gọi khi bấm vào icon con mắt (xem trong Template bên dưới)
function togglePassword(field) {
  if (field === 'password') {
    passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
  } else if (field === 'confirm_password') {
    confirmPasswordFieldType.value = confirmPasswordFieldType.value === 'password' ? 'text' : 'password';
  }
}

// Hàm này được gọi khi bấm nút Đăng Ký (xem trong Template bên dưới)
async function handleRegister() {
  const data = formData.value;

  // Basic validation
  if (!data.username || !data.email || !data.phone || !data.password) {
    return showFeedback("Vui lòng nhập đầy đủ thông tin!", false);
  }
  if (data.password.length < 6) {
    return showFeedback("Mật khẩu phải có ít nhất 6 ký tự!", false);
  }
  if (data.password !== data.confirm_password) {
    return showFeedback("Mật khẩu xác nhận không khớp!", false);
  }
  if (!terms.value || !privacy.value) {
    return showFeedback("Bạn cần đồng ý với Điều khoản & Chính sách!", false);
  }

  isLoading.value = true;
  feedback.value = { message: '', type: '' };

  try {
    // Đã xóa biến 'data' thừa gây lỗi warning
    const { error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      phone: data.phone,
      options: {
        data: {
          full_name: data.username
        }
      }
    });

    if (signUpError) {
      console.error("Lỗi Supabase:", signUpError.message);
      if (signUpError.message.includes("User already registered")) {
        showFeedback("Email hoặc SĐT này đã được đăng ký.", false);
      } else if (signUpError.message.includes("Password should be at least 6 characters")) {
         showFeedback("Mật khẩu phải có ít nhất 6 ký tự.", false);
      } else if (signUpError.message.includes("Invalid phone number")) {
         showFeedback("Số điện thoại không hợp lệ.", false);
      } else {
        showFeedback(`Lỗi đăng ký: ${signUpError.message}`, false);
      }
    } else {
      showFeedback("🎉 Đăng ký thành công! Vui lòng kiểm tra email để xác thực.", true);
      formData.value = { username: '', email: '', phone: '', password: '', confirm_password: '' };
      terms.value = false;
      privacy.value = false;
    }
  } catch (err) {
    console.error("Lỗi hệ thống khi xử lý đăng ký:", err);
    showFeedback("Lỗi hệ thống! Vui lòng thử lại.", false);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="register-container">
    <div class="card">
      <div class="form-header">
        <h1>🚀 Đăng Ký</h1>
        <p>Tạo tài khoản mới để bắt đầu</p>
      </div>

      <div
        id="global-feedback"
        v-if="feedback.message"
        :class="feedback.type"
      >
        {{ feedback.message }}
      </div>

      <form id="register-form" @submit.prevent="handleRegister">
        <div class="form-group">
          <input
            type="text"
            id="username"
            placeholder="Họ Tên *"
            autocomplete="name"
            v-model="formData.username"
          />
        </div>
        <div class="form-group">
          <input
            type="email"
            id="email"
            placeholder="Email *"
            autocomplete="email"
            v-model="formData.email"
          />
        </div>
        <div class="form-group">
          <input
            type="tel"
            id="phone"
            placeholder="Số điện thoại *"
            autocomplete="tel"
            v-model="formData.phone"
          />
        </div>

        <div class="form-group relative-group">
          <input
            :type="passwordFieldType"
            id="password"
            placeholder="Mật khẩu *"
            autocomplete="new-password"
            v-model="formData.password"
          />
          <span class="togglePassword" @click="togglePassword('password')">
            {{ passwordFieldType === 'password' ? '🐵' : '🙈' }}
          </span>
        </div>

        <div class="form-group relative-group">
          <input
            :type="confirmPasswordFieldType"
            id="confirm_password"
            placeholder="Xác nhận mật khẩu *"
            autocomplete="new-password"
            v-model="formData.confirm_password"
          />
          <span class="togglePassword" @click="togglePassword('confirm_password')">
            {{ confirmPasswordFieldType === 'password' ? '🐵' : '🙈' }}
          </span>
        </div>

        <div class="checkbox-container">
          <input type="checkbox" id="terms" v-model="terms" />
          <label for="terms">Tôi đồng ý với <a href="/dieukhoandichvu.html">điều khoản dịch vụ</a></label>
        </div>
        <div class="checkbox-container">
          <input type="checkbox" id="privacy" v-model="privacy" />
          <label for="privacy">Tôi đồng ý với <a href="/chinsach.html">Chính sách bảo mật</a></label>
        </div>

        <button type="submit" class="btn" id="submitBtn" :disabled="isLoading">
          {{ isLoading ? 'Đang xử lý...' : 'Đăng Ký Ngay' }}
        </button>

        <div class="loading" id="loading" v-if="isLoading && !feedback.message">
          <div class="spinner"></div>
          <p>Đang xử lý đăng ký...</p>
        </div>
      </form>

      <div class="login-link">
        Đã có tài khoản? <a href="/login.html">Đăng nhập</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 1. Container bao ngoài: Căn giữa form trên mọi thiết bị */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center; /* Căn giữa dọc */
  min-height: 100vh;
  padding: 20px 15px; /* Padding nhỏ để tránh sát mép trên mobile */
  background-color: #f4f6f8;
  box-sizing: border-box;
}

/* 2. Card chính */
.card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  padding: 35px 30px; /* Padding vừa phải */
  width: 100%;
  max-width: 420px; /* Độ rộng tối ưu cho form đăng ký */
  text-align: center;
  box-sizing: border-box;
}

.form-header h1 {
  color: #2c3e50;
  font-weight: 700;
  margin-bottom: 5px;
  font-size: 24px;
}

.form-header p {
  color: #7f8c8d;
  margin-bottom: 25px;
  font-size: 14px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

/* CSS cho Input */
.form-group input {
  width: 100%;
  padding: 12px 14px; /* Tăng vùng đệm cho cảm ứng */
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 16px; /* Font 16px tránh iOS zoom */
  transition: all 0.3s ease;
  background-color: #f9fafb;
}

.form-group input:focus {
  border-color: #e74c3c;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
  outline: none;
}

/* Icon mắt */
.relative-group {
  position: relative;
}

.togglePassword {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 20px;
  user-select: none;
  padding: 5px;
  z-index: 5;
}

/* Checkbox */
.checkbox-container {
  display: flex;
  align-items: flex-start; /* Căn lề trên để icon không bị lệch khi chữ xuống dòng */
  margin-bottom: 12px;
  font-size: 14px;
  text-align: left;
  line-height: 1.4;
}

.checkbox-container input {
  margin-right: 10px;
  margin-top: 3px; /* Căn chỉnh checkbox với dòng đầu tiên của text */
  width: 16px;
  height: 16px;
  accent-color: #e74c3c;
  cursor: pointer;
  flex-shrink: 0; /* Ngăn checkbox bị co lại */
}

.checkbox-container label {
  color: #555;
  cursor: pointer;
}

.checkbox-container a {
  color: #c0392b;
  text-decoration: none;
  font-weight: 600;
  transition: 0.3s;
}

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

.login-link {
  text-align: center;
  margin-top: 25px;
  font-size: 14px;
  color: #666;
}

.login-link a {
  color: #e74c3c;
  font-weight: 600;
  text-decoration: none;
}

/* --- MEDIA QUERIES (RESPONSIVE) --- */

/* 1. Màn hình điện thoại nhỏ (dưới 480px) */
@media (max-width: 480px) {
  .register-container {
    padding: 10px;
    padding-top: 40px; /* Đẩy xuống một chút */
    align-items: flex-start; /* Cho phép cuộn nếu form dài quá màn hình */
    height: auto; /* Chiều cao tự động để cuộn */
    background-color: #fff; /* Nền trắng liền mạch */
  }

  .card {
    box-shadow: none; /* Bỏ bóng đổ cho gọn */
    padding: 10px 5px; /* Giảm lề */
    max-width: 100%;
    border-radius: 0;
  }

  .form-header h1 {
    font-size: 22px;
  }
}

/* 2. Tablet (481px - 768px) */
@media (min-width: 481px) and (max-width: 768px) {
  .card {
    padding: 30px;
    max-width: 90%;
  }
}
</style>

