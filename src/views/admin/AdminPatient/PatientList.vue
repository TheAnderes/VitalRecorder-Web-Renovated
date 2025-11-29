<template>
  <div>
    <!-- Filters Enhanced -->
    <div class="filters-section-enhanced">
      <div class="filters-header">
        <h3 class="filters-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M3 4h18M3 8h12M3 12h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          Filtros de Búsqueda
        </h3>
        <div class="filters-actions">
          <button @click="clearAllFilters" class="btn-clear-filters" v-if="hasActiveFilters">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Limpiar Filtros
          </button>
          <span class="results-count">{{ filteredUsers.length }} resultados</span>
        </div>
      </div>

      <div class="filters-grid">
        <!-- Search Box -->
        <div class="filter-item filter-search">
          <label class="filter-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Búsqueda General
          </label>
          <div class="input-wrapper">
            <input 
              type="text" 
              placeholder="Nombre, correo..."
              v-model="searchQuery"
              @input="updateSearch"
              class="filter-input"
            />
            <button 
              v-if="searchQuery" 
              @click="searchQuery = ''" 
              class="btn-clear-input"
              title="Limpiar búsqueda"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- CI Filter removed as requested -->

        <!-- Medical Status Filter -->
        <div class="filter-item">
          <label class="filter-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2v20M2 12h20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
            </svg>
            Estado Médico
          </label>
          <div class="select-wrapper">
            <select 
              v-model="medicalStatusFilter" 
              @change="updateMedicalStatusFilter" 
              class="filter-select"
            >
              <option value="all">📋 Todos los estados</option>
              <option value="Activo">✅ Activo</option>
              <option value="Inactivo">❌ Inactivo</option>
            </select>
            <svg class="select-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </div>

        <!-- Gender Filter -->
        <div class="filter-item">
          <label class="filter-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/>
              <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="currentColor" stroke-width="2"/>
            </svg>
            Sexo
          </label>
          <div class="select-wrapper">
            <select 
              v-model="genderFilter" 
              @change="updateGenderFilter" 
              class="filter-select"
            >
              <option value="all">👥 Todos</option>
              <option value="Masculino">👨 Masculino</option>
              <option value="Femenino">👩 Femenino</option>
            </select>
            <svg class="select-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </div>

        <!-- Age Range Filter removed as requested -->

        <!-- Sort By -->
        <div class="filter-item">
          <label class="filter-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M7 12h10M11 18h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Ordenar Por
          </label>
          <div class="sort-controls">
            <div class="select-wrapper">
              <select 
                v-model="sortBy" 
                @change="updateSort" 
                class="filter-select"
              >
                <option value="createdAt">📅 Fecha de registro</option>
                <option value="nombres">🔤 Nombre</option>
                <option value="age">🎂 Edad</option>
                <option value="lastVisit">🕐 Última visita</option>
              </select>
              <svg class="select-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <button 
              @click="toggleSortOrder" 
              class="btn-sort-order"
              :class="{ 'order-desc': sortOrder === 'desc' }"
              :title="sortOrder === 'asc' ? 'Orden ascendente' : 'Orden descendente'"
            >
              <svg v-if="sortOrder === 'asc'" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Active Filters Tags -->
      <div class="active-filters" v-if="hasActiveFilters">
        <span class="active-filters-label">Filtros activos:</span>
        <div class="filter-tags">
          <span v-if="searchQuery" class="filter-tag">
            Búsqueda: "{{ searchQuery }}"
            <button @click="searchQuery = ''" class="remove-tag">×</button>
          </span>
          <span v-if="medicalStatusFilter !== 'all'" class="filter-tag">
            Estado: {{ medicalStatusFilter }}
            <button @click="medicalStatusFilter = 'all'" class="remove-tag">×</button>
          </span>
          <span v-if="genderFilter !== 'all'" class="filter-tag">
            Sexo: {{ genderFilter }}
            <button @click="genderFilter = 'all'" class="remove-tag">×</button>
          </span>
        </div>
      </div>
    </div>

    <!-- Stats Bar -->
    <div class="stats-bar">
      <div class="stat-item">
        <span class="stat-number">{{ stats.total }}</span>
        <span class="stat-label">📊 Total Cuidadores</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">{{ stats.activePatients }}</span>
        <span class="stat-label">✅ Cuidadores Activos</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">{{ stats.inactivePatients }}</span>
        <span class="stat-label">❌ Cuidadores Inactivos</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">{{ stats.masculinePatients }}</span>
        <span class="stat-label">👨 Cuidadores Masculinos</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">{{ stats.femininePatients }}</span>
        <span class="stat-label">👩 Cuidadores Femeninos</span>
      </div>
    </div>

    <!-- Loading / Error / Table -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Cargando cuidadores...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
        <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
        <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
      </svg>
      <h3>Error al cargar cuidadores</h3>
      <p>{{ error }}</p>
      <button @click="refreshData" class="retry-btn">Reintentar</button>
    </div>

    <div v-else class="users-table">
      <div v-if="filteredUsers.length === 0" class="empty-state">
        <p>📭 No hay cuidadores registrados en Firebase</p>
        <p style="font-size: 0.9rem; color: #6b7280;">Total de cuidadores cargados: {{ patients.length }}</p>
        <button @click="openAddModal" class="primary-btn">Agregar primer cuidador</button>
      </div>
      <div v-else class="table-container">
        <!-- table markup (copied) -->
        <div class="data-grid">
          <div class="grid-header">
            <div class="cell user">Cuidador</div>
            <div class="cell contact">Información de Contacto</div>
            <div class="cell gender">Género</div>
            <div class="cell date center">Fecha de ingreso</div>
            <div class="cell status center">Estado</div>
            <div class="cell actions center">Acciones</div>
          </div>
          <div class="grid-body">
            <div class="grid-row" v-for="patient in filteredUsers" :key="patient.id">
              <div class="cell user">
                <div class="user-info">
                  <div class="user-avatar">
                    {{ getUserInitial(patient) }}
                  </div>
                  <div class="user-details">
                    <div class="user-name">{{ getUserFullName(patient) }}</div>
                    <div class="user-secondary">
                      <template v-if="calculateAge(patient) !== 'N/A'">
                        <span class="user-age">{{ calculateAge(patient) }} años</span>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="cell contact">
                <div class="contact-stacked">
                  <div class="contact-phone">📱 {{ patient.telefono || patient.persona?.telefono || 'N/D' }}</div>
                  <div class="contact-email">📧 {{ patient.email || patient.persona?.correo || 'N/D' }}</div>
                </div>
              </div>

              <div class="cell gender">
                <div style="font-weight:600; color:#111827;">{{ formatResponsableSexo(patient.persona?.sexo || patient.persona?.gender || patient.sexo || '') }}</div>
                <div style="font-size:0.82rem; color:#6b7280;">{{ patient.persona?.sexo || patient.persona?.gender || patient.sexo || 'N/D' }}</div>
              </div>


                  <div class="cell date center">
                    <span>{{ formatDate(patient.patientCreatedAt || patient.createdAt || patient.patientDoc?.createdAt) }}</span>
                  </div>

                  <div class="cell status center">
                    <span :class="['status-badge', (patient.isActive === false || String(patient.estado || '').toLowerCase() === 'inactivo') ? 'inactive' : 'active']">
                      {{ (patient.isActive === false || String(patient.estado || '').toLowerCase() === 'inactivo') ? 'Inactivo' : 'Activo' }}
                    </span>
                  </div>
              <div class="cell actions center">
                <div class="action-buttons">
                  <button @click="viewPatient(patient)" class="action-btn view" title="Ver detalles">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </button>

                  <button @click="goToEdit(patient)" class="action-btn edit" title="Editar cuidador">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </button>

                  <button @click="deactivatePatient(patient)" :class="['action-btn', patient.isActive ? 'delete' : 'restore']" :title="patient.isActive ? 'Desactivar cuidador' : 'Reactivar cuidador'">
                    <svg v-if="patient.isActive" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <polyline points="3,6 5,6 21,6" stroke="currentColor" stroke-width="2"/>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <polyline points="7 10 12 15 17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAdmin } from '@/composables/useAdmin'
