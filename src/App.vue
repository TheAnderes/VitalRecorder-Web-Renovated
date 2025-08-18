<template>
  <div id="app">
    <AppHeader />
    <main>
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
export default { components: { AppHeader, AppFooter } };
</script>

<style>
html { box-sizing: border-box; }
*, *:before, *:after { box-sizing: inherit; }

body {
  margin: 0;
  font-family: 'Poppins', 'Inter', system-ui, sans-serif;
  background-color: #fff;
  color: #374151; /* Un color de texto base más oscuro */
}

#app, main {
  width: 100%;
  max-width: none;
  padding: 0;
  margin: 0;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main { flex-grow: 1; }
</style>