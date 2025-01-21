<template>
    <div class="relative">
        <!-- Header -->
        <Header @toggle-sidebar="toggleSidebar" />

        <!-- Sidebar -->
        <Sidebar :isOpen="sidebarOpen" @close-sidebar="toggleSidebar" />

        <!-- Contenido principal -->
        <main
            class="min-h-screen p-6 transition-all duration-300 bg-gray-100"
            :class="{ 'ml-64': sidebarOpen && isMediumScreen }"
        >
            <div class="p-6 bg-white rounded-lg shadow">
                <router-view></router-view>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Header from "../widgets/HeaderProfile.vue";
import Sidebar from "../widgets/SidebarProfile.vue";

// Estado reactivo para controlar la visibilidad del sidebar
const sidebarOpen = ref(false);
const isMediumScreen = ref(false);

// Método para alternar el sidebar
const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
};

// Método para actualizar el tamaño de la pantalla
const updateScreenSize = () => {
    isMediumScreen.value = window.innerWidth >= 768;
    sidebarOpen.value = isMediumScreen.value; // Abre o cierra el sidebar según el tamaño
};

// Detecta el tamaño de la pantalla al montar y limpia el listener al desmontar
onMounted(() => {
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
});

onBeforeUnmount(() => {
    window.removeEventListener("resize", updateScreenSize);
});
</script>

<style scoped>
/* Estilos personalizados si son necesarios */
</style>
