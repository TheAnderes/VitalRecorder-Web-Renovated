<script setup>
import { onMounted, onUnmounted, ref, computed } from "vue";

import PrimaryButton from "@/components/shared/PrimaryButton.vue";
import SecondaryButton from "@/components/shared/SecondaryButton.vue";
import TestimonialCard from "@/components/shared/TestimonialCard.vue";

import FamilyIllustration from "/white-Photoroom.png";
import IconMale from "@/components/icons/IconMale.svg";
import IconFemale from "@/components/icons/IconFemale.svg";
import IconVitalRecorder from "@/components/icons/IconWathVitalRecorder.svg";
import IconVitalConnect from "@/components/icons/IconVitalConnect.svg";

let observer = null;
// Simple carousel state for products
const activeProduct = ref(0);
const carouselTimer = ref(null);
const carouselPaused = ref(false);
let onKeyHandler = null;
const products = [
  {
    id: 0,
    title: 'Vital Recorder',
    description: 'Vital Recorder diseñada para ayudar a adultos mayores y personas con problemas de memoria a gestionar sus tratamientos médicos y tareas diarias.',
    icon: IconVitalRecorder,
    root: 'product1'
  },
  {
    id: 1,
    title: 'Vital Connect',
    description: 'Vital Connect es una solución para la seguridad y el monitoreo de personas mayores. Notifica sobre cualquier actividad inusual, como inactividad prolongada o caídas.',
    icon: IconVitalConnect,
    root: 'product2'
  }
];


// Timer controls usable across handlers
function startTimer() {
  stopTimer();
  carouselTimer.value = setInterval(() => {
    if (!carouselPaused.value) activeProduct.value = (activeProduct.value + 1) % products.length;
  }, 4000);
}

function stopTimer() {
  if (carouselTimer.value) {
    clearInterval(carouselTimer.value);
    carouselTimer.value = null;
  }
}

// pause/resume helpers (used for mouseenter/focus)
function pauseCarousel() {
  carouselPaused.value = true;
}

function resumeCarousel() {
  carouselPaused.value = false;
}

function prev() {
  console.debug('[carousel] prev clicked - before', activeProduct.value);
  activeProduct.value = (activeProduct.value - 1 + products.length) % products.length;
  console.debug('[carousel] prev - after', activeProduct.value);
  startTimer();
}

function next() {
  console.debug('[carousel] next clicked - before', activeProduct.value);
  activeProduct.value = (activeProduct.value + 1) % products.length;
  console.debug('[carousel] next - after', activeProduct.value);
  startTimer();
}

function goTo(index) {
  console.debug('[carousel] goTo', index);
  activeProduct.value = ((index % products.length) + products.length) % products.length;
  startTimer();
}

// computed style for translateX-based carousel track (includes dynamic total width)
const trackStyle = computed(() => ({
  width: `${products.length * 100}%`,
  transform: `translateX(-${activeProduct.value * (100 / products.length)}%)`
}));

// Consolidated mount/unmount lifecycle
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

  startTimer();
  onKeyHandler = (e) => {
    if (e.key === 'ArrowLeft') {
      prev();
    } else if (e.key === 'ArrowRight') {
      next();
    }
  };
  window.addEventListener('keydown', onKeyHandler);
});

onUnmounted(() => {
  if (observer) observer.disconnect();
  stopTimer();
  if (onKeyHandler) window.removeEventListener('keydown', onKeyHandler);
});
</script>

