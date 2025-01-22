<template>
    <div class="relative">
        <!-- Header -->
        <Header @toggle-sidebar="toggleSidebar" />

        <!-- Sidebar -->
        <Sidebar :isOpen="sidebarOpen" @close-sidebar="toggleSidebar" />

        <!-- Contenido principal -->
        <main class="min-h-screen p-6 transition-all duration-300 bg-gray-100"
            :class="{ 'ml-72': sidebarOpen && isMediumScreen }">
            <!-- <div class="p-6 bg-white rounded-lg shadow">
                <router-view></router-view>
            </div> -->
            <div class="flex items-center justify-center">
                <router-view></router-view>
            </div>
        </main>
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
/* Estilo adicional si es necesario */
</style>
