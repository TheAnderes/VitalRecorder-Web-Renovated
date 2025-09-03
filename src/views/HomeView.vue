<script setup>
import { onMounted, onUnmounted } from "vue";

import PrimaryButton from "@/components/PrimaryButton.vue";
import SecondaryButton from "@/components/SecondaryButton.vue";
import TestimonialCard from "@/components/TestimonialCard.vue";

import FamilyIllustration from "/white-Photoroom.png";
import IconMale from "@/components/icons/IconMale.svg";
import IconFemale from "@/components/icons/IconFemale.svg";
import IconVitalRecorder from "@/components/icons/IconWatHVitalRecorder.svg";
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
            <SecondaryButton name="Contáctanos" />
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
</style>
