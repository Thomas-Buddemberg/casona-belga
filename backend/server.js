/**
 * CASONA BELGA - AI CHATBOT BACKEND
 * Express server with Google Gemini AI integration
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const knowledgeBase = require('./knowledge-base');
const { Booking, ROOMS, STATUS } = require('./models/Booking');
const emailService = require('./services/emailService');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// System prompt for the AI
const SYSTEM_PROMPT = `Eres un asistente virtual para Casona Belga, un hotel y restaurante en Chile Chico, Patagonia Chilena.

TU ROL:
- Ayudar a los clientes con información sobre el restaurante, menú, habitaciones, reservas y actividades
- Ser amigable, profesional y útil
- Responder en el idioma del cliente (español o inglés)
- Fomentar las reservas y visitas

INFORMACIÓN DISPONIBLE:
${knowledgeBase}

INSTRUCCIONES:
1. Responde basándote ÚNICAMENTE en la información proporcionada arriba
2. Si te preguntan algo que no está en la información, di que no tienes esa información y sugiere contactar por WhatsApp
3. Sé conciso pero completo
4. Usa emojis de manera moderada para hacer las respuestas más amigables
5. Siempre ofrece ayuda adicional al final de tu respuesta
6. Para reservas, siempre recomienda contactar por WhatsApp: +56 9 9824 4016
7. Formatea las respuestas con markdown cuando sea apropiado (listas, negritas, etc.)
8. Si preguntan por precios, menciónalos en pesos chilenos (CLP)

EJEMPLOS DE TONO:
- "¡Hola! 👋 Con gusto te ayudo con eso..."
- "Tenemos varias opciones deliciosas..."
- "¿Te gustaría que te cuente más sobre...?"
- "Para hacer tu reserva, lo más rápido es escribirnos por WhatsApp..."`;

// In-memory conversation history (in production, use a database)
const conversations = new Map();

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Casona Belga AI Chatbot is running' });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationId, language = 'es' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get or create conversation history
    let history = conversations.get(conversationId) || [];

    // Initialize the model
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    // Create chat with history
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: SYSTEM_PROMPT }],
        },
        {
          role: 'model',
          parts: [{ text: '¡Entendido! Estoy listo para ayudar a los clientes de Casona Belga con toda la información del restaurante, hotel y actividades. Responderé de manera amigable, profesional y basándome únicamente en la información proporcionada. ¿En qué puedo ayudar?' }],
        },
        ...history,
      ],
    });

    // Send message and get response
    const result = await chat.sendMessage(message);
    const response = result.response;
    const aiResponse = response.text();

    // Update conversation history
    history.push(
      { role: 'user', parts: [{ text: message }] },
      { role: 'model', parts: [{ text: aiResponse }] }
    );

    // Keep only last 10 exchanges to prevent memory issues
    if (history.length > 20) {
      history = history.slice(-20);
    }

    conversations.set(conversationId, history);

    // Clean up old conversations (older than 1 hour)
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    for (const [id, conv] of conversations.entries()) {
      if (conv.timestamp && conv.timestamp < oneHourAgo) {
        conversations.delete(id);
      }
    }

    res.json({
      response: aiResponse,
      conversationId: conversationId,
    });

  } catch (error) {
    console.error('Error in /api/chat:', error);

    // Handle specific Google AI errors
    if (error.message?.includes('API_KEY')) {
      return res.status(500).json({
        error: 'API key configuration error. Please check your GEMINI_API_KEY.'
      });
    }

    if (error.message?.includes('quota')) {
      return res.status(429).json({
        error: 'Rate limit exceeded. Please try again in a moment.'
      });
    }

    res.status(500).json({
      error: 'Error processing your message. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Reset conversation endpoint
app.post('/api/chat/reset', (req, res) => {
  const { conversationId } = req.body;

  if (conversationId && conversations.has(conversationId)) {
    conversations.delete(conversationId);
  }

  res.json({ message: 'Conversation reset successfully' });
});

// ========================================
// BOOKING SYSTEM ENDPOINTS
// ========================================

// Get all bookings (admin)
app.get('/api/bookings', (req, res) => {
  try {
    const { status, room } = req.query;
    let bookings = Booking.getAll();

    // Filter by status if provided
    if (status) {
      bookings = bookings.filter(b => b.status === status);
    }

    // Filter by room if provided
    if (room) {
      bookings = bookings.filter(b => b.room === room);
    }

    // Sort by creation date (newest first)
    bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Error fetching bookings' });
  }
});

// Get booking by ID
app.get('/api/bookings/:id', (req, res) => {
  try {
    const booking = Booking.getById(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ booking });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Error fetching booking' });
  }
});

// Create new booking request
app.post('/api/bookings', async (req, res) => {
  try {
    const bookingData = req.body;
    const booking = new Booking(bookingData);

    // Validate booking data
    const errors = booking.validate();
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Check availability
    const isAvailable = Booking.isAvailable(
      booking.room,
      booking.checkIn,
      booking.checkOut
    );

    if (!isAvailable) {
      return res.status(409).json({
        error: 'Room not available for selected dates',
        message: 'La habitación no está disponible para las fechas seleccionadas'
      });
    }

    // Save booking
    const saved = Booking.save(booking);
    if (!saved) {
      return res.status(500).json({ error: 'Error saving booking' });
    }

    // Send email notifications
    try {
      await emailService.sendBookingRequestToGuest(booking);
      await emailService.sendBookingRequestToAdmin(booking);
    } catch (emailError) {
      console.error('Error sending emails:', emailError);
      // Continue anyway - booking is saved
    }

    res.status(201).json({
      message: 'Booking request created successfully',
      booking: booking.toJSON()
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Error creating booking request' });
  }
});

// Update booking status (admin)
app.patch('/api/bookings/:id/status', async (req, res) => {
  try {
    const { status, reason } = req.body;
    const booking = Booking.getById(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Validate status
    if (!Object.values(STATUS).includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Update status
    booking.status = status;
    booking.updatedAt = new Date().toISOString();

    const saved = Booking.save(booking);
    if (!saved) {
      return res.status(500).json({ error: 'Error updating booking' });
    }

    // Send appropriate email notification
    try {
      if (status === STATUS.CONFIRMED) {
        await emailService.sendBookingConfirmation(booking);
      } else if (status === STATUS.REJECTED) {
        await emailService.sendBookingRejection(booking, reason);
      }
    } catch (emailError) {
      console.error('Error sending email:', emailError);
    }

    res.json({
      message: 'Booking status updated',
      booking: booking.toJSON()
    });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ error: 'Error updating booking status' });
  }
});

// Delete booking (admin)
app.delete('/api/bookings/:id', (req, res) => {
  try {
    const deleted = Booking.delete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ error: 'Error deleting booking' });
  }
});

// Get availability calendar for a room
app.get('/api/availability/:room', (req, res) => {
  try {
    const { room } = req.params;
    const { year, month } = req.query;

    // Validate room
    if (!Object.values(ROOMS).includes(room)) {
      return res.status(400).json({ error: 'Invalid room' });
    }

    // Validate year and month
    const currentYear = year ? parseInt(year) : new Date().getFullYear();
    const currentMonth = month ? parseInt(month) : new Date().getMonth() + 1;

    if (currentMonth < 1 || currentMonth > 12) {
      return res.status(400).json({ error: 'Invalid month' });
    }

    // Get occupied dates for the room
    const occupiedDates = Booking.getOccupiedDates(room, currentYear, currentMonth);

    res.json({
      room,
      year: currentYear,
      month: currentMonth,
      occupiedDates,
      availableDates: [] // Client will calculate this
    });
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({ error: 'Error fetching availability' });
  }
});

// Get availability for all rooms for a specific month
app.get('/api/availability', (req, res) => {
  try {
    const { year, month } = req.query;

    const currentYear = year ? parseInt(year) : new Date().getFullYear();
    const currentMonth = month ? parseInt(month) : new Date().getMonth() + 1;

    if (currentMonth < 1 || currentMonth > 12) {
      return res.status(400).json({ error: 'Invalid month' });
    }

    const availability = {};

    Object.values(ROOMS).forEach(room => {
      availability[room] = Booking.getOccupiedDates(room, currentYear, currentMonth);
    });

    res.json({
      year: currentYear,
      month: currentMonth,
      availability
    });
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({ error: 'Error fetching availability' });
  }
});

// Check if specific dates are available
app.post('/api/availability/check', (req, res) => {
  try {
    const { room, checkIn, checkOut } = req.body;

    if (!room || !checkIn || !checkOut) {
      return res.status(400).json({ error: 'Room, checkIn and checkOut are required' });
    }

    if (!Object.values(ROOMS).includes(room)) {
      return res.status(400).json({ error: 'Invalid room' });
    }

    const isAvailable = Booking.isAvailable(room, checkIn, checkOut);

    res.json({
      room,
      checkIn,
      checkOut,
      available: isAvailable
    });
  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({ error: 'Error checking availability' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Casona Belga AI Chatbot Backend running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`💬 Chat endpoint: http://localhost:${PORT}/api/chat`);

  if (!process.env.GEMINI_API_KEY) {
    console.warn('⚠️  WARNING: GEMINI_API_KEY not found in environment variables');
    console.warn('   Please create a .env file with your Gemini API key');
  }
});

module.exports = app;
