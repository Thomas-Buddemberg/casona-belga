# 🤖 Chatbot de Casona Belga

## ✅ Implementación Completada

Se ha integrado un chatbot completo en tu sitio web con información sobre:
- 🍽️ Menú y platos
- 🛏️ Habitaciones
- 🏔️ Actividades en Chile Chico
- 📞 Horarios y contacto
- 💬 Conexión directa a WhatsApp

---

## 📁 Archivos Creados

### 1. **chatbot.js** (Versión en Español)
Widget de chat interactivo para las páginas en español.

### 2. **chatbot-en.js** (English Version)
English version of the chat widget for English pages.

### 3. **chatbot.css**
Estilos del chatbot (compartido por ambas versiones).

### 4. **WHATSAPP-CHATBOT-GUIDE.md**
Guía completa para configurar WhatsApp Business con respuestas automáticas.

---

## 🌐 Páginas con Chatbot Integrado

✅ **Español:**
- index.html
- carta.html
- habitaciones.html
- contacto.html

✅ **English:**
- en/en_index.html
- en/menu.html
- en/rooms.html
- en/contact.html

---

## 🎨 Características del Chatbot

### Interfaz
- ✨ Diseño premium matching your website
- 📱 Totalmente responsive (mobile-first)
- 🎯 Botón flotante en esquina inferior derecha
- 💬 Ventana de chat elegante con animaciones

### Funcionalidades
- 🔄 Menú interactivo con opciones
- 📋 Información completa sobre menú, habitaciones y actividades
- 🟢 Conexión directa a WhatsApp
- ⬅️ Navegación fácil (volver al menú principal)
- 🌍 Bilingüe (español e inglés)

### User Experience
- ⚡ Carga rápida (JavaScript vanilla, sin frameworks)
- 🎨 Integración perfecta con tu diseño actual
- 📊 Información actualizada automáticamente del sitio
- 🔗 Links directos a secciones específicas

---

## 💬 WhatsApp Business

Sigue la guía en **WHATSAPP-CHATBOT-GUIDE.md** para:

1. ✅ Instalar WhatsApp Business
2. ✅ Configurar perfil del negocio
3. ✅ Crear mensaje de bienvenida
4. ✅ Configurar mensaje de ausencia
5. ✅ Crear 8 respuestas rápidas:
   - `/menu` - Información del menú
   - `/habitaciones` - Info de habitaciones
   - `/actividades` - Actividades en Chile Chico
   - `/horarios` - Horarios y contacto
   - `/reservamesa` - Reservar mesa
   - `/reservahotel` - Reservar habitación
   - `/ubicacion` - Cómo llegar
   - `/gracias` - Agradecimiento
6. ✅ Organizar con etiquetas
7. ✅ Crear catálogo opcional

---

## 🚀 Cómo Funciona

### En el Sitio Web

1. **Usuario ve el botón flotante** (🏔️ con badge "¡Hola!")
2. **Click en el botón** → Se abre la ventana de chat
3. **Elige una opción:**
   - Menú y Platos
   - Habitaciones
   - Actividades
   - Contacto
   - WhatsApp
4. **Recibe información detallada** con botones de acción
5. **Puede volver al menú** o contactar por WhatsApp

### En WhatsApp

1. **Usuario escribe a tu WhatsApp** (+56 9 9824 4016)
2. **Recibe mensaje de bienvenida** automático con opciones 1-5
3. **Escribe un número** (ej: "2")
4. **Tú respondes con respuesta rápida** (ej: `/habitaciones`)
5. **Usuario recibe información completa**
6. **Continúan conversación personalizada**

---

## 🛠️ Personalización

### Modificar Contenido del Chatbot Web

Edita **chatbot.js** (español) o **chatbot-en.js** (inglés):

```javascript
const responses = {
  menu: {
    title: "🍽️ Menú y Platos",
    content: `Tu contenido aquí...`,
    actions: [
      { text: "Texto del botón", url: "url" }
    ]
  },
  // ... más respuestas
};
```

### Cambiar Colores

Edita **chatbot.css**:

```css
.chat-button {
  background: linear-gradient(135deg, rgba(184, 149, 106, 0.95), rgba(205, 169, 120, 0.95));
}
```

### Cambiar Posición del Botón

En **chatbot.css**:

