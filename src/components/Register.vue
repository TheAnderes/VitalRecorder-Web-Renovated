<template>
  <div class="register-container">
    <header class="register-header">
      <img
        class="brand-mark"
        src="/Logo.png"
        alt="VITALSYSTEMS Logo Icon"
        onerror="this.style.display='none'"
        @click="goHome"
      />
      <div class="brand-text" @click="goHome">VITALSYSTEMS</div>
    </header>

    <BaseCard class="register-card">
      <button class="back-button" aria-label="Volver" @click="goBack">
        &#x2190;
      </button>

      <h1 class="title">Registrarse</h1>
      <p class="subtitle">
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
      </p>

      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group-group">
          <BaseInput 
            label="Nombre completo:" 
            id="fullName" 
            type="text" 
            v-model="fullName" 
            placeholder="Juan Pérez" 
            required 
          />

          <BaseInput 
            label="Contraseña:" 
            id="password" 
            type="password" 
            v-model="password" 
            placeholder="••••••••" 
            required 
            minlength="6"
          />

          <BaseInput 
            label="Correo electrónico:" 
            id="email" 
            type="email" 
            v-model="email" 
            placeholder="tucorreo@gmail.com" 
            required 
          />
        </div>

        <div class="form-group-group">
          <BaseInput 
            label="Número de celular:" 
            id="phone" 
            type="tel" 
            v-model="phone" 
            placeholder="(+591) 70000000" 
            required 
          />

          <BaseInput 
            label="Fecha de nacimiento:" 
            id="dob" 
            type="date" 
            v-model="dob" 
            required 
          />
        </div>

        <PrimaryButton type="submit" name="Registrarse" :disabled="isLoading" />
      </form>
    </BaseCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { useAdmin } from '@/composables/useAdmin';
import { auth, db } from '@/firebase.js'; // Importamos la instancia de auth y db
import Swal from 'sweetalert2'; // Importamos SweetAlert2
import PrimaryButton from './shared/PrimaryButton.vue';
import BaseCard from './shared/BaseCard.vue'
import BaseInput from './shared/BaseInput.vue'

// Variables reactivas
const fullName = ref('');
const password = ref('');
const email = ref('');
const phone = ref('');
const dob = ref('');
const isLoading = ref(false);

const router = useRouter();

// Función para manejar el registro de usuario
const handleRegister = async () => {
  // Validación básica
  if (!fullName.value.trim() || !email.value.trim() || !password.value.trim()) {
    alert('Por favor, completa todos los campos requeridos.');
    return;
  }

  if (password.value.length < 6) {
    alert('La contraseña debe tener al menos 6 caracteres.');
    return;
  }

  isLoading.value = true;

  try {
    // Crear usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      email.value.trim(), 
      password.value
    );
    
    const user = userCredential.user;
    
    // Actualizar el perfil del usuario con información adicional
    await updateProfile(user, {
      displayName: fullName.value.trim(),
    });

    // Preguntar al usuario qué rol desea al registrarse
    const { value: selectedRole } = await Swal.fire({
      title: '¿Eres cuidador o paciente?',
      input: 'radio',
      inputOptions: {
        paciente: 'Paciente (usuario)',
        cuidador: 'Cuidador'
      },
      inputValidator: (value) => {
        if (!value) return 'Por favor selecciona una opción';
        return null;
      },
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      reverseButtons: true
    });

    if (!selectedRole) {
      isLoading.value = false;
      return; // usuario canceló
    }

    const roleToSave = selectedRole === 'cuidador' ? 'cuidador' : 'user';

    // Separar nombres y apellidos del fullName
    const nameParts = fullName.value.trim().split(' ');
    const nombres = nameParts[0] || '';
    const apellidos = nameParts.slice(1).join(' ') || '';
    
    // Convertir fecha de nacimiento a Timestamp
    const dobTimestamp = dob.value ? Timestamp.fromDate(new Date(dob.value)) : null;
    
    // Crear documento en Firestore con la estructura exacta
    await setDoc(doc(db, 'users', user.uid), {
      createdAt: Timestamp.now(),
      email: email.value.trim().toLowerCase(),
      persona: {
        apellidos: apellidos,
        fecha_nac: dobTimestamp,
        nombres: nombres,
        sexo: null
      },
      role: roleToSave, // Guardar el rol elegido por el usuario
      settings: {
        familiar_email: null,
        intensidad_vibracion: 2,
        modo_silencio: false,
        notificar_a_familiar: false
      },
      telefono: phone.value.trim()
    });

    console.log("Usuario registrado exitosamente en Auth y Firestore:", user);

    // Mostrar alerta de éxito con SweetAlert2
    Swal.fire({
      title: '¡Registro exitoso!',
      text: 'Bienvenido a VITALSYSTEMS.',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      customClass: {
        confirmButton: 'swal-btn' // Puedes personalizar el estilo si lo deseas
      }
    });

    // Redirigir según rol después de la alerta
    try {
      const { getUserRole } = useAdmin();
      const newRole = await getUserRole(user.uid);
      if (newRole === 'admin' || newRole === 'super_admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (e) {
      console.error('Error al obtener rol después del registro (Register.vue):', e);
      router.push('/dashboard');
    }

  } catch (error) {
    console.error("Error al registrarse:", error);
    
    // Manejo de errores más específico
    let errorMessage = "Error al registrarse. ";
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage += "Este correo electrónico ya está registrado.";
        break;
      case 'auth/invalid-email':
        errorMessage += "El correo electrónico no es válido.";
        break;
      case 'auth/operation-not-allowed':
        errorMessage += "El registro con email/contraseña no está habilitado.";
        break;
      case 'auth/weak-password':
        errorMessage += "La contraseña es muy débil.";
        break;
      default:
        errorMessage += error.message;
    }

    // Mostrar error con SweetAlert2
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  } finally {
    isLoading.value = false;
  }
};