<template>
  <div class="home-view">
    <section class="hero-section">
      <div class="hero-background-image"></div>
      <div class="hero-content-wrapper">
        <div class="hero-inner">
          <div class="hero-left">
            <h1 class="hero-main-title">VITALSYSTEMS</h1>

            <h2 class="hero-subline">Tecnología que<br />cuida la <span class="hero-highlight">vida</span></h2>

            <p class="hero-subtitle">
              Creamos soluciones innovadoras y accesibles para mejorar la calidad
              de vida y la autonomía de las personas.
            </p>

            <div class="hero-actions hero-actions-left">
              <PrimaryButton class="hero-primary" name="Conoce el producto" root="product" />
              <SecondaryButton class="hero-secondary" name="Contáctanos" root="contact-us"/>
            </div>
          </div>

          <div class="hero-right" aria-hidden="true">
            <div class="hero-logo-wrap">
              <img src="/Logo.png" alt="VITALSYSTEMS logo" class="hero-logo" />
            </div>
          </div>
        </div>

        <!-- Métricas estilo segunda imagen -->
        <div class="hero-stats">
          <div class="stat">
            <div class="stat-number">50+</div>
            <div class="stat-label">Proyectos Completados</div>
          </div>
          <div class="stat">
            <div class="stat-number">8</div>
            <div class="stat-label">Años de Experiencia</div>
          </div>
          <div class="stat">
            <div class="stat-number">25+</div>
            <div class="stat-label">Clientes Satisfechos</div>
          </div>
          <div class="stat">
            <div class="stat-number">100%</div>
            <div class="stat-label">Enfoque en La Paz</div>
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
              <p class="muted-lead">
                Hoy diseñamos soluciones sencillas y seguras que permiten a
                familias y cuidadores mantener la tranquilidad sin dejar de
                respetar la independencia de la persona cuidada.
              </p>
              <ul class="feature-list">
                <li><strong>Accesibilidad:</strong> interfaces limpias y grandes para facilitar el uso.</li>
                <li><strong>Privacidad:</strong> control total sobre quién ve notificaciones.</li>
                <li><strong>Soporte local:</strong> atención y adaptaciones para nuestra comunidad en La Paz.</li>
              </ul>
              <div class="about-cta">
                <PrimaryButton name="Sobre nosotros" root="about-us" />
              </div>
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
  <p class="section-subtitle">Soluciones diseñadas para promover autonomía, adherencia a tratamientos y tranquilidad familiar.</p>
        <div class="products-carousel" @mouseenter="pauseCarousel" @mouseleave="resumeCarousel" @focusin="pauseCarousel" @focusout="resumeCarousel">
          <button type="button" class="carousel-control prev" @click="prev" aria-label="Previous product">‹</button>
          <div class="carousel-track">
            <div class="carousel-inner" :style="trackStyle">
              <div
                v-for="(p, idx) in products"
                :key="p.id"
                class="carousel-slide"
                :aria-hidden="activeProduct.value !== idx"
                :style="{ flexBasis: (100 / products.length) + '%' }"
              >
                <div class="product-row" :class="{ reverse: idx % 2 === 1 }">
                  <div class="description-blob">
                    <p>{{ p.description }}</p>
                    <ul class="product-features">
                      <li>Recordatorios programables y alertas instantáneas.</li>
                      <li>Historial de adherencia y reportes simples.</li>
                      <li>Sincronización familiar segura y permisos por roles.</li>
                    </ul>
                    <p class="muted-lead">Diseñado para ser intuitivo — sin descargas complejas ni configuraciones avanzadas.</p>
                  </div>
                  <div class="product-card">
                    <img :src="p.icon" class="product-icon" :alt="p.title + ' Icon'" />
                    <PrimaryButton :name="'Conoce ' + p.title" :root="p.root" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button type="button" class="carousel-control next" @click="next" aria-label="Next product">›</button>
        </div>
        <div class="carousel-dots">
          <button
            v-for="(p, idx) in products"
            :key="p.id"
            type="button"
            :class="{ active: activeProduct.value === idx }"
            @click="goTo(idx)"
            :aria-label="'Select slide ' + (idx+1)"
          ></button>
        </div>
      </div>
    </section>

    <section class="testimonials-section fade-in-on-scroll">
      <div class="home-container">
        <h2 class="section-title">Lo que dicen nuestros usuarios</h2>
        <p class="section-subtitle">Experiencias reales que muestran cómo pequeñas mejoras en la rutina diaria generan tranquilidad familiar.</p>
        <div class="testimonials-grid">
          <TestimonialCard
            name="Juan Velozco"
            quote="Ahora no me olvido de mis pastillas y mis hijos están tranquilos. La app me permite revisar el historial y compartir avances con la familia."
            :avatar="IconMale"
            :count="5"
          />
          <TestimonialCard
            name="Maria Pardo"
            quote="La sincronización familiar nos avisa si mi papá olvidó una toma sus medicamentos a tiempo. Puedo ajustar recordatorios y estar tranquila aun desde lejos."
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
  /* Make container fill the vertical space of its section and center children */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

