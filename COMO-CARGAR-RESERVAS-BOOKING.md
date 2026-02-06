# 📥 Cómo Cargar Reservas de Booking.com

## 🎯 Opciones Disponibles

Tienes **3 formas** de cargar las reservas que recibes de Booking.com a tu sistema:

---

## ✅ Opción 1: Panel Admin - "Nueva Reserva" (Recomendada)

### La Más Rápida y Fácil

1. **Accede al Panel Admin**
   - URL: https://casonabelga.cl/admin.html
   - Contraseña: `casona2024`

2. **Click en "➕ Nueva Reserva"**
   - Botón verde en la sección de filtros

3. **Completa el Formulario**
   ```
   Habitación: Tehuelche / Yaganes / Chonos
   Estado: Confirmada (para reservas de Booking.com)
   Check-in: 2024-03-15
   Check-out: 2024-03-17
   Nombre: Juan Pérez
   Huéspedes: 2
   Email: juan@email.com
   Teléfono: +56912345678
   Origen: Booking.com
   Comentarios: ID de Booking.com: 12345678
   ```

4. **Click en "Guardar Reserva"**
   - ✅ La reserva aparece en el calendario
   - ✅ Las fechas quedan bloqueadas
   - 📧 NO se envían emails (ya Booking.com lo hace)

### 💡 Ventajas

- ⚡ Rápido: 30 segundos por reserva
- ✅ Interfaz visual fácil de usar
- ✅ Validación automática de datos
- ✅ No requiere conocimientos técnicos

---

## 📊 Opción 2: Exportar desde Booking.com e Importar

### Para cargar múltiples reservas a la vez

**Próximamente**: Puedo agregarte un botón "Importar CSV" si lo necesitas.

El proceso sería:
1. Exportar reservas desde Booking.com (formato CSV/Excel)
2. Click en "Importar CSV" en el panel admin
3. Seleccionar el archivo
4. ✅ Todas las reservas se cargan automáticamente

¿Quieres que desarrolle esta funcionalidad?

---

## 🔧 Opción 3: Editar Directamente el JSON (Avanzada)

### Solo para usuarios técnicos

1. **Abre el archivo de base de datos**
   ```bash
   backend/bookings.json
   ```

2. **Agrega la reserva manualmente**
   ```json
   {
     "bookings": [
       {
         "id": "BK-BOOKING-12345678",
         "room": "tehuelche",
         "checkIn": "2024-03-15",
         "checkOut": "2024-03-17",
         "guests": 2,
         "guestName": "Juan Pérez",
         "guestEmail": "juan@email.com",
         "guestPhone": "+56912345678",
         "comments": "[Booking.com] ID: 12345678",
         "status": "confirmed",
         "totalPrice": 190000,
         "createdAt": "2024-02-06T12:00:00Z",
         "updatedAt": "2024-02-06T12:00:00Z"
       }
     ]
   }
   ```

3. **Guarda el archivo**

4. **Reinicia el servidor** (si está corriendo)
   ```bash
   cd backend
   npm run dev
   ```

### ⚠️ Precauciones

- Haz backup antes: `cp bookings.json bookings-backup.json`
- Respeta el formato JSON (comas, llaves, comillas)
- Usa un validador JSON: https://jsonlint.com

---

## 🔄 Flujo Recomendado

### Cuando recibes una reserva de Booking.com:

1. **Recibes notificación de Booking.com** (email/app)

2. **Entra al panel admin** de tu sistema

3. **Click en "➕ Nueva Reserva"**

4. **Copia los datos desde Booking.com:**
   - Nombre del huésped
   - Email
   - Teléfono (si lo tiene)
   - Fechas (check-in/check-out)
   - Habitación
   - Número de huéspedes

5. **Selecciona:**
   - **Origen:** "Booking.com"
   - **Estado:** "Confirmada"
   - **Comentarios:** Agrega el ID de la reserva de Booking.com (útil para referencia)

6. **Guardar** → ✅ Listo!

### Beneficios:

- ✅ Tu calendario está actualizado
- ✅ Evitas overbooking
- ✅ Tienes todas las reservas en un solo lugar
- ✅ Puedes generar reportes completos

---

## 📱 Tips para Agilizar el Proceso

### 1. Crea un Template de Texto

Guarda esto en tu teléfono/computador:

