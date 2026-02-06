/**
 * Configuración del chatbot para PRODUCCIÓN
 * Usar cuando el dominio casonabelga.cl esté activo
 */

// OPCIÓN 1: Backend en Railway (como está ahora)
// Usar si NO configuras subdominio api.casonabelga.cl
window.CHATBOT_API_URL = 'https://casona-belga-production.up.railway.app/api/chat';

// OPCIÓN 2: Backend con subdominio personalizado
// Descomentar si configuras api.casonabelga.cl apuntando a Railway
// window.CHATBOT_API_URL = 'https://api.casonabelga.cl/api/chat';
