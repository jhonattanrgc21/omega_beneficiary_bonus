<template>
    <h2 class="mb-4 text-lg font-semibold">Paso 2: Datos de contacto</h2>
    <form class="flex flex-col justify-between h-full">

        <InputField @focus="setTouched('email')" @input="validateEmail" @blur="validateEmail" label="Correo electrónico"
            id="email" type="email" placeholder="Ingrese su correo electrónico" v-model="form.email"
            :error="errors.email" />

        <div class="mt-4 mb-4">
            <label for="phoneCode" class="block mb-2 text-sm font-medium text-translucentBlack">Teléfono</label>
            <div class="flex items-center">
                <!-- Select para el código de teléfono con flex-grow-0 para no crecer -->
                <CustomSelect @focus="setTouched('phoneCode')" @change="validatePhoneCode" @blur="validatePhoneCode"
                    id="phoneCode" v-model="form.phoneCode" class="flex-grow-0">
                    <option value="0412">0412</option>
                    <option value="0414">0414</option>
                    <option value="0424">0424</option>
                    <option value="0416">0416</option>
                    <option value="0426">0426</option>
                </CustomSelect>


                <InputField @focus="setTouched('phoneNumber')" @input="validatePhoneNumber" @blur="validatePhoneNumber"
                    id="phoneNumber" type="text" placeholder="Ingrese su número" v-model="form.phoneNumber"
                    class="flex-grow" />
            </div>
            <p v-if="errors.phoneNumber" class="text-xs font-poppins-regular text-[#F16D85] pl-4 mt-2">{{
                errors.phoneNumber }}</p>

        </div>
    </form>
</template>



<script setup>
import { computed, watch } from "vue";
import InputField from "@components/InputField.vue";
import CustomSelect from "@components/CustomSelect.vue";
import { useForm } from "@utils/formHelper";
import { validatePhoneCode as validatephoneC, validatePhoneNumber as validatePhoneN, validateEmail as validateE } from "@utils/validators";
import { useRegisterStore } from '../../stores/useRegisterStore';

// Acceder al store de Pinia
const registerStore = useRegisterStore();

const { form, touched, errors, setTouched } = useForm({
    email: registerStore.step2.email,
    phoneCode: registerStore.step2.phoneCode,
    phoneNumber: registerStore.step2.phoneNumber,
});

const validatePhoneCode = () => {
    if (!touched.phoneCode) {
        errors.phoneCode = null;
        return;
    }
    registerStore.setStep2PhoneCode(form.phoneCode);
    errors.phoneCode = validatephoneC(form.phoneCode);
};

const validatePhoneNumber = () => {
    if (!touched.phoneNumber) {
        errors.phoneNumber = null;
        return;
    }
    registerStore.setStep2PhoneNumber(form.phoneNumber);
    errors.phoneNumber = validatePhoneN(form.phoneNumber);
};

const validateEmail = () => {
    if (!touched.email) {
        errors.email = null;
        return;
    }
    registerStore.setStep2Email(form.email);
    errors.email = validateE(form.email);
};

// Computada para saber si hay errores en el formulario
const hasErrors = computed(() => {
    return Object.values(errors).some(error => error !== null) || !form.phoneCode || !form.phoneNumber || !form.email;
});


// Actualizar el estado global cuando cambie la validez del formulario
watch(hasErrors, (newVal) => {
    registerStore.setStep2IsValid(!newVal);
});
</script>
