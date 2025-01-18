<template>
    <div class="relative">
        <!-- Renderiza el label solo si existe -->
        <label v-if="label" :for="id" class="block mb-2 text-sm font-medium text-translucentBlack">{{ label }}</label>

        <!-- Contenedor para el input y el icono -->
        <div class="relative">
            <input v-bind="$attrs" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
                :type="computedType" :id="id" :name="id"
                class="w-full h-12 px-4 py-3 pr-10 text-sm border rounded-md text-softBlack font-poppins-regular border-transparentBlack focus:outline-none focus:ring-2 focus:ring-orangeLight" />

            <!-- Ícono de ojo para mostrar/ocultar contraseña -->
            <button v-if="type === 'password'" @click="togglePasswordVisibility" type="button"
                class="absolute inset-y-0 right-0 flex items-center pr-3 ">
                <img :src="isPasswordVisible? visibilityOnIcon : visibilityOffIcon" alt="icono_visibilidad">
            </button>
        </div>

        <!-- Mensaje de error -->
        <p v-if="error" class="text-xs font-poppins-regular text-[#F16D85] mt-2 pl-4">{{ error }}</p>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import visibilityOnIcon from '@icons/icono_visibilidad_24x24.svg'
import visibilityOffIcon from '@icons/visibility_off.svg'

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
