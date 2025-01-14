<template>
    <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white rounded-lg shadow-lg p-6  max-w-sm w-80 sm:w-fit">
            <div class="flex flex-col items-center">
                <!-- Icono -->
                <slot name="icon">
                </slot>

                <!-- Título -->
                <h3 class="text-lg text-softBlack font-poppins-medium text-center mb-4">{{ title }}</h3>

                <!-- Mensaje -->
                <p class="mb-6 text-center text-translucentBlack font-poppins-regular text-base">{{ message }}</p>

                <!-- Botón -->
                <CustomButton class="w-full" @click="handleClose" variant="primary" type="button">
                    {{ buttonText }}
                </CustomButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue';
import CustomButton from "@components/CustomButton.vue";

// Props
defineProps({
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    buttonText: {
        type: String,
        default: "Aceptar",
    },
    isVisible: {
        type: Boolean,
        required: true,
    },
});

// Emits
const emit = defineEmits(['close']);

// Methods
const handleClose = () => {
    emit('close');
};
</script>
