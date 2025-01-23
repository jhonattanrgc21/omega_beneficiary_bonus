<template>
    <div>
        <!-- Fondo de superposición (para pantallas pequeñas) -->
        <div v-if="isOpen" class="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden" @click="closeSidebar"></div>

        <!-- Sidebar -->
        <aside :class="[
            'fixed left-0 top-0 md:top-16 h-full w-72 bg-white text-translucentBlack transform transition-transform p-4 font-poppins-regular',
            isOpen ? 'translate-x-0 z-50' : '-translate-x-full z-40'
        ]" style="overflow-y: auto; height: 100vh;">

            <!-- Botón para cerrar (visible solo en móviles) -->
            <div class="flex items-center justify-end mb-4 md:hidden">
                <button @click="closeSidebar" class="text-white focus:outline-none">
                    <img :src="closeIcon" alt="icon_close" class="w-6 h-6">
                </button>
            </div>

            <div class="flex items-center gap-2">
                <img :src="userIcon" alt="icon_user" class="w-12 h-12">
                <div class="flex flex-col">
                    <span class="text-sm font-poppins-semibold">{{ fullName }}</span>
                    <span class="text-xs">{{ username }}</span>
                </div>
            </div>

            <!-- Contenido del Sidebar -->
            <nav class="text-sm">
                <p class="my-4 text-xs font-poppins-medium">MENÚ</p>

                <!-- Opciones del menú principal -->
                <router-link v-for="option in menuOptions" :key="option.path" :to="option.path" :class="[
                    'flex items-center px-4 py-3 mt-2 rounded-md transition-all duration-200',
                    isActive(option.path)
                        ? 'text-white bg-omegaOrange-400'
                        : 'hover:bg-omegaOrange-50 hover:text-omegaOrange-400',
                ]">
                    <img :src="isActive(option.path) ? option.iconSelected : option.iconDefault" :alt="option.label"
                        class="w-5 h-5 mr-3">
                    {{ option.label }}
                </router-link>

                <!-- Opciones estáticas -->
                <router-link @click="contactSupport" to="#"
                    class="flex items-center px-4 py-3 mt-2 rounded-md hover:bg-omegaOrange-50 hover:text-omegaOrange-400">
                    <img :src="supportIcon" alt="icon_support" class="w-5 h-5 mr-3">
                    Atención al cliente
                </router-link>
                <router-link @click="logout" to="#"
                    class="flex items-center px-4 py-3 mt-2 rounded-md hover:bg-omegaOrange-50 hover:text-omegaOrange-400">
                    <img :src="logoutIcon" alt="icon_logout" class="w-5 h-5 mr-3">
                    Cerrar sesión
                </router-link>
            </nav>
        </aside>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useSessionStore } from "@stores/useSessionStore";

// Importa los íconos
import closeIcon from "@icons/icono_x_24x24.svg";
import userIcon from "@icons/icono_sidebar_usuarios_24x24.svg";
import supportIcon from "@icons/help.svg";
import logoutIcon from "@icons/logout.svg";

// Íconos dinámicos para las opciones del menú principal
import accountDefaultIcon from "@icons/credit_card_orange.svg";
import accountSelectedIcon from "@icons/credit_card_white.svg";
import passwordDefaultIcon from "@icons/lock_reset_orange.svg";
import passwordSelectedIcon from "@icons/lock_reset_white.svg";
import paymentDefaultIcon from "@icons/phonelink_ring_orange.svg";
import paymentSelectedIcon from "@icons/phonelink_ring_white.svg";
import directoryDefaultIcon from "@icons/contact_page_orange.svg";
import directorySelectedIcon from "@icons/contact_page_white.svg";

const sessionStore = useSessionStore();
const username = ref(sessionStore.username);
const fullName = ref(sessionStore.getFullName());

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(["close-sidebar"]);

const closeSidebar = () => {
    emit("close-sidebar");
};

// Determina si la ruta actual es activa
const route = useRoute();
const isActive = (path) => route.path === path;

// Opciones del menú principal con íconos dinámicos
const menuOptions = [
    {
        path: "/profile/account",
        label: "Cuenta",
        iconDefault: accountDefaultIcon,
        iconSelected: accountSelectedIcon,
    },
    {
        path: "/profile/change-password",
        label: "Cambio de contraseña",
        iconDefault: passwordDefaultIcon,
        iconSelected: passwordSelectedIcon,
    },
    {
        path: "/profile/mobile-payment",
        label: "Pago móvil",
        iconDefault: paymentDefaultIcon,
        iconSelected: paymentSelectedIcon,
    },
    {
        path: "/profile/directory",
        label: "Directorio",
        iconDefault: directoryDefaultIcon,
        iconSelected: directorySelectedIcon,
    },
];

// Función de cierre de sesión
const logout = () => {
    console.log("Cerrando sesión...");
};

// Función de contacto con atención al cliente
const contactSupport = () => {
    console.log("Contactando con atención al cliente...");
};
</script>
