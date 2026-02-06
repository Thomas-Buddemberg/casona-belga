# 🚀 Guía Rápida - Deploy en Netlify con casonabelga.cl

## ⚡ En 10 minutos tu sitio estará en casonabelga.cl

---

## 📋 Antes de empezar

Necesitas tener:
- ✅ Cuenta de GitHub (ya la tienes)
- ✅ Dominio `casonabelga.cl` registrado
- ✅ Acceso al panel DNS de tu dominio

---

## 🎯 Paso 1: Deploy en Netlify

### 1.1 Crear cuenta
1. Ve a **[netlify.com](https://netlify.com)**
2. Click **"Sign up"**
3. Selecciona **"Sign up with GitHub"**

### 1.2 Importar tu sitio
1. Click **"Add new site"** → **"Import an existing project"**
2. Click **"Deploy with GitHub"**
3. Busca y selecciona: **`Thomas-Buddemberg/casona-belga`**
4. Configuración del deploy:
   ```
   Branch to deploy: main
   Base directory: (vacío)
   Build command: (vacío)
   Publish directory: /
   ```
5. Click **"Deploy [nombre-del-sitio]"**

### 1.3 Esperar deploy inicial
- Toma ~1-2 minutos
- Verás una URL temporal como: `random-name-123.netlify.app`
- **Prueba esa URL** para verificar que todo funcione

---

## 🌐 Paso 2: Configurar tu dominio casonabelga.cl

### 2.1 Agregar dominio custom en Netlify
1. En tu sitio de Netlify, ve a **"Site settings"**
2. Click **"Domain management"** (menú lateral)
3. Click **"Add custom domain"**
4. Escribe: `casonabelga.cl`
5. Click **"Verify"**
6. Si pregunta "Do you own this domain?", click **"Yes, add domain"**

### 2.2 Configurar DNS

Netlify te mostrará 2 opciones. Elige la que prefieras:

#### OPCIÓN A - Netlify DNS (Más fácil, recomendada) ⭐

1. En Netlify, click **"Set up Netlify DNS"**
2. Netlify te dará **4 nameservers** como:
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```
3. Ve al panel de tu registrador de dominios (donde compraste casonabelga.cl)
4. Busca la opción **"Nameservers"** o **"DNS"**
5. Reemplaza los nameservers actuales con los 4 de Netlify
6. Guarda los cambios
7. Vuelve a Netlify y click **"Done"**

**Ventaja**: Netlify maneja todo automáticamente (SSL, www, etc.)

#### OPCIÓN B - DNS Manual

Si prefieres mantener tu DNS actual:

1. Ve al panel DNS de tu dominio
2. Agrega estos registros:

**Para el dominio principal:**
```
Tipo: A
Nombre: @ (o vacío)
Valor: 75.2.60.5
TTL: 3600
```

**Para www:**
```
Tipo: CNAME
Nombre: www
Valor: [tu-sitio].netlify.app
TTL: 3600
```

**Ejemplo**:
Si tu URL de Netlify es `casona-belga.netlify.app`, usa ese valor en el CNAME.

---

## 🔒 Paso 3: Activar HTTPS (Automático)

1. Espera 2-4 horas después de configurar DNS
2. Netlify detectará automáticamente tu dominio
3. Activará SSL/HTTPS de Let's Encrypt
4. Verás un ✅ verde en "HTTPS" en Domain settings

**No necesitas hacer nada**, Netlify lo hace automáticamente.

---

## ✅ Paso 4: Verificar que todo funcione

### 4.1 Probar el sitio
Abre en tu navegador:
- `https://casonabelga.cl` ✅
- `https://www.casonabelga.cl` ✅ (debe redirigir a sin www)

### 4.2 Probar el chatbot
1. Click en el ícono del chatbot 🤖
2. Escribe un mensaje
3. Debe responder (usando el backend de Railway)

### 4.3 Probar todas las páginas
- ✅ `https://casonabelga.cl/carta.html`
- ✅ `https://casonabelga.cl/habitaciones.html`
- ✅ `https://casonabelga.cl/contacto.html`
- ✅ `https://casonabelga.cl/en/en_index.html`

---

## 🔄 Paso 5: Actualizaciones futuras

De ahora en adelante:

```bash
# Haces cambios en tu código
git add .
git commit -m "Descripción del cambio"
git push origin main
```

**Netlify hace deploy automáticamente** (1-2 minutos después del push) ✨

---

## 🎯 (Opcional) Configurar api.casonabelga.cl

Si quieres que tu API también use tu dominio:

### En Railway:
1. Ve a tu proyecto en Railway
2. Settings → Domains → Custom Domain
3. Ingresa: `api.casonabelga.cl`
4. Railway te dará un target CNAME (cópialo)

### En tu DNS:
Agrega este registro:
```
Tipo: CNAME
Nombre: api
Valor: [el que te dio Railway]
TTL: 3600
```

### Actualizar config.js:
```javascript
window.CHATBOT_API_URL = 'https://api.casonabelga.cl/api/chat';
```

Luego:
```bash
git add config.js
git commit -m "Update API to custom domain"
git push origin main
```

---

## ⏱️ Tiempos de Propagación DNS

- **Mínimo**: 2-4 horas
- **Promedio**: 12-24 horas
- **Máximo**: 48 horas

Puedes verificar el estado con:
- [whatsmydns.net](https://www.whatsmydns.net) → Busca `casonabelga.cl`

---

## 🐛 Solución de Problemas

### "Site not found" o "Page not found"
- **Causa**: DNS aún no se ha propagado
- **Solución**: Espera 4-24 horas más

### "Not Secure" / Sin HTTPS
- **Causa**: SSL aún no se activó
- **Solución**: Espera 1-2 horas después de que DNS esté activo

### Chatbot no responde
- **Verifica** que el backend en Railway esté corriendo
- **Prueba**: `https://casona-belga-production.up.railway.app/health`
- **Revisa**: Consola del navegador (F12) para errores

### Deploy failed en Netlify
- **Revisa** los logs del deploy
- **Verifica** que el repositorio esté público o Netlify tenga acceso

---

## 📊 Checklist Completo

- [ ] Cuenta de Netlify creada
- [ ] Repositorio conectado desde GitHub
- [ ] Deploy inicial exitoso (URL temporal funcionando)
- [ ] Dominio custom agregado: `casonabelga.cl`
- [ ] DNS configurado (nameservers o A/CNAME records)
- [ ] Esperar propagación DNS (2-48 horas)
- [ ] HTTPS activado automáticamente
- [ ] Sitio accesible en `https://casonabelga.cl`
- [ ] www redirige correctamente
- [ ] Chatbot funcionando
- [ ] Todas las páginas accesibles
- [ ] (Opcional) Subdominio API configurado

---

## 💰 Costo Total

- **Netlify**: GRATIS ✅ (500GB bandwidth/mes)
- **Railway**: $0-2 USD/mes ✅
- **Dominio**: ~$15-20 USD/año (ya lo tienes)

**Total mensual: ~$0-2 USD** 🎉

---

## 🚀 ¿Listo para empezar?

1. Crea tu cuenta en Netlify
2. Conecta tu repositorio
3. Configura tu dominio
4. ¡Listo en 10 minutos!

**¿Tienes preguntas? ¡Pregúntame!** 😊
