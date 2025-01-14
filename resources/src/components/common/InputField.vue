<template>
    <div class="relative">
        <!-- Renderiza el label solo si existe -->
        <label v-if="label" :for="id" class="block text-sm font-medium text-translucentBlack mb-2">{{ label }}</label>

        <!-- Contenedor para el input y el icono -->
        <div class="relative">
            <input v-bind="$attrs" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
                :type="computedType" :id="id" :name="id"
                class="w-full text-sm text-softBlack font-poppins-regular px-4 py-3 pr-10 border border-transparentBlack rounded-md focus:outline-none focus:ring-2 focus:ring-orangeLight" />

            <!-- Ícono de ojo para mostrar/ocultar contraseña -->
            <button v-if="type === 'password'" @click="togglePasswordVisibility" type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center ">
                <img v-if="isPasswordVisible" src="@icons/icono_visibilidad_24x24.svg" alt="icono_visibilidad">
                <img v-else src="@icons/visibility_off.svg" alt="icono_visibility_off">
            </button>
        </div>

        <!-- Mensaje de error -->
        <p v-if="error" class="text-xs font-poppins-regular text-[#F16D85] mt-2 pl-4">{{ error }}</p>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Parámetros del componente
const props = defineProps({
    label: {
        type: String,
        default: null,
    },
    id: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: "text",
    },
    error: {
        type: String,
        default: null, // Mensaje de error opcional
    },
    modelValue: {
        type: [String, Number],
        default: "",
    },
});

// Controla si la contraseña es visible
const isPasswordVisible = ref(false);

// Operaciones para modificar el tipo de input y el icono del ojo
const computedType = computed(() => {
    return props.type === "password" && isPasswordVisible.value ? "text" : props.type;
});

const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value;
};
</script>
