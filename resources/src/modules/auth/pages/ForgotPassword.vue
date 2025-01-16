<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <!-- Card con dimensiones mínimas, pero responsiva en pantallas pequeñas -->
        <div
            class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:min-w-[400px] md:min-w-[500px] min-h-[500px] flex flex-col">
            <!-- Stepper Title -->
            <h1 class="mb-6 text-xl text-center font-poppins-medium">Recuperación de contraseña</h1>

            <!-- Stepper Navigation -->
            <div class="relative flex items-center justify-between w-full">
                <div
                    class="absolute left-0 right-0 h-1 transform -translate-y-1/2 bg-gray-300 top-1/2 font-poppins-medium">
                </div>
                <div v-for="(step, index) in stepComponents" :key="index" class="relative z-10 flex items-center">
                    <div class="flex items-center justify-center w-8 h-8 border-2 rounded-full font-poppins-semibold"
                        :class="{
                            'bg-blue-500 text-white border-blue-500': currentStep >= index,
                            'bg-white text-gray-500 border-gray-300': currentStep < index,
                        }">
                        {{ index + 1 }}
                    </div>
                </div>
            </div>

            <!-- Step Content -->
            <div class="flex-grow mt-8">
                <!-- Aquí se cargarán los componentes dinámicamente -->
                <component :is="currentStepComponent" />
            </div>

            <!-- Navigation Buttons y Link -->

            <div :class="currentStep === 0 ? 'flex justify-end w-full mt-auto' : 'flex justify-between w-full mt-auto'">
                <!-- Botón Anterior -->
                <CustomButton v-if="currentStep != 0" @click="prevStep" variant="outline" type="button">
                    Anterior
                </CustomButton>

                <!-- Botón Siguiente -->
                <CustomButton :disabled="!isStepValid(currentStep)" @click="nextStep" variant="primary" type="button">
                    {{ currentStep === stepComponents.length - 1 ? 'Finalizar' : 'Continuar' }}
                </CustomButton>
            </div>

            <div class="w-full mt-6 text-center">
                <router-link to="/auth/login" class="text-sm text-[#007FFF] font-poppins-medium hover:text-[#0066CC]">
                    Volver al inicio de sesión
                </router-link>
            </div>

            <WarningPopup :title="popupTitle" :message="popupMessage" :buttonText="'Aceptar'" :isVisible="showPopup"
                @close="closePopup">
                <template #icon>
                    <img :src="isErrorPopup ? errorIcon : successIcon" alt="icon" class="w-24 h-24 mb-4">
                </template>
            </WarningPopup>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import router from "@routes/index.js";
import CustomButton from "@components/CustomButton.vue";
import WarningPopup from "@components/WarningPopup.vue";
import { useForgotPasswordStore } from '../stores/useForgotPasswordStore';
import { forgotPasswordService } from '../services/forgotPasswordService.js';
import errorIcon from '@icons/error.svg';
import successIcon from '@icons/icono_check_circulo_48x48.svg';
import Step1 from "../views/forgotSteps/Step1.vue";
import Step2 from "../views/forgotSteps/Step2.vue";
import Step3a from "../views/forgotSteps/Step3a.vue";
import Step3b from "../views/forgotSteps/Step3b.vue";
import Step4 from "../views/forgotSteps/Step4.vue";

// Acceder al store de Pinia
const forgotPasswordStore = useForgotPasswordStore();

// Limpia el estado al salir de la ruta
onBeforeRouteLeave((to, from, next) => {
    forgotPasswordStore.clearAllSteps(); // Llama al método de limpieza del store
    next(); // Permite la navegación
});

// Definir los componentes para cada paso
const currentStep = ref(0);
const stepComponents = [
    Step1,
    Step2,
    Step3a,
    Step4
];

// Control de visibilidad del pop-up
const showPopup = ref(false);
const popupTitle = ref("");
const popupMessage = ref("");


// Método para abrir el pop-up con título y mensaje dinámicos
const openPopup = (title, message) => {
    popupTitle.value = title;
    popupMessage.value = message;
    showPopup.value = true;
};

const closePopup = () => {
    if (!isErrorPopup.value) {
        router.push("/auth/login");
    }

    popupTitle.value = '';
    popupMessage.value = '';
    showPopup.value = false;
    isErrorPopup.value = false;
};

// Metodo para obtener el componente del paso actual
const currentStepComponent = computed(() => {
    if (currentStep.value === 2) {
        // Mostrar Step3a o Step3b dependiendo del método
        const method = forgotPasswordStore.step2.method;
        return method === 1 ? Step3a : Step3b;
    }
    return stepComponents[currentStep.value];
});

// Validar si el paso actual es válido
const isStepValid = (stepIndex) => {
    // Determinar el nombre del paso actual
    if (currentStep.value == 2) {
        const method = forgotPasswordStore.step2.method;
        return method == 1 ? forgotPasswordStore['step3a'].isValid : forgotPasswordStore['step3b'].isValid;
    }

    const stepName = `step${stepIndex + 1}`;
    return forgotPasswordStore[stepName].isValid;
};

// Función para avanzar al siguiente paso
const nextStep = async () => {
    try {
        // Verifica el paso actual y realiza la petición correspondiente
        if (currentStep.value == 0) {
            await forgotPasswordService.validateAffiliate();
        }

        if (currentStep.value == 2) {
            const method = forgotPasswordStore.step2.method;
            if (method === 1) {
                await forgotPasswordService.checkOTP();
            } else {
                await forgotPasswordService.answerChallenge();
            }
        }


        // Si la validación es exitosa, avanza al siguiente paso
        if (currentStep.value < stepComponents.length - 1) currentStep.value++;
        else {
            // Realizar la solicitud final al backend
            await forgotPasswordService.changePassword();
            isErrorPopup.value = false;
            openPopup("¡Éxito!", 'Su contraseña ha sido restablecida con éxito. Ahora puedes iniciar sesión.');
        }
    } catch (error) {
        isErrorPopup.value = true;
        openPopup("¡Error!", error.message);
    }
};

// Función para retroceder al paso anterior
const prevStep = () => {
    if (currentStep.value > 0) {
        currentStep.value--;
        switch (currentStep.value) {
            case 0:
                forgotPasswordStore.clearStep2();
                break;
            case 1:
                const method = forgotPasswordStore.step2.method;
                method == 1 ? forgotPasswordStore.clearStep3a() : forgotPasswordStore.clearStep3b();
                break;
            case 2:
                forgotPasswordStore.clearStep4();
                break;

        }
    }
};
</script>
