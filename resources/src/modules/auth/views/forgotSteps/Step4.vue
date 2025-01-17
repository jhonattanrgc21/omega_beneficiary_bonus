<template>
    <h2 class="mb-4 text-lg font-semibold">Paso 4: Cambio de contraseña</h2>

    <PasswordRulesCard />
    
    <form class="flex flex-col justify-between h-full">
        <InputField @focus="setTouched('newPassword')" @input="validateNewPassword" @blur="validateNewPassword"
            label="Nueva contraseña" id="newPassword" type="password" placeholder="Ingrese su contraseña"
            v-model="form.newPassword" :error="errors.newPassword" />

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
import { useForm } from "@utils/formHelper";
import InputField from "@components/InputField.vue";
import PasswordRulesCard from "@components/PasswordRulesCard.vue";
import { validateNewPassword as validatePassword, validateConfirmNewPassword as validateConfirmNewP } from "@utils/validators";
import { useForgotPasswordStore } from '../../stores/useForgotPasswordStore';

// Acceder al store de Pinia
const forgotPasswordStore = useForgotPasswordStore();

const { form, touched, errors, setTouched } = useForm({
    newPassword: '',
    confirmPassword: ''
});

const validateNewPassword = () => {
    if (!touched.newPassword) {
        errors.newPassword = null;
        return;
    }
    forgotPasswordStore.setStep4NewPassword(form.newPassword);
    errors.newPassword = validatePassword(form.newPassword);

    validateConfirmPassword();
};

const validateConfirmPassword = () => {
    if (!touched.confirmPassword) {
        errors.confirmPassword = null;
        return;
    }
    forgotPasswordStore.setStep4ConfirmPassword(form.confirmPassword);
    errors.confirmPassword = validateConfirmNewP(form.confirmPassword, form.newPassword);
};

// Computada para saber si hay errores en el formulario
const hasErrors = computed(() => {
    return Object.values(errors).some(error => error !== null) || !form.newPassword || !form.confirmPassword;
});


// Actualizar el estado global cuando cambie la validez del formulario
watch(hasErrors, (newVal) => {
    forgotPasswordStore.setStep4IsValid(!newVal);
});

</script>
