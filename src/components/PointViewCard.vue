<template>
<BaseCard class="point-view-card">
    <img :src="icon" alt="" class="product-metric-icon"/>
    <div class="product-metric-value">{{ valuer }}</div>
    <div class="product-metric-label">{{ Text }}</div>
</BaseCard>
</template>

<script>
import BaseCard from './BaseCard.vue';

export default {
  name: "PointViewCard",
  components: { BaseCard },
  props: {
    valuer: { type: String, required: true },
    icon: { type: String, required: true },
    Text:{type: String, required: true}, // aquí va la dirección del SVG
  },
};
</script>

<style scoped>
/* Usa tus estilos existentes de la card. Solo añadimos la “caja” del icono */
.point-view-card {
    width: 260px;
    height: 220px;
  padding: 1rem;
  text-align: center;
  box-shadow: 7px 7px 7px rgba(68, 129, 235, 0.4); /* Override BaseCard's shadow */
  box-sizing: border-box;
  
}
.product-metric-icon {
  width: 110px;
  height: 110px;
  display: inline-block;
  margin-bottom: .25rem;
}
.product-metric-value {
  font-size: 40px;
  font-family: var(--tipografia);
  font-weight: var(--semibold);
  color: #0f2147;
  line-height: 1.1;
}
.product-metric-label {
  color: #5b6575;
  font-weight: var(--regular);
  font-size: 20px;
  font-family: var(--tipografia);
}
@media (max-width: 768px) {
  .point-view-card {
    width: 100%;           /* fluido */
    max-width: 320px;      /* límite cómodo en móvil */
    height: auto;          /* sin alto fijo */
    padding: 14px;
    border-radius: 16px; /* Override BaseCard's border-radius */
    box-shadow: 4px 6px 12px rgba(68,129,235,.28); /* Override BaseCard's shadow */
  }

  .product-metric-icon {
    width: clamp(64px, 26vw, 88px);
    height: clamp(64px, 26vw, 88px);
    margin-bottom: 8px;
  }

  .product-metric-value {
    font-size: clamp(1.4rem, 7vw, 2rem);
    line-height: 1.15;
  }

  .product-metric-label {
    font-size: clamp(0.95rem, 4.3vw, 1.05rem);
  }
}

/* ===== EXTRA PEQUEÑO (≤480px) ===== */
@media (max-width: 480px) {
  .point-view-card {
    padding: 12px;
    border-radius: 12px; /* Override BaseCard's border-radius */
  }
  .product-metric-icon {
    width: 60px;
    height: 60px;
  }
}
</style>
