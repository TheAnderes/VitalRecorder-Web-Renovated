<template>
  <BaseCard class="characteristic-card">
    <h3 class="product-feature-title">{{ title }}</h3>
    <img :src="icon" alt="" class="product-feature-icon" />
    <p class="product-feature-text">{{ text }}</p>
  </BaseCard>
</template>

<script>
import BaseCard from './BaseCard.vue';

export default {
  name: "CharacteristicCard",
  components: { BaseCard },
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
  },
};
</script>

<style scoped>
.characteristic-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  row-gap: 10px;
  padding: 10px 0;
  width: 240px; /* Keep width for now, can be made prop later */
  border-radius: 35px; /* Override BaseCard's border-radius */
  box-shadow: 7px 7px 7px rgba(68, 129, 235, 0.4); /* Override BaseCard's shadow */
}
.product-feature-icon {
  width: 100px;
  height: 100px;
  margin-bottom: .5rem;
}
.product-feature-title {
  font-size: 18spx;
  font-family: var(--tipografia);
  font-weight:semibold;
  margin: .15rem 0 .25rem;
  color: #1f2b6c;
}
.product-feature-text {
  color: #5b6575;
  font-size: 18px;
  font-family: var(--tipografia);
  font-weight: var(--regular);
  margin: 0;
  width: 180px;
}
/* ===== MOBILE ONLY (≤768px) ===== */
@media (max-width: 768px) {
  .characteristic-card {
    width: 100%;
    max-width: 320px;
    padding: 16px;
    border-radius: 20px;
    row-gap: 12px;
  }

  .product-feature-icon {
    width: 72px;
    height: 72px;
  }

  .product-feature-title {
    font-size: clamp(1rem, 5vw, 1.2rem);
    margin: .25rem 0;
  }

  .product-feature-text {
    width: 100%;
    font-size: clamp(0.9rem, 4.3vw, 1rem);
    line-height: 1.45;
  }
}

/* ===== EXTRA PEQUEÑO (≤480px) ===== */
@media (max-width: 480px) {
  .characteristic-card {
    padding: 12px;
    border-radius: 14px;
  }
  .product-feature-icon {
    width: 64px;
    height: 64px;
  }
}

