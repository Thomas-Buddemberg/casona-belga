/**
 * GALLERY & LIGHTBOX COMPONENT
 * Professional image gallery with lightbox functionality
 * Features: lazy loading, keyboard navigation, touch gestures
 */

class Gallery {
  constructor(selector, options = {}) {
    this.gallery = document.querySelector(selector);
    if (!this.gallery) return;

    this.options = {
      lazyLoad: true,
      lightbox: true,
      captions: true,
      keyboard: true,
      ...options
    };

    this.images = [];
    this.currentIndex = 0;
    this.lightbox = null;

    this.init();
  }

  init() {
    this.setupGallery();

    if (this.options.lightbox) {
      this.createLightbox();
      this.setupLightboxEvents();
    }

    if (this.options.keyboard) {
      this.setupKeyboardNav();
    }
  }

  setupGallery() {
    const items = this.gallery.querySelectorAll('.gallery-item');

    items.forEach((item, index) => {
      const img = item.querySelector('img');
      const caption = img.getAttribute('alt') || '';
      const fullSrc = img.getAttribute('data-full') || img.getAttribute('src');

      this.images.push({
        thumb: img.getAttribute('src'),
        full: fullSrc,
        caption: caption
      });

      // Lazy loading
      if (this.options.lazyLoad) {
        this.setupLazyLoading(img);
      }

      // Click handler
      if (this.options.lightbox) {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          this.openLightbox(index);
        });

        // Accessibility
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.setAttribute('aria-label', `Ver imagen: ${caption}`);

        // Keyboard support for gallery items
        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.openLightbox(index);
          }
        });
      }
    });
  }

  setupLazyLoading(img) {
    // Use Intersection Observer for lazy loading
    if ('IntersectionObserver' in window) {
      const imgObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const lazyImg = entry.target;
            const src = lazyImg.getAttribute('data-src');

            if (src) {
              lazyImg.src = src;
              lazyImg.removeAttribute('data-src');
              lazyImg.classList.add('loaded');
            }

            observer.unobserve(lazyImg);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      imgObserver.observe(img);
    } else {
      // Fallback for browsers without Intersection Observer
      const src = img.getAttribute('data-src');
      if (src) {
        img.src = src;
      }
    }
  }

  createLightbox() {
    const lightboxHTML = `
      <div class="lightbox" role="dialog" aria-modal="true" aria-label="Galería de imágenes">
        <div class="lightbox-content">
          <button class="lightbox-close" aria-label="Cerrar galería">&times;</button>
          <button class="lightbox-nav lightbox-nav--prev" aria-label="Imagen anterior">‹</button>
          <button class="lightbox-nav lightbox-nav--next" aria-label="Imagen siguiente">›</button>
          <img class="lightbox-image" src="" alt="" />
          <div class="lightbox-caption"></div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    this.lightbox = document.querySelector('.lightbox');
  }

  setupLightboxEvents() {
    const close = this.lightbox.querySelector('.lightbox-close');
    const prev = this.lightbox.querySelector('.lightbox-nav--prev');
    const next = this.lightbox.querySelector('.lightbox-nav--next');

    close.addEventListener('click', () => this.closeLightbox());
    prev.addEventListener('click', () => this.prevImage());
    next.addEventListener('click', () => this.nextImage());

    // Close on background click
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) {
        this.closeLightbox();
      }
    });

    // Touch gestures
    let touchStartX = 0;
    let touchEndX = 0;

    this.lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    this.lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleGesture();
    });

    const handleGesture = () => {
      const swipeThreshold = 50;
      if (touchStartX - touchEndX > swipeThreshold) {
        this.nextImage();
      }
      if (touchEndX - touchStartX > swipeThreshold) {
        this.prevImage();
      }
    };

    this.handleGesture = handleGesture;
  }

  setupKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      if (!this.lightbox.classList.contains('is-open')) return;

      switch (e.key) {
        case 'Escape':
          this.closeLightbox();
          break;
        case 'ArrowLeft':
          this.prevImage();
          break;
        case 'ArrowRight':
          this.nextImage();
          break;
      }
    });
  }

  openLightbox(index) {
    this.currentIndex = index;
    this.updateLightboxImage();
    this.lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // Trap focus in lightbox
    this.trapFocus();

    // Announce to screen readers
    this.lightbox.setAttribute('aria-hidden', 'false');
  }

  closeLightbox() {
    this.lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    this.lightbox.setAttribute('aria-hidden', 'true');
  }

  updateLightboxImage() {
    const img = this.lightbox.querySelector('.lightbox-image');
    const caption = this.lightbox.querySelector('.lightbox-caption');
    const image = this.images[this.currentIndex];

    img.src = image.full;
    img.alt = image.caption;

    if (this.options.captions && image.caption) {
      caption.textContent = image.caption;
      caption.style.display = 'block';
    } else {
      caption.style.display = 'none';
    }

    // Update navigation button states
    const prev = this.lightbox.querySelector('.lightbox-nav--prev');
    const next = this.lightbox.querySelector('.lightbox-nav--next');

    prev.style.display = this.currentIndex === 0 ? 'none' : 'block';
    next.style.display = this.currentIndex === this.images.length - 1 ? 'none' : 'block';
  }

  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateLightboxImage();
    }
  }

  nextImage() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
      this.updateLightboxImage();
    }
  }

  trapFocus() {
    const focusableElements = this.lightbox.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    this.lightbox.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });

    // Focus first element
    firstElement?.focus();
  }
}

// Auto-initialize galleries
document.addEventListener('DOMContentLoaded', () => {
  // Main gallery
  const mainGallery = document.querySelector('.gallery');
  if (mainGallery) {
    new Gallery('.gallery');
  }

  // Room galleries
  document.querySelectorAll('.room-gallery').forEach(gallery => {
    new Gallery(`#${gallery.id}`);
  });
});

// Export for manual initialization
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Gallery;
}
