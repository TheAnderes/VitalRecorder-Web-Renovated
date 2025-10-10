<template>
  <div class="admin-page patient-asignaciones">
    <h1>Asignaciones y Relaciones</h1>
    <p>Asignar pacientes a médicos, grupos, dispositivos o familias.</p>

    <div class="card">
      <p>Asignar a médico:</p>
      <select>
        <option>Dr. López</option>
        <option>Dr. Pérez</option>
      </select>
      <button style="margin-left:.5rem">Asignar</button>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.admin-page { padding: 1.5rem; }
.card { background: #fff; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.04); max-width: 640px; }
</style>