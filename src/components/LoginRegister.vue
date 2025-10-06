<template>
  <div class="auth-container">
    <!-- Contenedor principal -->
    <div class="auth-main">
      <!-- Contenedor de formularios con toggle -->
      <div class="forms-container">
        <!-- Desktop Toggle Buttons -->
        <div class="desktop-toggle">
          <div
            class="toggle-buttons"
            :class="{ 'register-active': activePanel === 'register' }"
          >
            <button
              class="toggle-btn"
              :class="{ active: activePanel === 'login' }"
              @click="switchToLogin"
            >
              Iniciar Sesión
            </button>
            <button
              class="toggle-btn"
              :class="{ active: activePanel === 'register' }"
              @click="switchToRegister"
            >
              Registro
            </button>
          </div>
        </div>
        <!-- Panel de Login -->
        <div
          class="auth-panel login-panel"
          :class="{ active: activePanel === 'login' }"
        >
          <BaseCard class="auth-card">
            <button class="back-button" aria-label="Volver" @click="goBack">
              &#x2190;
            </button>

            <h1 class="title">Iniciar Sesión</h1>
            <p class="subtitle">
              ¿Es tu primera vez?
              <a href="#" @click.prevent="switchToRegister">Regístrate aquí</a>
            </p>

            <form @submit.prevent="handleLogin" class="auth-form">
              <BaseInput
                label="Correo electrónico:"
                id="login-email"
                type="email"
                v-model="loginData.email"
                placeholder="tucorreo@gmail.com"
                required
              />

              <BaseInput
                label="Contraseña:"
                id="login-password"
                type="password"
                v-model="loginData.password"
                placeholder="Contraseña"
                required
              />

              <a href="/recuperar-contrasena" class="forgot-password"
                >¿Olvidaste tu contraseña?</a
              >
              <div class="spacer">
                <PrimaryButton
                  type="submit"
                  name="Iniciar Sesión"
                  :disabled="loginLoading"
                />
              </div>
            </form>
          </BaseCard>
        </div>

        <!-- Panel de Register -->
        <div
          class="auth-panel register-panel"
          :class="{ active: activePanel === 'register' }"
        >
          <BaseCard class="auth-card">
            <button class="back-button" aria-label="Volver" @click="goBack">
              &#x2190;
            </button>

            <h1 class="title">Registrarse</h1>
            <p class="subtitle">
              ¿Ya tienes cuenta?
              <a href="#" @click.prevent="switchToLogin">Inicia sesión aquí</a>
            </p>

            <form
              @submit.prevent="handleRegister"
              class="auth-form register-form"
            >
              <div class="form-group-group">
                <BaseInput
                  label="Nombre completo:"
                  id="register-fullName"
                  type="text"
                  v-model="registerData.fullName"
                  placeholder="Juan Pérez"
                  required
                />

                <BaseInput
                  label="Contraseña:"
                  id="register-password"
                  type="password"
                  v-model="registerData.password"
                  placeholder="••••••••"
                  required
                  minlength="6"
                />

                <BaseInput
                  label="Correo electrónico:"
                  id="register-email"
                  type="email"
                  v-model="registerData.email"
                  placeholder="tucorreo@gmail.com"
                  required
                />
              </div>

              <div class="form-group-group">
                <BaseInput
                  label="Número de celular:"
                  id="register-phone"
                  type="tel"
                  v-model="registerData.phone"
                  placeholder="(+591) 70000000"
                  required
                />

                <BaseInput
                  label="Fecha de nacimiento:"
                  id="register-dob"
                  type="date"
                  v-model="registerData.dob"
                  required
                />
              </div>
              <div class="spacer">
                <PrimaryButton
                  type="submit"
                  name="Registrarse"
                  :disabled="registerLoading"
                />
              </div>
            </form>
          </BaseCard>
        </div>
      </div>

      <!-- Sección informativa -->
      <div class="info-section">
        <h2 class="info-title">
          {{
            activePanel === "login"
              ? "¡Bienvenido de nuevo!"
              : "¡Únete a nosotros!"
          }}
        </h2>
        <div class="info-description-box">
          <p class="info-description">
            {{
              activePanel === "login"
                ? "Accede a tu cuenta para continuar monitoreando tu salud de manera inteligente y personalizada."
                : "Crea tu cuenta y comienza a disfrutar de todas las funciones de monitoreo de salud que tenemos para ti."
            }}
          </p>
        </div>
      </div>
    </div>

    <!-- Indicadores para móvil -->
    <div
      class="mobile-tabs"
      :class="{ 'register-active': activePanel === 'register' }"
    >
      <button
        class="tab-button"
        :class="{ active: activePanel === 'login' }"
        @click="switchToLogin"
      >
        Iniciar - VitalSystems
      </button>
      <button
        class="tab-button"
        :class="{ active: activePanel === 'register' }"
        @click="switchToRegister"
      >
        Registro - VitalSystems
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useRouter, useRoute } from "vue-router";
import { auth, db } from "@/firebase.js";
import { useAdmin } from "@/composables/useAdmin";
import Swal from "sweetalert2";
import PrimaryButton from "./shared/PrimaryButton.vue";
import BaseCard from "./shared/BaseCard.vue";
import BaseInput from "./shared/BaseInput.vue";

