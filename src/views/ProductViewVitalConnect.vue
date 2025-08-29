<script setup>
import CharacteristicCard from '@/components/CharacteristicCard.vue';
import ForWhoCard from '@/components/ForWhoCard.vue';
import HowCard from '@/components/HowCard.vue';
import PointViewCard from '@/components/PointViewCard.vue';
import TestimonialCard from '@/components/TestimonialCard.vue';
import IntroIconButtonCard from '@/components/IntroIconButtonCard.vue';

import IconWathVital from '@/components/icons/IconWathVitalRecorder.svg';
import IconGooglePlay from '@/components/icons/IconGooglePlay.svg';

import ButtonPrimary from '@/components/PrimaryButton.vue';
import ButtonSecondary from '@/components/SecondaryButton.vue';

import IconWath from '@/components/icons/IconWatch.svg';
import IconSincron from '@/components/icons/IconSincron.svg';
import IconConfigure from '@/components/icons/IconConfigure.svg';
import IconSave from '@/components/icons/IconSave.svg';
import IconWathInteligent from '@/components/icons/IconWathInteligent.svg';


import IconConfigureApp from '@/components/icons/IconConfigureApp.svg';
import IconHandWatch from '@/components/icons/IconHandWatch.svg';
import IconShare from '@/components/icons/IconShare.svg';
import IconApp from '@/components/icons/IconApp.svg';
import IconRegister from '@/components/icons/IconRegister.svg';
import IconAlertPhone from '@/components/icons/IconAlertPhone.svg';

import IconRank from '@/components/icons/IconRank.svg';
import IconRing from '@/components/icons/IconRing.svg';
import IconSupport from '@/components/icons/IconSupport.svg';
import IconSecurity from '@/components/icons/IconSecurity.svg';

import IconOld from '@/components/icons/IconOld.svg'
import IconMedic from '@/components/icons/IconMedic.svg'
import IconFamili from '@/components/icons/IconFamili.svg'
import IconThing from '@/components/icons/IconThing.svg'

import IconMale from '@/components/icons/IconMale.svg'
import IconFemale from '@/components/icons/IconFemale.svg'

</script>
<template>
  <div class="product-view">
    <!-- BLOQUE PRINCIPAL -->
    <section class="product-intro">
      <h1 class="product-hero-title">Vital Connect</h1>
      <div class="product-container product-intro-grid">
        <div class="product-intro-text">
          <h2 class="product-intro-heading">
            Nunca Olvides tus<br />Medicamentos
          </h2>
          <p class="product-intro-lead">
            Recibe recordatorios y realiza un seguimiento de tus tareas importantes de forma sencilla. Administra tus recordatorios, confirma tareas y comparte el estado con tu familia desde tu teléfono.
          </p>
          <div class="product-intro-actions">
            <ButtonSecondary 
              root="contact-us" 
              name="Contactanos"
              />
                      
             <!--Puedes añadir al BottonPrimary una propiedad icon para los iconos y eliminar el name-->
          </div>
        </div>

        <div class="product-intro-media">
          <IntroIconButtonCard 
            root="contact-us" 
            :icon="IconWathVital"
            :iconbutton="IconGooglePlay"
          />

        </div>

      </div>
    </section>

    <!-- CARACTERÍSTICAS -->
    <section class="product-features">
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
    <section class="product-forwho">
      <div class="product-container">
        <h2 class="product-section-title">Beneficios de Vital Recorder</h2>
        <p class="product-forwho-lead">
          Diseñado para que cualquier persona pueda mantenerse al día sin complicaciones.
        </p>
        <!-- PARA QUIÉN ES TARGETAS-->
        <div class="product-forwho-grid">
          <ForWhoCard
            :icon="IconFamili"
            title="Familiares y Cuidadores"  />
          
            <!-- puedes eliminar el icon y solo poner el texto se acomodara solo al medio -->
          <ForWhoCard
            :icon="IconMedic"
            title="Tratamientos Medicos"  />
          <ForWhoCard
            :icon="IconOld"
            title="Personas Mayores"  />
          <ForWhoCard
            :icon="IconThing"
            title="Personas con olvidos frecuentes"  />
        </div>
        <p class="product-forwho-lead">
          Vital Recorder te ayuda a...
        </p>
        <div class="product-forwho-grid">
          <ForWhoCard
            
            title="Mejorar la adherencia a tratamientos farmacológicos."  />
            <!-- puedes eliminar el icon y solo poner el texto se acomodara solo al medio -->
          <ForWhoCard
            
            title="Reducir el estrés y la preocupación de los familiares."  />
          <ForWhoCard
            
            title="Promover la independencia y autonomía del adulto mayor."  />
          <ForWhoCard
            
            title="Facilitar la comunicación y el seguimiento de la salud."  />
        </div>
      </div>
    </section>

    <!-- CÓMO FUNCIONA -->
    <section class="product-how">
      <div class="product-container">
        <h2 class="product-section-title">¿Cómo funciona Vital Recorder?</h2>

        <div class="product-how-grid">
              <HowCard
              :step="1"
              title="Configura en la app"
              text="Descarga la aplicación en Google Play."
              :icon="IconApp"
              url="https://cuevana.pro/pelicula/las-guerreras-k-pop"
          />
          <HowCard
              :step="2"
              title="Configuración Rápida"
              text="Programa los horarios de tus medicamentos, citas médicas y tareas importantes."
              :icon="IconConfigureApp"
              url="https://cuevana.pro/pelicula/las-guerreras-k-pop"
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
    <section class="product-metrics">
      <div class="product-container">
        <h2 class="product-metrics-title">Tu bienestar es nuestra prioridad</h2>
        <p class="product-forwho-lead">
          Nuestra mayor recompensa es saber que VitalSystems hace una diferencia real . 
        </p>
        <div class="product-metrics-grid">
          <PointViewCard
          :icon="IconRank"
          valuer="95%"
          Text="Satisfacción"
          />
