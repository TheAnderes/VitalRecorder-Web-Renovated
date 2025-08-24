<template>
  <article class="product-how-card">
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
  </article>
</template>

<script>
export default {
  name: "HowCard",
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
}
</script>

<style scoped>
/* Card */
.product-how-card
{
    display: flex;
    justify-content: center;
  background:#fff;
  border-radius:12px;
  box-shadow:0 8px 18px rgba(0,0,0,.06);
  padding:16px 18px;
  display:flex;
  flex-direction:column;
  gap:10px;
  width: 300px;
  height: 200px;
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
  font-weight: 900;
  font-size: 28px; /* más grande para que se note el borde */
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
  font-size:23px;
  color:#0f2147;
}

/* Body: texto izquierda + icono derecha */
.product-step-body{
  display:flex;
  align-items:center;
  justify-content: center;
  gap: 10px;
}
.product-how-text{
  margin:0;
  color:#777;
  font-size:17px;
  line-height:1.35;
  width: 160px;
}
/* Icono con degradado (usando la máscara) */
.product-how-icon-mask{
  width:110px; height:110px;
  justify-self:end;
}

/* Responsive */
@media (max-width: 700px){
  .product-step-body{
    grid-template-columns: 1fr;
  }
  .product-how-icon-mask{
    justify-self:center;
  }
}
</style>
