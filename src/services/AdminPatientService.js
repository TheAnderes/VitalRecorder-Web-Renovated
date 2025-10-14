// src/services/patients.service.js
import {   collection, 
  getDocs, 
  query, 
  orderBy, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
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
    const ref = await addDoc(collection(db, COLLECTION), {
      ...data,
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
  await updateDoc(doc(db, COLLECTION, id), updates)
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
  delete: deletePatient
}