const router = useRouter();
const route = useRoute();

// Estado activo
const activePanel = ref("login");

// Detectar modo inicial desde la URL o query params
onMounted(() => {
  // Si viene desde /register o tiene query ?mode=register
  if (
    route.query.mode === "register" ||
    route.path.includes("register") ||
    route.name === "register"
  ) {
    activePanel.value = "register";
  }
});

// Datos de login
const loginData = ref({
  email: "",
  password: "",
});

// Datos de registro
const registerData = ref({
  fullName: "",
  email: "",
  password: "",
  phone: "",
  dob: "",
});

// Estados de carga
const loginLoading = ref(false);
const registerLoading = ref(false);

// Funciones de navegación
const switchToLogin = () => {
  activePanel.value = "login";
};

const switchToRegister = () => {
  activePanel.value = "register";
};

const goBack = () => {
  window.history.back();
};

const goHome = () => {
  router.push("/");
};

// Función de login
const handleLogin = async () => {
  loginLoading.value = true;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginData.value.email,
      loginData.value.password
    );
    const user = userCredential.user;
    console.log("Usuario logueado exitosamente:", user);
    console.log("Email verificado:", user.emailVerified);

    // Verificar si el email está verificado
    if (!user.emailVerified) {
      console.warn("Email no verificado, pero continuando...");
    }

    let redirectPath = "/dashboard"; // Por defecto usuario normal
    let welcomeText = "Bienvenido a tu dashboard de usuario.";

    try {
      // Intentar obtener el rol del usuario
      const { getUserRole } = useAdmin();
      const userRole = await getUserRole(user.uid);

      console.log("Rol obtenido:", userRole);

      if (userRole === "admin" || userRole === "super_admin") {
        redirectPath = "/admin/dashboard";
        welcomeText = "Bienvenido al panel de administración.";
        console.log("Redirigiendo a admin dashboard");
      }

      // TEMPORAL: Forzar redirección si el email contiene "admin"
      if (loginData.value.email.toLowerCase().includes("admin")) {
        redirectPath = "/admin/dashboard";
        welcomeText =
          "Bienvenido al panel de administración (temporal por email).";
        console.log("Redirigiendo a admin por email (FORZADO)");
      }
    } catch (roleError) {
      console.error("Error al obtener rol (usando default):", roleError);
      // Si no puede obtener el rol, mantener el dashboard por defecto
      // TEMPORAL: Para probar, si es un correo admin conocido, redirigir a admin
      if (
        loginData.value.email.toLowerCase().includes("admin") ||
        loginData.value.email.toLowerCase().includes("super")
      ) {
        redirectPath = "/admin/dashboard";
        welcomeText = "Bienvenido al panel de administración (temporal).";
        console.log("Redirigiendo a admin por email (temporal)");
      }
    }

    console.log("Ruta de redirección final:", redirectPath);

    Swal.fire({
      icon: "success",
      title: "¡Inicio de sesión exitoso!",
      text: welcomeText,
      timer: 2000,
      showConfirmButton: false,
    });

    setTimeout(() => {
      console.log("Ejecutando redirección a:", redirectPath);
      router.push(redirectPath);
    }, 2000);
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    console.error("Código de error:", error.code);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Error al iniciar sesión: " + error.message,
      timer: 3000,
      showConfirmButton: true,
    });
  } finally {
    loginLoading.value = false;
  }
};

