<template>
  <div class="admin-page patient-crud">
    <h1>Operaciones CRUD</h1>
    <p>Listado y acciones para crear, leer, actualizar y eliminar pacientes.</p>

    <div class="card">
      <p>Tabla de ejemplo (demo):</p>
      <table>
        <thead>
          <tr><th>Nombre</th><th>Email</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          <tr><td>Juan Perez</td><td>juan@ejemplo.com</td><td><button>Editar</button> <button>Eliminar</button></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.admin-page { padding: 1.5rem; }
.card { background: #fff; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.04); }
table { width:100%; border-collapse: collapse; }
th, td { padding: .6rem; text-align:left; border-bottom:1px solid #e5e7eb; }
button { padding:.3rem .6rem; border-radius:6px; }
</style>