<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <main class="grow max-w-7xl mx-auto w-full pt-28 sm:pt-32 pb-10 px-5 sm:px-10">
      <RouterView></RouterView>
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import TheFooter from './components/ui/TheFooter.vue'
import TheHeader from './components/ui/TheHeader.vue'
</script>

<style></style>
