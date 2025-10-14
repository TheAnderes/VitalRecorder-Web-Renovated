<template>
  <AdminLayout>
    <!-- Enhanced Page Header -->
    <div class="page-header-enhanced">
      <div class="header-left">
        <div class="header-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/>
            <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <div class="header-text">
          <h1>Registro y Administración de Pacientes</h1>
          <p>Sistema completo de registro, administración y seguimiento de pacientes</p>
        </div>
      </div>
      
      <div class="header-actions">
        <button @click="goToRegister" class="btn-primary">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          Nuevo Paciente
        </button>
        <button @click="refreshData" class="btn-secondary" :disabled="loading">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" :class="{ 'spin': loading }">
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" stroke="currentColor" stroke-width="2"/>
          </svg>
          Actualizar
        </button>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="nav-tabs-container">
      <nav class="nav-tabs">
        <router-link 
          :to="{ name: 'admin-patient-list' }" 
          class="nav-tab"
          active-class="active"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" stroke="currentColor" stroke-width="2"/>
            <rect x="14" y="3" width="7" height="7" stroke="currentColor" stroke-width="2"/>
            <rect x="3" y="14" width="7" height="7" stroke="currentColor" stroke-width="2"/>
            <rect x="14" y="14" width="7" height="7" stroke="currentColor" stroke-width="2"/>
          </svg>
          <span>Lista de Pacientes</span>
        </router-link>

        <router-link 
          :to="{ name: 'admin-patient-registro' }" 
          class="nav-tab"
          active-class="active"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/>
            <circle cx="8.5" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
            <line x1="20" y1="8" x2="20" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <line x1="23" y1="11" x2="17" y2="11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>Registrar Paciente</span>
        </router-link>

        <router-link 
          :to="{ name: 'admin-patient-perfil' }" 
          class="nav-tab"
          active-class="active"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/>
            <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
          </svg>
          <span>Perfil de Paciente</span>
        </router-link>
      </nav>
    </div>

    <!-- Main Content Area with Router View -->
    <div class="content-container">
      <router-view v-slot="{ Component }">
        <transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/components/admin/AdminLayout.vue'

const router = useRouter()
const loading = ref(false)

// Methods
const refreshData = () => {
  loading.value = true
  // Reload current route
  router.go(0)
}

const goToRegister = () => {
  router.push({ name: 'admin-patient-registro' })
}
</script>

<style scoped>
/* Enhanced Page Header */
.page-header-enhanced {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  padding: 2rem 2.5rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 30px rgba(30, 64, 175, 0.2);
  gap: 2rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.header-icon {
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.header-text h1 {
  margin: 0 0 0.5rem 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
}

.header-text p {
  margin: 0;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.5rem;
  background: white;
  color: #1e40af;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.25rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  backdrop-filter: blur(10px);
}

.btn-secondary:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
}

.btn-secondary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Navigation Tabs */
.nav-tabs-container {
  background: white;
  border-radius: 16px;
  padding: 0.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
  border: 1px solid #e2e8f0;
}

.nav-tabs {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  scrollbar-width: none;
}

.nav-tabs::-webkit-scrollbar {
  display: none;
}

.nav-tab {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.9rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  color: #64748b;
  text-decoration: none;
  transition: all 0.2s;
  white-space: nowrap;
  position: relative;
}

.nav-tab:hover {
  background: #f1f5f9;
  color: #3b82f6;
}

.nav-tab.active {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.nav-tab.active svg {
  color: white;
}

/* Content Container */
.content-container {
  position: relative;
}

/* Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Responsive */
@media (max-width: 768px) {
  .page-header-enhanced {
    flex-direction: column;
    align-items: stretch;
    padding: 1.5rem;
  }

  .header-left {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .header-text p {
    max-width: 100%;
  }

  .header-actions {
    flex-direction: column;
    width: 100%;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }

  .nav-tabs {
    flex-wrap: nowrap;
    overflow-x: auto;
  }

  .nav-tab {
    flex: 0 0 auto;
  }
}

@media (max-width: 640px) {
  .header-icon {
    width: 56px;
    height: 56px;
  }

  .header-icon svg {
    width: 28px;
    height: 28px;
  }

  .header-text h1 {
    font-size: 1.5rem;
  }
}
</style>
