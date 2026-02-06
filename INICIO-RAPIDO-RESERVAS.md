# 🚀 Inicio Rápido - Sistema de Reservas

## ⚡ Setup en 5 Minutos

### 1. Configurar Gmail para Emails (2 min)

1. Ve a: https://myaccount.google.com/apppasswords
2. Crea contraseña de aplicación llamada "Casona Belga"
3. Copia la contraseña de 16 caracteres

### 2. Editar Variables de Entorno (1 min)

Edita `backend/.env` y agrega:

```env
EMAIL_USER=casonabelga@gmail.com
EMAIL_PASSWORD=la_contraseña_que_copiaste_aqui
ADMIN_EMAIL=casonabelga@gmail.com
FROM_EMAIL=casonabelga@gmail.com
```

### 3. Iniciar el Servidor (30 seg)

```bash
cd backend
npm run dev
```

Verás:
```
🚀 Casona Belga AI Chatbot Backend running on port 3000
```

### 4. Abrir en el Navegador (30 seg)

Abre en tu navegador:
- **Página de reservas**: http://localhost:3000/../reservas.html
- **Panel admin**: http://localhost:3000/../admin.html

### 5. Cambiar Contraseña del Admin (1 min)

Edita `admin.html` línea 414:

```javascript
const ADMIN_PASSWORD = 'tu_nueva_contraseña_segura';  // Cambia 'casona2024'
```

---

## 📱 Usar el Sistema

### Para Huéspedes:

1. Ve a **Reservas** en el sitio web
2. Selecciona **habitación**
3. Selecciona **fechas** en el calendario
4. Completa **formulario**
5. **Enviar** → Recibe email automático

### Para Ti (Admin):

1. Ve a `https://casonabelga.cl/admin.html`
2. Ingresa contraseña: `casona2024` (o la que cambiaste)
3. Ver solicitudes pendientes
4. Click **Confirmar** o **Rechazar**
5. El huésped recibe email automático

---

## 🔧 Troubleshooting Rápido

### ❌ Los emails no se envían

```bash
# Verifica en la consola del servidor
cd backend
npm run dev

# Busca mensajes como:
# ✅ Guest notification sent
# ❌ Error sending emails: [detalles]
```

**Solución**:
- Verifica que `EMAIL_PASSWORD` en `.env` sea correcto
- Asegúrate de tener "Verificación en 2 pasos" activa en Google
- Usa una "Contraseña de aplicación", no tu contraseña normal

### ❌ El calendario no carga

**Solución**:
1. Verifica que el servidor backend esté corriendo
2. Abre la consola del navegador (F12)
3. Busca errores en rojo
4. Verifica que `window.BOOKING_API_URL` apunte a `http://localhost:3000/api`

### ❌ "404 Not Found" al acceder a /api/bookings

**Solución**:
El servidor backend no está corriendo. Ejecuta:
```bash
cd backend
npm run dev
```

---

## 📊 URLs del Sistema

| Página | URL Local | URL Producción |
|--------|-----------|----------------|
| Reservas (ES) | http://localhost:3000/../reservas.html | https://casonabelga.cl/reservas.html |
| Reservas (EN) | http://localhost:3000/../en/bookings.html | https://casonabelga.cl/en/bookings.html |
| Admin Panel | http://localhost:3000/../admin.html | https://casonabelga.cl/admin.html |
| API | http://localhost:3000/api | https://tu-railway-url.up.railway.app/api |

---

## 🎯 Próximos Pasos

1. ✅ Configurar emails (arriba)
2. ✅ Cambiar contraseña admin
3. ✅ Probar crear una reserva de prueba
4. ✅ Probar aprobar/rechazar desde admin
5. ⬜ Configurar URL de producción cuando despliegues
6. ⬜ Hacer backup del archivo `backend/bookings.json` semanalmente

---

## 📚 Documentación Completa

Lee: [SISTEMA-RESERVAS-DOCUMENTACION.md](SISTEMA-RESERVAS-DOCUMENTACION.md)

Incluye:
- API Endpoints completos
- Cómo agregar habitaciones
- Cómo cambiar precios
- Backup de base de datos
- Troubleshooting detallado
- Y mucho más...

---

¡Listo! Tu sistema de reservas está funcionando 🎉
