import { ref } from 'vue'

// Estado de carga global con soporte para duración mínima
const state = ref({
  loading: false,
  startedAt: 0,
  minDuration: 1000, // ms
  hideTimer: null
})

export function useLoading() {
  const loading = { get value() { return state.value.loading }, set value(v) { state.value.loading = v } }

  const setMinDuration = (ms) => {
    const n = Number(ms)
    if (!isNaN(n) && isFinite(n)) state.value.minDuration = Math.max(0, Math.floor(n))
  }

  const show = (minMs) => {
    if (minMs != null) setMinDuration(minMs)
    // cancelar cualquier hide pendiente
    if (state.value.hideTimer) {
      clearTimeout(state.value.hideTimer)
      state.value.hideTimer = null
    }
    state.value.startedAt = Date.now()
    state.value.loading = true
  }

  const hide = () => {
    const started = state.value.startedAt || 0
    const elapsed = Date.now() - started
    const remaining = Math.max(0, state.value.minDuration - elapsed)

    if (state.value.hideTimer) {
      clearTimeout(state.value.hideTimer)
      state.value.hideTimer = null
    }

    if (remaining <= 16) {
      // Ocultar inmediatamente si ya cumplió el tiempo (16ms margen)
      state.value.loading = false
      state.value.startedAt = 0
    } else {
      // Programar ocultación restante
      state.value.hideTimer = setTimeout(() => {
        state.value.loading = false
        state.value.hideTimer = null
        state.value.startedAt = 0
      }, remaining)
    }
  }

  const setLoading = (val) => { if (val) show() ; else hide() }

  return {
    loading,
    setLoading,
    show,
    hide,
    setMinDuration
  }
}

export default useLoading
