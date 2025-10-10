<template>
  <div class="admin-page patient-reportes">
    <h1>Listados y Reportes</h1>
    <p>Generación de listados y reportes exportables (CSV, PDF) sobre pacientes.</p>

    <div class="card">
      <button>Exportar CSV</button>
      <button>Generar PDF</button>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.admin-page { padding: 1.5rem; }
.card { background: #fff; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.04); }
button { margin-right:.5rem; padding:.5rem .8rem; border-radius:6px; }
</style>