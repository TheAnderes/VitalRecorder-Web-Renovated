import { ref, computed } from 'vue'
import { userService } from '@/services/userService'
import { placeholderUsers } from '@/data/placeholderUsers'

// Store dedicado a la administración de pacientes (composable)
// Nota: esta store gestiona la entidad mostrada en el panel de 'Registro y Administración'
// en la UI; las etiquetas visibles ahora se muestran como "Cuidadores".
const state = ref({
  patients: [],
  stats: {
    totalPatients: 0,
    activePatients: 0,
    criticalPatients: 0,
    avgAge: null
  },
  loading: false,
  error: null,
  selectedPatient: null,
  filters: {
    search: '',
    dni: '',
    medicalStatus: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  }
})

export function useAdminPatientStore() {
  // Getters
  const patients = computed(() => state.value.patients)
  const stats = computed(() => state.value.stats)
  const loading = computed(() => state.value.loading)
  const error = computed(() => state.value.error)
  const selectedPatient = computed(() => state.value.selectedPatient)
  const filters = computed(() => state.value.filters)

  const filteredPatients = computed(() => {
    let list = [...(state.value.patients || [])]

    // Search by name/email/phone
    if (state.value.filters.search) {
      const q = state.value.filters.search.toLowerCase()
      list = list.filter(p => (
        (p.persona?.nombres || '').toString().toLowerCase().includes(q) ||
        (p.persona?.apellidos || '').toString().toLowerCase().includes(q) ||
        (p.email || '').toString().toLowerCase().includes(q) ||
        (p.telefono || '').toString().toLowerCase().includes(q)
      ))
    }

    // DNI filter
    if (state.value.filters.dni) {
      const q = state.value.filters.dni.toString()
      list = list.filter(p => p.dni && p.dni.toString().includes(q))
    }

    // Medical status filter
    if (state.value.filters.medicalStatus && state.value.filters.medicalStatus !== 'all') {
      list = list.filter(p => (p.medicalStatus || (p.isActive ? 'Activo' : 'Inactivo')) === state.value.filters.medicalStatus)
    }

    // Sorting
    const key = state.value.filters.sortBy
    const order = state.value.filters.sortOrder || 'desc'
    list.sort((a, b) => {
      let aV = a[key]
      let bV = b[key]

      if (key === 'createdAt') {
        aV = aV && aV.toDate ? aV.toDate() : (aV ? new Date(aV) : 0)
        bV = bV && bV.toDate ? bV.toDate() : (bV ? new Date(bV) : 0)
      }

      if (key === 'nombres') {
        aV = a.persona?.nombres || ''
        bV = b.persona?.nombres || ''
      }

      if (aV == null && bV == null) return 0
      if (aV == null) return order === 'asc' ? -1 : 1
      if (bV == null) return order === 'asc' ? 1 : -1

      if (aV > bV) return order === 'asc' ? 1 : -1
      if (aV < bV) return order === 'asc' ? -1 : 1
      return 0
    })

    return list
  })

  // Helpers
  const persistLocal = () => {
    try {
      if (import.meta.env.DEV || !navigator.onLine) {
        localStorage.setItem('vr_patients', JSON.stringify(state.value.patients))
      }
    } catch (e) {
      // ignore
    }
  }

  const normalize = (doc) => {
    if (!doc) return doc
    const c = { ...doc }
    if (c.createdAt && c.createdAt.toDate) c.createdAt = c.createdAt.toDate()
    return c
  }

  // CRUD + fetch
  const fetchPatients = async () => {
    try {
      state.value.loading = true
      state.value.error = null

      if (navigator.onLine && !import.meta.env.DEV) {
        try {
          const list = await userService.getAllUsers()
          state.value.patients = (list || []).map(normalize)
          persistLocal()
          await computeStats()
          return state.value.patients
        } catch (err) {
          console.warn('userService.getAllUsers failed, falling back to local/placeholder', err)
        }
      }

      // fallback: try localStorage then placeholder
      try {
        const raw = localStorage.getItem('vr_patients')
        if (raw) {
          state.value.patients = JSON.parse(raw)
          await computeStats()
          return state.value.patients
        }
      } catch (e) {
        // ignore parse errors
      }

      state.value.patients = [...placeholderUsers]
      await computeStats()
      return state.value.patients
    } catch (err) {
      console.error('fetchPatients error', err)
      state.value.error = err?.message || 'Error cargando cuidadores'
      state.value.patients = [...placeholderUsers]
      return state.value.patients
    } finally {
      state.value.loading = false
    }
  }

  const addPatient = async (data) => {
    try {
      if (navigator.onLine && !import.meta.env.DEV) {
          const created = await userService.createUser(data)
          // userService.createUser returns object with id and fields
          const normalized = normalize(created ? created : { id: created.id, ...data })
          state.value.patients = [normalized, ...state.value.patients]
          persistLocal()
          await computeStats()
          return normalized
        }

      // fallback local
      const id = `p_${String(Math.floor(Math.random() * 100000)).padStart(3, '0')}`
      const now = new Date()
      const newItem = { id, createdAt: now, ...data }
      state.value.patients = [newItem, ...state.value.patients]
      persistLocal()
      await computeStats()
      return newItem
    } catch (err) {
      console.error('addPatient error', err)
      throw err
    }
  }

  const updatePatient = async (id, updates) => {
    try {
      if (navigator.onLine && !import.meta.env.DEV) {
          await userService.updateUser(id, updates)
          state.value.patients = state.value.patients.map(p => p.id === id ? { ...p, ...updates } : p)
          persistLocal()
          await computeStats()
          return
        }

      // fallback
      state.value.patients = state.value.patients.map(p => p.id === id ? { ...p, ...updates } : p)
      persistLocal()
      await computeStats()
    } catch (err) {
      console.error('updatePatient error', err)
      throw err
    }
  }

  const deletePatient = async (id) => {
    try {
      if (navigator.onLine && !import.meta.env.DEV) {
          await userService.deleteUser(id)
          state.value.patients = state.value.patients.filter(p => p.id !== id)
          persistLocal()
          await computeStats()
          return
        }

      // fallback
      state.value.patients = state.value.patients.filter(p => p.id !== id)
      persistLocal()
      await computeStats()
    } catch (err) {
      console.error('deletePatient error', err)
      throw err
    }
  }

  const selectPatient = async (id) => {
    try {
      state.value.loading = true
      state.value.error = null
      if (navigator.onLine && !import.meta.env.DEV) {
        const doc = await userService.getUserById(id)
        state.value.selectedPatient = normalize(doc)
        return state.value.selectedPatient
      }
      state.value.selectedPatient = state.value.patients.find(p => p.id === id) || null
      return state.value.selectedPatient
    } catch (err) {
      console.error('selectPatient error', err)
      state.value.error = err?.message || 'Error cargando cuidador'
    } finally {
      state.value.loading = false
    }
  }

  const clearSelected = () => { state.value.selectedPatient = null }

  const updateFilters = (newFilters) => { state.value.filters = { ...state.value.filters, ...newFilters } }

  const computeStats = async () => {
    try {
      const list = state.value.patients || []
      const total = list.length
      const active = list.filter(p => p.isActive !== false).length
      const critical = list.filter(p => (p.medicalStatus || (p.isActive ? 'Activo' : 'Inactivo')) === 'Crítico').length

      // average age when fechaNacimiento is available
      const ages = list.map(p => {
        if (!p.fechaNacimiento) return null
        const b = new Date(p.fechaNacimiento)
        if (!b || isNaN(b.getTime())) return null
        const now = new Date()
        let years = now.getFullYear() - b.getFullYear()
        const m = now.getMonth() - b.getMonth()
        if (m < 0 || (m === 0 && now.getDate() < b.getDate())) years--
        return years
      }).filter(a => a != null)
      const avgAge = ages.length ? Math.round(ages.reduce((s, v) => s + v, 0) / ages.length) : null

      state.value.stats = { totalPatients: total, activePatients: active, criticalPatients: critical, avgAge }
    } catch (err) {
      console.error('computeStats error', err)
    }
  }

  const refreshData = async () => {
    await Promise.all([fetchPatients(), computeStats()])
  }

  return {
    // state
    patients,
    stats,
    loading,
    error,
    selectedPatient,
    filters,
    filteredPatients,
    // actions
    fetchPatients,
    addPatient,
    updatePatient,
    deletePatient,
    selectPatient,
    clearSelected,
    updateFilters,
    computeStats,
    refreshData
  }
}
