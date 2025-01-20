<template>
    <h2 class="mb-4 text-lg font-semibold">Paso 4: Preguntas de seguridad</h2>
    <form class="flex flex-col justify-between h-full">

        <CustomSelect @focus="setTouched('question1')" @change="validateSecurityQuestion1"
            :placeholder="'Seleccione la pregunta'" @blur="validateSecurityQuestion1" id="question1"
            :error="errors.question1" v-model="form.question1" label="Pregunta 1" class="flex-grow-0">
            <option v-for="question in questionsList" :key="question.Id" :value="question.Id">
                {{ question.Nombre }}
            </option>
        </CustomSelect>
        <div class="mt-4">
            <InputField @focus="setTouched('response1')" @input="validateSecurityResponse1"
                @blur="validateSecurityResponse1" id="response1" type="text" placeholder="Ingrese la respuesta"
                v-model="form.response1" :error="errors.response1" />
        </div>

        <div class="mt-6">
            <CustomSelect @focus="setTouched('question2')" @change="validateSecurityQuestion2"
                :placeholder="'Seleccione la pregunta'" @blur="validateSecurityQuestion2" id="question2"
                :error="errors.question2" v-model="form.question2" label="Pregunta 1" class="flex-grow-0">
                <option v-for="question in questionsList" :key="question.Id" :value="question.Id">
                    {{ question.Nombre }}
                </option>
            </CustomSelect>
            <div class="mt-4">
                <InputField @focus="setTouched('response2')" @input="validateSecurityResponse2"
                    @blur="validateSecurityResponse2" id="response2" type="text" placeholder="Ingrese la respuesta"
                    v-model="form.response2" :error="errors.response2" />
            </div>
        </div>

        <div class="mt-6">
            <CustomSelect @focus="setTouched('question3')" @change="validateSecurityQuestion3"
                :placeholder="'Seleccione la pregunta'" @blur="validateSecurityQuestion3" id="questio3"
                :error="errors.question3" v-model="form.question3" label="Pregunta 3" class="flex-grow-0">
                <option v-for="question in questionsList" :key="question.Id" :value="question.Id">
                    {{ question.Nombre }}
                </option>
            </CustomSelect>
            <div class="mt-4">
                <InputField @focus="setTouched('response3')" @input="validateSecurityResponse3"
                    @blur="validateSecurityResponse3" id="response3" type="text" placeholder="Ingrese la respuesta"
                    v-model="form.response3" :error="errors.response3" />
            </div>
        </div>
    </form>

    <WarningPopup v-if="showPopup" :title="'¡Error!'" :message="'Ocurrió un error al obtener la lista de preguntas.'"
        :buttonText="'Aceptar'" @close="showPopup = false">
        <template #icon>
            <img :src="errorIcon" alt="icon" class="w-24 h-24 mb-4">
        </template>
    </WarningPopup>
</template>

<script setup>
import { computed, watch, onMounted, ref } from "vue";
import InputField from "@components/InputField.vue";
import CustomSelect from "@components/CustomSelect.vue";
import WarningPopup from "@components/WarningPopup.vue";
import errorIcon from '@icons/error.svg';
import { validateQuestion as validateQ, validateTextInput } from "@utils/validators";
import { useRegisterStore } from '../../stores/useRegisterStore';
import { registerService } from "../../services/registerService";
import { useForm } from "@utils/formHelper";

// Acceder al store de Pinia
const registerStore = useRegisterStore();

const { form, touched, errors, setTouched } = useForm({
    question1: registerStore.step4.question1,
    question2: registerStore.step4.question2,
    question3: registerStore.step4.question3,
    response1: registerStore.step4.response1,
    response2: registerStore.step4.response2,
    response3: registerStore.step4.response3,
});

const showPopup = ref(false);

// Variable reactiva para almacenar las preguntas
const questionsList = ref([]);


// Consulta de la lista de preguntas
onMounted(async () => {
    try {
        questionsList.value = await registerService.getQuestionList();
        showPopup.value = false;
    } catch (error) {
        showPopup.value = true;
    }
});


const validateSecurityQuestion1 = () => {
    if (!touched.question1) {
        errors.question1 = null;
        return;
    }
    registerStore.setStep4Question1(form.question1);
    errors.question1 = validateQ(form.question1, form.question2, form.question3);
};

const validateSecurityQuestion2 = () => {
    if (!touched.question2) {
        errors.question2 = null;
        return;
    }
    registerStore.setStep4Question2(form.question2);
    errors.question2 = validateQ(form.question2, form.question1, form.question3);
};

const validateSecurityQuestion3 = () => {
    if (!touched.question3) {
        errors.question3 = null;
        return;
    }
    registerStore.setStep4Question3(form.question3);
    errors.question3 = validateQ(form.question3, form.question1, form.question2);
};

const validateSecurityResponse1 = () => {
    if (!touched.response1) {
        errors.response1 = null;
        return;
    }
    registerStore.setStep4Response1(form.response1);
    errors.response1 = validateTextInput(form.response1);
};

const validateSecurityResponse2 = () => {
    if (!touched.response2) {
        errors.response2 = null;
        return;
    }
    registerStore.setStep4Response2(form.response2);
    errors.response2 = validateTextInput(form.response2);
};

const validateSecurityResponse3 = () => {
    if (!touched.response3) {
        errors.response3 = null;
        return;
    }
    registerStore.setStep4Response3(form.response3);
    errors.response3 = validateTextInput(form.response3);
};


// Computada para saber si hay errores en el formulario
const hasErrors = computed(() => {
    return Object.values(errors).some(error => error !== null) || !form.question1 || !form.question2 || !form.question3 || !form.response1 || !form.response2 || !form.response3;
});


// Actualizar el estado global cuando cambie la validez del formulario
watch(hasErrors, (newVal) => {
    registerStore.setStep4IsValid(!newVal);
});
</script>
