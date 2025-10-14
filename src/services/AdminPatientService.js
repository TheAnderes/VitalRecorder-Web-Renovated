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
  const ref = await addDoc(collection(db, COLLECTION), data)
  return ref.id
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