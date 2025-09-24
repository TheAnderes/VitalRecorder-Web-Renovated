<template>
  <button :type="type" :disabled="disabled" class="product-btn boton-primary">
    <div class="btn-content">
      <img :src="icon" v-if="icon" class="icon-button"> 
      <span v-if="name">{{ name }}</span> 
    </div>
  </button>
</template>

<script>
export default {
  name: "PrimaryButton",
  props: {
    name: { type: String, required: false },
    icon: { type: String, required: false },
    type: { type: String, default: "button" }, // 'button' or 'submit'
    disabled: { type: Boolean, default: false },
  },
};
</script>

<style scoped>
.product-btn {
  display: flex;
  font-family: 'Poppins', sans-serif;
  font-size: clamp(14px, 4vw, 18px);
  font-weight: 600;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  border: 2px solid transparent;
  min-height: 48px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  cursor: pointer;
}

.product-btn:hover { 
  transform: translateY(-2px); 
}

.boton-secondary {
  background: transparent;
  color: #0f2147;
  border-color: #0f2147;
}

.boton-primary {
  background: #0f2147;
  color: #fff;
  border-color: #0f2147;
}

.boton-primary:hover { 
  background: #1b2e63; 
}

.btn-content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px; /* Espacio entre el ícono y el texto */
}

.btn-content span {
  font-size: clamp(14px, 4vw, 16px);
  white-space: nowrap;
}

button[disabled] {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Responsive styles */
@media (max-width: 480px) {
  .product-btn {
    padding: 10px 16px;
    min-height: 44px;
    font-size: 14px;
  }
  
  .btn-content span {
    font-size: 14px;
  }
}
</style>
