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
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import 'bootstrap-icons/font/bootstrap-icons.css'
</script>

<style>
html, body, #app { 
  height: 100%; 
  margin: 0;
  overflow-x: hidden; /* Evita el desbordamiento horizontal */
}

body {
  margin: 0;
  padding: 0;
}

.min-h-screen {
  display: flex;
  flex-direction: column;
  min-height: 100vh;  /* Usa min-height en lugar de height */
}

main {
  flex-grow: 1;
}

footer {
  margin-top: auto;
}

:root {
  --tipografia: "Poppins", sans-serif;
  --black:900;
  --extrabold:800;
  --bold:700;
  --semibold:600;
  --medium:500;
  --regular:400;
  --light:300;
  --extralight:200;
  --thin:100;
}
</style>
