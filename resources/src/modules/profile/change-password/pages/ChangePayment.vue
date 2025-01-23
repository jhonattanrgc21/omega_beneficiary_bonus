<template>
    <!-- Stepper Title -->
    <h1 class="mb-6 text-xl text-center font-poppins-medium">Cambio de contraseña</h1>

    <!-- Stepper Navigation -->
    <div class="relative flex items-center justify-between w-full">
        <div class="absolute left-0 right-0 h-1 transform -translate-y-1/2 bg-gray-300 top-1/2 font-poppins-medium">
        </div>
        <div v-for="(step, index) in stepComponents" :key="index" class="relative z-10 flex items-center">
            <div class="flex items-center justify-center w-8 h-8 border-2 rounded-full font-poppins-semibold" :class="{
                'bg-blue-500 text-white border-blue-500': currentStep >= index,
                'bg-white text-gray-500 border-gray-300': currentStep < index,
            }">
                {{ index + 1 }}
            </div>
        </div>
    </div>

    <!-- Step Content -->
    <div class="flex-grow my-8">
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

    <!-- Popup de alerta -->
    <WarningPopup v-if="showWarningPopup" :title="popupTitle" :message="popupMessage" :buttonText="'Aceptar'"
        @close="closePopup">
        <template #icon>
            <img :src="isErrorPopup ? errorIcon : successIcon" alt="icon" class="w-24 h-24 mb-4">
        </template>
    </WarningPopup>

    <!-- Popup de confirmación -->
    <ConfirmationPopup v-if="showConfirmationPopup" title="Cambiar contraseña"
        message="¿Estás seguro(a) de que deseas realizar esta operaciòn?" @confirm="handleConfirmationPopup('confirm')"
        @cancel="handleConfirmationPopup('cancel')">
        <template #icon>
            <img :src="warningIcon" alt="icon" class="w-24 h-24 mb-4">
        </template>
    </ConfirmationPopup>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import router from "@routes/index.js";
import errorIcon from '@icons/error.svg';
import successIcon from '@icons/icono_check_circulo_48x48.svg';
import warningIcon from '@icons/warning.svg';
import CustomButton from "@components/CustomButton.vue";
import WarningPopup from "@components/WarningPopup.vue";
import ConfirmationPopup from "@components/ConfirmationPopup.vue";
import Step1 from '../views/Step1.vue';
import Step2 from '../views/Step2.vue';
import { useChangePasswordStore } from '../stores/useChangePasswordStore'
import { changePasswordSservice } from '../services/changePasswordService';


const changePasswordStore = useChangePasswordStore();


// Limpia el estado al salir de la ruta
onBeforeRouteLeave((to, from, next) => {
    changePasswordStore.clearAllSteps(); // Llama al método de limpieza del store
    next(); // Permite la navegación
});

// Definir los componentes para cada paso
const currentStep = ref(0);
const stepComponents = [
    Step1,
    Step2,
];

// Control de visibilidad del pop-up
const showWarningPopup = ref(false);
const popupTitle = ref("");
const popupMessage = ref("");
const showConfirmationPopup = ref(false);
const isErrorPopup = ref(false);

// Método para abrir el pop-up con título y mensaje dinámicos
const openPopup = (title, message) => {
    popupTitle.value = title;
    popupMessage.value = message;
    showWarningPopup.value = true;
};

const closePopup = () => {
    if (!isErrorPopup.value) {
        router.push("/profile/account");
    }

    popupTitle.value = '';
    popupMessage.value = '';
    showWarningPopup.value = false;
    isErrorPopup.value = false;
};

const handleConfirmationPopup = async (action) => {
    showConfirmationPopup.value = false;

    if (action === "confirm") {
        try {
            await changePasswordSservice.changePassword();
            openPopup("¡Éxito!", 'Su cambio de contraseña ha sido procesado con éxito.');
        } catch (error) {
            isErrorPopup.value = true;
            openPopup("¡Error!", error.message);
        }
    }
}

// Metodo para obtener el componente del paso actual
const currentStepComponent = computed(() => {
    return stepComponents[currentStep.value];
});

// Validar si el paso actual es válido
const isStepValid = (stepIndex) => {
    const stepName = `step${stepIndex + 1}`;
    return changePasswordStore[stepName].isValid;
};


// Función para avanzar al siguiente paso
const nextStep = async () => {
    try {
        // Verifica el paso actual y realiza la petición correspondiente
        if (currentStep.value == 1) await changePasswordService.checkOTP();


        // Si la validación es exitosa, avanza al siguiente paso
        if (currentStep.value < stepComponents.length - 1) currentStep.value++;
        else showConfirmationPopup.value = true;
    } catch (error) {
        isErrorPopup.value = true;
        openPopup("¡Error!", error.message);
    }
};

// Función para retroceder al paso anterior
const prevStep = () => {
    if (currentStep.value > 0) {
        currentStep.value--;
        changePasswordStore.clearStep2()
    }
};
</script>
