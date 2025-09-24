<template>
  <footer class="footer" role="contentinfo">
    <div class="shell row">
      <!-- Marca -->
      <div class="brand">
        <img class="brand-mark" src="/Logo.png" alt="VITALSYSTEMS"
          onerror="this.src='/favicon.ico'; this.classList.add('fallback')" />
        <div class="brand-text">VITALSYSTEMS</div>
      </div>

      <!-- Redes -->
<ul class="social" aria-label="Redes sociales">
  <li>
    <a href="https://www.facebook.com/share/1BAv4qKUap/"
       target="_blank" rel="noopener noreferrer"
       aria-label="Facebook — VITALSYSTEMS">
      <span class="ico">
        <!-- Facebook -->
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0" stop-color="#2dd4bf"/>
              <stop offset="1" stop-color="#60a5fa"/>
            </linearGradient>
          </defs>
          <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1Z"
                fill="none" stroke="url(#g)" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <span class="social-text">Facebook</span>
    </a>
  </li>

  <li>
    <a href="https://www.instagram.com/vital.systems/"
       target="_blank" rel="noopener noreferrer"
       aria-label="Instagram — VITALSYSTEMS">
      <span class="ico">
        <!-- Instagram -->
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id="g2" x1="0" x2="1">
              <stop offset="0" stop-color="#2dd4bf"/>
              <stop offset="1" stop-color="#60a5fa"/>
            </linearGradient>
          </defs>
          <rect x="3" y="3" width="18" height="18" rx="5"
                fill="none" stroke="url(#g2)" stroke-width="1.8"/>
          <circle cx="12" cy="12" r="3.5"
                  fill="none" stroke="url(#g2)" stroke-width="1.8"/>
          <circle cx="17.5" cy="6.5" r="1" fill="url(#g2)"/>
        </svg>
      </span>
      <span class="social-text">Instagram</span>
    </a>
  </li>

  <li>
    <a href="https://x.com/VitalSystemsUWU"
       target="_blank" rel="noopener noreferrer"
       aria-label="X / Twitter — VITALSYSTEMS">
      <span class="ico">
        <!-- X / Twitter -->
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id="g3" x1="0" x2="1">
              <stop offset="0" stop-color="#2dd4bf"/>
              <stop offset="1" stop-color="#60a5fa"/>
            </linearGradient>
          </defs>
        <path d="M4 4l16 16M20 4L4 20"
              fill="none" stroke="url(#g3)" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </span>
      <span class="social-text">X / Twitter</span>
    </a>
  </li>
</ul>

      <!-- Contacto -->
      <ul class="contact" aria-label="Información de contacto">
        <li>
          <span class="ico" aria-hidden="true">
            <!-- Pin -->
            <svg viewBox="0 0 24 24">
              <defs>
                <linearGradient id="g4" x1="0" x2="1">
                  <stop offset="0" stop-color="#2dd4bf" />
                  <stop offset="1" stop-color="#60a5fa" />
                </linearGradient>
              </defs>
              <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" fill="none" stroke="url(#g4)"
                stroke-width="1.8" />
              <circle cx="12" cy="10" r="2.5" fill="none" stroke="url(#g4)" stroke-width="1.8" />
            </svg>
          </span>
          <span>12 de Calacoto, La Paz - Bolivia</span>
        </li>

        <li>
          <span class="ico" aria-hidden="true">
            <!-- Sobre -->
            <svg viewBox="0 0 24 24">
              <defs>
                <linearGradient id="g5" x1="0" x2="1">
                  <stop offset="0" stop-color="#2dd4bf" />
                  <stop offset="1" stop-color="#60a5fa" />
                </linearGradient>
              </defs>
              <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="url(#g5)" stroke-width="1.8" />
              <path d="M4 7l8 6 8-6" fill="none" stroke="url(#g5)" stroke-width="1.8" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </span>
          <a href="mailto:contacto@vitalsystems.com">contacto@vitalsystems.com</a>
        </li>

        <li>
          <span class="ico" aria-hidden="true">
            <!-- Teléfono -->
            <svg viewBox="0 0 24 24">
              <defs>
                <linearGradient id="g6" x1="0" x2="1">
                  <stop offset="0" stop-color="#2dd4bf" />
                  <stop offset="1" stop-color="#60a5fa" />
                </linearGradient>
              </defs>
              <path d="M6 3l3 3-2 2a12 12 0 0 0 8 8l2-2 3 3-2 3c-8 1-15-6-14-14L6 3Z" fill="none" stroke="url(#g6)"
                stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <a href="tel:+59173577561">+591 73577561</a>
        </li>
      </ul>
    </div>

    <div class="legal">© 2025 VitalSystems. Todos los derechos reservados.</div>
  </footer>
</template>

<style scoped>
.footer {
  background: #0e1b2f;
  color: #cbd5e1;
  padding-top: clamp(24px, 4vh, 48px);
  font-family: 'Poppins', sans-serif;
  width: 100%;
}

.shell {
  width: clamp(320px, 92vw, 1400px);
  margin: 0 auto;
  padding: 0 clamp(16px, 2vw, 32px) clamp(20px, 3vh, 28px);
  box-sizing: border-box;
}

.row {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1.2fr;
  gap: clamp(24px, 4vw, 64px);
  align-items: start;
  justify-items: center;
}

.brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-self: center;
  gap: clamp(12px, 1.5vw, 18px);
}

.brand-mark {
  display: block;
  margin: 0 auto;
  width: clamp(90px, 12vw, 140px);
  height: auto;
}

.brand-text {
  font-weight: 500;
  letter-spacing: .3px;
  font-size: clamp(24px, 2.8vw, 36px);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.social,
.contact {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 16px;
}

.social li,
.contact li {
  display: flex;
  align-items: center;
  gap: 14px;
}

.social a {
  display: inline-flex;
  align-items: center;
  gap: 14px;
}

a {
  color: #9cc2ff;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: clamp(0.9rem, 1.2vw, 1rem);
}

a:hover {
  color: #fff;
  text-decoration: underline;
}

.ico {
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, .05);
  display: grid;
  place-items: center;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .08);
  transition: background-color 0.3s ease;
}

a:hover .ico {
  background: rgba(255, 255, 255, .1);
}

.ico svg {
  width: 22px;
  height: 22px;
  display: block;
}

.legal {
  text-align: center;
  font-size: clamp(.85rem, .95vw, .95rem);
  color: #93a7c2;
  padding: 16px 0 24px;
  border-top: 1px solid rgba(255, 255, 255, .08);
  margin-top: clamp(20px, 3vh, 32px);
}

@media (max-width: 980px) {
  .row {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    text-align: center;
  }

  .brand, .social, .contact {
    justify-self: center;
  }

  .social, .contact {
    display: grid;
    justify-items: center;
  }

  .social li, .contact li {
    display: inline-flex;
    text-align: left;
    max-width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  a {
    font-size: 0.85rem;
  }

  .shell {
    padding: 0 1rem 1.5rem;
  }

  .brand-text {
    font-size: clamp(20px, 2.4vw, 26px);
  }

  .ico {
    width: 32px;
    height: 32px;
    min-width: 32px;
  }

  .ico svg {
    width: 16px;
    height: 16px;
  }

  .social li,
  .contact li {
    gap: 10px;
  }
}
</style>
