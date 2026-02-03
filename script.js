/**
 * CASONA BELGA - Interactive Scripts
 * Vanilla JS - No dependencies
 * Respects prefers-reduced-motion
 */

(function() {
  'use strict';

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ═══════════════════════════════════════════════════════════════
  // SCROLL REVEAL ANIMATIONS
  // ═══════════════════════════════════════════════════════════════

  function initScrollReveal() {
    // If user prefers reduced motion, show all elements immediately
    if (prefersReducedMotion) {
      const animatedElements = document.querySelectorAll('[data-animate], [data-animate-stagger], [data-fade]');
      animatedElements.forEach(function(el) {
        el.classList.add('in-view');
      });
      return;
    }

    // Intersection Observer configuration
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };

    // Callback for when elements enter viewport
    function handleIntersection(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          // Unobserve after animation (one-time only)
          observer.unobserve(entry.target);
        }
      });
    }

    // Create the observer
    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('[data-animate], [data-animate-stagger], [data-fade]');
    animatedElements.forEach(function(el) {
      observer.observe(el);
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // SCROLL HEADER (add shadow on scroll)
  // ═══════════════════════════════════════════════════════════════

  function initScrollHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    let ticking = false;

    function updateHeader() {
      const scrolled = window.pageYOffset > 50;

      if (scrolled) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      ticking = false;
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // FAQ ACCORDION
  // ═══════════════════════════════════════════════════════════════

  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function(item) {
      const question = item.querySelector('.faq-question');

      if (question) {
        question.addEventListener('click', function() {
          // Toggle active class
          const isActive = item.classList.contains('active');

          // Close all other items (optional: remove if you want multiple open)
          faqItems.forEach(function(otherItem) {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
            }
          });

          // Toggle current item
          if (isActive) {
            item.classList.remove('active');
          } else {
            item.classList.add('active');
          }
        });
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // SMOOTH SCROLL TO ANCHORS
  // ═══════════════════════════════════════════════════════════════

  function initSmoothScroll() {
    // Only if user doesn't prefer reduced motion
    if (prefersReducedMotion) return;

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = link.getAttribute('href');

        // Skip if href is just "#"
        if (href === '#') return;

        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // PARALLAX (Very subtle, disabled by default)
  // ═══════════════════════════════════════════════════════════════

  function initParallax() {
    // Disabled by default - uncomment to enable
    return;

    /*
    if (prefersReducedMotion) return;

    const hero = document.querySelector('.hero');
    if (!hero) return;

    let ticking = false;

    function updateParallax() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.25; // Very subtle

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
    */
  }

  // ═══════════════════════════════════════════════════════════════
  // INITIALIZE ALL
  // ═══════════════════════════════════════════════════════════════

  function init() {
    initScrollReveal();
    initScrollHeader();
    initFAQ();
    initSmoothScroll();
    initParallax();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
