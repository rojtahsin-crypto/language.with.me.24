<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>LinguaAI — Welkom</title>
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Lora:ital,wght@0,600;1,500&display=swap" rel="stylesheet">
  
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
  <style>
    /* ═══════════════════════════════════════════════════════
       🎨 JOUW KLEUREN & BASIS
       ═══════════════════════════════════════════════════════ */
    :root {
      /* Light Mode - Jouw Palet */
      --bg: #faf8f3;
      --bg-gradient: linear-gradient(135deg, #faf8f3 0%, #f2ede0 100%);
      --card-bg: rgba(242, 237, 224, 0.75);
      --card-border: rgba(28, 26, 22, 0.12);
      --text: #1c1a16;
      --text-muted: #5a5040;
      --text-light: #9a8e78;
      --accent: #059669;
      --accent-hover: #047857;
      --accent-glow: rgba(5, 150, 105, 0.25);
      --input-bg: rgba(255, 255, 255, 0.8);
      --input-border: rgba(28, 26, 22, 0.15);
      --shadow: 0 8px 32px rgba(28, 26, 22, 0.12);
      --shadow-lg: 0 20px 60px rgba(28, 26, 22, 0.2);
      --blur: blur(12px);
      
      /* Animaties */
      --ease: cubic-bezier(0.4, 0, 0.2, 1);
      --transition: 0.3s var(--ease);
    }

    [data-theme="dark"] {
      /* Dark Mode - Jouw Palet */
      --bg: #131109;
      --bg-gradient: linear-gradient(135deg, #131109 0%, #1c1912 100%);
      --card-bg: rgba(28, 25, 18, 0.85);
      --card-border: rgba(240, 234, 216, 0.1);
      --text: #f0ead8;
      --text-muted: #d4c8a8;
      --text-light: #b8a88a;
      --accent: #10b981;
      --accent-hover: #059669;
      --accent-glow: rgba(16, 185, 129, 0.3);
      --input-bg: rgba(44, 40, 32, 0.6);
      --input-border: rgba(240, 234, 216, 0.15);
      --shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      --shadow-lg: 0 20px 60px rgba(0, 0, 0, 0.6);
      --blur: blur(16px);
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    html, body {
      height: 100%;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      background: var(--bg-gradient);
      color: var(--text);
      transition: background var(--transition), color var(--transition);
      overflow-x: hidden;
    }

    body {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      position: relative;
    }

    /* ═══════════════════════════════════════════════════════
       🚩 ZWEVENDE VLAGGEN ACHTERGROND
       ═══════════════════════════════════════════════════════ */
    .flags-container {
      position: fixed;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
      z-index: 0;
    }

    .floating-flag {
      position: absolute;
      font-size: 2rem;
      opacity: 0.6;
      animation: float 6s ease-in-out infinite, wave 3s ease-in-out infinite;
      filter: drop-shadow(0 2px 8px rgba(0,0,0,0.1));
      transition: transform 0.3s;
    }
    
    [data-theme="dark"] .floating-flag {
      filter: drop-shadow(0 2px 8px rgba(0,0,0,0.4));
    }

    .floating-flag:hover {
      transform: scale(1.3) rotate(5deg);
      opacity: 1;
      z-index: 10;
    }

    /* Speciale Kurdistan vlag - extra glow */
    .floating-flag[data-flag="kurdistan"] {
      animation: float 6s ease-in-out infinite, wave 3s ease-in-out infinite, kurdistanGlow 4s ease-in-out infinite;
      font-size: 2.2rem;
      opacity: 0.8;
    }
    
    @keyframes kurdistanGlow {
      0%, 100% { filter: drop-shadow(0 0 10px rgba(226, 44, 44, 0.4)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.3)); }
      50% { filter: drop-shadow(0 0 20px rgba(226, 44, 44, 0.7)) drop-shadow(0 0 40px rgba(255, 255, 255, 0.5)); }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(3deg); }
    }

    @keyframes wave {
      0%, 100% { transform: translateX(0) rotate(0deg); }
      25% { transform: translateX(5px) rotate(2deg); }
      75% { transform: translateX(-5px) rotate(-2deg); }
    }

    /* Zwevende deeltjes */
    .particles {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 1;
    }
    
    .particle {
      position: absolute;
      width: 4px; height: 4px;
      background: var(--accent);
      border-radius: 50%;
      opacity: 0.3;
      animation: particleFloat 8s ease-in-out infinite;
    }
    
    @keyframes particleFloat {
      0%, 100% { transform: translateY(100vh) scale(0); opacity: 0; }
      10% { opacity: 0.5; }
      90% { opacity: 0.5; }
      100% { transform: translateY(-100px) scale(1); opacity: 0; }
    }

    /* ═══════════════════════════════════════════════════════
       🪟 GLASSMORPHISM CARD
       ═══════════════════════════════════════════════════════ */
    .auth-card {
      position: relative;
      z-index: 10;
      width: 100%;
      max-width: 440px;
      background: var(--card-bg);
      backdrop-filter: var(--blur);
      -webkit-backdrop-filter: var(--blur);
      border: 1px solid var(--card-border);
      border-radius: 24px;
      padding: 2.5rem 2rem;
      box-shadow: var(--shadow-lg);
      animation: cardEnter 0.5s var(--ease) both;
    }
    
    @keyframes cardEnter {
      from { opacity: 0; transform: translateY(30px) scale(0.98); }
      to { opacity: 1; transform: none; }
    }

    /* Theme Toggle */
    .theme-toggle {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      width: 44px; height: 44px;
      border-radius: 50%;
      border: 1px solid var(--card-border);
      background: var(--input-bg);
      color: var(--text);
      font-size: 1.1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all var(--transition);
      z-index: 20;
    }
    .theme-toggle:hover {
      background: var(--accent);
      color: white;
      border-color: var(--accent);
      transform: rotate(15deg);
    }

    /* Logo & Header */
    .auth-header {
      text-align: center;
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--card-border);
    }
    
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }
    
    .logo-icon {
      width: 48px; height: 48px;
      background: linear-gradient(135deg, var(--accent), var(--accent-hover));
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.4rem;
      box-shadow: 0 4px 16px var(--accent-glow);
      animation: pulse 2.5s ease-in-out infinite;
    }
    
    @keyframes pulse {
      0%, 100% { box-shadow: 0 4px 16px var(--accent-glow); }
      50% { box-shadow: 0 6px 24px var(--accent-glow), 0 0 0 4px rgba(5,150,105,0.1); }
    }
    
    .logo-text {
      font-family: 'Lora', Georgia, serif;
      font-size: 1.6rem;
      font-weight: 600;
      color: var(--text);
    }
    
    .logo-text span { color: var(--accent); }
    
    .auth-header h1 {
      font-size: 1.4rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--text);
    }
    
    .auth-header p {
      color: var(--text-muted);
      font-size: 0.95rem;
    }

    /* Form Tabs */
    .form-tabs {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      background: var(--input-bg);
      padding: 0.3rem;
      border-radius: 12px;
      border: 1px solid var(--input-border);
    }
    
    .form-tab {
      flex: 1;
      padding: 0.65rem;
      border: none;
      background: transparent;
      color: var(--text-muted);
      font-weight: 600;
      font-size: 0.9rem;
      border-radius: 10px;
      cursor: pointer;
      transition: all var(--transition);
    }
    
    .form-tab.active {
      background: var(--accent);
      color: white;
      box-shadow: 0 4px 12px var(--accent-glow);
    }
    
    .form-tab:hover:not(.active) {
      color: var(--text);
      background: var(--card-bg);
    }

    /* Forms */
    .auth-form { display: none; animation: formFade 0.3s var(--ease); }
    .auth-form.active { display: block; }
    
    @keyframes formFade {
      from { opacity: 0; transform: translateX(10px); }
      to { opacity: 1; transform: none; }
    }

    .form-group { margin-bottom: 1.25rem; }
    
    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      font-size: 0.9rem;
      color: var(--text);
    }
    
    .input-wrapper {
      position: relative;
    }
    
    .input-wrapper i {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-light);
      font-size: 1rem;
      pointer-events: none;
      transition: color var(--transition);
    }
    
    .form-input {
      width: 100%;
      padding: 0.9rem 1rem 0.9rem 2.75rem;
      background: var(--input-bg);
      border: 1.5px solid var(--input-border);
      border-radius: 12px;
      color: var(--text);
      font-size: 0.95rem;
      transition: all var(--transition);
      outline: none;
    }
    
    .form-input:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 4px var(--accent-glow);
    }
    
    .form-input:focus + i,
    .input-wrapper:focus-within i {
      color: var(--accent);
    }
    
    .form-input::placeholder { color: var(--text-light); }

    /* Password toggle */
    .password-toggle {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--text-light);
      cursor: pointer;
      padding: 0.25rem;
      transition: color var(--transition);
    }
    .password-toggle:hover { color: var(--accent); }

    /* Remember & Forgot */
    .form-extras {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      font-size: 0.85rem;
    }
    
    .remember-me {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-muted);
      cursor: pointer;
    }
    
    .remember-me input {
      width: 16px; height: 16px;
      accent-color: var(--accent);
      cursor: pointer;
    }
    
    .forgot-link {
      color: var(--accent);
      text-decoration: none;
      font-weight: 500;
      transition: opacity var(--transition);
    }
    .forgot-link:hover { opacity: 0.8; text-decoration: underline; }

    /* Submit Button */
    .submit-btn {
      width: 100%;
      padding: 1rem;
      background: linear-gradient(135deg, var(--accent), var(--accent-hover));
      color: white;
      border: none;
      border-radius: 12px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all var(--transition);
      box-shadow: 0 4px 16px var(--accent-glow);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      position: relative;
      overflow: hidden;
    }
    
    .submit-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transform: translateX(-100%);
      transition: transform 0.6s;
    }
    
    .submit-btn:hover::before { transform: translateX(100%); }
    .submit-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px var(--accent-glow);
    }
    .submit-btn:active { transform: translateY(0); }
    
    .submit-btn.loading {
      pointer-events: none;
      opacity: 0.9;
    }
    .submit-btn.loading::after {
      content: '';
      width: 20px; height: 20px;
      border: 2px solid transparent;
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Divider */
    .divider {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 1.5rem 0;
      color: var(--text-light);
      font-size: 0.85rem;
    }
    .divider::before, .divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--card-border);
    }

    /* Social Login */
    .social-login {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }
    
    .social-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.8rem;
      background: var(--input-bg);
      border: 1.5px solid var(--input-border);
      border-radius: 12px;
      color: var(--text);
      font-weight: 500;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all var(--transition);
    }
    
    .social-btn:hover {
      border-color: var(--accent);
      background: var(--card-bg);
      transform: translateY(-2px);
    }
    
    .social-btn.google { grid-column: span 2; }
    .social-btn i { font-size: 1.1rem; }
    .social-btn.google i { color: #DB4437; }
    .social-btn.apple i { color: #000; }
    [data-theme="dark"] .social-btn.apple i { color: #fff; }

    /* Terms */
    .terms {
      text-align: center;
      font-size: 0.8rem;
      color: var(--text-light);
      line-height: 1.5;
    }
    .terms a {
      color: var(--accent);
      text-decoration: none;
      font-weight: 500;
    }
    .terms a:hover { text-decoration: underline; }

    /* ═══════════════════════════════════════════════════════
       📊 DASHBOARD (na login)
       ═══════════════════════════════════════════════════════ */
    .dashboard {
      display: none;
      position: relative;
      z-index: 10;
      width: 100%;
      max-width: 520px;
      text-align: center;
      animation: cardEnter 0.5s var(--ease) both;
    }
    
    .dashboard.active { display: block; }
    
    .welcome-avatar {
      width: 80px; height: 80px;
      margin: 0 auto 1.5rem;
      background: linear-gradient(135deg, var(--accent), var(--accent-hover));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 2rem;
      box-shadow: 0 8px 24px var(--accent-glow);
      animation: pulse 2.5s ease-in-out infinite;
    }
    
    .dashboard h2 {
      font-family: 'Lora', Georgia, serif;
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
      color: var(--text);
    }
    
    .dashboard p {
      color: var(--text-muted);
      margin-bottom: 2rem;
      font-size: 1.05rem;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.75rem;
      margin-bottom: 2rem;
    }
    
    .stat-card {
      background: var(--input-bg);
      border: 1px solid var(--input-border);
      border-radius: 14px;
      padding: 1rem 0.75rem;
      transition: all var(--transition);
    }
    .stat-card:hover {
      border-color: var(--accent);
      transform: translateY(-3px);
      box-shadow: var(--shadow);
    }
    
    .stat-num {
      display: block;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--accent);
      margin-bottom: 0.25rem;
    }
    .stat-label {
      font-size: 0.8rem;
      color: var(--text-light);
    }
    
    .cta-btn {
      width: 100%;
      padding: 1rem;
      background: linear-gradient(135deg, var(--accent), var(--accent-hover));
      color: white;
      border: none;
      border-radius: 12px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all var(--transition);
      box-shadow: 0 4px 16px var(--accent-glow);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    .cta-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px var(--accent-glow);
    }
    
    .logout-btn {
      background: transparent;
      color: var(--text-muted);
      border: 1.5px solid var(--input-border);
    }
    .logout-btn:hover {
      border-color: var(--text-light);
      color: var(--text);
    }

    /* Toast notifications */
    .toast {
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-left: 4px solid var(--accent);
      border-radius: 12px;
      padding: 1rem 1.5rem;
      box-shadow: var(--shadow-lg);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.9rem;
      z-index: 1000;
      transition: transform 0.3s var(--ease);
      max-width: 360px;
    }
    .toast.show { transform: translateX(-50%) translateY(0); }
    .toast.error { border-left-color: #ef4444; }
    .toast.success { border-left-color: #22c55e; }
    .toast i { font-size: 1.2rem; }

    /* Responsive */
    @media (max-width: 480px) {
      .auth-card { padding: 2rem 1.5rem; }
      .logo-text { font-size: 1.4rem; }
      .auth-header h1 { font-size: 1.25rem; }
      .social-login { grid-template-columns: 1fr; }
      .social-btn.google { grid-column: span 1; }
      .stats-grid { grid-template-columns: 1fr; }
      .floating-flag { font-size: 1.6rem; }
      .floating-flag[data-flag="kurdistan"] { font-size: 1.8rem; }
    }

    /* Focus states for accessibility */
    button:focus-visible, input:focus-visible, a:focus-visible {
      outline: 3px solid var(--accent);
      outline-offset: 2px;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
      }
    }
  </style>
</head>
<body>

  <!-- 🚩 Floating Flags Background -->
  <div class="flags-container" id="flagsContainer" aria-hidden="true"></div>
  
  <!-- ✨ Floating Particles -->
  <div class="particles" id="particles" aria-hidden="true"></div>

  <!-- 🔐 Auth Card -->
  <div class="auth-card" id="authCard">
    <!-- Theme Toggle -->
    <button class="theme-toggle" id="themeToggle" aria-label="Wissel thema" title="Light/Dark mode">
      <i class="fas fa-moon"></i>
    </button>

    <!-- Header -->
    <div class="auth-header">
      <div class="logo">
        <div class="logo-icon">
          <i class="fas fa-language"></i>
        </div>
        <span class="logo-text">Lingua<span>AI</span></span>
      </div>
      <h1>Welkom terug! 👋</h1>
      <p>Log in om je taalles te hervatten</p>
    </div>

    <!-- Form Tabs -->
    <div class="form-tabs" role="tablist">
      <button class="form-tab active" role="tab" aria-selected="true" aria-controls="login-form" id="tab-login" onclick="switchTab('login')">Inloggen</button>
      <button class="form-tab" role="tab" aria-selected="false" aria-controls="register-form" id="tab-register" onclick="switchTab('register')">Registreren</button>
    </div>

    <!-- Login Form -->
    <form class="auth-form active" id="login-form" role="tabpanel" aria-labelledby="tab-login" onsubmit="handleLogin(event)">
      <div class="form-group">
        <label class="form-label" for="login-email">E-mailadres</label>
        <div class="input-wrapper">
          <input type="email" id="login-email" class="form-input" placeholder="jouw@email.nl" required autocomplete="email">
          <i class="fas fa-envelope"></i>
        </div>
      </div>
      
      <div class="form-group">
        <label class="form-label" for="login-password">Wachtwoord</label>
        <div class="input-wrapper">
          <input type="password" id="login-password" class="form-input" placeholder="••••••••" required autocomplete="current-password">
          <i class="fas fa-lock"></i>
          <button type="button" class="password-toggle" onclick="togglePassword('login-password', this)" aria-label="Toon/verberg wachtwoord">
            <i class="fas fa-eye"></i>
          </button>
        </div>
      </div>
      
      <div class="form-extras">
        <label class="remember-me">
          <input type="checkbox" id="remember"> Onthoud mij
        </label>
        <a href="#" class="forgot-link" onclick="showToast('Wachtwoord reset link verzonden!', 'success'); return false;">Wachtwoord vergeten?</a>
      </div>
      
      <button type="submit" class="submit-btn" id="loginBtn">
        <i class="fas fa-sign-in-alt"></i> Inloggen
      </button>
    </form>

    <!-- Register Form -->
    <form class="auth-form" id="register-form" role="tabpanel" aria-labelledby="tab-register" onsubmit="handleRegister(event)">
      <div class="form-group">
        <label class="form-label" for="register-name">Volledige naam</label>
        <div class="input-wrapper">
          <input type="text" id="register-name" class="form-input" placeholder="Jan Jansen" required autocomplete="name">
          <i class="fas fa-user"></i>
        </div>
      </div>
      
      <div class="form-group">
        <label class="form-label" for="register-email">E-mailadres</label>
        <div class="input-wrapper">
          <input type="email" id="register-email" class="form-input" placeholder="jouw@email.nl" required autocomplete="email">
          <i class="fas fa-envelope"></i>
        </div>
      </div>
      
      <div class="form-group">
        <label class="form-label" for="register-password">Wachtwoord</label>
        <div class="input-wrapper">
          <input type="password" id="register-password" class="form-input" placeholder="Minimaal 8 tekens" required autocomplete="new-password" minlength="8">
          <i class="fas fa-lock"></i>
          <button type="button" class="password-toggle" onclick="togglePassword('register-password', this)" aria-label="Toon/verberg wachtwoord">
            <i class="fas fa-eye"></i>
          </button>
        </div>
      </div>
      
      <div class="form-group">
        <label class="form-label" for="register-confirm">Bevestig wachtwoord</label>
        <div class="input-wrapper">
          <input type="password" id="register-confirm" class="form-input" placeholder="Herhaal wachtwoord" required autocomplete="new-password">
          <i class="fas fa-lock"></i>
        </div>
      </div>
      
      <button type="submit" class="submit-btn" id="registerBtn">
        <i class="fas fa-user-plus"></i> Account aanmaken
      </button>
    </form>

    <!-- Divider -->
    <div class="divider">of ga verder met</div>

    <!-- Social Login -->
    <div class="social-login">
      <button class="social-btn google" onclick="socialLogin('google')">
        <i class="fab fa-google"></i> Google
      </button>
      <button class="social-btn apple" onclick="socialLogin('apple')">
        <i class="fab fa-apple"></i> Apple
      </button>
    </div>

    <!-- Terms -->
    <p class="terms">
      Door te registreren ga je akkoord met onze <a href="#" onclick="showToast('Privacybeleid wordt geopend...', 'info'); return false;">Privacybeleid</a> en <a href="#" onclick="showToast('Voorwaarden worden geopend...', 'info'); return false;">Gebruiksvoorwaarden</a>.
    </p>
  </div>

  <!-- 📊 Dashboard (na login) -->
  <div class="dashboard" id="dashboard">
    <button class="theme-toggle" id="themeToggleDash" aria-label="Wissel thema" title="Light/Dark mode" onclick="toggleTheme()">
      <i class="fas fa-moon"></i>
    </button>
    
    <div class="welcome-avatar">
      <i class="fas fa-user"></i>
    </div>
    
    <h2>Welkom, <span id="userName">Gebruiker</span>! 🎉</h2>
    <p>Je bent succesvol ingelogd. Klaar om een nieuwe taal te leren?</p>
    
    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-num">0</span>
        <span class="stat-label">Lessen</span>
      </div>
      <div class="stat-card">
        <span class="stat-num">0</span>
        <span class="stat-label">Woorden</span>
      </div>
      <div class="stat-card">
        <span class="stat-num">⭐</span>
        <span class="stat-label">Niveau</span>
      </div>
    </div>
    
    <button class="cta-btn" onclick="startLearning()">
      <i class="fas fa-play-circle"></i> Start met leren
    </button>
    <button class="cta-btn logout-btn" onclick="logout()">
      <i class="fas fa-sign-out-alt"></i> Uitloggen
    </button>
  </div>

  <!-- 🔔 Toast Notifications -->
  <div class="toast" id="toast" role="alert" aria-live="polite">
    <i class="fas fa-info-circle"></i>
    <span id="toastMessage">Bericht</span>
  </div>

  <script>
    /* ═══════════════════════════════════════════════════════
       🚩 FLOATING FLAGS SETUP
       ═══════════════════════════════════════════════════════ */
    const FLAGS = [
      { code: 'kurdistan', emoji: '🇹🇯', name: 'Kurdistan', special: true },
      { code: 'nl', emoji: '🇳🇱', name: 'Nederland' },
      { code: 'us', emoji: '🇺🇸', name: 'Verenigde Staten' },
      { code: 'gb', emoji: '🇬🇧', name: 'Verenigd Koninkrijk' },
      { code: 'de', emoji: '🇩🇪', name: 'Duitsland' },
      { code: 'fr', emoji: '🇫🇷', name: 'Frankrijk' },
      { code: 'tr', emoji: '🇹🇷', name: 'Turkije' },
      { code: 'iq', emoji: '🇮🇶', name: 'Irak' },
      { code: 'be', emoji: '🇧🇪', name: 'België' },
      { code: 'se', emoji: '🇸🇪', name: 'Zweden' },
      { code: 'es', emoji: '🇪🇸', name: 'Spanje' },
      { code: 'it', emoji: '🇮🇹', name: 'Italië' },
      { code: 'pt', emoji: '🇵🇹', name: 'Portugal' },
      { code: 'pl', emoji: '🇵🇱', name: 'Polen' },
      { code: 'ru', emoji: '🇷🇺', name: 'Rusland' },
      { code: 'cn', emoji: '🇨🇳', name: 'China' },
      { code: 'jp', emoji: '🇯🇵', name: 'Japan' },
      { code: 'kr', emoji: '🇰🇷', name: 'Zuid-Korea' },
      { code: 'in', emoji: '🇮🇳', name: 'India' },
      { code: 'br', emoji: '🇧🇷', name: 'Brazilië' },
      { code: 'mx', emoji: '🇲🇽', name: 'Mexico' },
      { code: 'ca', emoji: '🇨🇦', name: 'Canada' },
      { code: 'au', emoji: '🇦🇺', name: 'Australië' },
      { code: 'za', emoji: '🇿🇦', name: 'Zuid-Afrika' },
      { code: 'eg', emoji: '🇪🇬', name: 'Egypte' },
      { code: 'ma', emoji: '🇲🇦', name: 'Marokko' },
      { code: 'sa', emoji: '🇸🇦', name: 'Saudi-Arabië' },
      { code: 'ae', emoji: '🇦🇪', name: 'VAE' }
    ];

    function createFloatingFlags() {
      const container = document.getElementById('flagsContainer');
      const count = Math.min(18, FLAGS.length);
      
      for (let i = 0; i < count; i++) {
        const flag = FLAGS[i];
        const el = document.createElement('span');
        el.className = 'floating-flag';
        el.textContent = flag.emoji;
        el.setAttribute('data-flag', flag.code);
        el.setAttribute('title', flag.name);
        
        // Random position & animation delay
        el.style.left = `${Math.random() * 100}%`;
        el.style.top = `${Math.random() * 100}%`;
        el.style.animationDelay = `${Math.random() * 3}s`;
        el.style.animationDuration = `${5 + Math.random() * 3}s`;
        
        container.appendChild(el);
      }
    }

    /* ═══════════════════════════════════════════════════════
       ✨ FLOATING PARTICLES
       ═══════════════════════════════════════════════════════ */
    function createParticles() {
      const container = document.getElementById('particles');
      const count = 20;
      
      for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animationDuration = `${6 + Math.random() * 4}s`;
        container.appendChild(particle);
      }
    }

    /* ═══════════════════════════════════════════════════════
       🌙 THEME TOGGLE
       ═══════════════════════════════════════════════════════ */
    function initTheme() {
      const saved = localStorage.getItem('lingua_theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (saved === 'dark' || (!saved && prefersDark)) {
        document.body.setAttribute('data-theme', 'dark');
        updateThemeIcons('moon');
      }
    }

    function toggleTheme() {
      const isDark = document.body.getAttribute('data-theme') === 'dark';
      document.body.setAttribute('data-theme', isDark ? '' : 'dark');
      localStorage.setItem('lingua_theme', isDark ? '' : 'dark');
      updateThemeIcons(isDark ? 'sun' : 'moon');
      showToast(`Thema gewijzigd naar ${isDark ? 'licht' : 'donker'} ✨`, 'success');
    }

    function updateThemeIcons(icon) {
      document.querySelectorAll('.theme-toggle i').forEach(i => {
        i.className = icon === 'moon' ? 'fas fa-moon' : 'fas fa-sun';
      });
    }

    /* ═══════════════════════════════════════════════════════
       🔄 FORM TABS
       ═══════════════════════════════════════════════════════ */
    function switchTab(tab) {
      // Update tabs
      document.querySelectorAll('.form-tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      document.getElementById(`tab-${tab}`).classList.add('active');
      document.getElementById(`tab-${tab}`).setAttribute('aria-selected', 'true');
      
      // Update forms
      document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
      document.getElementById(`${tab}-form`).classList.add('active');
    }

    /* ═══════════════════════════════════════════════════════
       👁️ PASSWORD TOGGLE
       ═══════════════════════════════════════════════════════ */
    function togglePassword(inputId, btn) {
      const input = document.getElementById(inputId);
      const icon = btn.querySelector('i');
      
      if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
      } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
      }
    }

    /* ═══════════════════════════════════════════════════════
       🔔 TOAST NOTIFICATIONS
       ═══════════════════════════════════════════════════════ */
    function showToast(message, type = 'info') {
      const toast = document.getElementById('toast');
      const msgEl = document.getElementById('toastMessage');
      const icon = toast.querySelector('i');
      
      msgEl.textContent = message;
      toast.className = `toast ${type}`;
      
      // Set icon
      icon.className = type === 'success' ? 'fas fa-check-circle' : 
                       type === 'error' ? 'fas fa-exclamation-circle' : 
                       'fas fa-info-circle';
      
      // Show
      toast.classList.add('show');
      
      // Auto hide
      setTimeout(() => toast.classList.remove('show'), 4000);
    }

    /* ═══════════════════════════════════════════════════════
       🔐 LOGIN / REGISTER HANDLERS
       ═══════════════════════════════════════════════════════ */
    function handleLogin(e) {
      e.preventDefault();
      const btn = document.getElementById('loginBtn');
      const email = document.getElementById('login-email').value;
      
      // Loading state
      btn.classList.add('loading');
      btn.querySelector('i').style.display = 'none';
      
      // Simulate API call
      setTimeout(() => {
        btn.classList.remove('loading');
        btn.querySelector('i').style.display = 'inline';
        
        // Save user
        localStorage.setItem('lingua_user', JSON.stringify({
          email: email,
          name: email.split('@')[0],
          loggedIn: true
        }));
        
        showToast('Succesvol ingelogd! 🎉', 'success');
        showDashboard();
      }, 1500);
    }

    function handleRegister(e) {
      e.preventDefault();
      const btn = document.getElementById('registerBtn');
      const password = document.getElementById('register-password').value;
      const confirm = document.getElementById('register-confirm').value;
      
      // Validate
      if (password !== confirm) {
        showToast('Wachtwoorden komen niet overeen ❌', 'error');
        return;
      }
      if (password.length < 8) {
        showToast('Wachtwoord moet minimaal 8 tekens hebben', 'error');
        return;
      }
      
      // Loading
      btn.classList.add('loading');
      btn.querySelector('i').style.display = 'none';
      
      setTimeout(() => {
        btn.classList.remove('loading');
        btn.querySelector('i').style.display = 'inline';
        
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        
        localStorage.setItem('lingua_user', JSON.stringify({
          email: email,
          name: name,
          loggedIn: true,
          registered: new Date().toISOString()
        }));
        
        showToast('Account aangemaakt! Welkom! 🎉', 'success');
        showDashboard();
      }, 1800);
    }

    function socialLogin(provider) {
      showToast(`${provider === 'google' ? 'Google' : 'Apple'} login wordt voorbereid...`, 'info');
      
      // Simulate OAuth flow
      setTimeout(() => {
        localStorage.setItem('lingua_user', JSON.stringify({
          email: `user@${provider}.com`,
          name: `${provider} User`,
          loggedIn: true,
          provider: provider
        }));
        showToast(`Ingelogd met ${provider}! ✨`, 'success');
        showDashboard();
      }, 1200);
    }

    /* ═══════════════════════════════════════════════════════
       📊 DASHBOARD FUNCTIONS
       ═══════════════════════════════════════════════════════ */
    function showDashboard() {
      const user = JSON.parse(localStorage.getItem('lingua_user') || '{}');
      
      if (user.loggedIn) {
        document.getElementById('authCard').style.display = 'none';
        document.getElementById('dashboard').classList.add('active');
        document.getElementById('userName').textContent = user.name || 'Gebruiker';
      }
    }

    function logout() {
      localStorage.removeItem('lingua_user');
      document.getElementById('dashboard').classList.remove('active');
      document.getElementById('authCard').style.display = 'block';
      showToast('Uitgelogd. Tot ziens! 👋', 'info');
      
      // Reset forms
      document.querySelectorAll('form').forEach(f => f.reset());
      switchTab('login');
    }

    function startLearning() {
      showToast('Doorverwijzen naar lesomgeving... 🚀', 'success');
      // In production: window.location.href = '/learn';
      setTimeout(() => {
        showToast('Demo: Je zou nu naar de lesomgeving gaan!', 'info');
      }, 1500);
    }

    /* ═══════════════════════════════════════════════════════
       🚀 INIT
       ═══════════════════════════════════════════════════════ */
    document.addEventListener('DOMContentLoaded', () => {
      // Create visual elements
      createFloatingFlags();
      createParticles();
      
      // Init theme
      initTheme();
      
      // Theme toggle listeners
      document.getElementById('themeToggle').addEventListener('click', toggleTheme);
      
      // Check if already logged in
      const user = JSON.parse(localStorage.getItem('lingua_user') || '{}');
      if (user.loggedIn) {
        showDashboard();
      }
      
      // Keyboard support for tabs
      document.querySelectorAll('.form-tab').forEach(tab => {
        tab.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            switchTab(tab.id.replace('tab-', ''));
          }
        });
      });
    });
  </script>
</body>
</html>