/* ═══════════════════════════════════════════════════════════════
   CASONA BELGA - CHATBOT INTERACTIVO
   Chat con entrada de texto y procesamiento de preguntas
   ═══════════════════════════════════════════════════════════════ */

class CasonaChatbot {
  constructor() {
    this.isOpen = false;
    this.conversationHistory = [];
    this.init();
    this.setupKnowledgeBase();
  }

  init() {
    this.injectHTML();
    this.attachEventListeners();
  }

  setupKnowledgeBase() {
    this.knowledge = {
      vegano: {
        keywords: ['vegano', 'vegana', 'veganos', 'vegan', 'vegetariano', 'vegetariana', 'sin carne', 'plant based'],
        response: `🌱 <strong>Opciones Veganas y Vegetarianas</strong>

Tenemos varias opciones para dietas veganas/vegetarianas:

<strong>ENTRADAS:</strong>
• Tártaro de Betarraga con quinoa crocante - $14.500
• Crema de Zapallo con zanahoria y jengibre - $8.000
• Crema de Lentejas - $8.000

<strong>PLATOS PRINCIPALES:</strong>
• Cremoso de mote con hongos y morchellas - $19.000
  (Trigo de mote con zapallo asado y vegetales grillados)
• Sorrentino de hojas verdes en salsa pomodoro con hongos y morchellas - $17.000
• Fetuccinis en salsa pomodoro y pesto de albahaca - $14.000

<strong>ACOMPAÑAMIENTOS:</strong>
• Verduras Salteadas
• Ensalada Casona (lechuga, rúcula, mizuna, tomate, manzana, semillas)

💡 Todos nuestros platos pueden adaptarse. Pregúntanos al hacer tu reserva.`,
        actions: [
          { text: "🟢 Reservar mesa", url: "https://wa.me/message/TSCZUHZY7LTVJ1" },
          { text: "📋 Ver carta completa", url: "carta.html" }
        ]
      },
      menu: {
        keywords: ['menu', 'menú', 'carta', 'platos', 'comida', 'comer', 'almuerzo', 'cena', 'comidas'],
        response: `🍽️ <strong>Nuestra Carta 2026</strong>

<strong>ENTRADAS:</strong>
• Ceviche de Salmón - $15.500
• Tártaro de Filete en tostadas - $15.500
• Tártaro de Betarraga - $14.500
• Cremas (Zapallo/Lentejas) - $8.000

<strong>FONDOS + ACOMPAÑAMIENTO + SALSA:</strong>
• Medallón de Filete 220-230g - $22.500
• Salmón a la plancha 220-230g - $23.500
• Merluza Austral 220-230g - $21.500

<strong>PASTAS ARTESANALES:</strong>
• Ravioles de salmón/cordero - $17.000
• Sorrentino de hojas verdes - $17.000
• Fetuccinis - $14.000
• Cremoso de mote con hongos - $19.000
• Risotto de camarones - $19.000

<strong>POSTRES:</strong>
Brownie, Tiramisú, Crema catalana, Crumble de manzana, Torta de la casa - $7.000`,
        actions: [
          { text: "📋 Ver carta completa", url: "carta.html" },
          { text: "🟢 Reservar mesa", url: "https://wa.me/message/TSCZUHZY7LTVJ1" }
        ]
      },
      precio: {
        keywords: ['precio', 'precios', 'cuanto cuesta', 'costo', 'valor', 'tarifa', 'económico', 'barato', 'caro'],
        response: `💰 <strong>Rangos de Precios</strong>

<strong>RESTAURANTE:</strong>
• Entradas: $8.000 - $15.500
• Platos principales: $14.000 - $23.500
• Postres: $7.000
• Vinos: Copa $6.500 / Botella desde $28.000

<strong>HOTEL:</strong>
• Habitación desde $95.000 por noche
• Incluye desayuno
• Capacidad 2-3 personas

Los precios pueden variar según temporada. Para tarifas actualizadas, consúltanos por WhatsApp.`,
        actions: [
          { text: "💬 Consultar por WhatsApp", url: "https://wa.me/message/TSCZUHZY7LTVJ1" }
        ]
      },
      habitaciones: {
        keywords: ['habitacion', 'habitaciones', 'hotel', 'dormir', 'hospedar', 'alojamiento', 'pieza', 'room', 'cuarto'],
        response: `🛏️ <strong>Habitaciones</strong>

Tenemos 3 habitaciones:
• <strong>Tehuelche</strong>
• <strong>Yaganes</strong>
• <strong>Kawésqar</strong>

<strong>INCLUYE:</strong>
✓ 1 cama matrimonial + opción cama individual
✓ Capacidad 2-3 personas
✓ Baño privado con ducha
✓ Wi-Fi gratuito
✓ Calefacción eléctrica
✓ Escritorio de trabajo
✓ Desayuno incluido (7:30-10:00)

<strong>EXPERIENCIA PREMIUM:</strong>
✨ Colchones premium
✨ Sábanas de 1000 hilos
✨ Lámparas de sal
✨ Ambiente rústico

💰 <strong>Desde $95.000 por noche</strong>`,
        actions: [
          { text: "🛏️ Ver habitaciones", url: "habitaciones.html" },
          { text: "💬 Consultar disponibilidad", url: "https://wa.me/message/TSCZUHZY7LTVJ1" }
        ]
      },
      reserva: {
        keywords: ['reserva', 'reservar', 'reservacion', 'booking', 'disponibilidad', 'libro'],
        response: `📅 <strong>Reservas</strong>

<strong>RESTAURANTE:</strong>
Reserva tu mesa por WhatsApp indicando:
• Fecha y hora
• Número de personas
• Nombre

<strong>HOTEL:</strong>
Consulta disponibilidad por WhatsApp con:
• Fechas de llegada y salida
• Número de personas
• Preferencias

Te confirmamos disponibilidad inmediatamente. ¡Reserva directa = mejor precio!`,
        actions: [
          { text: "🟢 Reservar por WhatsApp", url: "https://wa.me/message/TSCZUHZY7LTVJ1", primary: true }
        ]
      },
      actividades: {
        keywords: ['actividades', 'que hacer', 'turismo', 'paseos', 'excursiones', 'lugares', 'visitar', 'conocer', 'tour'],
        response: `🏔️ <strong>Actividades en Chile Chico</strong>

<strong>🚣 LAGO GENERAL CARRERA</strong>
El 2° lago más grande de Sudamérica. Aguas turquesas cristalinas. Kayak, bote, pesca.

<strong>🍒 CEREZAS ORGÁNICAS</strong>
Chile Chico es la capital de las cerezas. Temporada: Dic-Ene. Visita huertos locales.

<strong>🥾 PARQUE NACIONAL PATAGONIA</strong>
Trekking de clase mundial:
• Valle Chacabuco
• Lagunas Altas
• Fauna: guanacos, cóndores, pumas

<strong>🗿 CUEVAS DE MÁRMOL</strong>
Una de las 7 maravillas naturales de Chile. Tour en bote desde Puerto Tranquilo (1h de Chile Chico).

<strong>🌄 MIRADOR DEL VALLE</strong>
Vistas panorámicas del pueblo, lago y cordillera.

Te ayudamos a organizar excursiones y damos recomendaciones personalizadas.`,
        actions: [
          { text: "💬 Pedir recomendaciones", url: "https://wa.me/message/TSCZUHZY7LTVJ1" }
        ]
      },
      vino: {
        keywords: ['vino', 'vinos', 'wine', 'copa', 'botella', 'malbec', 'carmenere', 'cabernet'],
        response: `🍷 <strong>Carta de Vinos</strong>

<strong>VINO DESTACADO:</strong>
• <strong>Allá Lejos</strong>, de Chile Chico
  El vino más austral del mundo 🌍
  $45.000

<strong>SELECCIÓN:</strong>
• Categoría Premium o Gran Reserva - $38.000
• Categoría Reserva - $28.000
• Copa de vino - $6.500

<strong>SERVICIO:</strong>
• Descorche - $10.000

Pregunta por nuestra selección completa al hacer tu reserva.`,
        actions: [
          { text: "📋 Ver carta completa", url: "carta.html" }
        ]
      },
      cerveza: {
        keywords: ['cerveza', 'cervezas', 'beer', 'chop'],
        response: `🍺 <strong>Cervezas Artesanales</strong>

Todas nuestras cervezas son artesanales de la región:

<strong>DE CHILE CHICO:</strong>
• GLOF - Pale Ale - $4.500
• CERRO COLORADO - Porter / Amber Ale - $4.500

<strong>OTRAS ARTESANALES:</strong>
• D'Olbeck - Maqui / Lager / Ale / Red IPA / Stout - $4.500
• KUNSTMANN - Sin Alcohol Lager - $4.500

Todas $4.500 ¡Apoya la cerveza local patagónica! 🏔️`,
        actions: [
          { text: "🟢 Reservar mesa", url: "https://wa.me/message/TSCZUHZY7LTVJ1" }
        ]
      },
      horarios: {
        keywords: ['horario', 'horarios', 'hora', 'abierto', 'cerrado', 'cuando', 'open', 'hours'],
        response: `⏰ <strong>Horarios</strong>

<strong>🍽️ RESTAURANTE:</strong>
Lunes a Domingo: 12:30 - 22:30

<strong>🛏️ HOTEL:</strong>
• Check-in: 15:00
• Check-out: 11:00
• Desayuno: 7:30 - 10:00

<strong>📱 RESERVAS:</strong>
Respuestas por WhatsApp: 9:00 - 23:00

Estamos abiertos todos los días del año.`,
        actions: [
          { text: "📞 Ver contacto", url: "contacto.html" }
        ]
      },
      ubicacion: {
        keywords: ['ubicacion', 'ubicación', 'donde', 'direccion', 'dirección', 'como llegar', 'mapa', 'location'],
        response: `📍 <strong>Ubicación y Cómo Llegar</strong>

<strong>DIRECCIÓN:</strong>
Bernardo O'Higgins 895
Chile Chico, Aysén, Chile

<strong>✈️ DESDE COYHAIQUE:</strong>
Ruta X-83 (270 km, 5 horas)
Camino pavimentado + ripio en buen estado

<strong>⛴️ DESDE ARGENTINA:</strong>
Cruce Los Antiguos - Chile Chico (5 minutos)

<strong>📍 EN CHILE CHICO:</strong>
Estamos en el centro del pueblo, calle principal B. O'Higgins.`,
        actions: [
          { text: "🗺️ Ver en Google Maps", url: "https://www.google.com/maps/place/Casona+Belga+Restaurante/data=!4m2!3m1!1s0x0:0x537620c01beb3f06" }
        ]
      },
      desayuno: {
        keywords: ['desayuno', 'breakfast', 'mañana'],
        response: `☕ <strong>Desayuno</strong>

El desayuno está incluido con la estadía en el hotel.

<strong>HORARIO:</strong>
7:30 - 10:00 todos los días

<strong>INCLUYE:</strong>
• Pan casero y tostadas
• Mermeladas artesanales
• Quesos y embutidos
• Huevos preparados
• Frutas frescas de temporada
• Café, té, jugos naturales

Desayuno continental con productos locales y orgánicos cuando es posible.`,
        actions: [
          { text: "🛏️ Ver habitaciones", url: "habitaciones.html" }
        ]
      },
      contacto: {
        keywords: ['contacto', 'telefono', 'teléfono', 'whatsapp', 'llamar', 'escribir', 'contact'],
        response: `📞 <strong>Contacto</strong>

<strong>📱 WhatsApp:</strong>
+56 9 9824 4016
(Preferido para reservas)

<strong>📧 Email:</strong>
Disponible en nuestra página de contacto

<strong>🌐 Redes Sociales:</strong>
Encuéntranos en Google y TripAdvisor

<strong>💬 Horario de respuesta:</strong>
9:00 - 23:00 todos los días

¡Te respondemos rápido!`,
        actions: [
          { text: "💬 Abrir WhatsApp", url: "https://wa.me/message/TSCZUHZY7LTVJ1", primary: true },
          { text: "📞 Ver contacto completo", url: "contacto.html" }
        ]
      }
    };
  }

