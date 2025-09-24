<script setup>
import { onMounted, onUnmounted } from "vue";

import PrimaryButton from "@/components/PrimaryButton.vue";
import SecondaryButton from "@/components/SecondaryButton.vue";
import TestimonialCard from "@/components/TestimonialCard.vue";

import FamilyIllustration from "/white-Photoroom.png";
import IconMale from "@/components/icons/IconMale.svg";
import IconFemale from "@/components/icons/IconFemale.svg";
import IconVitalRecorder from "@/components/icons/IconWathVitalRecorder.svg";
import IconVitalConnect from "@/components/icons/IconVitalConnect.svg";

let observer = null;
onMounted(() => {
  const options = { threshold: 0.1 };
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, options);
  document
    .querySelectorAll(".fade-in-on-scroll")
    .forEach((el) => observer.observe(el));
});
onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<template>
  <div class="home-view">
    <section class="hero-section">
      <div class="hero-background-image"></div>
      <div class="hero-content-wrapper">
        <h1 class="hero-main-title">Tecnología que<br />cuida la vida</h1>
        <div class="hero-content-box">
          <p>
            Creamos soluciones innovadoras y accesibles para mejorar la calidad
            de vida y la autonomía de las personas.
          </p>
          <div class="hero-actions">
            <PrimaryButton name="Conoce el producto" root="product" />
            <SecondaryButton name="Contáctanos" root="contact-us"/>
          </div>
        </div>
      </div>
    </section>

    <section class="about-section fade-in-on-scroll">
      <div class="home-container">
        <h2 class="section-title">
          Innovación con Propósito: Desarrollamos herramientas que mejoran tu
          vida
        </h2>
        <div class="about-grid">
          <div class="about-text-content">
            <div class="about-blob">
              <p>
                VitalSystems nació en 2023 con la visión de fusionar la
                tecnología con la salud para empoderar a las personas. Un grupo
                de alumnos de la carrera de Ingeniería de Sistemas notó la
                necesidad de herramientas que mejoraran la autonomía.
              </p>
            </div>
          </div>
          <div class="about-illustration">
            <img :src="FamilyIllustration" alt="Ilustración de una familia" />
          </div>
        </div>
      </div>
    </section>

    <section class="products-section fade-in-on-scroll">
      <div class="home-container">
        <h2 class="section-title teal">Explora nuestros Productos</h2>
        <div class="product-row">
          <div class="description-blob">
            <p>
              Vital Recorder diseñada para ayudar a adultos mayores y personas
              con problemas de memoria a gestionar sus tratamientos médicos y
              tareas diarias.
            </p>
          </div>
          <div class="product-card">
            <img
              :src="IconVitalRecorder"
              class="product-icon"
              alt="Vital Recorder Icon"
            />
            <PrimaryButton name="Conoce el producto" root="product1" />
          </div>
        </div>
        <div class="product-row reverse">
          <div class="description-blob">
            <p>
              Vital Connect es una solución para la seguridad y el monitoreo de
              personas mayores. Notifica sobre cualquier actividad inusual, como
              inactividad prolongada o caídas.
            </p>
          </div>
          <div class="product-card">
            <img
              :src="IconVitalConnect"
              class="product-icon"
              alt="Vital Connect Icon"
            />
            <PrimaryButton name="Conoce el producto" root="product2" />
          </div>
        </div>
      </div>
    </section>

    <section class="testimonials-section fade-in-on-scroll">
      <div class="home-container">
        <h2 class="section-title">Lo que dicen nuestros usuarios</h2>
        <div class="testimonials-grid">
          <TestimonialCard
            name="Juan Velozco"
            quote="Ahora no me olvido de mis pastillas y mis hijos están tranquilos"
            :avatar="IconMale"
            :count="5"
          />
          <TestimonialCard
            name="Maria Pardo"
            quote="La sincronización familiar nos avisa si mi papá olvidó una toma sus medicamentos a tiempo"
            :avatar="IconFemale"
            :count="4"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-view {
  font-family: 'Poppins', sans-serif;
  color: #0f2147;
  background-color: #ffffff;
}

