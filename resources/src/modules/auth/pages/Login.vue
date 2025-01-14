<template>
    <div class="card-container px-4 py-6 md:px-10 bg-white rounded-lg  overflow-hidden shadow-lg">
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
            <CustomButton :disabled="hasErrors" @click.prevent="login" variant="primary" type="button">
                Ingresar
            </CustomButton>

            <!-- Mostrar mensaje de error del servidor -->
            <div v-if="serverErrorMessage" class="text-xs font-poppins-regular text-[#F16D85] mt-6 text-center">
                {{ serverErrorMessage }}
            </div>
        </form>

        <!-- Enlace para registro -->
        <div class="w-full mt-6 text-center">
            <router-link to="/auth/register" class="text-sm text-[#007FFF] font-poppins-medium hover:text-[#0066CC]">
                No tengo cuenta, deseo registrarme
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import router from "@routes/index.js";
import InputField from "@components/InputField.vue";
import CustomButton from "@components/CustomButton.vue";
import { useForm } from "@utils/formHelper";
import { validateUsername as validateUser, validatePassword as validatePass } from "@utils/validators";
import { authService } from "../services/authService.js";


const { form, touched, errors, setTouched } = useForm({
    username: '',
    password: ''
});

const serverErrorMessage = ref(null)

const validateUsername = () => {
    if (!touched.username) {
        errors.username = null;
        return;
    }

    errors.username = validateUser(form.username);
};

const validatePassword = () => {
    if (!touched.password) {
        errors.password = null;
        return;
    }

    errors.password = validatePass(form.password);
};

// Computada para saber si hay errores en el formulario
const hasErrors = computed(() => {
    return Object.values(errors).some(error => error !== null) || !form.username || !form.password;
});

// Enviar formulario
const login = async () => {
    validateUsername();
    validatePassword();

    if (hasErrors.value) {
        return;
    }

    try {
        await authService.login(form.username, form.password);
        router.push("/profile/account");
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            serverErrorMessage.value = error.response.data.message;
        } else {
            serverErrorMessage.value = error.message;
        }
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
