<template>
  <div class="product-view">

    <!-- HERO / TÍTULO DE LA PÁGINA -->
    <section class="product-hero">
      <div class="product-container">
        <h1 class="product-hero-title">Producto</h1>
      </div>
    </section>

    <!-- BLOQUE PRINCIPAL -->
    <section class="product-intro">
      <div class="product-container product-intro-grid">
        <div class="product-intro-text">
          <h2 class="product-intro-heading">
            Nunca Olvides tus<br />Medicamentos
          </h2>
          <p class="product-intro-lead">
            Recibe recordatorios y realiza un seguimiento de tus tareas
            importantes de forma sencilla. Administra tus recordatorios,
            confirma tareas y comparte el estado con tu familia desde tu
            teléfono.
          </p>
          <div class="product-intro-actions">
            <router-link to="/contacto" class="product-btn product-btn-light">
              Contactanos
            </router-link>
            <router-link to="/sobre-nosotros" class="product-btn product-btn-dark">
              Sobre Nosotros
            </router-link>
          </div>
        </div>

        <div class="product-intro-media">
          <div class="product-device">
            <i class="bi bi-smartwatch product-device-icon"></i>
            <h3 class="product-device-title">
              VITAL<br />RECORDER
            </h3>
          </div>
        </div>
      </div>
    </section>

    <!-- CARACTERÍSTICAS -->
    <section class="product-features">
      <div class="product-container">
        <h2 class="product-section-title">Características que Cuidan de Ti</h2>

        <div class="product-features-grid">
          <article class="product-feature-card">
            <i class="bi bi-bell product-feature-icon"></i>
            <h3 class="product-feature-title">Recordatorios inteligentes</h3>
            <p class="product-feature-text">Alertas de dosis oportunas.</p>
          </article>

          <article class="product-feature-card">
            <i class="bi bi-wifi product-feature-icon"></i>
            <h3 class="product-feature-title">Sincronización familiar</h3>
            <p class="product-feature-text">
              Comparte avisos y estado en tiempo real.
            </p>
          </article>

          <article class="product-feature-card">
            <i class="bi bi-gear product-feature-icon"></i>
            <h3 class="product-feature-title">Fácil de configurar</h3>
            <p class="product-feature-text">App intuitiva y amigable.</p>
          </article>

          <article class="product-feature-card">
            <i class="bi bi-shield-check product-feature-icon"></i>
            <h3 class="product-feature-title">Cómodo y seguro</h3>
            <p class="product-feature-text">Pulsera ligera y resistente.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- PARA QUIÉN ES -->
    <section class="product-forwho">
      <div class="product-container">
        <h2 class="product-section-title">¿Para Quién es Vital Recorder?</h2>
        <p class="product-forwho-lead">
          Diseñado para que cualquier persona pueda mantenerse al día sin
          complicaciones. Vital Recorder es ideal para…
        </p>

        <div class="product-forwho-grid">
          <article class="product-forwho-card">
            <i class="bi bi-person-bounding-box product-forwho-icon"></i>
            <h3 class="product-forwho-title">Adultos Mayores</h3>
          </article>

          <article class="product-forwho-card">
            <i class="bi bi-capsule-pill product-forwho-icon"></i>
            <h3 class="product-forwho-title">Tratamientos Médicos</h3>
          </article>

          <article class="product-forwho-card">
            <i class="bi bi-people product-forwho-icon"></i>
            <h3 class="product-forwho-title">Familiares y Cuidadores</h3>
          </article>

          <article class="product-forwho-card">
            <i class="bi bi-brightness-alt-high product-forwho-icon"></i>
            <h3 class="product-forwho-title">Olvidos Frecuentes</h3>
          </article>
        </div>
      </div>
    </section>

    <!-- TESTIMONIOS -->
    <section class="product-testimonials">
      <div class="product-container">
        <h2 class="product-section-title">Lo que dicen nuestros usuarios</h2>

        <div class="product-testimonials-grid">
          <article class="product-testimonial-card">
            <header class="product-testimonial-header">
              <span class="product-testimonial-name">Juan Velozco</span>
              <span class="product-stars">
                <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i
                ><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i
                ><i class="bi bi-star-fill"></i>
              </span>
            </header>
            <div class="product-testimonial-body">
              <i class="bi bi-person-circle product-avatar"></i>
              <p class="product-quote">
                “Ahora no me olvido de mis pastillas y mis hijos están tranquilos”
              </p>
            </div>
          </article>

          <article class="product-testimonial-card">
            <header class="product-testimonial-header">
              <span class="product-testimonial-name">Maria Pardo</span>
              <span class="product-stars">
                <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i
                ><i class="bi bi-star-fill"></i>
              </span>
            </header>
            <div class="product-testimonial-body">
              <i class="bi bi-person-circle product-avatar"></i>
              <p class="product-quote">
                “La sincronización familiar nos avisa si mi papá olvidó una toma
                a tiempo”
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="product-cta">
      <div class="product-container product-cta-grid">
        <div class="product-cta-textbox">
          <p>
            Administra tus recordatorios, confirma tareas y comparte el estado con
            tu familia desde tu teléfono.
          </p>
        </div>

        <div class="product-cta-media">
          <div class="product-device product-device-sm">
            <i class="bi bi-smartwatch product-device-icon"></i>
            <h3 class="product-device-title">VITAL<br />RECORDER</h3>
          </div>

          <div class="product-store-row">
            <a class="product-store-btn" href="#" aria-label="Google Play">
              <i class="bi bi-google-play"></i>
              <span>Google Play</span>
            </a>
            <a class="product-store-btn" href="#" aria-label="App Store">
              <i class="bi bi-apple"></i>
              <span>App Store</span>
            </a>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
