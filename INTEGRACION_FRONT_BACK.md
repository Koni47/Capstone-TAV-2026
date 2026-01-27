# Integración Frontend ↔ Backend

Fecha: 2026-01-26

## Objetivo
Registrar problemas de integración detectados y las correcciones aplicadas para asegurar que el frontend y el backend funcionen correctamente juntos.

---

## Problemas detectados y soluciones

### 1) CORS inválido (bloqueo en navegador)
**Problema**: El backend habilitaba CORS con `origin: '*'` y `credentials: true`. Esta combinación es inválida en navegadores y bloquea solicitudes con credenciales/headers sensibles.

**Solución aplicada**: Se configuró CORS para:
- Usar `http://localhost:5173` como origen por defecto.
- Permitir múltiples orígenes desde `CORS_ORIGIN` (separados por coma).
- Desactivar `credentials` si se permite `*`.

**Archivo**: [backend/src/main.ts](backend/src/main.ts)

---

### 2) Actualización de usuarios con método HTTP incorrecto
**Problema**: El frontend enviaba `PATCH /users/:id`, pero el backend expone `PUT /users/:id`.

**Solución aplicada**: Se cambió el método en el cliente para usar `PUT`.

**Archivo**: [frontend/src/services/api.ts](frontend/src/services/api.ts)

---

### 3) IDs de viaje enviados como números (parseInt)
**Problema**: En la creación de viajes desde el frontend, se convertían IDs (UUID) con `parseInt`, produciendo `NaN` y fallando validación en el backend.

**Solución aplicada**: Se enviaron IDs como `string` (sin `parseInt`), y además se agregó `vehicleId` y `serviceRequestId` al crear el viaje, para vincular correctamente la solicitud y el vehículo.

**Archivo**: [frontend/src/pages/ServiceRequestCreate.tsx](frontend/src/pages/ServiceRequestCreate.tsx)

---

## Notas
- El frontend usa `VITE_API_URL` para apuntar al backend. Si no se configura, usa `http://localhost:3000/api/v1`.
- Para CORS en producción, configurar `CORS_ORIGIN` con los dominios reales del frontend.
