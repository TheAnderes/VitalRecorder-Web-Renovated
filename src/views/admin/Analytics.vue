<template>
  <AdminLayout>
    <div class="analytics-page">
      <div class="page-header">
        <h2>Analíticas y Reportes</h2>
        <p>Visualiza estadísticas detalladas de VitalSystems</p>
      </div>

      <div class="coming-soon">
        <div class="coming-soon-card">
          <div class="icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.25h-15A2.25 2.25 0 012 17V4.75A2.25 2.25 0 014.25 2.5h15A2.25 2.25 0 0121.5 4.75V17a2.25 2.25 0 01-2.25 2.25z" fill="currentColor"/>
            </svg>
          </div>
          <h3>Analíticas Avanzadas</h3>
          <p>Esta sección estará disponible próximamente con reportes detallados, gráficos interactivos y métricas de rendimiento del sistema VitalSystems.</p>
          
          <div class="features-preview">
            <h4>Funcionalidades que incluirá:</h4>
            <ul>
              <li>📊 Gráficos de actividad de usuarios</li>
              <li>📈 Tendencias de registros y uso</li>
              <li>📋 Reportes de rendimiento del sistema</li>
              <li>👥 Análisis demográfico de usuarios</li>
              <li>🔔 Estadísticas de alertas y notificaciones</li>
              <li>📱 Métricas de uso de la aplicación móvil</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/components/admin/AdminLayout.vue'
</script>

<style scoped>
.analytics-page {
  padding: 0;
}

.page-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.page-header h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.875rem;
  font-weight: 600;
  color: #1f2937;
}

.page-header p {
  margin: 0;
  color: #6b7280;
}

.coming-soon {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.coming-soon-card {
  background: white;
  border-radius: 1rem;
  padding: 3rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  text-align: center;
  max-width: 600px;
  width: 100%;
}

.icon {
  color: #3b82f6;
  margin-bottom: 2rem;
}

.coming-soon-card h3 {
  margin: 0 0 1rem 0;
  font-size: 2rem;
  font-weight: 600;
  color: #1f2937;
}

.coming-soon-card > p {
  margin: 0 0 2rem 0;
  color: #6b7280;
  font-size: 1.125rem;
  line-height: 1.6;
}

.features-preview {
  background: #f8fafc;
  border-radius: 0.75rem;
  padding: 2rem;
  text-align: left;
}

.features-preview h4 {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  text-align: center;
}

.features-preview ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 0.75rem;
}

.features-preview li {
  padding: 0.75rem 1rem;
  background: white;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #374151;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.features-preview li:hover {
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .coming-soon-card {
    padding: 2rem;
    margin: 1rem;
  }
  
  .coming-soon-card h3 {
    font-size: 1.5rem;
  }
  
  .features-preview ul {
    grid-template-columns: 1fr;
  }
}
</style>
