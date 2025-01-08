<template>
    <div class="flex justify-center items-center bg-gray-100 min-h-screen px-4 md:px-40 xl:px-96">
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

                <div class="mt-4 mb-6">
                    <InputField @focus="setTouched('password')" @input="validatePassword" @blur="validatePassword"
                        label="Contraseña" id="password" type="password" placeholder="Ingrese su contraseña"
                        v-model="form.password" :error="errors.password" />
                </div>

                <!-- Botón Primario con icono -->
                <CustomButton :disabled="hasErrors" @click.prevent="login" variant="primary" type="submit">
                    Ingresar
                </CustomButton>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import http from "../../core/http/api.js";
import router from "../../core/router.js";
import InputField from "@Components/InputField.vue";
import CustomButton from "@Components/CustomButton.vue";

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
const validateUsername = () => {
    if (touched.username && !form.username) {
        errors.username = 'El campo es obligatorio.';
    } else if (form.username && form.username.length < 3) {
        errors.username = 'El campo debe tener al menos 3 caracteres.';
    } else {
        errors.username = null;
    }
};

const validatePassword = () => {
    if (touched.password && !form.password) {
        errors.password = 'La contraseña es obligatoria.';
    } else if (form.password && form.password.length < 8) {
        errors.password = 'La contraseña debe tener al menos 8 caracteres.';
    } else {
        errors.password = null;
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
        const response = await http.post("/auth/login", {
            Username: form.username,
            Password: form.password,
        });

        const data = response.data;
        if (data.code !== 200) {
            alert("Credenciales incorrectas");
            return;
        }

        const token = data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(data.data[0]));
        router.push("/dashboard");
    } catch (error) {
        console.error(error);
        alert("Error al iniciar sesión");
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
