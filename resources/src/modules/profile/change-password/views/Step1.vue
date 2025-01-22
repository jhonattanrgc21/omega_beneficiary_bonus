<template>
    <h2 class="mb-4 text-lg font-semibold">Paso 1: Cambio de contraseña</h2>

    <PasswordRulesCard />

    <form class="flex flex-col justify-between h-full">
        <InputField @focus="setTouched('currentPassword')" @input="validateCurrentPassword" @blur="validateCurrentPassword"
            label="Contraseña actual" id="currentPassword" type="password" placeholder="Ingrese su contraseña"
            v-model="form.currentPassword" :error="errors.currentPassword" />

        <div class="mt-4">
            <InputField @focus="setTouched('newPassword')" @input="validateNewPassword" @blur="validateNewPassword"
                label="Nueva contraseña" id="newPassword" type="password" placeholder="Ingrese su contraseña"
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
import { validateNewPassword as validatePassword, validateConfirmNewPassword as validateConfirmNewP } from "@utils/validators";
import { useChangePasswordStore } from '../stores/useChangePasswordStore'
import { useForm } from "@utils/formHelper";


// Acceder al store de Pinia
const changePasswordStore = useChangePasswordStore();

const { form, touched, errors, setTouched } = useForm({
    currentPassword: changePasswordStore.step1.currentPassword ,
    newPassword: changePasswordStore.step1.newPassword,
    confirmPassword: changePasswordStore.step1.confirmPassword,
});

const validateCurrentPassword = () => {
    if (!touched.currentPassword) {
        errors.currentPassword = null;
        return;
    }
    changePasswordStore.setStep1CurrentPassword(form.currentPassword);
    errors.currentPassword = validatePassword(form.currentPassword);

    validateNewPassword();
};

const validateNewPassword = () => {
    if (!touched.newPassword) {
        errors.newPassword = null;
        return;
    }
    changePasswordStore.setStep1NewPassword(form.newPassword);
    errors.newPassword = validatePassword(form.newPassword, form.currentPassword);

    validateConfirmPassword();
};

const validateConfirmPassword = () => {
    if (!touched.confirmPassword) {
        errors.confirmPassword = null;
        return;
    }
    changePasswordStore.setStep1ConfirmPassword(form.confirmPassword);
    errors.confirmPassword = validateConfirmNewP(form.confirmPassword, form.newPassword);
};

// Computada para saber si hay errores en el formulario
const hasErrors = computed(() => {
    return Object.values(errors).some(error => error !== null) || !form.currentPassword || !form.newPassword || !form.confirmPassword;
});


// Actualizar el estado global cuando cambie la validez del formulario
watch(hasErrors, (newVal) => {
    changePasswordStore.setStep1IsValid(!newVal);
});
</script>
