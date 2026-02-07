/**
 * BOOKING MODEL
 * Manages booking data structure and operations
 */

const fs = require('fs');
const path = require('path');

const BOOKINGS_FILE = path.join(__dirname, '../bookings.json');

// Room types
const ROOMS = {
  TEHUELCHE: 'tehuelche',
  YAGANES: 'yaganes',
  CHONOS: 'chonos'
};

// Booking status
const STATUS = {
  PENDING: 'pending',      // Awaiting admin approval
  CONFIRMED: 'confirmed',  // Approved by admin
  REJECTED: 'rejected',    // Rejected by admin
  CANCELLED: 'cancelled'   // Cancelled by guest
};

class Booking {
  constructor(data) {
    this.id = data.id || this.generateId();
    this.room = data.room;
    this.checkIn = data.checkIn;
    this.checkOut = data.checkOut;
    this.guests = data.guests || 2;
    this.guestName = data.guestName;
    this.guestEmail = data.guestEmail;
    this.guestPhone = data.guestPhone;
    this.comments = data.comments || '';
    this.status = data.status || STATUS.PENDING;
    this.totalPrice = data.totalPrice || this.calculatePrice();
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  generateId() {
    return `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  calculatePrice() {
    const basePrice = 95000; // CLP per night
    const checkIn = new Date(this.checkIn);
    const checkOut = new Date(this.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    return basePrice * nights;
  }

  validate() {
    const errors = [];

    if (!this.room || !Object.values(ROOMS).includes(this.room)) {
      errors.push('Invalid room type');
    }

    if (!this.checkIn || !this.checkOut) {
      errors.push('Check-in and check-out dates are required');
    }

    // Compare dates as strings to avoid timezone issues
    const todayStr = new Date().toISOString().split('T')[0];
    const checkInStr = this.checkIn.split('T')[0]; // Handle both ISO datetime and date-only strings

    // Allow same-day bookings - only reject dates strictly in the past
    if (checkInStr < todayStr) {
      errors.push('Check-in date cannot be in the past');
    }

    const checkIn = new Date(this.checkIn);
    const checkOut = new Date(this.checkOut);

    if (checkOut <= checkIn) {
      errors.push('Check-out must be after check-in');
    }

    if (!this.guestName || this.guestName.trim().length < 2) {
      errors.push('Guest name is required');
    }

    if (!this.guestEmail || !this.isValidEmail(this.guestEmail)) {
      errors.push('Valid email is required');
    }

    if (!this.guestPhone || this.guestPhone.trim().length < 8) {
      errors.push('Valid phone number is required');
    }

    if (this.guests < 1 || this.guests > 3) {
      errors.push('Number of guests must be between 1 and 3');
    }

    return errors;
  }

  isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  toJSON() {
    return {
      id: this.id,
      room: this.room,
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      guests: this.guests,
      guestName: this.guestName,
      guestEmail: this.guestEmail,
      guestPhone: this.guestPhone,
      comments: this.comments,
      status: this.status,
      totalPrice: this.totalPrice,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // Static methods for database operations
  static getAll() {
    try {
      const data = fs.readFileSync(BOOKINGS_FILE, 'utf8');
      const json = JSON.parse(data);
      return json.bookings.map(b => new Booking(b));
    } catch (error) {
      console.error('Error reading bookings:', error);
      return [];
    }
  }

  static getById(id) {
    const bookings = this.getAll();
    return bookings.find(b => b.id === id);
  }

  static getByDateRange(startDate, endDate) {
    const bookings = this.getAll();
    return bookings.filter(b => {
      if (b.status === STATUS.REJECTED || b.status === STATUS.CANCELLED) {
        return false;
      }
      const checkIn = new Date(b.checkIn);
      const checkOut = new Date(b.checkOut);
      return (checkIn <= new Date(endDate) && checkOut >= new Date(startDate));
    });
  }

  static getByRoom(room, startDate, endDate) {
    const bookings = this.getByDateRange(startDate, endDate);
    return bookings.filter(b => b.room === room);
  }

  static save(booking) {
    try {
      const bookings = this.getAll();
      const index = bookings.findIndex(b => b.id === booking.id);

      booking.updatedAt = new Date().toISOString();

      if (index >= 0) {
        bookings[index] = booking;
      } else {
        bookings.push(booking);
      }

      const data = {
        bookings: bookings.map(b => b.toJSON())
      };

      fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error('Error saving booking:', error);
      return false;
    }
  }

  static delete(id) {
    try {
      const bookings = this.getAll();
      const filtered = bookings.filter(b => b.id !== id);

      const data = {
        bookings: filtered.map(b => b.toJSON())
      };

      fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error('Error deleting booking:', error);
      return false;
    }
  }

  // Check if room is available for given dates
  static isAvailable(room, checkIn, checkOut, excludeBookingId = null) {
    const bookings = this.getByRoom(room, checkIn, checkOut);
    const filtered = excludeBookingId
      ? bookings.filter(b => b.id !== excludeBookingId)
      : bookings;

    return filtered.length === 0;
  }

  // Get all occupied dates for a room (for calendar display)
  static getOccupiedDates(room, year, month) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const bookings = this.getByRoom(
      room,
      startDate.toISOString(),
      endDate.toISOString()
    );

    const occupiedDates = [];
    bookings.forEach(booking => {
      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);

      for (let d = new Date(checkIn); d < checkOut; d.setDate(d.getDate() + 1)) {
        occupiedDates.push(d.toISOString().split('T')[0]);
      }
    });

    return [...new Set(occupiedDates)]; // Remove duplicates
  }
}

module.exports = { Booking, ROOMS, STATUS };
