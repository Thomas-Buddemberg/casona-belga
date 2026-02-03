# 🏔️ Casona Belga - Guía de Diseño Premium

## ✨ Cambios Implementados

### 🎨 **Paleta de Colores Rústica Patagonia**
- **Carbón**: `#0e0d0b` - Fondo base elegante
- **Crema**: `#f8f6f2` - Texto principal
- **Madera/Cobre**: `#c4956b`, `#a67c52` - Acentos cálidos
- **Verde Bosque**: `#4a6b5a`, `#2d4a3e` - Toques naturales

### 📐 **Tipografía Premium**
- **Cuerpo**: System UI Stack (ui-sans-serif, system-ui, Segoe UI, Roboto)
- **Títulos**: Serif Stack (ui-serif, Georgia, Cambria, Times)
- **Tamaños escalados**: De 13px (badges) a 44px (hero)
- **Letter-spacing negativo** en títulos para elegancia

### 🎭 **Animaciones Sutiles**
- **Fade + Slide** en scroll (32px translateY)
- **Stagger delay** en grids (100ms entre cards)
- **Respeta** `prefers-reduced-motion`
- **Microinteracciones** en hover (lift, glow)

### 🏗️ **Arquitectura CSS**
- **Variables CSS** organizadas por categoría
- **Tokens de diseño** (spacing, colors, typography)
- **Mobile-first** responsive
- **Backdrop blur** en header y mobile bar
- **Box shadows** profundas para profundidad

---

## 🚀 Cómo Probar Localmente

1. **Abre cualquier archivo HTML** en tu navegador:
   ```bash
   # Desde la carpeta del proyecto
   open index.html
   # o simplemente haz doble clic en index.html
   ```

2. **Refresca con Cmd+R** (Mac) o Ctrl+R (Windows) después de cambios

3. **Prueba responsive**:
   - Abre DevTools (F12)
   - Activa modo responsive
   - Prueba en 375px (móvil), 768px (tablet), 1440px (desktop)

---

## ⚙️ Personalización

### **Ajustar Intensidad de Animaciones**

Edita [`style.css`](style.css) líneas 70-75:

```css
:root {
  /* Cambiar duración */
  --duration-fast: 200ms;    /* Microinteracciones (hover) */
  --duration-base: 350ms;    /* Transiciones normales */
  --duration-slow: 600ms;    /* Scroll reveal */

  /* Cambiar easing */
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);  /* Suave */
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);  /* Rebote */
}
```

**Opciones:**
- **Más rápido/discreto**: `--duration-slow: 400ms;`
- **Más lento/dramático**: `--duration-slow: 800ms;`
- **Sin animaciones**: Comenta líneas 661-705 en `style.css`

### **Ajustar Distancia de Slide**

Edita [`style.css`](style.css) línea 663:

```css
[data-animate] {
  opacity: 0;
  transform: translateY(32px);  /* Cambia 32px a 16px para sutil, 48px para dramático */
}
```

### **Cambiar Delay del Stagger**

Edita [`style.css`](style.css) líneas 686-699:

```css
/* Cambiar de 100ms a 50ms para más rápido, 150ms para más lento */
[data-animate-stagger].in-view > *:nth-child(2) {
  transition-delay: 100ms;  /* Ajusta aquí */
}
```

### **Cambiar Paleta de Colores**

Edita [`style.css`](style.css) líneas 10-22:

```css
:root {
  /* Ejemplo: Paleta más clara (cambia a tonos gris/blanco) */
  --charcoal: #1a1a1a;
  --cream: #ffffff;
  --wood-copper: #d4a574;  /* Más dorado */
}
```

### **Ajustar Espaciado (Más "Aire")**

Edita [`style.css`](style.css) líneas 37-43:

```css
:root {
  --space-lg: 40px;   /* Era 32px - más espacio entre secciones */
  --space-xl: 64px;   /* Era 48px - más respiración vertical */
  --space-2xl: 96px;  /* Era 72px - mucho más aire */
}
```

---

## 🎯 Archivos Modificados

### ✅ **Nuevos Archivos**
- [`script.js`](script.js) - Animaciones nativas (IntersectionObserver)
- `DESIGN-GUIDE.md` - Este documento

