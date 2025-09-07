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
/* Mobile only (≤768px) */
@media (max-width: 768px) {
  .product-one-grid-box {
    width: 100%;
    height: auto;
    padding: 16px;
    font-size: clamp(0.95rem, 4.5vw, 1.05rem);
    border-radius: 16px;
    box-shadow: 4px 6px 10px rgba(68,129,235,0.35);
  }
}

/* Muy pequeño (≤380px) */
@media (max-width: 380px) {
  .product-one-grid-box {
    padding: 12px;
    border-radius: 12px;
  }
}
</style>
