<template>
  <BaseCard class="how-card">
    <!-- Cabecera: badge + título -->
    <div class="product-step-badge-head">
      <div class="product-step-badge-cube">
        <span class="product-step-number">{{ step }}</span>
      </div>
      <h3 class="product-how-title">{{ title }}</h3>
    </div>

    <!-- Cuerpo: texto (izq) + icono (der) -->
    <div class="product-step-body">
      <p class="product-how-text">
        {{ text }}
      </p>

      <!-- Icono SVG con degradado aplicado vía mask -->
<img 
  :src="icon" 
  class="product-how-icon-mask" 
  :style="[maskStyle, url ? { cursor: 'pointer' } : {}]" 
  @click="goToUrl"
  alt="icono"
/>
    </div>
  </BaseCard>
</template>

<script>
import BaseCard from './BaseCard.vue';

export default {
  name: "HowCard",
  components: { BaseCard },
  props: {
    step:  { type: [String, Number], required: true },
    title: { type: String, required: true },
    text:  { type: String, required: true },
    icon:  { type: String, required: true },
    url:   { type: String, required: false }, // URL a redirigir
  },
  methods: {
    goToUrl() {
      if (this.url) {
        window.open(this.url, "_blank"); // nueva pestaña
        // o en la misma pestaña:
        // window.location.href = this.url;
      }
    }
  }
};
</script>

<style scoped>
/* Card */
.how-card
{
  display: flex;
  justify-content: center;
  padding: 16px 18px;
  flex-direction: column;
  gap: 10px;
  width: 280px;
  min-height: 200px;
  height: auto;
  box-shadow: 7px 7px 7px rgba(68, 129, 235, 0.4); /* Override BaseCard's shadow */
}

/* Header */
.product-step-badge-head{
  display:flex;
  align-items:center;
  justify-content: center;
  gap:16px;
}
.product-step-badge-cube
{
  width:40px; height:40px; border-radius:10px;
  display:grid; place-items:center;
  /* Borde degradado con interior blanco */
  background:
    linear-gradient(#fff,#fff) padding-box,
    linear-gradient(135deg,#20dff1,#4f9dfd) border-box;
  border:2px solid transparent;
}
.product-step-number {
  font-weight: 800;
  font-size: 20px; /* más grande para que se note el borde */
  line-height: 1;

  /* Texto transparente */
  color: transparent;

  /* Solo borde visible */
  -webkit-text-stroke: 1px #4f9dfd; /* grosor + color del borde *//* estándar (soporte limitado) */
}
.product-how-title{
  margin:0;
  font-family: var(--tipografia);
  font-weight:600;
  font-size:20px;
  color:#0f2147;
}

/* Body: texto arriba + icono abajo */
.product-step-body{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  flex: 1;
}
.product-how-text{
  margin: 0;
  color: #777;
  font-size: 14px;
  line-height: 1.4;
  text-align: center;
  max-width: 100%;
  word-wrap: break-word;
  hyphens: auto;
}
/* Icono con degradado (usando la máscara) */
.product-how-icon-mask{
  width: 80px; 
  height: 80px;
  flex-shrink: 0;
}

/* Responsive */
@media (max-width: 768px){
  .how-card {
    width: 100%;
    max-width: 300px;
    min-height: 220px;
  }
  
  .product-how-text {
    font-size: 13px;
  }
  
  .product-how-title {
    font-size: 18px;
  }

  .product-how-icon-mask{
    width: 70px;
    height: 70px;
  }
}

@media (max-width: 480px){
  .how-card {
    max-width: 280px;
    padding: 14px 16px;
  }
  
  .product-step-badge-head {
    gap: 12px;
  }
  
  .product-how-title {
    font-size: 16px;
  }
}
</style>
