/**
 * THEME TOGGLE - Dark/Light Mode
 * Casona Belga - Theme switcher with localStorage persistence
 *
 * Features:
 * - Respects prefers-color-scheme
 * - localStorage persistence
 * - Smooth transitions
 * - Keyboard accessible
 * - ARIA compliant
 */

(function() {
  'use strict';

  // Theme configuration
  const THEME_KEY = 'casona-belga-theme';
  const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    AUTO: 'auto'
  };

  class ThemeToggle {
    constructor() {
      this.currentTheme = this.getStoredTheme() || THEMES.AUTO;
      this.toggleButton = null;
      this.init();
    }

    init() {
      // Apply theme immediately (before page render)
      this.applyTheme(this.currentTheme);

      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.setup());
      } else {
        this.setup();
      }
    }

    setup() {
      this.createToggleButton();
      this.attachEventListeners();
      this.updateButtonState();
    }

    /**
     * Create theme toggle button in header
     */
    createToggleButton() {
      // Find header navigation
      const nav = document.querySelector('.nav') || document.querySelector('header nav');

      if (!nav) {
        console.warn('Theme Toggle: Navigation not found');
        return;
      }

      // Create toggle button
      const button = document.createElement('button');
      button.className = 'theme-toggle';
      button.setAttribute('aria-label', 'Cambiar tema de color');
      button.setAttribute('title', 'Cambiar tema');
      button.innerHTML = `
        <svg class="theme-icon theme-icon--light" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        <svg class="theme-icon theme-icon--dark" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;

      // Insert before first nav item or at the end
      const firstNavItem = nav.querySelector('a');
      if (firstNavItem) {
        nav.insertBefore(button, firstNavItem);
      } else {
        nav.appendChild(button);
      }

      this.toggleButton = button;
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
      if (!this.toggleButton) return;

      // Click event
      this.toggleButton.addEventListener('click', () => {
        this.toggleTheme();
      });

      // Keyboard event (Space or Enter)
      this.toggleButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleTheme();
        }
      });

      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        if (this.currentTheme === THEMES.AUTO) {
          this.applyTheme(THEMES.AUTO);
          this.updateButtonState();
        }
      });
    }

    /**
     * Toggle between themes
     */
    toggleTheme() {
      // Cycle: auto -> light -> dark -> auto
      const themeOrder = [THEMES.AUTO, THEMES.LIGHT, THEMES.DARK];
      const currentIndex = themeOrder.indexOf(this.currentTheme);
      const nextIndex = (currentIndex + 1) % themeOrder.length;

      this.currentTheme = themeOrder[nextIndex];
      this.applyTheme(this.currentTheme);
      this.storeTheme(this.currentTheme);
      this.updateButtonState();

      // Announce to screen readers
      this.announceThemeChange();
    }

    /**
     * Apply theme to document
     */
    applyTheme(theme) {
      const root = document.documentElement;

      // Remove existing theme classes
      root.classList.remove('theme-light', 'theme-dark', 'theme-auto');

      if (theme === THEMES.AUTO) {
        // Use system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.add('theme-auto');
        root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
      } else {
        // Use explicit theme
        root.classList.add(`theme-${theme}`);
        root.setAttribute('data-theme', theme);
      }
    }

    /**
     * Update button state
     */
    updateButtonState() {
      if (!this.toggleButton) return;

      const actualTheme = this.getActualTheme();

      // Update button appearance
      this.toggleButton.classList.toggle('theme-toggle--light', actualTheme === 'light');
      this.toggleButton.classList.toggle('theme-toggle--dark', actualTheme === 'dark');

      // Update aria-label
      let label = 'Cambiar tema';
      if (this.currentTheme === THEMES.AUTO) {
        label = `Tema automático (${actualTheme === 'dark' ? 'oscuro' : 'claro'})`;
      } else if (this.currentTheme === THEMES.LIGHT) {
        label = 'Tema claro activo';
      } else {
        label = 'Tema oscuro activo';
      }
      this.toggleButton.setAttribute('aria-label', label);
      this.toggleButton.setAttribute('title', label);
    }

    /**
     * Get actual applied theme (resolves AUTO)
     */
    getActualTheme() {
      return document.documentElement.getAttribute('data-theme');
    }

    /**
     * Store theme preference in localStorage
     */
    storeTheme(theme) {
      try {
        localStorage.setItem(THEME_KEY, theme);
      } catch (e) {
        console.warn('Theme Toggle: localStorage not available', e);
      }
    }

    /**
     * Get stored theme preference
     */
    getStoredTheme() {
      try {
        return localStorage.getItem(THEME_KEY);
      } catch (e) {
        console.warn('Theme Toggle: localStorage not available', e);
        return null;
      }
    }

    /**
     * Announce theme change to screen readers
     */
    announceThemeChange() {
      const announcement = document.createElement('div');
      announcement.setAttribute('role', 'status');
      announcement.setAttribute('aria-live', 'polite');
      announcement.className = 'sr-only';

      const actualTheme = this.getActualTheme();
      const themeText = actualTheme === 'dark' ? 'oscuro' : 'claro';
      const modeText = this.currentTheme === THEMES.AUTO ? 'automático' : '';

      announcement.textContent = `Tema ${modeText} ${themeText} activado`;

      document.body.appendChild(announcement);

      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    }
  }

  // Initialize theme toggle
  window.CasonaBelgaTheme = new ThemeToggle();

  // Expose API for manual control
  window.CasonaBelgaTheme.setTheme = function(theme) {
    if (Object.values(THEMES).includes(theme)) {
      this.currentTheme = theme;
      this.applyTheme(theme);
      this.storeTheme(theme);
      this.updateButtonState();
    }
  };

  window.CasonaBelgaTheme.getTheme = function() {
    return this.currentTheme;
  };

  window.CasonaBelgaTheme.getActualTheme = function() {
    return this.getActualTheme();
  };

})();

// Prevent flash of wrong theme on page load
(function() {
  const THEME_KEY = 'casona-belga-theme';
  const storedTheme = localStorage.getItem(THEME_KEY);

  if (storedTheme && storedTheme !== 'auto') {
    document.documentElement.setAttribute('data-theme', storedTheme);
    document.documentElement.classList.add(`theme-${storedTheme}`);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }
})();
