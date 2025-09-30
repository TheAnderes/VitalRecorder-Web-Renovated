<template>
  <BaseCard class="for-who-card">
      <div class="product-forwho-title">{{ title }}</div>
      <img v-if="icon" :src="icon" alt="" class="product-forwho-icon-mask"/>
  </BaseCard>
</template>

<script>
import BaseCard from './BaseCard.vue';

export default {
  name: "ForWhoCard",
  components: { BaseCard },
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true }, // aquí va la dirección del SVG-- tambien puedes eliminar el icon y solo poner el texto se acomodara solo al medio
  },
};
</script>

<style scoped>
.for-who-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  text-align:center;
  box-shadow: 7px 7px 7px rgba(68, 129, 235, 0.4); /* Override BaseCard's shadow */
  width: 210px;
  height: 170px;
}
.product-forwho-icon-mask{
  width: 90px;
  height: 90px;
  display: inline-block;
  margin-bottom: .25rem;
}
.product-forwho-title {
    font-family: var(--tipografia);
  margin: 0;
  font-weight:600;
  width: 191px;
  color:#0f2147;
  font-size: 18px;
  margin-bottom: 9px;
  margin-top: 8px;
}
/* ===== MOBILE ONLY (≤768px) ===== */
@media (max-width: 768px) {
  .for-who-card {
    width: 100%;            /* ocupa todo el ancho del contenedor */
    max-width: 300px;       /* límite para que no crezca demasiado */
    height: auto;           /* se adapta al contenido */
    padding: 16px;
    border-radius: 14px; /* Override BaseCard's border-radius */
  }

  .product-forwho-icon-mask {
    width: 72px;
    height: 72px;
    margin-bottom: 8px;
  }

  .product-forwho-title {
    width: 100%;            /* ya no forzamos 191px */
    font-size: clamp(0.95rem, 4.5vw, 1.05rem);
    margin: 6px 0 4px;
  }
}

/* ===== EXTRA PEQUEÑO (≤480px) ===== */
@media (max-width: 480px) {
  .for-who-card {
    max-width: 100%;
    padding: 12px;
    border-radius: 12px; /* Override BaseCard's border-radius */
  }

  .product-forwho-icon-mask {
    width: 60px;
    height: 60px;
  }

  .product-forwho-title {
    font-size: clamp(0.9rem, 4vw, 1rem);
  }
}

</style>
