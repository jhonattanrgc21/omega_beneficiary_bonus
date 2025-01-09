<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'primary', // 'primary', 'secondary', 'outline'
  },
  icon: {
    type: String,
    default: '', // Ruta del ícono SVG (opcional)
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const buttonStyles = computed(() => {
  const baseStyles = 'w-full py-3 px-4 font-poppins-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2';

  if (props.disabled) {
    return `${baseStyles} bg-gray-400 text-white cursor-not-allowed opacity-50`; // Deshabilitado con texto blanco
  }

  switch (props.variant) {
    case 'primary':
      return `${baseStyles} bg-orangeBright text-white hover:bg-orangeLight focus:ring-orangeRed`;
    case 'secondary':
      return `${baseStyles} text-orangeBright hover:bg-orangeBright hover:text-white focus:ring-orangePale focus:ring-opacity-50`;
    case 'outline':
      return `${baseStyles} border-2 border-orangeBright text-orangeBright hover:bg-orangeBright hover:text-white focus:ring-orangePale focus:ring-opacity-50`;
    default:
      return `${baseStyles} bg-orangeBright text-white hover:bg-orangeLight focus:ring-orangeRed`;
  }
});
</script>

<template>
  <button
    v-bind="$attrs"
    :class="[
      'w-full py-3 px-4 font-poppins-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2',
      buttonStyles
    ]"
    :type="props.type"
    :disabled="props.disabled"
  >
    <div class="flex justify-center items-center space-x-2">
      <!-- Si se pasa una ruta de icono, mostramos el ícono con <img> -->
      <img v-if="props.icon" :src="props.icon" alt="icon" class="w-5 h-5" />
      <!-- El texto del botón -->
      <slot></slot>
    </div>
  </button>
</template>

<style scoped>
/* Aquí puedes añadir más estilos si es necesario */
</style>
