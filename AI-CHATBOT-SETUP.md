# 🤖 Configuración del Chatbot con Inteligencia Artificial

## 📖 Índice

1. [¿Qué cambió?](#qué-cambió)
2. [Instalación del Backend](#instalación-del-backend)
3. [Activar el Chatbot con IA](#activar-el-chatbot-con-ia)
4. [Configuración para Producción](#configuración-para-producción)
5. [Troubleshooting](#troubleshooting)

---

## ✨ ¿Qué cambió?

### Antes (Chatbot con respuestas predeterminadas)
- ❌ Respuestas basadas en palabras clave
- ❌ No entendía preguntas complejas
- ❌ Limitado a respuestas programadas

### Ahora (Chatbot con IA)
- ✅ **Inteligencia Artificial real** (Google Gemini)
- ✅ Entiende preguntas en lenguaje natural
- ✅ Respuestas contextuales y personalizadas
- ✅ Mantiene el contexto de la conversación
- ✅ **100% Gratis** (usando tier gratuito de Gemini)
- ✅ Responde en español e inglés automáticamente

---

## 🚀 Instalación del Backend

### Paso 1: Instalar Node.js

Si no tienes Node.js instalado:
- Descarga desde [nodejs.org](https://nodejs.org/) (versión LTS)
- O usando Homebrew (Mac): `brew install node`

Verifica la instalación:
```bash
node --version  # Debería mostrar v14 o superior
npm --version
```

### Paso 2: Configurar el Backend

```bash
# 1. Navega a la carpeta del backend
cd backend

# 2. Instala las dependencias
npm install

# 3. Configura las variables de entorno
cp .env.example .env
```

### Paso 3: Obtener API Key de Google Gemini (GRATIS)

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Inicia sesión con tu cuenta de Google
3. Click en **"Create API Key"**
4. Copia la API key (empieza con `AIza...`)

**IMPORTANTE:** ¡No requiere tarjeta de crédito! El tier gratuito incluye:
- ✅ 1,500 requests por día
- ✅ 60 requests por minuto
- ✅ Gratis para siempre

### Paso 4: Configurar la API Key

Edita el archivo `.env` en la carpeta `backend`:

```env
GEMINI_API_KEY=AIza...tu_api_key_aqui
PORT=3000
NODE_ENV=development
```

### Paso 5: Iniciar el Backend

```bash
# Modo desarrollo (reinicia automáticamente)
npm run dev

# O modo producción
npm start
```

Deberías ver:
```
🚀 Casona Belga AI Chatbot Backend running on port 3000
📍 Health check: http://localhost:3000/health
💬 Chat endpoint: http://localhost:3000/api/chat
```

### Paso 6: Verificar que funciona

Abre otra terminal y prueba:

```bash
curl http://localhost:3000/health
```

Deberías recibir: `{"status":"ok","message":"Casona Belga AI Chatbot is running"}`

---

## 🎯 Activar el Chatbot con IA

### Opción A: Cambiar archivos HTML (Recomendado)

Actualiza **todos** los archivos HTML para usar el chatbot con IA:

**Archivos a modificar:**
- `index.html`
- `carta.html`
- `habitaciones.html`
- `contacto.html`
- `en/en_index.html`
- `en/menu.html`
- `en/rooms.html`
- `en/contact.html`

**Cambios en cada archivo:**

#### Para páginas en español:
Reemplaza esta línea:
```html
<script src="chatbot.js" defer></script>
```

Por:
```html
<script src="chatbot-ai.js" defer></script>
```

#### Para páginas en inglés:
Reemplaza esta línea:
```html
<script src="../chatbot-en.js" defer></script>
```

Por:
```html
<script src="../chatbot-ai-en.js" defer></script>
```

### Opción B: Configurar URL del Backend

Si tu backend no está en `localhost:3000`, configura la URL antes de cargar el script:

```html
<script>
  // Configura la URL de tu backend
  window.CHATBOT_API_URL = 'https://tu-backend.com/api/chat';
</script>
<script src="chatbot-ai.js" defer></script>
```

---

## 🌐 Configuración para Producción

### Backend en Servidor / VPS

1. **Instala PM2** para mantener el servidor corriendo:
```bash
npm install -g pm2
cd backend
pm2 start server.js --name casona-chatbot
pm2 startup
pm2 save
```

2. **Configura reverse proxy** con Nginx o Apache:

**Nginx ejemplo** (`/etc/nginx/sites-available/chatbot`):
```nginx
server {
    listen 80;
    server_name chatbot.casonabelga.cl;

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. **Actualiza la URL en el frontend**:
```html
<script>
  window.CHATBOT_API_URL = 'https://chatbot.casonabelga.cl/api/chat';
</script>
<script src="chatbot-ai.js" defer></script>
```

### Opciones de Deployment Gratuitas

#### 1. **Railway** (Recomendado - Muy fácil)
1. Crea cuenta en [railway.app](https://railway.app)
2. "New Project" > "Deploy from GitHub"
3. Selecciona tu repo
4. Agrega variable de entorno `GEMINI_API_KEY`
5. Deploy automático ✅

#### 2. **Render**
1. Crea cuenta en [render.com](https://render.com)
2. "New Web Service"
3. Conecta GitHub
4. Build command: `cd backend && npm install`
5. Start command: `cd backend && npm start`
6. Agrega `GEMINI_API_KEY` en Environment

#### 3. **Heroku**
```bash
heroku create casona-chatbot
heroku config:set GEMINI_API_KEY=tu_api_key
git subtree push --prefix backend heroku main
```

### Frontend

1. **Actualiza todos los HTML** para usar `chatbot-ai.js` / `chatbot-ai-en.js`
2. **Configura la URL del backend** con `window.CHATBOT_API_URL`
3. **Sube a tu hosting** (el hosting actual del sitio)

---

## 🐛 Troubleshooting

### El chatbot muestra "No se puede conectar con el servidor"

**Solución:**
1. Verifica que el backend esté corriendo: `curl http://localhost:3000/health`
2. Revisa la consola del navegador (F12) para ver errores
3. Verifica que `window.CHATBOT_API_URL` esté configurado correctamente

### "API key configuration error"

**Solución:**
1. Verifica que el archivo `.env` existe en `backend/`
2. La API key debe empezar con `AIza`
3. No debe haber espacios extra en el `.env`
4. Reinicia el servidor después de cambiar `.env`

### "Rate limit exceeded"

**Solución:**
- Has excedido 1500 requests/día o 60/minuto
- Espera unos minutos
- Para alto tráfico, considera crear múltiples API keys

### El chatbot responde información incorrecta

**Solución:**
1. Actualiza `backend/knowledge-base.js` con la información correcta
2. Ajusta el `SYSTEM_PROMPT` en `backend/server.js`
3. Reinicia el backend

### CORS Error en el navegador

**Solución:**
Verifica que el backend tenga CORS habilitado (ya está en `server.js`).
Si usas un dominio diferente, actualiza:

```javascript
// En backend/server.js
app.use(cors({
  origin: 'https://www.casonabelga.cl'
}));
```

---

## 📊 Monitoreo

### Ver logs del backend

```bash
# Con PM2
pm2 logs casona-chatbot

# Sin PM2
# Los logs aparecerán en la terminal donde corre el servidor
```

### Estadísticas de uso

El backend registra cada request en la consola. Para analytics completo, considera integrar:
- Google Analytics
- Sentry (error tracking)
- Winston/Bunyan (structured logging)

---

## 🔄 Volver al Chatbot Antiguo

Si necesitas volver al chatbot con respuestas predeterminadas:

1. En todos los HTML, reemplaza:
   - `chatbot-ai.js` → `chatbot.js`
   - `chatbot-ai-en.js` → `chatbot-en.js`

2. Puedes detener el backend:
```bash
pm2 stop casona-chatbot
```

---

## 📞 Soporte

¿Problemas con la configuración?

- 📧 Email: casonabelga@gmail.com
- 💬 WhatsApp: +56 9 9824 4016
- 📝 Crea un issue en GitHub

---

## ✅ Checklist de Deployment

- [ ] Backend instalado y funcionando
- [ ] API Key de Gemini configurada
- [ ] Backend deployado en producción
- [ ] URL del backend configurada en frontend
- [ ] Todos los HTML actualizados para usar `chatbot-ai.js`
- [ ] Probado en navegador
- [ ] Probado en móvil
- [ ] Backend monitoreado (PM2 / logs)

---

**¡Felicitaciones! 🎉 Ahora tienes un chatbot con Inteligencia Artificial real.**
