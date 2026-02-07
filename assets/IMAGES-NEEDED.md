# 📸 Imágenes Necesarias para Casona Belga

Este documento detalla todas las imágenes que se necesitan para el sitio web profesional.

## 🎯 Prioridad Alta (P0)

### Hero Section (1 imagen)
- **hero-patagonia.jpg** (1920x1080)
  - Vista panorámica del Lago General Carrera o paisaje patagónico
  - Alta calidad, bien iluminada, colores vibrantes
  - Formato: JPEG original + WebP + AVIF optimizados

### Galería Principal (10-12 imágenes)
1. **gallery-lago-general-carrera.jpg** - Vista icónica del lago
2. **gallery-restaurant-exterior.jpg** - Fachada del restaurante
3. **gallery-restaurant-interior.jpg** - Interior acogedor
4. **gallery-dining-area.jpg** - Área de comedor
5. **gallery-bar-area.jpg** - Barra/área de bebidas
6. **gallery-patagonia-landscape.jpg** - Paisaje patagónico
7. **gallery-capillas-marmol.jpg** - Catedral/Capillas de Mármol
8. **gallery-hiking.jpg** - Trekking/actividades
9. **gallery-sunset.jpg** - Atardecer en la región
10. **gallery-cerro-castillo.jpg** - Cerro Castillo o montañas

### Habitaciones (3-5 imágenes por habitación = 12-15 total)

#### Habitación Tehuelche
1. **room-tehuelche-01.jpg** - Vista general de la habitación
2. **room-tehuelche-02.jpg** - Cama principal
3. **room-tehuelche-03.jpg** - Baño
4. **room-tehuelche-04.jpg** - Ventana/vista
5. **room-tehuelche-05.jpg** - Detalles/amenidades

#### Habitación Yaganes
1. **room-yaganes-01.jpg** - Vista general
2. **room-yaganes-02.jpg** - Cama
3. **room-yaganes-03.jpg** - Baño
4. **room-yaganes-04.jpg** - Vista
5. **room-yaganes-05.jpg** - Detalles

#### Habitación Chonos
1. **room-chonos-01.jpg** - Vista general
2. **room-chonos-02.jpg** - Cama
3. **room-chonos-03.jpg** - Baño
4. **room-chonos-04.jpg** - Vista
5. **room-chonos-05.jpg** - Detalles

## 🟡 Prioridad Media (P1)

### Platos del Menú (8-12 imágenes)

#### Entradas
1. **food-ceviche-patagonia.jpg**
2. **food-tabla-quesos.jpg**
3. **food-entrada-salmon.jpg**

#### Platos Principales
4. **food-cordero-patagonia.jpg**
5. **food-trucha-regional.jpg**
6. **food-risotto-hongos.jpg**
7. **food-lomo-ciervo.jpg**

#### Postres
8. **food-semifreddo.jpg**
9. **food-mousse-chocolate.jpg**
10. **food-tarta-frutos.jpg**

#### Bebidas
11. **food-cerveza-artesanal.jpg**
12. **food-vino-copa.jpg**

### Testimonios - Avatars (6 imágenes)
1. **avatar-01.jpg** (200x200) - Mujer, 30-40 años
2. **avatar-02.jpg** (200x200) - Hombre, 40-50 años
3. **avatar-03.jpg** (200x200) - Pareja joven
4. **avatar-04.jpg** (200x200) - Mujer, 25-35 años
5. **avatar-05.jpg** (200x200) - Hombre, 30-40 años
6. **avatar-06.jpg** (200x200) - Mujer, 50-60 años

### OpenGraph/Social Media
- **og-casona-belga.jpg** (1200x630)
  - Imagen para compartir en redes sociales
  - Logo + tagline + vista del restaurante/hotel

## 🟢 Prioridad Baja (P2)

### Actividades/Atractivos (6 imágenes)
1. **activity-kayaking.jpg** - Kayak en el lago
2. **activity-hiking.jpg** - Trekking
3. **activity-marble-caves.jpg** - Cavernas de mármol
4. **activity-fishing.jpg** - Pesca deportiva
5. **activity-biking.jpg** - Ciclismo
6. **activity-horseback.jpg** - Cabalgatas

### Ambiente/Detalles (4 imágenes)
1. **detail-fireplace.jpg** - Chimenea/ambiente acogedor
2. **detail-breakfast.jpg** - Desayuno incluido
3. **detail-terrace.jpg** - Terraza/área exterior
4. **detail-wine-cellar.jpg** - Bodega de vinos

---

## 📐 Especificaciones Técnicas

### Tamaños Recomendados

