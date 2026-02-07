# 📊 Google Analytics 4 - Guía de Configuración

## Paso 1: Crear Cuenta de Google Analytics

1. Ve a [https://analytics.google.com](https://analytics.google.com)
2. Haz clic en "Empezar a medir" (o "Start measuring")
3. Crea una cuenta:
   - Nombre de la cuenta: `Casona Belga`
   - Configuración de datos compartidos: según preferencias

## Paso 2: Crear Propiedad

1. Nombre de la propiedad: `Casona Belga Website`
2. Zona horaria: `(GMT-03:00) Santiago` (Chile)
3. Moneda: `CLP - Peso chileno`

## Paso 3: Detalles Empresariales

1. Categoría del sector: `Hoteles y ocio`
2. Tamaño de la empresa: `Pequeña (1-10 empleados)`
3. Objetivos: Seleccionar:
   - ✅ Examinar el comportamiento del usuario
   - ✅ Medir conversiones
   - ✅ Obtener información sobre los clientes

## Paso 4: Configurar Flujo de Datos

1. Selecciona: **Web**
2. URL del sitio web: `https://www.casonabelga.cl`
3. Nombre del flujo: `Sitio Web Casona Belga`
4. **IMPORTANTE:** Copia tu **ID de medición** (formato: `G-XXXXXXXXXX`)

## Paso 5: Configurar el Sitio Web

### Opción A: Configuración Manual (Recomendado)

1. Abre el archivo `analytics.js`
2. Busca la línea 12:
   ```javascript
   const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Replace with actual GA4 ID
   ```
3. Reemplaza `'G-XXXXXXXXXX'` con tu ID de medición real:
   ```javascript
   const GA_MEASUREMENT_ID = 'G-ABC123DEF4'; // Ejemplo
   ```
4. Guarda el archivo
5. Sube los cambios a producción

### Opción B: Usando Google Tag Manager (Alternativa)

Si prefieres usar GTM:
1. Crea una cuenta en [Tag Manager](https://tagmanager.google.com)
2. Crea un contenedor web
3. Agrega una etiqueta de "Google Analytics: Configuración de GA4"
4. Configura el ID de medición
5. Publica el contenedor

## Paso 6: Configurar Eventos Personalizados

Los siguientes eventos ya están configurados automáticamente:

### Eventos de Engagement
- ✅ `cta_click` - Clicks en botones de llamada a la acción
- ✅ `scroll` - Profundidad de scroll (25%, 50%, 75%, 90%)
- ✅ `timing_complete` - Tiempo en página

### Eventos de Conversión
- ✅ `form_submission` - Envío de formularios
  - Newsletter signup
  - Contact form
  - Booking request
- ✅ `booking_step` - Pasos del funnel de reservas
- ✅ `purchase` - Conversión de reserva (futuro)

### Eventos de Outbound
- ✅ `click` - Clicks en links externos
  - WhatsApp
  - Instagram
  - Facebook
  - TripAdvisor

## Paso 7: Configurar Conversiones

En Google Analytics 4:

1. Ve a **Configuración > Eventos**
2. Marca los siguientes eventos como "Conversiones":
   - ✅ `form_submission`
   - ✅ `purchase`
   - ✅ `booking_step` (paso final)

## Paso 8: Crear Informes Personalizados

### Informe 1: Funnel de Reservas

1. Ve a **Explorar > Embudo libre**
2. Configura los pasos:
   - Paso 1: `page_view` (página: `/reservas.html`)
   - Paso 2: `booking_step` (step: 1)
   - Paso 3: `booking_step` (step: 2)
   - Paso 4: `form_submission` (form_type: booking)
3. Guarda como: "Funnel de Reservas"

### Informe 2: CTAs más Efectivos

1. Ve a **Explorar > Exploración libre**
2. Dimensiones:
   - `event_label` (nombre del CTA)
   - `cta_location` (ubicación)
3. Métricas:
   - `event_count` (número de clicks)
4. Guarda como: "Performance de CTAs"

### Informe 3: Engagement de Contenido

1. Ve a **Explorar > Exploración libre**
2. Dimensiones:
   - `page_path`
   - `scroll_depth`
3. Métricas:
   - `average_engagement_time`
   - `event_count`
4. Guarda como: "Engagement por Página"

## Paso 9: Configurar Audiencias

### Audiencia 1: Visitantes Interesados en Reservas

**Condiciones:**
- Ha visitado `/reservas.html` o `/habitaciones.html`
- No ha completado reserva
- Últimos 7 días

**Uso:** Remarketing

### Audiencia 2: Usuarios de Alta Intención

**Condiciones:**
- Scroll > 75%
- Tiempo en sitio > 2 minutos
- Ha interactuado con CTA

**Uso:** Análisis de comportamiento

### Audiencia 3: Visitantes Locales (Chile)

**Condiciones:**
- País = Chile
- Cualquier visita

**Uso:** Segmentación geográfica

## Paso 10: Integrar con Google Search Console

1. Ve a **Configuración > Vínculos de producto**
2. Selecciona **Search Console**
3. Vincula tu propiedad de Search Console
4. Beneficios:
   - Ver consultas de búsqueda orgánica
   - Analizar rendimiento SEO
   - Identificar páginas mejor posicionadas

## Paso 11: Configurar Alertas

### Alerta 1: Caída de Tráfico

**Condiciones:**
- Usuarios bajan >20% respecto a semana anterior
- Periodo: Diario

**Acción:** Enviar email

### Alerta 2: Aumento de Conversiones

**Condiciones:**
- Form submissions suben >50%
- Periodo: Semanal

**Acción:** Enviar email (celebrar 🎉)

## Paso 12: Dashboard Personalizado

Crea un dashboard con:

### Métricas Clave
- 📊 Usuarios (últimos 30 días)
- 📈 Sesiones
- ⏱️ Tiempo promedio en sitio
- 🎯 Tasa de conversión

### Gráficos
1. **Usuarios en tiempo real**
2. **Fuentes de tráfico** (orgánico, directo, social, referral)
3. **Páginas más visitadas**
4. **Embudo de conversión de reservas**

### Widgets
- Top 5 páginas de entrada
- Dispositivos (móvil vs desktop)
- Ubicaciones geográficas (mapa)
- CTAs más clickeados

## Verificación de Funcionamiento

### Test en Desarrollo (localhost)

1. Abre el sitio en `http://localhost`
2. Abre DevTools (F12)
3. Ve a la pestaña Console
4. Deberías ver:
   ```
   🔍 Analytics Debug Mode
   📊 GA4 Measurement ID: G-XXXXXXXXXX
   ⚠️ Remember to replace with actual GA4 ID in production
   ```

### Test en Producción

1. Ve a Google Analytics
2. **En tiempo real > Vista general**
3. Navega por tu sitio
4. Deberías ver tu visita aparecer en el mapa
5. Haz click en un CTA
6. Verifica que aparezca el evento en "Eventos en tiempo real"

### Test de Eventos

Prueba cada tipo de evento:

```javascript
// En la consola del navegador
CasonaBelgaAnalytics.trackCTAClick('Test CTA', 'Console Test');
CasonaBelgaAnalytics.trackFormSubmission('Test Form', 'test');
```

Verifica en Analytics > En tiempo real > Eventos

## Métricas a Monitorear

### Diarias
- Usuarios activos
- Conversiones de formularios
- Tasa de rebote

### Semanales
- Fuentes de tráfico
- Páginas más visitadas
- Engagement promedio

### Mensuales
- Crecimiento de usuarios
- ROI de marketing
- Tendencias estacionales

## Objetivos Recomendados (KPIs)

| Métrica | Objetivo Mes 1 | Objetivo Mes 3 | Objetivo Mes 6 |
|---------|---------------|---------------|---------------|
| Usuarios | 500 | 1,000 | 2,000 |
| Tasa conversión | 2% | 3.5% | 5% |
| Tiempo promedio | 2:00 | 2:30 | 3:00 |
| Tasa rebote | <60% | <50% | <40% |

## Privacidad y GDPR

**Ya configurado:**
- ✅ Anonimización de IP (`anonymize_ip: true`)
- ✅ Cookies con SameSite=None;Secure

**Pendiente (recomendado):**
- [ ] Cookie consent banner
- [ ] Política de privacidad actualizada
- [ ] Opción de opt-out

## Recursos Adicionales

- [Documentación GA4](https://support.google.com/analytics/answer/10089681)
- [Google Analytics Academy](https://analytics.google.com/analytics/academy/)
- [GA4 Event Tracking Guide](https://developers.google.com/analytics/devguides/collection/ga4/events)

## Soporte

Si tienes problemas:

1. Verifica que el Measurement ID sea correcto
2. Revisa la consola del navegador por errores
3. Usa GA Debugger extension para Chrome
4. Consulta el debug mode en localhost

---

**Fecha:** 2026-02-07
**Configurado por:** Senior Frontend Engineer
**Estado:** ✅ Listo para implementar (solo falta Measurement ID real)
