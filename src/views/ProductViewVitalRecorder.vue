<script setup>
import CharacteristicCard from "@/components/CharacteristicCard.vue";
import ForWhoCard from "@/components/ForWhoCard.vue";
import HowCard from "@/components/HowCard.vue";
import PointViewCard from "@/components/PointViewCard.vue";
import TestimonialCard from "@/components/TestimonialCard.vue";
import IntroIconButtonCard from "@/components/IntroIconButtonCard.vue";

import IconWathVital from "@/components/icons/IconWathVitalRecorder.svg";
import IconGooglePlay from "@/components/icons/IconGooglePlay.svg";

import ButtonPrimary from "@/components/PrimaryButton.vue";
import ButtonSecondary from "@/components/SecondaryButton.vue";

import IconWath from "@/components/icons/IconWatch.svg";
import IconSincron from "@/components/icons/IconSincron.svg";
import IconConfigure from "@/components/icons/IconConfigure.svg";
import IconSave from "@/components/icons/IconSave.svg";
import IconWathInteligent from "@/components/icons/IconWathInteligent.svg";

import IconConfigureApp from "@/components/icons/IconConfigureApp.svg";
import IconHandWatch from "@/components/icons/IconHandWatch.svg";
import IconShare from "@/components/icons/IconShare.svg";
import IconApp from "@/components/icons/IconApp.svg";
import IconRegister from "@/components/icons/IconRegister.svg";
import IconAlertPhone from "@/components/icons/IconAlertPhone.svg";

import IconRank from "@/components/icons/IconRank.svg";
import IconRing from "@/components/icons/IconRing.svg";
import IconSupport from "@/components/icons/IconSupport.svg";
import IconSecurity from "@/components/icons/IconSecurity.svg";

import IconOld from "@/components/icons/IconOld.svg";
import IconMedic from "@/components/icons/IconMedic.svg";
import IconFamili from "@/components/icons/IconFamili.svg";
import IconThing from "@/components/icons/IconThing.svg";