import { userService } from '@/services/userService'

const { canManageUsers, canDeleteUsers } = useAdmin()
const router = useRouter()

// State directo (sin store)
const patients = ref([])
const loading = ref(false)
const error = ref(null)
const searchQuery = ref('')
const roleFilter = ref('all')
const sortBy = ref('createdAt')
const sortOrder = ref('desc')
const medicalStatusFilter = ref('all')
const genderFilter = ref('all')

// Stats computadas
const stats = computed(() => {
  const total = patients.value.length

  // Cuenta activa/inactiva comprobando varios lugares donde pueda estar el estado
  const isInactive = (p) => {
    try {
      // prioridad: patientDoc, luego top-level fields
      const pd = p.patientDoc
      if (pd && typeof pd.isActive === 'boolean') return pd.isActive === false
      if (pd && pd.estado) return String(pd.estado).toLowerCase() === 'inactivo'

      if (typeof p.isActive === 'boolean') return p.isActive === false
      if (p.estado) return String(p.estado).toLowerCase() === 'inactivo'

      return false
    } catch (e) { return false }
  }

  const active = patients.value.filter(p => !isInactive(p)).length
  const inactive = patients.value.filter(p => isInactive(p)).length

  const masculine = patients.value.filter(p => p.persona?.sexo === 'Masculino' || p.persona?.sexo === 'M').length
  const feminine = patients.value.filter(p => p.persona?.sexo === 'Femenino' || p.persona?.sexo === 'F').length
  const critical = 0

  return {
    totalUsers: total,
    total,
    activePatients: active,
    inactivePatients: inactive,
    masculinePatients: masculine,
    femininePatients: feminine,
    criticalPatients: critical
  }
})

