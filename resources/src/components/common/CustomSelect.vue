<template>
    <div class="relative">
        <!-- Renderiza el label solo si existe -->
        <label v-if="label" :for="id" class="block mb-2 text-sm font-medium text-translucentBlack">
            {{ label }}
        </label>

        <!-- Contenedor para el select -->
        <div class="relative">
            <select v-bind="$attrs" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)"
                :id="id" :name="id"
                class="w-full px-4 py-3 text-sm border rounded-md h-11 text-softBlack font-poppins-regular border-transparentBlack focus:outline-none focus:ring-2 focus:ring-orangeLight">
                <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
                <slot />
            </select>
        </div>

        <!-- Mensaje de error -->
        <p v-if="error" class="text-xs font-poppins-regular text-[#F16D85] mt-2 pl-4">
            {{ error }}
        </p>
    </div>
</template>

<script setup>
const props = defineProps({
    label: {
        type: String,
        default: null,
    },
    id: {
        type: String,
        required: true,
    },
    error: {
        type: String,
        default: null,
    },
    modelValue: {
        type: [String, Number],
        default: "",
    },
    placeholder: {
        type: String,
        default: "",
    },
});
</script>
