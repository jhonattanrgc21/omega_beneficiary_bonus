<template>
    <h2 class="mb-4 text-lg font-semibold">Paso 5: Configuración de credenciales</h2>

    <PasswordRulesCard />

    <form class="flex flex-col justify-between h-full">
        <InputField @focus="setTouched('username')" @input="validateUsername" @blur="validateUsername" label="Usuario"
            id="username" type="text" placeholder="Ingrese su nombre de usuario" v-model="form.username"
            :error="errors.username" />

        <div class="mt-4">
            <InputField @focus="setTouched('newPassword')" @input="validateNewPassword" @blur="validateNewPassword"
                label="Contraseña" id="newPassword" type="password" placeholder="Ingrese su contraseña"
                v-model="form.newPassword" :error="errors.newPassword" />
        </div>

        <div class="mt-4">
            <InputField @focus="setTouched('confirmPassword')" @input="validateConfirmPassword"
                @blur="validateConfirmPassword" label="Confirmación de la contraseña" id="confirmPassword"
                type="password" placeholder="Ingrese la confirmación su contraseña" v-model="form.confirmPassword"
                :error="errors.confirmPassword" />
        </div>
    </form>
</template>

<script setup>
import { computed, watch } from "vue";
import InputField from "@components/InputField.vue";
import PasswordRulesCard from "@components/PasswordRulesCard.vue";
import { validateNewPassword as validatePassword, validateConfirmNewPassword as validateConfirmNewP, validateSimpleStringInput as validateU } from "@utils/validators";
import { useRegisterStore } from '../../stores/useRegisterStore';
import { useForm } from "@utils/formHelper";

// Acceder al store de Pinia
const registerStore = useRegisterStore();

const { form, touched, errors, setTouched } = useForm({
    username: '',
    newPassword: '',
    confirmPassword: ''
});

const validateUsername = () => {
    if (!touched.username) {
        errors.username = null;
        return;
    }
    registerStore.setStep5Username(form.username);
    errors.username = validateU(form.username);
};

const validateNewPassword = () => {
    if (!touched.newPassword) {
        errors.newPassword = null;
        return;
    }
    registerStore.setStep5NewPassword(form.newPassword);
    errors.newPassword = validatePassword(form.newPassword);

    validateConfirmPassword();
};

const validateConfirmPassword = () => {
    if (!touched.confirmPassword) {
        errors.confirmPassword = null;
        return;
    }
    registerStore.setStep5ConfirmPassword(form.confirmPassword);
    errors.confirmPassword = validateConfirmNewP(form.confirmPassword, form.newPassword);
};

// Computada para saber si hay errores en el formulario
const hasErrors = computed(() => {
    return Object.values(errors).some(error => error !== null) || !form.username || !form.newPassword || !form.confirmPassword;
});


// Actualizar el estado global cuando cambie la validez del formulario
watch(hasErrors, (newVal) => {
    registerStore.setStep5IsValid(!newVal);
});
</script>
