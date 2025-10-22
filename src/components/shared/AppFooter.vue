<template>
  <footer class="footer" role="contentinfo">
    <div class="shell row">
      <!-- Marca -->


      <!-- Navegación -->
      <nav class="navigation" aria-label="Navegación del sitio">
        
        <ul class="nav-links">
          <li>
            <router-link to="/">
              <span class="ico" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="g-nav1" x1="0" x2="1">
                      <stop offset="0" stop-color="#2dd4bf"/>
                      <stop offset="1" stop-color="#60a5fa"/>
                    </linearGradient>
                  </defs>
                  <circle cx="12" cy="12" r="9" fill="none" stroke="url(#g-nav1)" stroke-width="1.6" />
                  <path d="M10 14l4-4" fill="none" stroke="url(#g-nav1)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              Inicio
            </router-link>
          </li>
          <li>
            <router-link to="/about-us">
              <span class="ico" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="g-nav2" x1="0" x2="1">
                      <stop offset="0" stop-color="#2dd4bf"/>
                      <stop offset="1" stop-color="#60a5fa"/>
                    </linearGradient>
                  </defs>
                  <circle cx="12" cy="12" r="9" fill="none" stroke="url(#g-nav2)" stroke-width="1.6" />
                  <path d="M12 8v.01M11.3 11h1.4v4.5h-1.4z" fill="none" stroke="url(#g-nav2)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              Sobre Nosotros
            </router-link>
          </li>
          <li>
            <router-link to="/product">
              <span class="ico" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="g-nav3" x1="0" x2="1">
                      <stop offset="0" stop-color="#2dd4bf"/>
                      <stop offset="1" stop-color="#60a5fa"/>
                    </linearGradient>
                  </defs>
                  <rect x="4" y="6" width="16" height="12" rx="2" fill="none" stroke="url(#g-nav3)" stroke-width="1.6"/>
                </svg>
              </span>
              Producto
            </router-link>
          </li>
          <li>
            <router-link to="/contact-us">
              <span class="ico" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="g-nav4" x1="0" x2="1">
                      <stop offset="0" stop-color="#2dd4bf"/>
                      <stop offset="1" stop-color="#60a5fa"/>
                    </linearGradient>
                  </defs>
                  <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="url(#g-nav4)" stroke-width="1.6" />
                  <path d="M4 7l8 6 8-6" fill="none" stroke="url(#g-nav4)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              Contáctanos
            </router-link>
          </li>
        </ul>
      </nav>

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

      <!-- Horarios de atención -->
      <div class="hours" aria-label="Horarios de atención">
        <h3 class="nav-title">Horarios de atención</h3>
        <ul class="hours-list">
          <li><strong>Lun – Vie:</strong> 09:00 – 18:30</li>
          <li><strong>Dirección:</strong> 12 de Calacoto, La Paz - Bolivia</li>
          <li><strong>Tel:</strong> +591 73577561</li>
          <li><strong>Email:</strong> contacto@vitalsystems.com</li>
        </ul>
      </div>

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
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: clamp(28px, 4.5vw, 80px);
}

.brand {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  justify-self: flex-start;

}

.brand-mark {
  display: block;
  margin: 0 auto;
  width: clamp(150px, 15vw, 200px);
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

/* --- NAVEGACIÓN --- */
.navigation {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: clamp(12px, 1.6vw, 20px);
}

.nav-title {
  font-size: clamp(1.1rem, 1.5vw, 1.3rem);
  font-weight: 600;
  color: #fff;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: linear-gradient(135deg, #2dd4bf, #60a5fa);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Fallback para navegadores que no soportan background-clip */
@supports not (-webkit-background-clip: text) {
  .nav-title {
    background: none;
    color: #fff !important;
    -webkit-text-fill-color: initial;
  }
}

.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
}

.nav-links li {
  width: 100%;
}

.nav-links a {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 8px;
  border-radius: 6px;
  transition: all 0.22s ease;
  font-weight: 600;
  font-size: clamp(0.95rem, 1vw, 1.02rem);
  color: #cbd5e1;
  text-decoration: none;
}

.nav-links a:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  transform: translateX(4px);
  text-decoration: none;
}

.nav-links a.router-link-active {
  background: linear-gradient(135deg, rgba(45, 212, 191, 0.2), rgba(96, 165, 250, 0.2));
  color: #2dd4bf;
  border: 1px solid rgba(45, 212, 191, 0.3);
}

.hours {
  text-align: left;
  color: #cbd5e1;
}

.hours-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hours-list li {
  font-size: clamp(0.9rem, 1.1vw, 1rem);
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
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, .04);
  display: grid;
  place-items: center;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .06);
  transition: background-color 0.22s ease, transform 0.22s ease;
}

a:hover .ico {
  background: rgba(255, 255, 255, .1);
}

.ico svg {
  width: 20px;
  height: 20px;
  display: block;
}

/* Layout tuning: give nav column a comfortable width and keep hours prominent */
.navigation { flex: 0 0 220px; }
.hours { flex: 1 1 420px; }
.social { flex: 0 0 160px; }
.contact { flex: 0 0 200px; }

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
    flex-direction: column;
    gap: 2.2rem;
    text-align: center;
  }

  .brand, .navigation, .social, .contact {
    align-self: center;
  }

  .navigation { flex: none; }
  .hours { flex: none; }
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
