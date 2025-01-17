<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="max-w-sm p-6 bg-white rounded-lg shadow-lg w-80 sm:w-fit">
            <div class="flex flex-col items-center">
                <!-- Icono -->
                <slot name="icon"></slot>

                <!-- Título -->
                <h3 class="mb-4 text-lg text-center text-softBlack font-poppins-medium">{{ title }}</h3>

                <!-- Mensaje -->
                <p class="mb-6 text-base text-center text-translucentBlack font-poppins-regular">{{ message }}</p>

                <!-- Botones -->
                <div class="flex flex-col w-full gap-4 md:flex-row">
                    <!-- Botón de Confirmar -->

                    <!-- Botón de Cancelar -->
                    <CustomButton class="flex-1 order-2 md:order-none" @click="handleCancel" variant="secondary"
                        type="button">
                        {{ cancelButtonText }}
                    </CustomButton>

                    <CustomButton class="flex-1 order-1 md:order-none" @click="handleConfirm" variant="primary"
                        type="button">
                        {{ confirmButtonText }}
                    </CustomButton>

                </div>

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
    confirmButtonText: {
        type: String,
        default: "Confirmar",
    },
    cancelButtonText: {
        type: String,
        default: "Cancelar",
    },
});

// Emits
const emit = defineEmits(['confirm', 'cancel']);

// Methods
const handleConfirm = () => {
    emit('confirm');
};

const handleCancel = () => {
    emit('cancel');
};
</script>