import IconMale from "@/components/icons/IconMale.svg";
import IconFemale from "@/components/icons/IconFemale.svg";
import PrimaryButton from "@/components/PrimaryButton.vue";

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
    <!-- BLOQUE PRINCIPAL -->
    <section class="product-intro">
      <div class="product-view-vital-recorder-image"></div>
      <div class="product-view-content-wrapper">
        <h1 class="product-hero-title">Vital Recorder</h1>
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
              <PrimaryButton root="contact-us" name="Contactanos" />

              <!--Puedes añadir al BottonPrimary una propiedad icon para los iconos y eliminar el name-->
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CARACTERÍSTICAS -->
    <section class="product-features fade-in-on-scroll">
      <div class="product-container">
        <h2 class="product-section-title">Características que Cuidan de Ti</h2>
        <!-- Targetas de Caracteristicas -->
        <div class="product-features-grid">
          <CharacteristicCard
            :icon="IconConfigure"
            title="Fácil de configurar"
            text="App intuitiva y amigable."
          />
          <CharacteristicCard
            :icon="IconSave"
            title="Seguridad y bienestar"
            text="Notificaciones garantisadas"
          />
          <CharacteristicCard
            :icon="IconWathInteligent"
            title="Manilla Inteligente"
            text="Pulsera ligera, elegante y discreta"
          />
          <CharacteristicCard
            :icon="IconWath"
            title="Recordatorios inteligentes"
            text="Alertas de dosis oportunas."
          />
          <CharacteristicCard
            :icon="IconSincron"
            title="Sincronización familiar"
            text="Comparte avisos y estado en tiempo real"
          />
        </div>
      </div>
    </section>

    <!-- PARA QUIÉN ES -->
    <section class="product-forwho fade-in-on-scroll">
      <div class="product-container">
        <h2 class="product-section-title">Beneficios de Vital Recorder</h2>
        <p class="product-forwho-lead">
          Diseñado para que cualquier persona pueda mantenerse al día sin
          complicaciones.
        </p>
        <!-- PARA QUIÉN ES TARGETAS-->
        <div class="product-forwho-grid">
          <ForWhoCard :icon="IconFamili" title="Familiares y Cuidadores" />

          <!-- puedes eliminar el icon y solo poner el texto se acomodara solo al medio -->
          <ForWhoCard :icon="IconMedic" title="Tratamientos Medicos" />
          <ForWhoCard :icon="IconOld" title="Personas Mayores" />
          <ForWhoCard
            :icon="IconThing"
            title="Personas con olvidos frecuentes"
          />
        </div>
        <p class="product-forwho-lead">Vital Recorder te ayuda a...</p>
        <div class="product-forwho-grid">
          <ForWhoCard
            title="Mejorar la adherencia a tratamientos farmacológicos."
          />
          <!-- puedes eliminar el icon y solo poner el texto se acomodara solo al medio -->
          <ForWhoCard
            title="Reducir el estrés y la preocupación de los familiares."
          />
          <ForWhoCard
            title="Promover la independencia y autonomía del adulto mayor."
          />
          <ForWhoCard
            title="Facilitar la comunicación y el seguimiento de la salud."
          />
        </div>
      </div>
    </section>

    <!-- CÓMO FUNCIONA -->
    <section class="product-how fade-in-on-scroll">
      <div class="product-container">
        <h2 class="product-section-title">¿Cómo funciona Vital Recorder?</h2>

        <div class="product-how-grid">
          <HowCard
            :step="1"
            title="Configura en la app"
            text="Descarga la aplicación en Google Play."
            :icon="IconApp"
            url="https://drive.google.com/file/d/1FBLtez45J4G_fFIrxSOwskCGbpu0vmK1/view?usp=sharing"
          />
          <HowCard
            :step="2"
            title="Configuración Rápida"
            text="Programa los horarios de tus medicamentos, citas médicas y tareas importantes."
            :icon="IconConfigureApp"
          />
          <HowCard
            :step="3"
            title="Sincronización Inteligente"
            text="La manilla se sincroniza automáticamente con tu aplicación."
            :icon="IconHandWatch"
          />
          <HowCard
            :step="4"
            title="Recordatorio en tu Muñeca"
            text="Cuando es el momento de una tarea, la manilla vibra y se alumbra."
            :icon="IconShare"
          />
          <HowCard
            :step="5"
            title="Confirmación y Registro"
            text="El usuario confirma la tarea. Vital Recorder registra un historial."
            :icon="IconRegister"
          />
          <HowCard
            :step="6"
            title="Alerta a la Familia (Opcional)"
            text="Si el usuario no confirma la tarea después de un tiempo, la aplicación envía una notificación a los familiares."
            :icon="IconAlertPhone"
          />
        </div>
      </div>
    </section>

    <!-- MÉTRICAS / PRIORIDAD -->
    <section class="product-metrics fade-in-on-scroll">
      <div class="product-container">
        <h2 class="product-metrics-title">Tu bienestar es nuestra prioridad</h2>
        <p class="product-forwho-lead">
          Nuestra mayor recompensa es saber que VitalSystems hace una diferencia
          real en la vida de las personas.
        </p>
        <div class="product-metrics-grid">
          <PointViewCard :icon="IconRank" valuer="95%" Text="Satisfacción" />
          <PointViewCard :icon="IconRing" valuer="+1K" Text="Recordatorios" />
          <PointViewCard :icon="IconSupport" valuer="24/7" Text="Soporte" />
          <PointViewCard :icon="IconSecurity" valuer="100%" Text="Privacidad" />
        </div>
        <div class="DownloadContend">
          <div class="DownloadNow">
            <p>Descargalo ya</p>
            <img
              :src="IconApp"
              class="product-how-icon-mask"
              :style="[maskStyle, url ? { cursor: 'pointer' } : {}]"
              @click="openLink"
              alt="icono"
            />
          </div>
        </div>
      </div>
    </section>
    <section class="product-testimonials fade-in-on-scroll">
      <div class="product-container">
        <h2 class="product-metrics-title">Lo que dicen nuestros usuarios</h2>

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
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "https://drive.google.com/file/d/1FBLtez45J4G_fFIrxSOwskCGbpu0vmK1/view",
    };
  },
  methods: {
    openLink() {
      window.open(this.url, "_blank");
    },
  },
};
</script>

<style scoped>
/* Base */
.product-view {
  font-family: "Poppins", "Inter", system-ui, sans-serif;
  color: #0f2147;
  background: #ffffff;
}

.product-view-content-wrapper {
  z-index: 2;
}

.product-container {
  max-width: 1100px;
  margin: 0 auto;
}

