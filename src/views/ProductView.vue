<script setup>

import TestimonialCard from '@/components/TestimonialCard.vue';
import IntroIconButtonCard from '@/components/IntroIconButtonCard.vue';
import InformationProductCard from '@/components/InformationProductCard.vue';

import IconWathVital from '@/components/icons/IconWathVitalRecorder.svg';

import IconVitalConnect from '@/components/icons/IconVitalConnect.svg';


import ButtonSecondary from '@/components/SecondaryButton.vue';
import ButtonPrimary from '@/components/PrimaryButton.vue';


import IconMale from '@/components/icons/IconMale.svg'
import IconFemale from '@/components/icons/IconFemale.svg'
import SecondaryButton from '@/components/SecondaryButton.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import { onMounted, onUnmounted } from 'vue';
let observer = null;

onMounted(() => {
  const options = { threshold: 0.1 }; // Cuando el 10% del elemento es visible
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Si el elemento está en vista, agrega la clase para activar la transición
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // Deja de observar el elemento
      }
    });
  }, options);

  // Observar todos los elementos con la clase 'fade-in-on-scroll'
  document.querySelectorAll(".fade-in-on-scroll").forEach((el) => observer.observe(el));
});

onUnmounted(() => {
  // Cuando el componente se desmonta, desconectamos el observador
  if (observer) observer.disconnect();
});
</script>
<template>
  <div class="product-view">
    <!-- BLOQUE PRINCIPAL -->
    <section class="product-intro">
      <h1 class="product-hero-title">Productos</h1>
      <div class="product-container">
        <div class="product-intro-text">
          <p class="product-intro-lead">
            Soluciones <br/> tecnológicas para una vida más autónoma y saludable.
          </p>
          <div class="product-intro-actions">
            <PrimaryButton
              root="contact-us" 
              name="Contactanos"
              />
          </div>
        </div>

      </div>
    </section>

    <!-- Producto 1-->
    <section class="product-one fade-in-on-scroll">
      <div class="product-container">
        <h2 class="product-sections-title">Nuestro producto Vital Recorder</h2>

        <div class="product-one-grid">
          <div class="product-one-grid-text">
            <h2 class="product-one-text"> Tu recordatorio Inteligente</h2>
            <InformationProductCard
              text="Una manilla inteligente y una aplicación móvil que te ayudan a gestionar tus medicamentos y tareas diarias, garantizando tranquilidad para toda la familia."
              />
            <SecondaryButton 
              root="contact-us" 
              name="Contactanos"
              />
          </div>
          <div class="product-one-grid-image">
            <IntroIconButtonCard
              root="product1"
              namebutton="Mas Información"
              :icon="IconWathVital"
              />
          </div>
        </div>
      </div>
    </section>

    <!-- Producto 2 -->
    <section class="product-two fade-in-on-scroll">
      <div class="product-container">
        <h2 class="product-sections-title">Nuestro producto Vital Connect</h2>

        <div class="product-two-grid">
          
          <div class="product-one-grid-image">
            <IntroIconButtonCard
              root="product2"
              namebutton="Mas Información"
              :icon="IconVitalConnect"
              />
          </div>
          <div class="product-two-grid-text">
            <h2 class="product-one-text"> Tu recordatorio Inteligente</h2>
            <InformationProductCard
              text="Un sistema de monitoreo no invasivo que utiliza sensores inteligentes para alertar a los familiares sobre cualquier situación de emergencia en el hogar, sin invadir la privacidad."
              />
            <SecondaryButton 
              root="contact-us" 
              name="Contactanos"
              />
          </div>
        </div>
      </div>
    </section>
     
    <!-- TESTIMONIOS -->
    <section class="product-testimonials fade-in-on-scroll">
      <div class="product-container product-testimonials">
        <h2 class="product-sections-title">Lo que dicen nuestros usuarios</h2>

        <div class="product-testimonials-grid">
          
        <TestimonialCard
          name="Juan Velozco"
          quote="Ahora no me olvido de mis pastillas y mis hijos están tranquilos"
          :avatar="IconMale"
          :count="5"   
        />
        <TestimonialCard
          name="Maria Pardo"
          quote="“La sincronización familiar nos avisa si mi papá olvido una toma sus medicamentos a tiempo”"
          :avatar="IconFemale"
          :count="3"   
        />
        <TestimonialCard
          name="Daniela Torres"
          quote="“La sincronización familiar nos avisa si mi papá olvido una toma sus medicamentos a tiempo”"
          :avatar="IconFemale"
          :count="4"   
        />


        </div>
      </div>
    </section>

  </div>
</template>



<style scoped>
/* Base */
.product-view {
  font-family: "Poppins", "Inter", system-ui, sans-serif;
  color: #0f2147;
  background: #ffffff;
}

.product-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.25rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 30px;
}



/* HERO / INTRO */
.product-hero-title {
  font-family: var(--tipografia);
  font-weight: 900;
  font-size: 80px;
  text-align: center;
  font-weight: black;
  color:black ;
  text-decoration: underline 4px #0f2147;
  text-underline-offset: 20px;
  margin: 0;
}

