<template>
  <div class="product-view">
    <!-- BLOQUE PRINCIPAL -->
    <section class="product-intro">
      <h1 class="product-hero-title">Producto</h1>
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

    <!-- CÓMO FUNCIONA -->
    <section class="product-how">
      <div class="product-container">
        <h2 class="product-section-title">¿Cómo funciona Vital Recorder?</h2>

        <div class="product-how-grid">
          <article class="product-how-card">
            <div class="product-step-badge">1</div>
            <i class="bi bi-sliders2-vertical product-how-icon"></i>
            <h3 class="product-how-title">Configura en la app</h3>
            <p class="product-how-text">
              Registra medicamentos, dosis y horarios. Elige quién recibirá avisos.
            </p>
          </article>

          <article class="product-how-card">
            <div class="product-step-badge">2</div>
            <i class="bi bi-smartwatch product-how-icon"></i>
            <h3 class="product-how-title">La pulsera te avisa</h3>
            <p class="product-how-text">
              Vibración y luz en la muñeca; también notificaciones en el teléfono.
            </p>
          </article>

          <article class="product-how-card">
            <div class="product-step-badge">3</div>
            <i class="bi bi-arrow-right-circle product-how-icon"></i>
            <h3 class="product-how-title">Confirma y comparte</h3>
            <p class="product-how-text">
              Marca la toma como realizada y comparte el estado con tu familia.
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- MÉTRICAS / PRIORIDAD -->
    <section class="product-metrics">
      <div class="product-container">
        <h2 class="product-metrics-title">Tu bienestar es nuestra prioridad</h2>

        <div class="product-metrics-grid">
          <article class="product-metric-card">
            <i class="bi bi-hand-thumbs-up product-metric-icon"></i>
            <div class="product-metric-value">95%</div>
            <div class="product-metric-label">Satisfacción</div>
          </article>

          <article class="product-metric-card">
            <i class="bi bi-bell product-metric-icon"></i>
            <div class="product-metric-value">+1 K</div>
            <div class="product-metric-label">Recordatorios</div>
          </article>

          <article class="product-metric-card">
            <i class="bi bi-headset product-metric-icon"></i>
            <div class="product-metric-value">24/7</div>
            <div class="product-metric-label">Soporte</div>
          </article>

          <article class="product-metric-card">
            <i class="bi bi-shield-lock product-metric-icon"></i>
            <div class="product-metric-value">100%</div>
            <div class="product-metric-label">Privacidad</div>
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
// Sin lógica por ahora
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
  padding: 0.6rem 1rem;
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

/* HERO / INTRO */
.product-hero-title {
  font-size: clamp(1.8rem, 3.6vw, 2.6rem);
  font-weight: 900;
  text-align: center;
  color: #0f2147;
  text-decoration: underline 4px #0f2147;
  text-underline-offset: .4rem;
  margin: .5rem 0 1rem;
}

