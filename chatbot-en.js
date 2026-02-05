/* ═══════════════════════════════════════════════════════════════
   CASONA BELGA - CHATBOT (ENGLISH VERSION)
   Interactive chat with restaurant and activities information
   ═══════════════════════════════════════════════════════════════ */

class CasonaChatbot {
  constructor() {
    this.isOpen = false;
    this.currentView = 'menu';
    this.init();
  }

  init() {
    this.injectHTML();
    this.attachEventListeners();
  }

  injectHTML() {
    const chatHTML = `
      <!-- Chat floating button -->
      <div id="casona-chat-button" class="chat-button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span class="chat-badge">Hi!</span>
      </div>

      <!-- Chat window -->
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
              How can I help you today?
            </div>
          </div>

          <div class="chat-options">
            <button class="chat-option" data-topic="menu">
              🍽️ Menu & Dishes
            </button>
            <button class="chat-option" data-topic="rooms">
              🛏️ Rooms
            </button>
            <button class="chat-option" data-topic="activities">
              🏔️ Activities in Chile Chico
            </button>
            <button class="chat-option" data-topic="contact">
              📞 Hours & Contact
            </button>
            <button class="chat-option whatsapp-option" data-topic="whatsapp">
              💬 Chat on WhatsApp
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
        title: "🍽️ Menu & Dishes",
        content: `Our menu includes:

<strong>Featured starters:</strong>
• Salmon Ceviche - $15,500
• Beef Filet Tartare - $15,500
• Pumpkin and Carrot Cream - $9,000

<strong>Main courses:</strong>
• Grilled Filet Medallion 220g - $22,500
• Grilled Salmon 230g - $23,500
• Shrimp Risotto - $19,000
• Artisan pasta from $14,000

<strong>Desserts:</strong>
• Brownie, Tiramisu, Crema catalana - $7,000

<strong>Specialties:</strong>
• Allá Lejos Wine (southernmost in the world) - $45,000
• Craft beers from Chile Chico - $4,500

Would you like to see the full menu or make a reservation?`,
        actions: [
          { text: "📋 See full menu", url: "menu.html" },
          { text: "🟢 Book a table", url: "https://wa.me/message/TSCZUHZY7LTVJ1" }
        ]
      },
      rooms: {
        title: "🛏️ Rooms",
        content: `We have 3 boutique rooms:

<strong>Tehuelche Room</strong>
<strong>Yaganes Room</strong>
<strong>Kawésqar Room</strong>

All include:
• 1 queen bed + optional single bed
• Capacity: 2-3 people
• Private bathroom with shower
• Free Wi-Fi
• Electric heating
• Work desk
• Breakfast included (7:30-10:00)

<strong>From $95,000 per night</strong>

We prioritize your rest: premium mattresses, 1,000 thread count sheets, salt lamps.`,
        actions: [
          { text: "🛏️ View rooms", url: "rooms.html" },
          { text: "💬 Check availability", url: "https://wa.me/message/TSCZUHZY7LTVJ1" }
        ]
      },
      activities: {
        title: "🏔️ Activities in Chile Chico",
        content: `<strong>Must-see experiences near Casona Belga:</strong>

🚣 <strong>Lake General Carrera</strong>
Second largest lake in South America. Crystal-clear turquoise waters. Kayak and boat excursions.

🍒 <strong>Organic Cherries</strong>
Chile Chico is famous for its cherries. Season: December-January. Visit local orchards.

🥾 <strong>Patagonia National Park</strong>
World-class trekking. Trails like Valle Chacabuco, Lagunas Altas. Native wildlife: guanacos, condors.

🗿 <strong>Marble Caves</strong>
Marble formations on the lake. One of Chile's 7 natural wonders. Boat tour from Puerto Tranquilo (1h from Chile Chico).

🌄 <strong>Valley Viewpoint</strong>
Panoramic views of the town, lake and mountains.

We help organize excursions. Just ask!`,
        actions: [
          { text: "💬 Get recommendations", url: "https://wa.me/message/TSCZUHZY7LTVJ1" },
          { text: "🏠 Back to home", url: "en_index.html" }
        ]
      },
      contact: {
        title: "📞 Hours & Contact",
        content: `<strong>🍽️ Restaurant</strong>
Mon-Sun: 12:30 PM - 10:30 PM

<strong>🛏️ Hotel</strong>
Check-in: 3:00 PM
Check-out: 11:00 AM
Breakfast: 7:30 AM - 10:00 AM

<strong>📍 Location</strong>
Bernardo O'Higgins 895
Chile Chico, Aysén, Chile

<strong>📱 Contact</strong>
WhatsApp: +56 9 9824 4016
Direct bookings via WhatsApp

<strong>🌐 Social</strong>
Visit our Google and TripAdvisor profiles`,
        actions: [
          { text: "🗺️ View on Maps", url: "https://www.google.com/maps/place/Casona+Belga+Restaurante/data=!4m2!3m1!1s0x0:0x537620c01beb3f06" },
          { text: "📞 Full contact", url: "contact.html" }
        ]
      },
      whatsapp: {
        title: "💬 WhatsApp",
        content: `I'll redirect you to WhatsApp where you can chat directly with our team.

We'll respond to:
• Table reservations
• Room availability
• Personalized recommendations
• Menu questions
• Help with activities

We're here to help! 🟢`,
        actions: [
          { text: "💬 Open WhatsApp", url: "https://wa.me/message/TSCZUHZY7LTVJ1", primary: true }
        ]
      }
    };

    if (topic === 'whatsapp') {
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

    const existingMessages = chatBody.querySelectorAll('.chat-message.bot-message');
    if (existingMessages.length > 1) {
      existingMessages[existingMessages.length - 1].remove();
    }

    chatBody.insertAdjacentHTML('beforeend', messageHTML);
    chatBody.scrollTop = chatBody.scrollHeight;

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
          ⬅️ Back to main menu
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
          Hello! 👋 I'm your Casona Belga virtual assistant.<br><br>
          How can I help you today?
        </div>
      </div>

      <div class="chat-options">
        <button class="chat-option" data-topic="menu">
          🍽️ Menu & Dishes
        </button>
        <button class="chat-option" data-topic="rooms">
          🛏️ Rooms
        </button>
        <button class="chat-option" data-topic="activities">
          🏔️ Activities in Chile Chico
        </button>
        <button class="chat-option" data-topic="contact">
          📞 Hours & Contact
        </button>
        <button class="chat-option whatsapp-option" data-topic="whatsapp">
          💬 Chat on WhatsApp
        </button>
      </div>
    `;

    const options = chatBody.querySelectorAll('.chat-option');
    options.forEach(option => {
      option.addEventListener('click', (e) => {
        const topic = e.currentTarget.dataset.topic;
        this.handleTopic(topic);
      });
    });
  }
}

// Initialize chatbot when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new CasonaChatbot();
  });
} else {
  new CasonaChatbot();
}