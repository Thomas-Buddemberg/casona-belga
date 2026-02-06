# 🚀 Guía de Deploy - Chatbot con IA

## 📋 Opciones disponibles

1. **Local con PM2** - Para desarrollo o servidor propio
2. **Railway** - Gratis, muy fácil, recomendado ⭐
3. **Render** - Gratis, alternativa a Railway
4. **Heroku** - Gratis (con limitaciones)

---

## 🖥️ Opción 1: Local con PM2

### Instalación de PM2

```bash
# Instalar PM2 globalmente
npm install -g pm2
```

### Comandos básicos

```bash
# Ir a la carpeta del backend
cd backend

# Iniciar la aplicación
pm2 start server.js --name casona-chatbot

# Configurar inicio automático al reiniciar la computadora
pm2 startup
# Ejecuta el comando que te muestra PM2

# Guardar configuración
pm2 save
```

### Gestión de la aplicación

```bash
# Ver estado
pm2 status

# Ver logs en tiempo real
pm2 logs casona-chatbot

# Ver logs solo de esta app
pm2 logs casona-chatbot --lines 100

# Reiniciar
pm2 restart casona-chatbot

# Detener
pm2 stop casona-chatbot

# Eliminar del PM2
pm2 delete casona-chatbot

# Listar todas las apps
pm2 list

# Monitoreo en tiempo real
pm2 monit
```

### Configuración avanzada

```bash
# Reiniciar automáticamente si usa mucha memoria
pm2 start server.js --name casona-chatbot --max-memory-restart 200M

# Modo cluster (múltiples instancias)
pm2 start server.js --name casona-chatbot -i 2

# Con variables de entorno
pm2 start server.js --name casona-chatbot --env production
```

**Ventaja**: Control total, gratis
**Desventaja**: Requiere que tu computadora esté siempre encendida

---

## ☁️ Opción 2: Railway (Recomendado)

Railway es la opción más fácil para deploy en la nube. 100% gratis para empezar.

### Paso 1: Preparar el proyecto

Ya está todo listo! Solo asegúrate de tener:
- ✅ `backend/package.json`
- ✅ `backend/server.js`
- ✅ `backend/.gitignore` (para no subir `.env`)

### Paso 2: Subir a GitHub (si aún no lo has hecho)

```bash
# En la raíz del proyecto
git init
git add .
git commit -m "Add AI chatbot backend"

# Crear repo en GitHub y subir
git remote add origin https://github.com/tu-usuario/casona-belga.git
git push -u origin main
```

### Paso 3: Deploy en Railway