// Función de registro
const handleRegister = async () => {
  // Validación básica
  if (
    !registerData.value.fullName.trim() ||
    !registerData.value.email.trim() ||
    !registerData.value.password.trim()
  ) {
    Swal.fire({
      icon: "warning",
      title: "Campos requeridos",
      text: "Por favor, completa todos los campos requeridos.",
    });
    return;
  }

  if (registerData.value.password.length < 6) {
    Swal.fire({
      icon: "warning",
      title: "Contraseña débil",
      text: "La contraseña debe tener al menos 6 caracteres.",
    });
    return;
  }

  registerLoading.value = true;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      registerData.value.email.trim(),
      registerData.value.password
    );

    const user = userCredential.user;

    await updateProfile(user, {
      displayName: registerData.value.fullName.trim(),
    });

    // Separar nombres y apellidos del fullName
    const nameParts = registerData.value.fullName.trim().split(" ");
    const nombres = nameParts[0] || "";
    const apellidos = nameParts.slice(1).join(" ") || "";

    // Convertir fecha de nacimiento a Timestamp
    const dobTimestamp = registerData.value.dob
      ? Timestamp.fromDate(new Date(registerData.value.dob))
      : null;

    // Crear documento en Firestore con la estructura exacta
    await setDoc(doc(db, "users", user.uid), {
      createdAt: Timestamp.now(),
      email: registerData.value.email.trim().toLowerCase(),
      persona: {
        apellidos: apellidos,
        fecha_nac: dobTimestamp,
        nombres: nombres,
        sexo: null,
      },
      role: "user", // Rol automático
      settings: {
        familiar_email: null,
        intensidad_vibracion: 2,
        modo_silencio: false,
        notificar_a_familiar: false,
      },
      telefono: registerData.value.phone.trim(),
    });

    console.log("Usuario registrado exitosamente en Auth y Firestore:", user);

    Swal.fire({
      title: "¡Registro exitoso!",
      text: "Bienvenido a VitalSystems. Ahora puedes iniciar sesión.",
      icon: "success",
      confirmButtonText: "Continuar",
      background: "rgba(255, 255, 255, 0.98)",
      color: "#333",
      confirmButtonColor: "#2dd4bf",
      backdrop: "rgba(224, 242, 241, 0.8)",
      showClass: {
        popup: "animate__animated animate__fadeInUp animate__faster",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutDown animate__faster",
      },
      customClass: {
        popup: "vital-systems-popup",
        title: "vital-systems-title",
        htmlContainer: "vital-systems-content",
        confirmButton: "vital-systems-button",
        icon: "vital-systems-icon",
      },
    }).then(() => {
      // Cambiar al panel de login después del registro exitoso
      switchToLogin();
      // Limpiar el formulario de registro
      registerData.value = {
        fullName: "",
        email: "",
        password: "",
        phone: "",
        dob: "",
      };
    });
  } catch (error) {
    console.error("Error al registrarse:", error);

    let errorMessage = "Error al registrarse. ";

    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage += "Este correo electrónico ya está registrado.";
        break;
      case "auth/invalid-email":
        errorMessage += "El correo electrónico no es válido.";
        break;
      case "auth/operation-not-allowed":
        errorMessage += "El registro con email/contraseña no está habilitado.";
        break;
      case "auth/weak-password":
        errorMessage += "La contraseña es muy débil.";
        break;
      default:
        errorMessage += error.message;
    }

    Swal.fire({
      title: "Error",
      text: errorMessage,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  } finally {
    registerLoading.value = false;
  }
};
</script>

<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: clamp(0.5rem, 2vw, 1rem);
  background-image: url("@/components/icons/ImageProductVitarRecorner.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  font-family: "Poppins", sans-serif;
  box-sizing: border-box;
  overflow: hidden;
}

.auth-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(224, 242, 241, 0.75);
  backdrop-filter: blur(1px);
  z-index: 1;
}

/* Estilos para el toggle de escritorio */
.desktop-toggle {
  display: none;
  justify-content: center;
  width: 100%;
  margin-bottom: 1.5rem;
}