// No se requiere lógica por ahora.
// Si vas a cargar assets propios, impórtalos aquí y úsalos en <img :src="...">
</script>

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
}

/* Botones */
.product-btn {
  display: inline-block;
  padding: 0.75rem 1.25rem;
  font-weight: 700;
  border-radius: 12px;
  text-decoration: none;
  transition: transform .2s ease, box-shadow .2s ease, background-color .2s ease;
  border: 2px solid transparent;
}
.product-btn:hover { transform: translateY(-2px); }
.product-btn-light {
  background: #e8f0ff;
  color: #0f2147;
  border-color: #a6c2ff;
}
.product-btn-dark {
  background: #0f2147;
  color: #fff;
  border-color: #0f2147;
}
.product-btn-dark:hover { background:#1b2e63; }

/* HERO */
.product-hero {
  background: linear-gradient(90deg,#00f2fe,#4481eb);
  padding: 2.5rem 0 1rem;
}
.product-hero-title {
  font-size: 3rem;
  font-weight: 900;
  text-align: center;
  color: #0f2147;
  text-decoration: underline 6px rgba(15,33,71,.3);
  text-underline-offset: .5rem;
}

/* INTRO */
.product-intro {
  background: linear-gradient(135deg,#53e0f3 0%, #2a74ff 100%);
  padding: 2.5rem 0 3.5rem;
  color: #fff;
}
.product-intro-grid {
  display: grid;
  grid-template-columns: 1.25fr .75fr;
  gap: 2rem;
  align-items: center;
  border: 1px dashed rgba(255,255,255,.35);
  padding: 2rem;
  border-radius: 16px;
  backdrop-filter: blur(2px);
}
.product-intro-heading {
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 900;
  line-height: 1.15;
  margin: 0 0 1rem;
  color: #0b1634;
}
.product-intro-lead {
  font-size: 1.15rem;
  line-height: 1.6;
  color: #f2f6ff;
  font-weight: 600;
  margin: 0 0 1.5rem;
}
.product-intro-actions { display:flex; gap:1rem; flex-wrap:wrap; }

.product-intro-media { display:flex; justify-content:center; }
.product-device {
  background:#ffffff;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(15,33,71,.18);
  padding: 1.25rem 1.75rem;
  text-align: center;
}
.product-device-sm { padding: .9rem 1.25rem; }
.product-device-icon {
  font-size: clamp(3.5rem, 7vw, 5.5rem);
  background: linear-gradient(90deg,#00f2fe,#4481eb);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.product-device-title {
  margin: .25rem 0 0;
  font-size: clamp(1.25rem, 3.5vw, 2.25rem);
  font-weight: 900;
  color:#0f2147;
  letter-spacing:.5px;
}

/* FEATURES */
.product-features {
  background:#f5f7fb;
  padding: 3.5rem 0;
}
.product-section-title {
  text-align: center;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 900;
  margin: 0 0 2rem;
  color:#0f2147;
}
.product-features-grid {
  display:grid;
  grid-template-columns: repeat(4,1fr);
  gap: 1.25rem;
}
.product-feature-card {
  background:#fff;
  border-radius: 14px;
  padding: 1.5rem;
  box-shadow: 0 6px 18px rgba(0,0,0,.06);
  text-align: center;
}
.product-feature-icon {
  font-size: 3rem;
  margin-bottom: .5rem;
  background: linear-gradient(90deg,#00f2fe,#4481eb);
  -webkit-background-clip:text;
  background-clip:text;
  color:transparent;
}
.product-feature-title {
  font-size: 1.05rem;
  font-weight: 800;
  margin: .25rem 0 .35rem;
  color:#0f2147;
}
.product-feature-text { color:#5b6575; }

/* FOR WHO */
.product-forwho {
  background: linear-gradient(135deg,#4f9dfd 0%, #20dff1 100%);
  padding: 3.5rem 0;
  color:#0b1634;
}
.product-forwho-lead {
  text-align:center;
  color:#0b1634;
  font-weight:600;
  margin: .25rem auto 2rem;
  max-width: 820px;
}
.product-forwho-grid {
  display:grid;
  grid-template-columns: repeat(4,1fr);
  gap: 1.25rem;
}
.product-forwho-card {
  background: #ffffff;
  border-radius: 18px;
  padding: 1.25rem;
  text-align:center;
  box-shadow: 0 10px 26px rgba(15,33,71,.14);
}
.product-forwho-icon {
  font-size: 3rem;
  margin-bottom: .35rem;
  background: linear-gradient(90deg,#00f2fe,#4481eb);
  -webkit-background-clip:text;
  background-clip:text;
  color:transparent;
}
.product-forwho-title {
  margin: 0;
  font-weight: 800;
  color:#0f2147;
}

/* TESTIMONIOS */
.product-testimonials {
  background: #f5f7fb;
  padding: 3.5rem 0;
}
.product-testimonials-grid {
  display:grid;
  grid-template-columns: repeat(2,1fr);
  gap: 1.5rem;
}
.product-testimonial-card {
  background:#fff;
  border-radius: 14px;
  padding: 1.5rem;
  box-shadow: 0 8px 20px rgba(0,0,0,.08);
  display:flex; flex-direction:column; gap:1rem;
}
.product-testimonial-header {
  display:flex; align-items:center; justify-content:space-between;
}
.product-testimonial-name { font-weight:800; color:#0f2147; }
.product-stars { display:flex; gap:.25rem; color:#f1b300; }
.product-testimonial-body { display:flex; align-items:center; gap:1rem; }
.product-avatar {
  font-size: 3.25rem;
  background: linear-gradient(90deg,#00f2fe,#4481eb);
  -webkit-background-clip:text; background-clip:text; color:transparent;
}
.product-quote { margin:0; color:#5b6575; }

/* CTA */
.product-cta {
  background: linear-gradient(135deg,#20dff1 0%, #4f9dfd 100%);
  padding: 3.25rem 0;
}
.product-cta-grid {
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items:center;
}
.product-cta-textbox {
  background:#ffffff;
  border-radius: 24px;
  padding: 1.75rem;
  box-shadow: 0 14px 30px rgba(15,33,71,.18);
  font-size: 1.25rem;
  line-height: 1.55;
  color:#0f2147;
  font-weight: 700;
}
.product-cta-media { text-align:center; }
.product-store-row {
  margin-top: .85rem;
  display:flex; gap:.75rem; justify-content:center; flex-wrap:wrap;
}
.product-store-btn {
  display:flex; align-items:center; gap:.5rem;
  padding:.65rem 1rem; border-radius:10px;
  background:#0f2147; color:#fff; text-decoration:none; font-weight:700;
  box-shadow: 0 8px 18px rgba(15,33,71,.25);
}
.product-store-btn i { font-size: 1.1rem; }

/* Responsive */
@media (max-width: 1000px) {
  .product-intro-grid { grid-template-columns: 1fr; }
  .product-features-grid { grid-template-columns: repeat(2,1fr); }
  .product-forwho-grid { grid-template-columns: repeat(2,1fr); }
  .product-cta-grid { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .product-testimonials-grid { grid-template-columns: 1fr; }
}
</style>
