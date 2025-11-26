<template>
  <AdminLayout>
    <!-- Welcome Section -->
    <div class="dashboard-welcome">
      <div class="welcome-card">
        <h2>¡Bienvenido al Panel de Administración!</h2>
        <p>Gestiona usuarios, visualiza estadísticas y configura VitalSystems.</p>
      </div>
    </div>

    <!-- Stats Cards -->
    

    <!-- Quick Actions -->
    <div class="quick-actions">
      <h3>Acciones Rápidas</h3>
      <div class="actions-grid">
        <router-link to="/admin/users" class="action-card">
          <div class="action-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" fill="currentColor"/>
            </svg>
          </div>
          <div class="action-content">
            <h4>Gestionar Usuarios</h4>
            <p>Ver, editar y administrar usuarios</p>
          </div>
        </router-link>

        <router-link to="/admin/analytics" class="action-card">
          <div class="action-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.25h-15A2.25 2.25 0 012 17V4.75A2.25 2.25 0 014.25 2.5h15A2.25 2.25 0 0121.5 4.75V17a2.25 2.25 0 01-2.25 2.25z" fill="currentColor"/>
            </svg>
          </div>
          <div class="action-content">
            <h4>Ver Analíticas</h4>
            <p>Estadísticas y reportes detallados</p>
          </div>
        </router-link>



      </div>
    </div>

        <!-- Recent Activity -->
        <div class="recent-activity">
          <div class="activity-header">
              <h3>Actividad Reciente</h3>
            </div>
          
          <div class="activity-list">
            <div v-if="recentActivity.length === 0" class="no-activity">No hay actividad reciente</div>
            <div v-else>
            <div 
              v-for="activity in recentActivity.slice(0, 5)" 
              :key="activity.id"
              class="activity-item"
            >
              <div class="activity-icon" :class="activity.icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path v-if="activity.icon === 'user'" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" fill="currentColor"/>
                  <path v-else-if="activity.icon === 'settings'" d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" fill="currentColor"/>
                  <path v-else-if="activity.icon === 'warning'" d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.46 9-11V7l-10-5z M12 17h-2v-2h2v2z M12 13h-2V7h2v6z" fill="currentColor"/>
                  <path v-else d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                </svg>
              </div>
              <div class="activity-content">
                <p><strong>{{ activity.message }}</strong></p>
                <span class="activity-time">{{ formatDate(activity.timestamp) }}</span>
              </div>
            </div>
            </div>
          </div>
        </div>
        
  </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAdmin } from '@/composables/useAdmin'
import { useAdminStore } from '@/stores/admin'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import * as AdminPatientService from '@/services/AdminPatientService'
import { userService } from '@/services/userService'

const { canEditUserRoles, getRecentActivity: getRecentActivityComposable } = useAdmin()
const adminStore = useAdminStore()

// State
const recentActivity = ref([])
const onlineUsers = ref(0)

// Computed
const stats = computed(() => adminStore.stats)
const loading = computed(() => adminStore.loading)

const growthPercentage = computed(() => {
  const total = stats.value.totalUsers
  return total > 0 ? Math.round((stats.value.regularUsers / total) * 100) : 0
})

// Methods
// Mostrar fecha en formato corto (ej. 30/9/2024) para coincidir con el diseño
const formatDate = (timestamp) => {
  try {
    const date = new Date(timestamp)
    return date.toLocaleDateString('es-ES')
  } catch (e) {
    return ''
  }
}

