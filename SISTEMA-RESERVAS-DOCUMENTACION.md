# 🛏️ Sistema de Reservas Casona Belga - Documentación Completa

## 📋 Índice

1. [Visión General](#visión-general)
2. [Características](#características)
3. [Instalación y Configuración](#instalación-y-configuración)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Uso del Sistema](#uso-del-sistema)
6. [Panel Administrativo](#panel-administrativo)
7. [API Endpoints](#api-endpoints)
8. [Mantenimiento](#mantenimiento)
9. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## 🎯 Visión General

El Sistema de Reservas de Casona Belga es una solución **inhouse (propia)** desarrollada específicamente para gestionar las reservas de las 3 habitaciones del hotel sin costos mensuales de plataformas externas como Beds24.

### ¿Por qué un sistema propio?

- ✅ **$0 de costo mensual** (vs €15.50/mes de Beds24 = €186/año)
- ✅ **Control total** sobre los datos y el proceso
- ✅ **100% personalizable** según tus necesidades
- ✅ **Sin comisiones** por reserva
- ✅ **Datos propios** no dependen de terceros

### Lo que NO hace (por ahora)

- ❌ No sincroniza automáticamente con Booking.com (actualización manual)
- ❌ No procesa pagos online (se coordinan por separado)
- ❌ No incluye sistema de precios dinámicos por temporada

---

## ✨ Características

### Para los Huéspedes:

1. **Calendario Visual Interactivo**
   - Ver disponibilidad en tiempo real
   - Seleccionar fechas fácilmente
   - Ver qué habitaciones están ocupadas

2. **Formulario de Reserva Sencillo**
   - Proceso en 3 pasos claros
   - Validación de datos en tiempo real
   - Confirmación inmediata por email

3. **Notificaciones Automáticas**
   - Email de confirmación de solicitud
   - Email cuando se aprueba la reserva
   - Email si se rechaza (con opción de alternativa)

### Para Ti (Administrador):

1. **Panel Admin Profesional**
   - Ver todas las reservas en una tabla
   - Filtrar por estado (pendiente/confirmada/rechazada)
   - Filtrar por habitación
   - Estadísticas en tiempo real

2. **Gestión de Reservas**
   - Aprobar/rechazar con un click
   - Ver detalles completos de cada reserva
   - Emails automáticos al cambiar estado

3. **Base de Datos Local**
   - Almacenamiento en archivo JSON
   - Sin dependencias de servicios externos
   - Backup fácil (solo copiar el archivo)

---

## 🚀 Instalación y Configuración

### Paso 1: Instalar Dependencias

```bash
cd backend
npm install nodemailer
```

### Paso 2: Configurar Gmail para Emails

1. Ve a tu cuenta de Google: https://myaccount.google.com
2. Ve a **Seguridad** → **Verificación en 2 pasos** (actívala si no está activa)
3. Ve a **Contraseñas de aplicaciones**: https://myaccount.google.com/apppasswords
4. Crea una nueva contraseña de aplicación:
   - Nombre: "Casona Belga Reservas"
   - Copia la contraseña de 16 caracteres

### Paso 3: Configurar Variables de Entorno

Edita el archivo `backend/.env`:

```env
# Google Gemini API Key (ya lo tienes)
GEMINI_API_KEY=tu_clave_actual

# Server Port
PORT=3000

# Node Environment
NODE_ENV=development

# EMAIL CONFIGURATION
EMAIL_USER=casonabelga@gmail.com
EMAIL_PASSWORD=tu_contraseña_de_aplicacion_aqui
ADMIN_EMAIL=casonabelga@gmail.com
FROM_EMAIL=casonabelga@gmail.com
```

### Paso 4: Iniciar el Servidor

```bash
cd backend
npm run dev
```

El servidor estará corriendo en: http://localhost:3000

### Paso 5: Configurar la URL del API (Producción)

Cuando despliegues a producción (Railway, Netlify, etc.), actualiza la URL del API en:

1. `reservas.html` (línea ~280):
```javascript
window.BOOKING_API_URL = 'https://tu-dominio-railway.up.railway.app/api';
```

2. `en/bookings.html` (línea ~280):
```javascript
window.BOOKING_API_URL = 'https://tu-dominio-railway.up.railway.app/api';
```

3. `admin.html` (línea ~414):
```javascript
const API_URL = 'https://tu-dominio-railway.up.railway.app/api';
```

---

## 📁 Estructura del Proyecto

```
casona-belga/
│
├── backend/
│   ├── models/
│   │   └── Booking.js           # Modelo de datos de reservas
│   ├── services/
│   │   └── emailService.js      # Servicio de envío de emails
│   ├── bookings.json            # Base de datos (archivo JSON)
│   ├── server.js                # Servidor Express con endpoints
│   ├── package.json
│   └── .env                     # Configuración (NO SUBIR A GIT)
│
├── reservas.html                # Página de reservas (español)
├── en/bookings.html             # Página de reservas (inglés)
├── admin.html                   # Panel administrativo
├── booking-calendar.js          # JavaScript del calendario
├── booking-calendar.css         # Estilos del calendario
│
└── SISTEMA-RESERVAS-DOCUMENTACION.md  # Este archivo
```

---

## 📖 Uso del Sistema

### Para Huéspedes

1. **Acceder a la página de reservas**
   - Español: https://casonabelga.cl/reservas.html
   - Inglés: https://casonabelga.cl/en/bookings.html

2. **Seleccionar habitación**
   - Clic en el botón de la habitación deseada

3. **Seleccionar fechas**
   - Clic en el día de llegada (check-in)
   - Clic en el día de salida (check-out)
   - Las fechas ocupadas aparecen en rojo

4. **Completar formulario**
   - Nombre completo
   - Email
   - Teléfono/WhatsApp
   - Número de huéspedes (1-3)
   - Comentarios opcionales

5. **Enviar solicitud**
   - Recibirá email de confirmación inmediato
   - Tú recibirás notificación de la nueva solicitud
   - Deberás aprobar o rechazar desde el panel admin

### Para Administrador

1. **Acceder al Panel Admin**
   - URL: https://casonabelga.cl/admin.html
   - Contraseña: `casona2024` (⚠️ CÁMBIALA en admin.html línea 414)

2. **Ver Solicitudes Pendientes**
   - Aparecen en la tabla con estado "Pendiente"
   - Click en "Ver" para ver detalles completos

3. **Aprobar Reserva**
   - Click en "Confirmar"
   - Se envía email automático al huésped
   - La habitación queda bloqueada en el calendario

4. **Rechazar Reserva**
   - Click en "Rechazar"
   - Opción de escribir motivo
   - Se envía email explicativo al huésped

---

## 🔐 Panel Administrativo

### Acceso

- **URL**: `https://casonabelga.cl/admin.html`
- **Contraseña por defecto**: `casona2024`

⚠️ **IMPORTANTE**: Cambia la contraseña en [admin.html:414](admin.html#L414):

```javascript
const ADMIN_PASSWORD = 'tu_nueva_contraseña_segura';
```

### Funciones

1. **Estadísticas en Tiempo Real**
   - Pendientes: Solicitudes esperando aprobación
   - Confirmadas: Reservas aprobadas
   - Total del Mes: Reservas creadas este mes
   - Ingresos Proyectados: Total de reservas confirmadas

2. **Filtros**
   - Por estado: Todos, Pendientes, Confirmadas, Rechazadas, Canceladas
   - Por habitación: Todas, Tehuelche, Yaganes, Chonos

3. **Acciones sobre Reservas**
   - **Ver**: Detalles completos (email, teléfono, comentarios)
   - **Confirmar**: Aprobar y enviar email al huésped
   - **Rechazar**: Rechazar y opcionalmente dar un motivo

---

## 🔌 API Endpoints

### GET /api/bookings
Obtener todas las reservas

**Query params**:
- `status`: pending | confirmed | rejected | cancelled
- `room`: tehuelche | yaganes | chonos

**Respuesta**:
```json
{
  "bookings": [
    {
      "id": "BK-1707234567-abc123",
      "room": "tehuelche",
      "checkIn": "2024-03-15",
      "checkOut": "2024-03-17",
      "guests": 2,
      "guestName": "Juan Pérez",
      "guestEmail": "juan@email.com",
      "guestPhone": "+56912345678",
      "comments": "",
      "status": "pending",
      "totalPrice": 190000,
      "createdAt": "2024-02-06T12:00:00Z",
      "updatedAt": "2024-02-06T12:00:00Z"
    }
  ]
}
```

### POST /api/bookings
Crear nueva solicitud de reserva

**Body**:
```json
{
  "room": "tehuelche",
  "checkIn": "2024-03-15",
  "checkOut": "2024-03-17",
  "guests": 2,
  "guestName": "Juan Pérez",
  "guestEmail": "juan@email.com",
  "guestPhone": "+56912345678",
  "comments": "Llegada aprox. 18:00"
}
```

**Respuesta**:
```json
{
  "message": "Booking request created successfully",
  "booking": { /* detalles */ }
}
```

### PATCH /api/bookings/:id/status
Actualizar estado de una reserva (admin)

**Body**:
```json
{
  "status": "confirmed",
  "reason": "Motivo del rechazo (opcional)"
}
```

### GET /api/availability
Obtener disponibilidad de todas las habitaciones

**Query params**:
- `year`: 2024
- `month`: 3 (1-12)

**Respuesta**:
```json
{
  "year": 2024,
  "month": 3,
  "availability": {
    "tehuelche": ["2024-03-15", "2024-03-16", "2024-03-20"],
    "yaganes": ["2024-03-18", "2024-03-19"],
    "chonos": []
  }
}
```

### POST /api/availability/check
Verificar si fechas específicas están disponibles

**Body**:
```json
{
  "room": "tehuelche",
  "checkIn": "2024-03-15",
  "checkOut": "2024-03-17"
}
```

**Respuesta**:
```json
{
  "room": "tehuelche",
  "checkIn": "2024-03-15",
  "checkOut": "2024-03-17",
  "available": true
}
```

---

## 🔧 Mantenimiento

### Backup de la Base de Datos

La base de datos es un simple archivo JSON: `backend/bookings.json`

**Hacer backup manual**:
```bash
cp backend/bookings.json backend/bookings-backup-$(date +%Y%m%d).json
```

**Backup automático** (agregar a crontab):
```bash
0 0 * * * cp /ruta/backend/bookings.json /ruta/backups/bookings-$(date +\%Y\%m\%d).json
```

### Actualizar Precios

Editar [booking-calendar.js:16](booking-calendar.js#L16):

```javascript
const ROOM_PRICES = {
  tehuelche: 95000,  // Cambiar aquí
  yaganes: 95000,    // Cambiar aquí
  chonos: 95000      // Cambiar aquí
};
```

### Cambiar Contraseña del Admin

Editar [admin.html:414](admin.html#L414):

```javascript
const ADMIN_PASSWORD = 'nueva_contraseña_segura';
```

### Bloquear Fechas Manualmente

Si necesitas cerrar el hotel por días específicos:

1. Opción 1: Crear una reserva falsa en el panel admin
2. Opción 2: Editar directamente `backend/bookings.json`:

```json
{
  "bookings": [
    {
      "id": "BK-BLOCKED-001",
      "room": "tehuelche",
      "checkIn": "2024-03-20",
      "checkOut": "2024-03-25",
      "status": "confirmed",
      "guestName": "BLOQUEADO - Mantenimiento",
      ...
    }
  ]
}
```

### Sincronizar con Booking.com

⚠️ **IMPORTANTE**: Este sistema NO sincroniza automáticamente con Booking.com

**Proceso manual**:
1. Cuando apruebes una reserva aquí → Ve a Booking.com y bloquea esas fechas
2. Cuando recibas una reserva de Booking.com → Créala aquí como "confirmada"

**Recomendación**: Revisa ambos sistemas diariamente para evitar overbooking.

---

## ❓ Preguntas Frecuentes

### ¿Cómo cambio los textos de los emails?

Edita el archivo `backend/services/emailService.js`:
- Método `sendBookingRequestToGuest()`: Email al huésped (solicitud recibida)
- Método `sendBookingConfirmation()`: Email de confirmación
- Método `sendBookingRejection()`: Email de rechazo

### ¿Puedo agregar más habitaciones?

Sí, edita estos archivos:

1. `backend/models/Booking.js` (línea 11):
```javascript
const ROOMS = {
  TEHUELCHE: 'tehuelche',
  YAGANES: 'yaganes',
  CHONOS: 'chonos',
  NUEVA_HABITACION: 'nueva_habitacion'  // Agregar aquí
};
```

2. `booking-calendar.js` (línea 8 y 16):
```javascript
const ROOMS = {
  tehuelche: 'Habitación Tehuelche',
  yaganes: 'Habitación Yaganes',
  chonos: 'Habitación Chonos',
  nueva_habitacion: 'Nueva Habitación'  // Agregar aquí
};

const ROOM_PRICES = {
  tehuelche: 95000,
  yaganes: 95000,
  chonos: 95000,
  nueva_habitacion: 110000  // Agregar aquí
};
```

### ¿Los emails no se están enviando?

Verifica:

1. ✅ Gmail App Password configurada correctamente en `.env`
2. ✅ Verificación en 2 pasos activada en tu cuenta de Google
3. ✅ `EMAIL_USER` y `EMAIL_PASSWORD` correctos en `.env`
4. ✅ Servidor backend corriendo
5. ✅ Revisar logs en la consola del servidor: `npm run dev`

### ¿Cómo veo los logs del servidor?

```bash
cd backend
npm run dev

# Verás logs como:
# ✅ Guest notification sent to: juan@email.com
# ✅ Admin notification sent
# ❌ Error sending emails: [error details]
```

### ¿Puedo usar otro servicio de email (no Gmail)?

Sí, edita `backend/services/emailService.js` (línea 16):

**Para Outlook/Hotmail**:
```javascript
this.transporter = nodemailer.createTransporter({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
```

**Para SMTP genérico**:
```javascript
this.transporter = nodemailer.createTransporter({
  host: 'smtp.tuservidor.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
```

### ¿Cómo exporto todas las reservas a Excel?

Opción 1 - Manual:
1. Abre `backend/bookings.json`
2. Copia el contenido
3. Usa https://json-csv.com para convertir a CSV
4. Abre en Excel

Opción 2 - Desde el panel admin (futuro):
Podemos agregar un botón "Exportar a CSV" si lo necesitas.

### ¿Cuántas reservas puede manejar?

El sistema actual con archivo JSON puede manejar sin problemas:
- ✅ 100-500 reservas: Excelente rendimiento
- ✅ 500-1000 reservas: Bueno
- ⚠️ 1000+ reservas: Considera migrar a MongoDB

Para tu caso (3 habitaciones), esto significa varios años de reservas.

---

## 🎯 Próximos Pasos Sugeridos

### Mejoras Opcionales:

1. **Integración con Booking.com API**
   - Sincronización bidireccional automática
   - Complejidad: Alta
   - Tiempo: 1-2 semanas

2. **Pagos Online con Stripe/MercadoPago**
   - Procesar pagos directamente
   - Complejidad: Media
   - Tiempo: 3-5 días

3. **Sistema de Precios por Temporada**
   - Temporada alta/baja automática
   - Complejidad: Baja
   - Tiempo: 1 día

4. **Exportar Reportes en PDF**
   - Generar reportes mensuales
   - Complejidad: Baja
   - Tiempo: 1 día

5. **Notificaciones por WhatsApp** (además de email)
   - Usar Twilio API
   - Complejidad: Media
   - Tiempo: 2 días

---

## 📞 Soporte

Si tienes problemas o preguntas:

1. **Revisa los logs del servidor**: `npm run dev` en `backend/`
2. **Verifica la configuración**: `.env` con las credenciales correctas
3. **Revisa la consola del navegador**: F12 → Console (para errores de frontend)
4. **Contacta al desarrollador** (yo) con detalles del error

---

## 📝 Notas Finales

### Seguridad

- ⚠️ **Cambia la contraseña del admin** en producción
- ⚠️ **Nunca subas `.env` a GitHub** (ya está en `.gitignore`)
- ✅ El archivo `bookings.json` NO contiene información sensible de pago
- ✅ Solo almacena: nombres, emails, teléfonos, fechas

### Costos

- **Desarrollo**: Gratis (hecho)
- **Hosting backend**: $0-5 USD/mes (Railway free tier o Render)
- **Hosting frontend**: $0 (ya lo tienes)
- **Email (Gmail)**: $0
- **Total mensual**: $0-5 USD vs €15.50 de Beds24

### Backup

Recomendación: Hacer backup semanal de `backend/bookings.json`

---

¡Tu sistema de reservas está listo! 🎉

Cualquier duda, estoy aquí para ayudarte.
