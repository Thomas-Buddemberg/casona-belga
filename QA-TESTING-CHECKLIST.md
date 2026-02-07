# ✅ QA Testing Checklist - Casona Belga
## Testing Completo Pre-Producción

**Fecha:** 2026-02-07
**Estado:** Pendiente de ejecución
**Objetivo:** Verificar que todas las mejoras funcionen correctamente

---

## 🎯 Quick Tests (15 minutos)

### 1. Dark Mode (5 min)
```
[ ] Abrir index.html
[ ] Buscar botón en navegación (esquina superior derecha)
[ ] Click → cambia a Light
[ ] Click → cambia a Dark
[ ] Click → vuelve a Auto
[ ] Refrescar página → tema se mantiene
[ ] Probar en otra página (habitaciones.html)
[ ] Verificar transiciones suaves (sin flashes)
```

### 2. Responsive (5 min)
```
[ ] Abrir DevTools (F12)
[ ] Toggle device toolbar
[ ] Probar iPhone SE (375px)
[ ] Probar iPad (768px)
[ ] Probar Desktop (1920px)
[ ] Verificar menú responsive
[ ] Verificar imágenes responsive
[ ] Verificar touch targets en mobile
```

### 3. Navegación (5 min)
```
[ ] Click en todos los links del nav
[ ] Verificar que abren correctamente
[ ] Links externos abren en nueva pestaña
[ ] Verificar breadcrumbs
[ ] Verificar footer links
[ ] Probar botón "Volver"
[ ] Probar cambio de idioma (ES ↔ EN)
```

---

## 🔍 Funcionalidad Completa (30 minutos)

### Dark/Light Mode Avanzado
```
[ ] Modo Auto respeta preferencias del sistema
    Mac: System Preferences → General → Appearance
    Windows: Settings → Personalization → Colors
[ ] Keyboard: Tab hasta botón + Enter para cambiar
[ ] Funciona en TODAS las páginas:
    [ ] index.html
    [ ] habitaciones.html
    [ ] carta.html
    [ ] reservas.html
    [ ] contacto.html
    [ ] 404.html
    [ ] en/en_index.html
    [ ] en/rooms.html
    [ ] en/menu.html
    [ ] en/bookings.html
    [ ] en/contact.html
```

### Accesibilidad
```
[ ] Presionar Tab en página → Skip link aparece
[ ] Enter en skip link → salta al contenido
[ ] Tab navigation sigue orden lógico
[ ] Focus visible en todos los elementos
[ ] ESC cierra modals (si aplica)
[ ] No hay keyboard traps
[ ] Screen reader (opcional):
    [ ] VoiceOver (Mac): Cmd+F5
    [ ] NVDA (Windows): descargar gratis
    [ ] Lee correctamente títulos
    [ ] Lee alt text de imágenes
    [ ] Anuncia cambios de tema
```

### Formulario de Contacto
```
[ ] Abrir contacto.html
[ ] Dejar campos vacíos → Submit
[ ] Verificar mensajes de error aparecen
[ ] Llenar solo email incorrecto
[ ] Verificar validación de email
[ ] Llenar todos los campos correctamente
[ ] Submit → verificar loading state
[ ] Verificar success/error message
[ ] Verificar que se guarda en localStorage (DevTools)
```

### Gallery & Lightbox
```
[ ] Scroll hasta gallery en index.html
[ ] Verificar lazy loading (imágenes cargan al hacer scroll)
[ ] Click en imagen → abre lightbox
[ ] Click en flecha derecha → siguiente imagen
[ ] Click en flecha izquierda → imagen anterior
[ ] Presionar → (arrow right) en teclado
[ ] Presionar ← (arrow left) en teclado
[ ] Presionar ESC → cierra lightbox
[ ] Click fuera de imagen → cierra lightbox
[ ] Touch: swipe derecha/izquierda (en mobile)
```

