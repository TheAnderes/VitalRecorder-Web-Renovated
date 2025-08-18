<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import ContactInfoStrip from '@/components/ContactInfoStrip.vue'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl })
import pin from '@/assets/icons/pin.png'
import mail from '@/assets/icons/mail.png'
import phone from '@/assets/icons/phone.png'
const name = ref('')
const email = ref('')
const message = ref('')
const center = [-16.5, -68.1193]
let mapInstance = null
let marker = null
const mapEl = ref(null)

onMounted(() => {
  mapInstance = L.map(mapEl.value, {
    center,
    zoom: 14,
    scrollWheelZoom: true
  })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapInstance)

  marker = L.marker(center).addTo(mapInstance)
  marker.bindPopup('<b>VITALSYSTEMS</b><br/>La Paz, Bolivia').openPopup()

  // Ajuste responsive
  setTimeout(() => mapInstance.invalidateSize(), 200)
  window.addEventListener('resize', invalidate)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', invalidate)
  if (mapInstance) mapInstance.remove()
})

function invalidate() {
  if (mapInstance) mapInstance.invalidateSize()
}

function submit() {
  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
    alert('Por favor, completa todos los campos.')
    return
  }
  // Aquí enviarías a tu API (fetch/axios)
  console.log({ name: name.value, email: email.value, message: message.value })
  alert('Mensaje enviado. Gracias.')
  name.value = ''
  email.value = ''
  message.value = ''
}
</script>

<template>
  <section class="wrap">
    <div class="hero container">
      <h1>Contáctanos</h1>
      <p class="subtitle">
        Si tienes preguntas o deseas más información sobre nosotros o nuestros productos, ponte en contacto con nosotros. Estamos aquí para ayudarte.
      </p>

      <div class="card">
        <form class="form" @submit.prevent="submit">
          <label>
            <span>Nombre completo</span>
            <input v-model="name" type="text" placeholder="Juan Miguel..." />
          </label>

          <label>
            <span>Correo electrónico</span>
            <input v-model="email" type="email" placeholder="tucorreo@gmail.com" />
          </label>

          <label>
            <span>Mensaje</span>
            <textarea v-model="message" rows="5" placeholder="Escribe tu mensaje..."></textarea>
          </label>

          <button type="submit" class="btn">Enviar Mensaje</button>
        </form>

        <div class="media">
          <div ref="mapEl" class="map"></div>
        </div>
      </div>
    </div>
     <ContactInfoStrip :address-img="pin" :email-img="mail" :phone-img="phone" />
  </section>
</template>
<style scoped>
.wrap {
  background: linear-gradient(90deg,#2dd4bf 0%, #60a5fa 100%);
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
    padding: 24px 0 0;  
  min-height: auto;  
}
.hero { 
  max-width: 1150px;
  margin: 0 auto;
  padding: 0 16px;
}
.container { max-width: 1150px; margin: 0 auto; padding: 0 16px; }

h1 {
  font-size: clamp(28px, 4vw, 48px);
  text-align: center;
  color: #0b1020;
  font-weight: 800;
  margin-bottom: 10px;
}

.subtitle {
  max-width: 800px;
  margin: 0 auto 28px;
  text-align: center;
  color: #0b1020;
  opacity: .85;
}

/* Tarjeta */
.card {
  background: #fff;
  position: relative;
  border-radius: 16px;
  padding: 28px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  box-shadow: 0 8px 20px rgba(0,0,0,.12);
}

/* Formulario */
.form {
  display: grid;
  gap: 16px;
}

label {
  display: grid;
  gap: 6px;
  font-weight: 600;
  color: #0b1020;
}

input, textarea {
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 10px 12px;
  background: #f9fafb;
  outline: none;
  transition: border 0.2s, background 0.2s;
}

input:focus, textarea:focus {
  border-color: #60a5fa;
  background: #fff;
}

.btn {
  background: #1f2937;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.btn:hover {
  background: #374151;
}

/* Mapa */
.media {
  position: relative;
  overflow: hidden;      
  border-radius: 12px;   
}
.map {
  width: 100%;
  height: 300px;         /* tu altura */
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}
:deep(.leaflet-container),
:deep(.leaflet-pane),
:deep(.leaflet-top),
:deep(.leaflet-bottom),
:deep(.leaflet-control) {
  z-index: 1;
}
/* Responsive */
@media (max-width: 900px) {
  .card {
    grid-template-columns: 1fr;
  }
  .map {
    height: 250px;
  }
}
</style>