.toggle-buttons {
  display: flex;
  position: relative;
  background: rgba(255, 255, 255, 0.95);
  padding: 4px;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

.spacer {
  width: 100%;
  display: flex;
  justify-content: center;
}

.toggle-buttons::before {
  content: "";
  position: absolute;
  top: 4px;
  left: 4px;
  width: calc(50% - 4px);
  height: calc(100% - 8px);
  background: linear-gradient(135deg, #2dd4bf, #60a5fa);
  border-radius: 12px;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(45, 212, 191, 0.3);
  z-index: 1;
}

.toggle-buttons.register-active::before {
  transform: translateX(calc(100% + 4px));
  box-shadow: 0 4px 12px rgba(96, 165, 250, 0.3);
}

.toggle-btn {
  position: relative;
  flex: 1;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 12px;
  background: transparent;
  color: #64748b;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: "Poppins", sans-serif;
  font-size: 0.95rem;
  z-index: 2;
  white-space: nowrap;
  text-align: center;
}

.toggle-btn:hover {
  color: #475569;
  background: rgba(100, 116, 139, 0.1);
}

.toggle-btn.active {
  background: linear-gradient(135deg, #2dd4bf, #60a5fa);
  color: white;
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 12px rgba(45, 212, 191, 0.3);
}

.toggle-btn.active:hover {
  color: white;
  background: linear-gradient(135deg, #2dd4bf, #60a5fa);
}

/* Contenedor de formularios */
.forms-container {
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 750px;
  width: 100%;
}

/* Sección de información */
.info-section {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  max-width: 350px;
  height: 100%;
  min-height: 500px;
  position: relative;
  z-index: 2;
  padding: 0.5rem 1rem 2rem 1rem;
  gap: 1.5rem;
}

.info-title {
  font-size: 4.2rem;
  font-weight: 900;
  color: #0f2147;
  text-align: center;
  margin: 0;
  line-height: 1.1;
  text-shadow: 2px 4px 8px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(15, 33, 71, 0.2),
    0 0 15px rgba(255, 255, 255, 0.8);
  letter-spacing: -0.5px;
}

.info-description-box {
  background: rgba(255, 255, 255, 0.98);
  padding: 2.5rem;
  border-radius: 24px;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.18), 0 4px 15px rgba(31, 43, 108, 0.1);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  width: 100%;
  max-width: 380px;
  position: relative;
  transform: translateY(0);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.info-description-box:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 45px rgba(0, 0, 0, 0.22),
    0 6px 20px rgba(31, 43, 108, 0.15);
}

.info-description {
  font-size: 1.15rem;
  color: #374151;
  line-height: 1.75;
  margin: 0;
  text-align: center;
  font-weight: 500;
  letter-spacing: 0.2px;
}

.auth-main {
  display: flex;
  gap: 3rem;
  width: 100%;
  max-width: 1400px;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  z-index: 2;
}

.auth-panel {
  flex: 1;
  max-width: 650px;
  width: 100%;
}

.auth-card {
  position: relative;
  background: rgba(255, 255, 255, 0.98);
  padding: clamp(1.5rem, 4vw, 2.5rem) clamp(1.25rem, 4vw, 2rem);
  border-radius: 1.25rem;
  width: 100%;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
  color: #333;
  box-sizing: border-box;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
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
  font-size: clamp(1.4rem, 5vw, 1.9rem);
  font-weight: 700;
  margin-bottom: clamp(0.5rem, 2vw, 0.75rem);
  color: #1f2b6c;
  line-height: 1.2;
}

.subtitle {
  text-align: center;
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  font-size: clamp(0.85rem, 2.5vw, 0.95rem);
  line-height: 1.3;
}

.subtitle a {
  color: var(--blue-primary);
  font-weight: 600;
  text-decoration: none;
}

.subtitle a:hover {
  text-decoration: underline;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 4vw, 1.5rem);
  width: 100%;
}

.register-form .form-group-group {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.25rem, 3vw, 1.75rem);
  width: 100%;
}

.forgot-password {
  display: block;
  text-align: right;
  margin-top: clamp(-0.75rem, -2vw, -1rem);
  margin-bottom: clamp(0.75rem, 3vw, 1rem);
  font-size: clamp(0.8rem, 2.5vw, 0.9rem);
  color: var(--blue-secondary);
  text-decoration: none;
}

.mobile-tabs {
  display: none;
  position: relative;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.95);
  padding: 4px;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  z-index: 10;
}

