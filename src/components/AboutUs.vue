<script setup>
import { onMounted, onUnmounted } from "vue";

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
  <div class="about-view">
    <section class="hero-section">
      <div class="hero-background-image"></div>
      <div class="hero-content-wrapper">
        <h1 class="hero-main-title">Sobre Nosotros</h1>
        <div class="hero-content-box">
          <h2>Acerca de Nosotros</h2>
          <p>
            Somos una empresa que busca soluciones tecnológicas innovadoras, que
            puedan mejorar la calidad de vida de las personas, ofreciendo
            productos como soluciones a problemas del día a día a personas de
            todas las edades.
          </p>
        </div>
      </div>
    </section>

    <section class="mission-section fade-in-on-scroll">
      <div class="about-container">
        <h2 class="section-title">Quiénes Somos</h2>
        <div class="mission-grid">
          <div class="mission-blob">
            <h3>Nuestra Misión</h3>
            <p>
              Nuestra misión es crear tecnología que se adapte a la vida de las
              personas, no al revés.
            </p>
          </div>
          <div class="mission-blob">
            <h3>Visión</h3>
            <p>
              Ser la empresa líder en soluciones tecnológicas para el bienestar
              y la autonomía de las personas en Latinoamérica.
            </p>
          </div>
        </div>
        <div class="values-blob-wrapper">
          <div class="mission-blob values-blob">
            <h3>Valores</h3>
            <p>Nuestros valores son:</p>
            <ul>
              <li style="font-size: 16px;">Innovación</li>
              <li style="font-size: 16px;">Empatía</li>
              <li style="font-size: 16px;">Confianza</li>
              <li style="font-size: 16px;">Accesibilidad</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="team-section fade-in-on-scroll">
      <div class="about-container">
        <h2 class="section-title teal">Conoce a Nuestro Equipo</h2>
        <div class="team-grid">
          <div class="team-member-card">Fernando Choque</div>
          <div class="team-member-card">Denis Ramos</div>
          <div class="team-member-card">Andres Marca</div>
          <div class="team-member-card">Carla Arancibia</div>
          <div class="team-member-card">Josue Guevara</div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-view {
  font-family: "Poppins", "Inter", sans-serif;
  color: #0f2147;
  background-color: #ffffff;
}

.about-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

section {
  padding: 6rem 0;
  overflow: hidden;
}

.section-title {
  font-size: 2.7rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
}
.section-title.teal {
  color: #14b8a6;
}

.hero-section {
  height: 95vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  box-sizing:border-box;
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
  text-decoration: underline;
  text-underline-offset: 10px;
  margin: 0;
}
.hero-content-box {
  background: rgba(255, 255, 255, 0.2);
  padding: 3rem 4rem;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}
.hero-content-box h2 {
  font-size: 1.8rem;
  font-weight: 900;
  margin: 0 0 1rem 0;
}
.hero-content-box p {
  font-weight: 500;
  font-size: 1.35rem;
  max-width: 600px;
  color: #000000;
  margin: 0;
}

.mission-section {
  background-color: #f1f5f9;
  height: 95vh;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.mission-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}
.mission-blob {
  background-color: #ffffff;
  border-radius: 40px;
  width: 400px;
  padding: 0.5rem;
  box-shadow: 7px 7px 20px #4481eb;
  text-align: center;
}
.mission-blob h3 {
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #1f2b6c;
}
.mission-blob p {
  font-size: 1.3rem;
  line-height: 1.7;
  color: #334155;
  margin: 0;
}
.mission-blob ul {
  font-size: 1.3rem;
  margin: 0;
}

.values-blob-wrapper {
  display: flex;
  justify-content: center;
}
.values-blob {
  max-width: 50%;
}
.values-blob ul {
  list-style: none;
  padding: 0;
  margin-top: 0.5rem;
  display: inline-block;
  text-align: left;
}
.values-blob li {
  margin-bottom: 0.5rem;
}
.values-blob li::before {
  content: "•";
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

.team-section {
  background-color: #f1f5f9;
}
.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
.team-member-card {
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 7px 7px 20px 0px rgba(0, 242, 254, 0.5);
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #334155;
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
  .about-container {
    max-width: 100%;
    padding: 0 16px;
  }

  section {
    padding: 32px 0; /* menos aire en móvil */
  }

  .section-title {
    font-size: clamp(1.35rem, 6.5vw, 1.9rem);
    margin-bottom: 1rem;
  }

  /* HERO */
  .hero-section {
    height: auto;              /* quita 95vh */
    padding: 48px 0 28px;
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
    text-underline-offset: 6px;
    text-shadow: 0 4px 10px rgba(0,0,0,.45);
  }
  .hero-content-box {
    width: 100%;
    padding: 14px 16px;
    border-radius: 14px;
    backdrop-filter: blur(6px);
  }
  .hero-content-box h2 {
    font-size: clamp(1.1rem, 5.5vw, 1.3rem);
    margin-bottom: .5rem;
  }
  .hero-content-box p {
    font-size: clamp(1rem, 4.4vw, 1.1rem);
    max-width: 100%;
  }

  /* MISIÓN / VISIÓN / VALORES */
  .mission-section {
    height: auto;           /* quita 95vh */
    padding: 28px 0;
    margin: 0;
  }
  .mission-grid {
    grid-template-columns: 1fr; /* apilar */
    gap: 14px;
    margin-bottom: 16px;
  }
  .mission-blob {
    width: 100%;            /* antes: 400px */
    padding: 14px;
    border-radius: 18px;
    box-shadow: 4px 6px 14px rgba(68,129,235,.35);
    box-sizing: border-box;
  }
  .mission-blob h3 {
    font-size: clamp(1.1rem, 5.5vw, 1.3rem);
    margin-bottom: .5rem;
  }
  .mission-blob p,
  .mission-blob ul {
    font-size: clamp(0.98rem, 4.3vw, 1.05rem);
    line-height: 1.55;
  }

  .values-blob-wrapper {
    justify-content: stretch;
  }
  .values-blob {
    max-width: 100%;
  }
  .values-blob ul {
    margin-top: .25rem;
  }

  /* EQUIPO */
  .team-section { padding: 28px 0; }
  .team-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas en móvil ancho */
    gap: 14px;
  }
  .team-member-card {
    padding: 16px;
    font-size: 1.05rem;
    border-radius: 16px;
    box-shadow: 4px 6px 14px rgba(0,242,254,.35);
  }

  /* Animación más corta en móvil */
  .fade-in-on-scroll {
    transform: translateY(24px);
  }
}

/* ===== EXTRA PEQUEÑO (≤480px) ===== */
@media (max-width: 480px) {
  .team-grid {
    grid-template-columns: 1fr; /* una columna en pantallas muy pequeñas */
  }
  .mission-blob { padding: 12px; border-radius: 14px; }
  .hero-content-box { padding: 12px; border-radius: 12px; }
}

/* Evita scroll horizontal accidental */
:root, html, body { overflow-x: hidden; }
</style>
