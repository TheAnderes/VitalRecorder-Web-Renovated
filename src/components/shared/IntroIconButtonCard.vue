<template>
  <div class="product-intro-media">
    <img
      :src="icon"
      alt="Vital Recorder Device"
      class="product-intro-icon"
    />
    <!-- Mostrar el ButtonPrimary solo si alguna propiedad está presente -->
    <ButtonPrimary 
      v-if="namebutton || iconbutton" 
      :root="root"
      :name="namebutton"
      :icon="iconbutton"
    />
  </div>
</template>

<script>
import ButtonPrimary from '@/components/shared/PrimaryButton.vue'; // Importación del componente ButtonPrimary

export default {
  name: "IntroIconButtonCard",
  components: {
    ButtonPrimary, // Registrar el componente
  },
  props: {
    root: { type: String, required: true },
    namebutton: { type: String, required: false}, // 'namebutton' es opcional
    iconbutton: { type: String, required: false }, // 'iconbutton' es opcional
    icon: { type: String, required: false }, // Prop para el ícono
  },
};
</script>

<style scoped>
.product-intro-icon {
  width: auto;
  height: 400px;
}
.product-intro-media
{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
@media (max-width: 768px) {
  .product-intro-media {
    width: 100%;
    height: auto;
  }

  .product-intro-icon {
    width: 100%;
    max-width: 420px;
    height:70vw;
    margin: 0 auto;
    display: block;
  }
}

/* Muy pequeño (≤380px): limita altura visual */
@media (max-width: 380px) {
  .product-intro-icon {
    max-width: 320px;
  }
}
</style>
