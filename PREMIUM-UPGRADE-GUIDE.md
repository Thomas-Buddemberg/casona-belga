# 🌟 CASONA BELGA - PREMIUM UPGRADE GUIDE

## ✨ Cambios Implementados

### **OPCIÓN B: Elegancia Minimalista Boutique** (Seleccionada)
Se implementó un diseño premium con:
- Paleta refinada (negro carbón, blanco hueso, bronce/cobre)
- Espaciado editorial generoso
- Tipografía serif para títulos
- Grain texture sutil en fondo
- Animaciones suaves y elegantes
- Componentes nuevos (FAQ, features, breadcrumbs)

---

## 📦 **ARCHIVOS ACTUALIZADOS**

### ✅ **Completamente Reescritos:**
1. **`style.css`** (1211 líneas) - Diseño boutique completo
2. **`script.js`** - Nuevas funcionalidades: FAQ accordion, scroll header, smooth scroll

### 📝 **Necesitan Actualizarse:**
Todos los HTML requieren cambios menores para aprovechar el nuevo diseño.

---

## 🎨 **NUEVAS VARIABLES CSS PARA PERSONALIZAR**

### **Colores:**
```css
:root {
  /* Cambiar en líneas 11-27 de style.css */
  --black-carbon: #0a0908;      /* Fondo oscuro principal */
  --bone-white: #faf8f5;        /* Texto principal */
  --copper-warm: #cda978;       /* Acento principal (botones, enlaces) */
  --bronze-old: #b8956a;        /* Acento secundario */
}
```

### **Espaciado:**
```css
:root {
  /* Líneas 44-52 */
  --space-xl: 64px;   /* Espacio entre secciones */
  --space-2xl: 96px;  /* Espacio grande entre secciones */
  --space-3xl: 128px; /* Espacio máximo (hero, section) */
}
```

### **Velocidad de Animaciones:**
```css
:root {
  /* Líneas 92-96 */
  --duration-fast: 250ms;    /* Hover effects */
  --duration-base: 400ms;    /* Transiciones normales */
  --duration-slow: 650ms;    /* Scroll reveal */
  --duration-slower: 900ms;  /* Fade animations */
}
```

### **Tipografía:**
```css
:root {
  /* Líneas 59-66 */
  --text-base: 1.0625rem;  /* 17px - Tamaño de texto base */
  --text-lg: 1.25rem;      /* 20px - Lead text */
  --text-4xl: 3.75rem;     /* 60px - Hero titles */
}
```

---

## 🔧 **CÓMO ACTUALIZAR LOS HTMLs**

### **REGLA CRÍTICA:**
⚠️ **NO MODIFICAR textos existentes. Solo AGREGAR clases y nuevas secciones.**

---

### **1. Todos los archivos HTML**

#### A. Agregar al `<head>` (si no existe):
```html
<link rel="stylesheet" href="style.css" />
<!-- En /en usar: -->
<link rel="stylesheet" href="../style.css" />
```

#### B. Antes del cierre `</body>`:
```html
<script src="script.js" defer></script>
<!-- En /en usar: -->
<script src="../script.js" defer></script>
```

---

### **2. index.html** (Español)

#### Agregar después de la sección "Lo esencial":

