<script setup>
import CharacteristicCard from "@/components/CharacteristicCard.vue";
import ForWhoCard from "@/components/ForWhoCard.vue";
import HowCard from "@/components/HowCard.vue";
import PointViewCard from "@/components/PointViewCard.vue";
import TestimonialCard from "@/components/TestimonialCard.vue";
import IntroIconButtonCard from "@/components/IntroIconButtonCard.vue";

import IconWathVital from "@/components/icons/IconWathVitalRecorder.svg";
import IconGooglePlay from "@/components/icons/IconGooglePlay.svg";
import iconvitalconnect from "@/components/icons/IconVitalConnect.svg";

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
      <h1 class="product-hero-title">Vital Connect</h1>
      <div class="product-container product-intro-grid">
<<<<<<< HEAD

=======
>>>>>>> cd516283dfb3043eb15ed5eab66e550a5ef90a70
        <div class="product-intro-text">
          <h2 class="product-intro-heading">
            Siempre conectado con<br />quienes cuidan de ti.
          </h2>
          <p class="product-intro-lead">
<<<<<<< HEAD
            Recibe recordatorios y realiza un seguimiento de tus tareas importantes de forma sencilla. Administra tus
            recordatorios, confirma tareas y comparte el estado con tu familia desde tu teléfono.
=======
            Recibe recordatorios y realiza un seguimiento de tus tareas
            importantes de forma sencilla. Administra tus recordatorios,
            confirma tareas y comparte el estado con tu familia desde tu
            teléfono.
>>>>>>> cd516283dfb3043eb15ed5eab66e550a5ef90a70
          </p>
          <div class="product-intro-actions">
            <PrimaryButton root="contact-us" name="Contactanos" />

            <!--Puedes añadir al BottonPrimary una propiedad icon para los iconos y eliminar el name-->
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
<<<<<<< HEAD
          <CharacteristicCard :icon="IconConfigure" title="Fácil de configurar" text="App intuitiva y amigable." />
          <CharacteristicCard :icon="IconSave" title="Seguridad y bienestar" text="Notificaciones garantisadas" />

          <CharacteristicCard :icon="IconSincron" title="Sincronización familiar"
            text="Comparte avisos y estado en tiempo real" />

=======
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
            :icon="IconSincron"
            title="Sincronización familiar"
            text="Comparte avisos y estado en tiempo real"
          />
>>>>>>> cd516283dfb3043eb15ed5eab66e550a5ef90a70
        </div>
      </div>
    </section>

    <!-- PARA QUIÉN ES -->
    <section class="product-forwho fade-in-on-scroll">
      <div class="product-container">
        <h2 class="product-section-title">Beneficios de Vital Connect</h2>
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
<<<<<<< HEAD
          <ForWhoCard :icon="IconThing" title="Personas con olvidos frecuentes" />
=======
          <ForWhoCard
            :icon="IconThing"
            title="Personas con olvidos frecuentes"
          />
>>>>>>> cd516283dfb3043eb15ed5eab66e550a5ef90a70
        </div>
        <p class="product-forwho-lead">Vital Recorder te ayuda a...</p>
        <div class="product-forwho-grid">
<<<<<<< HEAD
          <ForWhoCard title="Acceden al estado del paciente en tiempo real, con mayor tranquilidad." />
          <!-- puedes eliminar el icon y solo poner el texto se acomodara solo al medio -->
          <ForWhoCard title="Apoyo en la adherencia a tratamientos, recordatorios y seguimiento seguro." />
          <ForWhoCard title="Más independencia y confianza en su día a día." />
          <ForWhoCard title="Recordatorios y alertas que facilitan el cumplimiento de sus rutinas." />
=======
          <ForWhoCard
            title="Acceden al estado del paciente en tiempo real, con mayor tranquilidad."
          />
          <!-- puedes eliminar el icon y solo poner el texto se acomodara solo al medio -->
          <ForWhoCard
            title="Apoyo en la adherencia a tratamientos, recordatorios y seguimiento seguro."
          />
          <ForWhoCard title="Más independencia y confianza en su día a día." />
          <ForWhoCard
            title="Recordatorios y alertas que facilitan el cumplimiento de sus rutinas."
          />
