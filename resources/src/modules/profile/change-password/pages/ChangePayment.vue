<template>
    <h1>Change Password</h1>
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