/* HERO / INTRO */
.product-hero-title {
  font-family: var(--tipografia);
  font-weight: var(--black);
  font-size: 80px;
  font-weight: black;
  color: #ffffff;
  text-decoration: underline 4px #ffffff;
  text-underline-offset: 9px;
  margin: 0;
  margin-left: 70px;
  text-shadow: 0 6px 12px rgba(0, 0, 0, 0.6);
}

.product-intro {
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 10px 0 10px;
  color: #fff;
  height: 92vh;
  box-sizing: border-box;
  gap: 30px;
  background-size: 100% 120%;
  background-repeat: no-repeat;
}
.product-view-vital-recorder-image {
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("@/components/icons/ImageProductVitarRecorner.jpg");
  background-size: cover;
  background-position: center;
  filter: brightness(0.8) blur(2px);
  z-index: 1;
}
.product-intro-grid {
  display: flex;

  border-radius: 16px;
  margin: 0;
  margin-left: 70px;
}
.product-intro-heading {
  font-size: 40px;
  font-weight: black;
  text-align: center;
  line-height: 1.15;
  margin: 0 0 0.75rem;
  color: #0b1634;
  justify-content: center;
}
.product-intro-lead {
  text-align: center;
  padding: 10px;
  font-size: 27px;
  font-weight: var(--semibold);
  line-height: 1.6;
  color: #f2f6ff;
  margin: 0 0 1.5rem;
  text-align: center;
  font-family: var(--tipografia);
  width: 600px;
}
.product-intro-actions {
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
  justify-content: center;
}