section {
  padding: 3.25rem 0;
  overflow: hidden;
  /* allow sections to grow if content requires it; keep generous viewport height as min */
  min-height: 58vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.section-title {
  font-size: 2.6rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  color: #1f2b6c;
}

.section-title.teal {
  color: #14b8a6;
}

.hero-section {
  /* Visual/positioning specifics for the hero */
  position: relative;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 72vh;
}

.hero-background-image {
  position: absolute;
  inset: 0;
  background-image: url("/Seccion 1(1).png");
  background-size: cover;
  background-position: center;
  filter: brightness(0.45) blur(2px);
  z-index: 0; /* bottom layer */
}

.hero-background-image::after {
  /* subtle dark overlay to increase contrast */
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(3,6,23,0.55), rgba(3,6,23,0.25));
  pointer-events: none;
}

/* galaxy canvas will be inserted as absolute element with z-index:1 by component */

.hero-content-wrapper {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: stretch;
  width: 100%;
}

.hero-inner {
  display: flex;
  align-items: stretch; /* make left and right columns equal height */
  justify-content: flex-start;
  width: 100%;
}

.hero-left {
  max-width: min(820px, 68%);
  padding: 0 clamp(20px, 6vw, 80px);
  margin-left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.hero-main-title {
  font-size: clamp(3.2rem, 8.5vw, 6.8rem);
  font-weight: 900;
  line-height: 0.98;
  color: #ffffff;
  text-shadow: 0 14px 30px rgba(0, 0, 0, 0.72);
  margin: 0 0 0.5rem 0;
  text-align: left;
  letter-spacing: -1px;
}

.hero-subline {
  font-size: clamp(2rem, 4.5vw, 3.4rem);
  font-weight: 800;
  margin: 0.2rem 0 0.6rem 0;
  color: rgba(255,255,255,0.95);
  line-height: 1.02;
}

.hero-highlight {
  background: linear-gradient(90deg,#00c2ff,#08aeea);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
  /* slight 3D feel */
  text-shadow: 0 6px 18px rgba(3, 169, 244, 0.18);
}

.hero-subtitle {
  font-weight: 600;
  font-size: clamp(1rem, 1.6vw, 1.15rem);
  color: rgba(238, 246, 255, 0.92);
  margin: 0 0 1.25rem 0;
  max-width: 760px;
  line-height: 1.6;
  opacity: 0.95;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.hero-actions-left {
  margin-top: 0.25rem;
}

.hero-right {
  margin-left: auto;
  padding-right: clamp(12px, 4vw, 80px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-right {
  display: flex;
  flex: 0 0 auto;
  align-items: stretch; /* match the height of hero-left */
  justify-content: center;
  padding-right: clamp(12px, 4vw, 60px);
  pointer-events: none; /* decorative only */
  z-index: 4;
  margin-left: auto;
}

.hero-logo {
  width: clamp(350px, 50vw, 260px);
  height: auto;
  display: block;
  background: transparent;
  border: none;
  border-radius: 16px;
  padding: 12px;
  animation: pulse 2s ease-in-out infinite;
  transform-origin: center;
}

/* Logo wrap: animated ring + glow */
.hero-logo-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%; /* stretch to match left column */
  width: auto;
  padding: 8px;
}

.hero-logo-wrap::before {
  content: '';
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: -8px;
  right: -8px;
  border-radius: 18px;
  filter: blur(14px);
  opacity: 0.9;
  animation: spin 6s linear infinite;
  z-index: 1;
}

.hero-logo-wrap::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: -6px;
  right: -6px;
  border-radius: 16px;
  z-index: 0;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0% { transform: scale(1); filter: drop-shadow(0 10px 30px rgba(0,0,0,0.45)); }
  45% { transform: scale(1.08); filter: drop-shadow(0 24px 55px rgba(0,0,0,0.6)); }
  70% { transform: scale(0.995); }
  100% { transform: scale(1); filter: drop-shadow(0 10px 30px rgba(0,0,0,0.45)); }
}

.hero-primary.product-btn.boton-primary,
.hero-primary.product-btn.boton-primary:visited {
  background: linear-gradient(90deg,#00c2ff,#08aeea);
  color: #06202a;
  border: none;
  box-shadow: 0 18px 38px rgba(3, 169, 244, 0.18), inset 0 -2px 8px rgba(0,0,0,0.06);
  padding: 14px 28px;
  border-radius: 14px;
  font-weight: 800;
}

.hero-primary.product-btn.boton-primary:hover {
  filter: brightness(0.98);
}

.hero-secondary.product-btn.boton-secondary {
  background: transparent;
  color: #e6f7fb;
  border: 2px solid rgba(255,255,255,0.16);
  box-shadow: none;
  padding: 12px 26px;
  border-radius: 12px;
  font-weight: 700;
}

.hero-secondary.product-btn.boton-secondary:hover {
  background: rgba(255,255,255,0.06);
}

.about-section {
  background-color: var(--grey-light-1);
  /* layout handled by generic section rule */
  position: relative;
  text-align: center;
}

/* Hero stats row */
.hero-stats {
  display: flex;
  justify-content: center;
  gap: clamp(1rem, 6vw, 3.5rem);
  max-width: 1100px;
  margin: 2.2rem auto 0 auto;
  padding: 0 2rem;
  align-items: flex-start;
  flex-wrap: wrap;
}

.stat {
  text-align: center;
  color: #e6f7fb;
}

.stat-number {
  font-size: clamp(1.6rem, 3.5vw, 2.6rem);
  font-weight: 900;
  color: #00c2ff;
}

.stat-label {
  font-size: 0.95rem;
  margin-top: 0.35rem;
  color: rgba(230,247,251,0.9);
  opacity: 0.95;
  letter-spacing: 0.2px;
}


.about-grid {
  display: grid;
  grid-template-columns: 58% 42%; /* give the text more room so it won't overflow and show a scrollbar */
  align-items: center;
  gap: 3.5rem;
}

.about-blob {
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 1.6rem 1.75rem;
  box-shadow: 0 10px 30px rgba(15,33,71,0.06);
  max-height: none; /* allow content to flow, avoid inner scrollbar */
  overflow: visible;
  text-align: left;
  position: relative;
  border: 1px solid rgba(15,33,71,0.04);
}

.about-blob::before {
  content: '';
  position: absolute;
  left: 18px;
  top: 14px;
  width: 8px;
  height: 36px;
  border-radius: 6px;
  background: linear-gradient(180deg,#00c2ff,#08aeea);
  opacity: 0.95;
}

.about-blob p {
  font-size: 1.04rem;
  line-height: 1.72;
  color: var(--grey-dark-1);
  text-align: left;
  margin: 0 0 0.8rem 0;
}

.about-illustration {
  display: flex;
  justify-content: center;
}

.about-illustration img {
  width: auto;
  max-width: 360px;
  max-height: 40vh;
  height: auto;
  object-fit: contain;
}

.products-section {
  background-color: #f1f5f9;
  /* Ensure content is centered within the fixed-height section */
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 1100px;
}

.product-row.reverse {
  direction: rtl;
}

.product-row.reverse > * {
  direction: ltr;
}

.description-blob {
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 1.5rem 1.6rem;
  box-shadow: 0 10px 28px rgba(15,33,71,0.05);
  max-height: none;
  overflow: visible;
  display: block;
  text-align: left;
  position: relative;
  border: 1px solid rgba(15,33,71,0.035);
}

.description-blob::before {
  content: '';
  position: absolute;
  left: 16px;
  top: 12px;
  width: 6px;
  height: 28px;
  border-radius: 6px;
  background: linear-gradient(180deg,#00c2ff,#08aeea);
}

.description-blob p {
  font-size: 1.03rem;
  line-height: 1.72;
  color: #475569;
  text-align: left;
  margin: 0 0 0.75rem 0;
}

.product-features {
  margin: 0.4rem 0 0.6rem 1rem;
  padding: 0;
  list-style: disc;
  color: #334155;
  font-size: 0.98rem;
}

.product-features li { margin: 0.28rem 0; }

.muted-lead { color: #64748b; font-size: 0.98rem; margin-top: 0.4rem; }

.product-cta { margin-top: 0.8rem; display:flex; gap:0.6rem; justify-content:center; }

.product-card {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.product-icon {
  max-height: 180px;
  width: auto;
  margin-bottom: 1rem;
  object-fit: contain;
}

.product-title {
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
  color: #0f2147;
}

/* Carousel styles */
.products-carousel {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.carousel-track {
  flex: 1 1 auto;
  overflow: hidden;
  display: block;
  width: 100%;
  position: relative;
}

.carousel-track > div {
  display: flex;
  width: 100%;
}

.carousel-inner {
  display: flex;
  width: calc(100% * 2); /* will naturally expand with slides count; kept generic for 2 products */
  transition: transform 0.6s cubic-bezier(.22,.9,.32,1);
  will-change: transform;
}

.carousel-slide {
  flex: 0 0 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  min-height: 1px; /* ensure visible when content small */
}

.carousel-slide .product-row {
  width: 100%;
  max-width: 1100px;
}

.carousel-slide .description-blob,
.carousel-slide .product-card {
  flex: 1 1 0;
}

/* removed debug backgrounds */

.carousel-control {
  background: rgba(255,255,255,0.85);
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(16,24,40,0.08);
}

.products-carousel {
  position: relative;
}

.carousel-control.prev { position: absolute; left: 8px; z-index: 3; }
.carousel-control.next { position: absolute; right: 8px; z-index: 3; }

.carousel-dots {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1rem;
}

.carousel-dots button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: #cbd5e1;
  cursor: pointer;
}

.carousel-dots button.active {
  background: #0f2147;
}

.testimonials-section {
  background-color: var(--grey-light-1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
  width: 100%;
  max-width: 1000px;
  padding: 1rem 0;
  max-height: 48vh;
  overflow-y: auto;
  align-items: start;
}

.testimonial-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1rem 1.15rem;
  background: #ffffff;
  border-radius: 0.85rem;
  box-shadow: 0 6px 18px rgba(15,33,71,0.05);
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
    font-size: clamp(2.6rem, 7vw, 4rem);
    text-align: left;
  }

  /* Make right logo sit a bit closer to content on medium screens */
  .hero-right { right: clamp(12px, 3vw, 40px); }

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
    width: 65%;
    max-width: 360px;
    height: auto;
  }
}

@media (max-width: 768px) {
  section {
    padding: 3rem 0;
    /* On small screens allow sections to size naturally */
    height: auto;
    display: block;
  }

  .home-container {
    padding: 0 1rem;
    /* undo full-height centering on small screens so content flows naturally */
    height: auto;
    display: block;
  }

  .section-title {
    font-size: 1.8rem;
    margin-bottom: 2.5rem;
  }

  .hero-section {
    height: auto;
    padding: 3.5rem 0 2rem 0;
  }

  .hero-main-title {
    font-size: 1.8rem;
    text-align: left;
    line-height: 1.05;
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

  /* Hide right logo on small screens */
  .hero-right { display: none; }
}

/* Small polish: prevent hero-title overflow and ensure good margin on very large screens */
@media (min-width: 1400px) {
  .hero-left { padding-left: 6rem; }
  .hero-main-title { letter-spacing: -2px; }
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
