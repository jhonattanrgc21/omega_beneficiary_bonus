<template>
  <div class="relative">
    <!-- Renderiza el label solo si existe -->
    <label v-if="label" :for="id" class="block text-sm font-medium text-translucentBlack mb-2">{{ label }}</label>

    <!-- Contenedor para el input y el icono -->
    <div class="relative">
      <input
        v-bind="$attrs"
        v-model="value"
        type="date"
        :id="id"
        :name="id"
        class="w-full text-sm text-softBlack font-poppins-regular px-4 py-3 border border-transparentBlack rounded-md focus:outline-none focus:ring-2 focus:ring-orangeLight"
      />
    </div>

    <!-- Mensaje de error -->
    <p v-if="error" class="text-xs font-poppins-regular text-[#F16D85] mt-2 pl-4">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const value = ref("");

const props = defineProps({
  label: {
    type: String,
    default: null,
  },
  id: {
    type: String,
    required: true,
  },
  error: {
    type: String,
    default: null,
  },
});
</script>