.product-intro-media {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.product-device-title {
  margin: 0.2rem 0 0;
  font-size: clamp(1.1rem, 2.6vw, 1.8rem);
  font-weight: 900;
  color: #0f2147;
  letter-spacing: 0.4px;
}

/* === CARACTERÍSTICAS (COMPACTO) === */
.product-features {
  display: flex;
  align-items: center;
  background: #f5f7fb;
  height: 92vh;
  padding: 5rem 0.5rem;
  box-sizing: border-box;
}

.product-section-title {
  font-family: var(--tipografia);
  text-align: center;
  font-size: 50px;
  font-weight: var(--semibold);
  margin: 0;
  margin-top: 20px;
  color: #1f2b6c;
}
.product-features-grid {
  display: flex;
  flex-wrap: wrap;
  column-gap: 190px;
  row-gap: 20px;
  align-items: center;
  justify-content: center;
}

/* === PARA QUIÉN ES (COMPACTO) === */
.product-forwho {
  display: flex;
  padding: 0;
  color: #0b1634;
  height: 92vh;
  align-items: center;
  box-sizing: border-box;
  background: #f5f7fb;
}
.product-forwho-lead {
  font-family: var(--tipografia);
  text-align: center;
  color: #0b1634;
  font-weight: semibold;
  margin: 0.15rem auto 1.25rem;
  max-width: 1000px;
  font-size: 25px;
  margin-top: 20px;
}
.product-forwho-grid {
  display: flex;
  justify-content: center;
  gap: 55px;
}

.product-how {
  display: flex;
  background: #f5f7fb;
  padding: clamp(1.25rem, 2vw, 2rem) 0;
  height: 92vh;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
.product-how-grid {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: center;
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
  font-size: 0.9rem;
  box-shadow: 0 8px 18px rgba(15, 33, 71, 0.22);
}
.product-how-icon {
  font-size: clamp(1.8rem, 3vw, 2.2rem);
  margin: 0.2rem 0 0.45rem;
  background: linear-gradient(90deg, #00f2fe, #4481eb);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.product-how-title {
  font-size: 1rem;
  font-weight: 800;
  color: #0f2147;
  margin: 0 0 0.2rem;
}
.product-how-text {
  color: #5b6575;
  margin: 0;
  font-size: 0.95rem;
}

/* === MÉTRICAS (COMPACTO) === */
.product-metrics {
  display: flex;
  background: #f5f7fb;
  padding: 0;
  box-sizing: border-box;
  height: 92vh;
  align-items: center;
  justify-content: center;
}
.product-metrics-title {
  font-family: var(--tipografia);
  font-weight: var(--semibold);
  text-align: center;
  font-size: 60px;
  color: #0f2147;
  margin: 0 0 1rem;
  margin-bottom: 10px;
}
.product-metrics-grid {
  display: flex;
  gap: 70px;
}

.product-testimonials {
  display: flex;
  flex-direction: column;
  padding: 0;
  height: 92vh;
  align-items: center;
  justify-content: center;
  background: #f5f7fb;
  box-sizing: border-box;
}
.product-testimonials-grid {
  display: flex;
  grid-template-columns: repeat(2, 1fr);
  gap: 80px;
}
.product-intro-text {
  background: rgba(255, 255, 255, 0.4);
  padding: 20px 0;
  border-radius: 50px;
}

.DownloadNow {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
  box-shadow: 7px 7px 7px rgba(68, 129, 235, 0.4);
  width: 400px;
  height: 180px;
  font-family: var(--tipografia);
  font-weight: var(--semibold);
  font-size: 25px;
  border-radius: 20px;
}
.DownloadContend {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* ===== MOBILE ONLY (≤768px) ===== */
@media (max-width: 768px) {
  .product-container {
    max-width: 100%;
    padding: 0 16px;
  }

  /* HERO / INTRO */
  .product-intro {
    height: auto;
    padding: 48px 0 28px;
    background-size: cover;
    gap: 18px;
  }
  .product-view-vital-recorder-image {
    filter: brightness(0.78) blur(1.5px);
  }
  .product-view-content-wrapper { padding: 0 6px; }
  .product-hero-title {
    font-size: clamp(2rem, 9vw, 3rem);
    margin-left: 0;
    text-underline-offset: 6px;
    text-shadow: 0 4px 10px rgba(0,0,0,.45);
    text-align: center;
  }
  .product-intro-grid { margin-left: 0; }
  .product-intro-text {
    padding: 12px 10px;
    border-radius: 18px;
    background: rgba(255,255,255,.5);
  }
  .product-intro-heading {
    font-size: clamp(1.3rem, 6.5vw, 1.8rem);
    margin-bottom: .5rem;
  }
  .product-intro-lead {
    width: 100%;
    font-size: clamp(1rem, 4.6vw, 1.15rem);
    line-height: 1.5;
    padding: 0 8px;
    margin-bottom: 1rem;
  }
  .product-intro-actions {
    gap: 12px;
    justify-content: center;
  }
  /* Si tus botones renderizan <a>/<button>, esto los hace full width */
  .product-intro-actions :deep(a),
  .product-intro-actions :deep(button) {
    width: 100%;
    justify-content: center;
  }

  /* CARACTERÍSTICAS */
  .product-features {
    height: auto;
    padding: 32px 0;
  }
  .product-section-title {
    font-size: clamp(1.4rem, 7vw, 2rem);
    margin-top: 0;
  }
  .product-features-grid {
    column-gap: 16px;
    row-gap: 14px;
    padding: 0 2px;
  }

  /* PARA QUIÉN ES */
  .product-forwho {
    height: auto;
    padding: 28px 0;
  }
  .product-forwho-lead {
    max-width: 100%;
    font-size: clamp(1rem, 4.8vw, 1.15rem);
    margin: 10px auto 14px;
  }
  .product-forwho-grid {
    flex-wrap: wrap;
    gap: 14px;
  }

  /* CÓMO FUNCIONA */
  .product-how {
    height: auto;
    padding: 28px 0;
  }
  .product-how-grid {
    gap: 14px;
  }

  /* MÉTRICAS */
  .product-metrics {
    height: auto;
    padding: 28px 0;
  }
  .product-metrics-title {
    font-size: clamp(1.4rem, 7vw, 2.1rem);
    margin-bottom: 10px;
  }
  .product-metrics-grid {
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
  }
  .DownloadContend { padding: 0 2px; }
  .DownloadNow {
    width: 100%;
    max-width: 420px;
    height: auto;
    padding: 14px;
    font-size: clamp(1rem, 5vw, 1.2rem);
    border-radius: 16px;
    gap: 12px;
  }

  /* TESTIMONIOS */
  .product-testimonials {
    height: auto;
    padding: 28px 0;
  }
  .product-testimonials-grid {
    flex-direction: column;
    gap: 14px;
  }
}

/* ===== EXTRA PEQUEÑO (≤480px) ===== */
@media (max-width: 480px) {
  .product-intro { padding: 36px 0 22px; }
  .product-intro-text { border-radius: 14px; }
  .DownloadNow { padding: 12px; border-radius: 12px; }
}

/* Evita scroll horizontal accidental en móvil */
:root, html, body { overflow-x: hidden; }

</style>
