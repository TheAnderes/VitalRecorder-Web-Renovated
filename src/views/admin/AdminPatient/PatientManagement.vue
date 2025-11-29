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
          <h1>Registro y Administración de Cuidadores</h1>
          <p>Sistema completo de registro, administración y seguimiento de cuidadores</p>
        </div>
      </div>
      
      <div class="header-actions">
            <button @click="goToRegister" class="btn-primary">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          Nuevo Cuidador
        </button>
            <button @click="exportPatientsPdf" class="btn-secondary" :disabled="loading">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7 10l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Exportar Lista (PDF)
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
          <span>Lista de Cuidadores</span>
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
          <span>Registrar Cuidador</span>
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
          <span>Perfil de Cuidador</span>
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
import * as AdminPatientService from '@/services/AdminPatientService'
import { userService } from '@/services/userService'

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

// Export patients list to print-friendly HTML (user can save as PDF from print dialog)
const exportPatientsPdf = async () => {
  try {
  loading.value = true
  // Fetch users and export only those with role === 'cuidador' (or 'caregiver')
  const allUsers = await userService.getAllUsers()
  const list = (allUsers || []).filter(u => {
    const r = (u.role || '').toString().toLowerCase()
    return r === 'cuidador' || r === 'caregiver'
  })

    // Build rows using a layout similar to PatientList (avatar + meta, contact, gender, dept, date, estado)
    const rows = list.map(p => {
      const nombre = (p.persona && (p.persona.nombres || p.persona.apellidos)) ? `${p.persona.nombres || ''} ${p.persona.apellidos || ''}`.trim() : (p.dni || p.id || '')
      const dni = p.dni || ''
      const telefono = p.telefono || 'N/D'
      const email = p.email || 'N/D'
      const sexoRaw = (p.persona && p.persona.sexo) ? p.persona.sexo.toString() : ''
      const sexo = sexoRaw ? (sexoRaw.toLowerCase().includes('mascul') ? 'Masculino' : sexoRaw.toLowerCase().includes('femen') ? 'Femenino' : sexoRaw) : 'N/D'
      const dept = p.direccion?.provincia || p.direccion?.ciudad || 'N/D'
      const created = (p.createdAt && p.createdAt.toDate) ? p.createdAt.toDate() : new Date(p.createdAt || Date.now())
      const fecha = new Date(created).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
      const estado = p.estado ? p.estado : (p.isActive === false ? 'Inactivo' : 'Activo')
      const estadoClass = (estado && estado.toLowerCase().includes('inact')) ? 'badge-inactive' : 'badge-active'
      // initials
      const initials = (p.persona && (p.persona.nombres || p.persona.apellidos)) ? ((p.persona.nombres ? p.persona.nombres[0] : '') + (p.persona.apellidos ? p.persona.apellidos[0] : '')).toUpperCase() : (dni ? dni.toString().slice(0,2) : 'P')

      return `
        <tr>
          <td style="padding:14px 12px; vertical-align:middle;">
            <div style="display:flex; align-items:center; gap:12px;">
              <div style="width:46px; height:46px; border-radius:50%; background:#2563eb; color:white; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:16px;">${initials}</div>
              <div>
                <div style="font-weight:700; font-size:14px; color:#0f172a">${nombre}</div>
                <div style="font-size:12px; color:#6b7280; margin-top:4px">ID ${dni || 'N/D'} • ${'N/A años'}</div>
              </div>
            </div>
          </td>
          <td style="padding:14px 12px; vertical-align:middle; font-size:13px; color:#0f172a">
            <div style="font-weight:700">${telefono}</div>
            <div style="font-size:12px; color:#6b7280; margin-top:6px">${email}</div>
          </td>
          <td style="padding:14px 12px; vertical-align:middle; text-align:left">
            <div style="font-weight:700">${sexo}</div>
            <div style="font-size:12px;color:#6b7280">${sexo}</div>
          </td>
          <td style="padding:14px 12px; vertical-align:middle">${dept}</td>
          <td style="padding:14px 12px; vertical-align:middle">${fecha}</td>
          <td style="padding:14px 12px; vertical-align:middle"><span class="estado ${estadoClass}">${estado}</span></td>
        </tr>
      `
    }).join('\n')

    const html = `<!doctype html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>Listado de Usuarios</title>
      <style>
        body { font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color: #0f172a; padding: 24px; }
        header { display:flex; justify-content:space-between; align-items:center; margin-bottom:20px }
        h1 { margin:0; font-size:20px }
        table { width:100%; border-collapse: collapse; font-size:13px }
        thead th { text-align:left; padding:12px; color:#475569; font-weight:700; border-bottom:1px solid #e6eef7 }
        tbody tr { border-bottom:1px solid #f1f5f9 }
        .estado { padding:6px 10px; border-radius:999px; font-weight:700; font-size:12px }
        .badge-active { background:#dcfce7; color:#065f46 }
        .badge-inactive { background:#fee2e2; color:#9b1c1c }
        @media print {
          body { padding: 10mm }
          header { display:block }
        }
      </style>
    </head>
    <body>
      <header>
        <div>
          <h1>Listado de Cuidadores</h1>
          <div style="color:#6b7280; margin-top:6px; font-size:12px">Generado: ${new Date().toLocaleString('es-ES')}</div>
        </div>
        <div style="text-align:right">
          <div style="font-weight:700">VitalRecorder</div>
        </div>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th style="width:36%">Usuario</th>
              <th style="width:18%">Información de Contacto</th>
              <th style="width:12%">Género</th>
              <th style="width:12%">Departamento</th>
              <th style="width:14%">Fecha de registro</th>
              <th style="width:8%">Estado</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </main>
    </body>
    </html>`

    const w = window.open('', '_blank')
    if (!w) {
      alert('No se pudo abrir la ventana para imprimir. Revisa bloqueadores de popups.')
      return
    }
    w.document.write(html)
    w.document.close()
    // Wait for render then trigger print
    setTimeout(()=> { w.print() }, 300)
  } catch (err) {
    console.error('Error exportando cuidadores a PDF', err)
    alert('Error exportando cuidadores. Revisa la consola.')
  } finally {
    loading.value = false
  }
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
