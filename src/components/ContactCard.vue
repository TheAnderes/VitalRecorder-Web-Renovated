<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Importa el componente de botón que ya estamos usando en todo el sitio
import PrimaryButton from "@/components/PrimaryButton.vue";

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

      <div class="contact-card">
        <form class="form" @submit.prevent="submit">
          <label>
            <span>Nombre completo</span>
            <input v-model="name" type="text" placeholder="Juan Miguel..." />
          </label>

          <label>
            <span>Correo electrónico</span>
            <input
              v-model="email"
              type="email"
              placeholder="tucorreo@gmail.com"
            />
          </label>

          <label>
            <span>Mensaje</span>
            <textarea
              v-model="message"
              rows="5"
              placeholder="Escribe tu mensaje..."
            ></textarea>
          </label>

          <!-- CORRECCIÓN: Usamos el componente de botón del proyecto -->
          <PrimaryButton name="Enviar Mensaje" type="submit" />
        </form>

        <div class="map-media">
          <div ref="mapEl" class="map"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* --- ESTILOS GENERALES Y DE PÁGINA --- */
.contact-view {
  font-family: "Poppins", "Inter", sans-serif;
  color: #0f2147;
  background: linear-gradient(180deg, #a7c7e7, #7fa5c1);
  padding: 0.5rem 0; /* Asegura que ocupe la pantalla */
  margin: 0;
}
.contact-container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* --- ESTILOS DE TEXTO Y TÍTULOS --- */
.section-title {
  /* CORRECCIÓN: Usamos el estilo de título del proyecto */
  font-family: var(--tipografia);
  font-size: 2.8rem;
  font-weight: 900;
  text-align: center;
  color: #0f2147;
  margin: 0;
}
.subtitle {
  max-width: 650px;
  margin: 0 auto ;
  text-align: center;
  color: #475569;
  font-size: 1.1rem;
}

.contact-card {
  background: #ffffff;
  position: relative;
  border-radius: 24px;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  box-shadow: 0 0 30px rgba(68, 129, 235, 0.2);
}

/* --- FORMULARIO --- */
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
label {
  display: grid;
  gap: 0.5rem;
  font-weight: 700;
  color: #0f2147;
}
input,
textarea {
  width: 100%;
  border: 2px solid #e2e8f0;
  /* CORRECCIÓN: Bordes más redondeados */
  border-radius: 12px;
  padding: 12px 14px;
  background: #f8fafc;
  outline: none;
  transition: all 0.2s ease-in-out;
  font-family: "Poppins", "Inter", sans-serif;
  font-size: 1rem;
}
input:focus,
textarea:focus {
  border-color: #4481eb; /* Color de acento de la marca */
  background: #fff;
  box-shadow: 0 0 0 3px rgba(68, 129, 235, 0.2);
}

/* El botón .btn ya no es necesario, porque usamos el componente PrimaryButton */

/* --- MAPA --- */
.map-media {
  position: relative;
  overflow: hidden;
  border-radius: 16px; /* Bordes redondeados */
}
.map {
  width: 90%;
  height: 90%; /* Ocupa toda la altura de la tarjeta */
  min-height: 300px; /* Altura mínima para que no desaparezca */
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
}
/* Asegura que los controles del mapa sean visibles */
:deep(.leaflet-container) {
  z-index: 1;
}

/* --- RESPONSIVE --- */
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