```
Nueva reserva Booking.com
Nombre: [COPIAR]
Email: [COPIAR]
Teléfono: [COPIAR]
Check-in: [COPIAR]
Check-out: [COPIAR]
Habitación: [SELECCIONAR]
Huéspedes: [COPIAR]
ID Booking: [COPIAR]
```

### 2. Usa Acceso Directo en el Móvil

Guarda https://casonabelga.cl/admin.html como acceso directo en tu teléfono.

### 3. Notificaciones de Booking.com

Activa las notificaciones push de Booking.com para que te avisen inmediatamente.

---

## ❓ Preguntas Frecuentes

### ¿Puedo editar una reserva después de crearla?

Por ahora no desde el panel admin, pero puedes:
1. Ver los detalles (botón "Ver")
2. Cambiar el estado (Confirmar/Rechazar)
3. Editar directamente el `bookings.json` (opción avanzada)

**Próximamente**: Puedo agregar un botón "Editar" si lo necesitas.

### ¿Qué pasa si me olvido de cargar una reserva?

⚠️ **Riesgo de Overbooking**: Si alguien reserva en tu sitio web las mismas fechas que ya están reservadas en Booking.com.

**Solución**: Revisa Booking.com **todos los días** y carga las reservas inmediatamente.

### ¿Puedo sincronizar automáticamente con Booking.com?

Sí, pero requiere:
- Acceso a la API de Booking.com (solo cuentas business)
- Desarrollo adicional (1-2 semanas)
- Configuración de webhooks

¿Te interesa? Puedo desarrollarlo.

### ¿Cómo sé qué fechas ya están ocupadas en Booking.com?

Ve a tu extranet de Booking.com:
- **Calendar** → Ver todas las reservas
- **Bookings** → Lista de reservas confirmadas

Luego cárgalas en tu sistema usando el botón "Nueva Reserva".

### ¿Los huéspedes de Booking.com reciben emails de mi sistema?

**NO**. Cuando creas una reserva manualmente:
- No se envían emails automáticos
- Booking.com ya se encarga de eso
- Solo tú ves la reserva en tu panel admin

### ¿Puedo cargar reservas pasadas?

Sí! Solo:
1. Cambia la fecha del formulario (no tiene restricción de fecha pasada en modo admin)
2. Guarda la reserva
3. Aparecerá en el historial

Útil para:
- Mantener un historial completo
- Generar reportes mensuales
- Estadísticas de ocupación

---

## 🚀 Ejemplo Práctico

### Escenario Real:

1. **10:30 AM** - Recibes email de Booking.com:
   ```
   Nueva reserva confirmada

   Huésped: María González
   Email: maria@email.com
   Teléfono: +56 9 8765 4321
   Habitación: Habitación Doble (asignas: Tehuelche)
   Check-in: 15 de marzo, 2024
   Check-out: 17 de marzo, 2024
   Huéspedes: 2 adultos
   ID de reserva: 3487592014
   ```

2. **10:32 AM** - Entras a tu panel admin (toma 30 segundos):
   - Click "Nueva Reserva"
   - Completas:
     ```
     Habitación: Tehuelche
     Estado: Confirmada
     Check-in: 2024-03-15
     Check-out: 2024-03-17
     Nombre: María González
     Huéspedes: 2
     Email: maria@email.com
     Teléfono: +56987654321
     Origen: Booking.com
     Comentarios: ID Booking: 3487592014
     ```
   - Click "Guardar Reserva"

3. **10:33 AM** - ✅ Listo!
   - Tu calendario está actualizado
   - Nadie más puede reservar esas fechas
   - Tienes el registro completo

**Total: 3 minutos** ⚡

---

## 💡 Recomendación Final

**Opción 1 (Panel Admin)** es la mejor para tu caso porque:

- ✅ Es rápida (30 segundos por reserva)
- ✅ No requiere conocimientos técnicos
- ✅ Es visual e intuitiva
- ✅ Tiene validación automática
- ✅ Funciona desde móvil o computador

**Crea una rutina:**
- Revisa Booking.com cada mañana
- Carga nuevas reservas inmediatamente
- Listo para el día

---

## 📞 ¿Necesitas Ayuda?

Si quieres que desarrolle:
- ✅ Botón "Editar Reserva"
- ✅ Importar CSV desde Booking.com
- ✅ Sincronización automática con Booking.com API
- ✅ Cualquier otra funcionalidad

¡Solo avísame! 🚀
