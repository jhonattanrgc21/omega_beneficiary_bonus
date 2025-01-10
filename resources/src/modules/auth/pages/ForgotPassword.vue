<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <!-- Card con dimensiones mínimas, pero responsiva en pantallas pequeñas -->
        <div
            class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:min-w-[400px] md:min-w-[500px] min-h-[500px] flex flex-col">
            <!-- Stepper Title -->
            <h1 class="text-xl font-poppins-medium text-center mb-6">Recuperación de contraseña</h1>

            <!-- Stepper Navigation -->
            <div class="relative flex justify-between items-center w-full">
                <div
                    class="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 font-poppins-medium transform -translate-y-1/2">
                </div>
                <div v-for="(step, index) in stepComponents" :key="index" class="relative z-10 flex items-center">
                    <div class="flex items-center justify-center w-8 h-8 rounded-full border-2 font-poppins-semibold"
                        :class="{
                            'bg-blue-500 text-white border-blue-500': currentStep >= index,
                            'bg-white text-gray-500 border-gray-300': currentStep < index,
                        }">
                        {{ index + 1 }}
                    </div>
                </div>
            </div>

            <!-- Step Content -->
            <div class="mt-8 flex-grow">
                <!-- Aquí se cargarán los componentes dinámicamente -->
                <component :is="currentStepComponent" />
            </div>

            <!-- Navigation Buttons y Link -->

            <div
                :class="currentStep === 0 ? 'flex justify-end w-full mt-auto' : 'flex justify-between w-full mt-auto'">
                <!-- Botón Anterior -->
                <CustomButton v-if="currentStep != 0" @click="prevStep" variant="outline" type="button">
                    Anterior
                </CustomButton>

                <!-- Botón Siguiente -->
                <CustomButton :disabled="!isStepValid(currentStep)" @click="nextStep" variant="primary" type="button">
                    {{ currentStep === stepComponents.length - 1 ? 'Finalizar' : 'Continuar' }}
                </CustomButton>
            </div>

            <div class="mt-4 text-center w-full">
                <router-link to="/auth/login" class="text-sm text-[#007FFF] font-poppins-medium hover:text-[#0066CC]">
                    Volver al inicio de sesión
                </router-link>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import CustomButton from "@components/CustomButton.vue";
import { useForgotPasswordStore } from '../stores/useForgotPasswordStore';
import Step1 from "../views/forgotSteps/Step1.vue";
import Step2 from "../views/forgotSteps/Step2.vue";
import Step3a from "../views/forgotSteps/Step3a.vue";
import Step3b from "../views/forgotSteps/Step3b.vue";
import Step4 from "../views/forgotSteps/Step4.vue";

// Acceder al store de Pinia
const forgotPasswordStore = useForgotPasswordStore();

const currentStep = ref(0);

// Definir los componentes para cada paso
const stepComponents = [
    Step1,
    Step2,
    Step3a,
    Step4
];

// Computed property para obtener el componente del paso actual
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
const nextStep = () => {
    if (currentStep.value < stepComponents.length - 1) {
        currentStep.value++;
    } else {
        // Realizar la solicitud final al backend
        submitFinalData();
    }
};

// Función para retroceder al paso anterior
const prevStep = () => {
    if (currentStep.value > 0) {
        currentStep.value--;
        switch (currentStep.value) {
            case 1:
                forgotPasswordStore.clearStep2();
                break;
            case 2:
                const method = forgotPasswordStore.step2.method;
                method == 1 ? forgotPasswordStore.clearStep3a() : forgotPasswordStore.clearStep3b();
                break;
            case 3:
                forgotPasswordStore.clearStep4();
                break;
        }
    }
};

// Enviar datos al backend (cuando el usuario llega al último paso)
const submitFinalData = () => {
    // Aquí deberías realizar la petición al backend para cambiar la contraseña o lo que sea necesario
    console.log('Enviando datos al backend...');
};

</script>