>>>>>>> cd516283dfb3043eb15ed5eab66e550a5ef90a70
        </div>
      </div>
    </section>

    <!-- CÓMO FUNCIONA -->
    <section class="product-how fade-in-on-scroll">
      <div class="product-container">
        <h2 class="product-section-title">¿Cómo funciona Vital Connnect?</h2>

        <div class="product-how-grid">
          <HowCard :step="1" title="Configura en la app" text="Descarga la aplicación en Google Play."
            :icon="iconvitalconnect"
            url="https://drive.google.com/drive/folders/1xhOy2S0IXY5P7qJzHf0Vvlb9rrANfGAg?usp=sharing" />
          <HowCard :step="2" title="Configuración Rápida"
            text="Los usuarios pueden actualizar su estado médico directamente desde la aplicación,"
            :icon="IconConfigureApp" url="https://cuevana.pro/pelicula/las-guerreras-k-pop" />
          <HowCard :step="3" title="Familia en todo momento"
            text="Los familiares pueden acceder a la información del estado de salud del usuario en cualquier momento."
            :icon="IconFamili" />
          <HowCard :step="4" title="Bienestar en tiempo real"
            text="Vital Connect proporciona una vista en tiempo real del bienestar del usuario" :icon="IconShare" />
          <HowCard :step="5" title="Historial Médico y Seguimiento"
            text="Vital Connect guarda un historial de actualizaciones médicas para referencia futura."
            :icon="IconRegister" />
          <HowCard :step="6" title="Alerta a la Familia (Opcional)"
            text="Si el usuario no confirma la tarea después de un tiempo, la aplicación envía una notificación a los familiares."
            :icon="IconAlertPhone" />

        </div>
      </div>
    </section>

    <!-- MÉTRICAS / PRIORIDAD -->
    <section class="product-metrics fade-in-on-scroll">
      <div class="product-container">
        <h2 class="product-metrics-title">Tu bienestar es nuestra prioridad</h2>
        <p class="product-forwho-lead">
          Vital Connect está diseñado para asegurar que los familiares siempre estén conectados con el bienestar de sus
          seres queridos en tiempo real.
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
              <img :src="iconvitalconnect" class="product-how-icon-mask"
                :style="[maskStyle, url ? { cursor: 'pointer' } : {}]" @click="openLink" alt="icono" />
          </div>
        </div>

      </div>
    </section>
    <section class="product-testimonials fade-in-on-scroll">
      <div class="product-container">
        <h2 class="product-metrics-title">Lo que dicen nuestros usuarios</h2>

        <div class="product-testimonials-grid">

          <TestimonialCard name="Juan Velozco"
            quote="Gracias a Vital Connect, ahora puedo gestionar mi salud de manera más autónoma, y mis hijos están tranquilos."
            :avatar="IconMale" :count="5" />
          <TestimonialCard name="Maria Pardo"
            quote="me da la tranquilidad de saber, si mi papá no actualiza su estado de salud, recibiré una notificación"
            :avatar="IconFemale" :count="3" />


        </div>
      </div>
    </section>


  </div>
</template>

<script>
export default {
  data() {
    return {
      url: 'https://drive.google.com/file/d/1FBLtez45J4G_fFIrxSOwskCGbpu0vmK1/view?usp=sharing'
    }
  },
  methods: {
    openLink() {
      window.open(this.url);
    }
  }
}
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
}

/* HERO / INTRO */
.product-hero-title {
  font-family: var(--tipografia);
  font-weight: 900;
  font-size: 80px;
  font-weight: black;
  color: #ffffff;
  text-shadow: 0 6px 12px rgba(0, 0, 0, 0.6);
  margin: 0;
  text-decoration: underline 4px #ffffff;
  text-underline-offset: 20px;
  margin: 0;
  margin-left: 70px;
}

.product-intro {
  display: flex;
  flex-direction: column;
  padding: 10px 0 10px;
  color: #fff;
  height: 92vh;
  box-sizing: border-box;
  gap: 30px;
  background-image: url("@/components/icons/vitalconect.jpg");
  background-size: 100% 120%;
  background-repeat: no-repeat;
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
  color: #414143;
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
  letter-spacing: .4px;
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
  color: #1F2B6C;
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
  margin: .15rem auto 1.25rem;
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
  font-size: .9rem;
  box-shadow: 0 8px 18px rgba(15, 33, 71, .22);
}

.product-how-icon {
  font-size: clamp(1.8rem, 3vw, 2.2rem);
  margin: .2rem 0 .45rem;
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

.product-how-text {
  color: #5b6575;
  margin: 0;
  font-size: .95rem;
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
  background: rgba(255, 255, 255, 0.40);
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
.product-how-icon-mask {
  width: 150px;
  height: 150px;
}

/* Responsive */
@media (max-width: 1000px) {
  .product-intro-grid {
    grid-template-columns: 1fr;
  }

  .product-testimonials-grid {
    grid-template-columns: 1fr;
  }

  .product-cta-grid {
    grid-template-columns: 1fr;
  }
}

.fade-in-on-scroll {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1s ease-out, transform 1s ease-out;
}
.fade-in-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