  injectHTML() {
    const chatHTML = `
      <div id="casona-chat-button" class="chat-button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span class="chat-badge">¡Pregúntame!</span>
      </div>

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
              Pregúntame lo que quieras o usa los botones rápidos:
            </div>
          </div>

          <div class="chat-quick-buttons">
            <button class="quick-btn" data-question="¿Qué platos veganos tienen?">🌱 Platos veganos</button>
            <button class="quick-btn" data-question="Muéstrame el menú">🍽️ Menú</button>
            <button class="quick-btn" data-question="Info de habitaciones">🛏️ Habitaciones</button>
            <button class="quick-btn" data-question="¿Qué actividades hay?">🏔️ Actividades</button>
            <button class="quick-btn" data-question="Horarios">⏰ Horarios</button>
          </div>
        </div>

        <div class="chat-input-container">
          <input type="text" id="chat-input" placeholder="Escribe tu pregunta..." />
          <button id="chat-send-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
            </svg>
          </button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatHTML);
  }

  attachEventListeners() {
    const button = document.getElementById('casona-chat-button');
    const closeBtn = document.getElementById('casona-chat-close');
    const sendBtn = document.getElementById('chat-send-btn');
    const input = document.getElementById('chat-input');
    const quickBtns = document.querySelectorAll('.quick-btn');

    button.addEventListener('click', () => this.toggleChat());
    closeBtn.addEventListener('click', () => this.closeChat());
    sendBtn.addEventListener('click', () => this.sendMessage());
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });

    quickBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const question = e.currentTarget.dataset.question;
        this.processQuestion(question, true);
      });
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    const chatWindow = document.getElementById('casona-chat-window');
    const chatButton = document.getElementById('casona-chat-button');
    const badge = chatButton.querySelector('.chat-badge');
    const input = document.getElementById('chat-input');

    if (this.isOpen) {
      chatWindow.classList.add('chat-open');
      chatButton.classList.add('chat-button-active');
      if (badge) badge.style.display = 'none';
      setTimeout(() => input.focus(), 300);
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

  sendMessage() {
    const input = document.getElementById('chat-input');
    const question = input.value.trim();

    if (!question) return;

    this.addUserMessage(question);
    input.value = '';

    setTimeout(() => {
      this.processQuestion(question);
    }, 500);
  }

  addUserMessage(text) {
    const chatBody = document.getElementById('casona-chat-body');
    const messageHTML = `
      <div class="chat-message user-message">
        <div class="message-bubble">${text}</div>
      </div>
    `;
    chatBody.insertAdjacentHTML('beforeend', messageHTML);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  processQuestion(question, fromButton = false) {
    const lowerQuestion = question.toLowerCase();
    let bestMatch = null;
    let maxScore = 0;

    // Buscar coincidencias en la base de conocimiento
    for (const [topic, data] of Object.entries(this.knowledge)) {
      let score = 0;
      for (const keyword of data.keywords) {
        if (lowerQuestion.includes(keyword.toLowerCase())) {
          score += keyword.length; // Priorizar keywords más específicas
        }
      }
      if (score > maxScore) {
        maxScore = score;
        bestMatch = data;
      }
    }

    if (bestMatch && maxScore > 0) {
      this.addBotMessage(bestMatch.response, bestMatch.actions);
    } else {
      // Respuesta por defecto si no hay coincidencias
      this.addDefaultResponse(question);
    }
  }

  addBotMessage(content, actions = []) {
    const chatBody = document.getElementById('casona-chat-body');
    const messageHTML = `
      <div class="chat-message bot-message">
        <div class="message-bubble">
          ${content}
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
    chatBody.insertAdjacentHTML('beforeend', messageHTML);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  addDefaultResponse(question) {
    const response = `
      No estoy seguro de cómo responder a eso específicamente, pero puedo ayudarte con:

      • 🍽️ Menú y platos (incluye opciones veganas)
      • 🛏️ Habitaciones y tarifas
      • 🏔️ Actividades en Chile Chico
      • ⏰ Horarios y ubicación
      • 📞 Reservas y contacto

      ¿Sobre qué te gustaría saber más? O mejor aún, <strong>chatea con nosotros por WhatsApp</strong> para una respuesta personalizada.
    `;

    this.addBotMessage(response, [
      { text: "💬 Chatear por WhatsApp", url: "https://wa.me/message/TSCZUHZY7LTVJ1", primary: true }
    ]);
  }
}

// Inicializar chatbot
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new CasonaChatbot();
  });
} else {
  new CasonaChatbot();
}