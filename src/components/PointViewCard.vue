<template>
<article class="product-metric-card">
    <img :src="icon" alt="" class="product-metric-icon"/>
    <div class="product-metric-value">{{ valuer }}</div>
    <div class="product-metric-label">{{ Text }}</div>
    </article>
</template>

<script>
export default {
  name: "PointViewCard",
  props: {
    valuer: { type: String, required: true },
    icon: { type: String, required: true },
    Text:{type: String, required: true}, // aquí va la dirección del SVG
  },
};
</script>

<style scoped>
/* Usa tus estilos existentes de la card. Solo añadimos la “caja” del icono */
.product-metric-card {
    width: 260px;
    height: 220px;
  background: #fff;
  border-radius: 18px;
  padding: 1rem;
  text-align: center;
  box-shadow: 7px 7px 7px rgba(68, 129, 235, 0.4);
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
  .product-metric-card {
    width: 100%;           /* fluido */
    max-width: 320px;      /* límite cómodo en móvil */
    height: auto;          /* sin alto fijo */
    padding: 14px;
    border-radius: 16px;
    box-shadow: 4px 6px 12px rgba(68,129,235,.28);
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
  .product-metric-card {
    padding: 12px;
    border-radius: 12px;
  }
  .product-metric-icon {
    width: 60px;
    height: 60px;
  }
}
</style>
