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
  font-family: "Poppins", "Inter", sans-serif;
  color: #0f2147;
  background-color: #ffffff;
}

.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

section {
  padding: 1rem 0;
  overflow: hidden;
}

.section-title {
  font-size: 2.6rem;
  font-weight: 600;
  margin-bottom: 4rem;
  text-align: center;
  color: #1f2b6c;
}
.section-title.teal {
  color: #14b8a6;
}

.hero-section {
  height: 92vh;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
}
.hero-background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/Seccion 1(1).png");
  background-size: cover;
  background-position: center;
  filter: brightness(0.8) blur(2px);
  z-index: 1;
}

.hero-content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  position: relative;
  z-index: 2;
}

.hero-main-title {
  font-size: 6.2rem;
  font-weight: 900;
  line-height: 1.2;
  color: #ffffff;
  text-shadow: 0 6px 12px rgba(0, 0, 0, 0.6);
  margin: 0;
}

.hero-content-box {
  background: rgba(255, 255, 255, 0.2);
  padding: 2rem 4rem;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}
.hero-content-box p {
  font-weight: 700;
  font-size: 1.35rem;
  max-width: 550px;
  color: #000000;
  margin: 0 auto 2.5rem auto;
}
.hero-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.about-section {
  background-color: #ffffff;
  height: 92vh;
  box-sizing: border-box;
}
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 4rem;
  margin-top: 2rem;
}
.about-blob {
  background-color: #ffffff;
  border-radius: 40px;
  padding: 2.5rem;
  box-shadow: 7px 7px 20px #4481eb;
}
.about-blob p {
  margin: 0;
  font-size: 1.2rem;
  line-height: 1.7;
  color: #334155;
  text-align: center;
}
.about-illustration
{
  display: flex;
  justify-content: center;
  align-items: center;
}
.about-illustration img {
  height: auto;
  width: 50%;
  transform: scale(1.1);
}

.products-section {
  background-color: #f1f5f9;
}
.product-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 3rem;
  margin-bottom: 5rem;
}
.product-row:last-child {
  margin-bottom: 0;
}
.product-row.reverse {
  direction: rtl;
}
.product-row.reverse > * {
  direction: ltr;
}
.description-blob {
  background-color: #ffffff;
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 7px 7px 20px 0px rgba(0, 242, 254, 0.5);
}
.description-blob p {
  margin: 0;
  font-size: 1.2rem;
  line-height: 1.7;
  color: #475569;
  text-align: center;
}
.product-card {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.product-icon {
  height: 220px;
  margin-bottom: 1.5rem;
}

.testimonials-section {
  background-color: #ffffff;
}
.testimonials-grid {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 2rem;
  padding-bottom: 6rem;
}

.fade-in-on-scroll {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}
.fade-in-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}
/* ===== MOBILE ONLY (≤768px) ===== */
@media (max-width: 768px) {
  /* Layout base */
  .home-container {
    max-width: 100%;
    padding: 0 16px;
  }
  section {
    padding: 28px 0;
  }
  .section-title {
    font-size: clamp(1.35rem, 6.5vw, 1.9rem);
    margin-bottom: 1.75rem;
  }

  /* HERO */
  .hero-section {
    height: auto;
    padding: 48px 0 32px;
  }
  .hero-background-image {
    filter: brightness(0.78) blur(1.5px);
  }
  .hero-content-wrapper {
    gap: 14px;
    padding: 0 6px;
  }
  .hero-main-title {
    font-size: clamp(2rem, 9vw, 3rem);
    line-height: 1.15;
    text-shadow: 0 4px 10px rgba(0,0,0,.45);
  }
  .hero-content-box {
    width: 100%;
    padding: 14px 16px;
    border-radius: 14px;
    backdrop-filter: blur(6px);
  }
  .hero-content-box p {
    max-width: 100%;
    margin: 0 0 14px 0;
    font-size: clamp(1rem, 4.5vw, 1.1rem);
  }
  .hero-actions {
    flex-direction: column;
    gap: 10px;
  }
  /* Si tus botones renderizan como <a> o <button>, esto los hace full width */
  .hero-actions :deep(a),
  .hero-actions :deep(button) {
    width: 100%;
    justify-content: center;
  }

  /* ABOUT */
  .about-section {
    height: auto;
    padding: 32px 0;
  }
  .about-grid {
    grid-template-columns: 1fr; /* apilar */
    gap: 18px;
    margin-top: 10px;
  }
  .about-blob {
    padding: 16px;
    border-radius: 18px;
    box-shadow: 4px 6px 14px rgba(68,129,235,.35);
  }
  .about-blob p {
    font-size: clamp(0.98rem, 4.3vw, 1.05rem);
    line-height: 1.55;
  }
  .about-illustration img {
    width: min(82%, 360px);
    transform: none;
  }

  /* PRODUCTS */
  .products-section { padding-top: 24px; }
  .product-row,
  .product-row.reverse {
    grid-template-columns: 1fr; /* apilar */
    gap: 16px;
    margin-bottom: 26px;
    direction: initial; /* neutraliza el reverse */
  }
  .description-blob {
    padding: 16px;
    border-radius: 16px;
    box-shadow: 4px 6px 14px rgba(0,242,254,.35);
  }
  .description-blob p {
    font-size: clamp(0.98rem, 4.3vw, 1.05rem);
    line-height: 1.55;
  }
  .product-card { padding-top: 4px; }
  .product-icon {
    height: clamp(120px, 28vw, 170px);
    margin-bottom: 12px;
    max-width: 100%;
  }
  /* Botón del product-card a lo ancho si corresponde */
  .product-card :deep(a),
  .product-card :deep(button) {
    width: 100%;
    justify-content: center;
  }

  /* TESTIMONIALS */
  .testimonials-grid {
    gap: 14px;
    padding-bottom: 24px;
    margin-top: 10px;
  }

  /* Animaciones: suaviza distancias */
  .fade-in-on-scroll {
    transform: translateY(24px);
  }
}

/* ===== EXTRAPEQUEÑO (≤380px) ===== */
@media (max-width: 380px) {
  .hero-section { padding: 36px 0 24px; }
  .hero-content-box { padding: 12px; border-radius: 12px; }
  .about-blob { padding: 12px; border-radius: 14px; }
  .description-blob { padding: 12px; border-radius: 14px; }
}

/* Evita scroll horizontal accidental en móvil */
:root, html, body { overflow-x: hidden; }

</style>
