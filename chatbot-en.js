/* ═══════════════════════════════════════════════════════════════
   CASONA BELGA - INTERACTIVE CHATBOT (ENGLISH)
   Chat with text input and question processing
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
      vegan: {
        keywords: ['vegan', 'vegano', 'vegetarian', 'vegetariano', 'plant based', 'no meat', 'sin carne'],
        response: `🌱 <strong>Vegan and Vegetarian Options</strong>

We have several options for vegan/vegetarian diets:

<strong>STARTERS:</strong>
• Beet Tartare with crispy quinoa - $14,500
• Pumpkin Cream with carrot and ginger - $8,000
• Lentil Cream - $8,000

<strong>MAIN COURSES:</strong>
• Creamy mote with mushrooms and morels - $19,000
  (Mote wheat with roasted pumpkin and grilled vegetables)
• Green leaves Sorrentino in pomodoro sauce with mushrooms and morels - $17,000
• Fettuccini in pomodoro and basil pesto sauce - $14,000

<strong>SIDES:</strong>
• Sautéed Vegetables
• Casona Salad (lettuce, arugula, mizuna, tomato, apple, seeds)

💡 All our dishes can be adapted. Just ask when making your reservation.`,
        actions: [
          { text: "🟢 Book a table", url: "https://wa.me/message/TSCZUHZY7LTVJ1" },
          { text: "📋 View full menu", url: "menu.html" }
        ]
      },
      menu: {
        keywords: ['menu', 'carta', 'dishes', 'platos', 'food', 'comida', 'eat', 'comer', 'lunch', 'dinner'],
        response: `🍽️ <strong>Our 2026 Menu</strong>

<strong>STARTERS:</strong>
• Salmon Ceviche - $15,500
• Beef Filet Tartare on toasts - $15,500
• Beet Tartare - $14,500
• Creams (Pumpkin/Lentil) - $8,000

<strong>MAINS + SIDES + SAUCE:</strong>
• Grilled Filet Medallion 220-230g - $22,500
• Grilled Salmon 220-230g - $23,500
• Austral Hake 220-230g - $21,500

<strong>ARTISAN PASTA:</strong>
• Salmon/Lamb Ravioli - $17,000
• Green leaves Sorrentino - $17,000
• Fettuccini - $14,000
• Creamy mote with mushrooms - $19,000
• Shrimp Risotto - $19,000

<strong>DESSERTS:</strong>
Brownie, Tiramisu, Crème brûlée, Apple crumble, House cake - $7,000`,
        actions: [
          { text: "📋 View full menu", url: "menu.html" },
          { text: "🟢 Book a table", url: "https://wa.me/message/TSCZUHZY7LTVJ1" }
        ]
      },
      price: {
        keywords: ['price', 'prices', 'cost', 'precio', 'expensive', 'cheap', 'how much'],
        response: `💰 <strong>Price Ranges</strong>

<strong>RESTAURANT:</strong>
• Starters: $8,000 - $15,500
• Main courses: $14,000 - $23,500
• Desserts: $7,000
• Wines: Glass $6,500 / Bottle from $28,000

<strong>HOTEL:</strong>
• Room from $95,000 per night
• Includes breakfast
• Capacity 2-3 people

Prices may vary by season. For updated rates, contact us via WhatsApp.`,
        actions: [
          { text: "💬 Ask via WhatsApp", url: "https://wa.me/message/TSCZUHZY7LTVJ1" }
        ]
      },
      rooms: {
        keywords: ['room', 'rooms', 'habitacion', 'hotel', 'sleep', 'accommodation', 'stay', 'lodge'],
        response: `🛏️ <strong>Rooms</strong>

We have 3 rooms:
• <strong>Tehuelche</strong>
• <strong>Yaganes</strong>
• <strong>Kawésqar</strong>

<strong>INCLUDES:</strong>
✓ 1 queen bed + optional single bed
✓ Capacity 2-3 people
✓ Private bathroom with shower
✓ Free Wi-Fi
✓ Electric heating
✓ Work desk
✓ Breakfast included (7:30-10:00)

<strong>PREMIUM EXPERIENCE:</strong>
✨ Premium mattresses
✨ 1,000 thread count sheets
✨ Salt lamps
✨ Rustic atmosphere

💰 <strong>From $95,000 per night</strong>`,
        actions: [
          { text: "🛏️ View rooms", url: "rooms.html" },
          { text: "💬 Check availability", url: "https://wa.me/message/TSCZUHZY7LTVJ1" }
        ]
      },
      reservation: {
        keywords: ['reservation', 'reserve', 'book', 'booking', 'reserva', 'reservar', 'availability'],
        response: `📅 <strong>Reservations</strong>

<strong>RESTAURANT:</strong>
Book your table via WhatsApp with:
• Date and time
• Number of people
• Name

<strong>HOTEL:</strong>
Check availability via WhatsApp with:
• Check-in and check-out dates
• Number of people
• Preferences

We confirm availability immediately. Direct booking = best price!`,
        actions: [
          { text: "🟢 Book via WhatsApp", url: "https://wa.me/message/TSCZUHZY7LTVJ1", primary: true }
        ]
      },
      activities: {
        keywords: ['activities', 'actividades', 'what to do', 'tourism', 'tours', 'excursions', 'places', 'visit'],
        response: `🏔️ <strong>Activities in Chile Chico</strong>

<strong>🚣 LAKE GENERAL CARRERA</strong>
2nd largest lake in South America. Crystal-clear turquoise waters. Kayak, boat, fishing.

<strong>🍒 ORGANIC CHERRIES</strong>
Chile Chico is the cherry capital. Season: Dec-Jan. Visit local orchards.

<strong>🥾 PATAGONIA NATIONAL PARK</strong>
World-class trekking:
• Valle Chacabuco
• Lagunas Altas
• Wildlife: guanacos, condors, pumas

<strong>🗿 MARBLE CAVES</strong>
One of Chile's 7 natural wonders. Boat tour from Puerto Tranquilo (1h from Chile Chico).

<strong>🌄 VALLEY VIEWPOINT</strong>
Panoramic views of town, lake and mountains.

We help organize excursions and give personalized recommendations.`,
        actions: [
          { text: "💬 Get recommendations", url: "https://wa.me/message/TSCZUHZY7LTVJ1" }
        ]
      },
      wine: {
        keywords: ['wine', 'wines', 'vino', 'vinos', 'glass', 'bottle', 'malbec', 'carmenere', 'cabernet'],
        response: `🍷 <strong>Wine List</strong>

<strong>FEATURED WINE:</strong>
• <strong>Allá Lejos</strong>, from Chile Chico
  The southernmost wine in the world 🌍
  $45,000

<strong>SELECTION:</strong>
• Premium or Gran Reserva Category - $38,000
• Reserva Category - $28,000
• Glass of wine - $6,500

<strong>SERVICE:</strong>
• Corkage - $10,000

Ask about our full selection when making your reservation.`,
        actions: [
          { text: "📋 View full menu", url: "menu.html" }
        ]
      },
      beer: {
        keywords: ['beer', 'beers', 'cerveza', 'cervezas', 'craft beer', 'ale', 'lager'],
        response: `🍺 <strong>Craft Beers</strong>

All our beers are craft from the region:

<strong>FROM CHILE CHICO:</strong>
• GLOF - Pale Ale - $4,500
• CERRO COLORADO - Porter / Amber Ale - $4,500

<strong>OTHER CRAFT:</strong>
• D'Olbeck - Maqui / Lager / Ale / Red IPA / Stout - $4,500
• KUNSTMANN - Non-Alcoholic Lager - $4,500

All $4,500. Support local Patagonian beer! 🏔️`,
        actions: [
          { text: "🟢 Book a table", url: "https://wa.me/message/TSCZUHZY7LTVJ1" }
        ]
      },
      hours: {
        keywords: ['hours', 'schedule', 'horario', 'open', 'closed', 'when', 'time'],
        response: `⏰ <strong>Hours</strong>

<strong>🍽️ RESTAURANT:</strong>
Monday to Sunday: 12:30 PM - 10:30 PM

<strong>🛏️ HOTEL:</strong>
• Check-in: 3:00 PM
• Check-out: 11:00 AM
• Breakfast: 7:30 AM - 10:00 AM

<strong>📱 BOOKINGS:</strong>
WhatsApp responses: 9:00 AM - 11:00 PM

We're open every day of the year.`,
        actions: [
          { text: "📞 View contact", url: "contact.html" }
        ]
      },
      location: {
        keywords: ['location', 'ubicacion', 'where', 'address', 'direccion', 'how to get', 'map', 'directions'],
        response: `📍 <strong>Location & Directions</strong>

<strong>ADDRESS:</strong>
Bernardo O'Higgins 895
Chile Chico, Aysén, Chile

<strong>✈️ FROM COYHAIQUE:</strong>
Route X-83 (270 km, 5 hours)
Paved road + gravel in good condition

<strong>⛴️ FROM ARGENTINA:</strong>
Los Antiguos - Chile Chico crossing (5 minutes)

<strong>📍 IN CHILE CHICO:</strong>
We're in the town center, main street B. O'Higgins.`,
        actions: [
          { text: "🗺️ View on Google Maps", url: "https://www.google.com/maps/place/Casona+Belga+Restaurante/data=!4m2!3m1!1s0x0:0x537620c01beb3f06" }
        ]
      },
      breakfast: {
        keywords: ['breakfast', 'desayuno', 'morning'],
        response: `☕ <strong>Breakfast</strong>

Breakfast is included with your hotel stay.

<strong>SCHEDULE:</strong>
7:30 AM - 10:00 AM every day

<strong>INCLUDES:</strong>
• Homemade bread and toast
• Artisan jams
• Cheese and cold cuts
• Prepared eggs
• Fresh seasonal fruits
• Coffee, tea, natural juices

Continental breakfast with local and organic products when possible.`,
        actions: [
          { text: "🛏️ View rooms", url: "rooms.html" }
        ]
      },
      contact: {
        keywords: ['contact', 'contacto', 'phone', 'telefono', 'whatsapp', 'call', 'write', 'email'],
        response: `📞 <strong>Contact</strong>

<strong>📱 WhatsApp:</strong>
+56 9 9824 4016
(Preferred for reservations)

<strong>📧 Email:</strong>
Available on our contact page

<strong>🌐 Social Media:</strong>
Find us on Google and TripAdvisor

<strong>💬 Response hours:</strong>
9:00 AM - 11:00 PM every day

We respond quickly!`,
        actions: [
          { text: "💬 Open WhatsApp", url: "https://wa.me/message/TSCZUHZY7LTVJ1", primary: true },
          { text: "📞 View full contact", url: "contact.html" }
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
        <span class="chat-badge">Ask me!</span>
      </div>

      <div id="casona-chat-window" class="chat-window">
        <div class="chat-header">
          <div class="chat-header-content">
            <div class="chat-avatar">🏔️</div>
            <div>
              <div class="chat-title">Casona Belga</div>
              <div class="chat-status">Virtual Assistant</div>
            </div>
          </div>
          <button id="casona-chat-close" class="chat-close">×</button>
        </div>

        <div class="chat-body" id="casona-chat-body">
          <div class="chat-message bot-message">
            <div class="message-bubble">
              Hello! 👋 I'm your Casona Belga virtual assistant.<br><br>
              Ask me anything or use the quick buttons:
            </div>
          </div>

          <div class="chat-quick-buttons">
            <button class="quick-btn" data-question="What vegan dishes do you have?">🌱 Vegan dishes</button>
            <button class="quick-btn" data-question="Show me the menu">🍽️ Menu</button>
            <button class="quick-btn" data-question="Room info">🛏️ Rooms</button>
            <button class="quick-btn" data-question="What activities are there?">🏔️ Activities</button>
            <button class="quick-btn" data-question="Hours">⏰ Hours</button>
          </div>
        </div>

        <div class="chat-input-container">
          <input type="text" id="chat-input" placeholder="Type your question..." />
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

  processQuestion(question) {
    const lowerQuestion = question.toLowerCase();
    let bestMatch = null;
    let maxScore = 0;

    // Search for matches in knowledge base
    for (const [topic, data] of Object.entries(this.knowledge)) {
      let score = 0;
      for (const keyword of data.keywords) {
        if (lowerQuestion.includes(keyword.toLowerCase())) {
          score += keyword.length; // Prioritize more specific keywords
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
      // Default response if no matches
      this.addDefaultResponse();
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

  addDefaultResponse() {
    const response = `
      I'm not sure how to answer that specifically, but I can help you with:

      • 🍽️ Menu and dishes (includes vegan options)
      • 🛏️ Rooms and rates
      • 🏔️ Activities in Chile Chico
      • ⏰ Hours and location
      • 📞 Reservations and contact

      What would you like to know more about? Or better yet, <strong>chat with us on WhatsApp</strong> for a personalized response.
    `;

    this.addBotMessage(response, [
      { text: "💬 Chat on WhatsApp", url: "https://wa.me/message/TSCZUHZY7LTVJ1", primary: true }
    ]);
  }
}

// Initialize chatbot
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new CasonaChatbot();
  });
} else {
  new CasonaChatbot();
}