.product-intro {
  background: linear-gradient(135deg,#53e0f3 0%, #2a74ff 100%);
  padding: clamp(1.25rem, 2.5vw, 2rem) 0 clamp(1.5rem, 3vw, 2.5rem);
  color: #fff;
}
.product-intro-grid {
  display: grid;
  grid-template-columns: 1.15fr .85fr;
  gap: clamp(1rem, 2.5vw, 2rem);
  align-items: center;
  border: 1px dashed rgba(255,255,255,.35);
  padding: clamp(1rem, 2.2vw, 1.75rem);
  border-radius: 16px;
  backdrop-filter: blur(2px);
}
.product-intro-heading {
  font-size: clamp(1.6rem, 4vw, 2.6rem);
  font-weight: 900;
  line-height: 1.15;
  margin: 0 0 .75rem;
  color: #0b1634;
}
.product-intro-lead {
  font-size: clamp(.98rem, 1.3vw, 1.1rem);
  line-height: 1.55;
  color: #f2f6ff;
  font-weight: 600;
  margin: 0 0 1rem;
}
.product-intro-actions { display:flex; gap:.75rem; flex-wrap:wrap; }

.product-intro-media { display:flex; justify-content:center; }
.product-device {
  background:#ffffff;
  border-radius: 18px;
  box-shadow: 0 16px 34px rgba(15,33,71,.16);
  padding: 1rem 1.4rem;
  text-align: center;
}
.product-device-sm { padding: .8rem 1rem; }
.product-device-icon {
  font-size: clamp(2.6rem, 5vw, 4rem);
  background: linear-gradient(90deg,#00f2fe,#4481eb);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.product-device-title {
  margin: .2rem 0 0;
  font-size: clamp(1.1rem, 2.6vw, 1.8rem);
  font-weight: 900;
  color:#0f2147;
  letter-spacing:.4px;
}

/* === CARACTERÍSTICAS (COMPACTO) === */
.product-features {
  background:#f5f7fb;
  padding: clamp(1.25rem, 2vw, 2rem) 0;
}
.product-section-title {
  text-align: center;
  font-size: clamp(1.4rem, 2.2vw, 2rem);
  font-weight: 900;
  margin: 0 0 1rem;
  color:#0f2147;
}
.product-features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: clamp(.75rem, 1.6vw, 1rem);
}
.product-feature-card {
  background:#fff;
  border-radius: 12px;
  padding: clamp(1rem, 1.6vw, 1.25rem);
  box-shadow: 0 6px 16px rgba(0,0,0,.05);
  text-align: center;
}
.product-feature-icon {
  font-size: clamp(1.8rem, 3vw, 2.2rem);
  margin-bottom: .25rem;
  background: linear-gradient(90deg,#00f2fe,#4481eb);
  -webkit-background-clip:text;
  background-clip:text;
  color:transparent;
}
.product-feature-title {
  font-size: 1rem;
  font-weight: 800;
  margin: .15rem 0 .25rem;
  color:#0f2147;
}
.product-feature-text { color:#5b6575; font-size: .95rem; }

/* === PARA QUIÉN ES (COMPACTO) === */
.product-forwho {
  background: linear-gradient(135deg,#4f9dfd 0%, #20dff1 100%);
  padding: clamp(1.25rem, 2vw, 2rem) 0;
  color:#0b1634;
}
.product-forwho-lead {
  text-align:center;
  color:#0b1634;
  font-weight:600;
  margin: .15rem auto 1.25rem;
  max-width: 820px;
  font-size: clamp(.95rem, 1.2vw, 1.05rem);
}
.product-forwho-grid {
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: clamp(.75rem, 1.6vw, 1rem);
}
.product-forwho-card {
  background: #ffffff;
  border-radius: 16px;
  padding: clamp(1rem, 1.6vw, 1.25rem);
  text-align:center;
  box-shadow: 0 10px 22px rgba(15,33,71,.12);
}
.product-forwho-icon {
  font-size: clamp(1.8rem, 3vw, 2.2rem);
  margin-bottom: .25rem;
  background: linear-gradient(90deg,#00f2fe,#4481eb);
  -webkit-background-clip:text;
  background-clip:text;
  color:transparent;
}
.product-forwho-title {
  margin: 0;
  font-weight: 800;
  color:#0f2147;
  font-size: 1rem;
}

/* === CÓMO FUNCIONA (COMPACTO) === */
.product-how {
  background: #f5f7fb;
  padding: clamp(1.25rem, 2vw, 2rem) 0;
}
.product-how-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: clamp(.75rem, 1.6vw, 1rem);
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
  text-align: center;
  font-size: clamp(1.4rem, 2.2vw, 2rem);
  font-weight: 900;
  color: #0f2147;
  margin: 0 0 1rem;
}
.product-metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: clamp(.75rem, 1.6vw, 1rem);
}
.product-metric-card {
  background: #fff;
  border-radius: 18px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 12px 26px rgba(15,33,71,.16);
}
.product-metric-icon {
  font-size: clamp(1.6rem, 2.6vw, 2rem);
  margin-bottom: .25rem;
  background: linear-gradient(90deg,#00f2fe,#4481eb);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.product-metric-value {
  font-size: clamp(1.4rem, 2.4vw, 1.8rem);
  font-weight: 900;
  color: #0f2147;
  line-height: 1.1;
}
.product-metric-label {
  color: #5b6575;
  font-weight: 600;
  font-size: .95rem;
}

/* TESTIMONIOS (ligero ajuste) */
.product-testimonials {
  background: #f5f7fb;
  padding: clamp(1.25rem, 2vw, 2rem) 0;
}
.product-testimonials-grid {
  display:grid;
  grid-template-columns: repeat(2,1fr);
  gap: 1.25rem;
}
.product-testimonial-card {
  background:#fff;
  border-radius: 14px;
  padding: 1.25rem;
  box-shadow: 0 8px 18px rgba(0,0,0,.08);
  display:flex; flex-direction:column; gap:.8rem;
}
.product-testimonial-header {
  display:flex; align-items:center; justify-content:space-between;
}
.product-testimonial-name { font-weight:800; color:#0f2147; }
.product-stars { display:flex; gap:.25rem; color:#f1b300; }
.product-testimonial-body { display:flex; align-items:center; gap:.9rem; }
.product-avatar {
  font-size: 2.6rem;
  background: linear-gradient(90deg,#00f2fe,#4481eb);
  -webkit-background-clip:text; background-clip:text; color:transparent;
}
.product-quote { margin:0; color:#5b6575; }

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
</style>
