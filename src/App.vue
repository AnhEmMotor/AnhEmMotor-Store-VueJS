<template>
  <!-- Root app: render About component -->
  <About />
</template>

<script>
import About from './components/about/About.vue';

export default {
  name: 'App',
  components: { About }
}
</script>

<style>
/* Không cần style thêm ở đây; tất cả style đã được load từ about.css */
</style>
