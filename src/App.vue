<template>
  <div class="min-h-screen flex flex-col">
    <!-- Solo mostrar header y footer en rutas que NO sean de admin -->
    <AppHeader v-if="!isAdminRoute" />
    <main class="flex-1" :class="{ 'admin-main': isAdminRoute }">
      <RouterView />
    </main>
    <AppFooter v-if="!isAdminRoute" />
    <LoadingOverlay />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppHeader from './components/shared/AppHeader.vue';
import AppFooter from './components/shared/AppFooter.vue';
import LoadingOverlay from './components/shared/LoadingOverlay.vue'
import 'bootstrap-icons/font/bootstrap-icons.css'

const route = useRoute()

// Detectar si estamos en una ruta de admin
const isAdminRoute = computed(() => {
  return route.path.startsWith('/admin')
})
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

/* Configuración global de fuente */
* {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
}

/* Estilos específicos para rutas de admin */
main.admin-main {
  padding: 0;
  margin: 0;
  min-height: 100vh;
  background-color: #f8fafc;
  flex-direction: row;
}

/* Asegurar que las páginas de admin ocupen todo el espacio */
.admin-main .admin-layout {
  width: 100%;
  min-height: 100vh;
}
</style>
