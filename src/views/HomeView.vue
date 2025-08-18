<template>
  <div class="home-view">
    <section class="hero-section">
      <div class="container hero-container">
        <div class="hero-text">
          <h1>Tecnología que<br />Cuida la Vida</h1>
          <p>
            Creamos soluciones innovadoras y accesibles para mejorar la calidad
            de vida y la autonomía de las personas.
          </p>
          <div class="hero-buttons">
            <a href="#" class="btn btn-primary">Conoce el producto</a>
            <a href="#" class="btn btn-outline">Contáctanos</a>
          </div>
        </div>
        <div class="hero-image">
          <img
            src="/preview-app-telefono.png"
            alt="App de VitalSystems en móviles"
          />
        </div>
      </div>
    </section>

    <section class="explore-section">
      <div class="container fade-in-on-scroll">
        <h2 class="section-title">Explora nuestro Producto</h2>
        <div class="explore-content">
          <div class="explore-card text-card">
            <p>
              Vital Recorder es una solución intuitiva y poderosa que combina
              hardware y software para resolver un problema real. Una manilla
              inteligente y una aplicación móvil para recordar medicamentos,
              citas y tareas diarias, garantizando tranquilidad para toda la
              familia.
            </p>
          </div>
          <div class="explore-card product-card">
            <i class="bi bi-smartwatch product-icon"></i>
            <h3>VITAL RECORDER</h3>
            <p class="subtitle">Tu Recordatorio Inteligente</p>
            <a href="#" class="btn btn-primary">Conoce el producto</a>
          </div>
        </div>
      </div>
    </section>

    <section class="about-section">
      <div class="container fade-in-on-scroll">
        <h2 class="section-title">Quiénes Somos</h2>
        <div class="about-description">
          <p>
            En Vital Systems, creemos firmemente que la tecnología puede y debe
            ser una fuerza para el bien. Nos dedicamos a diseñar y desarrollar
            soluciones que empoderen a las personas, especialmente a los adultos
            mayores, permitiéndoles vivir con mayor independencia y dignidad.
          </p>
        </div>
        <div class="values-grid">
          <div class="value-card">
            <h4>Misión</h4>
            <p>
              Nuestra misión es crear tecnología que se adapte a la vida de las
              personas, no al revés.
            </p>
          </div>
          <div class="value-card">
            <h4>Visión</h4>
            <p>
              Ser la empresa líder en soluciones tecnológicas para el bienestar
              y la autonomía de las personas en La Paz - Bolivia.
            </p>
          </div>
          <div class="value-card">
            <h4>Valores</h4>
            <p>Nuestros valores son:</p>
            <ul>
              <li>Innovación</li>
              <li>Empatía</li>
              <li>Confianza</li>
              <li>Accesibilidad</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="testimonials-section">
      <div class="container fade-in-on-scroll">
        <h2 class="section-title">Lo que dicen nuestros usuarios</h2>
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <div class="testimonial-header">
              <span class="name">Juan Velozco</span>
              <div class="stars">
                <i class="bi bi-star"></i><i class="bi bi-star"></i
                ><i class="bi bi-star"></i><i class="bi bi-star"></i
                ><i class="bi bi-star"></i>
              </div>
            </div>
            <div class="testimonial-body">
              <i class="bi bi-person-circle avatar-icon"></i>
              <p class="quote">
                “Ahora no me olvido de mis pastillas y mis hijos están
                tranquilos”
              </p>
            </div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-header">
              <span class="name">Maria Pardo</span>
              <div class="stars">
                <i class="bi bi-star"></i><i class="bi bi-star"></i
                ><i class="bi bi-star"></i>
              </div>
            </div>
            <div class="testimonial-body">
              <i class="bi bi-person-circle avatar-icon"></i>
              <p class="quote">
                “La sincronización familiar nos avisa si mi papá olvidó una toma
                sus medicamentos a tiempo”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

let observer = null;

