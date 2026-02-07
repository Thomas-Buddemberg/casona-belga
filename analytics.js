/**
 * GOOGLE ANALYTICS 4 TRACKING
 * Casona Belga - Event tracking and conversion measurement
 *
 * SETUP INSTRUCTIONS:
 * 1. Create Google Analytics 4 property at https://analytics.google.com
 * 2. Get your Measurement ID (format: G-XXXXXXXXXX)
 * 3. Replace 'G-XXXXXXXXXX' below with your actual ID
 * 4. Deploy to production
 */

// Configuration
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Replace with actual GA4 ID

// Initialize Google Analytics 4
(function() {
  // Check if already loaded
  if (window.gtag) return;

  // Load gtag.js
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    // Privacy settings
    'anonymize_ip': true,
    'cookie_flags': 'SameSite=None;Secure',

    // Custom parameters
    'custom_map': {
      'dimension1': 'page_category',
      'dimension2': 'user_type'
    }
  });
})();

// Event Tracking Functions

/**
 * Track CTA clicks
 */
function trackCTAClick(ctaName, ctaLocation) {
  if (window.gtag) {
    gtag('event', 'cta_click', {
      'event_category': 'engagement',
      'event_label': ctaName,
      'cta_location': ctaLocation,
      'value': 1
    });
  }
}

/**
 * Track form submissions
 */
function trackFormSubmission(formName, formType) {
  if (window.gtag) {
    gtag('event', 'form_submission', {
      'event_category': 'conversion',
      'event_label': formName,
      'form_type': formType,
      'value': 5
    });
  }
}

/**
 * Track booking funnel steps
 */
function trackBookingStep(step, stepName) {
  if (window.gtag) {
    gtag('event', 'booking_step', {
      'event_category': 'booking_funnel',
      'event_label': stepName,
      'funnel_step': step,
      'value': step
    });
  }
}

/**
 * Track external link clicks
 */
function trackExternalLink(linkUrl, linkText) {
  if (window.gtag) {
    gtag('event', 'click', {
      'event_category': 'outbound',
      'event_label': linkText,
      'link_url': linkUrl,
      'transport_type': 'beacon'
    });
  }
}

/**
 * Track search queries (for 404 page)
 */
function trackSearch(searchTerm, searchLocation) {
  if (window.gtag) {
    gtag('event', 'search', {
      'search_term': searchTerm,
      'search_location': searchLocation
    });
  }
}

/**
 * Track scroll depth
 */
function trackScrollDepth() {
  const scrollPercentages = [25, 50, 75, 90];
  let tracked = [];

  window.addEventListener('scroll', function() {
    const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);

    scrollPercentages.forEach(percentage => {
      if (scrollPercent >= percentage && !tracked.includes(percentage)) {
        tracked.push(percentage);

        if (window.gtag) {
          gtag('event', 'scroll', {
            'event_category': 'engagement',
            'event_label': `${percentage}%`,
            'value': percentage
          });
        }
      }
    });
  });
}

/**
 * Track time on page
 */
function trackTimeOnPage() {
  const startTime = Date.now();

  window.addEventListener('beforeunload', function() {
    const timeSpent = Math.round((Date.now() - startTime) / 1000); // seconds

    if (window.gtag && timeSpent > 10) { // Only track if > 10 seconds
      gtag('event', 'timing_complete', {
        'name': 'page_read_time',
        'value': timeSpent,
        'event_category': 'engagement'
      });
    }
  });
}

// Auto-initialize tracking
document.addEventListener('DOMContentLoaded', function() {

  // Track all CTA buttons
  document.querySelectorAll('.btn-hero, .btn.primary, .form-submit').forEach(button => {
    button.addEventListener('click', function(e) {
      const ctaText = this.textContent.trim();
      const ctaLocation = this.closest('section')?.className || 'unknown';
      trackCTAClick(ctaText, ctaLocation);
    });
  });

  // Track external links
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const url = this.href;
      const text = this.textContent.trim() || this.getAttribute('aria-label') || 'External Link';
      trackExternalLink(url, text);
    });
  });

  // Track newsletter signups
  document.getElementById('newsletter-form')?.addEventListener('submit', function(e) {
    trackFormSubmission('Newsletter Signup', 'newsletter');
  });

  // Track contact form
  document.getElementById('contact-form')?.addEventListener('submit', function(e) {
    trackFormSubmission('Contact Form', 'contact');
  });

  // Track booking form (if exists)
  document.getElementById('booking-form')?.addEventListener('submit', function(e) {
    trackFormSubmission('Booking Request', 'booking');
  });

  // Track scroll depth
  trackScrollDepth();

  // Track time on page
  trackTimeOnPage();

  // Track WhatsApp clicks
  document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
      trackCTAClick('WhatsApp', 'WhatsApp Link');
    });
  });
});

// Enhanced E-commerce tracking (for future booking system)
function trackBookingConversion(bookingData) {
  if (window.gtag) {
    gtag('event', 'purchase', {
      'transaction_id': bookingData.id,
      'value': bookingData.totalPrice,
      'currency': 'CLP',
      'items': [{
        'item_id': bookingData.room,
        'item_name': `Habitación ${bookingData.room}`,
        'item_category': 'accommodation',
        'quantity': bookingData.nights,
        'price': bookingData.pricePerNight
      }]
    });
  }
}

// Expose functions globally
window.CasonaBelgaAnalytics = {
  trackCTAClick,
  trackFormSubmission,
  trackBookingStep,
  trackExternalLink,
  trackSearch,
  trackBookingConversion
};

// Debug mode (only in development)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  console.log('🔍 Analytics Debug Mode');
  console.log('📊 GA4 Measurement ID:', GA_MEASUREMENT_ID);
  console.log('⚠️ Remember to replace with actual GA4 ID in production');
}