```html
<!-- NUEVA SECCIÓN: Nuestra Filosofía -->
<section class="section-sm" data-animate>
  <div class="container-narrow">
    <div class="text-center">
      <h2>Experiencia Patagónica Auténtica</h2>
      <div class="decorative-line" style="margin: 24px auto;"></div>
      <p class="lead">
        En Casona Belga creemos en la hospitalidad consciente: cada detalle está pensado para tu bienestar y en armonía con nuestro entorno patagónico.
      </p>
    </div>

    <div class="feature-list mt-xl" data-animate-stagger>
      <div class="feature-item">
        <div class="feature-icon">🌿</div>
        <div class="feature-content">
          <h4>Ingredientes Locales</h4>
          <p>Trabajamos con productores de Chile Chico para ofrecer lo mejor de la Patagonia en cada plato.</p>
        </div>
      </div>

      <div class="feature-item">
        <div class="feature-icon">🛏️</div>
        <div class="feature-content">
          <h4>Descanso Profundo</h4>
          <p>Colchones premium, sábanas de 1000 hilos y lámparas de sal para tu recuperación total.</p>
        </div>
      </div>

      <div class="feature-item">
        <div class="feature-icon">🏔️</div>
        <div class="feature-content">
          <h4>Conexión con la Naturaleza</h4>
          <p>Ubicación privilegiada cerca del Lago General Carrera y la Cordillera de los Andes.</p>
        </div>
      </div>

      <div class="feature-item">
        <div class="feature-icon">💚</div>
        <div class="feature-content">
          <h4>Sustentabilidad</h4>
          <p>Prácticas responsables para cuidar nuestro entorno patagónico único.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- NUEVA SECCIÓN: Experiencias Locales -->
<section class="section-sm" data-animate>
  <div class="container">
    <h2 class="text-center">Descubre Chile Chico</h2>
    <p class="text-center text-muted mb-xl">
      Actividades y lugares imperdibles en la Patagonia
    </p>

    <div class="grid" data-animate-stagger>
      <div class="card card-flat">
        <h3>🚣 Lago General Carrera</h3>
        <p class="small">
          El segundo lago más grande de Sudamérica. Explora las Catedrales de Mármol y sus aguas turquesas.
        </p>
      </div>

      <div class="card card-flat">
        <h3>🍒 Cerezas Orgánicas</h3>
        <p class="small">
          Chile Chico es famoso por sus cerezas. Visita los huertos durante la temporada (dic-ene).
        </p>
      </div>

      <div class="card card-flat">
        <h3>🚵 Trekking y Ciclismo</h3>
        <p class="small">
          Rutas panorámicas con vistas a la Cordillera. Ideal para aventureros y amantes de la naturaleza.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- NUEVA SECCIÓN: FAQ -->
<section class="section-sm" data-animate>
  <div class="container-narrow">
    <h2 class="text-center">Preguntas Frecuentes</h2>
    <p class="text-center text-muted mb-xl">
      Respuestas a las dudas más comunes
    </p>

    <div class="faq-list">
      <div class="faq-item">
        <div class="faq-question">
          ¿Cómo llego a Chile Chico?
        </div>
        <div class="faq-answer">
          <div class="faq-answer-content">
            Puedes llegar por tierra desde Coyhaique (270 km, 4-5 horas) o cruzar el Lago General Carrera en barcaza desde Puerto Ingeniero Ibáñez. También hay vuelos charter desde Balmaceda.
          </div>
        </div>
      </div>

      <div class="faq-item">
        <div class="faq-question">
          ¿Cuál es la mejor época para visitar?
        </div>
        <div class="faq-answer">
          <div class="faq-answer-content">
            La temporada alta es de diciembre a marzo (verano patagónico). Clima más templado y cerezas en enero. Otoño (marzo-abril) ofrece paisajes dorados espectaculares.
          </div>
        </div>
      </div>

      <div class="faq-item">
        <div class="faq-question">
          ¿Ofrecen transporte desde la barcaza?
        </div>
        <div class="faq-answer">
          <div class="faq-answer-content">
            Podemos coordinar transporte desde Puerto Ibáñez. Contáctanos por WhatsApp para arreglos especiales.
          </div>
        </div>
      </div>

      <div class="faq-item">
        <div class="faq-question">
          ¿Hay opciones vegetarianas/veganas en el restaurante?
        </div>
        <div class="faq-answer">
          <div class="faq-answer-content">
            Sí, nuestra carta incluye opciones vegetarianas. Para necesidades especiales (vegano, celíaco), avísanos con anticipación y preparamos platos personalizados.
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

### **3. en/index.html** (English)

#### Agregar las mismas secciones en inglés:

```html
<!-- NEW SECTION: Our Philosophy -->
<section class="section-sm" data-animate>
  <div class="container-narrow">
    <div class="text-center">
      <h2>Authentic Patagonian Experience</h2>
      <div class="decorative-line" style="margin: 24px auto;"></div>
      <p class="lead">
        At Casona Belga, we believe in conscious hospitality: every detail is designed for your well-being and in harmony with our Patagonian environment.
      </p>
    </div>

    <div class="feature-list mt-xl" data-animate-stagger>
      <div class="feature-item">
        <div class="feature-icon">🌿</div>
        <div class="feature-content">
          <h4>Local Ingredients</h4>
          <p>We work with Chile Chico producers to offer the best of Patagonia in every dish.</p>
        </div>
      </div>

      <div class="feature-item">
        <div class="feature-icon">🛏️</div>
        <div class="feature-content">
          <h4>Deep Rest</h4>
          <p>Premium mattresses, 1,000-thread-count sheets, and salt lamps for your total recovery.</p>
        </div>
      </div>

      <div class="feature-item">
        <div class="feature-icon">🏔️</div>
        <div class="feature-content">
          <h4>Connection with Nature</h4>
          <p>Privileged location near Lake General Carrera and the Andes Mountains.</p>
        </div>
      </div>

      <div class="feature-item">
        <div class="feature-icon">💚</div>
        <div class="feature-content">
          <h4>Sustainability</h4>
          <p>Responsible practices to care for our unique Patagonian environment.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- NEW SECTION: Local Experiences -->
