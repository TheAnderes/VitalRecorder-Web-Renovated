<template>
  <article class="product-forwho-card">
      <div class="product-forwho-title">{{ title }}</div>
      <img v-if="icon" :src="icon" alt="" class="product-forwho-icon-mask"/>
  </article>
</template>

<script>
export default {
  name: "ForWhoCard",
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true }, // aquí va la dirección del SVG-- tambien puedes eliminar el icon y solo poner el texto se acomodara solo al medio
  },
};
</script>

<style scoped>
/* Usa tus estilos existentes de la card. Solo añadimos la “caja” del icono */
.product-forwho-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  background: #ffffff;
  border-radius: 16px;
  text-align:center;
  box-shadow: 0 10px 22px rgba(15,33,71,.12);
  width: 200px;
  height: 195px;
}
.product-forwho-icon-mask{
  width: 109px;
  height: 109px;
  display: inline-block;
  margin-bottom: .25rem;
}
.product-forwho-title {
    font-family: var(--tipografia);
  margin: 0;
  font-weight:600;
  width: 191px;
  color:#0f2147;
  font-size: 20px;
  margin-bottom: 9px;
  margin-top: 8px;
}
</style>
