<template>
    <h2 class="mb-4 text-lg font-semibold">Paso 2: Métodos de recuperación de contraseña</h2>
    <div class="flex flex-col p-6 space-y-4">
        <!-- Item 1 -->
        <div class="flex items-center space-x-4">
            <input type="radio" id="method1" name="method" v-model="selectedItem" value="1"
                class="w-5 h-5 border-2 border-gray-300 rounded-full appearance-none focus:ring-1 focus:ring-orangeBright checked:bg-orangeBright" />
            <div>
                <h3 class="text-base text-softBlack font-poppins-medium">Enviar código por correo electrónico:</h3>
                <p class="text-sm text-translucentBlack font-poppins-regular">{{ email }}</p>
            </div>
        </div>

        <!-- Item 2 -->
        <div class="flex items-center space-x-4">
            <input type="radio" id="method2" name="method" v-model="selectedItem" value="2"
                class="w-5 h-5 border-2 border-gray-300 rounded-full appearance-none focus:ring-1 focus:ring-orangeBright checked:bg-orangeBright" />
            <div>
                <h3 class="text-base font-semibold text-softBlack">Responder preguntas de seguridad</h3>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useForgotPasswordStore } from '../../stores/useForgotPasswordStore';

// Acceder al store de Pinia
const forgotPasswordStore = useForgotPasswordStore();
const email = ref(forgotPasswordStore.step1.response.usaCorreo);

// Inicializar el selectedItem con el valor del método en el store
const selectedItem = ref(forgotPasswordStore.step2.method);

// Escuchar cambios en selectedItem y actualizar el store
watch(selectedItem, (newValue) => {
    forgotPasswordStore.setStep2Method(newValue);
});
</script>
