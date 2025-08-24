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
    width: 190px;
    height: 180px;
  background: #fff;
  border-radius: 18px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 12px 26px rgba(15,33,71,.16);
  box-sizing: border-box;
  
}
.product-metric-icon {
  width: 80px;
  height: 80px;
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
</style>
