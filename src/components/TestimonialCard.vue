<template>
  <BaseCard class="testimonial-card">
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
  </BaseCard>
</template>

<script>
import BaseCard from './BaseCard.vue';

export default {
  name: "TestimonialCard",
  components: { BaseCard },
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
.testimonial-card {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
  min-height: 200px;
  justify-content: space-between;
}

.product-testimonial-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-testimonial-name {
  font-weight: 600;
  color: #1f2b6c;
  font-size: 1.25rem;
}

.rating-stars {
  display: flex;
  gap: 0.25rem;
}

.star {
  width: 24px;
  height: 24px;
}

.product-testimonial-body {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.product-avatar-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.product-avatar-icon {
  font-size: 3rem;
  color: var(--blue-primary);
}

.product-quote {
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
  margin: 0;
}

@media (max-width: 768px) {
  .testimonial-card {
    min-height: auto;
  }

  .product-testimonial-name {
    font-size: 1.1rem;
  }

  .star {
    width: 20px;
    height: 20px;
  }

  .product-quote {
    font-size: 0.9rem;
  }
}
</style>
