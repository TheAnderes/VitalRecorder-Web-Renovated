<template>
    <div class="product-one-grid-box">
        {{ text }}
    </div>
</template>

<script>
export default {
  name: "InformaciónProductCard",
  props: {
    
    text:  { type: String, required: true }// URL a redirigir
  }
}
</script>

<style scoped>
.product-one-grid-box
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
  border-radius: 20px;
  box-sizing: border-box;
  padding: 25px;
  color: #666666;
  box-shadow: 6px 8px 10px rgba(68, 129, 235, 0.5);
}
</style>
