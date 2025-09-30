<template>
  <router-link :to="`/${root}`" class="product-btn boton-secondary">
    <div class="btn-content">
 
      <span>{{ name }}</span> 

    </div>
  </router-link>
</template>

<script>
export default {
  name: "ButtonSecondary",
  props: {
    root: { type: String, required: true },
    name: { type: String, required: false }, // 'name' ahora es opcion // Nueva prop para el ícono
  },
};
</script>

<style scoped>
.product-btn {
  display: flex;
  font-family: var(--tipografia);
  font-size: 24px;
  font-weight: 900;
  padding: 5.14px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  border: 2px solid transparent;
  height: 36px;
  width: 220px;
}

.product-btn:hover { 
  transform: translateY(-2px); 
}

.boton-secondary {
  background: transparent;
  color: #0f2147;
  border-color: #0f2147;
}


.btn-content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px; /* Espacio entre el ícono y el texto */
}

.btn-content span {
  font-size: 16px; /* Ajusta el tamaño del texto si es necesario */
}
</style>
