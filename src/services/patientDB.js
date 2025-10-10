// Simple patient "database" service
// - Seeds from src/data/placeholderUsers.js when localStorage is empty
// - Persists to localStorage key `vr_users`
// - Exposes synchronous helpers: list, get, add, update, toggleActive, remove, import/export

import seedUsers from '@/data/placeholderUsers'

const STORAGE_KEY = 'vr_users'

function nowISO() { return new Date().toISOString() }

function generateId() {
  return `p-${Date.now()}-${Math.floor(Math.random()*9000+1000)}`
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr : null
  } catch (e) {
    console.warn('patientDB: error parsing storage', e)
    return null
  }
}

function saveToStorage(arr) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr))
    return true
  } catch (e) {
    console.error('patientDB: error saving to storage', e)
    return false
  }
}

function seedIfNeeded() {
  let list = loadFromStorage()
  if (!list) {
    // clone seedUsers and ensure createdAt and id exist
    list = (seedUsers || []).map(u => ({ ...u }))
    list = list.map(u => ({
      ...u,
      id: u.id || generateId(),
      createdAt: u.createdAt || nowISO()
    }))
    saveToStorage(list)
  }
  return list
}

// Public API
const patientDB = {
  list() {
    return seedIfNeeded()
  },

  get(id) {
    const list = seedIfNeeded()
    return list.find(u => u.id === id) || null
  },

  add(payload) {
    const list = seedIfNeeded()
    const p = { ...payload }
    p.id = p.id || generateId()
    p.createdAt = p.createdAt || nowISO()
    list.unshift(p)
    saveToStorage(list)
    return p
  },

  update(id, patch) {
    const list = seedIfNeeded()
    const idx = list.findIndex(u => u.id === id)
    if (idx === -1) return null
    const updated = { ...list[idx], ...patch }
    // preserve createdAt if patch doesn't include it
    if (!updated.createdAt) updated.createdAt = list[idx].createdAt || nowISO()
    list[idx] = updated
    saveToStorage(list)
    return updated
  },

  toggleActive(id) {
    const list = seedIfNeeded()
    const idx = list.findIndex(u => u.id === id)
    if (idx === -1) return null
    list[idx].isActive = !list[idx].isActive
    saveToStorage(list)
    return list[idx]
  },

  remove(id) {
    let list = seedIfNeeded()
    const before = list.length
    list = list.filter(u => u.id !== id)
    if (list.length === before) return false
    saveToStorage(list)
    return true
  },

  importFromArray(arr) {
    if (!Array.isArray(arr)) throw new Error('import expects an array')
    const normalized = arr.map(u => ({ ...u, id: u.id || generateId(), createdAt: u.createdAt || nowISO() }))
    saveToStorage(normalized)
    return normalized
  },

  exportJson() {
    const list = seedIfNeeded()
    return JSON.stringify(list, null, 2)
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY)
  }
}

export default patientDB