// Filtrado y ordenamiento
const filteredUsers = computed(() => {
  let list = [...patients.value]
  
  // Búsqueda por texto
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(p => {
      const nombres = (p.persona?.nombres || '').toLowerCase()
      const apellidos = (p.persona?.apellidos || '').toLowerCase()
      const email = (p.email || p.persona?.correo || '').toLowerCase()
      // Only search by name or email as requested
      return nombres.includes(q) || apellidos.includes(q) || email.includes(q)
    })
  }
  
  // CI filter removed
  
  // Filtro por estado médico
  if (medicalStatusFilter.value && medicalStatusFilter.value !== 'all') {
    list = list.filter(p => {
      const status = p.medicalStatus || (p.isActive ? 'Activo' : 'Inactivo')
      return status === medicalStatusFilter.value
    })
  }
  
  // Filtro por sexo/género
  if (genderFilter.value && genderFilter.value !== 'all') {
    list = list.filter(p => {
      const sexo = p.persona?.sexo || ''
      return sexo === genderFilter.value || 
             (genderFilter.value === 'Masculino' && sexo === 'M') ||
             (genderFilter.value === 'Femenino' && sexo === 'F')
    })
  }
  
  // Age range filter removed
  
  // Filtro por rol
  if (roleFilter.value && roleFilter.value !== 'all') {
    list = list.filter(p => {
      // users from user collection will have role; patients may have role mirrored
      const role = p.role || p.userRole || 'cuidador'
      return role === roleFilter.value
    })
  }
  
  // Ordenamiento
  list.sort((a, b) => {
    let aV, bV
    
    if (sortBy.value === 'nombres') {
      aV = (a.persona?.nombres || '').toLowerCase()
      bV = (b.persona?.nombres || '').toLowerCase()
    } else if (sortBy.value === 'age') {
      aV = calculateAge(a)
      bV = calculateAge(b)
      // Handle 'N/A' values
      if (aV === 'N/A') aV = -1
      if (bV === 'N/A') bV = -1
    } else {
      aV = a[sortBy.value]
      bV = b[sortBy.value]
    }
    
    if (aV > bV) return sortOrder.value === 'asc' ? 1 : -1
    if (aV < bV) return sortOrder.value === 'asc' ? -1 : 1
    return 0
  })
  
  return list
})

// Local state for modals
const selectedUser = ref(null)
const showViewModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const showAddModal = ref(false)

const editForm = ref(null)
const addForm = ref({
  nombres: '',
  apellidos: '',
  email: '',
  telefono: '',
  dni: '',
  medicalInfo: { bloodGroup: '', allergies: [], chronicConditions: [] },
  medicalStatus: 'Activo',
  emergencyContacts: []
})

const criticalCount = computed(() => 0)

// Computed para detectar filtros activos
const hasActiveFilters = computed(() => {
    return searchQuery.value !== '' ||
      medicalStatusFilter.value !== 'all' ||
      genderFilter.value !== 'all' ||
      roleFilter.value !== 'all'
})

// Methods
const clearAllFilters = () => {
  searchQuery.value = ''
  medicalStatusFilter.value = 'all'
  genderFilter.value = 'all'
  // ageRangeFilter removed
  roleFilter.value = 'all'
}

const getAgeRangeLabel = (range) => {
  const labels = {
    '0-12': 'Niños (0-12)',
    '13-17': 'Adolescentes (13-17)',
    '18-59': 'Adultos (18-59)',
    '60-120': 'Adultos Mayores (60+)'
  }
  return labels[range] || range
}

const updateGenderFilter = () => {
  // El computed filteredUsers ya reactivo a genderFilter
}

const updateAgeRangeFilter = () => {
  // El computed filteredUsers ya reactivo a ageRangeFilter
}