.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

section {
  padding: 4rem 0;
  overflow: hidden;
}

.section-title {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 4rem;
  text-align: center;
  color: #1f2b6c;
}

.section-title.teal {
  color: #14b8a6;
}

.hero-section {
  height: 92vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
}

.hero-background-image {
  position: absolute;
  inset: 0;
  background-image: url("/Seccion 1(1).png");
  background-size: cover;
  background-position: center;
  filter: brightness(0.7) blur(3px);
  z-index: 1;
}

.hero-content-wrapper {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.hero-main-title {
  font-size: 6rem;
  font-weight: 900;
  line-height: 1.1;
  color: #ffffff;
  text-shadow: 0 8px 16px rgba(0, 0, 0, 0.7);
}

.hero-content-box {
  background: rgba(255, 255, 255, 0.15);
  padding: 2.5rem 4.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(12px);
}

.hero-content-box p {
  font-weight: 600;
  font-size: 1.4rem;
  max-width: 600px;
  color: #f0f0f0;
  margin: 0 auto 2.5rem auto;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.about-section {
  background-color: var(--grey-light-1);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 5rem;
}

.about-blob {
  background-color: #ffffff;
  border-radius: 2rem;
  padding: 3rem;
  box-shadow: 0 10px 25px rgba(68, 129, 235, 0.2);
}

.about-blob p {
  font-size: 1.25rem;
  line-height: 1.8;
  color: var(--grey-dark-1);
  text-align: center;
}

.about-illustration {
  display: flex;
  justify-content: center;
}

.about-illustration img {
  width: 80%;
  max-width: 450px;
  height: auto;
}

.products-section {
  background-color: #f1f5f9;
}

.product-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 4rem;
  margin-bottom: 6rem;
}

.product-row.reverse {
  direction: rtl;
}

.product-row.reverse > * {
  direction: ltr;
}

.description-blob {
  background-color: #ffffff;
  border-radius: 1.5rem;
  padding: 3rem;
  box-shadow: 0 10px 25px rgba(0, 242, 254, 0.2);
}

.description-blob p {
  font-size: 1.25rem;
  line-height: 1.8;
  color: #475569;
  text-align: center;
}

.product-card {
  text-align: center;
}

.product-icon {
  height: 250px;
  margin-bottom: 2rem;
}

.testimonials-section {
  background-color: var(--grey-light-1);
}

.testimonials-grid {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  flex-wrap: wrap;
  padding-bottom: 4rem;
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
  .section-title {
    font-size: 2.2rem;
  }

  .hero-main-title {
    font-size: 4.5rem;
  }

  .hero-content-box p {
    font-size: 1.2rem;
  }

  .about-grid, .product-row {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .product-row.reverse {
    direction: initial;
  }
  
  .about-illustration img {
      width: 60%;
  }
}

@media (max-width: 768px) {
  section {
    padding: 3rem 0;
  }

  .home-container {
    padding: 0 1rem;
  }

  .section-title {
    font-size: 1.8rem;
    margin-bottom: 2.5rem;
  }

  .hero-section {
    height: auto;
    padding: 4rem 0;
  }

  .hero-main-title {
    font-size: 3rem;
  }

  .hero-content-box {
    padding: 1.5rem;
    border-radius: 1rem;
  }

  .hero-content-box p {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .hero-actions {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
  
  .hero-actions :deep(a),
  .hero-actions :deep(button) {
    width: 100%;
    justify-content: center;
  }

  .about-blob,
  .description-blob {
    padding: 1.5rem;
  }

  .about-blob p,
  .description-blob p {
    font-size: 1rem;
  }
  
  .about-illustration img {
      width: 70%;
      max-width: 300px;
  }
  
  .product-icon {
      height: 180px;
  }
}

@media (max-width: 480px) {
    .section-title {
        font-size: 1.6rem;
    }
    
    .hero-main-title {
        font-size: 2.5rem;
    }
    
    .hero-content-box {
        padding: 1rem;
    }
}
</style>
