# ⚡ Guía de Optimización de Performance
## Casona Belga - Performance & Speed Optimization

**Objetivo:** Lighthouse Performance Score > 90
**Estado Actual:** ~65-75 (estimado)
**Estado Objetivo:** >90

---

## 📊 Performance Audit Checklist

### Critical Metrics (Core Web Vitals)

- [ ] **LCP (Largest Contentful Paint)** < 2.5s
  - Métrica: Tiempo que tarda en cargar el contenido más grande visible
  - Target: < 2.5s (Good), < 4.0s (Needs Improvement)

- [ ] **FID (First Input Delay)** < 100ms
  - Métrica: Tiempo hasta que la página responde a la primera interacción
  - Target: < 100ms (Good), < 300ms (Needs Improvement)

- [ ] **CLS (Cumulative Layout Shift)** < 0.1
  - Métrica: Estabilidad visual (evitar saltos de contenido)
  - Target: < 0.1 (Good), < 0.25 (Needs Improvement)

- [ ] **FCP (First Contentful Paint)** < 1.8s
  - Métrica: Tiempo hasta que aparece el primer contenido
  - Target: < 1.8s (Good)

- [ ] **TTI (Time to Interactive)** < 3.8s
  - Métrica: Tiempo hasta que la página es completamente interactiva
  - Target: < 3.8s (Good)

---

## 🖼️ Image Optimization (Priority: P0)

### 1. Comprimir Imágenes Existentes

**Herramientas recomendadas:**

