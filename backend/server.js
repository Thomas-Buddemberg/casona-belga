/**
 * CASONA BELGA - AI CHATBOT BACKEND
 * Express server with Google Gemini AI integration
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const knowledgeBase = require('./knowledge-base');

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
      model: 'gemini-pro',
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