```css
.chat-button {
  bottom: 24px;  /* Distancia desde abajo */
  right: 24px;   /* Distancia desde derecha */
}
```

### Modificar Respuestas de WhatsApp

Sigue **WHATSAPP-CHATBOT-GUIDE.md** y edita las respuestas rápidas directamente en la app WhatsApp Business.

---

## 📊 Métricas y Análisis

### WhatsApp Business (Gratis)
WhatsApp Business muestra:
- ✅ Mensajes enviados/recibidos
- ✅ Mensajes leídos
- ✅ Tiempo promedio de respuesta
- ✅ Estadísticas por etiqueta

### Google Analytics (Opcional)
Para trackear el chatbot web, agrega eventos:

```javascript
// En chatbot.js después de handleTopic()
gtag('event', 'chatbot_option_click', {
  'event_category': 'Chatbot',
  'event_label': topic
});
```

---

## 🔧 Solución de Problemas

### El chatbot no aparece en el sitio
1. ✅ Verifica que los archivos estén en la raíz del proyecto
2. ✅ Limpia caché del navegador (Ctrl+Shift+R o Cmd+Shift+R)
3. ✅ Revisa consola del navegador (F12) para errores

### El chatbot se ve mal en móvil
1. ✅ El diseño es responsive por defecto
2. ✅ Prueba en modo incógnito
3. ✅ Limpia caché

### WhatsApp Business no envía mensajes automáticos
1. ✅ Verifica que el mensaje de bienvenida esté activado
2. ✅ Revisa que los horarios estén configurados
3. ✅ Asegúrate de que las respuestas rápidas estén guardadas

---

## 🎯 Próximos Pasos Recomendados

### Corto Plazo (Gratuito)
1. ✅ Configurar WhatsApp Business siguiendo la guía
2. ✅ Agregar fotos a las respuestas de WhatsApp
3. ✅ Crear catálogo en WhatsApp Business
4. ✅ Capacitar al equipo en uso de respuestas rápidas

### Mediano Plazo (Opcional)
1. 📊 Agregar Google Analytics al chatbot
2. 📸 Agregar galería de fotos al chatbot web
3. 🎨 Personalizar colores según temporada
4. 💡 Agregar más opciones (ej: "Ofertas especiales")

### Largo Plazo (Inversión)
Si quieres automatización completa con IA:

#### **WhatsApp API con IA** ($50-200 USD/mes)
Plataformas recomendadas:
- **Chatbase** - IA entrenada en tu contenido
- **ManyChat** - Automatización sin código
- **Landbot** - Constructor visual

#### **Sistema de Reservas Integrado** ($100-500 USD/mes)
- **Cloudbeds** - PMS + Channel Manager
- **Beds24** - Sincronización con Booking.com
- **Guesty** - Gestión completa

---

## 📞 Soporte

Si necesitas ayuda con:
- Modificar contenido del chatbot
- Agregar nuevas funcionalidades
- Integrar con otros servicios
- Problemas técnicos

Contacta al desarrollador o consulta la documentación en los archivos del proyecto.

---

## ✅ Checklist de Lanzamiento

### Chatbot Web
- [x] Chatbot.js creado
- [x] Chatbot-en.js creado
- [x] Chatbot.css creado
- [x] Integrado en todas las páginas HTML
- [x] Probado en desktop
- [ ] Probado en móvil
- [ ] Probado en diferentes navegadores

### WhatsApp Business
- [ ] WhatsApp Business instalado
- [ ] Perfil completo
- [ ] Mensaje de bienvenida configurado
- [ ] Mensaje de ausencia configurado
- [ ] 8 respuestas rápidas creadas
- [ ] Etiquetas creadas
- [ ] Foto de perfil actualizada
- [ ] Catálogo creado (opcional)
- [ ] Equipo capacitado

### Promoción
- [ ] Anunciar chatbot en redes sociales
- [ ] Agregar link de WhatsApp a Google My Business
- [ ] Agregar QR code de WhatsApp en el restaurante
- [ ] Mencionar en firma de emails

---

**🎉 ¡Tu chatbot está listo para usar!**

El chatbot web ya está funcionando en todas las páginas.
Ahora solo falta configurar WhatsApp Business siguiendo la guía.

---

**Última actualización:** 2026-02-05