### Newsletter Signup
```
[ ] Scroll hasta newsletter en index.html
[ ] Ingresar email inválido → Submit
[ ] Verificar error message
[ ] Ingresar email válido → Submit
[ ] Verificar success message
[ ] Verificar que se guarda en localStorage
```

---

## 📱 Cross-Browser Testing (30 minutos)

### Desktop Browsers
```
[ ] Chrome (último)
    [ ] Dark mode funciona
    [ ] Gallery funciona
    [ ] Forms funcionan
    [ ] Responsive correcto

[ ] Firefox (último)
    [ ] Dark mode funciona
    [ ] Gallery funciona
    [ ] Forms funcionan
    [ ] Responsive correcto

[ ] Safari (último)
    [ ] Dark mode funciona
    [ ] Gallery funciona
    [ ] Forms funcionan
    [ ] Responsive correcto

[ ] Edge (último)
    [ ] Dark mode funciona
    [ ] Gallery funciona
    [ ] Forms funcionan
    [ ] Responsive correcto
```

### Mobile Browsers (Si tienes dispositivos)
```
[ ] Safari iOS
    [ ] Dark mode funciona
    [ ] Touch gestures funcionan
    [ ] Forms funcionan

[ ] Chrome Android
    [ ] Dark mode funciona
    [ ] Touch gestures funcionan
    [ ] Forms funcionan
```

### Responsive Testing (DevTools)
```
[ ] 320px - iPhone SE
    [ ] Contenido legible
    [ ] Botones clickeables
    [ ] Menú funciona

[ ] 375px - iPhone 12/13
    [ ] Layout correcto
    [ ] Imágenes responsive

[ ] 768px - iPad
    [ ] 2 columnas donde aplica
    [ ] Menú desktop aparece

[ ] 1024px - iPad Pro
    [ ] 3 columnas en gallery
    [ ] Layout desktop completo

[ ] 1920px - Desktop HD
    [ ] No hay overflow
    [ ] Contenido centrado
```

---

## ⚡ Performance Testing (15 minutos)

### Lighthouse Audit
```
[ ] Abrir Chrome DevTools (F12)
[ ] Tab "Lighthouse"
[ ] Seleccionar:
    ☑ Performance
    ☑ Accessibility
    ☑ Best Practices
    ☑ SEO
[ ] Device: Desktop
[ ] Click "Analyze page load"
[ ] Esperar resultados

TARGETS:
[ ] Performance: >80 (proyectado >90 después de optimizaciones)
[ ] Accessibility: >90
[ ] Best Practices: >90
[ ] SEO: >90
```

### Core Web Vitals
```
En resultados de Lighthouse, verificar:
[ ] LCP (Largest Contentful Paint): < 2.5s
[ ] FID (First Input Delay): < 100ms
[ ] CLS (Cumulative Layout Shift): < 0.1
```

### PageSpeed Insights (Online)
```
[ ] Ir a https://pagespeed.web.dev/
[ ] Ingresar URL: https://www.casonabelga.cl
[ ] Analizar Mobile y Desktop
[ ] Verificar scores similares a Lighthouse
[ ] Revisar sugerencias de mejoras
```

---

## 🔍 SEO Verification (20 minutos)

### Meta Tags
```
Abrir cada página y verificar en View Source (Ctrl+U):

index.html:
[ ] Title único y descriptivo
[ ] Meta description presente
[ ] Keywords relevantes
[ ] Canonical URL correcto

habitaciones.html:
[ ] Title diferente a index
[ ] Description única
[ ] Keywords específicos

carta.html:
[ ] Title sobre menú
[ ] Description sobre comida
[ ] Keywords gastronómicos

Repetir para todas las páginas...
```

### OpenGraph Testing
```
[ ] Ir a https://developers.facebook.com/tools/debug/
[ ] Ingresar URL: https://www.casonabelga.cl
[ ] Click "Debug"
[ ] Verificar:
    [ ] og:image aparece (1200x630)
    [ ] og:title correcto
    [ ] og:description presente
    [ ] Preview se ve bien

[ ] Repetir para habitaciones.html, carta.html, etc.
```

