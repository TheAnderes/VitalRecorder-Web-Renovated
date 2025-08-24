<template>
  <article class="product-feature-card">
    
    <h3 class="product-feature-title">{{ title }}</h3>
    <img :src="icon" alt="" class="product-feature-icon" />
    <p class="product-feature-text">{{ text }}</p>
  </article>
</template>

<script>
export default {
  name: "CharacteristicCard",
  props: {
    icon: { type: String, required: true }, // aquí va la dirección del SVG
    title: { type: String, required: true },
    text: { type: String, required: true },
  },
};
</script>

<style scoped>
.product-feature-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  text-align: center;
  width: 220px;
  box-sizing: border-box;
  box-shadow: 7px 7px 2px rgba(0, 0, 0, 0.4);
  border-radius: 35px;
  row-gap: 10px;
  padding: 10px 0;
}
.product-feature-icon {
  width: 100px;   /* ajusta el tamaño del ícono */
  height: 100px;
  margin-bottom: .5rem;
}
.product-feature-title {
  font-size: 20px;
  font-family: var(--tipografia);
  font-weight:semibold;
  margin: .15rem 0 .25rem;
  color: #0f2147;
}
.product-feature-text {
  color: #5b6575;
  font-size: 18px;
    font-family: var(--tipografia);
    font-weight: var(--regular);
    margin: 0;
    width: 180px;
}
</style>
