<template>
  <article class="base-card">
    <slot></slot>
  </article>
</template>

<script>
export default {
  name: "BaseCard",
};
</script>

<style scoped>
.base-card {
  background: #ffffff;
  border-radius: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  box-sizing: border-box;
}
</style>
