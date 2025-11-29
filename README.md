# 🌐 VitalRecorder Web - Panel Administrativo

![Vue.js](https://img.shields.io/badge/Vue.js-3.5.18-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-12.2.1-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Node](https://img.shields.io/badge/Node.js-20.19.0+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 📋 Descripción

**VitalRecorder Web** es una aplicación web administrativa desarrollada en Vue.js 3 que permite gestionar usuarios, cuidadores y planes de suscripción del ecosistema VitalRecorder. Comparte la misma base de datos Firebase con la aplicación móvil, proporcionando una interfaz centralizada para administradores.

### 🎯 Funcionalidades Principales

- ✅ Gestión completa de usuarios y cuidadores
- 📊 Visualización de planes de suscripción
- 📄 Generación de reportes en PDF y Word
- 🗺️ Mapas interactivos con Leaflet
- 🔐 Autenticación administrativa segura
- 📱 Sincronización en tiempo real con Firebase

---

## 🛠 Tecnologías Utilizadas

### Core
- **Vue.js 3.5.18** - Framework progresivo de JavaScript
- **Vue Router 4.5.1** - Enrutamiento para aplicaciones SPA
- **Vite 7.1.2** - Build tool de nueva generación

### Backend
- **Firebase 12.2.1** - Backend as a Service
  - Authentication
  - Cloud Firestore
  - Storage

### UI/UX
- **Bootstrap Icons 1.13.1** - Biblioteca de iconos
- **SweetAlert2 11.22.5** - Alertas y modales elegantes
- **Leaflet 1.9.4** - Mapas interactivos

### Generación de Documentos
- **jsPDF 2.5.2** - Generación de PDFs
- **html2canvas 1.4.1** - Captura de pantalla
- **docx 9.5.1** - Generación de documentos Word

---

## 📋 Requisitos Previos

- **Node.js** 20.19.0 o 22.12.0+
- **pnpm** (gestor de paquetes recomendado)
- **Git**
- **Proyecto Firebase** configurado (compartido con la app móvil)

---

## 🚀 Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/TheAnderes/VitalRecorder-Web-Renovated.git
cd VitalRecorder-Web-Renovated
```

### 2. Instalar pnpm (si no está instalado)

```bash
npm install -g pnpm
```

### 3. Instalar Dependencias

```bash
pnpm install
```

### 4. Configurar Firebase

Crear archivo `src/firebase/config.js`:

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
```

### 5. Variables de Entorno (Opcional)

Crear archivo `.env`:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

### 6. Ejecutar en Modo Desarrollo

```bash
pnpm dev
```

Aplicación disponible en: `http://localhost:5173`

### 7. Compilar para Producción

```bash
pnpm build
```

Archivos generados en: `dist/`

### 8. Previsualizar Build

```bash
pnpm preview
```

---

## 📁 Estructura del Proyecto

```
src/
├── main.js                    # Punto de entrada
├── App.vue                    # Componente raíz
├── views/                     # Páginas principales
│   ├── Dashboard.vue         # Panel principal
│   ├── Users.vue             # Gestión de usuarios
│   ├── Caregivers.vue        # Gestión de cuidadores
│   └── Plans.vue             # Gestión de planes
├── components/                # Componentes reutilizables
│   ├── UserTable.vue
│   ├── CaregiverForm.vue
│   └── PlanCard.vue
├── router/                    # Configuración de rutas
│   └── index.js
├── services/                  # Servicios Firebase
│   ├── authService.js
│   ├── userService.js
│   └── planService.js
├── composables/               # Lógica reutilizable
├── utils/                     # Utilidades
│   ├── pdfGenerator.js
│   └── validators.js
└── assets/                    # Recursos estáticos
```

**NOTA:** Todo el código fuente está en la carpeta `src/`

---

## 💡 Uso

### Autenticación Administrativa

1. Acceder a la página de login
2. Ingresar credenciales de administrador
3. Sistema verifica rol en Firebase
4. Acceso al panel administrativo

### Gestión de Usuarios

- **Ver usuarios:** Lista completa con filtros y búsqueda
- **Registrar usuario:** Formulario de alta manual
- **Editar usuario:** Modificar datos existentes
- **Cambiar plan:** Asignar plan de suscripción
- **Desactivar:** Suspender cuenta temporalmente

### Gestión de Cuidadores

- **Registrar cuidador:** Crear cuenta de cuidador
- **Asignar pacientes:** Vincular cuidador con usuarios
- **Ver relaciones:** Mapa de cuidador-paciente
- **Gestionar permisos:** Controlar accesos

### Generación de Reportes

- **Exportar a PDF:** Reportes con gráficos
- **Exportar a Word:** Documentos editables
- **Captura de pantalla:** html2canvas para visuales
- **Filtros avanzados:** Por fecha, plan, estado

---

## 🔐 Configuración de Firebase

### Reglas de Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Solo administradores
    match /users/{userId} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /caregivers/{caregiverId} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /plans/{planId} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

---

## 🌍 Despliegue

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
pnpm build
firebase deploy --only hosting
```

### Netlify

```bash
npm install -g netlify-cli
pnpm build
netlify deploy --prod --dir=dist
```

### Vercel

```bash
npm install -g vercel
vercel --prod
```

---

## 🧪 Comandos Disponibles

```bash
# Desarrollo
pnpm dev                    # Servidor de desarrollo
pnpm dev --host            # Exponer en red local

# Producción
pnpm build                 # Compilar
pnpm preview               # Previsualizar build

# Mantenimiento
pnpm install               # Instalar dependencias
pnpm update                # Actualizar paquetes
pnpm outdated              # Paquetes desactualizados
```

---

## 🔧 Solución de Problemas

### pnpm no encontrado
```bash
npm install -g pnpm
```

### Error de conexión Firebase
- Verificar `src/firebase/config.js`
- Comprobar credenciales
- Revisar reglas de Firestore

### Página en blanco después del build
- Verificar `vite.config.js`
- Revisar modo history del router

### Build falla
```bash
pnpm store prune
rm -rf node_modules
pnpm install
```

---

## 📊 Estructura de Datos

### Colección: users

```javascript
{
  uid: string,
  email: string,
  name: string,
  phone: string,
  birthDate: timestamp,
  plan: string,           // 'free', 'premium', 'family'
  createdAt: timestamp,
  caregiverId: string,
  isActive: boolean
}
```

### Colección: caregivers

```javascript
{
  uid: string,
  email: string,
  name: string,
  phone: string,
  patients: array,        // UIDs de pacientes
  createdAt: timestamp,
  isActive: boolean
}
```

### Colección: plans

```javascript
{
  id: string,             // 'free', 'premium', 'family'
  name: string,
  price: number,
  features: array,
  maxReminders: number,
  maxCaregivers: number
}
```

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/NuevaFuncionalidad`)
3. Commit cambios (`git commit -m 'Add: Nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/NuevaFuncionalidad`)
5. Abrir Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

```
MIT License

Copyright (c) 2024 VitalRecorder Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---


## 🙏 Notas Importantes

- Requiere Node.js 20.19.0 o 22.12.0+
- Usa pnpm para mejor rendimiento
- Comparte Firebase con la app móvil
- Solo para uso administrativo
- Mantener dependencias actualizadas

---

<div align="center">

**Hecho con ❤️ para gestionar VitalRecorder**

[🌐 Website](#) | [📱 App Móvil](https://github.com/jdanigh03/VitalRecorder-App) | [📧 Contacto](#)

</div>
