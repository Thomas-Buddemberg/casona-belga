# 🌐 Guía de Migración a casonabelga.cl

## 📋 Resumen de la Arquitectura Actual

- **Frontend**: Archivos HTML/CSS/JS en GitHub
- **Backend**: Railway → `https://casona-belga-production.up.railway.app`
- **Nuevo dominio**: `casonabelga.cl`

---

## 🎯 Plan de Migración

### Opción A: Todo en un solo proveedor (Recomendado para simplicidad)
### Opción B: Frontend separado + Backend en Railway (Recomendado para performance)

---

## ✅ OPCIÓN A - Hosting Todo Incluido

### Proveedores recomendados para Chile:

1. **SiteGround Chile** (Mejor para Chile)
   - Servidor en Brasil (más cercano)
   - Soporte en español
   - Panel cPanel fácil
   - Precio: ~$5 USD/mes

2. **HostGator Chile**
   - Similar a SiteGround
   - Buena relación precio/calidad

### Pasos:

#### 1️⃣ Contratar hosting
1. Elige uno de los proveedores
2. Selecciona plan "Web Hosting" básico
3. Durante la compra, usa tu dominio: `casonabelga.cl`

#### 2️⃣ Configurar dominio
Si ya tienes el dominio registrado:
1. Ve a tu registrador de dominios (donde compraste casonabelga.cl)
2. Actualiza los **nameservers** con los que te dé el hosting
3. Espera 24-48 horas para propagación DNS

#### 3️⃣ Subir archivos frontend
1. Accede a cPanel
2. Abre "File Manager"
3. Ve a la carpeta `public_html/`
4. Sube todos estos archivos:
   - `index.html`
   - `carta.html`
   - `habitaciones.html`
   - `contacto.html`
   - `style.css`
   - `script.js`
   - `chatbot.js`
   - `chatbot-ai.js`
   - `chatbot.css`
   - `config.js`
   - carpeta `assets/` completa
   - carpeta `en/` completa
   - `.nojekyll`
   - `robots.txt`
   - `sitemap.xml`

#### 4️⃣ Actualizar sitemap.xml
Edita el archivo `sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://casonabelga.cl/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://casonabelga.cl/carta.html</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://casonabelga.cl/habitaciones.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://casonabelga.cl/contacto.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://casonabelga.cl/en/en_index.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

#### 5️⃣ Backend sigue en Railway
El backend puede quedarse en Railway (ya está funcionando).

Tu `config.js` ya apunta correctamente:
```javascript
window.CHATBOT_API_URL = 'https://casona-belga-production.up.railway.app/api/chat';
```

**Opcional**: Crear subdominio `api.casonabelga.cl` (ver más abajo)

---

## ✅ OPCIÓN B - Frontend en Netlify/Vercel (GRATIS)

### ¿Por qué Netlify/Vercel?
- ✅ **100% GRATIS** para sitios estáticos
- ✅ CDN global (súper rápido)
- ✅ SSL automático (HTTPS)
- ✅ Deploy automático desde GitHub
- ✅ Fácil configurar dominio custom

### Pasos con Netlify:

#### 1️⃣ Crear cuenta en Netlify
1. Ve a [netlify.com](https://netlify.com)
2. Click en "Sign up"
3. Selecciona "Sign up with GitHub"

#### 2️⃣ Conectar tu repositorio
1. Click en "Add new site" → "Import an existing project"
2. Selecciona "Deploy with GitHub"
3. Busca y selecciona: `Thomas-Buddemberg/casona-belga`
4. Configuración:
   - **Branch to deploy**: `main`
   - **Base directory**: (dejar vacío)
   - **Build command**: (dejar vacío, no necesitas build)
   - **Publish directory**: `/` (raíz del proyecto)
5. Click "Deploy site"

#### 3️⃣ Configurar dominio personalizado
1. Ve a "Site settings" → "Domain management"
2. Click "Add custom domain"
3. Ingresa: `casonabelga.cl`
4. Netlify te dará instrucciones DNS

#### 4️⃣ Configurar DNS en tu registrador
Ve a donde compraste `casonabelga.cl` y configura:

**Opción A - Con Netlify DNS (Recomendado):**
- Cambia los nameservers a los de Netlify

**Opción B - Con tu DNS actual:**
- Tipo: `A`
- Host: `@`
- Value: `75.2.60.5` (IP de Netlify)

- Tipo: `CNAME`
- Host: `www`
- Value: `[tu-sitio].netlify.app`

#### 5️⃣ Esperar propagación DNS
- Usualmente toma 2-4 horas
- Máximo 48 horas

#### 6️⃣ SSL automático
Netlify configurará HTTPS automáticamente. ¡No necesitas hacer nada!

---

## 🔧 Configurar Subdominio para Backend (Opcional)

Si quieres que el backend también use tu dominio: `api.casonabelga.cl`

### En Railway:

1. Ve a tu proyecto en Railway
2. Click en "Settings" → "Domains"
3. Click "Custom Domain"
4. Ingresa: `api.casonabelga.cl`
5. Railway te dará un **CNAME** target

### En tu DNS:

Agrega este registro:
- Tipo: `CNAME`
- Host: `api`
- Value: `[lo que te dé Railway]` (ej: `casonabelga-production.up.railway.app`)

### Actualizar config.js:

```javascript
window.CHATBOT_API_URL = 'https://api.casonabelga.cl/api/chat';
```

Haz commit y push:
```bash
git add config.js
git commit -m "Update API URL to custom domain"
git push origin main
```

---

## 📊 Comparación de Opciones

| Aspecto | Opción A - Hosting Tradicional | Opción B - Netlify/Vercel |
|---------|-------------------------------|---------------------------|
| **Costo** | ~$5/mes | GRATIS |
| **Velocidad** | Media | Muy rápida (CDN) |
| **SSL (HTTPS)** | Manual o Let's Encrypt | Automático |
| **Facilidad** | Media (cPanel) | Muy fácil |
| **Deploy** | Manual (FTP) | Automático (Git push) |
| **Mejor para** | No técnicos | Desarrolladores |

---

## 🎯 Recomendación Final

### Para ti, recomiendo **OPCIÓN B - Netlify**:

**Frontend**: Netlify (gratis, rápido, fácil)
- `https://casonabelga.cl` → Netlify

