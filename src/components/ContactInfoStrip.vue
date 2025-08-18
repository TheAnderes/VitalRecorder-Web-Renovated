<script setup>
const props = defineProps({
  addressImg: { type: String, default: '' },
  emailImg:   { type: String, default: '' },
  phoneImg:   { type: String, default: '' },
})
</script>

<template>
  <section class="strip">
    <div class="inner">
      <!-- Dirección -->
      <div class="item">
        <span class="badge">
          <img v-if="props.addressImg" :src="props.addressImg" alt="Dirección" />
          <svg v-else viewBox="0 0 24 24" aria-hidden="true">
            <defs><linearGradient id="g1" x1="0" x2="1"><stop offset="0" stop-color="#2dd4bf"/><stop offset="1" stop-color="#60a5fa"/></linearGradient></defs>
            <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" fill="none" stroke="url(#g1)" stroke-width="1.8"/>
            <circle cx="12" cy="10" r="2.5" fill="none" stroke="url(#g1)" stroke-width="1.8"/>
          </svg>
        </span>
        <h5>Dirección</h5>
        <p>La Paz, Bolivia</p>
      </div>

      <!-- Correo -->
      <div class="item">
        <span class="badge">
          <img v-if="props.emailImg" :src="props.emailImg" alt="Correo" />
          <svg v-else viewBox="0 0 24 24" aria-hidden="true">
            <defs><linearGradient id="g2" x1="0" x2="1"><stop offset="0" stop-color="#2dd4bf"/><stop offset="1" stop-color="#60a5fa"/></linearGradient></defs>
            <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="url(#g2)" stroke-width="1.8"/>
            <path d="M4 7l8 6 8-6" fill="none" stroke="url(#g2)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <h5>Correo</h5>
        <p><a href="mailto:contacto@vitalsystems.com">contacto@vitalsystems.com</a></p>
      </div>

      <!-- Teléfono -->
      <div class="item">
        <span class="badge">
          <img v-if="props.phoneImg" :src="props.phoneImg" alt="Teléfono" />
          <svg v-else viewBox="0 0 24 24" aria-hidden="true">
            <defs><linearGradient id="g3" x1="0" x2="1"><stop offset="0" stop-color="#2dd4bf"/><stop offset="1" stop-color="#60a5fa"/></linearGradient></defs>
            <path d="M6 3l3 3-2 2a12 12 0 0 0 8 8l2-2 3 3-2 3c-8 1-15-6-14-14L6 3Z"
                  fill="none" stroke="url(#g3)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <h5>Teléfono</h5>
        <p><a href="tel:+59177700000">+591 777 000 00</a></p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.strip{
  background:#fff;
  border:1px solid #e6ebf1;
  /* full-bleed */
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  border-left: none;
  border-right: none;
  border-radius: 16px;        
  box-shadow:0 8px 20px rgba(0,0,0,.08);
  padding: clamp(14px, 2vw, 22px);
  margin-top: clamp(18px, 3vh, 28px);
  margin-bottom: 0;             
}
.inner{
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(18px, 2.4vw, 32px);
  align-items: start;
}

.item{
  background: transparent;    
  border: none;               
  border-radius: 12px;
  padding: clamp(18px, 2.2vw, 28px);
  display: grid;
  justify-items: center;
  text-align: center;
  gap: 10px;
  box-shadow: none;            
}
.badge{
  width: clamp(64px, 6.5vw, 80px);
  height: clamp(64px, 6.5vw, 80px);
  min-width: clamp(64px, 6.5vw, 80px);
  display: grid; place-items: center;
  border-radius: 999px;
  background: rgba(255,255,255,.85);
  box-shadow:
    inset 0 0 0 2px rgba(96,165,250,.35),
    0 4px 12px rgba(0,0,0,.10);
}
.badge img{
  width: 70%;
  height: 70%;
  object-fit: contain;
  display: block;
}
.badge svg{
  width: clamp(32px, 3vw, 40px);
  height: clamp(32px, 3vw, 40px);
}
h5{
  margin: 8px 0 2px;
  font-weight: 800;
  color:#0b1020;
  font-size: clamp(1.05rem, 1.35vw, 1.35rem);
}
p{
  margin: 0;
  color:#475569;
  font-size: clamp(1rem, 1.1vw, 1.1rem);
}
a{
  color:#2563eb;
  text-decoration: none;
  font-size: clamp(1rem, 1.1vw, 1.1rem);
}
a:hover{ text-decoration: underline; }


@media (max-width: 980px){
  .inner{ grid-template-columns: 1fr; }
}
</style>