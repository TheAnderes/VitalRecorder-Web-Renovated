<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Importa el componente de botón que ya estamos usando en todo el sitio
import PrimaryButton from "@/components/shared/PrimaryButton.vue";
import BaseCard from '@/components/shared/BaseCard.vue';
import BaseInput from '@/components/shared/BaseInput.vue';

// Configuración de los iconos del mapa de Leaflet
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });

// Lógica del formulario y el mapa (sin cambios)
const name = ref("");
const email = ref("");
const message = ref("");
const center = [-16.5, -68.1193]; // Coordenadas de La Paz
let mapInstance = null;
let marker = null;
const mapEl = ref(null);

onMounted(() => {
  mapInstance = L.map(mapEl.value, {
    center,
    zoom: 14,
    scrollWheelZoom: true,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapInstance);

  marker = L.marker(center).addTo(mapInstance);
  marker.bindPopup("<b>VITALSYSTEMS</b><br/>La Paz, Bolivia").openPopup();

  setTimeout(() => mapInstance.invalidateSize(), 200);
  window.addEventListener("resize", invalidate);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", invalidate);
  if (mapInstance) mapInstance.remove();
});

function invalidate() {
  if (mapInstance) mapInstance.invalidateSize();
}

function submit() {
  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
    alert("Por favor, completa todos los campos.");
    return;
  }
  console.log({ name: name.value, email: email.value, message: message.value });
  alert("Mensaje enviado. Gracias.");
  name.value = "";
  email.value = "";
  message.value = "";
}
</script>

<template>
  <div class="contact-view">
    <div class="contact-container">
      <h1 class="section-title">Contáctanos</h1>
      <p class="subtitle">
        Si tienes preguntas o deseas más información sobre nosotros o nuestros
        productos, ponte en contacto con nosotros. Estamos aquí para ayudarte.
      </p>

      <BaseCard class="contact-card">
        <form class="form" @submit.prevent="submit">
          <BaseInput
            label="Nombre completo"
            id="contact-name"
            type="text"
            v-model="name"
            placeholder="Juan Miguel..."
            required
          />

          <BaseInput
            label="Correo electrónico"
            id="contact-email"
            type="email"
            v-model="email"
            placeholder="tucorreo@gmail.com"
            required
          />

          <BaseInput
            label="Mensaje"
            id="contact-message"
            type="textarea"
            v-model="message"
            placeholder="Escribe tu mensaje..."
            required
            rows="5"
          />

          <!-- CORRECCIÓN: Usamos el componente de botón del proyecto -->
          <PrimaryButton name="Enviar Mensaje" type="submit" />
        </form>

        <div class="map-media">
          <div ref="mapEl" class="map"></div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<style scoped>
/* --- ESTILOS GENERALES Y DE PÁGINA --- */
.contact-view {
  font-family: 'Poppins', sans-serif;
  color: #0f2147;
  background: linear-gradient(170deg, #e0f2f1, #b2dfdb);
  min-height: 100vh;
  padding: clamp(1rem, 4vw, 2rem) 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-container {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2rem);
}

/* --- ESTILOS DE TEXTO Y TÍTULOS --- */
.section-title {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(2rem, 6vw, 3.2rem);
  font-weight: 800;
  text-align: center;
  color: #1f2b6c;
  margin: 0 0 clamp(0.75rem, 3vw, 1.25rem);
  background: linear-gradient(135deg, #1f2b6c, #2dd4bf);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Fallback para navegadores que no soportan background-clip */
@supports not (-webkit-background-clip: text) {
  .section-title {
    background: none;
    color: #1f2b6c !important;
    -webkit-text-fill-color: initial;
  }
}

.subtitle {
  max-width: 700px;
  margin: 0 auto clamp(2rem, 5vw, 3rem);
  text-align: center;
  color: #64748b;
  font-size: clamp(1rem, 3vw, 1.2rem);
  line-height: 1.6;
}

/* --- CARD PRINCIPAL --- */
.contact-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: start;
  background: white;
  border-radius: 1.5rem;
  padding: clamp(2rem, 5vw, 3rem);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* --- FORMULARIO --- */
.form {
  display: flex;
  flex-direction: column;
  gap: clamp(1.25rem, 3vw, 1.75rem);
  width: 100%;
}

/* --- MAPA --- */
.map-media {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;
  border-radius: 1rem;
  overflow: hidden;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.map {
  width: 100%;
  height: 100%;
  min-height: 400px;
  border-radius: 1rem;
  overflow: hidden;
}

/* Asegura que los controles del mapa sean visibles */
:deep(.leaflet-container) {
  z-index: 1;
  border-radius: 1rem;
}

:deep(.leaflet-control-zoom) {
  margin: 10px;
}

:deep(.leaflet-control-zoom a) {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #ddd;
  color: #333;
}

:deep(.leaflet-control-zoom a:hover) {
  background: white;
  border-color: #2dd4bf;
  color: #2dd4bf;
}

/* --- RESPONSIVE --- */

/* ===== TABLET (769px - 1023px) ===== */
@media (max-width: 1023px) and (min-width: 769px) {
  .contact-view {
    padding: clamp(1.5rem, 3vw, 2rem) 0;
  }
  
  .contact-container {
    max-width: 95%;
  }
  
  .contact-card {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding: 2.5rem;
  }
  
  .map-media {
    min-height: 350px;
  }
  
  .map {
    min-height: 350px;
  }
}

/* ===== MOBILE ONLY (≤768px) ===== */
@media (max-width: 768px) {
  .contact-container {
    max-width: 100%;
    padding: 0 16px;
  }

  .section-title {
    font-size: clamp(1.6rem, 7vw, 2rem);
    line-height: 1.1;
    margin-bottom: .5rem;
  }
  .subtitle {
    font-size: clamp(0.98rem, 4.2vw, 1.05rem);
    max-width: 100%;
    margin: 0 auto 16px;
    line-height: 1.5;
  }

  .contact-card {
    grid-template-columns: 1fr;   /* apilar */
    gap: 16px;
    padding: 16px;
    border-radius: 16px;
    box-shadow: 0 0 18px rgba(68,129,235,.18);
  }

  /* Formulario */
  .form {
    gap: 12px;
  }
  label { gap: 6px; }
  input, textarea {
    padding: 12px;
    font-size: 1rem;
    border-radius: 12px;
    width: 90%;
  }

  /* Haz el PrimaryButton a lo ancho (funciona si el botón rinde <a> o <button>) */
  .form :deep(a),
  .form :deep(button) {
    width: 100%;
    justify-content: center;
  }

  /* Mapa */
  .map-media {
    border-radius: 14px;
  }

  /* IMPORTANTE:
     Tu .map tenía width:90% y height:90%; en móvil causa recortes.
     Lo forzamos a ancho completo y altura controlada. */
  .map {
    width: 100% !important;
    height: auto !important;
    min-height: 320px;        /* alto cómodo en móvil */
    aspect-ratio: 16/12;      /* mantiene proporción, Leaflet se adapta */
    border-radius: 14px;
  }

  /* Controles Leaflet más cómodos al tacto */
  :deep(.leaflet-control-zoom a) {
    width: 36px;
    height: 36px;
    line-height: 36px;
  }
}

/* ===== EXTRA PEQUEÑO (≤480px) ===== */
@media (max-width: 480px) {
  .contact-card { padding: 12px; border-radius: 12px; }
  .map { min-height: 280px; aspect-ratio: 4/3; }
}

</style>
