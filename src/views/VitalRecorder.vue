<template>
  <div class="vital-recorder-container">
    <h1>Bienvenido, {{ userName }}!</h1>
    <p>Estamos felices de que estés aquí. Esta es tu página principal.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAuth } from "firebase/auth";
import { auth } from "../firebase"; // Importa la configuración de Firebase

const userName = ref(""); // Variable para almacenar el nombre del usuario

// Obtiene el usuario actual cuando se carga la vista
onMounted(() => {
  const user = auth.currentUser;
  if (user) {
    userName.value = user.displayName || user.email.split('@')[0]; // Usa displayName si está disponible, si no, usa el nombre de usuario del correo
  }
});
</script>

<style scoped>
/* Estilos para VitalRecorder */
.vital-recorder-container {
  text-align: center;
  padding: 20px;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
}

p {
  font-size: 1.2rem;
  color: #555;
}
</style>
