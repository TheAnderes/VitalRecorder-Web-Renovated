# Submódulos de "Pacientes" (guía rápida)

Este documento explica cómo está organizado el área de "Registro y Administración de Pacientes" dentro del admin, qué es `PatientManagement` y qué estructura/forma tienen los otros submódulos que creamos.

---

## 1) Concepto general

- `PatientManagement` (vista principal `/admin/patient`) actúa como submódulo de nivel superior dentro del área de administración. Es la página donde normalmente se muestra el listado general de pacientes, métricas (totales, activos, críticos) y acciones globales (Agregar paciente, refrescar, filtros globales).
-- Los demás elementos que añadimos son submódulos específicos con su propia vista, estructura y responsabilidad: `registro`, `perfil`, `busqueda`, `reportes`. Cada uno apunta a una ruta propia bajo `/admin/patient/<id>` y puede contener pantallas, formularios y componentes diferentes.

## 2) Rutas creadas

Las rutas que se añadieron en `src/router/adminRoutes.js` son:

- `/admin/patient` — `admin-patient` → `src/views/admin/PatientManagement.vue` (listado/overview)
- `/admin/patient/registro` — `admin-patient-registro` → `src/views/admin/PatientRegistro.vue`
- `/admin/patient/perfil` — `admin-patient-perfil` → `src/views/admin/PatientPerfil.vue`
- `/admin/patient/busqueda` — `admin-patient-busqueda` → `src/views/admin/PatientBusqueda.vue`
- `/admin/patient/reportes` — `admin-patient-reportes` → `src/views/admin/PatientReportes.vue`

> Archivos creados: `src/views/admin/PatientRegistro.vue`, `PatientPerfil.vue`, `PatientBusqueda.vue`, `PatientReportes.vue`.

## 3) Propósito y estructura sugerida por submódulo

A continuación una breve descripción de la forma (estructura) recomendada para cada submódulo.

- Registro de Pacientes (`registro`)
  - Propósito: formulario para crear un paciente nuevo.
  - Componentes sugeridos: `BaseInput`, `BaseSelect`, `PrimaryButton`, `BaseCard`.
  - Data/submit: objeto `patient` con campos mínimos: { id?, nombre, dni, email, telefono, fechaNacimiento, direccion, grupo }
  - Acciones: validar, submit → llamar a `userService.createPatient(payload)` o al servicio que uses.

- Perfil del Paciente (`perfil`)
  - Propósito: vista de detalle (read-only + acciones rápidas: editar, ver historial, documentos).
  - Componentes: avatar, `PointViewCard`, `InformationProductCard` (o equivalente), botones para editar/descargar.
  - Entrada: `patientId` (param de ruta o query).
  - Acciones: cargar paciente por id (`userService.getPatient(id)`), mostrar, nav a editar.

<!-- Operaciones CRUD removed in this branch - implement on demand -->

- Búsqueda y Filtrado (`busqueda`)
  - Propósito: UI avanzada de búsqueda (filtros por estado, grupo, fecha, texto libre), guardado de queries frecuentes.
  - Componentes: `BaseInput` para búsqueda, selects para filtros, chips de filtros aplicados.
  - UX: debounce en input, mostrar resultados incrementales.

- Listados y Reportes (`reportes`)
  - Propósito: generar y exportar listados (CSV, PDF) y vistas predefinidas de reportes.
  - Componentes: botones de export, selector de columnas, preview de tabla.
  - Backend: endpoints para generar/streaming CSV y PDF o generación client-side.

<!-- Asignaciones y Relaciones removed in this branch - implement on demand -->

## 4) Shape de datos (ejemplo compacto)

Recomendado un `patient` shape común para compartir entre submódulos:

```json
{
  "id": "string",
  "nombre": "string",
  "dni": "string",
  "email": "string",
  "telefono": "string",
  "fechaNacimiento": "2024-01-01",
  "direccion": "string",
  "grupo": "string",
  "estado": "activo|inactivo|critico",
  "documentos": [ { "id": "", "tipo": "", "url": "" } ]
}
```

Usar este shape facilita reusar componentes y servicios.

## 5) Integración con `PatientManagement` (cómo conectar)

- Desde `PatientManagement` (listado) puedes añadir botones o links por fila para abrir:
  - Perfil: `/admin/patient/perfil?patientId=123` o `/admin/patient/perfil` + route param
  - Edit: abrir `/admin/patient/registro` en modo edición (puedes pasar `?editId=123` o usar ruta distinta `/admin/patient/registro/:id`)
- En el listado, añadir acciones rápidas que redirijan a los submódulos correspondientes.

Ejemplo de `router-link` en tabla:
```vue
<router-link :to="{ path: `/admin/patient/perfil`, query: { patientId: p.id } }">Ver perfil</router-link>
```

## 6) Permisos

- Mantén las rutas bajo meta `{ requiredRole: ['admin','super_admin'] }` como ya están.
- Si algunos submódulos deben esconderse según permisos, controla `patientSubmodules` desde `useAdmin()` y filtra el array antes de iterar en la barra lateral.

## 7) Próximos pasos prácticos que puedo hacer por ti

- Conectar los formularios de `PatientRegistro.vue` a `src/services/userService.js` (o crear funciones mock si no existe).
- Añadir la carga real de datos en `PatientPerfil.vue` usando el `patientId` (query o param).
- Mejorar la UI usando los componentes compartidos (`src/components/shared/*`).
- Añadir pruebas unitarias o e2e para navegación entre submódulos.

---

Si quieres, procedo a cualquiera de estos pasos y lo implemento ahora (por ejemplo: conectar `PatientPerfil.vue` para leer `patientId` de la query y pedir datos al servicio). ¿Qué prefieres que haga primero?
