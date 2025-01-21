<template>
    <header class="z-50 flex items-center justify-between h-16 p-4 border-b border-gray-300 bg-omegaOrange-75 text-softBlack">
        <!-- Boton de menu -->
        <div class="flex items-center space-x-2">
            <button class="focus:outline-none" @click="toggleSidebar">
                <img src="@icons/icon_menu_black.svg" alt="icon_menu" class="w-6 h-6">
            </button>
        </div>

        <!-- Logo de la aplicacion -->
        <div class="flex items-center space-x-4">
            <img src="@images/basic_logo.webp" alt="Logo" class="w-auto h-8" />
        </div>
    </header>
</template>

<script setup>
// Emitir evento para el toggle del sidebar
const emit = defineEmits(["toggle-sidebar"]);

const toggleSidebar = () => {
  emit("toggle-sidebar");
};
</script>
