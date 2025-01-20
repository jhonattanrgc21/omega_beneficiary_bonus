<template>
    <h2 class="mb-4 text-lg font-semibold">Paso 1: Verificación del beneficiario</h2>
    <form class="flex flex-col justify-between h-full">
        <InputField @focus="setTouched('identification')" @input="validateIdentification" @blur="validateIdentification"
            label="Cedula" id="identification" type="text" placeholder="Ingrese su cédula" v-model="form.identification"
            :error="errors.identification" />

        <div class="mt-4 mb-4">
            <CustomDatePicker @focus="setTouched('date')" @input="validateDate" @blur="validateDate"
                label="Fecha de nacimiento" id="date" placeholder="Seleccione su fecha de nacimiento"
                v-model="form.date" :error="errors.date" />
        </div>

        <InputField @focus="setTouched('cardNumber')" @input="validateCardNumber" @blur="validateCardNumber"
            label="Últimos 6 dígitos de la tarjeta" id="cardNumber" type="text"
            placeholder="Ingrese los últimos 6 dígitos de su tarjeta" v-model="form.cardNumber"
            :error="errors.cardNumber" />
    </form>
</template>

<script setup>
import { computed, watch } from "vue";
import InputField from "@components/InputField.vue";
import CustomDatePicker from "@components/CustomDatePicker.vue";
import { useForm } from "@utils/formHelper";
import { validateIdentification as validateIdent, validateDate as validateD, validateCard as validateC } from "@utils/validators";
import { useRegisterStore } from '../../stores/useRegisterStore';

// Acceder al store de Pinia
const registerStore = useRegisterStore();

const { form, touched, errors, setTouched } = useForm({
    identification: registerStore.step1.identification,
    date: registerStore.step1.date,
    cardNumber: registerStore.step1.cardNumber
});

const validateIdentification = () => {
    if (!touched.identification) {
        errors.identification = null;
        return;
    }
    registerStore.setStep1Identification(form.identification);
    errors.identification = validateIdent(form.identification);
};

const validateDate = () => {
    if (!touched.date) {
        errors.date = null;
        return;
    }
    registerStore.setStep1Date(form.date);
    errors.date = validateD(form.date);
};

const validateCardNumber = () => {
    if (!touched.cardNumber) {
        errors.cardNumber = null;
        return;
    }
    registerStore.setStep1CardNumber(form.cardNumber);
    errors.cardNumber = validateC(form.cardNumber);
};


// Computada para saber si hay errores en el formulario
const hasErrors = computed(() => {
    return Object.values(errors).some(error => error !== null) || !form.identification || !form.date || !form.cardNumber;
});


// Actualizar el estado global cuando cambie la validez del formulario
watch(hasErrors, (newVal) => {
    registerStore.setStep1IsValid(!newVal);
});


</script>
