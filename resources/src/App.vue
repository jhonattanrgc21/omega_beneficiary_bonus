<template>
    <div id="app">
      <router-view></router-view>
      <Loading :active="isLoading" :is-full-page="true" />
    </div>
  </template>

  <script setup>
   import Loading from 'vue-loading-overlay';
  import { useLoadingStore } from '@stores/useLoadingStore.js';
  import { computed } from 'vue';

  // Usamos la tienda de Pinia
  const loadingStore = useLoadingStore();

  // Los valores reactivos que usaremos en el template
  const isLoading = computed(() => loadingStore.$state.isLoading); // Usamos computed para que sea reactivo
  </script>

  <style lang="scss" scoped>
  #app {
    font-family: 'Poppins-Regular', sans-serif;
  }

  /* Si el estilo del spinner necesita personalización, puedes hacerlo aquí. */
  </style>
