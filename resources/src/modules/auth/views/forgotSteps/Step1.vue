<template>
    <div>
        <h2 class="text-lg font-semibold mb-4">Paso 1: Validación del beneficiario</h2>
        <form class="flex flex-col justify-between h-full">
            <InputField @focus="setTouched('identification')" @input="validateIdentification"
                @blur="validateIdentification" label="Cedula" id="identification" type="text"
                placeholder="Ingrese su cédula" v-model="form.identification" :error="errors.identification" />

            <div class="mt-4 mb-4">
                <CustomDatePicker @focus="setTouched('date')" @input="validateDate" @blur="validateDate"
                    label="Fecha de nacimiento" id="date" placeholder="Seleccione su fecha de nacimiento"
                    v-model="form.date" :error="errors.date" />
            </div>

            <div class="mb-8">
                <InputField @focus="setTouched('cardNumber')" @input="validateCardNumber" @blur="validateCardNumber"
                    label="Últimos 6 dígitos de la tarjeta" id="cardNumber" type="text"
                    placeholder="Ingrese los últimos 6 dígitos de su tarjeta" v-model="form.cardNumber"
                    :error="errors.cardNumber" />
            </div>
        </form>
    </div>
</template>

<script setup>
import { computed, watch } from "vue";
import InputField from "@components/InputField.vue";
import CustomDatePicker from "@components/CustomDatePicker.vue";
import { useForm } from "@utils/formHelper";
import { validateUsername as validateUser } from "@utils/validators";
import { useForgotPasswordStore } from '../../stores/useForgotPasswordStore';

// Acceder al store de Pinia
const forgotPasswordStore = useForgotPasswordStore();

const { form, touched, errors, setTouched } = useForm({
    identification: '',
    date: '',
    cardNumber: ''
});

const validateIdentification = () => {
    if (!touched.identification) {
        errors.identification = null;
        return;
    }

    errors.identification = validateUser(form.identification);
};

const validateDate = () => {
    if (!touched.date) {
        errors.date = null;
        return;
    }

    errors.date = validateUser(form.date);
};

const validateCardNumber = () => {
    if (!touched.cardNumber) {
        errors.cardNumber = null;
        return;
    }

    errors.cardNumber = validateUser(form.cardNumber);
};


// Computada para saber si hay errores en el formulario
const hasErrors = computed(() => {
    return Object.values(errors).some(error => error !== null) || !form.identification || !form.date || !form.cardNumber;
});


// Actualizar el estado global cuando cambie la validez del formulario
watch(hasErrors, (newVal) => {
    console.log(newVal);
    forgotPasswordStore.setStep1IsValid(!newVal);
});


</script>
