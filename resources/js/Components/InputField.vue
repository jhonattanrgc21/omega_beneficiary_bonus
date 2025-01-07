<template>
    <div class="relative">
        <!-- Renderiza el label solo si existe -->
        <label v-if="label" :for="id" class="block text-sm font-medium text-translucentBlack mb-2">{{ label }}</label>

        <!-- Contenedor para el input y el icono -->
        <div class="relative">
            <input :id="id" :type="inputType" :placeholder="placeholder" v-model="inputValue"
                class="w-full px-4 py-3 pr-10 border border-transparentBlack rounded-md focus:outline-none focus:ring-2 focus:ring-orangeLight" />

            <!-- Ícono de ojo para mostrar/ocultar contraseña -->
            <button v-if="type === 'password'" @click="togglePasswordVisibility" type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600">
                <img v-if="isPasswordVisible" src="@icons/icono_visibilidad_24x24.svg" alt="icono_visibilidad">
                <img v-else src="@icons/visibility_off.svg" alt="icono_visibility_off">
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "InputField",
    props: {
        label: {
            type: String,
            required: false,
        },
        id: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: "text",
        },
        placeholder: {
            type: String,
            default: "",
        },
        value: {
            type: [String, Number],
            default: "",
        },
    },
    data() {
        return {
            inputValue: this.value,
            isPasswordVisible: false,
        };
    },
    computed: {
        inputType() {
            return this.isPasswordVisible ? "text" : this.type;
        },
    },
    watch: {
        inputValue(newValue) {
            this.$emit("update:value", newValue);
        },
    },
    methods: {
        togglePasswordVisibility() {
            this.isPasswordVisible = !this.isPasswordVisible;
        },
    },
};
</script>
