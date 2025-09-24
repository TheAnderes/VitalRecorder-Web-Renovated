<template>
  <div class="form-group">
    <label :for="id">
      {{ label }} <span v-if="required" class="required">*</span>
    </label>
    <textarea
      v-if="type === 'textarea'"
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :required="required"
      :rows="rows"
    ></textarea>
    <input
      v-else
      :type="type"
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :required="required"
      :minlength="minlength"
    />
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    label: { type: String, required: true },
    id: { type: String, required: true },
    type: { type: String, default: "text" },
    modelValue: { type: [String, Number], default: "" },
    placeholder: { type: String, default: "" },
    required: { type: Boolean, default: false },
    minlength: { type: [String, Number], default: null },
    rows: { type: [String, Number], default: 5 }, // Added for textarea
  },
};
</script>

<style scoped>
.form-group {
  margin-bottom: clamp(16px, 3vw, 25px);
  width: 100%;
}

.form-group label {
  display: block;
  margin-bottom: clamp(6px, 1.5vw, 10px);
  font-weight: 600;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  color: #0f2147;
  line-height: 1.4;
}

.form-group .required {
  color: #ff0000;
}

.form-group input,
.form-group textarea {
  width: 100%;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: clamp(10px, 3vw, 12px) clamp(12px, 3.5vw, 14px);
  background: #f8fafc;
  outline: none;
  transition: all 0.2s ease-in-out;
  font-family: 'Poppins', 'Inter', sans-serif;
  font-size: clamp(0.9rem, 3vw, 1rem);
  box-sizing: border-box;
  min-height: 44px; /* Minimum touch target size */
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

input:focus,
textarea:focus {
  border-color: #4481eb;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(68, 129, 235, 0.2);
}

/* Responsive styles */
@media (max-width: 480px) {
  .form-group {
    margin-bottom: 16px;
  }
  
  .form-group input,
  .form-group textarea {
    padding: 10px 12px;
    font-size: 16px; /* Prevents zoom on iOS */
  }
  
  .form-group label {
    font-size: 0.9rem;
    margin-bottom: 6px;
  }
}
</style>
