<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="max-w-sm p-6 bg-white rounded-lg shadow-lg w-80 sm:w-fit">
            <div class="flex flex-col items-center">
                <!-- Icono -->
                <slot name="icon">
                </slot>

                <!-- Título -->
                <h3 class="mb-4 text-lg text-center text-softBlack font-poppins-medium">{{ title }}</h3>

                <!-- Mensaje -->
                <p class="mb-6 text-base text-center text-translucentBlack font-poppins-regular">{{ message }}</p>

                <!-- Botón -->
                <CustomButton class="w-full" @click="handleClose" variant="primary" type="button">
                    {{ buttonText }}
                </CustomButton>
            </div>
        </div>
    </div>
</template>

<script setup>
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
});

// Emits
const emit = defineEmits(['close']);

// Methods
const handleClose = () => {
    emit('close');
};
</script>
