<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <main class="grow mx-auto w-full pt-28 sm:pt-32">
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
