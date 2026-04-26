/**
 * ═══════════════════════════════════════════════════════
 * 🦉 LinguaAI - Authentication Module
 * ═══════════════════════════════════════════════════════
 * 
 * Handles: Login, Signup, Theme, UI Interactions
 * Version: 2.0 - Modular & Accessible
 */

(function() {
  'use strict';

  // ═══════════════════════════════════════════════════════
  // 🔧 CONFIGURATION
  // ═══════════════════════════════════════════════════════
  const CONFIG = {
    API_BASE: '/api', // Change to your actual API endpoint
    FLAGS: [
      'flag-kurdistan', 'flag-nl', 'flag-usa', 'flag-uk',
      'flag-de', 'flag-fr', 'flag-tr', 'flag-iq',
      'flag-be', 'flag-se'
    ],
    STORAGE_KEYS: {
      THEME: 'lingua_theme',
      USER: 'lingua_user',
      REMEMBER: 'lingua_remember'
    }
  };

  // ═══════════════════════════════════════════════════════
  // 🎨 UI HELPERS
  // ═══════════════════════════════════════════════════════
  const UI = {
    /** Show/hide loading overlay */
    setLoading: (loading) => {
      const overlay = document.getElementById('loadingOverlay');
      if (!overlay) return;
      overlay.hidden = !loading;
      document.body.style.overflow = loading ? 'hidden' : '';
    },

    /** Show toast notification */
    showToast: (message, type = 'info', duration = 4000) => {
      const container = document.getElementById('toastContainer');
      if (!container) return alert(message); // Fallback

      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.setAttribute('role', 'alert');
      
      const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
      };

      toast.innerHTML = `
        <i class="fas ${icons[type] || icons.info}" aria-hidden="true"></i>
        <span>${message}</span>
        <button class="toast-close" aria-label="Sluit melding">&times;</button>
      `;

      container.appendChild(toast);

      // Auto remove
      const timer = setTimeout(() => toast.remove(), duration);

      // Manual close
      toast.querySelector('.toast-close')?.addEventListener('click', () => {
        clearTimeout(timer);
        toast.remove();
      });

      // Remove on animation end
      toast.addEventListener('animationend', (e) => {
        if (e.animationName.includes('fadeOut')) toast.remove();
      });
    },

    /** Generate floating flags background */
    generateFlags: () => {
      const container = document.getElementById('flagsContainer');
      if (!container) return;

      const count = window.innerWidth < 768 ? 12 : 24;
      
      for (let i = 0; i < count; i++) {
        const flag = document.createElement('div');
        flag.className = `flag ${CONFIG.FLAGS[i % CONFIG.FLAGS.length]}`;
        flag.style.cssText = `
          left: ${Math.random() * 90}%;
          top: ${Math.random() * 90}%;
          animation-delay: ${Math.random() * 20}s;
          animation-duration: ${15 + Math.random() * 15}s;
          transform: scale(${0.6 + Math.random() * 0.8});
        `;
        container.appendChild(flag);
      }
    },

    /** Generate floating particles */
    generateParticles: () => {
      const container = document.getElementById('particles');
      if (!container) return;

      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
          left: ${Math.random() * 100}%;
          animation-delay: ${Math.random() * 15}s;
          animation-duration: ${10 + Math.random() * 20}s;
          width: ${2 + Math.random() * 6}px;
          height: ${2 + Math.random() * 6}px;
        `;
        container.appendChild(particle);
      }
    }
  };

  // ═══════════════════════════════════════════════════════
  // 🔐 AUTHENTICATION LOGIC
  // ═══════════════════════════════════════════════════════
  const Auth = {
    /** Check if user is logged in */
    isAuthenticated: () => {
      try {
        const user = localStorage.getItem(CONFIG.STORAGE_KEYS.USER);
        return user ? JSON.parse(user) : null;
      } catch {
        return null;
      }
    },

    /** Login user */
    login: async (email, password, remember = false) => {
      // 🔧 Replace with real API call:
      // const response = await fetch(`${CONFIG.API_BASE}/auth/login`, { ... });
      
      // Demo simulation:
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Validate (demo)
      if (!email.includes('@') || password.length < 8) {
        throw new Error('Ongeldige inloggegevens');
      }

      const user = {
        id: crypto.randomUUID?.() || Date.now().toString(36),
        email,
        name: email.split('@')[0],
        role: 'user',
        createdAt: new Date().toISOString()
      };

      if (remember) {
        localStorage.setItem(CONFIG.STORAGE_KEYS.REMEMBER, 'true');
      }
      
      localStorage.setItem(CONFIG.STORAGE_KEYS.USER, JSON.stringify(user));
      return user;
    },

    /** Register new user */
    register: async (name, email, password) => {
      // 🔧 Replace with real API call:
      // const response = await fetch(`${CONFIG.API_BASE}/auth/register`, { ... });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Basic validation
      if (name.length < 2) throw new Error('Naam is te kort');
      if (!email.includes('@')) throw new Error('Ongeldig e-mailadres');
      if (password.length < 8) throw new Error('Wachtwoord te kort (min. 8 tekens)');

      const user = {
        id: crypto.randomUUID?.() || Date.now().toString(36),
        email,
        name,
        role: 'user',
        createdAt: new Date().toISOString()
      };

      localStorage.setItem(CONFIG.STORAGE_KEYS.USER, JSON.stringify(user));
      return user;
    },

    /** Google OAuth login */
    loginWithGoogle: async () => {
      // 🔧 Replace with real Google OAuth:
      // window.location.href = `${CONFIG.API_BASE}/auth/google`;
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const user = {
        id: 'google_' + Date.now().toString(36),
        email: 'user@gmail.com',
        name: 'Google Gebruiker',
        provider: 'google',
        role: 'user',
        createdAt: new Date().toISOString()
      };

      localStorage.setItem(CONFIG.STORAGE_KEYS.USER, JSON.stringify(user));
      return user;
    },

    /** Logout user */
    logout: () => {
      localStorage.removeItem(CONFIG.STORAGE_KEYS.USER);
      localStorage.removeItem(CONFIG.STORAGE_KEYS.REMEMBER);
      // 🔧 Optional: Call API to invalidate session
      // await fetch(`${CONFIG.API_BASE}/auth/logout`, { method: 'POST' });
    }
  };

  // ═══════════════════════════════════════════════════════
  // 🎮 CONTROLLER - Handles UI + Auth Integration
  // ═══════════════════════════════════════════════════════
  const Controller = {
    /** Initialize all modules */
    init: () => {
      // Wait for DOM
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', Controller.setup);
      } else {
        Controller.setup();
      }
    },

    /** Setup event listeners and initial state */
    setup: () => {
      // Generate visual elements
      UI.generateFlags();
      UI.generateParticles();

      // Init theme
      Theme.init();

      // Check auth state
      Controller.checkAuthState();

      // Bind events
      Controller.bindEvents();
    },

    /** Check if user is logged in and show appropriate view */
    checkAuthState: () => {
      const user = Auth.isAuthenticated();
      const authView = document.getElementById('authView');
      const loggedInView = document.getElementById('loggedInView');

      if (user && authView && loggedInView) {
        authView.hidden = true;
        loggedInView.hidden = false;
        Controller.updateLoggedInView(user);
      }
    },

    /** Update logged in view with user data */
    updateLoggedInView: (user) => {
      const nameEl = document.getElementById('userNameDisplay');
      const emailEl = document.getElementById('userEmailDisplay');
      
      if (nameEl) nameEl.textContent = user.name || 'Gebruiker';
      if (emailEl) emailEl.textContent = user.email || '';
    },

    /** Bind all event listeners */
    bindEvents: () => {
      // Theme toggle
      document.getElementById('themeToggle')?.addEventListener('click', Theme.toggle);

      // Tab switching
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => Controller.switchTab(e.currentTarget.dataset.tab));
      });

      // Password visibility toggle
      document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const targetId = e.currentTarget.dataset.target;
          Controller.togglePassword(targetId, e.currentTarget.querySelector('i'));
        });
      });

      // Custom checkbox
      document.querySelector('.custom-checkbox')?.addEventListener('click', (e) => {
        e.preventDefault();
        Controller.toggleCheckbox(e.currentTarget);
      });

      // Form submissions
      document.getElementById('loginForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        Controller.handleLogin();
      });

      document.getElementById('signupForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        Controller.handleSignup();
      });

      // Social login
      document.getElementById('googleBtn')?.addEventListener('click', Controller.handleGoogleLogin);

      // Logout
      document.getElementById('logoutBtn')?.addEventListener('click', Controller.handleLogout);

      // Start learning
      document.getElementById('startLearningBtn')?.addEventListener('click', () => {
        UI.showToast('🚀 Doorverwijzen naar lesomgeving...', 'success');
        // window.location.href = '/learn';
      });

      // Forgot password
      document.getElementById('forgotLink')?.addEventListener('click', (e) => {
        e.preventDefault();
        UI.showToast('📧 Reset link verzonden naar je e-mail!', 'success');
      });

      // Keyboard support for custom checkbox
      document.querySelector('.custom-checkbox')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          Controller.toggleCheckbox(e.currentTarget);
        }
      });
    },

    /** Switch between login/signup tabs */
    switchTab: (tab) => {
      // Update tab buttons
      document.querySelectorAll('.tab-btn').forEach(btn => {
        const isActive = btn.dataset.tab === tab;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive);
      });

      // Update form sections
      document.querySelectorAll('.form-section').forEach(form => {
        const isActive = form.id === tab + 'Form';
        form.classList.toggle('active', isActive);
        form.setAttribute('aria-hidden', !isActive);
      });
    },

    /** Toggle password visibility */
    togglePassword: (inputId, icon) => {
      const input = document.getElementById(inputId);
      if (!input || !icon) return;

      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      icon.className = `fas fa-${isPassword ? 'eye-slash' : 'eye'}`;
      input.focus();
    },

    /** Toggle custom checkbox */
    toggleCheckbox: (checkboxEl) => {
      checkboxEl.classList.toggle('checked');
      const isChecked = checkboxEl.classList.contains('checked');
      checkboxEl.setAttribute('aria-checked', isChecked);
      
      // Sync with hidden input if exists
      const hiddenInput = checkboxEl.closest('label')?.querySelector('input[type="checkbox"]');
      if (hiddenInput) hiddenInput.checked = isChecked;
    },

    /** Handle login form submission */
    handleLogin: async () => {
      const email = document.getElementById('loginEmail')?.value.trim();
      const password = document.getElementById('loginPassword')?.value;
      const remember = document.getElementById('rememberMe')?.checked || false;

      // Validation
      if (!email || !password) {
        UI.showToast('⚠️ Vul alle velden in', 'warning');
        return;
      }

      UI.setLoading(true);

      try {
        const user = await Auth.login(email, password, remember);
        UI.showToast('✅ Succesvol ingelogd!', 'success');
        Controller.updateLoggedInView(user);
        Controller.showLoggedInView();
      } catch (error) {
        console.error('Login error:', error);
        UI.showToast(`❌ ${error.message || 'Inloggen mislukt'}`, 'error');
      } finally {
        UI.setLoading(false);
      }
    },

    /** Handle signup form submission */
    handleSignup: async () => {
      const name = document.getElementById('signupName')?.value.trim();
      const email = document.getElementById('signupEmail')?.value.trim();
      const password = document.getElementById('signupPassword')?.value;
      const confirm = document.getElementById('signupConfirm')?.value;

      // Validation
      if (!name || !email || !password || !confirm) {
        UI.showToast('⚠️ Vul alle velden in', 'warning');
        return;
      }

      if (password !== confirm) {
        UI.showToast('❌ Wachtwoorden komen niet overeen', 'error');
        document.getElementById('signupConfirm')?.focus();
        return;
      }

      // Password strength check (basic)
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        UI.showToast('⚠️ Wachtwoord is niet sterk genoeg', 'warning');
        return;
      }

      UI.setLoading(true);

      try {
        const user = await Auth.register(name, email, password);
        UI.showToast('🎉 Account aangemaakt! Welkom!', 'success');
        Controller.updateLoggedInView(user);
        Controller.showLoggedInView();
      } catch (error) {
        console.error('Signup error:', error);
        UI.showToast(`❌ ${error.message || 'Registratie mislukt'}`, 'error');
      } finally {
        UI.setLoading(false);
      }
    },

    /** Handle Google login */
    handleGoogleLogin: async () => {
      UI.setLoading(true);

      try {
        const user = await Auth.loginWithGoogle();
        UI.showToast('✅ Ingelogd met Google!', 'success');
        Controller.updateLoggedInView(user);
        Controller.showLoggedInView();
      } catch (error) {
        console.error('Google login error:', error);
        UI.showToast('❌ Google login mislukt', 'error');
      } finally {
        UI.setLoading(false);
      }
    },

    /** Handle logout */
    handleLogout: () => {
      UI.setLoading(true);
      
      try {
        Auth.logout();
        UI.showToast('👋 Tot ziens!', 'info');
        Controller.showAuthView();
        
        // Reset forms
        document.querySelectorAll('form').forEach(form => form.reset());
        document.querySelectorAll('.custom-checkbox').forEach(cb => cb.classList.remove('checked'));
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        UI.setLoading(false);
      }
    },

    /** Show logged in view */
    showLoggedInView: () => {
      const authView = document.getElementById('authView');
      const loggedInView = document.getElementById('loggedInView');
      
      if (authView) authView.hidden = true;
      if (loggedInView) loggedInView.hidden = false;
    },

    /** Show auth view (login/signup) */
    showAuthView: () => {
      const authView = document.getElementById('authView');
      const loggedInView = document.getElementById('loggedInView');
      
      if (authView) authView.hidden = false;
      if (loggedInView) loggedInView.hidden = true;
    }
  };

  // ═══════════════════════════════════════════════════════
  // 🌓 THEME MANAGEMENT
  // ═══════════════════════════════════════════════════════
  const Theme = {
    /** Initialize theme from storage or system preference */
    init: () => {
      const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME);
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = saved === 'dark' || (!saved && prefersDark);
      
      Theme.apply(isDark);
    },

    /** Apply theme to document */
    apply: (isDark) => {
      document.body.classList.toggle('light-mode', !isDark);
      document.body.classList.toggle('dark-mode', isDark);
      
      const icon = document.querySelector('#themeToggle i');
      if (icon) {
        icon.className = `fas fa-${isDark ? 'sun' : 'moon'}`;
      }
    },

    /** Toggle theme */
    toggle: () => {
      const isDark = document.body.classList.contains('dark-mode');
      const newTheme = !isDark;
      
      Theme.apply(newTheme);
      localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, newTheme ? 'dark' : 'light');
      
      UI.showToast(`🎨 Thema: ${newTheme ? 'Donker' : 'Licht'}`, 'info', 2000);
    }
  };

  // ═══════════════════════════════════════════════════════
  // 🚀 START APPLICATION
  // ═══════════════════════════════════════════════════════
  Controller.init();

  // Expose for debugging (remove in production)
  if (window.location.hostname === 'localhost') {
    window.LinguaAuth = { Auth, UI, Theme, CONFIG };
  }

})();