### WhatsApp Preview
```
[ ] Abrir WhatsApp Web o app
[ ] Enviar mensaje con URL del sitio
[ ] Verificar preview aparece
[ ] Verificar imagen se ve bien
[ ] Verificar título y descripción correctos
```

### Schema.org Validation
```
[ ] Ir a https://validator.schema.org/
[ ] Ingresar URL: https://www.casonabelga.cl
[ ] Click "Run Test"
[ ] Verificar:
    [ ] Sin errores
    [ ] Tipo: Hotel + Restaurant
    [ ] Rating visible
    [ ] Location visible
    [ ] Opening hours visible

[ ] Repetir para habitaciones.html (Hotel schema)
[ ] Repetir para carta.html (Restaurant schema)
```

### Google Search Console (Si está configurado)
```
[ ] Ir a https://search.google.com/search-console
[ ] Verificar propiedad verificada
[ ] URL Inspection: ingresar URL del sitio
[ ] Verificar:
    [ ] URL está indexada
    [ ] Sin errores de cobertura
    [ ] Mobile friendly
    [ ] Rich results detectados
```

---

## 📊 Analytics Testing (10 minutos)

**NOTA:** Solo después de configurar GA_MEASUREMENT_ID real

### Setup Inicial
```
[ ] Reemplazar G-XXXXXXXXXX en analytics.js línea 13
[ ] Subir cambio a producción
[ ] Esperar 5 minutos
```

### Verificación en GA4
```
[ ] Ir a https://analytics.google.com
[ ] Seleccionar propiedad "Casona Belga"
[ ] Tab "Realtime" → "Overview"
[ ] Abrir sitio web en otra pestaña
[ ] Navegar por el sitio

Verificar que aparece:
[ ] Tu visita en tiempo real
[ ] Ubicación geográfica correcta
[ ] Página actual que estás viendo
```

### Testing de Eventos
```
En el sitio:
[ ] Click en CTA "Reservar"
[ ] Scroll hasta el fondo (90%)
[ ] Submit formulario de contacto
[ ] Click en link de WhatsApp
[ ] Click en link de Instagram

En GA4 (Realtime → Events):
[ ] Evento "cta_click" aparece
[ ] Evento "scroll" aparece (90%)
[ ] Evento "form_submission" aparece
[ ] Evento "click" aparece (outbound)
```

### Debug Mode (Localhost)
```
[ ] Abrir http://localhost en navegador
[ ] Abrir DevTools Console
[ ] Buscar mensajes:
    "🔍 Analytics Debug Mode"
    "📊 GA4 Measurement ID: G-..."
    "⚠️ Remember to replace..."
[ ] Click en botones → ver eventos en console
```

---

## 🐛 Error Testing (10 minutos)

### 404 Page
```
[ ] Ir a URL inexistente: https://www.casonabelga.cl/pagina-que-no-existe
[ ] Verificar:
    [ ] 404.html se muestra
    [ ] Diseño se ve bien
    [ ] Dark mode funciona
    [ ] Links de sugerencias funcionan
    [ ] Búsqueda interna funciona
    [ ] WhatsApp CTA funciona
```

### JavaScript Errors
```
[ ] Abrir cada página
[ ] Abrir DevTools Console (F12)
[ ] Verificar:
    [ ] Sin errores rojos
    [ ] Sin warnings críticos
    [ ] Scripts cargan correctamente
```

### CSS Rendering
```
[ ] Deshabilitar CSS temporalmente (DevTools)
[ ] Verificar contenido sigue siendo legible
[ ] Verificar orden lógico sin CSS
[ ] Re-habilitar CSS
```

### Network Issues
```
[ ] DevTools → Network tab
[ ] Throttling: Slow 3G
[ ] Reload página
[ ] Verificar:
    [ ] Imágenes lazy load funcionan
    [ ] Skeleton screens aparecen
    [ ] Loading states visibles
```