| Categoría | Dimensiones | Aspect Ratio |
|-----------|-------------|--------------|
| Hero | 1920x1080 | 16:9 |
| Galería | 1200x900 | 4:3 |
| Habitaciones | 1200x800 | 3:2 |
| Platos | 800x800 | 1:1 |
| Avatars | 200x200 | 1:1 |
| OG Image | 1200x630 | 1.91:1 |

### Formatos de Salida

Para cada imagen, generar:
1. **Original JPEG** (calidad 85%, progresivo)
2. **WebP** (calidad 80%, mejor compresión)
3. **AVIF** (calidad 75%, formato más moderno)

### Naming Convention
```
[category]-[name]-[size].ext

Ejemplos:
- hero-patagonia-1920w.jpg
- hero-patagonia-1920w.webp
- hero-patagonia-1920w.avif
- room-tehuelche-01-1200w.jpg
- food-cordero-patagonia-800w.webp
```

### Responsive Sizes

Generar múltiples tamaños para srcset:
- **Desktop**: 1920w, 1440w, 1200w
- **Tablet**: 960w, 768w
- **Mobile**: 640w, 480w, 320w

---

## 🛠️ Herramientas de Optimización

### Online
- [TinyPNG](https://tinypng.com/) - Compresión PNG/JPEG
- [Squoosh](https://squoosh.app/) - Conversión WebP/AVIF
- [Cloudinary](https://cloudinary.com/) - CDN + optimización automática

### CLI
```bash
# Instalar herramientas
npm install -g @squoosh/cli sharp-cli

# Convertir a WebP
squoosh-cli --webp '{"quality":80}' images/*.jpg

# Resize batch
sharp -i input.jpg -o output.jpg resize 1200 900

# Optimizar JPEG
jpegoptim --max=85 --strip-all *.jpg
```

### Scripts NPM (opcional)
```json
{
  "scripts": {
    "optimize:images": "node scripts/optimize-images.js",
    "generate:webp": "squoosh-cli --webp '{\"quality\":80}' assets/**/*.{jpg,png}",
    "generate:avif": "squoosh-cli --avif '{\"quality\":75}' assets/**/*.{jpg,png}"
  }
}
```

---

## 📝 Checklist de Calidad

Antes de agregar una imagen, verificar:

- [ ] Resolución mínima cumplida
- [ ] Iluminación adecuada (no subexpuesta/sobreexpuesta)
- [ ] Enfoque nítido
- [ ] Composición profesional
- [ ] Sin elementos distractores
- [ ] Coherente con el branding (elegancia, minimalismo)
- [ ] Derechos de uso confirmados
- [ ] Optimizada (< 200KB por imagen WebP)
- [ ] Alt text descriptivo preparado
- [ ] Responsive sizes generados

---

## 🎨 Estilo Fotográfico

### Características Deseadas
- **Luz natural** preferentemente
- **Colores cálidos** (dorados, bronceados, verdes bosque)
- **Composición minimalista** (no sobrecargada)
- **Enfoque en detalles** (texturas de madera, piedra, comida)
- **Perspectiva humana** (no stock photos genéricas)
- **Autenticidad patagónica** (naturaleza, rusticidad elegante)

### Evitar
- Filtros excesivos o saturación artificial
- Stock photos genéricas sin carácter
- Fotos con marcas de agua
- Imágenes pixeladas o de baja calidad
- Elementos anacronismos (tecnología moderna visible)

---

## 📍 Dónde Obtener Imágenes

### Opción 1: Fotografía Propia (Recomendado)
- Contratar fotógrafo local profesional
- Sesión de 1-2 días para cubrir todo
- Costo aprox: $300-800 USD

### Opción 2: Stock Photos (Temporal)
Sitios recomendados:
- [Unsplash](https://unsplash.com/) - Gratis, alta calidad
- [Pexels](https://pexels.com/) - Gratis
- [Pixabay](https://pixabay.com/) - Gratis
- [Adobe Stock](https://stock.adobe.com/) - Pago, muy profesional

Búsquedas sugeridas:
- "patagonia landscape"
- "luxury hotel room"
- "gourmet restaurant food"
- "lago general carrera"
- "chile chico patagonia"

### Opción 3: Banco Existente
Si ya tienen fotos propias, solicitar:
- Archivos RAW o JPEG de máxima calidad
- Metadatos preservados
- Autorización de uso

---

**Última actualización:** 2026-02-07
**Total de imágenes necesarias:** ~45-60
**Presupuesto estimado (fotógrafo profesional):** $500-1000 USD
**Tiempo de implementación:** 1-2 días post-recepción de imágenes
