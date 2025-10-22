<script setup>
import TestimonialCard from "@/components/shared/TestimonialCard.vue";
import IntroIconButtonCard from "@/components/shared/IntroIconButtonCard.vue";
import InformationProductCard from "@/components/shared/InformationProductCard.vue";
import SecondaryButton from "@/components/shared/SecondaryButton.vue";
import PrimaryButton from "@/components/shared/PrimaryButton.vue";

import IconWathVital from "@/components/icons/IconWathVitalRecorder.svg";
import IconVitalConnect from "@/components/icons/IconVitalConnect.svg";
import IconMale from "@/components/icons/IconMale.svg";
import IconFemale from "@/components/icons/IconFemale.svg";
import { onMounted, onUnmounted } from "vue";
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
  document
    .querySelectorAll(".fade-in-on-scroll")
    .forEach((el) => observer.observe(el));
});

onUnmounted(() => {
  // Cuando el componente se desmonta, desconectamos el observador
  if (observer) observer.disconnect();
});
</script>
<template>
  <div class="product-view">
    <!-- BLOQUE PRINCIPAL (HERO IMPORTADO DESDE SOLICITUD DEL USUARIO) -->
    <section class="hero-section">
      <div class="hero-background-image"></div>
      <div class="hero-content-wrapper">
        <div class="hero-inner">
          <div class="hero-left">
            <h1 class="hero-main-title">Productos</h1>

            <h2 class="hero-subline">Descubre <span class="hero-highlight">nuestras soluciones</span></h2>

            <p class="hero-subtitle">
              Soluciones tecnológicas pensadas para mejorar la autonomía y la
              calidad de vida en el hogar: recordatorios inteligentes y sistemas
              de monitoreo no invasivos, fáciles de usar y respetuosos con la privacidad.
            </p>

            <!-- botones removidos a petición del usuario -->
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
            <h2 class="product-one-text">Tu recordatorio Inteligente</h2>
            <InformationProductCard
              text="Una manilla inteligente y una aplicación móvil que te ayudan a gestionar tus medicamentos y tareas diarias, garantizando tranquilidad para toda la familia."
            />
            <SecondaryButton root="contact-us" name="Contactanos" />
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
            <h2 class="product-one-text">Tu recordatorio Inteligente</h2>
            <InformationProductCard
              text="Un sistema de monitoreo no invasivo que utiliza sensores inteligentes para alertar a los familiares sobre cualquier situación de emergencia en el hogar, sin invadir la privacidad."
            />
            <SecondaryButton root="contact-us" name="Contactanos" />
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
.product-view {
  font-family: 'Poppins', sans-serif;
  color: #0f2147;
  background-color: #ffffff;
}

.product-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.product-intro {
  height: 92vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
}

.product-view-image {
  position: absolute;
  inset: 0;
  background-image: url("@/components/icons/ImageProductPrincipal.jpg");
  background-size: cover;
  background-position: center;
  filter: brightness(0.7) blur(3px);
  z-index: 1;
}

.product-content-wrapper {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.product-hero-title {
  font-size: 6rem;
  font-weight: 900;
  line-height: 1.1;
  color: #ffffff;
  text-shadow: 0 8px 16px rgba(0, 0, 0, 0.7);
  text-decoration: underline 4px #ffffff;
  text-underline-offset: 16px;
}

.product-intro-text {
  background: rgba(255, 255, 255, 0.2);
  padding: 2.5rem 4.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(12px);
}

.product-intro-lead {
  font-weight: 600;
  font-size: 1.4rem;
  max-width: 600px;
  color: #f0f0f0;
  margin: 0 auto 2.5rem auto;
}

.product-intro-actions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  
}

.product-one, .product-two {
    padding: 4rem 0;
}

.product-sections-title {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 4rem;
  text-align: center;
  color: #1f2b6c;
}

.product-one-grid, .product-two-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 4rem;
}

.product-one-grid-text, .product-two-grid-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.product-one-text {
  font-weight: 600;
  color: #1f2b6c;
  font-size: 2rem;
  text-align: center;
}

.product-testimonials {
    background-color: var(--grey-light-1);
    padding: 4rem 0;
}

.product-testimonials-grid {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  flex-wrap: wrap;
}

.fade-in-on-scroll {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.fade-in-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ===== RESPONSIVE STYLES ===== */
@media (max-width: 1024px) {
  .product-sections-title {
    font-size: 2.2rem;
  }
  
  .product-hero-title {
      font-size: 4.5rem;
  }

  .product-one-grid, .product-two-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .product-two-grid .product-one-grid-image {
      order: -1;
  }
}

@media (max-width: 768px) {
  .product-container {
    padding: 0 1rem;
  }

  .product-intro {
    height: auto;
    padding: 4rem 1rem;
  }

  .product-hero-title {
    font-size: 3rem;
    text-underline-offset: 10px;
  }

  .product-intro-text {
    padding: 1.5rem;
    border-radius: 1rem;
  }

  .product-intro-lead {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
  
  .product-sections-title {
      font-size: 1.8rem;
  }
  
  .product-one-text {
      font-size: 1.5rem;
  }
}

/* ===== HERO SECTION STYLES (copiado/añadido) ===== */
.hero-section {
  position: relative;
  min-height: 90vh; /* ocupar casi toda la pantalla para el efecto grande */
  display: flex;
  align-items: center;
  color: #0f2147;
  overflow: hidden;
  padding-top: 2rem;
}

.hero-background-image {
  position: absolute;
  inset: 0;
  background-image: url('@/components/icons/ImageProductPrincipal.jpg');
  background-size: cover;
  background-position: center;
  background-size: cover;
  background-position: center;
  filter: brightness(0.45) blur(2px);
  z-index: 0;
  z-index: 1;
}

.hero-content-wrapper {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  justify-content: left;
  padding: 5rem;
}

.hero-inner {
  max-width: 1200px;
  width: 100%;
  display: flex;
  gap: 2rem;
  align-items: center;
}

.hero-left {
  flex: 1;
}

.hero-main-title {
  /* usar clamp para que escale bien entre dispositivos */
  font-size: 180px;
  margin: 0 0 1rem 0;
  font-weight: 900;
  color: #ffffff;
  text-shadow: 0 10px 28px rgba(0,0,0,0.7);
  line-height: 0.95;
}

.hero-subline {
  font-size: 50px;
  margin: 0 0 1rem 0;
  color: rgba(255,255,255,0.95);
  font-weight: 700;
}

.hero-highlight {
  color: #16aaff;
  font-weight: 800;
}

.hero-subtitle {
  font-weight: 600;
  font-size: 25px;
  color: rgba(238, 246, 255, 0.92);
  margin: 0 0 1.25rem 0;
  max-width: 850px;
  line-height: 1.6;
  opacity: 0.95;
  color: rgba(255, 255, 255, 0.85);
  text-align: left;
}

@media (max-width: 1024px) {
  .hero-section { min-height: 80vh; }
}

@media (max-width: 768px) {
  .hero-section { min-height: auto; padding: 2rem 0; }
  .hero-main-title { font-size: 3rem; }
  .hero-subline { font-size: 1.4rem; }
  .hero-subtitle { font-size: 1rem; }
}
</style>
