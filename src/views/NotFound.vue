<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h1 class="error-title">Página no encontrada</h1>
      <p class="error-description">
        Lo sentimos, la página que estás buscando no existe.
      </p>
      <div class="error-actions">
        <button @click="goHome" class="btn-primary">
          Volver al inicio
        </button>
        <button @click="goBack" class="btn-secondary">
          Volver atrás
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
.not-found-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 100%);
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
}

.not-found-content {
  text-align: center;
  max-width: 500px;
}

.error-code {
  font-size: 8rem;
  font-weight: 900;
  color: #1f2b6c;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.error-title {
  font-size: 2rem;
  color: #1f2b6c;
  margin-bottom: 1rem;
  font-weight: 600;
}

.error-description {
  font-size: 1.1rem;
  color: #6b7280;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary, .btn-secondary {
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  font-size: 1rem;
}

.btn-primary {
  background: linear-gradient(135deg, #2dd4bf, #06b6d4);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(45, 212, 191, 0.3);
}

.btn-secondary {
  background: transparent;
  color: #1f2b6c;
  border: 2px solid #1f2b6c;
}

.btn-secondary:hover {
  background: #1f2b6c;
  color: white;
  transform: translateY(-2px);
}
</style>
