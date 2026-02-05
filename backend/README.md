# 🤖 Casona Belga - AI Chatbot Backend

Backend con Inteligencia Artificial para el chatbot de Casona Belga usando Google Gemini API (gratis).

## 🌟 Características

- ✅ **IA Real**: Respuestas generadas por Google Gemini, no predeterminadas
- ✅ **100% Gratis**: Usa Google Gemini API tier gratuito (1500 requests/día)
- ✅ **Bilingüe**: Responde automáticamente en español o inglés
- ✅ **Contextual**: Mantiene el contexto de la conversación
- ✅ **Base de conocimiento**: Toda la información del restaurante y hotel
- ✅ **Express + Node.js**: Backend simple y eficiente

## 📋 Requisitos

- Node.js 14+ instalado
- Una API key gratuita de Google Gemini

## 🚀 Instalación

### Paso 1: Instalar dependencias

```bash
cd backend
npm install
```

### Paso 2: Obtener API Key de Google Gemini (GRATIS)

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Inicia sesión con tu cuenta de Google
3. Click en **"Create API Key"**
4. Copia la API key generada

**NOTA:** No requiere tarjeta de crédito. El tier gratuito incluye:
- 60 requests por minuto
- 1,500 requests por día
- Completamente gratis para siempre

### Paso 3: Configurar variables de entorno

```bash
# Copia el archivo de ejemplo
cp .env.example .env

# Edita .env y agrega tu API key
nano .env
```

Contenido del `.env`:
```env
GEMINI_API_KEY=tu_api_key_aqui
PORT=3000
NODE_ENV=development
```

### Paso 4: Iniciar el servidor

```bash
# Modo desarrollo (reinicia automáticamente)
npm run dev

# Modo producción
npm start
```

El servidor estará corriendo en `http://localhost:3000`

## 🔧 Endpoints de la API

### Health Check
```http
GET /health
```

Respuesta:
```json
{
  "status": "ok",
  "message": "Casona Belga AI Chatbot is running"
}
```

### Chat
```http
POST /api/chat
Content-Type: application/json

{
  "message": "¿Qué platos veganos tienen?",
  "conversationId": "unique-id-123",
  "language": "es"
}
```

Respuesta:
```json
{
  "response": "¡Hola! 👋 Tenemos varias opciones veganas deliciosas...",
  "conversationId": "unique-id-123"
}
```

### Reset Conversation
```http
POST /api/chat/reset
Content-Type: application/json

{
  "conversationId": "unique-id-123"
}
```

## 📁 Estructura del Proyecto

```
backend/
├── server.js           # Servidor Express principal
├── knowledge-base.js   # Base de conocimiento de Casona Belga
├── package.json        # Dependencias
├── .env               # Variables de entorno (no commitear)
├── .env.example       # Template de variables
├── .gitignore         # Archivos a ignorar en git
└── README.md          # Esta documentación
```

## 🔐 Seguridad

- ✅ CORS habilitado para tu dominio
- ✅ API key solo en el backend (nunca expuesta al cliente)
- ✅ Rate limiting por defecto de Google
- ✅ Historial de conversaciones con límite de memoria
- ✅ Limpieza automática de conversaciones antiguas

## 🌐 Deployment

### Opción 1: Servidor propio / VPS

```bash
# Instalar PM2 para mantener el servidor corriendo
npm install -g pm2

# Iniciar con PM2
pm2 start server.js --name casona-chatbot

# Configurar para que inicie automáticamente
pm2 startup
pm2 save
```

### Opción 2: Heroku (Gratis)

```bash
# Instalar Heroku CLI
# Luego:
heroku create casona-chatbot
heroku config:set GEMINI_API_KEY=tu_api_key
git push heroku main
```

### Opción 3: Railway / Render (Gratis)

1. Conecta tu repositorio de GitHub
2. Configura la variable de entorno `GEMINI_API_KEY`
3. Deploy automático

### Opción 4: Vercel / Netlify Functions

El código puede adaptarse fácilmente a serverless functions.

## 🧪 Testing

Puedes probar el backend con `curl`:

```bash
# Health check
curl http://localhost:3000/health

# Enviar mensaje
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hola, quisiera información sobre las habitaciones",
    "conversationId": "test-123"
  }'
```

## 📊 Monitoreo

El servidor incluye logging básico en consola. Para producción, considera:

- Winston o Bunyan para logging estructurado
- Sentry para error tracking
- Google Analytics para métricas de uso

## ⚙️ Personalización

### Modificar el System Prompt

Edita `server.js` línea ~22 para cambiar la personalidad del chatbot:

```javascript
const SYSTEM_PROMPT = `Eres un asistente virtual para Casona Belga...`;
```

### Actualizar la Base de Conocimiento

Edita `knowledge-base.js` para agregar o modificar información.

### Cambiar Parámetros de IA

En `server.js` línea ~70:

```javascript
generationConfig: {
  temperature: 0.7,  // Mayor = más creativo, Menor = más preciso
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 1024,  // Longitud máxima de respuesta
}
```

## 🐛 Troubleshooting

### Error: "API_KEY configuration error"
- Verifica que `.env` existe y contiene `GEMINI_API_KEY`
- La API key debe empezar con `AI...`

### Error: "Rate limit exceeded"
- Has excedido 60 requests/minuto o 1500/día
- Espera unos minutos o considera usar múltiples API keys con load balancing

### Puerto ya en uso
- Cambia el puerto en `.env`: `PORT=3001`

### El chatbot responde cosas incorrectas
- Actualiza `knowledge-base.js` con información correcta
- Ajusta el `SYSTEM_PROMPT` para ser más específico

## 📝 Notas Importantes

1. **Nunca commitees** el archivo `.env` con tu API key
2. El tier gratuito de Gemini es muy generoso pero tiene límites
3. Las conversaciones se guardan en memoria (se pierden al reiniciar)
4. Para producción, considera usar Redis o base de datos para persistencia

## 🆘 Soporte

- Issues: Crea un issue en GitHub
- Email: casonabelga@gmail.com
- WhatsApp: +56 9 9824 4016

---

**Hecho con ❤️ para Casona Belga**
