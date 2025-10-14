<template>
  <AdminLayout>
    <div class="page-header">
      <div class="header-content">
        <h2>Registro y Administración de Pacientes</h2>
        <p>Listado y herramientas para administrar pacientes: búsqueda (nombre, email, teléfono, DNI), filtros por estado, historial y documentación.</p>
      </div>
    </div>

    <!-- El contenido específico cambia según el submódulo: renderizamos las vistas hijas aquí -->
    <router-view />
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/components/admin/AdminLayout.vue'
</script>
