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
import ButtonPrimary from '@/components/PrimaryButton.vue'; // Importación del componente ButtonPrimary

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
</style>
