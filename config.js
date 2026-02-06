/**
 * Configuración del chatbot
 * Cambia la URL cuando hagas deploy del backend
 */

// Para desarrollo local (cuando corres npm start en tu computadora)
// window.CHATBOT_API_URL = 'http://localhost:3000/api/chat';

// Para producción (cuando subes a Railway, Render, etc.)
// Reemplaza esta URL con la URL de tu backend en producción
window.CHATBOT_API_URL = 'http://localhost:3000/api/chat';

// Ejemplo después del deploy:
// window.CHATBOT_API_URL = 'https://casona-chatbot.up.railway.app/api/chat';
