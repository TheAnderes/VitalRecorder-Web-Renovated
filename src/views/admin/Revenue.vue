<template>
  <AdminLayout>
    <div class="revenue-page">
      <!-- Header -->
      <div class="page-header">
        <div class="header-content">
          <h2>Ingresos</h2>
          <p>Gestión de ingresos por suscripciones y manillas</p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Cargando datos de ingresos...</p>
      </div>

      <!-- Content -->
      <div v-else class="revenue-content">
        <!-- Summary Cards -->
        <div class="summary-cards">
          <div class="summary-card">
            <div class="card-icon revenue">
              <i class="bi bi-currency-dollar"></i>
            </div>
            <div class="card-content">
              <h3>Bs. {{ totalRevenue.toFixed(2) }}</h3>
              <p>Ingresos Totales</p>
            </div>
          </div>

          <div class="summary-card">
            <div class="card-icon subscription">
              <i class="bi bi-star-fill"></i>
            </div>
            <div class="card-content">
              <h3>Bs. {{ subscriptionRevenue.toFixed(2) }}</h3>
              <p>Ingresos por Suscripciones</p>
            </div>
          </div>

          <div class="summary-card">
            <div class="card-icon bracelet">
              <i class="bi bi-watch"></i>
            </div>
            <div class="card-content">
              <h3>Bs. {{ braceletRevenue.toFixed(2) }}</h3>
              <p>Ingresos por Manillas</p>
            </div>
          </div>

          <div class="summary-card">
            <div class="card-icon caregivers">
              <i class="bi bi-people"></i>
            </div>
            <div class="card-content">
              <h3>{{ totalCaregivers }}</h3>
              <p>Cuidadores Totales</p>
            </div>
          </div>
        </div>

        <!-- Caregivers Revenue Table -->
        <div class="table-section">
          <div class="table-header">
            <h3>Ingresos por Cuidador</h3>
            <p>Detalle de suscripciones y manillas</p>
          </div>

          <div class="table-container">
            <table class="revenue-table">
              <thead>
                <tr>
                  <th>Cuidador</th>
                  <th>Email</th>
                  <th>Suscripción Actual</th>
                  <th>Estado Manilla</th>
                  <th>Ingreso Suscripción</th>
                  <th>Ingreso Manilla</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="caregiver in caregivers" :key="caregiver.id">
                  <td class="caregiver-name">
                    <div class="name-cell">
                      <div class="avatar">{{ getInitial(caregiver.name) }}</div>
                      <span>{{ caregiver.name }}</span>
                    </div>
                  </td>
                  <td class="email">{{ caregiver.email }}</td>
                  <td>
                    <span class="subscription-badge" :class="caregiver.subscriptionPlanId">
                      {{ caregiver.subscriptionName }}
                    </span>
                  </td>
                  <td>
                    <span class="status-badge" :class="{ paid: caregiver.braceletPaid, unpaid: !caregiver.braceletPaid }">
                      {{ caregiver.braceletPaid ? 'Pagada' : 'Pendiente' }}
                    </span>
                  </td>
                  <td class="amount">Bs. {{ caregiver.subscriptionAmount.toFixed(2) }}</td>
                  <td class="amount">Bs. {{ caregiver.braceletAmount.toFixed(2) }}</td>
                  <td class="amount total">Bs. {{ caregiver.totalAmount.toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/firebase'
import AdminLayout from '@/components/admin/AdminLayout.vue'

// Constants from mobile app
const BRACELET_PRICE = 140 // Bs per bracelet

const SUBSCRIPTION_PRICES = {
  'plan_1_person': 30,
  'plan_2_people': 54,
  'plan_3_people': 75,
  'free': 0
}

const SUBSCRIPTION_NAMES = {
  'plan_1_person': 'Plan Individual',
  'plan_2_people': 'Plan Duo',
  'plan_3_people': 'Plan Familiar',
  'free': 'Plan Gratuito'
}

// State
const loading = ref(true)
const caregivers = ref([])

// Computed
const totalCaregivers = computed(() => caregivers.value.length)

const subscriptionRevenue = computed(() => {
  return caregivers.value.reduce((sum, c) => sum + c.subscriptionAmount, 0)
})

const braceletRevenue = computed(() => {
  return caregivers.value.reduce((sum, c) => sum + c.braceletAmount, 0)
})

const totalRevenue = computed(() => subscriptionRevenue.value + braceletRevenue.value)

// Methods
const getInitial = (name) => {
  return name ? name.charAt(0).toUpperCase() : 'C'
}

const loadRevenue = async () => {
  try {
    loading.value = true

    // Get all users with 'cuidador' role
    const usersQuery = query(
      collection(db, 'users'),
      where('role', '==', 'cuidador')
    )
    const usersSnapshot = await getDocs(usersQuery)

    const caregiverData = []

    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data()
      
      // Get subscription data
      const subscription = userData.subscription || {}
      const planId = subscription.plan_id || 'free'
      const subscriptionName = SUBSCRIPTION_NAMES[planId] || 'Plan Gratuito'
      const subscriptionAmount = SUBSCRIPTION_PRICES[planId] || 0

      // Force all caregivers to have their bracelet (default for now)
      const braceletPaid = true
      const braceletAmount = BRACELET_PRICE

      caregiverData.push({
        id: userDoc.id,
        name: userData.persona?.nombres || userData.displayName || userData.email?.split('@')[0] || 'Usuario',
        email: userData.email || 'Sin email',
        subscriptionName,
        subscriptionPlanId: planId,
        subscriptionAmount,
        braceletPaid,
        braceletAmount,
        totalAmount: subscriptionAmount + braceletAmount
      })
    }

    // Sort by total amount descending
    caregivers.value = caregiverData.sort((a, b) => b.totalAmount - a.totalAmount)

  } catch (error) {
    console.error('Error loading revenue data:', error)
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadRevenue()
})
</script>

<style scoped>
.revenue-page {
  padding: 0;
}

/* Header */
.page-header {
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.summary-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.card-icon.revenue {
  background: #dcfce7;
  color: #16a34a;
}

.card-icon.subscription {
  background: #dbeafe;
  color: #2563eb;
}

.card-icon.bracelet {
  background: #fef3c7;
  color: #f59e0b;
}

.card-icon.caregivers {
  background: #f3e8ff;
  color: #9333ea;
}

.card-content h3 {
  margin: 0;
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
}

.card-content p {
  margin: 0.25rem 0 0 0;
  color: #6b7280;
  font-size: 0.875rem;
}

/* Table Section */
.table-section {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header {
  margin-bottom: 1.5rem;
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

.table-container {
  overflow-x: auto;
}

.revenue-table {
  width: 100%;
  border-collapse: collapse;
}

.revenue-table thead tr {
  border-bottom: 2px solid #e5e7eb;
}

.revenue-table th {
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.revenue-table tbody tr {
  border-bottom: 1px solid #f3f4f6;
  transition: background-color 0.2s;
}

.revenue-table tbody tr:hover {
  background-color: #f9fafb;
}

.revenue-table td {
  padding: 1rem;
  font-size: 0.875rem;
  color: #374151;
}

.name-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e5e7eb;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
}

.email {
  color: #6b7280;
  font-size: 0.813rem;
}

.subscription-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.subscription-badge.free {
  background: #f3f4f6;
  color: #6b7280;
}

.subscription-badge.plan_1_person {
  background: #dbeafe;
  color: #1e40af;
}

.subscription-badge.plan_2_people {
  background: #fef3c7;
  color: #92400e;
}

.subscription-badge.plan_3_people {
  background: #f3e8ff;
  color: #6b21a8;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-badge.paid {
  background: #dcfce7;
  color: #166534;
}

.status-badge.unpaid {
  background: #fee2e2;
  color: #991b1b;
}

.amount {
  font-weight: 500;
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.amount.total {
  font-weight: 700;
  color: #16a34a;
  font-size: 0.938rem;
}
</style>