1. **Crear cuenta**: Ve a [railway.app](https://railway.app) y crea cuenta (gratis, sin tarjeta)

2. **Nuevo proyecto**:
   - Click en "New Project"
   - Selecciona "Deploy from GitHub repo"
   - Conecta tu cuenta de GitHub
   - Selecciona el repositorio `casona-belga`

3. **Configurar variables de entorno**:
   - Railway detectará automáticamente Node.js
   - Ve a la pestaña "Variables"
   - Agrega una nueva variable:
     - Key: `GEMINI_API_KEY`
     - Value: tu_api_key_de_gemini

4. **Configurar el directorio**:
   - Ve a "Settings"
   - En "Root Directory" pon: `backend`
   - Railway usará automáticamente `npm start`

5. **Deploy**:
   - Railway empezará a hacer deploy automáticamente
   - Espera 2-3 minutos
   - Cuando termine, verás una URL tipo: `https://casona-chatbot.up.railway.app`

### Paso 4: Actualizar el frontend

Edita `config.js`:

```javascript
// Cambia esta línea:
window.CHATBOT_API_URL = 'http://localhost:3000/api/chat';

// Por tu URL de Railway:
window.CHATBOT_API_URL = 'https://casona-chatbot.up.railway.app/api/chat';
```

### Paso 5: Verificar

```bash
# Prueba que funciona
curl https://casona-chatbot.up.railway.app/health
```

**Ventaja**: 24/7 online, gratis, muy fácil
**Desventaja**: Límites del tier gratuito (suficientes para empezar)

---

## 🎨 Opción 3: Render

Muy similar a Railway.

### Pasos:

1. **Crear cuenta**: [render.com](https://render.com)

2. **Nuevo Web Service**:
   - "New" → "Web Service"
   - Conecta GitHub
   - Selecciona tu repo

3. **Configuración**:
   - Name: `casona-chatbot`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: **Free**

4. **Variables de entorno**:
   - Agrega `GEMINI_API_KEY` con tu API key

5. **Create Web Service**:
   - Render hará deploy
   - Te dará una URL: `https://casona-chatbot.onrender.com`

6. **Actualiza `config.js`** con la nueva URL

**Ventaja**: Gratis, confiable
**Desventaja**: Puede ser un poco más lento que Railway

---

## 🔧 Opción 4: Heroku

### Pasos:

```bash
# 1. Instalar Heroku CLI
# Mac: brew install heroku/brew/heroku
# Windows: https://devcenter.heroku.com/articles/heroku-cli

# 2. Login
heroku login

# 3. Crear app
heroku create casona-chatbot

# 4. Configurar variable de entorno
heroku config:set GEMINI_API_KEY=tu_api_key

# 5. Deploy (desde la raíz del proyecto)
git subtree push --prefix backend heroku main

# 6. Verificar
heroku logs --tail
```

Tu URL será: `https://casona-chatbot.herokuapp.com`

Actualiza `config.js` con esta URL.

**Ventaja**: Muy conocido, documentación abundante
**Desventaja**: Duerme después de 30 min de inactividad (en tier gratis)

---

## 📊 Comparación

| Servicio | Facilidad | Gratis | Velocidad | Uptime |
|----------|-----------|--------|-----------|--------|
| **PM2 Local** | ⭐⭐⭐ | ✅ | ⭐⭐⭐⭐⭐ | ⚠️ Solo si PC encendida |
| **Railway** | ⭐⭐⭐⭐⭐ | ✅ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Render** | ⭐⭐⭐⭐ | ✅ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Heroku** | ⭐⭐⭐ | ✅* | ⭐⭐⭐ | ⭐⭐⭐ |

*Heroku gratis tiene limitaciones

---

## 🔄 Actualizar después del deploy

### Cambios en el código:

```bash
# 1. Hacer cambios en el código
# 2. Commit
git add .
git commit -m "Update chatbot backend"

# 3. Push
git push origin main
```

**Railway/Render**: Deploy automático en 2-3 minutos
**Heroku**: `git push heroku main`
**PM2**: `pm2 restart casona-chatbot`

### Cambiar la API key:

**Railway/Render**: Ve a Settings → Variables → Edita `GEMINI_API_KEY`
**Heroku**: `heroku config:set GEMINI_API_KEY=nueva_key`
**PM2**: Edita `.env` y `pm2 restart casona-chatbot`

---

## ✅ Checklist de Deploy

- [ ] Backend funcionando localmente (`npm start`)
- [ ] `.gitignore` incluye `.env`
- [ ] Código subido a GitHub
- [ ] Deploy realizado (Railway/Render/Heroku)
- [ ] Variable `GEMINI_API_KEY` configurada
- [ ] URL del backend verificada (curl /health)
- [ ] `config.js` actualizado con URL de producción
- [ ] Chatbot probado en el sitio web
- [ ] Logs revisados (sin errores)

---

## 🐛 Troubleshooting

### Railway/Render no inicia

1. Verifica que `backend/package.json` existe
2. Revisa que `Root Directory` está en `backend`
3. Chequea los logs del deploy

### "API key configuration error"

1. Verifica que `GEMINI_API_KEY` está en las variables de entorno
2. La key debe empezar con `AIza`
3. Reinicia el servicio después de agregar la variable

### CORS Error

El backend ya tiene CORS habilitado. Si persiste:
1. Verifica que la URL en `config.js` es correcta
2. Usa HTTPS (no HTTP) en producción

### El chatbot no se conecta

1. Abre DevTools (F12) → Console
2. Busca errores de red
3. Verifica que `config.js` se carga antes de `chatbot-ai.js`
4. Prueba la URL del backend directamente: `curl URL/health`

---

## 📞 Soporte

- Issues: Crea un issue en GitHub
- Email: casonabelga@gmail.com

---

**Recomendación final**: 🌟 **Usa Railway** para producción. Es gratis, fácil y confiable.
