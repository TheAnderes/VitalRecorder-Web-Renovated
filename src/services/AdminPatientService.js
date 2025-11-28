// src/services/patients.service.js
import {   collection, 
  getDocs, 
  query, 
  orderBy, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  serverTimestamp,
  where } from 'firebase/firestore'
import { db } from '@/firebase'

const COLLECTION = 'patients'

export async function listPatients() {
  const snap = await getDocs(collection(db, COLLECTION))
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function getPatient(id) {
  const docRef = doc(db, COLLECTION, id)
  const snap = await getDoc(docRef)
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export async function createPatient(data) {
  try {
    console.log("🔥 [AdminPatientService] Creando paciente en Firestore...", data)
    // Clean data to remove undefined fields (Firestore rejects undefined)
    const clean = (obj) => {
      if (obj === null || obj === undefined) return obj
      if (Array.isArray(obj)) return obj.map(v => (v && typeof v === 'object') ? clean(v) : v).filter(v => v !== undefined)
      if (typeof obj === 'object') {
        const out = {}
        Object.keys(obj).forEach(k => {
          const val = obj[k]
          if (val === undefined) return
          if (val && typeof val === 'object') {
            const c = clean(val)
            if (c !== undefined && !(typeof c === 'object' && Object.keys(c).length === 0 && !Array.isArray(c))) {
              out[k] = c
            }
          } else {
            out[k] = val
          }
        })
        return out
      }
      return obj
    }

    const payload = clean(data) || {}
    const ref = await addDoc(collection(db, COLLECTION), {
      ...payload,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    console.log("✅ [AdminPatientService] Documento creado con ID:", ref.id)
    return ref.id
  } catch (error) {
    console.error("❌ [AdminPatientService] Error creando paciente:", error)
    console.error("Código de error:", error.code)
    console.error("Mensaje:", error.message)
    throw error
  }
}

export async function updatePatient(id, updates) {
  // Remove undefined fields recursively because Firestore rejects undefined
  const clean = (obj) => {
    if (obj === null || obj === undefined) return obj
    if (Array.isArray(obj)) return obj.map(v => (v && typeof v === 'object') ? clean(v) : v).filter(v => v !== undefined)
    if (typeof obj === 'object') {
      const out = {}
      Object.keys(obj).forEach(k => {
        const val = obj[k]
        if (val === undefined) return
        if (val && typeof val === 'object') {
          const c = clean(val)
          // Only set if not undefined/null/empty object/empty array
          if (c !== undefined && !(typeof c === 'object' && Object.keys(c).length === 0 && !Array.isArray(c))) {
            out[k] = c
          }
        } else {
          out[k] = val
        }
      })
      return out
    }
    return obj
  }

  const sanitized = clean(updates)
  await updateDoc(doc(db, COLLECTION, id), sanitized)
}

export async function setPatient(id, data) {
  try {
    // Clean data to remove undefined fields
    const clean = (obj) => {
      if (obj === null || obj === undefined) return obj
      if (Array.isArray(obj)) return obj.map(v => (v && typeof v === 'object') ? clean(v) : v).filter(v => v !== undefined)
      if (typeof obj === 'object') {
        const out = {}
        Object.keys(obj).forEach(k => {
          const val = obj[k]
          if (val === undefined) return
          if (val && typeof val === 'object') {
            const c = clean(val)
            if (c !== undefined && !(typeof c === 'object' && Object.keys(c).length === 0 && !Array.isArray(c))) {
              out[k] = c
            }
          } else {
            out[k] = val
          }
        })
        return out
      }
      return obj
    }

    const payload = clean(data) || {}
    // Use setDoc to overwrite the document
    await setDoc(doc(db, COLLECTION, id), {
      ...payload,
      updatedAt: serverTimestamp()
    })
  } catch (error) {
    console.error('❌ [AdminPatientService] Error sobrescribiendo paciente:', error)
    throw error
  }
}

export async function deletePatient(id) {
  await deleteDoc(doc(db, COLLECTION, id))
}

// Export default para importar todo
export default {
  list: listPatients,
  get: getPatient,
  create: createPatient,
  update: updatePatient,
  set: setPatient,
  delete: deletePatient
}