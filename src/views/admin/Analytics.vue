<template>
  <AdminLayout>
    <div class="analytics-page">
      <!-- Header -->
      <div class="page-header">
        <div class="header-content">
          <h2>Analíticas y Reportes</h2>
          <p>Estadísticas detalladas y reportes del sistema VitalSystems</p>
        </div>
        
        <div class="header-actions">
          <select v-model="selectedPeriod" class="period-selector">
            <option value="7days">Últimos 7 días</option>
            <option value="30days">Últimos 30 días</option>
            <option value="3months">Últimos 3 meses</option>
            <option value="year">Último año</option>
          </select>
          
          <button @click="exportReport" class="export-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Exportar Reporte
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Cargando analíticas...</p>
      </div>

      <!-- Analytics Content -->
      <div v-else class="analytics-content">
        <!-- Summary Cards -->
        <div class="summary-cards">
          <div class="summary-card">
            <div class="card-icon users">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" fill="currentColor"/>
              </svg>
            </div>
            <div class="card-content">
              <h3>{{ analytics.totalUsers }}</h3>
              <p>Usuarios Totales</p>
              <span class="growth positive">+{{ analytics.recentUsers }} nuevos</span>
            </div>
          </div>

          <div class="summary-card">
            <div class="card-icon active">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="card-content">
              <h3>{{ analytics.activeUsers }}%</h3>
              <p>Usuarios Activos</p>
              <span class="growth positive">+2.4% vs mes anterior</span>
            </div>
          </div>

          <div class="summary-card">
            <div class="card-icon family">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="card-content">
              <h3>{{ analytics.usersWithFamily }}</h3>
              <p>Con Familiar Config.</p>
              <span class="growth neutral">{{ Math.round((analytics.usersWithFamily / analytics.totalUsers) * 100) }}% del total</span>
            </div>
          </div>

          <div class="summary-card">
            <div class="card-icon notifications">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="card-content">
              <h3>{{ analytics.notificationsEnabled }}</h3>
              <p>Notificaciones Activas</p>
              <span class="growth positive">{{ analytics.silentModeUsers }} en modo silencio</span>
            </div>
          </div>
        </div>

        <!-- Charts Grid -->
        <div class="charts-grid">
          <!-- User Growth Chart -->
          <div class="chart-section full-width">
            <LineChart
              :data="growthData.data"
              :labels="growthData.months"
              title="Crecimiento de Usuarios"
              subtitle="Usuarios registrados acumulados por mes"
              line-color="#3b82f6"
              :show-area="true"
            />
          </div>

          <!-- Demographics Charts -->
          <div class="chart-section pie-chart">
            <PieChart
              :data="genderData"
              title="Distribución por Género"
              subtitle="Segmentación demográfica"
              :size="pieSize"
              center-label="Usuarios"
            />
          </div>

          <div class="chart-section">
            <BarChart
              :data="ageGroupData"
              title="Distribución por Edad"
              subtitle="Grupos etarios de usuarios"
              :height="barHeight"
              :show-legend="false"
            />
          </div>


          <!-- Settings Analytics -->
          <div class="chart-section">
            <BarChart
              :data="settingsData"
              title="Configuraciones de Usuario"
              subtitle="Preferencias más comunes"
              :height="barHeight"
              :show-legend="true"
            />
          </div>
        </div>

        <!-- Data Tables -->
        <div class="data-tables">
          <!-- Top Users Activity -->
          <div class="table-section">
            <div class="table-header">
              <h3>Actividad Reciente</h3>
              <p>Últimas acciones en el sistema</p>
            </div>
            
            <div class="activity-table">
              <div 
                v-for="activity in recentActivity" 
                :key="activity.id"
                class="activity-row"
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
                  <p class="activity-message">{{ activity.message }}</p>
                  <span class="activity-time">{{ formatRelativeTime(activity.timestamp) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- System Health Metrics -->
          <div class="table-section">
            <div class="table-header">
              <h3>Métricas del Sistema</h3>
              <p>Estado y rendimiento</p>
            </div>
            
            <div class="metrics-grid">
              <div class="metric-item">
                <div class="metric-label">Tiempo de Respuesta</div>
                <div class="metric-value good">< 200ms</div>
              </div>
              
              <div class="metric-item">
                <div class="metric-label">Disponibilidad</div>
                <div class="metric-value good">99.9%</div>
              </div>
              
              <div class="metric-item">
                <div class="metric-label">Almacenamiento</div>
                <div class="metric-value warning">75% usado</div>
              </div>
              
              <div class="metric-item">
                <div class="metric-label">Usuarios Concurrentes</div>
                <div class="metric-value good">{{ Math.floor(analytics.totalUsers * 0.15) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import BarChart from '@/components/shared/BarChart.vue'
import PieChart from '@/components/shared/PieChart.vue'
import LineChart from '@/components/shared/LineChart.vue'
import { getDemographicAnalytics, getGrowthData, getRecentActivity } from '@/data/placeholderUsers'
import { useAdmin } from '@/composables/useAdmin'

const { getBasicStats, getRecentActivity: getRecentActivityComposable } = useAdmin()

// State
const loading = ref(true)
const selectedPeriod = ref('30days')
const analytics = ref({
  totalUsers: 0,
  activeUsers: 0,
  recentUsers: 0,
  usersWithFamily: 0,
  notificationsEnabled: 0,
  silentModeUsers: 0
})
const recentActivity = ref([])
const demographicData = ref(null)
const growthData = ref({ months: [], data: [] })

// Computed properties for chart data
const genderData = computed(() => {
  if (!demographicData.value) return []
  
  return [
    {
      label: 'Masculino',
      value: demographicData.value.genderStats.masculino,
      color: '#3b82f6'
    },
    {
      label: 'Femenino', 
      value: demographicData.value.genderStats.femenino,
      color: '#f59e0b'
    }
  ]
})

const ageGroupData = computed(() => {
  if (!demographicData.value) return []
  
  return Object.entries(demographicData.value.ageGroups).map(([label, value]) => ({
    label,
    value,
    color: undefined // Usar colores por defecto
  }))
})

const roleData = computed(() => {
  return [
    {
      label: 'Usuarios',
      value: (analytics.value.totalUsers || 0) - (analytics.value.totalAdmins || 0),
      color: '#10b981'
    },
    {
      label: 'Administradores',
      value: analytics.value.totalAdmins || 0,
      color: '#f59e0b'
    }
  ]
})

const settingsData = computed(() => {
  if (!demographicData.value) return []
  
  return [
    {
      label: 'Con Familiar',
      value: demographicData.value.usersWithFamily || analytics.value.usersWithFamily,
      color: '#3b82f6'
    },
    {
      label: 'Notificaciones',
      value: demographicData.value.notificationStats?.enabled || analytics.value.notificationsEnabled,
      color: '#10b981'
    },
    {
      label: 'Modo Silencio',
      value: demographicData.value.notificationStats?.silentMode || analytics.value.silentModeUsers,
      color: '#f59e0b'
    }
  ]
})

// Responsive sizes
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)
const handleResize = () => {
  windowWidth.value = typeof window !== 'undefined' ? window.innerWidth : windowWidth.value
}

const pieSize = computed(() => {
  if (windowWidth.value <= 360) return 140
  if (windowWidth.value <= 480) return 160
  if (windowWidth.value <= 768) return 200
  return 220
})

const barHeight = computed(() => {
  if (windowWidth.value <= 360) return '180px'
  if (windowWidth.value <= 480) return '200px'
  if (windowWidth.value <= 768) return '220px'
  return '260px'
})

// Methods
const loadAnalytics = async () => {
  try {
    loading.value = true
    
    // Cargar estadísticas básicas
    const stats = await getBasicStats()
    analytics.value = {
      totalUsers: stats.totalUsers,
      activeUsers: Math.round((stats.activeUsers / stats.totalUsers) * 100) || 95,
      recentUsers: stats.recentRegistrations,
      totalAdmins: stats.totalAdmins,
      totalSuperAdmins: stats.totalSuperAdmins,
      usersWithFamily: 0,
      notificationsEnabled: 0,
      silentModeUsers: 0
    }
    
    // Cargar datos demográficos
    demographicData.value = getDemographicAnalytics()
    analytics.value.usersWithFamily = demographicData.value.usersWithFamily
    analytics.value.notificationsEnabled = demographicData.value.notificationStats.enabled
    analytics.value.silentModeUsers = demographicData.value.notificationStats.silentMode
    
    // Cargar datos de crecimiento
    growthData.value = getGrowthData()
    
    // Cargar actividad reciente
    recentActivity.value = getRecentActivity()
    
  } catch (error) {
    console.error('Error cargando analíticas:', error)
  } finally {
    loading.value = false
  }
}

const exportReport = () => {
  // Crear datos del reporte
  const reportData = {
    generatedAt: new Date().toISOString(),
    period: selectedPeriod.value,
    summary: analytics.value,
    demographics: demographicData.value,
    growth: growthData.value,
    recentActivity: recentActivity.value
  }
  
  // Convertir a JSON y descargar
  const dataStr = JSON.stringify(reportData, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  
  const link = document.createElement('a')
  link.href = URL.createObjectURL(dataBlob)
  link.download = `vitalsystems-analytics-${new Date().toISOString().split('T')[0]}.json`
  link.click()
}

const formatRelativeTime = (timestamp) => {
  const now = new Date()
  const date = new Date(timestamp)
  const diffInSeconds = Math.floor((now - date) / 1000)
  
  if (diffInSeconds < 60) return 'Hace un momento'
  if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} minutos`
  if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} horas`
  if (diffInSeconds < 604800) return `Hace ${Math.floor(diffInSeconds / 86400)} días`
  return date.toLocaleDateString('es-ES')
}

// Lifecycle
onMounted(() => {
  loadAnalytics()
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleResize)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize)
  }
})
</script>