<section class="section-sm" data-animate>
  <div class="container">
    <h2 class="text-center">Discover Chile Chico</h2>
    <p class="text-center text-muted mb-xl">
      Must-see activities and places in Patagonia
    </p>

    <div class="grid" data-animate-stagger>
      <div class="card card-flat">
        <h3>🚣 Lake General Carrera</h3>
        <p class="small">
          South America's second-largest lake. Explore the Marble Cathedrals and turquoise waters.
        </p>
      </div>

      <div class="card card-flat">
        <h3>🍒 Organic Cherries</h3>
        <p class="small">
          Chile Chico is famous for its cherries. Visit the orchards during season (Dec-Jan).
        </p>
      </div>

      <div class="card card-flat">
        <h3>🚵 Trekking & Cycling</h3>
        <p class="small">
          Scenic routes with mountain views. Perfect for adventurers and nature lovers.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- NEW SECTION: FAQ -->
<section class="section-sm" data-animate>
  <div class="container-narrow">
    <h2 class="text-center">Frequently Asked Questions</h2>
    <p class="text-center text-muted mb-xl">
      Answers to common questions
    </p>

    <div class="faq-list">
      <div class="faq-item">
        <div class="faq-question">
          How do I get to Chile Chico?
        </div>
        <div class="faq-answer">
          <div class="faq-answer-content">
            You can arrive by road from Coyhaique (270 km, 4-5 hours) or cross Lake General Carrera by barge from Puerto Ingeniero Ibáñez. Charter flights from Balmaceda are also available.
          </div>
        </div>
      </div>

      <div class="faq-item">
        <div class="faq-question">
          What's the best time to visit?
        </div>
        <div class="faq-answer">
          <div class="faq-answer-content">
            High season is December to March (Patagonian summer). Milder weather and cherries in January. Autumn (March-April) offers spectacular golden landscapes.
          </div>
        </div>
      </div>

      <div class="faq-item">
        <div class="faq-question">
          Do you offer transport from the barge?
        </div>
        <div class="faq-answer">
          <div class="faq-answer-content">
            We can coordinate transport from Puerto Ibáñez. Contact us via WhatsApp for special arrangements.
          </div>
        </div>
      </div>

      <div class="faq-item">
        <div class="faq-question">
          Are there vegetarian/vegan options at the restaurant?
        </div>
        <div class="faq-answer">
          <div class="faq-answer-content">
            Yes, our menu includes vegetarian options. For special needs (vegan, gluten-free), let us know in advance and we'll prepare personalized dishes.
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

### **4. Mejorar Footer** (Todos los archivos)

Reemplazar el footer existente con:

```html
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-section">
        <h4>Casona Belga</h4>
        <p class="small">
          Hotel & Restaurante boutique en Chile Chico, Región de Aysén. Experiencia patagónica auténtica.
        </p>
      </div>

      <div class="footer-section">
        <h4>Enlaces</h4>
        <ul>
          <li><a href="carta.html">Restaurante</a></li>
          <li><a href="habitaciones.html">Hotel</a></li>
          <li><a href="contacto.html">Contacto</a></li>
          <li><a href="https://www.google.com/maps/place/Casona+Belga+Restaurante" target="_blank" rel="noopener">Ubicación</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>Contacto</h4>
        <ul>
          <li><a href="tel:+56998244016">+56 9 9824 4016</a></li>
          <li><a href="mailto:casonabelga@gmail.com">casonabelga@gmail.com</a></li>
          <li><a href="https://wa.me/message/TSCZUHZY7LTVJ1" target="_blank" rel="noopener">WhatsApp</a></li>
          <li><a href="https://www.instagram.com/casonabelga" target="_blank" rel="noopener">Instagram</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="small">
        © <span id="y"></span> Casona Belga · Descansa bien, come mejor.
      </div>
    </div>
  </div>
</footer>

<script>
  document.getElementById("y").textContent = new Date().getFullYear();
</script>
```

**Para archivos EN:** Cambiar textos a inglés y ajustar enlaces:
- "Restaurante" → "Restaurant" (enlace: `menu.html`)
- "Hotel" → "Rooms" (enlace: `rooms.html`)
- "Contacto" → "Contact" (enlace: `contact.html`)
- "Rest well, eat better" en lugar de "Descansa bien, come mejor"

---

## 🎯 **NUEVAS CLASES CSS DISPONIBLES**

### **Contenedores:**
- `.container` - Ancho máximo 1180px
- `.container-narrow` - Ancho máximo 880px
- `.container-text` - Ancho máximo 720px (para texto largo)