.product-intro {
  display: flex;
  background: linear-gradient(135deg,#53e0f3 0%, #2a74ff 100%);
  padding: 10px 0 10px;
  color: #fff;
  height: 92vh;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  background-image: url('@/components/icons/ImageProductPrincipal.jpg');
  background-size: 100% 140%;
  background-repeat: no-repeat;
}
.product-intro-grid {
  display: grid;
  grid-template-columns: 1.15fr .85fr;
  gap: clamp(1rem, 2.5vw, 2rem);
  align-items: center;
  padding: 2rem;
  padding: clamp(1rem, 2.2vw, 1.75rem);
  border-radius: 16px;
  backdrop-filter: blur(2px);
}

.product-intro-lead {
  text-align: center;
  font-size: 50px;
  font-weight: var(--semibold);
  line-height: 1.55;
  color: black;
  margin: 0 0 1.5rem;
  font-family: var(--tipografia);
}
.product-intro-actions { display:flex; gap:50px; flex-wrap:wrap; justify-content:center; }

.product-intro-media { display:flex; justify-content:center; flex-direction: column; align-items: center;
width: 450px;
height: 450px;
}



.product-device-title {
  margin: .2rem 0 0;
  font-size: clamp(1.1rem, 2.6vw, 1.8rem);
  font-weight: 900;
  color:#0f2147;
  letter-spacing:.4px;
}
.product-intro-text
{
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: rgba(255,255,255,0.70);
  height: auto;
  width: 800px;
  padding-bottom: 20px;
  border-radius: 50px;
}

/* === CARACTERÍSTICAS (COMPACTO) === */
.product-one {
  display: flex;
  align-items: center;
  height: 92vh;
  box-sizing: border-box;
}

.product-sections-title {
  font-family: var(--tipografia);
  text-align: center;
  font-size: 50px;
  font-weight: var(--semibold);
  margin: 0;
  color:#1F2B6C;
}
.product-one-grid {
  display: flex;
  gap: 20px;
}

.product-one-grid-text
{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
}
.product-one-text
{
  font-family: var(--tipografia);
  font-weight: var(--semibold);
  color: #1F2B6C;
  font-size: 40px;
  text-align: center;
  margin: 0;
}


/* === PARA QUIÉN ES (COMPACTO) === */
.product-two {
  display: flex;

  padding: clamp(1.25rem, 2vw, 2rem) 0;
  color:#0b1634;
  height: 92vh;
  box-sizing: border-box;
  align-items: center;
}

.product-two-grid {
  display: flex;
  justify-content: center;
  gap: 25px;
}
.product-two-grid-text
{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
}

.product-how {
  display: flex;
  background: #f5f7fb;
  padding: clamp(1.25rem, 2vw, 2rem) 0;
  height: 100vh;
  align-items: center;
  justify-content: center;
}
.product-how-grid {
  display: flex;
  gap: 30px;
}
.product-how-card {
  background: #fff;
  border-radius: 12px;
  padding: 1rem 1rem 1.25rem;
  box-shadow: 0 8px 18px rgba(0,0,0,.06);
  text-align: center;
  position: relative;
}
.product-step-badge {
  position: absolute;
  top: -10px;
  left: -10px;
  background: #0f2147;
  color: #fff;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: .9rem;
  box-shadow: 0 8px 18px rgba(15,33,71,.22);
}
.product-how-icon {
  font-size: clamp(1.8rem, 3vw, 2.2rem);
  margin: .2rem 0 .45rem;
  background: linear-gradient(90deg,#00f2fe,#4481eb);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.product-how-title {
  font-size: 1rem;
  font-weight: 800;
  color: #0f2147;
  margin: 0 0 .2rem;
}
.product-how-text { color:#5b6575; margin:0; font-size: .95rem; }

/* === MÉTRICAS (COMPACTO) === */
.product-metrics {
  background: linear-gradient(135deg,#20dff1 0%, #4f9dfd 100%);
  padding: clamp(1.25rem, 2vw, 2rem) 0;
}
.product-metrics-title {
  font-family: var(--tipografia);
  font-weight:var(--semibold);
  text-align: center;
  font-size: 60px;
  color: #0f2147;
  margin: 0 0 1rem;
}
.product-metrics-grid {
  display: flex;
  gap: 40px;
}

/* TESTIMONIOS (ligero ajuste) */
.product-testimonials {
  padding: clamp(1.25rem, 2vw, 2rem) 0;
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 75px;
}
.product-testimonials-grid {
  display:flex;
  grid-template-columns: repeat(2,1fr);
  gap: 1.25rem;
}




/* CTA */
.product-cta {
  background: linear-gradient(135deg,#20dff1 0%, #4f9dfd 100%);
  padding: clamp(1.25rem, 2vw, 2rem) 0;
}
.product-cta-grid {
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items:center;
}
.product-cta-textbox {
  background:#ffffff;
  border-radius: 20px;
  padding: 1.25rem;
  box-shadow: 0 12px 26px rgba(15,33,71,.16);
  font-size: 1.05rem;
  line-height: 1.5;
  color:#0f2147;
  font-weight: 700;
}
.product-cta-media { text-align:center; }
.product-store-row {
  margin-top: .7rem;
  display:flex; gap:.6rem; justify-content:center; flex-wrap:wrap;
}
.product-store-btn {
  display:flex; align-items:center; gap:.5rem;
  padding:.55rem .9rem; border-radius:10px;
  background:#0f2147; color:#fff; text-decoration:none; font-weight:700;
  box-shadow: 0 8px 18px rgba(15,33,71,.22);
}
.product-store-btn i { font-size: 1rem; }

/* Responsive */
@media (max-width: 1000px) {
  .product-intro-grid { grid-template-columns: 1fr; }
  .product-testimonials-grid { grid-template-columns: 1fr; }
  .product-cta-grid { grid-template-columns: 1fr; }
}
.fade-in-on-scroll {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1s ease-out, transform 1s ease-out;
}
.fade-in-on-scroll.is-visible{
  opacity: 1;
  transform: translateY(0);
}
</style>
