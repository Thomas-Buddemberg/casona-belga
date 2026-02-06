# 🛏️ Guía de Configuración Beds24 - Paso a Paso

## ✅ Configuración Completa en 6 Fases

Total estimado: 1.5-2 horas

---

## 📝 FASE 1: Crear Cuenta en Beds24 (10 minutos)

### Paso 1.1: Registrarse

1. Ve a **[beds24.com](https://beds24.com)**
2. Click en **"Sign Up"** o **"Free Trial"**
3. Completa el formulario:
   - **Email**: casonabelga@gmail.com (o el que prefieras)
   - **Password**: (Crea una segura)
   - **Property Name**: Casona Belga
   - **Country**: Chile
   - **Language**: Español (si está disponible) o English

4. Click **"Create Account"**
5. Verifica tu email (revisa bandeja de entrada y spam)
6. Click en el link de verificación

### Paso 1.2: Login Inicial

1. Ve a [beds24.com/control3.php](https://beds24.com/control3.php)
2. Ingresa tu email y password
3. Entrarás al **Dashboard** de Beds24

---

## 🏨 FASE 2: Configurar tu Propiedad (20 minutos)

### Paso 2.1: Información Básica de la Propiedad

1. En el Dashboard, ve a **"Settings"** → **"Property"**
2. Completa:
   - **Property Name**: Casona Belga Hotel y Restaurante
   - **Property Type**: Hotel / Bed & Breakfast
   - **Address**: Camino Internacional s/n, Chile Chico, Región de Aysén, Chile
   - **Phone**: +56 9 9824 4016
   - **Email**: casonabelga@gmail.com
   - **Website**: https://casonabelga.cl
   - **Currency**: CLP (Peso Chileno)
   - **Time Zone**: America/Santiago

3. **Save** / **Guardar**

### Paso 2.2: Check-in/Check-out y Políticas

1. Ve a **"Settings"** → **"Booking Rules"**
2. Configura:
   - **Check-in Time**: 15:00 (3:00 PM)
   - **Check-out Time**: 11:00 (11:00 AM)
   - **Minimum Stay**: 1 noche (puedes ajustar por temporada después)
   - **Maximum Stay**: 30 noches (o el que prefieras)

3. Ve a **"Settings"** → **"Policies"**
4. Agrega:
   ```
   CANCELACIÓN:
   - Cancelación sin costo con 7 días de anticipación
   - Cancelaciones con menos de 7 días: 50% de devolución
   - Ferry cerrado por clima: cambio sin costo (sujeto a disponibilidad)

   CHECK-IN/OUT:
   - Check-in: 15:00
   - Check-out: 11:00
   - Late Checkout (14:00) si almuerza en el restaurante

   NIÑOS Y MASCOTAS:
   - Niños +10 años bienvenidos
   - Mascotas permitidas (solo exterior)
   ```

5. **Save**

---

## 🛏️ FASE 3: Agregar tus 3 Habitaciones (20 minutos)

### Paso 3.1: Habitación Tehuelche

1. Ve a **"Settings"** → **"Rooms"**
2. Click **"Add Room"** o **"Add New Room"**
3. Completa:
   - **Room Name**: Habitación Tehuelche
   - **Room Type**: Habitación Doble / Double Room
   - **Quantity**: 1 (tienes 1 habitación de este tipo)
   - **Max Guests**: 3 (2 adultos + 1 niño/cama extra)
   - **Base Occupancy**: 2
   - **Bed Type**: 1 Cama Matrimonial (King/Queen)
   - **Room Size**: (ej: 20 m² - pon el tamaño real)

4. **Amenities** (Comodidades):
   - ✅ Wi-Fi
   - ✅ Private Bathroom
   - ✅ Shower
   - ✅ Heating (Calefacción eléctrica)
   - ✅ Desk
   - ✅ Parking
   - ✅ Breakfast included

5. **Description**:
   ```
   Habitación con capacidad para 2-3 personas. Cuenta con una cama matrimonial
   y opción de agregar una cama individual. Incluye baño privado con ducha,
   calefacción eléctrica, escritorio de trabajo, Wi-Fi y estacionamiento.
   Desayuno incluido (Lun-Dom 7:30-10:00).
   ```

6. **Save Room**

### Paso 3.2: Habitación Yaganes

Repite el mismo proceso:
- **Room Name**: Habitación Yaganes
- **Amenities**: Iguales a Tehuelche
- **Description**: Similar (cambia el nombre)

### Paso 3.3: Habitación Chonos

Repite el proceso:
- **Room Name**: Habitación Chonos
- **Amenities**: Iguales pero con **Calefacción a leña** en vez de eléctrica
- **Description**: Similar (menciona calefacción a leña)

---

## 💰 FASE 4: Configurar Precios (15 minutos)

### Paso 4.1: Precio Base

1. Ve a **"Prices"** → **"Set Prices"**
2. Para cada habitación:
   - **Default Price**: $95,000 CLP por noche
   - **Currency**: CLP
   - **Per**: Room/Night (por habitación por noche)

### Paso 4.2: Precios Especiales (Opcional)

Si tienes temporada alta/baja:

1. Ve a **"Prices"** → **"Special Prices"**
2. Puedes crear:
   - **Temporada Alta** (Diciembre-Febrero): Precio mayor
   - **Temporada Baja** (Mayo-Agosto): Precio menor
   - **Long Stay Discount**: Descuento por estadías largas

Por ahora, deja solo el precio base de $95,000.

---

## 🔗 FASE 5: Conectar con Booking.com (20 minutos)

### Paso 5.1: Preparar Conexión

1. En Beds24, ve a **"Channels"** → **"Channel Manager"**
2. Busca **"Booking.com"**
3. Click **"Connect"** o **"Add Channel"**

### Paso 5.2: Configurar en Booking.com

**Importante**: Necesitas tener una cuenta activa en Booking.com como partner.

1. Ve a **[admin.booking.com](https://admin.booking.com)** (Partner Hub)
2. Login con tu cuenta de Booking
3. Ve a **"Connectivity"** o **"Conectividad"**
4. Busca **"Channel Manager"** o **"Gestor de canales"**
5. Selecciona **"Beds24"** de la lista
6. Click **"Activate"** o **"Activar"**
7. Booking te dará un **código de conexión** o **API credentials**

### Paso 5.3: Vincular en Beds24

1. Vuelve a Beds24
2. En la configuración de Booking.com, ingresa:
   - **Hotel ID** (de Booking)
   - **API Credentials** (que Booking te dio)
3. Click **"Connect"** o **"Sync"**
4. Beds24 te mostrará las habitaciones de Booking
5. **Mapea** cada habitación:
   - Habitación Tehuelche → [Nombre en Booking]
   - Habitación Yaganes → [Nombre en Booking]
   - Habitación Chonos → [Nombre en Booking]

### Paso 5.4: Verificar Sincronización

1. Haz una reserva de prueba en Booking
2. Verifica que aparezca en Beds24
3. Marca como "cancelada" la prueba

---

## 🌐 FASE 6: Agregar Widget a tu Sitio Web (15 minutos)

### Paso 6.1: Obtener Código del Widget

1. En Beds24, ve a **"Settings"** → **"Booking Page"** → **"Booking Widget"**
2. Configura:
   - **Type**: Calendar Widget o Booking Widget
   - **Style**: Elige el diseño que te guste
   - **Language**: Spanish (Español)
   - **Show Prices**: Yes (Mostrar precios)
   - **Color Scheme**: Personaliza colores (opcional)

3. Click **"Generate Code"** o **"Get Code"**
4. Copia el código HTML que te muestra

### Paso 6.2: Yo lo Agrego a tu Sitio

Una vez que tengas el código:
1. Me lo pasas
2. Yo lo agrego a `habitaciones.html` y `en/rooms.html`
3. Lo posiciono después de las cards de habitaciones
4. Ajusto el diseño para que se vea bien

---

## 📋 Checklist de Configuración

### Antes de empezar:
- [ ] Tienes cuenta activa en Booking.com como partner
- [ ] Tienes acceso al Partner Hub de Booking
- [ ] Tus 3 habitaciones están listadas en Booking

### Fase 1 - Cuenta Beds24:
- [ ] Cuenta creada en Beds24
- [ ] Email verificado
- [ ] Login exitoso

### Fase 2 - Propiedad:
- [ ] Información básica completada
- [ ] Dirección y contacto agregados
- [ ] Check-in/out configurados
- [ ] Políticas agregadas

### Fase 3 - Habitaciones:
- [ ] Habitación Tehuelche creada
- [ ] Habitación Yaganes creada
- [ ] Habitación Chonos creada
- [ ] Amenidades agregadas
- [ ] Descripciones completadas

### Fase 4 - Precios:
- [ ] Precio base: $95,000 CLP configurado
- [ ] Moneda: CLP seleccionada

### Fase 5 - Booking.com:
- [ ] Conexión con Booking iniciada
- [ ] API credentials de Booking obtenidas
- [ ] Habitaciones mapeadas
- [ ] Sincronización verificada

### Fase 6 - Widget:
- [ ] Widget generado en Beds24
- [ ] Código HTML copiado
- [ ] Enviado para integración en el sitio
- [ ] Widget funcionando en casonabelga.cl

---

## 🆘 Ayuda y Soporte

### Si tienes problemas:

**Beds24 Support**:
- Email: support@beds24.com
- Documentación: https://wiki.beds24.com
- Video tutoriales: YouTube → "Beds24 Tutorials"

**Yo puedo ayudarte con**:
- Integrar el widget en tu sitio
- Ajustar diseño y colores
- Solucionar problemas técnicos
- Optimizar configuración

---

## 📞 Próximos Pasos

1. **Crea tu cuenta** en Beds24
2. **Configura** las fases 1-4 (habitaciones y precios)
3. **Avísame** cuando llegues a la Fase 5 (Booking.com)
4. Te ayudo con la conexión y el widget

---

## 💡 Tips Importantes

1. **Usa el mismo nombre** de habitación en Beds24 y Booking (facilita mapeo)
2. **Revisa sincronización** diariamente al principio
3. **Bloquea fechas** en Beds24 si necesitas cerrar temporalmente
4. **Precios**: Puedes actualizarlos en cualquier momento
5. **Fotos**: Agrégalas en Beds24 para el widget

---

¿Listo para empezar? ¡Avísame cuando crees la cuenta y te voy guiando! 🚀