const loadDashboardData = async () => {
  try {
    // Cargar estadísticas básicas
    await adminStore.fetchStats()
    
    // Cargar actividad reciente usando los mismos orígenes que Analytics (usuarios + pacientes)
    try {
      const [usersList, patientsList] = await Promise.all([
        userService.getAllUsers(),
        AdminPatientService.listPatients()
      ])

      const activities = []

      // Usuarios: tomar registros más recientes
      usersList.slice().sort((a,b)=>{
        const at = (a.createdAt && a.createdAt.toDate) ? a.createdAt.toDate() : new Date(a.createdAt || 0)
        const bt = (b.createdAt && b.createdAt.toDate) ? b.createdAt.toDate() : new Date(b.createdAt || 0)
        return bt - at
      }).slice(0,8).forEach(u => {
        const ts = (u.createdAt && u.createdAt.toDate) ? u.createdAt.toDate() : new Date(u.createdAt || Date.now())
        activities.push({ id: `u-${u.id}`, icon: 'user', message: `Registro: ${u.persona?.nombres || u.email || 'Usuario'}`, timestamp: ts })
      })

      // Pacientes: cambios/actualizaciones recientes
      patientsList.slice().sort((a,b)=>{
        const at = (a.updatedAt && a.updatedAt.toDate) ? a.updatedAt.toDate() : new Date(a.updatedAt || a.createdAt || 0)
        const bt = (b.updatedAt && b.updatedAt.toDate) ? b.updatedAt.toDate() : new Date(b.updatedAt || b.createdAt || 0)
        return bt - at
      }).slice(0,8).forEach(p => {
        const ts = (p.updatedAt && p.updatedAt.toDate) ? p.updatedAt.toDate() : new Date(p.updatedAt || p.createdAt || Date.now())
        activities.push({ id: `p-${p.id}`, icon: 'warning', message: `Paciente actualizado: ${p.persona?.nombres || p.dni || p.id}`, timestamp: ts })
      })

      // Ordenar y limitar a 5
      recentActivity.value = activities.sort((a,b)=> b.timestamp - a.timestamp).slice(0,5)
    } catch (err) {
      console.warn('No se pudo construir actividad desde servicios (fallback al composable):', err)
      // Fallback: intentar composable (placeholder)
      try {
        const activities = await getRecentActivityComposable()
        recentActivity.value = (activities || [])
          .filter(a => a.type !== 'settings_updated' && a.message !== 'Configuraciones del sistema actualizadas')
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      } catch (e) {
        console.error('Error cargando actividad reciente desde composable:', e)
        recentActivity.value = []
      }
    }
    
    // Calcular usuarios online (simulado)
    onlineUsers.value = Math.floor(stats.value.totalUsers * 0.15) || 3
    
  } catch (error) {
    console.error('Error cargando datos del dashboard:', error)
  }
}

onMounted(() => {
  loadDashboardData()
  
  // Actualizar datos cada 30 segundos
  setInterval(() => {
    loadDashboardData()
  }, 30000)
})
</script>

<style scoped>
.dashboard-welcome {
  margin-bottom: 2rem;
}

.welcome-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
}

.welcome-card h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.875rem;
  font-weight: 600;
}

.welcome-card p {
  margin: 0;
  font-size: 1.125rem;
  opacity: 0.9;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stat-icon.users { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
.stat-icon.admins { background: linear-gradient(135deg, #f59e0b, #d97706); }
.stat-icon.active { background: linear-gradient(135deg, #10b981, #059669); }
.stat-icon.growth { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }

.stat-content h3 {
  margin: 0 0 0.25rem 0;
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
}

.stat-content p {
  margin: 0 0 0.5rem 0;
  color: #6b7280;
  font-weight: 500;
}

.stat-change {
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
}

.stat-change.positive { 
  background: #dcfce7; 
  color: #166534; 
}

.stat-change.neutral { 
  background: #f3f4f6; 
  color: #4b5563; 
}

.quick-actions {
  margin-bottom: 3rem;
}

.quick-actions h3 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.action-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  text-decoration: none;
  color: inherit;
}

.action-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.action-content h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
}

.action-content p {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.recent-activity h3 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
}

.activity-list {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
}

.no-activity {
  color: #6b7280;
  padding: 1rem 0;
  text-align: center;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 32px;
  height: 32px;
  background: #f3f4f6;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
}

.activity-content p {
  margin: 0 0 0.25rem 0;
  font-size: 0.875rem;
  color: #1f2937;
}

.activity-time {
  font-size: 0.75rem;
  color: #9ca3af;
}

/* Activity Header */
.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.view-all-link {
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.view-all-link:hover {
  color: #2563eb;
  text-decoration: none;
}

/* Activity Icons by Type */
.activity-icon.user {
  background: #dbeafe;
  color: #1e40af;
}

.activity-icon.settings {
  background: #fef3c7;
  color: #d97706;
}

.activity-icon.warning {
  background: #fee2e2;
  color: #dc2626;
}

.activity-icon.role {
  background: #fce7f3;
  color: #be185d;
}

/* System Health */
.system-health {
  margin-bottom: 2rem;
}

.system-health h3 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
}

.health-metrics {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.health-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background: #f8fafc;
}

.health-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.health-indicator.good {
  background: #10b981;
}

.health-indicator.warning {
  background: #f59e0b;
}

.health-indicator.danger {
  background: #ef4444;
}

.health-info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.health-label {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
}

.health-value {
  font-size: 0.875rem;
  color: #1f2937;
  font-weight: 600;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .actions-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .welcome-card {
    padding: 1.5rem;
  }
  
  .welcome-card h2 {
    font-size: 1.5rem;
  }
}
</style>
