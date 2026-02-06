# 🚂 Deploy en Railway - Paso a Paso

## ✅ Código ya subido a GitHub
Tu repositorio: https://github.com/Thomas-Buddemberg/casona-belga

---

## 🚀 Pasos para Deploy

### 1️⃣ Crear cuenta en Railway

1. Ve a **[railway.app](https://railway.app)**
2. Click en **"Login"** (arriba a la derecha)
3. Selecciona **"Login with GitHub"**
4. Autoriza Railway para acceder a tus repositorios

**No requiere tarjeta de crédito** ✅

---

### 2️⃣ Crear nuevo proyecto

1. Una vez logueado, click en **"New Project"**
2. Selecciona **"Deploy from GitHub repo"**
3. Busca y selecciona: **`Thomas-Buddemberg/casona-belga`**
4. Railway empezará a detectar tu proyecto

---

### 3️⃣ Configurar el servicio

Railway detectará automáticamente Node.js, pero necesitas configurar algunas cosas:

1. Click en tu servicio (aparecerá como "casona-belga")
2. Ve a la pestaña **"Settings"** (⚙️)
3. Busca **"Root Directory"**
4. Cambia de `/` a: **`backend`**
5. Click **"Save"** o presiona Enter

**Esto es IMPORTANTE** porque tu servidor está en la carpeta `backend/`

---

### 4️⃣ Configurar variables de entorno

1. Ve a la pestaña **"Variables"** (en el menú del servicio)
2. Click en **"+ New Variable"**
3. Agrega:
   - **Variable name**: `GEMINI_API_KEY`
   - **Value**: Tu API key de Gemini (empieza con `AIza...`)
4. Click **"Add"**

**Tu API key de Gemini:**
- Si la guardaste, úsala
- Si no, obtén una nueva en: https://makersuite.google.com/app/apikey

---

### 5️⃣ Deploy automático

1. Railway detectará los cambios automáticamente
2. Empezará a hacer build (construcción)
3. Verás logs en tiempo real
4. Espera 2-3 minutos

**Cuando veas** "🚀 Casona Belga AI Chatbot Backend running on port XXXX" en los logs, ¡está listo!

---

### 6️⃣ Obtener la URL pública

1. Ve a la pestaña **"Settings"** del servicio
2. Busca la sección **"Networking"** o **"Domains"**
3. Click en **"Generate Domain"**
4. Railway te dará una URL como:
   - `https://casona-belga-production.up.railway.app`
   - o similar

**Copia esta URL** 📋

---

### 7️⃣ Actualizar el frontend

Ahora que tienes tu URL de Railway, actualiza el archivo `config.js`:

**Abre:** `config.js` en tu editor

**Busca esta línea:**
```javascript
window.CHATBOT_API_URL = 'http://localhost:3000/api/chat';
```

**Cámbiala por:**
```javascript
window.CHATBOT_API_URL = 'https://TU-URL-DE-RAILWAY.up.railway.app/api/chat';
```

**Ejemplo:**
```javascript
window.CHATBOT_API_URL = 'https://casona-belga-production.up.railway.app/api/chat';
```

---

### 8️⃣ Subir el cambio a GitHub

```bash
git add config.js
git commit -m "Update chatbot API URL to Railway"
git push origin main
```

---

### 9️⃣ Verificar que funciona

#### Opción A: Probar el backend directamente

Abre en tu navegador:
```
https://TU-URL-DE-RAILWAY.up.railway.app/health
```

Deberías ver:
```json
{"status":"ok","message":"Casona Belga AI Chatbot is running"}
```

#### Opción B: Probar desde terminal

```bash
curl https://TU-URL-DE-RAILWAY.up.railway.app/health
```

---

### 🔟 Probar el chatbot en tu sitio

1. Abre cualquier página de tu sitio (index.html)
2. Deberías ver el botón del chatbot (🤖)
3. Click y haz una pregunta
4. Debería responder usando IA ✨

---

## 🎯 Resumen de URLs

- **GitHub**: https://github.com/Thomas-Buddemberg/casona-belga
- **Railway**: Lo verás en railway.app después de login
- **Backend URL**: `https://[tu-proyecto].up.railway.app`
- **Health check**: `https://[tu-proyecto].up.railway.app/health`
- **Chat API**: `https://[tu-proyecto].up.railway.app/api/chat`

---

## 📊 Panel de Railway

Después del deploy, en Railway verás:

- **Deployments**: Historial de deploys
- **Logs**: Logs en tiempo real del servidor
- **Metrics**: CPU, RAM, requests
- **Variables**: Tus variables de entorno
- **Settings**: Configuración del servicio

---

## 🔄 Actualizaciones futuras

Cada vez que hagas `git push origin main`, Railway hará deploy automáticamente.

**No necesitas hacer nada más** - Railway detecta los cambios y redeploya automáticamente.

---

## 🐛 Troubleshooting

### "Build failed"
- Verifica que "Root Directory" sea `backend`
- Revisa los logs de build

### "Application error"
- Verifica que `GEMINI_API_KEY` esté configurada
- Revisa los logs del deploy

### "Cannot connect to backend"
- Verifica que la URL en `config.js` sea correcta
- Debe terminar en `/api/chat`
- Usa HTTPS, no HTTP

### Ver logs en Railway
1. Click en tu servicio
2. Ve a "Deployments"
3. Click en el deploy activo
4. Verás todos los logs

---

## 💰 Costos

**Railway Free Tier incluye:**
- ✅ $5 USD de crédito mensual (GRATIS)
- ✅ 500 horas de ejecución al mes
- ✅ Suficiente para 24/7 de un proyecto pequeño
- ✅ No requiere tarjeta de crédito

**Tu chatbot consumirá muy poco**, probablemente $1-2 USD al mes.

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Railway
2. Verifica las variables de entorno
3. Prueba el endpoint `/health`

---

## ✅ Checklist

- [ ] Cuenta creada en Railway
- [ ] Repositorio conectado
- [ ] "Root Directory" configurado a `backend`
- [ ] Variable `GEMINI_API_KEY` agregada
- [ ] Deploy completado (sin errores en logs)
- [ ] URL generada y copiada
- [ ] `config.js` actualizado con URL de Railway
- [ ] Cambio commiteado y pusheado a GitHub
- [ ] `/health` probado y funcionando
- [ ] Chatbot probado en el sitio web

---

**¡Eso es todo! Tu chatbot estará disponible 24/7 🎉**
