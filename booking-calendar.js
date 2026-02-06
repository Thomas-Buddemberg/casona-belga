/**
 * BOOKING CALENDAR & FORM
 * Casona Belga - Booking System Frontend
 */

// Configuration
const API_URL = window.BOOKING_API_URL || 'http://localhost:3000/api';

const ROOMS = {
  tehuelche: 'Habitación Tehuelche',
  yaganes: 'Habitación Yaganes',
  chonos: 'Habitación Chonos'
};

const ROOM_PRICES = {
  tehuelche: 95000,
  yaganes: 95000,
  chonos: 95000
};

class BookingCalendar {
  constructor() {
    this.currentDate = new Date();
    this.selectedRoom = 'tehuelche';
    this.selectedDates = {
      checkIn: null,
      checkOut: null
    };
    this.occupiedDates = {};
    this.currentStep = 1; // 1: Select dates, 2: Fill form, 3: Confirmation

    this.init();
  }

  async init() {
    this.renderRoomSelector();
    this.renderCalendar();
    await this.loadAvailability();
    this.setupEventListeners();
  }

  renderRoomSelector() {
    const container = document.getElementById('room-selector');
    if (!container) return;

    container.innerHTML = Object.entries(ROOMS).map(([key, name]) => `
      <button class="room-btn ${key === this.selectedRoom ? 'active' : ''}"
              data-room="${key}">
        ${name}
      </button>
    `).join('');
  }

  renderCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    // Render header
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                       'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const headerEl = document.getElementById('calendar-month');
    if (headerEl) {
      headerEl.textContent = `${monthNames[month]} ${year}`;
    }

    // Render grid
    const grid = document.getElementById('calendar-grid');
    if (!grid) return;

    grid.innerHTML = '';

    // Day headers
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    dayNames.forEach(day => {
      const dayHeader = document.createElement('div');
      dayHeader.className = 'calendar-day-header';
      dayHeader.textContent = day;
      grid.appendChild(dayHeader);
    });

    // Get first day of month and total days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const dayEl = this.createDayElement(day, true, null);
      grid.appendChild(dayEl);
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      date.setHours(0, 0, 0, 0);

      const isPast = date < today;
      const isToday = date.getTime() === today.getTime();
      const dateString = this.dateToString(date);
      const isOccupied = this.occupiedDates[this.selectedRoom]?.includes(dateString);

      const dayEl = this.createDayElement(day, false, date, {
        isPast,
        isToday,
        isOccupied
      });

