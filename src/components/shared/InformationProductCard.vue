<template>
    <BaseCard class="information-product-card">
        {{ text }}
    </BaseCard>
</template>

<script>
import BaseCard from './BaseCard.vue';

export default {
  name: "InformaciónProductCard",
  components: { BaseCard },
  props: {
    
    text:  { type: String, required: true }// URL a redirigir
  }
};
</script>

<style scoped>
.information-product-card
{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 450px;
  height: 250px;
  font-family: var(--tipografia);
  font-weight: var(--regular);
  font-size: 25px;
  text-align: center;
  padding: 25px;
  color: #666666;
  box-shadow: 6px 8px 10px rgba(68, 129, 235, 0.5); /* Override BaseCard's shadow */
}
/* Mobile only (≤768px) */
@media (max-width: 768px) {
  .information-product-card {
    width: 100%;
    height: auto;
    padding: 16px;
    font-size: clamp(0.95rem, 4.5vw, 1.05rem);
    border-radius: 16px; /* Override BaseCard's border-radius */
    box-shadow: 4px 6px 10px rgba(68,129,235,0.35); /* Override BaseCard's shadow */
  }
}

/* Muy pequeño (≤380px) */
@media (max-width: 380px) {
  .information-product-card {
    padding: 12px;
    border-radius: 12px; /* Override BaseCard's border-radius */
  }
}
</style>
