<!-- TestimonialCard.vue -->
<template>
  <article class="product-testimonial-card">
    <!-- Encabezado: nombre + estrellas huecas -->
    <header class="product-testimonial-header">
      <span class="product-testimonial-name">{{ name }}</span>

      <div class="rating-stars">
        <svg
          v-for="i in count"
          :key="i"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="star"
          aria-hidden="true"
        >
          <defs>
            <linearGradient :id="gradId" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#00f2fe" />
              <stop offset="100%" stop-color="#4481eb" />
            </linearGradient>
          </defs>
          <!-- Estrella hueca (solo borde con degradado) -->
          <path
            d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782
               1.402 8.172L12 18.896l-7.336 3.868
               1.402-8.172L.132 9.21l8.2-1.192z"
            fill="none"
            :stroke="'url(#' + gradId + ')'"
            stroke-width="2"
          />
        </svg>
      </div>
    </header>

    <!-- Cuerpo: avatar + frase -->
    <div class="product-testimonial-body">
      <img
        v-if="avatar"
        :src="avatar"
        alt="avatar"
        class="product-avatar-img"
      />
      <i v-else class="bi bi-person-circle product-avatar-icon"></i>

      <p class="product-quote">“{{ quote }}”</p>
    </div>
  </article>
</template>

<script>
export default {
  name: "TestimonialCard",
  props: {
    name:   { type: String, required: true },
    quote:  { type: String, required: true },
    avatar: { type: String, default: "" },  // URL de imagen
    count:  { type: Number, default: 4 },   // Nº de estrellas huecas a mostrar
    gradientId: { type: String, default: "" } // opcional para forzar id
  },
  computed: {
    gradId() {
      // id único para el degradado (evita colisiones si hay varias cards)
      return this.gradientId || `starGradient-${this._uid}`;
    }
  }
};
</script>

<style scoped>
.product-testimonial-card {
  background: #fff;
  border-radius: 14px;
  padding: 1.25rem;
  box-shadow: 6px 8px 12px rgba(68, 129, 235, 0.8);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 400px;
  height:210px;
  box-sizing: border-box;
  border-radius: 30px;
}

.product-testimonial-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
}

.product-testimonial-name {
  font-family: var(--tipografia);
  font-weight: var(--semibold);
  color: #0f2147;
  font-size: 22px;
}

.rating-stars {
  display: flex;
  gap: 0.25rem;
  align-items: center;
}
.star {
  width: 30px;
  height: 30px;
}

.product-testimonial-body {
  display: flex;
  align-items: center;
  justify-content: center ;
  gap: 20px;
}

.product-avatar-img {
  width: 130px;
  height: 130px;
  object-fit: cover;

}

.product-avatar-icon {
  font-size: 2.6rem;
  background: linear-gradient(90deg, #00f2fe, #4481eb);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.product-quote {
  font-size: 16px;
  font-family: var(--tipografia);
  font-weight: var(--regular);
  margin: 0;
  color: #5b6575;
  line-height: 1.35;
  width: 180px;
  text-align: center;
}
/* Mobile only (≤768px) */
@media (max-width: 768px) {
  .product-testimonial-card {
    width: 90vw;
    height: auto;
    padding: 14px;
    border-radius: 18px;
    box-shadow: 4px 6px 10px rgba(68,129,235,0.35);
  }

  .product-testimonial-header {
    justify-content: space-between;
    gap: 12px;
  }

  .product-testimonial-name {
    font-size: clamp(1rem, 4.6vw, 1.1rem);
  }

  .rating-stars .star {
    width: 22px;
    height: 22px;
  }

  .product-testimonial-body {
    gap: 12px;
  }

  .product-avatar-img {
    width: 72px;
    height: 72px;
    border-radius: 50%;
  }

  .product-quote {
    width: 100%;
    font-size: .95rem;
    text-align: left;
    line-height: 1.35;
  }
}

/* Muy pequeño (≤380px) */
@media (max-width: 380px) {
  .rating-stars .star {
    width: 18px;
    height: 18px;
  }
}
</style>