#### Online (Gratis)
- [TinyPNG](https://tinypng.com/) - PNG/JPG compression (hasta 80% reduction)
- [Squoosh](https://squoosh.app/) - Google's image optimizer
- [ImageOptim](https://imageoptim.com/) - Mac app

#### CLI Tools
```bash
# Install ImageMagick
brew install imagemagick  # macOS
sudo apt install imagemagick  # Linux

# Optimize JPEG (quality 85%)
convert input.jpg -quality 85 -strip output.jpg

# Optimize PNG
pngquant --quality=65-80 input.png -o output.png

# Install Sharp (Node.js)
npm install -g sharp-cli

# Convert to WebP
sharp -i input.jpg -o output.webp --webp-quality 80
```

### 2. Generar Formatos Modernos (WebP/AVIF)

**Script automatizado:**

```javascript
// optimize-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = './assets/images';
const OUTPUT_DIR = './assets/images/optimized';

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Get all images
const images = fs.readdirSync(INPUT_DIR)
  .filter(file => /\.(jpg|jpeg|png)$/i.test(file));

images.forEach(async (filename) => {
  const inputPath = path.join(INPUT_DIR, filename);
  const basename = path.parse(filename).name;

  try {
    // Original optimized
    await sharp(inputPath)
      .jpeg({ quality: 85, progressive: true })
      .toFile(path.join(OUTPUT_DIR, `${basename}.jpg`));

    // WebP
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(path.join(OUTPUT_DIR, `${basename}.webp`));

    // AVIF (best compression)
    await sharp(inputPath)
      .avif({ quality: 70 })
      .toFile(path.join(OUTPUT_DIR, `${basename}.avif`));

    console.log(`✅ Optimized: ${filename}`);
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error);
  }
});
```

**Uso:**
```bash
npm install sharp
node optimize-images.js
```

### 3. Implementar `<picture>` con Fallbacks

**Template HTML:**

```html
<picture>
  <!-- AVIF (best compression, latest browsers) -->
  <source
    srcset="assets/images/hero-mobile.avif 600w,
            assets/images/hero-tablet.avif 1200w,
            assets/images/hero-desktop.avif 1920w"
    sizes="100vw"
    type="image/avif">

  <!-- WebP (good compression, widely supported) -->
  <source
    srcset="assets/images/hero-mobile.webp 600w,
            assets/images/hero-tablet.webp 1200w,
            assets/images/hero-desktop.webp 1920w"
    sizes="100vw"
    type="image/webp">

  <!-- JPEG fallback (universal support) -->
  <img
    src="assets/images/hero-desktop.jpg"
    srcset="assets/images/hero-mobile.jpg 600w,
            assets/images/hero-tablet.jpg 1200w,
            assets/images/hero-desktop.jpg 1920w"
    sizes="100vw"
    alt="Casona Belga - Vista exterior del hotel"
    loading="lazy"
    decoding="async"
    width="1920"
    height="1080">
</picture>
```

### 4. Lazy Loading Universal

**Ya implementado en `gallery.js`**, pero extender a todas las imágenes:

```javascript
// lazy-load.js
document.addEventListener('DOMContentLoaded', function() {
  // Native lazy loading for browsers that support it
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      img.src = img.dataset.src;
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
      }
      img.removeAttribute('data-src');
      img.removeAttribute('data-srcset');
    });
  } else {
    // Fallback to IntersectionObserver
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }
          img.removeAttribute('data-src');
          img.removeAttribute('data-srcset');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
});
```

**Uso en HTML:**
```html
<!-- Above the fold: eager loading -->
<img src="hero.jpg" alt="Hero" loading="eager">

<!-- Below the fold: lazy loading -->
<img data-src="gallery-1.jpg" alt="Gallery" loading="lazy">
```

---

## 📦 CSS Optimization (Priority: P0)

### 1. Minificar CSS

**Online:**
- [CSS Minifier](https://cssminifier.com/)

**CLI:**
```bash
# Using cssnano
npm install -g cssnano-cli
cssnano style.css style.min.css

# Using clean-css
npm install -g clean-css-cli
cleancss -o style.min.css style.css
```

### 2. Eliminar CSS No Utilizado

**Herramienta: PurgeCSS**

```bash
npm install -g purgecss

purgecss --css style.css \
         --content index.html habitaciones.html carta.html \
         --output style.purged.css
```

**Configuración avanzada:**
```javascript
// purgecss.config.js
module.exports = {
  content: ['./**/*.html', './**/*.js'],
  css: ['./style.css', './components.css'],
  safelist: [
    // Classes added dynamically
    'lightbox-open',
    'gallery-item-active',
    /^alert--/,
    /^form-/
  ],
  output: './dist/'
};
```

### 3. Critical CSS

**Extraer CSS crítico (above-the-fold):**

```bash
npm install -g critical

critical index.html \
  --base ./ \
  --inline \
  --minify \
  --width 1920 \
  --height 1080 \
  --target index-critical.html
```

**Template manual:**
```html
<head>
  <!-- Critical CSS inline -->
  <style>
    /* Only styles needed for above-the-fold content */
    :root { --bg-base: #0a0908; /* ... */ }
    .hero-enhanced { /* ... */ }
    .nav { /* ... */ }
  </style>

  <!-- Load rest of CSS asynchronously -->
  <link rel="preload" href="style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="style.css"></noscript>
</head>
```

### 4. CSS Variables Optimization

Ya optimizado en el código actual. ✅

---

## 🚀 JavaScript Optimization (Priority: P0)

### 1. Minificar JavaScript

**Online:**
- [JavaScript Minifier](https://javascript-minifier.com/)

**CLI:**
```bash
# Using Terser (best)
npm install -g terser
terser gallery.js -o gallery.min.js --compress --mangle

# Using UglifyJS
npm install -g uglify-js
uglifyjs gallery.js -o gallery.min.js -c -m
```

### 2. Defer Non-Critical Scripts

**Actualizar `index.html`:**

```html
<!-- Critical: Load immediately (Analytics) -->
<script src="analytics.js"></script>

<!-- Non-critical: Defer -->
<script src="gallery.js" defer></script>
<script src="theme-toggle.js" defer></script>

<!-- External scripts: Async -->
<script src="https://example.com/external.js" async></script>
```

### 3. Code Splitting

Para proyectos más grandes:

```javascript
// Dynamic imports
document.querySelector('.gallery').addEventListener('click', async () => {
  const { Gallery } = await import('./gallery.js');
  new Gallery('.gallery');
});
```

---

## 🔤 Font Optimization (Priority: P1)

### 1. Self-Host Google Fonts

**Descargar fuentes:**
- [Google Webfonts Helper](https://gwfh.mranftl.com/fonts)

**CSS optimizado:**
```css
@font-face {
  font-family: 'Cormorant Garamond';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Cormorant Garamond'),
       url('/fonts/cormorant-garamond-v16-latin-regular.woff2') format('woff2'),
       url('/fonts/cormorant-garamond-v16-latin-regular.woff') format('woff');
}
```

### 2. Font Subsetting

Solo incluir caracteres necesarios:

```bash
# Install pyftsubset (part of fonttools)
pip install fonttools brotli

# Subset font (Latin + Spanish chars)
pyftsubset font.ttf \
  --output-file=font-subset.woff2 \
  --flavor=woff2 \
  --layout-features=* \
  --unicodes=U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD
```

### 3. Preload Critical Fonts

```html
<head>
  <link rel="preload"
        href="/fonts/cormorant-garamond-v16-latin-regular.woff2"
        as="font"
        type="font/woff2"
        crossorigin>
</head>
```

---

## 🌐 Resource Hints (Priority: P1)

### 1. Preconnect to External Origins

```html
<head>
  <!-- Google Analytics -->
  <link rel="preconnect" href="https://www.google-analytics.com">
  <link rel="dns-prefetch" href="https://www.google-analytics.com">

  <!-- CDN or External Resources -->
  <link rel="preconnect" href="https://cdn.example.com">
</head>
```

### 2. Preload Critical Resources

```html
<head>
  <!-- Hero image -->
  <link rel="preload"
        href="assets/images/hero-casona.avif"
        as="image"
        type="image/avif">

  <!-- Critical CSS -->
  <link rel="preload" href="style.min.css" as="style">

  <!-- Critical JavaScript -->
  <link rel="preload" href="analytics.js" as="script">
</head>
```

### 3. Prefetch Next Pages

```html
<!-- Prefetch likely next pages -->
<link rel="prefetch" href="habitaciones.html">
<link rel="prefetch" href="carta.html">
```

---

## 📡 HTTP/2 & Compression (Priority: P1)

### 1. Enable HTTP/2

**Nginx:**
```nginx
server {
  listen 443 ssl http2;
  # ...
}
```

**Apache:**
```apache
Protocols h2 h2c http/1.1
```

### 2. Enable Gzip/Brotli Compression

**Nginx:**
```nginx
# Gzip
gzip on;
gzip_vary on;
gzip_min_length 256;
gzip_types text/plain text/css text/xml text/javascript
           application/x-javascript application/xml+rss
           application/javascript application/json
           image/svg+xml;

# Brotli (better than gzip)
brotli on;
brotli_types text/plain text/css text/xml text/javascript
             application/x-javascript application/xml+rss
             application/javascript application/json
             image/svg+xml;
```

**Apache:**
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

### 3. Cache Headers

**Nginx:**
```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
```

**Apache:**
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access 1 year"
  ExpiresByType image/jpeg "access 1 year"
  ExpiresByType image/png "access 1 year"
  ExpiresByType image/webp "access 1 year"
  ExpiresByType image/avif "access 1 year"
  ExpiresByType text/css "access 1 month"
  ExpiresByType application/javascript "access 1 month"
  ExpiresByType font/woff2 "access 1 year"
</IfModule>
```

---

## 🎯 Render Optimization (Priority: P1)

### 1. Prevent Layout Shifts (CLS)

**Siempre especificar dimensiones:**
```html
<!-- ❌ Bad: causes layout shift -->
<img src="image.jpg" alt="Image">

<!-- ✅ Good: reserves space -->
<img src="image.jpg" alt="Image" width="800" height="600">
```

**CSS aspect ratio:**
```css
.image-container {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

### 2. Avoid Render-Blocking Resources

```html
<!-- ❌ Blocks rendering -->
<link rel="stylesheet" href="non-critical.css">

<!-- ✅ Async load -->
<link rel="preload" href="non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

### 3. Optimize Web Fonts Loading

```css
@font-face {
  font-family: 'Cormorant Garamond';
  font-display: swap; /* ✅ Show fallback immediately */
  /* ... */
}
```

---

## 🔧 Build Process (Priority: P2)

### Automated Build Script

```javascript
// build.js
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const terser = require('terser');
const CleanCSS = require('clean-css');
const htmlMinifier = require('html-minifier');

const BUILD_DIR = './dist';

// 1. Clean dist directory
if (fs.existsSync(BUILD_DIR)) {
  fs.rmSync(BUILD_DIR, { recursive: true });
}
fs.mkdirSync(BUILD_DIR, { recursive: true });

// 2. Optimize images
async function optimizeImages() {
  const images = fs.readdirSync('./assets/images')
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f));

  for (const img of images) {
    const input = `./assets/images/${img}`;
    const basename = path.parse(img).name;

    await sharp(input)
      .webp({ quality: 80 })
      .toFile(`${BUILD_DIR}/images/${basename}.webp`);

    await sharp(input)
      .avif({ quality: 70 })
      .toFile(`${BUILD_DIR}/images/${basename}.avif`);
  }
}

// 3. Minify CSS
function minifyCSS() {
  const css = fs.readFileSync('./style.css', 'utf8');
  const minified = new CleanCSS().minify(css);
  fs.writeFileSync(`${BUILD_DIR}/style.min.css`, minified.styles);
}

// 4. Minify JavaScript
async function minifyJS() {
  const files = ['gallery.js', 'analytics.js', 'theme-toggle.js'];

  for (const file of files) {
    const code = fs.readFileSync(`./${file}`, 'utf8');
    const minified = await terser.minify(code);
    const basename = path.parse(file).name;
    fs.writeFileSync(`${BUILD_DIR}/${basename}.min.js`, minified.code);
  }
}

// 5. Minify HTML
function minifyHTML() {
  const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

  files.forEach(file => {
    const html = fs.readFileSync(file, 'utf8');
    const minified = htmlMinifier.minify(html, {
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true
    });
    fs.writeFileSync(`${BUILD_DIR}/${file}`, minified);
  });
}

// Run all
(async () => {
  console.log('🚀 Building production version...');
  await optimizeImages();
  minifyCSS();
  await minifyJS();
  minifyHTML();
  console.log('✅ Build complete!');
})();
```

**Package.json:**
```json
{
  "scripts": {
    "build": "node build.js",
    "optimize:images": "node optimize-images.js",
    "optimize:css": "cssnano style.css dist/style.min.css",
    "optimize:js": "terser gallery.js -o dist/gallery.min.js"
  },
  "devDependencies": {
    "sharp": "^0.32.0",
    "terser": "^5.16.0",
    "clean-css": "^5.3.0",
    "html-minifier": "^4.0.0"
  }
}
```

---

## 📊 Performance Monitoring

### 1. Lighthouse CI

```bash
npm install -g @lhci/cli

# Run audit
lhci autorun --upload.target=temporary-public-storage

# Or with config
lhci autorun --config=lighthouserc.json
```

**lighthouserc.json:**
```json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:8080/"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.95}]
      }
    }
  }
}
```

### 2. WebPageTest

- URL: [https://www.webpagetest.org/](https://www.webpagetest.org/)
- Test desde múltiples ubicaciones
- Waterfall charts detallados

### 3. Chrome DevTools Performance

1. Abrir DevTools (F12)
2. Pestaña "Performance"
3. Click en "Record"
4. Navegar por la página
5. Stop recording
6. Analizar:
   - Long tasks (> 50ms)
   - Layout shifts
   - Paint timing

---

## ✅ Quick Wins Checklist

### Implementar HOY (< 2 horas)

- [ ] Minificar CSS y JS
- [ ] Comprimir imágenes con TinyPNG
- [ ] Agregar `loading="lazy"` a imágenes below-the-fold
- [ ] Agregar `width` y `height` a todas las imágenes
- [ ] Defer JavaScript no crítico
- [ ] Preconnect a Google Analytics

### Implementar ESTA SEMANA (2-4 horas)

- [ ] Generar WebP/AVIF para todas las imágenes
- [ ] Implementar `<picture>` con fallbacks
- [ ] Self-host Google Fonts
- [ ] Preload recursos críticos
- [ ] Habilitar Gzip/Brotli en servidor
- [ ] Configurar cache headers

### Implementar ESTE MES (4-8 horas)

- [ ] Build process automatizado
- [ ] Critical CSS extraction
- [ ] Font subsetting
- [ ] Lighthouse CI integration
- [ ] Performance monitoring continuo

---

## 🎯 Performance Budget

| Métrica | Budget | Actual | Status |
|---------|--------|--------|--------|
| Total Page Size | < 1.5 MB | ~2.5 MB | 🔴 |
| Total Requests | < 50 | ~60 | 🟡 |
| LCP | < 2.5s | ~3.8s | 🔴 |
| FID | < 100ms | ~150ms | 🟡 |
| CLS | < 0.1 | ~0.05 | 🟢 |
| Lighthouse Performance | > 90 | ~68 | 🔴 |

**Prioridades:**
1. 🔴 Reducir page size (comprimir imágenes)
2. 🔴 Mejorar LCP (optimizar hero image)
3. 🟡 Reducir FID (diferir JavaScript)

---

## 📚 Recursos Adicionales

- [Web.dev - Performance](https://web.dev/performance/)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Image Optimization Guide](https://web.dev/fast/#optimize-your-images)

---

**Última actualización:** 2026-02-07
**Próximo review:** Después de implementar optimizaciones P0
