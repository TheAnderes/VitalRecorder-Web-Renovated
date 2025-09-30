<template>
  <AdminLayout>
    <div class="user-roles-page">
      <div class="page-header">
        <h2>Gestión de Roles de Usuario</h2>
        <p>Administra roles y permisos del sistema (Solo Super Administradores)</p>
      </div>

      <div class="coming-soon">
        <div class="coming-soon-card">
          <div class="icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
            </svg>
          </div>
          <h3>Sistema de Roles Avanzado</h3>
          <p>Gestión completa de roles y permisos para controlar el acceso a diferentes funcionalidades del sistema.</p>
          
          <div class="features-preview">
            <h4>Funcionalidades de gestión de roles:</h4>
            <ul>
              <li>👤 Cambiar roles de usuarios (user → admin → super_admin)</li>
              <li>🔐 Gestión de permisos granulares</li>
              <li>📋 Vista de usuarios por rol</li>
              <li>🔄 Historial de cambios de roles</li>
              <li>⚠️ Confirmaciones de seguridad para cambios críticos</li>
              <li>📊 Reportes de distribución de roles</li>
              <li>🔔 Notificaciones de cambios de rol</li>
              <li>📝 Registro de auditoría completo</li>
            </ul>
          </div>

          <div class="current-roles-info">
            <h4>Roles actuales del sistema:</h4>
            <div class="roles-grid">
              <div class="role-card user">
                <div class="role-icon">👤</div>
                <h5>Usuario</h5>
                <p>Acceso básico al dashboard personal y funcionalidades estándar</p>
              </div>
              <div class="role-card admin">
                <div class="role-icon">🛡️</div>
                <h5>Administrador</h5>
                <p>Gestión de usuarios, vista de analíticas y configuración del sistema</p>
              </div>
              <div class="role-card super-admin">
                <div class="role-icon">⭐</div>
                <h5>Super Administrador</h5>
                <p>Acceso completo incluyendo gestión de roles y funciones críticas</p>
              </div>
            </div>
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
.user-roles-page {
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
  max-width: 800px;
  width: 100%;
}

.icon {
  color: #f59e0b;
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
  margin-bottom: 2rem;
}

.features-preview h4, .current-roles-info h4 {
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

.current-roles-info {
  background: #fffbeb;
  border-radius: 0.75rem;
  padding: 2rem;
  text-align: left;
}

.roles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.role-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.role-card:hover {
  transform: translateY(-2px);
}

.role-card.user {
  border-top: 4px solid #3b82f6;
}

.role-card.admin {
  border-top: 4px solid #f59e0b;
}

.role-card.super-admin {
  border-top: 4px solid #8b5cf6;
}

.role-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.role-card h5 {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
}

.role-card p {
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .coming-soon-card {
    padding: 2rem;
    margin: 1rem;
  }
  
  .coming-soon-card h3 {
    font-size: 1.5rem;
  }
  
  .features-preview ul,
  .roles-grid {
    grid-template-columns: 1fr;
  }
}
</style>
