/* ═══════════════════════════════════════════════════════════════
   CASONA BELGA - AI-POWERED CHATBOT (ENGLISH)
   Chat with Artificial Intelligence using Google Gemini
   ═══════════════════════════════════════════════════════════════ */

class CasonaAIChatbot {
  constructor() {
    this.isOpen = false;
    this.conversationId = this.generateConversationId();
    this.apiUrl = window.CHATBOT_API_URL || 'http://localhost:3000/api/chat';
    this.isLoading = false;
    this.init();
  }

  init() {
    this.injectHTML();
    this.attachEventListeners();
  }

  generateConversationId() {
    return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
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
            <div class="chat-avatar">🤖</div>
            <div>
              <div class="chat-title">Casona Belga Assistant</div>
              <div class="chat-status">AI-Powered</div>
            </div>
          </div>
          <button id="casona-chat-close" class="chat-close">×</button>
        </div>

        <div class="chat-body" id="casona-chat-body">
          <div class="chat-message bot-message">
            <div class="message-bubble">
              Hello! 👋 I'm your AI-powered virtual assistant.<br><br>
              I can help you with information about:<br>
              • Menu and dishes (including vegan options)<br>
              • Rooms and reservations<br>
              • Activities in Chile Chico<br>
              • Hours and location<br><br>
              How can I help you?
            </div>
          </div>

          <div class="chat-quick-buttons">
            <button class="quick-btn" data-question="What vegan dishes do you have?">🌱 Vegan dishes</button>
            <button class="quick-btn" data-question="Show me the menu">🍽️ Menu</button>
            <button class="quick-btn" data-question="Room information">🛏️ Rooms</button>
            <button class="quick-btn" data-question="What activities are there in Chile Chico?">🏔️ Activities</button>
            <button class="quick-btn" data-question="What are the hours?">⏰ Hours</button>
          </div>
        </div>

        <div class="chat-input-container">
          <input type="text" id="chat-input" placeholder="Type your question..." />
          <button id="chat-send-btn" aria-label="Send message">
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
      if (e.key === 'Enter' && !this.isLoading) this.sendMessage();
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

    if (!question || this.isLoading) return;

    this.addUserMessage(question);
    input.value = '';

    setTimeout(() => {
      this.processQuestion(question);
    }, 300);
  }

  addUserMessage(text) {
    const chatBody = document.getElementById('casona-chat-body');
    const messageHTML = `
      <div class="chat-message user-message">
        <div class="message-bubble">${this.escapeHtml(text)}</div>
      </div>
    `;
    chatBody.insertAdjacentHTML('beforeend', messageHTML);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  async processQuestion(question, fromQuickButton = false) {
    if (!fromQuickButton) {
      // Already added by sendMessage()
    } else {
      this.addUserMessage(question);
    }

    // Show loading indicator
    this.showLoadingIndicator();

    try {
      const response = await this.callAI(question);
      this.hideLoadingIndicator();
      this.addBotMessage(response);
    } catch (error) {
      this.hideLoadingIndicator();
      this.addErrorMessage(error);
    }
  }

  async callAI(message) {
    this.isLoading = true;

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          conversationId: this.conversationId,
          language: 'en',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      this.isLoading = false;
      return data.response;

    } catch (error) {
      this.isLoading = false;
      console.error('Error calling AI:', error);

      // Return friendly error message
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Cannot connect to server. Please verify the backend is running.');
      }

      throw error;
    }
  }

  showLoadingIndicator() {
    const chatBody = document.getElementById('casona-chat-body');
    const loadingHTML = `
      <div class="chat-message bot-message" id="loading-indicator">
        <div class="message-bubble">
          <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    `;
    chatBody.insertAdjacentHTML('beforeend', loadingHTML);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.remove();
    }
  }

  addBotMessage(content) {
    const chatBody = document.getElementById('casona-chat-body');

    // Convert markdown-like formatting to HTML
    const formattedContent = this.formatMarkdown(content);

    const messageHTML = `
      <div class="chat-message bot-message">
        <div class="message-bubble">
          ${formattedContent}
          <div class="message-actions">
            <a href="https://wa.me/message/TSCZUHZY7LTVJ1"
               class="message-action-btn primary"
               target="_blank"
               rel="noopener">
              💬 Book via WhatsApp
            </a>
          </div>
        </div>
      </div>
    `;
    chatBody.insertAdjacentHTML('beforeend', messageHTML);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  addErrorMessage(error) {
    const chatBody = document.getElementById('casona-chat-body');
    const errorMessage = `
      <div class="chat-message bot-message">
        <div class="message-bubble" style="background: linear-gradient(135deg, rgba(211, 47, 47, 0.2), rgba(198, 40, 40, 0.1)); border-color: rgba(211, 47, 47, 0.4);">
          ❌ <strong>Error</strong><br><br>
          ${this.escapeHtml(error.message)}<br><br>
          Please try again or contact directly via WhatsApp.
          <div class="message-actions">
            <a href="https://wa.me/message/TSCZUHZY7LTVJ1"
               class="message-action-btn primary"
               target="_blank"
               rel="noopener">
              💬 Contact via WhatsApp
            </a>
          </div>
        </div>
      </div>
    `;
    chatBody.insertAdjacentHTML('beforeend', errorMessage);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  formatMarkdown(text) {
    // Simple markdown formatting
    let formatted = text;

    // Bold: **text** or __text__
    formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/__(.+?)__/g, '<strong>$1</strong>');

    // Lists: convert lines starting with • or - to list items
    formatted = formatted.replace(/^[•\-]\s+(.+)$/gm, '<div style="margin-left: 1em;">• $1</div>');

    // Line breaks
    formatted = formatted.replace(/\n/g, '<br>');

    return formatted;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Add CSS for typing indicator
const style = document.createElement('style');
style.textContent = `
.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 8px 0;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-secondary);
  opacity: 0.6;
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.6;
  }
  30% {
    transform: translateY(-10px);
    opacity: 1;
  }
}
`;
document.head.appendChild(style);

// Initialize AI chatbot
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new CasonaAIChatbot();
  });
} else {
  new CasonaAIChatbot();
}