<style scoped>
.analytics-page {
  padding: 0;
}

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.header-content h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.875rem;
  font-weight: 600;
  color: #1f2937;
}

.header-content p {
  margin: 0;
  color: #6b7280;
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.period-selector {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;
  cursor: pointer;
}

.export-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.export-btn:hover {
  background: #2563eb;
}

/* Loading */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #6b7280;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Summary Cards */
.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.summary-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s ease;
}

.summary-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.card-icon.users { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
.card-icon.active { background: linear-gradient(135deg, #10b981, #059669); }
.card-icon.family { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }
.card-icon.notifications { background: linear-gradient(135deg, #f59e0b, #d97706); }

.card-content h3 {
  margin: 0 0 0.25rem 0;
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
}

.card-content p {
  margin: 0 0 0.5rem 0;
  color: #6b7280;
  font-weight: 500;
}

.growth {
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
}

.growth.positive {
  background: #dcfce7;
  color: #166534;
}

.growth.neutral {
  background: #f3f4f6;
  color: #4b5563;
}

/* Charts Grid */
.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
}

.chart-section {
  background: transparent;
}

.chart-section.full-width {
  grid-column: 1 / -1;
}

/* Data Tables */
.data-tables {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.table-section {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
}

.table-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f3f4f6;
}

.table-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.table-header p {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

/* Activity Table */
.activity-table {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;
}

.activity-row:hover {
  background: #f9fafb;
}

.activity-icon {
  width: 32px;
  height: 32px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-icon.user { background: #dbeafe; color: #1e40af; }
.activity-icon.settings { background: #fef3c7; color: #d97706; }
.activity-icon.warning { background: #fee2e2; color: #dc2626; }
.activity-icon.role { background: #fce7f3; color: #be185d; }

.activity-content {
  flex: 1;
}

.activity-message {
  margin: 0 0 0.25rem 0;
  font-size: 0.875rem;
  color: #1f2937;
  font-weight: 500;
}

.activity-time {
  font-size: 0.75rem;
  color: #9ca3af;
}

/* Metrics Grid */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.metric-item {
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  text-align: center;
}

.metric-label {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.metric-value {
  font-size: 1.125rem;
  font-weight: 700;
}

.metric-value.good { color: #10b981; }
.metric-value.warning { color: #f59e0b; }
.metric-value.danger { color: #ef4444; }

/* Responsive Design */
@media (max-width: 1200px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .chart-section.full-width {
    grid-column: 1;
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .header-actions {
    justify-content: stretch;
    flex-direction: column;
  }
  
  .summary-cards {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .summary-card {
    padding: 1rem;
  }
  
  .card-icon {
    width: 48px;
    height: 48px;
  }
  
  .card-content h3 {
    font-size: 1.5rem;
  }
  
  .charts-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  /* Mobile-specific layout tweaks for pie charts */
  .pie-chart {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Ensure the chart never overflows the container on mobile */
  .pie-chart > * {
    max-width: 100%;
  }
  
  .data-tables {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .metrics-grid {
    grid-template-columns: 1fr;
  }
  
  .table-section {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .activity-row {
    padding: 0.5rem;
  }
  
  .activity-icon {
    width: 28px;
    height: 28px;
  }

  /* Slightly tighter spacing for pie chart sections on very small screens */
  .pie-chart {
    padding: 0.25rem 0;
  }
  
  .metric-item {
    padding: 0.75rem;
  }
}
</style>