<PointViewCard
          :icon="IconRing"
          valuer="+1K"
          Text="Recordatorios"
          />
<PointViewCard
          :icon="IconSupport"
          valuer="24/7"
          Text="Soporte"
          />
          <PointViewCard
            :icon="IconSecurity"
            valuer="100%"
            Text="Privacidad"/>
        </div>
        <p class="product-forwho-lead" style="width:100vw;">
          Los testimonios de nuestros usuarios y sus familias son el reflejo de nuestro compromiso.
        </p>
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


/* HERO / INTRO */
.product-hero-title {
  font-family: var(--tipografia);
  font-weight: 900;
  font-size: 90px;
  text-align: center;
  font-weight: black;
  color: #0f2147;
  text-decoration: underline 4px #0f2147;
  text-underline-offset: 20px;
  margin: 0;
}

.product-intro {
  background: linear-gradient(135deg,#53e0f3 0%, #2a74ff 100%);
  padding: 10px 0 10px;
  color: #fff;
  height: 650px;
}
.product-intro-grid {
  display: grid;
  grid-template-columns: 1.15fr .85fr;
  gap: clamp(1rem, 2.5vw, 2rem);
  align-items: center;
  padding: 2rem;
  border-radius: 16px;
  backdrop-filter: blur(2px);
}
.product-intro-heading {
  font-size: 60px;
  font-weight: black;
  line-height: 1.15;
  margin: 0 0 .75rem;
  color: #0b1634;
  text-align: center;
}
.product-intro-lead {
  text-align: center;
  font-size: 30px;
  font-weight: 900;
  line-height: 1.6;
  color: #f2f6ff;
  margin: 0 0 1.5rem;
  text-align: center;
  font-family: var(--tipografia);
  width: 600px;
}
.product-intro-actions { display:flex; gap:50px; flex-wrap:wrap; justify-content:center; }

.product-intro-media { display:flex; justify-content:center; flex-direction: column; align-items: center;}



.product-device-title {
  margin: .2rem 0 0;
  font-size: clamp(1.1rem, 2.6vw, 1.8rem);
  font-weight: 900;
  color:#0f2147;
  letter-spacing:.4px;
}

/* === CARACTERÍSTICAS (COMPACTO) === */
.product-features {
  display: flex;
  align-items: center;
  background:white;
  height: 92vh;
  padding: 5rem .5rem;
  box-sizing: border-box;
    background: radial-gradient(circle, #FFFFFF 0%, #00F2FE 100%);
}

.product-section-title {
  font-family: var(--tipografia);
  text-align: center;
  font-size: 50px;
  font-weight: var(--semibold);
  margin: 0 0 30px;
  color:#0f2147;
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
  background: linear-gradient(135deg,#4f9dfd 0%, #20dff1 100%);
  padding:0;
  color:#0b1634;
  height: 92vh;
  align-items: center;
  box-sizing: border-box;
}
.product-forwho-lead {
  font-family: var(--tipografia);
  text-align:center;
  color:#0b1634;
  font-weight:semibold;
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
    background: radial-gradient(circle, #FFFFFF 0%, #00F2FE 100%);
}
.product-how-grid {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: center;
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
  display: flex;
  background: linear-gradient(135deg,#20dff1 0%, #4f9dfd 100%);
  padding: 0;
  box-sizing: border-box;
  height: 92vh;
  
}
.product-metrics-title {
  font-family: var(--tipografia);
  font-weight:var(--semibold);
  text-align: center;
  font-size: 60px;
  color: #0f2147;
  margin: 0 0 1rem;
}
.product-metrics-grid {
  display: flex;
  gap: 70px;
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





/* Responsive */
@media (max-width: 1000px) {
  .product-intro-grid { grid-template-columns: 1fr; }
  .product-testimonials-grid { grid-template-columns: 1fr; }
  .product-cta-grid { grid-template-columns: 1fr; }
}
</style>