// Methods
// New: load users (role 'user') and merge linked patient data when available
const loadUsersAndMergePatients = async () => {
  try {
    loading.value = true
    error.value = null
    console.log("🔄 Cargando usuarios con rol 'cuidador' desde Firebase...")

    // Load all users and then filter client-side for role 'cuidador' (accept both 'cuidador' and 'caregiver')
    const allUsers = await userService.getAllUsers()
    const users = (allUsers || []).filter(u => {
      const r = (u.role || '').toString().toLowerCase()
      return r === 'cuidador' || r === 'caregiver'
    })

    // No patients collection: use users only
    const merged = users.map(u => ({
      id: u.id,
      userId: u.id,
      userUid: u.uid || u.userUid || null,
      userEmail: u.email,
      role: u.role || 'cuidador',
      persona: { ...(u.persona || {}) },
      email: u.email,
      telefono: u.persona?.telefono || u.telefono || '',
      dni: u.persona?.dni || u.dni || '' ,
      medicalInfo: u.medicalInfo || {},
      linkedPatientId: null,
      patientCreatedAt: u.createdAt || null,
      patientDoc: null,
      isActive: typeof u.isActive === 'boolean' ? u.isActive : true,
      estado: typeof u.isActive === 'boolean' ? (u.isActive ? 'Activo' : 'Inactivo') : 'Activo'
    }))

    patients.value = merged
    console.log(`✅ Usuarios cargados: ${patients.value.length}`)
  } catch (err) {
    console.error("❌ Error cargando usuarios/cuidadores:", err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Backwards-compatible loader kept (not used) if needed
const loadPatients = async () => {
  try {
    loading.value = true
    error.value = null
    const list = await userService.getAllUsers()
    patients.value = (list || []).map(p => ({ ...p, isActive: typeof p.isActive === 'boolean' ? p.isActive : true }))
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const refreshData = async () => {
  await loadUsersAndMergePatients()
}

const updateSearch = () => {
  // El computed filteredUsers ya reactivo a searchQuery
}

const updateDniFilter = () => {
  // El computed filteredUsers ya reactivo a dniFilter
}

const updateMedicalStatusFilter = () => {
  // El computed filteredUsers ya reactivo a medicalStatusFilter
}

const updateSort = () => {
  // El computed filteredUsers ya reactivo a sortBy
}

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

// Action handlers
const viewPatient = (user) => {
  if (!user) return
  // Prefer navigating to linked patient doc if present
  const targetId = user.linkedPatientId || user.userId || user.id
  if (!targetId) return
  router.push({ name: 'admin-patient-perfil', query: { id: targetId } }).catch(()=>{})
}

const editPatient = (user) => {
  selectedUser.value = user
  editForm.value = {
    nombres: user.persona?.nombres || '',
    apellidos: user.persona?.apellidos || '',
    email: user.email || '',
    role: user.role || 'cuidador',
    // Forzar activo en edición
    isActive: true,
    dni: user.dni || '',
    medicalInfo: user.medicalInfo || {},
    // Forzar estado médico Activo
    medicalStatus: 'Activo'
  }
  showEditModal.value = true
}
const savePatientEdits = async () => {
  if (!selectedUser.value || !editForm.value) return
  try {
    await userService.updateUser(selectedUser.value.id, {
      persona: { nombres: editForm.value.nombres, apellidos: editForm.value.apellidos },
      email: editForm.value.email,
      role: editForm.value.role,
      isActive: editForm.value.isActive,
      dni: editForm.value.dni,
      medicalInfo: editForm.value.medicalInfo,
      medicalStatus: editForm.value.medicalStatus
    })
  console.log("✅ Cuidador actualizado en Firebase")
  await loadUsersAndMergePatients() // Recargar lista desde users
  } catch (e) {
    console.error('Error guardando cuidador:', e)
  } finally {
    closeModals()
  }
}

const deletePatient = (user) => {
  // legacy: keep for compatibility
  selectedUser.value = user
  showDeleteModal.value = true
}

// Instead of hard delete, mark as inactive
const deactivatePatient = async (user) => {
  if (!user || !user.id) return
  const stored = patients.value.find(u => u.id === user.id)
  if (!stored) {
    alert('No se encontró el cuidador en la lista')
    return
  }
  // Determine current state: prefer stored.isActive, fallback to stored.estado
  const isCurrentlyActive = typeof stored.isActive === 'boolean' ? stored.isActive : (String(stored.estado || 'Activo').toLowerCase() === 'activo')
  const willDeactivate = !!isCurrentlyActive
  const confirmMsg = willDeactivate ? `Marcar al cuidador ${getUserFullName(stored)} como Inactivo?` : `Reactivar al cuidador ${getUserFullName(stored)}?`
  const ok = confirm(confirmMsg)
  if (!ok) return
      try {
    const newIsActive = !willDeactivate
    const newEstado = newIsActive ? 'Activo' : 'Inactivo'

    // Intenta encontrar un documento en la colección 'patients' en este orden:
    // 1) stored.linkedPatientId
    // 2) stored.patientDoc?.id
    // 3) búsqueda entre patientDocs cargados por email/dni/uid
    let targetPatientId = null

    // 1) linkedPatientId
    if (stored.linkedPatientId) targetPatientId = stored.linkedPatientId

    // 2) patientDoc.id
    if (!targetPatientId && stored.patientDoc?.id) targetPatientId = stored.patientDoc.id

    // Directly update the user document: no patients collection anymore
    if (!stored.id) {
      alert('No se encontró el usuario objetivo para actualizar el estado.')
      return
    }

    await userService.updateUser(stored.id, { isActive: newIsActive, estado: newEstado })
    console.log(`✅ Estado del usuario (${stored.id}) actualizado en collection users`)
    await loadUsersAndMergePatients()
    alert(`Usuario ${getUserFullName(stored)} actualizado: ${newEstado}`)
  } catch (e) {
    console.error('Error actualizando estado del cuidador:', e)
    // Mostrar mensaje más informativo
    alert('Error actualizando estado. Revisa la consola o verifica que el documento exista en Firestore.')
  }
}

const goToEdit = (user) => {
  if (!user) return
  const editId = user.linkedPatientId || user.userId || user.id
  if (!editId) return
  router.push({ name: 'admin-patient-edit', query: { editId } }).catch(()=>{})
}

// Add patient
const openAddModal = () => {
  addForm.value = {
    nombres: '', apellidos: '', email: '', telefono: '', dni: '',
    medicalInfo: { bloodGroup: '', allergies: [], chronicConditions: [] },
    medicalStatus: 'Activo', emergencyContacts: []
  }
  showAddModal.value = true
}

const addPatient = async () => {
  try {
    const payload = {
      persona: { nombres: addForm.value.nombres, apellidos: addForm.value.apellidos },
      email: addForm.value.email,
      telefono: addForm.value.telefono,
      dni: addForm.value.dni,
      medicalInfo: addForm.value.medicalInfo,
      medicalStatus: addForm.value.medicalStatus,
      emergencyContacts: addForm.value.emergencyContacts,
      estado: 'Activo',  // Estado por defecto
      role: 'cuidador',
      isActive: true     // Activo por defecto
    }
    console.log("💾 [PatientList] Creando cuidador con estado:", payload.estado, "- isActive:", payload.isActive)
    // Create as a user in the `users` collection (keep centralized storage)
    await userService.createUser(payload)
  console.log("✅ Cuidador creado en Firebase")
  await loadUsersAndMergePatients()
  } catch (e) {
    console.error('Error agregando cuidador:', e)
  } finally {
    showAddModal.value = false
  }
}

const closeModals = () => {
  showViewModal.value = false
  showEditModal.value = false
  showDeleteModal.value = false
  showAddModal.value = false
  editForm.value = null
}

// Temp inputs for complex fields in Add modal
const _allergies_temp = ref('')
const _emergency_temp = ref('')

const addEmergencyContact = () => {
  if (!_emergency_temp.value) return
  const parts = _emergency_temp.value.split('-').map(s => s.trim())
  if (parts.length < 3) return
  const [name, relation, phone] = parts
  addForm.value.emergencyContacts = addForm.value.emergencyContacts || []
  addForm.value.emergencyContacts.push({ name, relation, phone })
  _emergency_temp.value = ''
}

const getUserInitial = (user) => {
  if (user.persona?.nombres) {
    return user.persona.nombres.charAt(0).toUpperCase()
  } else if (user.email) {
    return user.email.charAt(0).toUpperCase()
  }
  return 'U'
}

const getUserFullName = (user) => {
  if (user.persona?.nombres || user.persona?.apellidos) {
    return `${user.persona?.nombres || ''} ${user.persona?.apellidos || ''}`.trim()
  }
  return user.email?.split('@')[0] || 'Usuario sin nombre'
}

const getRoleDisplayName = (role) => {
  const roleNames = {
    'user': 'Usuario',
    'admin': 'Administrador'
  }
  return roleNames[role] || role
}

const statusClass = (status) => 'active'

const calculateAge = (patient) => {
  try {
    // Prefer fecha_nac/fecha_nacimiento from linked patient doc if available
    const fechaNac = patient.patientDoc?.persona?.fecha_nac || patient.patientDoc?.persona?.fecha_nacimiento || patient.patientDoc?.fechaNacimiento || patient.persona?.fecha_nac || patient.persona?.fecha_nacimiento || patient.fecha_nac || patient.fecha_nacimiento
    if (!fechaNac) return 'N/A'

    // parse with flexible parser (support Spanish textual dates with UTC offset)
    const parseFlexibleDate = (input) => {
      if (!input) return null
      if (input && typeof input.toDate === 'function') return input.toDate()
      if (input instanceof Date) return input
      if (typeof input === 'string') {
        const d = new Date(input)
        if (!isNaN(d)) return d
        const months = { enero:0, febrero:1, marzo:2, abril:3, mayo:4, junio:5, julio:6, agosto:7, septiembre:8, octubre:9, noviembre:10, diciembre:11 }
        const re = /([0-9]{1,2})\s+de\s+([a-záéíóúñ]+)\s+de\s+([0-9]{4})(?:[,\s]+\s*([0-9]{1,2}):([0-9]{2})(?::([0-9]{2}))?\s*(a\.m\.|p\.m\.|am|pm)?)?(?:\s*UTC([+-]?\d+))?/i
        const m = input.match(re)
        if (m) {
          try {
            const day = parseInt(m[1],10)
            const month = months[(m[2]||'').toLowerCase()] ?? 0
            const year = parseInt(m[3],10)
            let hour = m[4] ? parseInt(m[4],10) : 0
            const minute = m[5] ? parseInt(m[5],10) : 0
            const second = m[6] ? parseInt(m[6],10) : 0
            const ampmRaw = m[7] ? m[7].toLowerCase() : null
            if (ampmRaw) {
              const ampm = ampmRaw.replace(/\./g,'')
              if ((ampm === 'am' || ampm === 'a m') && hour === 12) hour = 0
              if ((ampm === 'pm' || ampm === 'p m') && hour < 12) hour += 12
            }
            const tzStr = m[8]
            if (tzStr !== undefined && tzStr !== null && tzStr !== '') {
              const tz = parseInt(tzStr,10)
              const ts = Date.UTC(year, month, day, hour, minute, second) - (tz * 3600 * 1000)
              return new Date(ts)
            }
            return new Date(year, month, day, hour, minute, second)
          } catch (e) { return null }
        }
      }
      return null
    }

    const birthDate = parseFlexibleDate(fechaNac)
    if (!birthDate) return 'N/A'
    
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age >= 0 ? age : 'N/A'
  } catch (e) {
    console.error('Error calculando edad:', e)
    return 'N/A'
  }
}

const getResponsableName = (patient) => {
  if (!patient.responsable) return 'N/D'
  const nombres = patient.responsable.nombres || ''
  const apellidos = patient.responsable.apellidos || ''
  const fullName = `${nombres} ${apellidos}`.trim()
  return fullName || patient.responsable.nombre || 'N/D'
}

const formatResponsableSexo = (sexo) => {
  if (!sexo) return 'N/D'
  const s = String(sexo).trim()
  if (!s) return 'N/D'
  if (/^m(asc)?/i.test(s) || s.toUpperCase() === 'M') return 'Masculino'
  if (/^f(em)?/i.test(s) || s.toUpperCase() === 'F') return 'Femenino'
  // fallback: capitalize first letter
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}

const formatDate = (timestamp) => {
  if (!timestamp) return 'No disponible'
  
  let date
  if (timestamp.toDate) {
    date = timestamp.toDate()
  } else {
    date = new Date(timestamp)
  }
  
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}


onMounted(async () => {
  await loadUsersAndMergePatients()
})


</script>

<style scoped>
/* Stacked user info styles */
.user-details {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.user-name {
  font-weight: 600;
  color: #111827;
  font-size: 0.95rem;
}
.user-secondary {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: #6b7280;
}
.user-ci {
  font-weight: 500;
}
.user-age {
  font-weight: 500;
}
.separator {
  color: #d1d5db;
}

/* Stacked contact styles */
.contact-stacked {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.contact-phone {
  font-weight: 600;
  color: #111827;
  font-size: 0.9rem;
}
.contact-email {
  font-size: 0.82rem;
  color: #6b7280;
}

/* Stacked responsible styles */
.responsible-stacked {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.responsible-name {
  font-weight: 600;
  color: #111827;
  font-size: 0.9rem;
}
.responsible-details {
  font-size: 0.82rem;
  color: #6b7280;
  font-weight: 500;
}
.responsible-email {
  font-size: 0.82rem;
  color: #6b7280;
}

.grid-header .cell.contact { max-width: 260px }
.grid-row .cell.contact { max-width: 260px; overflow: hidden; text-overflow: ellipsis; padding-left: 0.5rem }
.grid-header .cell.medical { max-width: 240px }
.grid-row .cell.medical { max-width: 240px }
.status-badge.inactive { background:#fee2e2; color:#991b1b }
.status-badge.active { background:#dcfce7; color:#065f46 }
.action-buttons { display:flex; gap:0.5rem; align-items:center }
.action-btn { width:36px; height:36px; display:inline-flex; align-items:center; justify-content:center; border-radius:8px; border:none }
.action-btn.view { background:#e6f4ff }
.action-btn.edit { background:#fff7ed }
.action-btn.delete { background:#fff1f2 }
.action-btn.restore { background:#ecfdf5 }
</style>

<style scoped>
/* --- styles moved from PatientManagement.vue --- */
.users-management {
  padding: 0;
}

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

.refresh-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.refresh-btn:hover:not(:disabled) {
  background: #2563eb;
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Enhanced Filters Section */
.filters-section-enhanced {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
  border: 1px solid #e2e8f0;
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f1f5f9;
}

.filters-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin: 0;
}

.filters-title svg {
  color: #3b82f6;
}

.filters-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-clear-filters {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.1rem;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.25);
}

.btn-clear-filters:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.35);
}

.results-count {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 600;
  padding: 0.5rem 1rem;
  background: #f1f5f9;
  border-radius: 20px;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-item.filter-search {
  grid-column: 1 / -1;
}

.filter-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #475569;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-label svg {
  color: #3b82f6;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.filter-input {
  width: 90%;
  padding: 0.85rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.9rem;
  transition: all 0.2s;
  background: #f8fafc;
}

.filter-input:focus {
  outline: none;
  border-color: #3b82f6;
  background: white;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.btn-clear-input {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: #f1f5f9;
  border: none;
  border-radius: 6px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  color: #64748b;
}

.btn-clear-input:hover {
  background: #ef4444;
  color: white;
}

.select-wrapper {
  position: relative;
  width: 100%;
}

.filter-select {
  width: 100%;
  padding: 0.85rem 2.5rem 0.85rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.9rem;
  background: #f8fafc;
  cursor: pointer;
  transition: all 0.2s;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.filter-select:focus {
  outline: none;
  border-color: #3b82f6;
  background: white;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.select-arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  pointer-events: none;
}

.sort-controls {
  display: flex;
  gap: 0.5rem;
}

.sort-controls .select-wrapper {
  flex: 1;
}

.btn-sort-order {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  border: none;
  padding: 0.85rem;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.2s;
  min-width: 48px;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.25);
}

.btn-sort-order:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.35);
}

.btn-sort-order.order-desc {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

/* Active Filters Tags */
.active-filters {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid #f1f5f9;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.active-filters-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  color: #1e40af;
  border-radius: 20px;
  font-size: 0.82rem;
  font-weight: 600;
  border: 1px solid #93c5fd;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.remove-tag {
  background: rgba(30, 64, 175, 0.15);
  border: none;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #1e40af;
  font-size: 1.1rem;
  line-height: 1;
  transition: all 0.2s;
  font-weight: bold;
}

.remove-tag:hover {
  background: #ef4444;
  color: white;
  transform: rotate(90deg);
}

.stats-bar {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 0.75rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: transform 0.2s;
}

.stat-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.8rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.loading-state, .error-state {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.retry-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 1rem;
}

.users-table {
  background: white;
  border-radius: 0.5rem;
  padding: 0.75rem;
  box-shadow: 0 6px 18px rgba(17,24,39,0.04);
  width: 100%;
  min-width: 1000px;
  /* Adjusted columns: make contact column wider so it sits closer to the user column */
  --grid-cols: minmax(280px, 1.4fr) minmax(240px, 1fr) minmax(110px, 0.6fr) 140px 120px 120px;
}

.grid-header,
.grid-row {
  display: grid;
  grid-template-columns: var(--grid-cols);
}

.grid-header {
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
}

.grid-header .cell {
  font-weight: 600;
  font-size: 0.875rem;
  padding: 1rem;
}

.grid-body {
  width: 100%;
}

.grid-row {
  border-bottom: 1px solid #f3f4f6;
  align-items: center;
}

.grid-row .cell {
  padding: 1rem;
}

.grid-row:hover {
  background: #f9fafb;
}

.cell.center {
  text-align: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
}

.user-details {
  display: flex;
  flex-direction: column;
  min-width: 0; /* allow truncation */
}

.user-name,
.user-id {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-name {
  font-weight: 500;
  color: #1f2937;
}

.user-id {
  font-size: 0.75rem;
  color: #9ca3af;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
  font-size: 0.85rem;
}

.contact-item span {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: #6b7280;
}

.role-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
  display: inline-block;
}

.role-badge.user {
  background: #dbeafe;
  color: #1e40af;
}

.role-badge.admin {
  background: #fed7aa;
  color: #c2410c;
}


.status-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-badge.active {
  background: #dcfce7;
  color: #166534;
}

.status-badge.inactive {
  background: #fee2e2;
  color: #dc2626;
}

.status-dot {
  width: 6px;
  height: 6px;
  background: currentColor;
  border-radius: 50%;
}

/* Ensure role, status and actions columns are centered */
.role-info,
.status-info,
.actions-info {
  text-align: center;
}

.action-buttons {
  display: flex;
  gap: 0.6rem;
  justify-content: center;
}

/* Stacked contact and responsible already defined above */

.cell.actions { display:flex; align-items:center; justify-content:center }
.action-buttons { justify-content:flex-end }

.action-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.action-btn.view {
  background: #e0f2fe;
  color: #0369a1;
}

.action-btn.view:hover {
  background: #bae6fd;
}

.action-btn.edit {
  background: #fef3c7;
  color: #d97706;
}

.action-btn.edit:hover {
  background: #fde68a;
}

.action-btn.delete {
  background: #fee2e2;
  color: #dc2626;
}

.action-btn.delete:hover {
  background: #fecaca;
}

.action-btn.restore {
  background: #ecfdf5;
  color: #166534;
}

.action-btn.restore:hover {
  background: #bbf7d0;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}

.empty-state svg {
  margin: 0 auto 1rem;
  color: #d1d5db;
}

.empty-state h3 {
  margin-bottom: 0.5rem;
  color: #374151;
}

@media (max-width: 900px) {
  .filters-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-item.filter-search {
    grid-column: 1;
  }
  
  .filters-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .filters-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .btn-clear-filters {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .users-management {
    padding: 0;
    margin: 0;
  }

  /* Reset all spacing to start from zero */
  .page-header {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
    margin: 0 0 1rem 0;
    padding: 0 0 1rem 0;
    border-bottom: 1px solid #e5e7eb;
  }

  .page-header .header-content {
    margin: 0;
    padding: 0;
  }

  .page-header .header-content h2 {
    margin: 0 0 0.25rem 0;
    font-size: 1.5rem;
  }

  .page-header .header-content p {
    margin: 0;
    font-size: 0.875rem;
  }
  
  .filters-section-enhanced {
    padding: 1rem;
  }
  
  .sort-controls {
    flex-direction: column;
  }
  
  .sort-controls .select-wrapper {
    width: 100%;
  }
  
  .btn-sort-order {
    width: 100%;
  }
  
  .active-filters {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-tags {
    width: 100%;
  }
  
  .filter-tag {
    flex: 0 0 auto;
  }
  
  .page-header .refresh-btn {
    width: 100%;
    justify-content: center;
    margin: 0;
    padding: 0.75rem;
  }

  /* Filters section - zero spacing */
  .filters-section {
    margin: 0 0 1rem 0;
    padding: 0;
  }
  
  .filter-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
    align-items: stretch;
    margin: 0;
    padding: 0;
  }

  .search-box {
    max-width: none;
    margin: 0;
    padding: 0;
  }

  .role-filter, .sort-select {
    width: 100%;
    padding: 0.75rem;
    font-size: 0.875rem;
    margin: 0;
  }
  
  .sort-btn {
    width: 100%;
    justify-content: center;
    padding: 0.75rem;
    margin: 0;
  }
  
  /* Stats bar - responsive grid */
  .stats-bar {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    text-align: center;
    padding: 0.75rem;
    margin: 0 0 1rem 0;
    border-radius: 0.375rem;
  }
  
  .stat-item {
    padding: 0.5rem;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
  
  .stat-label {
    font-size: 0.7rem;
  }
  
  /* Table container - zero spacing */
  .users-table {
    margin: 0;
    padding: 0;
    background: transparent;
    box-shadow: none;
    border-radius: 0;
  }

  .table-container {
    margin: 0;
    padding: 0;
    overflow-x: visible;
  }
  
  /* Hide desktop table structure */
  .data-grid {
    display: block;
    margin: 0;
    padding: 0;
  }
  
  .grid-header {
    display: none;
  }
  
  /* Mobile card design - zero base spacing */
  .grid-row {
    display: block;
    background: white;
    border-radius: 0.5rem;
    margin: 0 0 0.75rem 0;
    padding: 0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    overflow: hidden;
  }
  
  .grid-row:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
    transition: all 0.2s ease;
  }
  
  /* User header section - optimized for mobile */
  .grid-row .cell.user {
    background: linear-gradient(135deg, #f8fafc, #f1f5f9);
    padding: 0.875rem;
    border-bottom: 1px solid #e2e8f0;
    margin: 0;
  }
  
  .grid-row .cell.user .user-info {
    flex-direction: row;
    align-items: center;
    gap: 0.875rem;
  }
  
  .grid-row .cell.user .user-avatar {
    width: 44px;
    height: 44px;
    font-size: 0.95rem;
    background: linear-gradient(135deg, #3b82f6, #2563eb);
  }
  
  .grid-row .cell.user .user-details {
    flex: 1;
  }
  
  .grid-row .cell.user .user-name {
    font-size: 0.95rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 0.125rem 0;
    line-height: 1.25;
  }
  
  .grid-row .cell.user .user-id {
    font-size: 0.75rem;
    color: #64748b;
    margin: 0;
  }
  
  /* Other cells - tight spacing */
  .grid-row .cell:not(.user) {
    padding: 0.625rem 0.875rem;
    border-bottom: 1px solid #f1f5f9;
    margin: 0;
  }
  
  .grid-row .cell:last-child {
    border-bottom: none;
    padding-bottom: 0.875rem;
  }
  
  .grid-row .cell::before {
    content: attr(data-label);
    display: block;
    font-weight: 600;
    font-size: 0.7rem;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.025em;
    margin: 0 0 0.375rem 0;
  }
  
  .cell.user::before { content: none; }
  .cell.contact::before { content: "Información de Contacto"; }
  .cell.gender::before { content: "Género"; }
  .cell.date::before { content: "Fecha de Registro"; }
  .cell.status::before { content: "Estado"; }
  .cell.actions::before { content: "Acciones"; }
  
  /* Contact info styling - compact */
  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0;
  }
  
  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.825rem;
    padding: 0.375rem 0.5rem;
    background: #f8fafc;
    border-radius: 0.25rem;
    margin: 0;
  }
  
  .contact-item svg {
    color: #64748b;
    flex-shrink: 0;
    width: 14px;
    height: 14px;
  }
  
  /* Role and status badges - compact */
  .role-badge, .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.625rem;
    border-radius: 0.375rem;
    font-size: 0.8rem;
    font-weight: 500;
    margin: 0;
  }
  
  /* Action buttons - compact layout */
  .action-buttons {
    display: flex;
    justify-content: flex-start;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
  }
  
  .action-btn {
    width: auto;
    height: auto;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    font-size: 0.8rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.375rem;
    margin: 0;
  }
  
  .action-btn svg {
    width: 14px;
    height: 14px;
  }
  
  /* Date formatting - compact */
  .cell.date {
    font-size: 0.8rem;
    color: #374151;
    margin: 0;
  }

  /* Loading and error states - adjust for mobile */
  .loading-state, .error-state {
    text-align: center;
    padding: 2rem 1rem;
    margin: 0;
    color: #6b7280;
  }

  .empty-state {
    text-align: center;
    padding: 2rem 1rem;
    margin: 0;
    color: #6b7280;
  }
}

@media (max-width: 480px) {
  .stats-bar {
    flex-direction: column;
  }
  
  .stat-item {
    text-align: center;
    padding: 0.75rem;
  }
  
  .grid-row {
    padding: 0.75rem;
    margin-bottom: 0.75rem;
  }
  
  .user-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .action-buttons {
    flex-wrap: wrap;
  }
}
/* Modals */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
}

.modal {
  width: 100%;
  max-width: 560px;
  background: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f3f4f6;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.modal-close {
  border: none;
  background: transparent;
  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1;
}

.modal-body {
  padding: 1rem 1.25rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-top: 1px solid #f3f4f6;
}

.btn {
  padding: 0.5rem 0.875rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  cursor: pointer;
}

.btn.primary {
  background: #3b82f6;
  color: #fff;
  border-color: #3b82f6;
}

.btn.danger {
  background: #ef4444;
  color: #fff;
  border-color: #ef4444;
}

.btn.ghost {
  background: #fff;
}

.user-summary {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.avatar-large {
  width: 56px;
  height: 56px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  font-weight: 700;
}

.user-summary .info {
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: 0.75rem;
  row-gap: 0.375rem;
}

.user-summary .row .label {
  color: #6b7280;
  font-size: 0.875rem;
}

.user-summary .row .value {
  color: #111827;
  font-weight: 500;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  margin-bottom: 0.75rem;
}

.form-row.switch {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.form-row label {
  font-size: 0.875rem;
  color: #374151;
}

.form-row input,
.form-row select {
  padding: 0.625rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
}

/* Margins and spacing adjustments for User Details modal */
.user-details-modal .modal-header {
  padding: 1.5rem 2rem;
  margin: 0;
}

.user-details-modal .modal-body {
  padding: 2rem;
  margin: 0;
}

.user-details-modal .user-summary {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  margin: 0 0 1rem 0;
}

.user-details-modal .avatar-large {
  width: 64px;
  height: 64px;
  margin: 0;
  flex-shrink: 0;
}

.user-details-modal .user-summary .info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0;
  flex: 1;
}

.user-details-modal .user-summary .row {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin: 0 0 0.5rem 0;
  padding: 0;
}

.user-details-modal .user-summary .row:last-child {
  margin-bottom: 0;
}

.user-details-modal .user-summary .row .label {
  min-width: 120px;
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
}

.user-details-modal .user-summary .row .value {
  margin: 0;
  color: #111827;
  font-weight: 500;
  word-break: break-word;
  flex: 1;
}

.user-details-modal .modal-footer {
  padding: 1.5rem 2rem;
  margin: 0;
}

@media (max-width: 480px) {
  .modal {
    max-width: 96vw;
    margin: 1rem;
  }
  
  .user-details-modal .modal-header {
    padding: 1.25rem 1.5rem;
  }
  
  .user-details-modal .modal-body {
    padding: 1.5rem;
  }
  
  .user-details-modal .modal-footer {
    padding: 1.25rem 1.5rem;
  }
  
  .user-details-modal .user-summary {
    flex-direction: column;
    gap: 1rem;
    margin: 0 0 1rem 0;
  }
  
  .user-details-modal .user-summary .row .label {
    min-width: 100px;
  }
  
  .user-details-modal .user-summary .row {
    margin: 0 0 0.75rem 0;
  }
}
</style>