/**
 * CASONA BELGA - Scroll Reveal Animations
 * Vanilla JS - No dependencies
 * Respects prefers-reduced-motion
 */

(function() {
  'use strict';

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // If user prefers reduced motion, don't run animations
  if (prefersReducedMotion) {
    // Add the in-view class immediately to all animated elements
    document.addEventListener('DOMContentLoaded', function() {
      const animatedElements = document.querySelectorAll('[data-animate], [data-animate-stagger]');
      animatedElements.forEach(function(el) {
        el.classList.add('in-view');
      });
    });
    return; // Exit early
  }

  // Intersection Observer configuration
  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px 0px -80px 0px', // Trigger slightly before element enters viewport
    threshold: 0.1 // 10% of element must be visible
  };

  // Callback for when elements enter viewport
  function handleIntersection(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        // Add the in-view class to trigger CSS animation
        entry.target.classList.add('in-view');

        // Optional: Stop observing after animation (one-time animation)
        // Comment out the line below if you want animations to repeat on scroll
        observer.unobserve(entry.target);
      }
    });
  }

  // Create the observer
  const observer = new IntersectionObserver(handleIntersection, observerOptions);

  // Initialize when DOM is ready
  function init() {
    // Find all elements with animation attributes
    const animatedElements = document.querySelectorAll('[data-animate], [data-animate-stagger]');

    // Observe each element
    animatedElements.forEach(function(el) {
      observer.observe(el);
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Optional: Add subtle parallax effect to hero section (very subtle, boutique feel)
  function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    let ticking = false;

    function updateParallax() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3; // Slow parallax rate for elegance

      if (hero) {
        hero.style.transform = 'translateY(' + rate + 'px)';
      }

      ticking = false;
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
  }

  // Uncomment to enable parallax (optional, very subtle)
  // initParallax();

})();