.mobile-tabs::before {
  content: "";
  position: absolute;
  top: 4px;
  left: 4px;
  width: calc(50% - 4px);
  height: calc(100% - 8px);
  background: linear-gradient(135deg, #2dd4bf, #60a5fa);
  border-radius: 12px;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(45, 212, 191, 0.3);
  z-index: 1;
}

.mobile-tabs.register-active::before {
  transform: translateX(calc(100% + 4px));
  box-shadow: 0 4px 12px rgba(96, 165, 250, 0.3);
}

.tab-button {
  position: relative;
  flex: 1;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 12px;
  background: transparent;
  color: #64748b;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: "Poppins", sans-serif;
  font-size: 0.95rem;
  z-index: 12;
  white-space: nowrap;
  pointer-events: auto;
}

.tab-button:hover {
  color: #475569;
  transform: translateY(-1px);
}

.tab-button.active {
  color: white;
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transform: translateY(0);
}

.tab-button.active:hover {
  color: white;
  transform: translateY(0);
}

/* Desktop view - layout con toggle, formulario e info */
@media (min-width: 1024px) {
  .auth-main {
    gap: 3rem;
    align-items: center;
    justify-content: space-between;
  }

  /* Mostrar toggle de escritorio */
  .desktop-toggle {
    display: flex;
  }

  /* Mostrar sección de información */
  .info-section {
    display: flex;
  }

  /* Ajustar contenedor de formularios */
  .forms-container {
    max-width: 700px;
    flex-direction: column;
  }

  /* Ocultar paneles no activos en desktop también */
  .auth-panel:not(.active) {
    display: none;
  }

  .auth-panel {
    max-width: 100%;
    width: 100%;
  }

  .register-form .form-group-group {
    grid-template-columns: 1fr 1fr;
    gap: clamp(1.25rem, 3vw, 2.5rem);
  }

  .register-form .form-group-group:first-child .form-group:first-child {
    grid-column: 1 / -1; /* Nombre completo ocupa todo el ancho */
  }
}

/* Tablet view */
@media (max-width: 1023px) and (min-width: 768px) {
  .auth-main {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    width: 95%;
  }

  .auth-panel {
    max-width: 90%;
    width: 100%;
  }

  .auth-panel:not(.active) {
    display: none;
  }

  .mobile-tabs {
    display: flex;
    order: -1;
    width: 100%;
    max-width: 500px;
  }

  .register-form .form-group-group {
    grid-template-columns: 1fr 1fr;
    gap: clamp(1rem, 3vw, 1.5rem);
  }

  .register-form .form-group-group:first-child .form-group:first-child {
    grid-column: 1 / -1;
  }
}

/* Mobile view */
@media (max-width: 767px) {
  .auth-main {
    flex-direction: column;
    align-items: center;
  }

  .auth-panel:not(.active) {
    display: none;
  }

  .mobile-tabs {
    display: flex;
    order: -1;
  }

  .auth-card {
    margin: 0;
    border-radius: 1rem;
  }
}

@media (max-width: 480px) {
  .tab-button {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
}

/* Estilos personalizados para SweetAlert2 - VitalSystems */
:deep(.vital-systems-popup) {
  border-radius: 1.5rem !important;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2),
    0 8px 25px rgba(45, 212, 191, 0.15) !important;
  border: 1px solid rgba(45, 212, 191, 0.2) !important;
  backdrop-filter: blur(15px) !important;
  font-family: "Poppins", sans-serif !important;
}

:deep(.vital-systems-title) {
  color: #1f2b6c !important;
  font-size: 1.8rem !important;
  font-weight: 700 !important;
  text-shadow: 0 2px 4px rgba(31, 43, 108, 0.1) !important;
  margin-bottom: 1rem !important;
  font-family: "Poppins", sans-serif !important;
}

:deep(.vital-systems-content) {
  color: #374151 !important;
  font-size: 1.1rem !important;
  line-height: 1.6 !important;
  font-weight: 500 !important;
  font-family: "Poppins", sans-serif !important;
}

:deep(.vital-systems-button) {
  background: linear-gradient(135deg, #2dd4bf, #60a5fa) !important;
  border: none !important;
  border-radius: 12px !important;
  padding: 0.875rem 2rem !important;
  font-size: 1rem !important;
  font-weight: 600 !important;
  text-transform: none !important;
  box-shadow: 0 4px 15px rgba(45, 212, 191, 0.3) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  font-family: "Poppins", sans-serif !important;
}

:deep(.vital-systems-button:hover) {
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 20px rgba(45, 212, 191, 0.4) !important;
  background: linear-gradient(135deg, #26d0ce, #5ba3f5) !important;
}

:deep(.vital-systems-button:focus) {
  outline: none !important;
  box-shadow: 0 4px 15px rgba(45, 212, 191, 0.3),
    0 0 0 3px rgba(45, 212, 191, 0.2) !important;
}

:deep(.vital-systems-icon) {
  border-color: #2dd4bf !important;
}

:deep(.vital-systems-icon .swal2-success-line-tip),
:deep(.vital-systems-icon .swal2-success-line-long) {
  background-color: #2dd4bf !important;
}

:deep(.vital-systems-icon .swal2-success-ring) {
  border-color: #2dd4bf !important;
}

/* Estilos globales para sobrescribir todas las fuentes de SweetAlert2 */
:deep(.swal2-popup) {
  font-family: "Poppins", sans-serif !important;
}

:deep(.swal2-title) {
  font-family: "Poppins", sans-serif !important;
}

:deep(.swal2-html-container) {
  font-family: "Poppins", sans-serif !important;
}

:deep(.swal2-confirm) {
  font-family: "Poppins", sans-serif !important;
}

:deep(.swal2-cancel) {
  font-family: "Poppins", sans-serif !important;
}

:deep(.swal2-deny) {
  font-family: "Poppins", sans-serif !important;
}
</style>
