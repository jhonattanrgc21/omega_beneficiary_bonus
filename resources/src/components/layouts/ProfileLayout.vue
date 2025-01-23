<template>
    <div class="relative flex h-screen">
        <!-- Sidebar -->
        <Sidebar :isOpen="sidebarOpen" @close-sidebar="toggleSidebar" />

        <div class="flex flex-col flex-1">
            <!-- Header -->
            <Header @toggle-sidebar="toggleSidebar" />

            <!-- Contenido principal -->
            <main class="flex-1 p-6 overflow-auto transition-all duration-300 bg-gray-100"
                :class="{ 'ml-72': sidebarOpen && isMediumScreen }">
                <div class="flex items-center justify-center">
                    <router-view></router-view>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Header from "../widgets/HeaderProfile.vue";
import Sidebar from "../widgets/SidebarProfile.vue";

const sidebarOpen = ref(false);
const isMediumScreen = ref(false);

const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
};

const updateScreenSize = () => {
    isMediumScreen.value = window.innerWidth >= 768;
    sidebarOpen.value = isMediumScreen.value;
};

onMounted(() => {
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
});

onBeforeUnmount(() => {
    window.removeEventListener("resize", updateScreenSize);
});
</script>

<style scoped>
/* Añade un margen si hay problemas visuales con el header y el sidebar */
</style>
