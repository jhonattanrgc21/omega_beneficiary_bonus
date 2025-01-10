<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <!-- Stepper Title -->
            <h1 class="text-xl font-poppins-medium text-center mb-6">Registro</h1>

            <!-- Stepper Navigation -->
            <div class="relative flex justify-between items-center w-full">
                <div class="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 transform -translate-y-1/2"></div>
                <div v-for="(step, index) in steps" :key="index" class="relative z-10 flex items-center">
                    <div class="flex items-center justify-center w-8 h-8 rounded-full border-2 font-poppins-semibold" :class="{
                        'bg-blue-500 text-white border-blue-500': currentStep >= index,
                        'bg-white text-gray-500 border-gray-300': currentStep < index,
                    }">
                        {{ index + 1 }}
                    </div>
                </div>
            </div>

            <!-- Step Content -->
            <div class="mt-8">
                <h2 class="text-lg font-semibold mb-4">{{ steps[currentStep] }}</h2>
                <p class="text-gray-600">
                    Contenido del paso {{ currentStep + 1 }}. Aquí puedes personalizar lo que
                    se mostrará en cada paso.
                </p>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex justify-between mt-6">
                <CustomButton :disabled="currentStep === 0" @click="prevStep" variant="outline" type="button">
                    Anterior
                </CustomButton>

                <CustomButton :disabled="currentStep === steps.length - 1" @click="nextStep" variant="primary" type="button">
                    Siguiente
                </CustomButton>
            </div>

            <!-- Link to Login -->
            <div class="mt-4 text-center">
                <router-link to="/auth/login" class="text-sm text-[#007FFF] font-poppins-medium hover:text-[#0066CC]">
                    Volver al inicio de sesión
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CustomButton from "@components/CustomButton.vue";

const steps = ref(["Paso 1", "Paso 2", "Paso 3", "Paso 4"]);
const currentStep = ref(0);
const router = useRouter();

const nextStep = () => {
    if (currentStep.value < steps.value.length - 1) {
        currentStep.value++;
    }
};

const prevStep = () => {
    if (currentStep.value > 0) {
        currentStep.value--;
    }
};

</script>
