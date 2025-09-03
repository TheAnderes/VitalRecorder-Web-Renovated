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
html, body, #app { height: 100%; margin: 0; }

body {
  margin: 0;
  padding: 0;
}

.min-h-screen {
  display: flex;
  flex-direction: column;
  height: 100vh;  /* Asegura que el contenedor ocupe toda la pantalla */
}

main {
  flex-grow: 1;  /* Asegura que el contenido ocupe todo el espacio disponible */
}

footer {
  margin-top: auto;  /* Mantiene el footer al final */
}

:root {
  --tipografia: "Poppins", sans-serif;

  /* === ESCALAS === */
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