### **Secciones:**
- `.section` - Padding 128px vertical (desktop)
- `.section-sm` - Padding 96px vertical
- `.section-lg` - Padding custom

### **Grids:**
- `.grid` - Grid de 3 columnas
- `.grid-2` - Grid de 2 columnas
- `.grid-4` - Grid de 4 columnas
- `.feature-list` - Grid especial para features (2 cols)

### **Botones:**
- `.btn` - Botón base
- `.btn.primary` - Botón primario (cobre/bronze)
- `.btn.secondary` - Botón secundario (transparente)

### **Cards:**
- `.card` - Card premium con blur
- `.card-flat` - Card plana sin sombra fuerte

### **Utilidades:**
- `.text-center` - Centrar texto
- `.text-accent` - Color acento
- `.text-muted` - Color muted
- `.mt-lg`, `.mt-xl`, `.mt-2xl` - Margin top
- `.mb-lg`, `.mb-xl`, `.mb-2xl` - Margin bottom

### **Animaciones:**
- `[data-animate]` - Fade + slide individual
- `[data-animate-stagger]` - Stagger para hijos
- `[data-fade]` - Solo fade

### **Componentes:**
- `.decorative-line` - Línea decorativa con gradiente
- `.sep-decorative` - Separador con texto central
- `.breadcrumbs` - Navegación breadcrumb
- `.faq-list`, `.faq-item` - Accordion FAQ
- `.feature-list`, `.feature-item` - Lista de features
- `.footer-grid`, `.footer-section` - Footer estructurado

---

## 📱 **MEJORAS RESPONSIVE**

El nuevo diseño es completamente responsive:

- **Desktop (>968px):** Grid de 3 columnas, espaciado generoso
- **Tablet (769-968px):** Grid de 2 columnas, espaciado medio
- **Mobile (<768px):** 1 columna, espaciado reducido, mobile-bar visible

---

## 🚀 **CÓMO PROBAR**

1. Abre `index.html` en tu navegador
2. Verifica animaciones al hacer scroll
3. Prueba FAQ (click en preguntas)
4. Verifica responsive (DevTools > Toggle device toolbar)
5. Prueba con "Reduce Motion" activado en tu OS

---

## ⚙️ **PERSONALIZACIÓN RÁPIDA**

### **Cambiar paleta completa:**
Edita líneas 11-27 de `style.css`

### **Más/Menos espacio:**
Edita líneas 44-52 de `style.css` (--space-*)

### **Velocidad de animaciones:**
Edita líneas 92-96 de `style.css` (--duration-*)

### **Tamaños de texto:**
Edita líneas 59-66 de `style.css` (--text-*)

### **Activar parallax sutil:**
Descomentar líneas 156-181 de `script.js`

---

## 🎨 **DIFERENCIAS PRINCIPALES**

| Aspecto | Antes | Ahora |
|---------|-------|-------|
| **Paleta** | Carbón/crema básico | Negro carbón profundo + blanco hueso + bronce elegante |
| **Espaciado** | Standard (16-48px) | Editorial generoso (4-128px) |
| **Tipografía** | Sans uniform | Serif para títulos, sans para cuerpo |
| **Animaciones** | Básicas fade/slide | Stagger, fade, parallax opcional, scroll header |
| **Componentes** | Básicos | FAQ, features, breadcrumbs, footer grid |
| **Textura** | Gradientes simples | Grain SVG + múltiples gradientes |
| **Sombras** | 1-2 niveles | 5 niveles (xs/sm/md/lg/xl) |
| **Cards** | Hover simple | Hover con glow + border gradient |

---

## ✅ **CHECKLIST DE IMPLEMENTACIÓN**

- [ ] Actualizar `style.css` (✅ Ya hecho)
- [ ] Actualizar `script.js` (✅ Ya hecho)
- [ ] Agregar secciones nuevas a `index.html`
- [ ] Agregar secciones nuevas a `en/index.html`
- [ ] Actualizar footer en todos los HTMLs
- [ ] Verificar que script.js esté enlazado en todos
- [ ] Probar FAQ functionality
- [ ] Probar animaciones scroll
- [ ] Verificar responsive en móvil
- [ ] Probar con prefers-reduced-motion

---

## 🎓 **PRÓXIMOS PASOS OPCIONALES**

1. **Agregar imágenes reales** de Chile Chico
2. **Crear página "Nuestra Historia"** con timeline
3. **Agregar testimonios** de huéspedes
4. **Integrar mapa** interactivo
5. **Blog/Noticias** sobre Chile Chico
6. **Galería** de fotos

---

**Hecho con 🏔️ para Casona Belga**
