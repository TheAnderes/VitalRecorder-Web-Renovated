<template>
  <footer class="footer">
    <div class="shell row">
      <!-- Marca -->
      <div class="brand">
        <img class="brand-mark" src="/Logo.png" alt="VITALSYSTEMS"
          onerror="this.src='/favicon.ico'; this.classList.add('fallback')" />
        <div class="brand-text">VITALSYSTEMS</div>
      </div>

      <!-- Redes -->
      <ul class="social">
        <li>
          <span class="ico">
            <!-- Facebook -->
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0" stop-color="#2dd4bf" />
                  <stop offset="1" stop-color="#60a5fa" />
                </linearGradient>
              </defs>
              <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1Z" fill="none"
                stroke="url(#g)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <a href="https://www.facebook.com/share/1BAv4qKUap/" rel="noopener">Facebook</a>
        </li>
        <li>
          <span class="ico">
            <!-- Instagram -->
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <defs>
                <linearGradient id="g2" x1="0" x2="1">
                  <stop offset="0" stop-color="#2dd4bf" />
                  <stop offset="1" stop-color="#60a5fa" />
                </linearGradient>
              </defs>
              <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="url(#g2)" stroke-width="1.8" />
              <circle cx="12" cy="12" r="3.5" fill="none" stroke="url(#g2)" stroke-width="1.8" />
              <circle cx="17.5" cy="6.5" r="1" fill="url(#g2)" />
            </svg>
          </span>
          <a href="https://www.instagram.com/vital.systems/" rel="noopener">Instagram</a>
        </li>
        <li>
          <span class="ico">
            <!-- X / Twitter -->
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <defs>
                <linearGradient id="g3" x1="0" x2="1">
                  <stop offset="0" stop-color="#2dd4bf" />
                  <stop offset="1" stop-color="#60a5fa" />
                </linearGradient>
              </defs>
              <path d="M4 4l16 16M20 4L4 20" fill="none" stroke="url(#g3)" stroke-width="1.8" stroke-linecap="round" />
            </svg>
          </span>
          <a href="https://x.com/VitalSystemsUWU" rel="noopener">X / Twitter</a>
        </li>
      </ul>

      <!-- Contacto -->
      <ul class="contact">
        <li>
          <span class="ico">
            <!-- Pin -->
            <svg viewBox="0 0 24 24" aria-hidden="true">
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
          <span class="ico">
            <!-- Sobre -->
            <svg viewBox="0 0 24 24" aria-hidden="true">
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
          <span class="ico">
            <!-- Teléfono -->
            <svg viewBox="0 0 24 24" aria-hidden="true">
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
  padding-top: clamp(18px, 3vh, 28px);
}

.shell {
  width: clamp(320px, 92vw, 1400px);
  margin: 0 auto;
  padding: 0 clamp(12px, 2vw, 28px) clamp(16px, 3vh, 22px);
}

.row {
  display: grid;
  grid-template-columns: 1.1fr 1fr 1.2fr;
  gap: clamp(16px, 3vw, 48px);
  align-items: center;
}

/* Marca */
.brand {
  display: flex;
  flex-direction: column;
  /* logo arriba, texto abajo */
  align-items: center;
  /* centra horizontalmente el logo y el texto */
  text-align: center;
  justify-self: center;
  /* centra la columna completa dentro del grid */
  gap: clamp(10px, 1.2vw, 14px);
}

/* Asegura que la imagen se centre y no deje espacio raro */
.brand-mark {
  display: block;
  margin: 0 auto;
  /* extra por si acaso */
  width: clamp(84px, 11vw, 130px);
  height: auto;
}

.brand-text {
  font-weight: 500;
  letter-spacing: .2px;
  font-size: clamp(22px, 2.6vw, 34px);
  background: linear-gradient(90deg, #2dd4bf, #60a5fa);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Listas */
.social,
.contact {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 14px;
}

.social li,
.contact li {
  display: flex;
  align-items: center;
  gap: 12px;
}

a {
  color: #9cc2ff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Íconos */
.ico {
  width: 34px;
  height: 34px;
  min-width: 34px;
  border-radius: 999px;
  background: rgba(255, 255, 255, .04);
  display: grid;
  place-items: center;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .06);
}

.ico svg {
  width: 20px;
  height: 20px;
  display: block;
}

/* Copyright */
.legal {
  text-align: center;
  font-size: clamp(.85rem, .95vw, .95rem);
  color: #93a7c2;
  padding: 12px 0 18px;
  border-top: 1px solid rgba(255, 255, 255, .06);
  margin-top: clamp(14px, 2vh, 22px);
}

/* Responsive */
@media (max-width: 980px) {
  .row {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .brand {
    align-items: center;
    /* centro en pantallas pequeñas */
    text-align: center;
  }

  .social,
  .contact {
    justify-items: start;
  }
}
</style>
