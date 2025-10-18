<template>
  <footer class="admin-footer">
    <div class="footer-content">
      <div class="footer-left">
        <span class="footer-brand">VitalSystems Admin</span>
        <span class="footer-copyright">© {{ currentYear }} VitalSystems. Todos los derechos reservados.</span>
      </div>
      <div class="footer-right">
        <a href="mailto:contacto@vitalsystems.com" class="footer-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2" />
            <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Soporte
        </a>
        <span class="footer-version">v1.0.0</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.admin-footer {
  background: white;
  border-top: 1px solid #e5e7eb;
  padding: 1.5rem 2rem;
  margin-top: auto;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.footer-left {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.footer-brand {
  font-weight: 600;
  font-size: 0.875rem;
  color: #1f2937;
}

.footer-copyright {
  font-size: 0.75rem;
  color: #6b7280;
}

.footer-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #2563eb;
  text-decoration: none;
}

.footer-link svg {
  color: currentColor;
}

.footer-version {
  font-size: 0.75rem;
  color: #9ca3af;
  padding: 0.25rem 0.5rem;
  background: #f3f4f6;
  border-radius: 0.25rem;
}

@media (max-width: 768px) {
  .admin-footer {
    padding: 1rem;
  }
  
  .footer-content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .footer-right {
    width: 100%;
    justify-content: space-between;
  }
}

@media (max-width: 480px) {
  .footer-right {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
}
</style>
