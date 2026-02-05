<template>
  <div class="flex flex-col min-h-screen overflow-x-hidden">
    <TheHeader />
    <main class="grow mx-auto w-full pt-20 sm:pt-28">
      <RouterView></RouterView>
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import TheFooter from './components/layout/TheFooter.vue'
import TheHeader from './components/layout/TheHeader.vue'
</script>

<style></style>