onMounted(() => {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.05,
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, options);

  const elementsToAnimate = document.querySelectorAll(".fade-in-on-scroll");
  elementsToAnimate.forEach((el) => observer.observe(el));
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
.home-view {
  font-family: "Lato", sans-serif;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 900;
  color: #0f2147;
  text-align: center;
  margin-bottom: 3rem;
}

.section-title.text-light {
  color: #f7f7f7;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #0f2147;
  color: #f7f7f7;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.btn-outline {
  background-color: transparent;
  color: #f7f7f7;
  border: 2px solid #f7f7f7;
}
.btn-outline:hover {
  background-color: #f7f7f7;
  color: #0f2147;
}

.hero-section {
  background: linear-gradient(90deg, #00f2fe, #4481eb);
  padding: 5rem 0;
}

.hero-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 3rem;
}

.hero-text h1 {
  font-size: 3.5rem;
  font-weight: 900;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #0f2147;
}

.hero-text p {
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  color: #f7f7f7;
  font-weight: 700;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
}

.hero-buttons .btn-primary {
  background-color: #0f2147;
  color: #f7f7f7;
  border-radius: 8px;
  border: 2px solid #0f2147;
}

.hero-buttons .btn-primary:hover {
  background-color: #1a2c5a;
  border-color: #1a2c5a;
}

.hero-buttons .btn-outline {
  background-color: transparent;
  color: #0f2147;
  border: 2px solid #0f2147;
  border-radius: 8px;
}

.hero-buttons .btn-outline:hover {
  background-color: #0f2147;
  color: #f7f7f7;
}

.hero-image {
  background: white;
  padding: 0.75rem;
  border-radius: 1rem;
  box-shadow: 0 15px 35px rgba(15, 33, 71, 0.15);
}

.hero-image img {
  width: 100%;
  display: block;
  border-radius: 0.5rem;
}

.explore-section {
  background-color: #f7f7f7;
  padding: 5rem 0;
}

.explore-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  align-items: center;
}

.explore-card {
  background: white;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.text-card p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
}

.product-card {
  text-align: center;
}
.product-icon {
  font-size: 4rem;
  background: linear-gradient(90deg, #00f2fe, #4481eb);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
}
.product-card h3 {
  font-size: 1.5rem;
  font-weight: 900;
  color: #0f2147;
  margin-bottom: 0.5rem;
}
.product-card .subtitle {
  color: #555;
  margin-bottom: 1.5rem;
}

.about-section {
  background: linear-gradient(90deg, #4481eb, #00f2fe);
  padding: 5rem 0;
  text-align: center;
}

.about-description {
  background: white;
  padding: 2.5rem;
  border-radius: 1rem;
  max-width: 800px;
  margin: 0 auto 3rem auto;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  color: #333;
  font-size: 1.1rem;
  line-height: 1.7;
  text-align: left;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.value-card {
  background: white;
  color: #0f2147;
  padding: 2.5rem;
  border-radius: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.value-card h4 {
  font-size: 1.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
}

.value-card p {
  color: #555e68;
  line-height: 1.6;
}

.value-card ul {
  list-style: none;
  padding: 0;
  margin-top: 0.5rem;
  color: #555e68;
}

.value-card ul li {
  text-align: left;
  padding-left: 1.4em;
  position: relative;
  margin-bottom: 0.5rem;
}

.value-card ul li::before {
  content: "•";
  color: #333;
  font-weight: bold;
  font-size: 1.2rem;
  position: absolute;
  left: 0;
  top: -2px;
}

.testimonials-section {
  background-color: #f7f7f7;
  padding: 5rem 0;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  align-items: start;
}

.testimonial-card {
  background: white;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.testimonial-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0;
  border-bottom: none;
}

.testimonial-header .name {
  font-weight: 700;
  font-size: 1.1rem;
  color: #0f2147;
}

.stars {
  display: flex;
  gap: 0.25rem;
}

.stars i {
  font-size: 1.25rem;
  background: linear-gradient(90deg, #00f2fe, #4481eb);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.testimonial-body {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.avatar-icon {
  font-size: 5rem;
  flex-shrink: 0;
  background: linear-gradient(90deg, #00f2fe, #4481eb);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.quote {
  font-style: normal;
  color: #555e68;
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.6;
}

.fade-in-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.fade-in-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
