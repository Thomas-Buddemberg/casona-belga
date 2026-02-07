/**
 * EMAIL SERVICE
 * Handles sending booking notifications
 */

const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = null;
    this.adminEmail = process.env.ADMIN_EMAIL || 'casonabelga@gmail.com';
    this.fromEmail = process.env.FROM_EMAIL || 'casonabelga@gmail.com';
    this.setupTransporter();
  }

  setupTransporter() {
    // Using Gmail SMTP (you'll need to enable "App Passwords" in Google Account)
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async sendBookingRequestToGuest(booking) {
    const roomNames = {
      tehuelche: 'Habitación Tehuelche',
      yaganes: 'Habitación Yaganes',
      chonos: 'Habitación Chonos'
    };

    const mailOptions = {
      from: `"Casona Belga" <${this.fromEmail}>`,
      to: booking.guestEmail,
      subject: '✅ Solicitud de Reserva Recibida - Casona Belga',
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2c3e50; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
            .detail-label { font-weight: bold; color: #555; }
            .detail-value { color: #2c3e50; }
            .footer { text-align: center; padding: 20px; color: #777; font-size: 14px; }
            .button { display: inline-block; background: #27ae60; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🛏️ Casona Belga</h1>
              <p>Hotel & Restaurante · Chile Chico, Patagonia</p>
            </div>

            <div class="content">
              <h2>Hola ${booking.guestName},</h2>
              <p>Gracias por tu interés en hospedarte en Casona Belga. Hemos recibido tu solicitud de reserva y la estamos revisando.</p>

              <div class="booking-details">
                <h3>📋 Detalles de tu Solicitud</h3>
                <div class="detail-row">
                  <span class="detail-label">ID de Reserva:</span>
                  <span class="detail-value">${booking.id}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Habitación:</span>
                  <span class="detail-value">${roomNames[booking.room]}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Check-in:</span>
                  <span class="detail-value">${this.formatDate(booking.checkIn)}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Check-out:</span>
                  <span class="detail-value">${this.formatDate(booking.checkOut)}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Huéspedes:</span>
                  <span class="detail-value">${booking.guests} persona(s)</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Total:</span>
                  <span class="detail-value"><strong>$${booking.totalPrice.toLocaleString('es-CL')} CLP</strong></span>
                </div>
              </div>

              <p><strong>⏰ ¿Qué sigue?</strong></p>
              <ul>
                <li>Revisaremos tu solicitud en las próximas horas</li>
                <li>Te confirmaremos la disponibilidad por email</li>
                <li>Una vez confirmada, te enviaremos los detalles de pago</li>
              </ul>

              <p>Si tienes alguna pregunta urgente, no dudes en contactarnos por WhatsApp:</p>
              <a href="https://wa.me/message/TSCZUHZY7LTVJ1" class="button">💬 Contactar por WhatsApp</a>

              <p><strong>📞 Contacto:</strong><br>
              Teléfono: +56 9 9824 4016<br>
              Email: casonabelga@gmail.com</p>

              <p>¡Esperamos recibirte pronto en la Patagonia!</p>
              <p>Saludos,<br><strong>Equipo Casona Belga</strong></p>
            </div>

            <div class="footer">
              <p>Camino Internacional s/n, Chile Chico, Región de Aysén, Chile</p>
              <p>
                <a href="https://www.casonabelga.cl">www.casonabelga.cl</a> ·
                <a href="https://www.instagram.com/casonabelga">Instagram</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('✅ Guest notification sent to:', booking.guestEmail);
      return true;
    } catch (error) {
      console.error('❌ Error sending guest email:', error);
      return false;
    }
  }

  async sendBookingRequestToAdmin(booking) {
    const roomNames = {
      tehuelche: 'Habitación Tehuelche',
      yaganes: 'Habitación Yaganes',
      chonos: 'Habitación Chonos'
    };

    const mailOptions = {
      from: `"Casona Belga Reservas" <${this.fromEmail}>`,
      to: this.adminEmail,
      subject: `🔔 Nueva Solicitud de Reserva - ${roomNames[booking.room]}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #e74c3c; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
            .detail-label { font-weight: bold; color: #555; }
            .detail-value { color: #2c3e50; }
            .button { display: inline-block; background: #27ae60; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
            .button-reject { background: #e74c3c; }
            .actions { text-align: center; margin: 30px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔔 Nueva Solicitud de Reserva</h1>
            </div>

            <div class="content">
              <h2>Detalles de la Reserva</h2>

              <div class="booking-details">
                <div class="detail-row">
                  <span class="detail-label">ID:</span>
                  <span class="detail-value">${booking.id}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Habitación:</span>
                  <span class="detail-value"><strong>${roomNames[booking.room]}</strong></span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Check-in:</span>
                  <span class="detail-value">${this.formatDate(booking.checkIn)}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Check-out:</span>
                  <span class="detail-value">${this.formatDate(booking.checkOut)}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Huéspedes:</span>
                  <span class="detail-value">${booking.guests} persona(s)</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Total:</span>
                  <span class="detail-value"><strong>$${booking.totalPrice.toLocaleString('es-CL')} CLP</strong></span>
                </div>
              </div>

              <h3>👤 Datos del Huésped</h3>
              <div class="booking-details">
                <div class="detail-row">
                  <span class="detail-label">Nombre:</span>
                  <span class="detail-value">${booking.guestName}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Email:</span>
                  <span class="detail-value"><a href="mailto:${booking.guestEmail}">${booking.guestEmail}</a></span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Teléfono:</span>
                  <span class="detail-value"><a href="tel:${booking.guestPhone}">${booking.guestPhone}</a></span>
                </div>
                ${booking.comments ? `
                <div class="detail-row">
                  <span class="detail-label">Comentarios:</span>
                  <span class="detail-value">${booking.comments}</span>
                </div>
                ` : ''}
              </div>

              <div class="actions">
                <p><strong>Gestiona esta reserva desde el panel admin:</strong></p>
                <a href="http://localhost:3000/admin" class="button">🔐 Ir al Panel Admin</a>
              </div>

              <p><small>Recibido el: ${new Date(booking.createdAt).toLocaleString('es-CL')}</small></p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('✅ Admin notification sent');
      return true;
    } catch (error) {
      console.error('❌ Error sending admin email:', error);
      return false;
    }
  }

  async sendBookingConfirmation(booking) {
    const roomNames = {
      tehuelche: 'Habitación Tehuelche',
      yaganes: 'Habitación Yaganes',
      chonos: 'Habitación Chonos'
    };

    const mailOptions = {
      from: `"Casona Belga" <${this.fromEmail}>`,
      to: booking.guestEmail,
      subject: '🎉 ¡Reserva Confirmada! - Casona Belga',
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #27ae60; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
            .detail-label { font-weight: bold; color: #555; }
            .detail-value { color: #2c3e50; }
            .highlight { background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #777; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 ¡Tu Reserva está Confirmada!</h1>
            </div>

            <div class="content">
              <h2>Hola ${booking.guestName},</h2>
              <p>¡Excelentes noticias! Tu reserva en Casona Belga ha sido confirmada. Estamos emocionados de recibirte en la Patagonia.</p>

              <div class="booking-details">
                <h3>✅ Confirmación de Reserva</h3>
                <div class="detail-row">
                  <span class="detail-label">Código de Reserva:</span>
                  <span class="detail-value"><strong>${booking.id}</strong></span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Habitación:</span>
                  <span class="detail-value">${roomNames[booking.room]}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Check-in:</span>
                  <span class="detail-value">${this.formatDate(booking.checkIn)} a las 15:00</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Check-out:</span>
                  <span class="detail-value">${this.formatDate(booking.checkOut)} a las 11:00</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Huéspedes:</span>
                  <span class="detail-value">${booking.guests} persona(s)</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Total a Pagar:</span>
                  <span class="detail-value"><strong>$${booking.totalPrice.toLocaleString('es-CL')} CLP</strong></span>
                </div>
              </div>

              <div class="highlight">
                <h3>💰 Información de Pago</h3>
                <p>Por favor, contáctanos por WhatsApp para coordinar el pago y confirmar los detalles finales:</p>
                <p><strong>WhatsApp:</strong> <a href="https://wa.me/message/TSCZUHZY7LTVJ1">+56 9 9824 4016</a></p>
              </div>

              <h3>📋 Información Importante</h3>
              <ul>
                <li><strong>Check-in:</strong> 15:00 hrs</li>
                <li><strong>Check-out:</strong> 11:00 hrs</li>
                <li><strong>Late Checkout:</strong> Disponible hasta las 14:00 si almuerzas en nuestro restaurante</li>
                <li><strong>Desayuno:</strong> Incluido (Lun-Dom 7:30-10:00)</li>
                <li><strong>Wi-Fi:</strong> Gratis en toda la propiedad</li>
                <li><strong>Estacionamiento:</strong> Disponible sin costo</li>
              </ul>

              <h3>🚗 Cómo Llegar</h3>
              <p><strong>Dirección:</strong> Camino Internacional s/n, Chile Chico, Región de Aysén</p>
              <p>Si viajas en ferry desde Argentina, recuerda que las condiciones climáticas pueden afectar los horarios.</p>

              <h3>📞 Contacto</h3>
              <p>
                <strong>Teléfono:</strong> +56 9 9824 4016<br>
                <strong>Email:</strong> casonabelga@gmail.com<br>
                <strong>WhatsApp:</strong> <a href="https://wa.me/message/TSCZUHZY7LTVJ1">Enviar mensaje</a>
              </p>

              <p><strong>¡Nos vemos pronto!</strong></p>
              <p>Equipo Casona Belga 🏔️</p>
            </div>

            <div class="footer">
              <p>Descansa bien, come mejor.</p>
              <p>
                <a href="https://www.casonabelga.cl">www.casonabelga.cl</a> ·
                <a href="https://www.instagram.com/casonabelga">@casonabelga</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('✅ Confirmation email sent to:', booking.guestEmail);
      return true;
    } catch (error) {
      console.error('❌ Error sending confirmation email:', error);
      return false;
    }
  }

  async sendBookingRejection(booking, reason = '') {
    const roomNames = {
      tehuelche: 'Habitación Tehuelche',
      yaganes: 'Habitación Yaganes',
      chonos: 'Habitación Chonos'
    };

    const mailOptions = {
      from: `"Casona Belga" <${this.fromEmail}>`,
      to: booking.guestEmail,
      subject: 'Información sobre tu Solicitud de Reserva - Casona Belga',
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #e74c3c; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #3498db; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #777; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Casona Belga</h1>
            </div>

            <div class="content">
              <h2>Hola ${booking.guestName},</h2>
              <p>Gracias por tu interés en hospedarte en Casona Belga.</p>
              <p>Lamentablemente, no podemos confirmar tu reserva para las fechas solicitadas (${this.formatDate(booking.checkIn)} - ${this.formatDate(booking.checkOut)}) en ${roomNames[booking.room]}.</p>

              ${reason ? `<p><strong>Motivo:</strong> ${reason}</p>` : ''}

              <p>Sin embargo, nos encantaría ayudarte a encontrar una alternativa:</p>
              <ul>
                <li>Podemos ofrecerte otras fechas disponibles</li>
                <li>Podemos sugerir otra habitación si está disponible</li>
                <li>Podemos ayudarte con recomendaciones de alojamiento en la zona</li>
              </ul>

              <p>Por favor, contáctanos por WhatsApp para que podamos ayudarte:</p>
              <a href="https://wa.me/message/TSCZUHZY7LTVJ1" class="button">💬 Contactar por WhatsApp</a>

              <p><strong>📞 Contacto:</strong><br>
              Teléfono: +56 9 9824 4016<br>
              Email: casonabelga@gmail.com</p>

              <p>Esperamos poder recibirte pronto en la Patagonia.</p>
              <p>Saludos cordiales,<br><strong>Equipo Casona Belga</strong></p>
            </div>

            <div class="footer">
              <p><a href="https://www.casonabelga.cl">www.casonabelga.cl</a></p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('✅ Rejection email sent to:', booking.guestEmail);
      return true;
    } catch (error) {
      console.error('❌ Error sending rejection email:', error);
      return false;
    }
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-CL', options);
  }
}

module.exports = new EmailService();
