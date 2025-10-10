<template>
  <div class="admin-page patient-busqueda">
    <h1>Búsqueda y Filtrado</h1>
    <p>Herramientas para buscar pacientes por nombre, email, teléfono, DNI y aplicar filtros.</p>

    <div class="card">
      <input placeholder="Buscar por nombre, email o DNI..." />
      <div style="margin-top:.5rem">
        <select>
          <option>Todos los estados</option>
          <option>Activo</option>
          <option>Inactivo</option>
        </select>
        <button style="margin-left:.5rem">Buscar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.admin-page { padding: 1.5rem; }
.card { background: #fff; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.04); max-width: 720px; }
input, select { padding:.5rem; width:100%; }
</style>