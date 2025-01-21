<template>
    <div>
        <!-- Fondo de superposición (para pantallas pequeñas) -->
        <div v-if="isOpen" class="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden" @click="closeSidebar"></div>

        <!-- Sidebar -->
        <aside :class="[
            'fixed left-0 h-full w-64 bg-white text-translucentBlack transform transition-transform p-4 font-poppins-regular',
            isOpen ? 'translate-x-0 z-50' : '-translate-x-full z-40',
            'md:top-[64px] md:z-50', // Para pantallas mayores (después del header)
            'top-0', // Para pantallas pequeñas, encima del header
        ]">
            <!-- Botón para cerrar (visible solo en móviles) -->
            <div class="flex items-center justify-end mb-4 md:hidden">
                <button @click="closeSidebar" class="text-white focus:outline-none">
                    <img src="@icons/icono_x_24x24.svg" alt="icon_close" class="w-6 h-6">
                </button>
            </div>

            <div class="flex items-center gap-2">
                <img src="@icons/icono_sidebar_usuarios_24x24.svg" alt="icon_user" class="w-12 h-12">
                <div class="flex flex-col">
                    <span class="text-sm">Jhonattan Garcìa</span>
                    <span class="text-xs">@username</span>
                </div>
            </div>

            <!-- Contenido del Sidebar -->
            <nav class="text-sm">
                <p class="my-4 text-xs font-poppins-medium">MENÚ</p>
                <router-link v-if="isActive('/profile/account')" to="/profile/account"
                    class="block px-4 py-3 mt-2 text-white rounded-md bg-omegaOrange-400">
                    <div class="flex items-center">
                        <span>Cuenta</span>
                    </div>

                </router-link>
                <router-link v-else to="/profile/account"
                    class="block px-4 py-3 mt-2 rounded-md hover:bg-omegaOrange-50 hover:text-omegaOrange-400">
                    Cuenta
                </router-link>

                <router-link v-if="isActive('/profile/change-password')" to="/profile/change-password"
                    class="block px-4 py-3 mt-2 text-white rounded-md bg-omegaOrange-400">
                    Cambio de contraseña
                </router-link>
                <router-link v-else to="/profile/change-password"
                    class="block px-4 py-3 mt-2 rounded-md hover:bg-omegaOrange-50 hover:text-omegaOrange-400">
                    Cambio de contraseña
                </router-link>

                <router-link v-if="isActive('/profile/mobile-payment')" to="/profile/mobile-payment"
                    class="block px-4 py-3 mt-2 text-white rounded-md bg-omegaOrange-400">
                    Pago móvil
                </router-link>
                <router-link v-else to="/profile/mobile-payment"
                    class="block px-4 py-3 mt-2 rounded-md hover:bg-omegaOrange-50 hover:text-omegaOrange-400">
                    Pago móvil
                </router-link>

                <router-link v-if="isActive('/profile/directory')" to="/profile/directory"
                    class="block px-4 py-3 mt-2 text-white rounded-md bg-omegaOrange-400">
                    Directorio
                </router-link>
                <router-link v-else to="/profile/directory"
                    class="block px-4 py-3 mt-2 rounded-md hover:bg-omegaOrange-50 hover:text-omegaOrange-400">
                    Directorio
                </router-link>

                <router-link @click="contactSupport" to="#"
                    class="flex items-center px-4 py-3 mt-2 rounded-md hover:bg-omegaOrange-50 hover:text-omegaOrange-400">
                    <!-- <img src="@icons/icono_customer_24x24.svg" alt="icon_customer" class="w-5 h-5 mr-3"> -->
                    Atención al cliente
                </router-link>
                <router-link @click="logout" to="#"
                    class="flex items-center px-4 py-3 mt-2 rounded-md hover:bg-omegaOrange-50 hover:text-omegaOrange-400">
                    <!-- <img src="@icons/icono_logout_24x24.svg" alt="icon_logout" class="w-5 h-5 mr-3"> -->
                    Cerrar sesión
                </router-link>

            </nav>
        </aside>
    </div>
</template>

<script setup>
import { useRoute } from "vue-router";

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

// Función de cierre de sesión
const logout = () => {
    console.log('Cerrando sesión...');
    // Aquí se podría agregar la lógica de cierre de sesión, como limpiar el estado de autenticación, redirigir al login, etc.
};

// Función de contacto con atención al cliente
const contactSupport = () => {
    console.log('Contactando con atención al cliente...');
    // Aquí se podría redirigir a una página de contacto o abrir un modal con opciones de contacto.
};
</script>