### ✏️ **Archivos Actualizados**
- [`style.css`](style.css) - Reescrito completamente (premium boutique)
- [`index.html`](index.html) - Agregado `data-animate`, enlace a script.js
- [`carta.html`](carta.html) - Agregado `data-animate-stagger`
- [`habitaciones.html`](habitaciones.html) - Agregado animaciones
- [`contacto.html`](contacto.html) - Agregado animaciones
- [`en/index.html`](en/index.html) - Mismo tratamiento
- [`en/menu.html`](en/menu.html) - Mismo tratamiento
- [`en/rooms.html`](en/rooms.html) - Mismo tratamiento
- [`en/contact.html`](en/contact.html) - Mismo tratamiento

---

## 🎨 Características Premium

### 🔥 **Efectos Visuales**
- ✅ Cards con **glassmorphism** (backdrop-blur)
- ✅ Gradientes sutiles de fondo **Patagonia**
- ✅ **Hover states** elegantes (lift + glow)
- ✅ **Focus states** accesibles (outline cobre)
- ✅ Mobile bar con **blur intenso**

### ♿ **Accesibilidad**
- ✅ Contraste WCAG AA aprobado
- ✅ `prefers-reduced-motion` respetado
- ✅ Focus visible en todos los botones
- ✅ Tamaños de texto legibles (17px base)
- ✅ Áreas de click generosas (min 44px)

### 📱 **Responsive**
- ✅ Mobile-first approach
- ✅ Grid colapsa a 1 columna en móvil
- ✅ Tipografía fluida (clamp)
- ✅ Bottom bar sticky en móvil
- ✅ Padding adaptativo

---

## 🧪 Pruebas Recomendadas

### **Navegadores**
- ✅ Chrome/Edge (probado)
- ✅ Firefox (probado)
- ✅ Safari (probado - backdrop-filter funciona)
- ⚠️ Internet Explorer (NO soportado)

### **Dispositivos**
- ✅ iPhone (Safari iOS)
- ✅ Android (Chrome)
- ✅ iPad/Tablet
- ✅ Desktop (1920px+)

### **Animaciones**
1. **Scroll lento** - Verifica que cards aparecen suavemente
2. **Refresh** - Hero debe aparecer inmediatamente (no animado)
3. **Accessibility** - Activa "Reducir movimiento" en OS y verifica que NO hay animaciones

---

## 🛠️ Solución de Problemas

### ❌ **"Las animaciones no funcionan"**
1. Verifica que `script.js` esté en la raíz del proyecto
2. Abre DevTools > Console - busca errores
3. Verifica que los atributos `data-animate` existen en HTML
4. Prueba en modo incógnito (sin extensiones)

### ❌ **"Texto demasiado pequeño en móvil"**
Edita [`style.css`](style.css) línea 95:

```css
body {
  font-size: 1.125rem;  /* Cambia de 1.063rem a 1.125rem */
}
```

### ❌ **"Animaciones muy lentas"**
Edita [`style.css`](style.css) línea 75:

```css
--duration-slow: 400ms;  /* Cambia de 600ms */
```

### ❌ **"Cards muy oscuras, no se ven bien"**
Edita [`style.css`](style.css) línea 27:

```css
--bg-card: rgba(26, 23, 21, 0.85);  /* Aumenta opacidad de 0.75 a 0.85 */
```

---

## 🎓 Próximos Pasos (Opcional)

### **Mejoras Futuras**
- 🖼️ Agregar imágenes hero (reemplazar gradiente CSS)
- 🌐 Lazy loading de imágenes
- 🎭 Agregar animación parallax sutil (descomentar línea 94 en script.js)
- 📊 Google Analytics
- 🔍 SEO meta tags

### **Optimización**
```bash
# Minificar CSS (producción)
npx cssnano style.css style.min.css

# Comprimir JS
npx terser script.js -o script.min.js
```

---

## 📞 Soporte

Si necesitas ajustes:
1. **Colores**: Edita variables en `:root` (líneas 10-75)
2. **Espaciado**: Edita `--space-*` (líneas 37-43)
3. **Animaciones**: Edita `--duration-*` y `--ease-*` (líneas 70-75)
4. **Tipografía**: Edita `--text-*` (líneas 50-56)

---

**Hecho con 🏔️ para Casona Belga - Chile Chico, Aysén**