// Función para volver a la página anterior
const goBack = () => {
  router.go(-1); // Mejor práctica que window.history.back()
};

// Función para ir al inicio
const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: clamp(1rem, 4vw, 2rem) clamp(0.75rem, 3vw, 1rem);
  background: linear-gradient(170deg, #e0f2f1, #b2dfdb);
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;
}

.register-header {
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 3vw, 1.25rem);
  background-color: white;
  padding: clamp(0.75rem, 3vw, 1rem) clamp(1rem, 4vw, 1.5rem);
  border-radius: 1rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: clamp(1rem, 4vw, 2rem);
  max-width: 100%;
  box-sizing: border-box;
}

.brand-mark {
  height: clamp(40px, 8vw, 60px);
  width: auto;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.brand-mark:hover {
  transform: scale(1.05);
}

.brand-text {
  font-weight: 500;
  letter-spacing: .2px;
  font-size: clamp(18px, 5vw, 28px);
  background: linear-gradient(90deg, #2dd4bf, #60a5fa);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  white-space: nowrap;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.brand-text:hover {
  transform: scale(1.02);
}

/* Fallback para navegadores que no soportan background-clip */
@supports not (-webkit-background-clip: text) {
  .brand-text {
    background: none;
    color: #1f2b6c !important;
    -webkit-text-fill-color: initial;
  }
}

.register-card {
  position: relative;
  background: #ffffff;
  padding: clamp(2rem, 6vw, 3.5rem) clamp(1rem, 5vw, 2.5rem) clamp(1.5rem, 5vw, 2.5rem);
  border-radius: 1.5rem;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  color: #333;
  box-sizing: border-box;
}

.back-button {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: #f1f1f1;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  color: #555;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: background-color 0.3s, color 0.3s;
}

.back-button:hover {
  background: #e0e0e0;
  color: #000;
}

.title {
  text-align: center;
  font-size: clamp(1.5rem, 6vw, 2.2rem);
  font-weight: 700;
  margin-bottom: clamp(0.75rem, 3vw, 1rem);
  color: #1f2b6c;
  line-height: 1.2;
}

.subtitle {
  text-align: center;
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  font-size: clamp(0.9rem, 3vw, 1rem);
  line-height: 1.4;
}

.subtitle a {
  color: var(--blue-primary);
  font-weight: 600;
  text-decoration: none;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 4vw, 1.5rem);
  width: 100%;
}

.form-group-group {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1rem, 3vw, 1.5rem);
  width: 100%;
}

/* Layout responsive para pantallas medianas */
@media (min-width: 768px) {
  .form-group-group {
    grid-template-columns: 1fr 1fr;
    gap: clamp(1rem, 3vw, 2rem);
  }
  
  .form-group-group:first-child .form-group {
    grid-column: span 1;
  }
  
  .form-group-group:first-child .form-group:first-child {
    grid-column: 1 / -1; /* Nombre completo ocupa todo el ancho */
  }
}

@media (max-width: 768px) {
  .register-card {
    max-width: 500px;
  }
}

@media (max-width: 480px) {
  .register-header {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.75rem;
  }

  .brand-text {
    font-size: 1.5rem;
  }
  
  .register-card {
    margin: 0;
    border-radius: 1rem;
  }
}
</style>