---

## 📋 Final Checklist

### Pre-Launch
```
[ ] Todas las páginas tested
[ ] Dark mode funciona en todas
[ ] Forms validados y tested
[ ] Analytics configurado (GA_MEASUREMENT_ID)
[ ] SEO verificado (meta tags, OpenGraph, Schema)
[ ] Accessibility audit passed
[ ] Cross-browser testing complete
[ ] Mobile testing complete
[ ] Performance acceptable (Lighthouse >80)
[ ] No console errors
[ ] 404 page funciona
```

### Documentation
```
[ ] README.md actualizado
[ ] FINAL-PROJECT-SUMMARY.md revisado
[ ] Guías de setup disponibles
[ ] Checklist de deployment listo
```

### Deployment Ready
```
[ ] Imágenes optimizadas (o en roadmap)
[ ] CSS/JS minificado (o en roadmap)
[ ] Backend formularios configurado (o en roadmap)
[ ] Newsletter service configurado (o en roadmap)
[ ] Google Analytics funcionando
[ ] Backup de archivos originales
```

---

## 🚀 Post-Launch Monitoring (Primera Semana)

### Día 1
```
[ ] Verificar analytics capturando datos
[ ] Verificar sin errores en Search Console
[ ] Verificar formularios recibiendo submissions
[ ] Verificar dark mode funciona en todos browsers
```

### Día 3
```
[ ] Revisar Google Analytics:
    [ ] Usuarios activos
    [ ] Páginas más visitadas
    [ ] Bounce rate
    [ ] Avg session duration
[ ] Revisar console errors (si hay alertas)
```

### Día 7
```
[ ] Analizar semana completa de datos
[ ] Identificar páginas con mayor bounce
[ ] Identificar CTAs más clickeados
[ ] Revisar conversiones de formularios
[ ] Ajustar según datos
```

---

## 📞 Troubleshooting Rápido

### Dark Mode No Funciona
```
1. Verificar que theme-toggle.js está cargando
   DevTools → Network → buscar theme-toggle.js

2. Verificar que no hay errores JavaScript
   DevTools → Console → buscar errores

3. Verificar que CSS está cargando
   DevTools → Network → buscar theme-toggle.css

4. Limpiar localStorage y recargar
   DevTools → Application → Local Storage → Clear
```

### Analytics No Registra
```
1. Verificar GA_MEASUREMENT_ID está configurado
   Buscar en analytics.js línea 13

2. Verificar que analytics.js carga
   DevTools → Network → buscar analytics.js

3. Verificar en modo incógnito
   Extensiones pueden bloquear analytics

4. Verificar en GA4 debug view
   Admin → DebugView → ver eventos en tiempo real
```

### Formularios No Funcionan
```
1. Verificar validación JavaScript
   DevTools → Console → buscar errores

2. Verificar backend configurado
   Si usa EmailJS o servidor custom

3. Verificar en localStorage
   DevTools → Application → Local Storage
   Debe aparecer submission

4. Verificar CORS (si usa API externa)
```

### Imágenes No Cargan
```
1. Verificar rutas correctas
   DevTools → Network → buscar 404s

2. Verificar lazy loading
   Scroll hasta imagen, debe cargar

3. Verificar permisos de archivos
   En servidor, chmod 644 para imágenes

4. Verificar CDN (si aplica)
```

---

## ✅ Testing Completado

**Fecha de testing:** ___________
**Testeado por:** ___________
**Browsers tested:** ___________
**Devices tested:** ___________

**Issues encontrados:** ___________
**Issues resueltos:** ___________
**Issues pendientes:** ___________

**Aprobado para producción:** ☐ SÍ  ☐ NO

**Notas adicionales:**
_______________________________________
_______________________________________
_______________________________________

---

**Creado:** 2026-02-07
**Última actualización:** 2026-02-07
**Estado:** Listo para usar ✅
