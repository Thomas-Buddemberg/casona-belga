/* ═══════════════════════════════════════════════════════════════
   CASONA BELGA - CHATBOT
   Chat interactivo con información del restaurante y actividades
   ═══════════════════════════════════════════════════════════════ */

class CasonaChatbot {
  constructor() {
    this.isOpen = false;
    this.currentView = 'menu'; // menu, conversation
    this.init();
  }

  init() {
    this.injectHTML();
    this.attachEventListeners();
  }

  injectHTML() {
    const chatHTML = `
      <!-- Botón flotante del chat -->
      <div id="casona-chat-button" class="chat-button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span class="chat-badge">¡Hola!</span>
      </div>

      <!-- Ventana del chat -->
      <div id="casona-chat-window" class="chat-window">
        <div class="chat-header">
          <div class="chat-header-content">
            <div class="chat-avatar">🏔️</div>
            <div>
              <div class="chat-title">Casona Belga</div>
              <div class="chat-status">Asistente Virtual</div>
            </div>
          </div>
          <button id="casona-chat-close" class="chat-close">×</button>
        </div>

        <div class="chat-body" id="casona-chat-body">
          <div class="chat-message bot-message">
            <div class="message-bubble">
              ¡Hola! 👋 Soy tu asistente virtual de Casona Belga.<br><br>
              ¿En qué puedo ayudarte hoy?
            </div>
          </div>

          <div class="chat-options">
            <button class="chat-option" data-topic="menu">
              🍽️ Menú y Platos
            </button>
            <button class="chat-option" data-topic="habitaciones">
              🛏️ Habitaciones
            </button>
            <button class="chat-option" data-topic="actividades">
              🏔️ Actividades en Chile Chico
            </button>
            <button class="chat-option" data-topic="contacto">
              📞 Horarios y Contacto
            </button>
            <button class="chat-option whatsapp-option" data-topic="whatsapp">
              💬 Hablar por WhatsApp
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatHTML);
  }

  attachEventListeners() {
    const button = document.getElementById('casona-chat-button');
    const closeBtn = document.getElementById('casona-chat-close');
    const chatWindow = document.getElementById('casona-chat-window');
    const options = document.querySelectorAll('.chat-option');

    button.addEventListener('click', () => this.toggleChat());
    closeBtn.addEventListener('click', () => this.closeChat());

    options.forEach(option => {
      option.addEventListener('click', (e) => {
        const topic = e.currentTarget.dataset.topic;
        this.handleTopic(topic);
      });
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    const chatWindow = document.getElementById('casona-chat-window');
    const chatButton = document.getElementById('casona-chat-button');
    const badge = chatButton.querySelector('.chat-badge');

    if (this.isOpen) {
      chatWindow.classList.add('chat-open');
      chatButton.classList.add('chat-button-active');
      if (badge) badge.style.display = 'none';
    } else {
      chatWindow.classList.remove('chat-open');
      chatButton.classList.remove('chat-button-active');
    }
  }

  closeChat() {
    this.isOpen = false;
    const chatWindow = document.getElementById('casona-chat-window');
    const chatButton = document.getElementById('casona-chat-button');
    chatWindow.classList.remove('chat-open');
    chatButton.classList.remove('chat-button-active');
  }

  handleTopic(topic) {
    const responses = {
      menu: {
        title: "🍽️ Menú y Platos",
        content: `Nuestra carta incluye:

<strong>Entradas destacadas:</strong>
• Ceviche de Salmón - $15.500
• Tártaro de Filete - $15.500
• Crema de Zapallo y Zanahoria - $9.000

<strong>Platos principales:</strong>
• Medallón de Filete 220g - $22.500
• Salmón a la plancha 230g - $23.500
• Risotto de camarones - $19.000
• Pastas artesanales desde $14.000

<strong>Postres:</strong>
• Brownie, Tiramisú, Crema catalana - $7.000

<strong>Especialidades:</strong>
• Vino Allá Lejos (el más austral del mundo) - $45.000
• Cervezas artesanales de Chile Chico - $4.500

¿Te gustaría ver la carta completa o hacer una reserva?`,
        actions: [
          { text: "📋 Ver carta completa", url: "carta.html" },
          { text: "🟢 Reservar mesa", url: "https://wa.me/message/TSCZUHZY7LTVJ1" }
        ]
      },
      habitaciones: {
        title: "🛏️ Habitaciones",
        content: `Tenemos 3 habitaciones boutique:

<strong>Habitación Tehuelche</strong>
<strong>Habitación Yaganes</strong>
<strong>Habitación Kawésqar</strong>

Todas incluyen:
• 1 cama matrimonial + opción de cama individual
• Capacidad: 2-3 personas
• Baño privado con ducha
• Wi-Fi gratuito
• Calefacción eléctrica
• Escritorio de trabajo
• Desayuno incluido (7:30-10:00)

<strong>Desde $95.000 por noche</strong>

Priorizamos tu descanso: colchones premium, sábanas de 1000 hilos, lámparas de sal.`,
        actions: [
          { text: "🛏️ Ver habitaciones", url: "habitaciones.html" },
          { text: "💬 Consultar disponibilidad", url: "https://wa.me/message/TSCZUHZY7LTVJ1" }
        ]
      },
      actividades: {
        title: "🏔️ Actividades en Chile Chico",
        content: `<strong>Experiencias imperdibles cerca de Casona Belga:</strong>

🚣 <strong>Lago General Carrera</strong>
El segundo lago más grande de Sudamérica. Aguas turquesas cristalinas. Excursiones en kayak y bote.

🍒 <strong>Cerezas Orgánicas</strong>
Chile Chico es famoso por sus cerezas. Temporada: diciembre-enero. Visita huertos locales.

🥾 <strong>Parque Nacional Patagonia</strong>
Trekking de clase mundial. Senderos como Valle Chacabuco, Lagunas Altas. Fauna nativa: guanacos, cóndores.

🗿 <strong>Cuevas de Mármol</strong>
Formaciones de mármol en el lago. Una de las 7 maravillas naturales de Chile. Tour en bote desde Puerto Tranquilo (1h de Chile Chico).

🌄 <strong>Mirador del Valle</strong>
Vistas panorámicas del pueblo, lago y cordillera.

Te ayudamos a organizar excursiones. ¡Pregúntanos!`,
        actions: [
          { text: "💬 Pedir recomendaciones", url: "https://wa.me/message/TSCZUHZY7LTVJ1" },
          { text: "🏠 Volver al inicio", url: "index.html" }
        ]
      },
      contacto: {
        title: "📞 Horarios y Contacto",
        content: `<strong>🍽️ Restaurante</strong>
Lun-Dom: 12:30 - 22:30

<strong>🛏️ Hotel</strong>
Check-in: 15:00
Check-out: 11:00
Desayuno: 7:30 - 10:00

<strong>📍 Ubicación</strong>
Bernardo O'Higgins 895
Chile Chico, Aysén, Chile

<strong>📱 Contacto</strong>
WhatsApp: +56 9 9824 4016
Reservas directas por WhatsApp

<strong>🌐 Redes</strong>
Visita nuestro perfil en Google y TripAdvisor`,
        actions: [
          { text: "🗺️ Ver en Maps", url: "https://www.google.com/maps/place/Casona+Belga+Restaurante/data=!4m2!3m1!1s0x0:0x537620c01beb3f06" },
          { text: "📞 Contacto completo", url: "contacto.html" }
        ]
      },
      whatsapp: {
        title: "💬 WhatsApp",
        content: `Te voy a redirigir a WhatsApp donde podrás hablar directamente con nuestro equipo.

Responderemos:
• Reservas de mesa
• Disponibilidad de habitaciones
• Recomendaciones personalizadas
• Consultas sobre menú
• Ayuda con actividades

¡Estamos para ayudarte! 🟢`,
        actions: [
          { text: "💬 Abrir WhatsApp", url: "https://wa.me/message/TSCZUHZY7LTVJ1", primary: true }
        ]
      }
    };

    if (topic === 'whatsapp') {
      // Abrir WhatsApp directamente
      window.open('https://wa.me/message/TSCZUHZY7LTVJ1', '_blank');
      return;
    }

    const response = responses[topic];
    if (!response) return;

    this.addBotMessage(response.title, response.content, response.actions);
  }

  addBotMessage(title, content, actions = []) {
    const chatBody = document.getElementById('casona-chat-body');

    const messageHTML = `
      <div class="chat-message bot-message">
        <div class="message-bubble">
          <div class="message-title">${title}</div>
          <div class="message-content">${content}</div>
          ${actions.length > 0 ? `
            <div class="message-actions">
              ${actions.map(action => `
                <a href="${action.url}"
                   class="message-action-btn ${action.primary ? 'primary' : ''}"
                   ${action.url.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>
                  ${action.text}
                </a>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `;

    // Remover opciones anteriores y agregar nuevo mensaje
    const existingMessages = chatBody.querySelectorAll('.chat-message.bot-message');
    if (existingMessages.length > 1) {
      existingMessages[existingMessages.length - 1].remove();
    }

    chatBody.insertAdjacentHTML('beforeend', messageHTML);
    chatBody.scrollTop = chatBody.scrollHeight;

    // Agregar botón de volver al menú
    setTimeout(() => {
      this.addBackButton();
    }, 100);
  }

  addBackButton() {
    const chatBody = document.getElementById('casona-chat-body');
    const existingBack = chatBody.querySelector('.back-to-menu');
    if (existingBack) existingBack.remove();

    const backHTML = `
      <div class="back-to-menu">
        <button class="chat-option" id="back-to-menu-btn">
          ⬅️ Volver al menú principal
        </button>
      </div>
    `;

    chatBody.insertAdjacentHTML('beforeend', backHTML);
    chatBody.scrollTop = chatBody.scrollHeight;

    document.getElementById('back-to-menu-btn').addEventListener('click', () => {
      this.resetChat();
    });
  }

  resetChat() {
    const chatBody = document.getElementById('casona-chat-body');
    chatBody.innerHTML = `
      <div class="chat-message bot-message">
        <div class="message-bubble">
          ¡Hola! 👋 Soy tu asistente virtual de Casona Belga.<br><br>
          ¿En qué puedo ayudarte hoy?
        </div>
      </div>

      <div class="chat-options">
        <button class="chat-option" data-topic="menu">
          🍽️ Menú y Platos
        </button>
        <button class="chat-option" data-topic="habitaciones">
          🛏️ Habitaciones
        </button>
        <button class="chat-option" data-topic="actividades">
          🏔️ Actividades en Chile Chico
        </button>
        <button class="chat-option" data-topic="contacto">
          📞 Horarios y Contacto
        </button>
        <button class="chat-option whatsapp-option" data-topic="whatsapp">
          💬 Hablar por WhatsApp
        </button>
      </div>
    `;

    // Re-attach event listeners
    const options = chatBody.querySelectorAll('.chat-option');
    options.forEach(option => {
      option.addEventListener('click', (e) => {
        const topic = e.currentTarget.dataset.topic;
        this.handleTopic(topic);
      });
    });
  }
}

// Inicializar chatbot cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new CasonaChatbot();
  });
} else {
  new CasonaChatbot();
}