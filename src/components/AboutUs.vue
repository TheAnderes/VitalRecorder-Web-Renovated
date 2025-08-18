<template>
  <div class="about-us-page">
    <!-- ===== SECCIÓN 1: SOBRE NOSOTROS ===== -->
    <section class="hero-section">
      <div class="container">
        <h1 class="main-title"><span>Sobre Nosotros</span></h1>

        <div class="hero-content">
          <div class="info-card">
            <h2>Acerca de Nosotros</h2>
            <p>
              Somos una empresa que busca soluciones tecnológicas innovadoras,
              que puedan mejorar la calidad de vida de las personas, ofreciendo productos como
              soluciones a problemas del día a día a personas de todas las edades.
            </p>
          </div>

          <div class="image-container">
            <img :src="teamImage" alt="Equipo de trabajo en una reunión">
          </div>
        </div>
      </div>
    </section>

    <!-- ===== SECCIÓN 2: QUIÉNES SOMOS ===== -->
    <section class="who-we-are-section">
      <div class="container">
        <h2 class="section-title">Quiénes Somos</h2>

        <div class="mission-vision-values">
          <!-- Misión al centro -->
          <div class="details-card mission">
            <h3>Nuestra Misión</h3>
            <p>
              Nuestra misión es crear tecnología que se adapte a la vida de las personas, no al revés.
            </p>
          </div>

          <!-- Visión a la izquierda -->
          <div class="details-card small">
            <h3>Visión</h3>
            <p>
              Ser la empresa líder en soluciones tecnológicas para el bienestar y la autonomía de las
              personas en Latinoamérica.
            </p>
          </div>

          <!-- Valores a la derecha -->
          <div class="details-card small">
            <h3>Valores</h3>
            <ul>
              <li>Innovación</li>
              <li>Empatía</li>
              <li>Confianza</li>
              <li>Accesibilidad</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== SECCIÓN 3: EQUIPO ===== -->
    <section class="team-section">
      <div class="container">
        <h2 class="section-title team-title">Conoce a Nuestro Equipo</h2>

        <div class="team-grid">
          <div
            v-for="member in teamMembers"
            :key="member.name"
            class="team-member-card"
          >
            <p class="member-name" v-html="member.name.replace('\n','<br>')"></p>

            <!-- Avatar circular debajo del nombre -->
            <div class="avatar" :title="member.name.replace('\n',' ')">
              <template v-if="member.photo">
                <img :src="member.photo" :alt="`Foto de ${member.name}`" />
              </template>
              <template v-else>
                <span class="initials">{{ getInitials(member.name) }}</span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import teamImage from '@/assets/us.jpg' // cambia por tu ruta si es distinto

// Puedes asignar 'photo' si ya tienes imágenes por persona.
// Si 'photo' es null, se mostrarán iniciales dentro del círculo.
const teamMembers = ref([
  { name: 'Josue\nGuevara',  photo: null },
  { name: 'Fernando\nChoque', photo: null },
  { name: 'Carla\nArancibia', photo: null },
  { name: 'Denis\nRamos',     photo: null },
  { name: 'Andres\nMarca',    photo: null },
])

/** Devuelve iniciales desde "Nombre\nApellido" o "Nombre Apellido" */
const getInitials = (fullName) => {
  const clear = fullName.replace('\n', ' ').trim()
  return clear
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('')
}
</script>

<style scoped>
/* ===== Base ===== */
.about-us-page {
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: #1a1a1a;
}

.container {
  width: min(1100px, 92%);
  margin: 0 auto;
  padding: 3.5rem 0;
}

.section-title {
  text-align: center;
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 800;
  margin: 0 0 2rem;
}

/* ===== Sección 1 ===== */
.hero-section {
  background: linear-gradient(135deg, #4e54c8, #00c6ff);
  color: white;
  padding: 3rem 0;
  width: 100%;
  margin: 0;
}

.main-title {
  text-align: center;
  font-size: clamp(2.2rem, 4vw, 2.8rem);
  margin: 0 0 2.2rem;
  letter-spacing: .3px;
}

.main-title span {
  border-bottom: 3px solid rgba(255,255,255,.85);
  padding-bottom: .2rem;
}

.hero-content {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 1.6rem;
  align-items: center;
}

.info-card {
  background: #fff;
  color: #2b2b2b;
  padding: 1.6rem 1.8rem;
  border-radius: 18px;
  box-shadow: 0 12px 28px rgba(0,0,0,.12);
}

.info-card h2 {
  font-size: 1.15rem;
  margin: 0 0 .6rem;
  color: #0f1f3a;
  font-weight: 800;
}

.info-card p {
  line-height: 1.6;
  margin: 0;
}

.image-container {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 14px 28px rgba(0,0,0,.18);
}

.image-container img {
  width: 100%;
  height: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
}

/* ===== Sección 2 ===== */
.who-we-are-section {
  background: #f7f9fb;
}

.mission-vision-values {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.2rem 2rem;
  justify-items: center;
}

.details-card {
  background: #fff;
  padding: 1.5rem 1.6rem;
  border-radius: 14px;
  box-shadow: 0 8px 22px rgba(0,0,0,.07);
  text-align: center;
  width: min(560px, 100%);
}

.details-card h3 {
  font-size: 1.15rem;
  margin: 0 0 .6rem;
  color: #0f1f3a;
  font-weight: 800;
}

.details-card p { margin: 0; line-height: 1.6; }

.details-card.small {
  width: min(420px, 100%);
}

.details-card ul {
  margin: .2rem 0 0;
  padding: 0;
  list-style: none;
  text-align: left;
  display: inline-block;
}
.details-card li { margin: .28rem 0; }
.details-card li::before {
  content: '•';
  color: #00c6ff;
  font-weight: 900;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

/* En pantallas medianas/grandes, la misión al centro arriba, visión y valores abajo */
@media (min-width: 820px) {
  .mission-vision-values {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "mission mission"
      "vision values";
  }
  .mission { grid-area: mission; }
  .details-card.small:nth-of-type(2) { grid-area: vision; }
  .details-card.small:nth-of-type(3) { grid-area: values; }
}

/* ===== Sección 3 ===== */
.team-section {
  background: linear-gradient(135deg, #4e54c8 0%, #00c6ff 100%);
}

.team-title { color: #0d2a4c; }

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 1.4rem;
}

.team-member-card {
  background: #fff;
  padding: 1.2rem 1rem 1.5rem;
  border-radius: 18px;
  text-align: center;
  box-shadow: 0 12px 28px rgba(0,0,0,.12);
}

.member-name {
  font-size: 1.06rem;
  font-weight: 800;
  color: #2b2b2b;
  line-height: 1.2;
  margin: 0 0 .9rem;
  white-space: pre-wrap;
}

/* Avatar circular debajo del nombre */
.avatar {
  width: 112px;
  height: 112px;
  margin: 0 auto;
  border-radius: 999px;
  border: 4px solid #e9eef6;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.04), 0 6px 18px rgba(0,0,0,.10);
  display: grid;
  place-items: center;
  background: #f6f8fb;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.initials {
  font-weight: 800;
  font-size: 1.4rem;
  color: #3a4b6a;
  letter-spacing: .5px;
}

/* ===== Responsive ===== */
@media (max-width: 820px) {
  .hero-content { grid-template-columns: 1fr; }
  .image-container img { aspect-ratio: 16 / 10; }
}
</style>
