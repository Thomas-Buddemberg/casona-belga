# 🇨🇱 Configuración DNS en NIC Chile para Netlify

## 📋 Información del Dominio

- **Dominio**: `casonabelga.cl`
- **Registrador**: NIC Chile
- **Destino**: Netlify (hosting gratuito)

---

## 🎯 Dos Opciones de Configuración

### ✅ OPCIÓN 1 - Nameservers de Netlify (Más fácil, recomendada)

Netlify gestiona todo automáticamente (SSL, redirects, etc.)

### ✅ OPCIÓN 2 - DNS Manual en NIC Chile

Mantienes el control del DNS en NIC Chile

---

## 🚀 OPCIÓN 1 - Nameservers de Netlify (RECOMENDADA)

### Paso 1: Obtener Nameservers de Netlify

1. Ve a [netlify.com](https://netlify.com) y haz login
2. Selecciona tu sitio
3. Ve a **"Domain management"**
4. Click en **"Set up Netlify DNS"**
5. Netlify te dará 4 nameservers como estos:
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```
   (Copia estos exactamente como aparecen)

### Paso 2: Actualizar Nameservers en NIC Chile

1. Ve a **[nic.cl](https://www.nic.cl)**
2. Click en **"Iniciar Sesión"** (arriba a la derecha)
3. Ingresa con tu RUT y contraseña
4. Ve a **"Mis Dominios"** o **"Gestión de Dominios"**
5. Busca y selecciona: **`casonabelga.cl`**
6. Busca la opción **"Servidores de Nombre"** o **"Name Servers"**
7. Click en **"Modificar"** o **"Editar"**

### Paso 3: Ingresar los Nameservers

Reemplaza los nameservers actuales con los 4 de Netlify:

**Servidor de Nombre 1**: `dns1.p01.nsone.net`
**Servidor de Nombre 2**: `dns2.p01.nsone.net`
**Servidor de Nombre 3**: `dns3.p01.nsone.net`
**Servidor de Nombre 4**: `dns4.p01.nsone.net`

> ⚠️ **Importante**: Usa exactamente los nameservers que Netlify te dio, no estos de ejemplo

### Paso 4: Confirmar cambios

1. Click en **"Guardar"** o **"Actualizar"**
2. NIC Chile puede pedirte confirmación por email
3. Confirma si es necesario

### Paso 5: Volver a Netlify

1. Vuelve a Netlify
2. Click en **"Done"** o **"Verify"**
3. Netlify verificará los nameservers (puede tomar unos minutos)

### ⏱️ Tiempo de Propagación

- **Mínimo**: 2-4 horas
- **Promedio**: 12-24 horas
- **Máximo**: 48 horas

---

## 🛠️ OPCIÓN 2 - DNS Manual en NIC Chile

Si prefieres mantener el DNS en NIC Chile:

### Paso 1: Acceder al Panel DNS

1. Ve a **[nic.cl](https://www.nic.cl)**
2. Inicia sesión con tu RUT y contraseña
3. Ve a **"Mis Dominios"**
4. Selecciona **`casonabelga.cl`**
5. Busca **"Zona DNS"** o **"Gestión DNS"**

### Paso 2: Agregar Registro A (para casonabelga.cl)

Si NIC Chile permite registros A directamente:

**Tipo**: A
**Host/Nombre**: `@` (o dejar vacío, representa casonabelga.cl)
**Valor/IP**: `75.2.60.5`
**TTL**: `3600` (1 hora)

### Paso 3: Agregar Registro CNAME (para www)

**Tipo**: CNAME
**Host/Nombre**: `www`
**Valor/Destino**: `[tu-sitio].netlify.app` (sin https://)
**TTL**: `3600`

**Ejemplo**: Si tu URL de Netlify es `casona-belga.netlify.app`, usa ese valor.

### Paso 4: Guardar cambios

1. Click en **"Guardar"** o **"Aplicar cambios"**
2. Confirma si NIC Chile pide verificación

---

## 🔍 ¿Qué opción elegir?

| Aspecto | Opción 1 - Nameservers Netlify | Opción 2 - DNS Manual |
|---------|-------------------------------|---------------------|
| **Facilidad** | ⭐⭐⭐⭐⭐ Muy fácil | ⭐⭐⭐ Media |
| **SSL/HTTPS** | Automático | Automático |
| **Redirects** | Automáticos | Necesitas configurar |
| **Cambios** | Desde Netlify | Desde NIC Chile |
| **Recomendado** | ✅ SÍ | Para usuarios avanzados |

**Mi recomendación**: **Opción 1 - Nameservers de Netlify**

---

## 📧 Email con el Dominio

### Si tienes email con casonabelga.cl:

**Antes de cambiar nameservers**, configura el email en Netlify:

1. En Netlify DNS, agrega registros MX que tenías en NIC Chile
2. Exporta tus registros DNS actuales de NIC Chile antes de cambiar

### Si NO tienes email configurado:

No hay problema, puedes cambiar los nameservers directamente.

---

## ✅ Verificar Configuración DNS

Después de configurar, verifica con estas herramientas:

### Verificar Nameservers:
```bash
nslookup -type=ns casonabelga.cl
```

O visita: [whatsmydns.net](https://www.whatsmydns.net)
- Tipo: `NS`
- Dominio: `casonabelga.cl`

### Verificar Registro A:
```bash
nslookup casonabelga.cl
```

O visita: [whatsmydns.net](https://www.whatsmydns.net)
- Tipo: `A`
- Dominio: `casonabelga.cl`

Deberías ver: `75.2.60.5`

---

## 🐛 Problemas Comunes en NIC Chile

### "No puedo editar nameservers"

**Causa**: Algunos dominios tienen restricciones.

**Solución**:
1. Verifica que no tengas una delegación activa
2. Contacta soporte de NIC Chile: soporte@nic.cl

### "Los cambios no se guardan"

**Causa**: Falta confirmación por email.

**Solución**:
1. Revisa tu email (incluyendo spam)
2. Confirma el cambio desde el link del email

### "DNS no propaga después de 48 horas"

**Causa**: Error en la configuración.

**Solución**:
1. Verifica que escribiste correctamente los nameservers
2. Usa `nslookup` para verificar
3. Contacta soporte de NIC Chile

---

## 📞 Soporte NIC Chile

Si tienes problemas:

- **Web**: [nic.cl/soporte](https://www.nic.cl/soporte)
- **Email**: soporte@nic.cl
- **Teléfono**: +56 2 2940 7700

---

## 📝 Checklist Completo

### Antes de empezar:
- [ ] Tengo acceso al panel de NIC Chile (RUT + contraseña)
- [ ] Tengo mi sitio ya deployado en Netlify
- [ ] He verificado que no tengo email configurado (o lo he exportado)

### Opción 1 - Nameservers:
- [ ] Obtuve los 4 nameservers de Netlify
- [ ] Accedí al panel de NIC Chile
- [ ] Encontré la opción "Servidores de Nombre"
- [ ] Reemplacé los nameservers con los de Netlify
- [ ] Guardé los cambios
- [ ] Confirmé por email (si fue necesario)
- [ ] Verifiqué con `nslookup` o whatsmydns.net

### Opción 2 - DNS Manual:
- [ ] Accedí a la Zona DNS en NIC Chile
- [ ] Agregué registro A: @ → 75.2.60.5
- [ ] Agregué registro CNAME: www → [mi-sitio].netlify.app
- [ ] Guardé los cambios
- [ ] Verifiqué con `nslookup` o whatsmydns.net

### Después de la propagación:
- [ ] https://casonabelga.cl funciona
- [ ] https://www.casonabelga.cl redirige a casonabelga.cl
- [ ] SSL/HTTPS está activo (candado verde)
- [ ] Todas las páginas funcionan
- [ ] Chatbot funciona correctamente

---

## ⏱️ Timeline Esperado

| Tiempo | Acción |
|--------|--------|
| Minuto 0 | Cambias DNS en NIC Chile |
| 5-15 min | Netlify detecta los cambios |
| 2-4 horas | DNS empieza a propagar |
| 12-24 horas | Mayoría de usuarios ven el nuevo sitio |
| 48 horas | 100% propagado globalmente |
| 1-2 horas después | SSL/HTTPS se activa automáticamente |

---

## 🎯 Próximo Paso

1. Decide qué opción usar (recomiendo Opción 1)
2. Sigue los pasos de esta guía
3. Espera la propagación DNS
4. ¡Disfruta tu sitio en casonabelga.cl! 🎉

¿Necesitas ayuda con algún paso específico? ¡Pregúntame!
