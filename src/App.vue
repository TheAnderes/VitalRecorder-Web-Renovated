<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<style>
html, body, #app { height: 100%; margin: 0; }
main { padding: 1rem; }

body {
  margin: 0;
  padding: 0;
  background: #fff; /* opcional */
}
</style>
