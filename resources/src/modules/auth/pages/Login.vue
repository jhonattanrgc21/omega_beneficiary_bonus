<template>
    <div class="card-container px-4 py-6 md:px-10 bg-white rounded overflow-hidden shadow-lg">
        <img src="@images/basic_logo.webp" class="px-3 py-3 mb-4" alt="logo_omega" />
        <div class="mt-4 mb-6 text-center">
            <p class="font-poppins-regular text-translucentBlack text-sm">
                Bienvenido al sistema de Omega Beneficiario. Para ingresar
                debes contar con una tarjeta afiliada a nuestra empresa
            </p>
        </div>

        <h2 class="mb-6 text-xl font-poppins-medium text-center text-softBlack">
            Iniciar sesión
        </h2>
        <form class="flex flex-col justify-between h-full">
            <InputField @focus="setTouched('username')" @input="validateUsername" @blur="validateUsername"
                label="Usuario" id="username" type="text" placeholder="Ingrese su usuario" v-model="form.username"
                :error="errors.username" />

            <div class="mt-4 mb-4">
                <InputField @focus="setTouched('password')" @input="validatePassword" @blur="validatePassword"
                    label="Contraseña" id="password" type="password" placeholder="Ingrese su contraseña"
                    v-model="form.password" :error="errors.password" />
            </div>

            <!-- Enlace para recuperación de contraseña -->
            <div class="mb-8 text-right">
                <router-link to="/auth/forgot-password"
                    class="text-sm text-[#007FFF] font-poppins-medium hover:text-[#0066CC]">
                    ¿Olvidaste tu contraseña?
                </router-link>
            </div>

            <!-- Botón Primario con icono -->
            <CustomButton :disabled="hasErrors" @click.prevent="login" variant="primary" type="submit">
                Ingresar
            </CustomButton>
        </form>

        <!-- Enlace para recuperación de contraseña -->
        <div class="mt-6 text-center">
            <router-link to="/auth/register" class="text-sm text-[#007FFF] font-poppins-medium hover:text-[#0066CC]">
                No tengo cuenta, deseo registrarme
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import router from "@router/index.js";
import InputField from "@components/InputField.vue";
import CustomButton from "@components/CustomButton.vue";
import { authService } from "../services/authService.js";

const form = reactive({
    username: '',
    password: ''
});

const touched = reactive({
    username: false,
    password: false
});

const errors = reactive({
    username: null,
    password: null
});

// Función para marcar el campo como tocado
const setTouched = (field) => {
    touched[field] = true;
};

// Funciones de validación para cada campo
// Validación para el campo `username`
const validateUsername = () => {
    const trimmedUsername = form.username.trim();
    const errorsMessages = {
        empty: 'El campo es obligatorio.',
        tooShort: 'El campo debe tener al menos 3 caracteres.',
        format: 'Error, solo se permiten letras, números, guiones bajos y puntos.',
        startsWithNumber: 'El valor no puede iniciar con un número.',
    };

    if (!touched.username) {
        errors.username = null; // No hay error si no se ha tocado el campo
        return;
    }

    switch (true) {
        case (trimmedUsername.length === 0):
            errors.username = errorsMessages.empty; // Error si está vacío (espacios en blanco)
            break;
        case (!/^[a-zA-Z0-9_.]+$/.test(trimmedUsername)): // Verifica si contiene solo letras, números, guiones bajos y puntos
            errors.username = errorsMessages.format;
            break;
        case (/^\d/.test(trimmedUsername)):  // Verifica si empieza con un número
            errors.username = errorsMessages.startsWithNumber;
            break;
        case (trimmedUsername.length < 3):
            errors.username = errorsMessages.tooShort; // Error si la longitud es menor a 3
            break;
        default:
            errors.username = null; // No hay error si pasa todas las validaciones
            break;
    }
};



// Validación para el campo `password`
const validatePassword = () => {
    const trimmedPassword = form.password.trim();
    const errorsMessages = {
        empty: 'La contraseña es obligatoria.',
        tooShort: 'La contraseña debe tener al menos 8 caracteres.',
    };

    if (!touched.password) {
        errors.password = null; // No hay error si no se ha tocado el campo
        return;
    }

    switch (true) {
        case (trimmedPassword.length === 0):
            errors.password = errorsMessages.empty; // Error si está vacío (espacios en blanco)
            break;
        case (trimmedPassword.length < 8):
            errors.password = errorsMessages.tooShort; // Error si la longitud es menor a 8
            break;
        default:
            errors.password = null; // No hay error si pasa todas las validaciones
            break;
    }
};


// Computada para saber si hay errores en el formulario
const hasErrors = computed(() => {
    // Verifica si hay errores y si los campos son vacíos
    return Object.values(errors).some(error => error !== null) || !form.username || !form.password;
});

// Enviar formulario
const login = async () => {
    // Validación final antes de enviar
    validateUsername();
    validatePassword();

    if (hasErrors.value) {
        return;
    }

    try {
        // Usamos el servicio authService para hacer login
        await authService.login(form.username, form.password);

        // Redirigir al dashboard
        router.push("/profile/account");

    } catch (error) {
        console.error(error);
        alert(error.message); // Mostrar el mensaje de error si hay un problema
    }
};
</script>

<style lang="scss" scoped>
.card-container {
    width: 380px;
}

@media (min-width: 768px) {
    .card-container {
        width: 432px;
    }
}
</style>