      grid.appendChild(dayEl);
    }

    // Next month days
    const totalCells = firstDay + daysInMonth;
    const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);

    for (let day = 1; day <= remainingCells; day++) {
      const dayEl = this.createDayElement(day, true, null);
      grid.appendChild(dayEl);
    }
  }

  createDayElement(day, isOtherMonth, date, options = {}) {
    const dayEl = document.createElement('div');
    dayEl.className = 'calendar-day';
    dayEl.textContent = day;

    if (isOtherMonth) {
      dayEl.classList.add('other-month');
      return dayEl;
    }

    if (options.isPast) {
      dayEl.classList.add('disabled');
    } else if (options.isOccupied) {
      dayEl.classList.add('occupied');
      dayEl.title = 'No disponible';
    } else {
      dayEl.dataset.date = this.dateToString(date);
      dayEl.addEventListener('click', () => this.selectDate(date));
    }

    if (options.isToday) {
      dayEl.classList.add('today');
    }

    // Highlight selected dates
    if (this.selectedDates.checkIn || this.selectedDates.checkOut) {
      const dateString = this.dateToString(date);
      const checkIn = this.selectedDates.checkIn;
      const checkOut = this.selectedDates.checkOut;

      if (checkIn && dateString === this.dateToString(checkIn)) {
        dayEl.classList.add('selected');
      }
      if (checkOut && dateString === this.dateToString(checkOut)) {
        dayEl.classList.add('selected');
      }
      if (checkIn && checkOut && date > checkIn && date < checkOut) {
        dayEl.classList.add('in-range');
      }
    }

    return dayEl;
  }

  selectDate(date) {
    if (!this.selectedDates.checkIn || (this.selectedDates.checkIn && this.selectedDates.checkOut)) {
      // Start new selection
      this.selectedDates.checkIn = date;
      this.selectedDates.checkOut = null;
    } else {
      // Complete selection
      if (date > this.selectedDates.checkIn) {
        this.selectedDates.checkOut = date;
        this.updateFormDates();
        this.showBookingForm();
      } else {
        // Date is before check-in, restart
        this.selectedDates.checkIn = date;
        this.selectedDates.checkOut = null;
      }
    }

    this.renderCalendar();
    this.updateSelectionSummary();
  }

  updateSelectionSummary() {
    const summaryEl = document.getElementById('date-selection-summary');
    if (!summaryEl) return;

    if (this.selectedDates.checkIn && this.selectedDates.checkOut) {
      const checkIn = this.formatDate(this.selectedDates.checkIn);
      const checkOut = this.formatDate(this.selectedDates.checkOut);
      const nights = this.calculateNights();

      summaryEl.innerHTML = `
        <div class="info-message">
          <strong>✓ Fechas seleccionadas:</strong><br>
          Check-in: ${checkIn} (15:00)<br>
          Check-out: ${checkOut} (11:00)<br>
          ${nights} noche(s) · Habitación: ${ROOMS[this.selectedRoom]}
        </div>
      `;
    } else if (this.selectedDates.checkIn) {
      summaryEl.innerHTML = `
        <div class="info-message">
          <strong>Selecciona la fecha de salida</strong><br>
          Check-in: ${this.formatDate(this.selectedDates.checkIn)}
        </div>
      `;
    } else {
      summaryEl.innerHTML = `
        <div class="info-message">
          <strong>Selecciona las fechas de tu estadía</strong><br>
          Haz clic en el día de llegada y luego en el día de salida
        </div>
      `;
    }
  }

  async loadAvailability() {
    try {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth() + 1;

      const response = await fetch(`${API_URL}/availability?year=${year}&month=${month}`);
      const data = await response.json();

      this.occupiedDates = data.availability;
      this.renderCalendar();
    } catch (error) {
      console.error('Error loading availability:', error);
      this.showMessage('Error al cargar disponibilidad', 'error');
    }
  }

  changeMonth(delta) {
    this.currentDate.setMonth(this.currentDate.getMonth() + delta);
    this.renderCalendar();
    this.loadAvailability();
  }

  changeRoom(room) {
    this.selectedRoom = room;
    this.selectedDates = { checkIn: null, checkOut: null };
    this.renderRoomSelector();
    this.renderCalendar();
    this.updateSelectionSummary();
    this.hideBookingForm();
  }

  setupEventListeners() {
    // Room selector
    document.querySelectorAll('.room-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.changeRoom(e.target.dataset.room);
      });
    });

    // Calendar navigation
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.changeMonth(-1));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.changeMonth(1));
    }

    // Form submission
    const form = document.getElementById('booking-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitBooking();
      });
    }

    // Cancel button
    const cancelBtn = document.getElementById('cancel-booking');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        this.resetBooking();
      });
    }
  }

  showBookingForm() {
    const formContainer = document.getElementById('booking-form-container');
    if (formContainer) {
      formContainer.style.display = 'block';
      formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.updateStep(2);
  }

  hideBookingForm() {
    const formContainer = document.getElementById('booking-form-container');
    if (formContainer) {
      formContainer.style.display = 'none';
    }
    this.updateStep(1);
  }

  updateFormDates() {
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    const roomInput = document.getElementById('room');

    if (checkInInput) checkInInput.value = this.dateToString(this.selectedDates.checkIn);
    if (checkOutInput) checkOutInput.value = this.dateToString(this.selectedDates.checkOut);
    if (roomInput) roomInput.value = this.selectedRoom;

    this.updateBookingSummary();
  }

  updateBookingSummary() {
    const summaryEl = document.getElementById('booking-summary');
    if (!summaryEl) return;

    const nights = this.calculateNights();
    const pricePerNight = ROOM_PRICES[this.selectedRoom];
    const total = nights * pricePerNight;

    summaryEl.innerHTML = `
      <div class="summary-row">
        <span>Habitación:</span>
        <span>${ROOMS[this.selectedRoom]}</span>
      </div>
      <div class="summary-row">
        <span>Check-in:</span>
        <span>${this.formatDate(this.selectedDates.checkIn)} (15:00)</span>
      </div>
      <div class="summary-row">
        <span>Check-out:</span>
        <span>${this.formatDate(this.selectedDates.checkOut)} (11:00)</span>
      </div>
      <div class="summary-row">
        <span>Noches:</span>
        <span>${nights}</span>
      </div>
      <div class="summary-row">
        <span>Precio por noche:</span>
        <span>$${pricePerNight.toLocaleString('es-CL')} CLP</span>
      </div>
      <div class="summary-row">
        <span>Total:</span>
        <span>$${total.toLocaleString('es-CL')} CLP</span>
      </div>
    `;
  }

  calculateNights() {
    if (!this.selectedDates.checkIn || !this.selectedDates.checkOut) return 0;

    const diffTime = this.selectedDates.checkOut - this.selectedDates.checkIn;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  async submitBooking() {
    const submitBtn = document.getElementById('submit-booking');
    const originalText = submitBtn.innerHTML;

    try {
      // Disable button and show loading
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="loading-spinner"></span> Enviando...';

      // Get form data
      const formData = {
        room: this.selectedRoom,
        checkIn: this.dateToString(this.selectedDates.checkIn),
        checkOut: this.dateToString(this.selectedDates.checkOut),
        guests: parseInt(document.getElementById('guests').value),
        guestName: document.getElementById('guestName').value,
        guestEmail: document.getElementById('guestEmail').value,
        guestPhone: document.getElementById('guestPhone').value,
        comments: document.getElementById('comments').value
      };

      // Submit to API
      const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Error al crear la reserva');
      }

      // Show success message
      this.showSuccessMessage(data.booking);
      this.updateStep(3);

    } catch (error) {
      console.error('Error submitting booking:', error);
      this.showMessage(error.message, 'error');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  }

  showSuccessMessage(booking) {
    const formContainer = document.getElementById('booking-form-container');
    if (!formContainer) return;

    formContainer.innerHTML = `
      <div class="success-message" style="text-align: center; padding: 40px;">
        <h2 style="color: #27ae60; margin-bottom: 20px;">🎉 ¡Solicitud Enviada!</h2>
        <p style="font-size: 18px; margin-bottom: 20px;">
          Gracias ${booking.guestName}, hemos recibido tu solicitud de reserva.
        </p>
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Código de reserva:</strong> ${booking.id}</p>
          <p style="margin: 10px 0;"><strong>Habitación:</strong> ${ROOMS[booking.room]}</p>
          <p style="margin: 10px 0;"><strong>Check-in:</strong> ${this.formatDate(new Date(booking.checkIn))}</p>
          <p style="margin: 10px 0;"><strong>Check-out:</strong> ${this.formatDate(new Date(booking.checkOut))}</p>
        </div>
        <p style="margin: 20px 0;">
          Te hemos enviado un email de confirmación a <strong>${booking.guestEmail}</strong>
        </p>
        <p style="margin: 20px 0;">
          Revisaremos tu solicitud y te confirmaremos la disponibilidad en las próximas horas.
        </p>
        <div style="margin-top: 30px;">
          <a href="https://wa.me/message/TSCZUHZY7LTVJ1" class="btn-submit" target="_blank" rel="noopener"
             style="display: inline-block; text-decoration: none; margin: 10px;">
            💬 Contactar por WhatsApp
          </a>
          <button class="btn-cancel" onclick="location.reload()">
            Hacer otra reserva
          </button>
        </div>
      </div>
    `;
  }

  showMessage(message, type = 'info') {
    const messagesEl = document.getElementById('form-messages');
    if (!messagesEl) return;

    messagesEl.innerHTML = `<div class="${type}-message">${message}</div>`;
    messagesEl.scrollIntoView({ behavior: 'smooth' });

    if (type === 'success') {
      setTimeout(() => {
        messagesEl.innerHTML = '';
      }, 5000);
    }
  }

  updateStep(step) {
    this.currentStep = step;

    // Update step indicators
    for (let i = 1; i <= 3; i++) {
      const stepEl = document.querySelector(`.step[data-step="${i}"]`);
      if (!stepEl) continue;

      stepEl.classList.remove('active', 'completed');
      if (i < step) {
        stepEl.classList.add('completed');
      } else if (i === step) {
        stepEl.classList.add('active');
      }
    }
  }

  resetBooking() {
    this.selectedDates = { checkIn: null, checkOut: null };
    this.renderCalendar();
    this.updateSelectionSummary();
    this.hideBookingForm();

    const form = document.getElementById('booking-form');
    if (form) form.reset();
  }

  dateToString(date) {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  }

  formatDate(date) {
    if (!date) return '';
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('es-CL', options);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.bookingCalendar = new BookingCalendar();
});