**Backend**: Railway (como está ahora)
- `https://casona-belga-production.up.railway.app` o
- `https://api.casonabelga.cl` → Railway

### Ventajas:
- ✅ Netlify es GRATIS
- ✅ Deploy automático cuando hagas `git push`
- ✅ CDN global (súper rápido en todo el mundo)
- ✅ SSL/HTTPS automático
- ✅ Backend en Railway (ya funcionando, $0-2/mes)
- ✅ Total: ~$0-2 USD/mes

---

## 📝 Checklist de Migración

### Si eliges Netlify (Opción B):

- [ ] Crear cuenta en Netlify
- [ ] Conectar repositorio GitHub
- [ ] Deploy automático completado
- [ ] Agregar dominio custom `casonabelga.cl`
- [ ] Configurar DNS (A record o nameservers)
- [ ] Esperar propagación DNS (2-48 horas)
- [ ] Verificar que SSL/HTTPS funcione
- [ ] (Opcional) Configurar subdominio `api.casonabelga.cl` para backend
- [ ] (Opcional) Actualizar `config.js` con nuevo dominio de API
- [ ] Probar chatbot en el nuevo dominio
- [ ] Actualizar Google Search Console con nuevo dominio

### Si eliges Hosting Tradicional (Opción A):

- [ ] Contratar hosting
- [ ] Configurar dominio/DNS
- [ ] Subir archivos vía FTP/cPanel
- [ ] Configurar SSL (Let's Encrypt en cPanel)
- [ ] Actualizar `sitemap.xml`
- [ ] Probar que todo funcione
- [ ] Actualizar Google Search Console

---

## 🚀 Próximos Pasos

1. **Decide** qué opción prefieres (te recomiendo Netlify)
2. **Sigue** la guía paso a paso
3. **Avísame** cuando estés listo y te ayudo con cualquier paso

---

## 📞 Ayuda Adicional

Si necesitas ayuda con:
- Configuración DNS específica
- Problemas de SSL
- Actualizar archivos
- Cualquier error

**¡Solo pregúntame!** 🚀
