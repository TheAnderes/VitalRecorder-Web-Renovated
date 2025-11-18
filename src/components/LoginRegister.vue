<template>
  <div class="login-wrapper">
    <div class="container" :class="{ active: activePanel === 'register' }">
    <!-- Login form -->
    <div class="form-box login">
      <form @submit.prevent="handleLogin">
        <h1>Inicia Sesión</h1>

        <div class="input-box">
          <input
            type="email"
            placeholder="Correo electrónico"
            v-model="loginData.email"
            required
          />
              <i class="bx bx-envelope"></i>
        </div>

        <div class="input-box">
          <input
            type="password"
            placeholder="Contraseña"
            v-model="loginData.password"
            required
          />
              <i class="bx bx-lock-alt"></i>
        </div>

        <div class="forgot-link">
          <a href="/recuperar-contrasena">Olvidaste tu contraseña?</a>
        </div>

        <button type="submit" class="btn" :disabled="loginLoading">Inicia Sesión</button>

      
      </form>
    </div>

    <!-- Register form -->
    <div class="form-box register">
      <form @submit.prevent="handleRegister">
        <h1>Registrarse</h1>

        <div class="input-box">
          <input
            type="text"
            placeholder="Nombre completo"
            v-model="registerData.fullName"
            required
          />
          <i class="bx bx-user"></i>
        </div>

        <div class="input-box">
          <input
            type="email"
            placeholder="Correo electrónico"
            v-model="registerData.email"
            required
          />
          <i class="bx bx-envelope"></i>
        </div>

        <div class="input-box">
          <input
            type="password"
            placeholder="Contraseña"
            v-model="registerData.password"
            required
            minlength="6"
          />
          <i class="bx bx-lock-alt"></i>
        </div>

              <div class="input-box">
                <input
                  type="tel"
                  placeholder="Número de celular"
                  v-model="registerData.phone"
                  required
                />
                <i class="bx bx-phone"></i>
              </div>

              <div class="input-box">
                <input
                  type="date"
                  v-model="registerData.dob"
                  required
                />
                <i class="bx bx-calendar"></i>
              </div>

        <button type="submit" class="btn" :disabled="registerLoading">Registrarse</button>

      </form>
    </div>

    <!-- Toggle panels -->
    <div class="toggle-box">
      <div class="toggle-panel toggle-left">
        <div class="brand-section">
          <img src="/Logo.png" alt="VitalRecorder logo" class="brand-logo" />
          <h1>BIENVENIDO A <br>VITAL RECORDER</h1>
        </div>
        <p>Estás iniciando sesión para acceder a tu cuenta y gestionar tus datos en VitalRecorder.</p>
        <button class="btn register-btn" type="button" @click="switchToRegister">Registrate</button>
      </div>

      <div class="toggle-panel toggle-right">
        <div class="brand-section">
          <img src="/Logo.png" alt="VitalRecorder logo" class="brand-logo" />
          <h1>BIENVENIDO A <br>VITAL RECORDER</h1>
        </div>
        <p>Regístrate para crear tu cuenta y empezar a usar todas las funciones de VitalRecorder.</p>
        <button class="btn login-btn" type="button" @click="switchToLogin">Inicia Sesión</button>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
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
// UI components removed — using plain HTML inputs/buttons for this layout

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

