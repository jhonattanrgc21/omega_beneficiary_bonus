<template>
    <h2 class="mb-4 text-lg font-semibold">Paso 3: Responder preguntas de seguridad</h2>
    <form class="flex flex-col justify-between h-full">

        <!-- Label común para el teléfono -->
        <label for="phoneCode" class="block mb-2 text-sm font-medium text-translucentBlack">Teléfono</label>

        <div class="flex items-center">
            <!-- Select para el código de teléfono con flex-grow-0 para no crecer -->
            <CustomSelect @focus="setTouched('phoneCode')" @input="validatePhoneCode" @blur="validatePhoneCode"
                id="phoneCode" v-model="form.phoneCode" class="flex-grow-0">
                <option value="0412">0412</option>
                <option value="0414">0414</option>
                <option value="0424">0424</option>
                <option value="0416">0416</option>
                <option value="0426">0426</option>
            </CustomSelect>

            <!-- Input para el número de teléfono con flex-grow-1 para que ocupe más espacio -->
            <InputField @focus="setTouched('phoneNumber')" @input="validatePhoneNumber" @blur="validatePhoneNumber"
                id="phoneNumber" type="text" placeholder="Ingrese su número" v-model="form.phoneNumber"
                class="flex-grow" />
        </div>
        <p v-if="errors.phoneNumber" class="text-xs font-poppins-regular text-[#F16D85] pl-4 mt-2 mb-4">{{
            errors.phoneNumber }}</p>

        <div class="mt-4 mb-4">
            <InputField @focus="setTouched('securityQuestionAnswer1')" @input="validateSecurityQuestionAnswer1"
                @blur="validateSecurityQuestionAnswer1" label="Respuesta 1" id="securityQuestionAnswer1"
                placeholder="Ingrese su respuesta" v-model="form.securityQuestionAnswer1"
                :error="errors.securityQuestionAnswer1" />
        </div>

        <div class="mb-4">
            <InputField @focus="setTouched('securityQuestionAnswer2')" @input="validateSecurityQuestionAnswer2"
                @blur="validateSecurityQuestionAnswer2" label="Respuesta 2" id="securityQuestionAnswer2"
                placeholder="Ingrese su respuesta" v-model="form.securityQuestionAnswer2"
                :error="errors.securityQuestionAnswer2" />
        </div>

        <div class="mb-8">
            <InputField @focus="setTouched('securityQuestionAnswer3')" @input="validateSecurityQuestionAnswer3"
                @blur="validateSecurityQuestionAnswer3" label="Respuesta 3" id="securityQuestionAnswer3"
                placeholder="Ingrese su respuesta" v-model="form.securityQuestionAnswer3"
                :error="errors.securityQuestionAnswer3" />
        </div>
    </form>
</template>



<script setup>
import { computed, watch } from "vue";
import InputField from "@components/InputField.vue";
import CustomSelect from "@components/CustomSelect.vue";
import { validatePhoneCode as validatephoneC, validatePhoneNumber as validatePhoneN, validateTextInput } from "@utils/validators";
import { useForm } from "@utils/formHelper";
import { useForgotPasswordStore } from '../../stores/useForgotPasswordStore';

// Acceder al store de Pinia
const forgotPasswordStore = useForgotPasswordStore();

const { form, touched, errors, setTouched } = useForm({
    phoneCode: forgotPasswordStore.step3b.phoneCode,
    phoneNumber: forgotPasswordStore.step3b.phoneNumber,
    securityQuestionAnswer1: forgotPasswordStore.step3b.securityQuestionAnswer1,
    securityQuestionAnswer2: forgotPasswordStore.step3b.securityQuestionAnswer2,
    securityQuestionAnswer3: forgotPasswordStore.step3b.securityQuestionAnswer3
});

const validatePhoneCode = () => {
    if (!touched.phoneCode) {
        errors.phoneCode = null;
        return;
    }
    forgotPasswordStore.setStep3bPhoneCode(form.phoneCode);
    errors.phoneCode = validatephoneC(form.phoneCode);
};

const validatePhoneNumber = () => {
    if (!touched.phoneNumber) {
        errors.phoneNumber = null;
        return;
    }
    forgotPasswordStore.setStep3bPhoneNumber(form.phoneNumber);
    errors.phoneNumber = validatePhoneN(form.phoneNumber);
};

const validateSecurityQuestionAnswer1 = () => {
    if (!touched.securityQuestionAnswer1) {
        errors.securityQuestionAnswer1 = null;
        return;
    }
    forgotPasswordStore.setStep3bSecurityQuestionAnswer1(form.securityQuestionAnswer1);
    errors.securityQuestionAnswer1 = validateTextInput(form.securityQuestionAnswer1);
};

const validateSecurityQuestionAnswer2 = () => {
    if (!touched.securityQuestionAnswer2) {
        errors.securityQuestionAnswer2 = null;
        return;
    }
    forgotPasswordStore.setStep3bSecurityQuestionAnswer2(form.securityQuestionAnswer2);
    errors.securityQuestionAnswer2 = validateTextInput(form.securityQuestionAnswer2);
};


const validateSecurityQuestionAnswer3 = () => {
    if (!touched.securityQuestionAnswer3) {
        errors.securityQuestionAnswer3 = null;
        return;
    }
    forgotPasswordStore.setStep3bSecurityQuestionAnswer3(form.securityQuestionAnswer3);
    errors.securityQuestionAnswer3 = validateTextInput(form.securityQuestionAnswer3);
};

// Computada para saber si hay errores en el formulario
const hasErrors = computed(() => {
    return Object.values(errors).some(error => error !== null) || !form.phoneCode || !form.phoneNumber || !form.securityQuestionAnswer1 || !form.securityQuestionAnswer2 || !form.securityQuestionAnswer3;
});


// Actualizar el estado global cuando cambie la validez del formulario
watch(hasErrors, (newVal) => {
    forgotPasswordStore.setStep3bIsValid(!newVal);
});
</script>