// Observar cambios en la ruta (query / path / name) para actualizar el panel
watch(
  () => route.fullPath,
  () => {
    if (
      route.query.mode === "register" ||
      (route.path && route.path.includes("register")) ||
      route.name === "register"
    ) {
      activePanel.value = "register";
    } else if (
      route.query.mode === "login" ||
      (route.path && route.path.includes("login")) ||
      route.name === "login"
    ) {
      activePanel.value = "login";
    }
  }
);

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

      // Mapeo explícito de roles → rutas
      if (userRole === "admin" || userRole === "super_admin") {
        redirectPath = "/admin/dashboard";
        welcomeText = "Bienvenido al panel de administración.";
        console.log("Redirigiendo a admin dashboard");
      } else if (userRole === "user" || userRole === "cuidador" || !userRole) {
        redirectPath = "/dashboard";
        welcomeText = "Bienvenido a tu dashboard de usuario.";
        console.log("Redirigiendo a user dashboard");
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
    !registerData.value.password.trim() ||
    !registerData.value.phone.trim() ||
    !registerData.value.dob
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
    // Forzar rol 'user' (Paciente)
    const roleToSave = 'user';

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
      role: roleToSave, // Guardar el rol elegido (user o cuidador)
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
    }).then(async () => {
      // Después del registro exitoso, redirigir según rol (user/cuidador → dashboard, admin → admin/dashboard)
      try {
        const { getUserRole } = useAdmin();
        const newRole = await getUserRole(user.uid);
        if (newRole === 'admin' || newRole === 'super_admin') {
          router.push('/admin/dashboard');
        } else {
          // usuarios por defecto y cuidadores van al dashboard de usuario
          router.push('/dashboard');
        }
      } catch (e) {
        // Fallback: ir al dashboard de usuario
        console.error('Error al obtener rol después del registro:', e);
        router.push('/dashboard');
      } finally {
        // Limpiar el formulario de registro
        registerData.value = {
          fullName: "",
          email: "",
          password: "",
          phone: "",
          dob: "",
        };
      }
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
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  text-decoration: none;
  list-style: none;
}

.login-wrapper{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  overflow: hidden;
}

.login-wrapper::before{
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('./icons/FondoRegister.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: brightness(0.6) blur(1px);
  z-index: 0;
  transform: translateZ(0);
}

.container{
  position: relative;
  width: 850px;
  height: 550px;
  background: #fff;
  margin: 0;
  border-radius: 30px;
  box-shadow: 0 0 30px rgba(0, 0, 0, .2);
  overflow: hidden;
  z-index: 1;
}

    .container h1{
        font-size: 36px;
        margin: -10px 0;
    }

    .container p{
        font-size: 14.5px;
        margin: 15px 0;
    }

form{ width: 100%; }

.form-box{
    position: absolute;
    right: 0;
    width: 50%;
    height: 100%;
    background: #fff;
    display: flex;
    align-items: center;
    color: #333;
    text-align: center;
    padding: 40px;
    z-index: 1;
    transition: .6s ease-in-out 1.2s, visibility 0s 1s;
}

    .container.active .form-box{ right: 50%; }

    .form-box.register{ visibility: hidden; }
        .container.active .form-box.register{ visibility: visible; }

.input-box{
    position: relative;
    margin: 18px 0;
}

    .input-box input{
      width: 100%;
      /* dejar espacio a la izquierda para el icono */
      padding: 10px 20px 13px 50px;
        background: #eee;
        border-radius: 8px;
        border: none;
        outline: none;
        font-size: 16px;
        color: #333;
        font-weight: 500;
    }

        .input-box input::placeholder{
            color: #888;
            font-weight: 400;
        }
    
    .input-box i{
      position: absolute;
      left: 16px; /* icono a la izquierda dentro del input */
      top: 50%;
      transform: translateY(-50%);
      font-size: 18px;
      color: #64748b;
      pointer-events: none;
    }

.forgot-link{ margin: -15px 0 15px; }
    .forgot-link a{
        font-size: 14.5px;
        color: #333;
    }

.btn{
    width: 100%;
    height: 48px;
    background: #576eaf;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: #fff;
    font-weight: 600;
}

.social-icons{
    display: flex;
    justify-content: center;
}

    .social-icons a{
        display: inline-flex;
        padding: 10px;
        border: 2px solid #ccc;
        border-radius: 8px;
        font-size: 24px;
        color: #333;
        margin: 0 8px;
    }

.toggle-box{
    position: absolute;
    width: 100%;
    height: 100%;
}

    .toggle-box::before{
        content: '';
        position: absolute;
        left: -250%;
        width: 300%;
        height: 100%;
        background: #111f43;
        /* border: 2px solid red; */
        border-radius: 150px;
        z-index: 2;
        transition: 1.8s ease-in-out;
    }

        .container.active .toggle-box::before{ left: 50%; }

.toggle-panel{
    position: absolute;
    width: 50%;
    height: 100%;
    /* background: seagreen; */
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2;
    transition: .6s ease-in-out;
}

    .toggle-panel.toggle-left{ 
        left: 0;
        transition-delay: 1.2s; 
    }
        .container.active .toggle-panel.toggle-left{
            left: -50%;
            transition-delay: .6s;
        }

    .toggle-panel.toggle-right{ 
        right: -50%;
        transition-delay: .6s;
    }
        .container.active .toggle-panel.toggle-right{
            right: 0;
            transition-delay: 1.2s;
        }

    .toggle-panel p{ margin-bottom: 20px; }

    .toggle-panel .btn{
        width: 160px;
        height: 46px;
        background: transparent;
        border: 2px solid #fff;
        box-shadow: none;
    }

    .toggle-panel .brand-section{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      justify-content: center;
      margin-bottom: 12px;
    }

    .toggle-panel .brand-logo{
      width: 64px;
      height: auto;
      display: block;
    }

    .toggle-panel h1{
      font-size: 28px;
      margin: 0;
      line-height: 1.1;
    }

    .toggle-panel p{
      max-width: 300px;
      margin-bottom: 20px;
      color: rgba(255,255,255,0.95);
    }

@media screen and (max-width: 650px){
    .container{ height: calc(100vh - 40px); }

    .form-box{
        bottom: 0;
        width: 100%;
        height: 70%;
    }

        .container.active .form-box{
            right: 0;
            bottom: 30%;
        }

    .toggle-box::before{
        left: 0;
        top: -270%;
        width: 100%;
        height: 300%;
        border-radius: 20vw;
    }

        .container.active .toggle-box::before{
            left: 0;
            top: 70%;
        }

        .container.active .toggle-panel.toggle-left{
            left: 0;
            top: -30%;
        }

    .toggle-panel{ 
        width: 100%;
        height: 30%;
    }
        .toggle-panel.toggle-left{ top: 0; }
        .toggle-panel.toggle-right{
            right: 0;
            bottom: -30%;
        }

            .container.active .toggle-panel.toggle-right{ bottom: 0; }
}

@media screen and (max-width: 400px){
    .form-box { padding: 20px; }

    .toggle-panel h1{font-size: 30px; }
}

/* small helper for icons (boxicons) */
.bx{ font-size:18px; }

</style>
