<template>
    <h2 class="mb-4 text-lg font-semibold">Paso 2: Código de confirmación</h2>
    <p class="mb-6 text-base text-center font-poppins-regular text-translucentBlack">El código de confirmación de la
        transacción se envió al correo: <span class="text-softBlack">{{ email }}</span></p>
    <form class="flex flex-col justify-between h-full">
        <InputField @focus="setTouched('otpCode')" @input="validateOtpCode" @blur="validateOtpCode" label="Código"
            id="otpCode" type="text" placeholder="Ingrese el código enviado" v-model="form.otpCode"
            :error="errors.otpCode" />

        <div class="mt-8 text-center">
            <p v-if="!isExpired" class="text-sm text-translucentBlack font-poppins-regular">
                Tiempo restante: <span class="text-softBlack">{{ timer }}</span> segundos
            </p>
            <CustomButton v-else="isExpired" @click="resendOTP" variant="outline" type="button">
                Reenviar Código OTP
            </CustomButton>
        </div>
    </form>

    <WarningPopup v-if="showPopup" :title="'¡Error!'" :message="popupMessage" :buttonText="'Aceptar'"
        @close="closePopup">
        <template #icon>
            <img :src="errorIcon" alt="icon" class="w-24 h-24 mb-4">
        </template>
    </WarningPopup>
</template>

<script setup>
import { ref, onBeforeUnmount, computed, watch, onMounted } from "vue";
import InputField from "@components/InputField.vue";
import CustomButton from "@components/CustomButton.vue";
import WarningPopup from "@components/WarningPopup.vue";
import errorIcon from '@icons/error.svg';
import { validateOtpCode as validateOtp } from "@utils/validators";
import { useChangePasswordStore } from '../stores/useChangePasswordStore'
import { useSessionStore } from "@stores/useSessionStore";
import { changePasswordSservice } from '../services/changePasswordService';
import { useForm } from "@utils/formHelper";

// Acceder al store de Pinia
const sessionStore = useSessionStore();
const changePasswordStore = useChangePasswordStore();
const email = ref(sessionStore.userInfo.usaCorreo);
const timer = ref(60);
const otpSent = ref(false);
const isExpired = ref(false);
let intervalId = null;

const { form, touched, errors, setTouched } = useForm({
    otpCode: changePasswordStore.step2.otpCode,
});

const showPopup = ref(false);
const popupMessage = ref("");


// Método para abrir el pop-up con título y mensaje dinámicos
const openPopup = (message) => {
    popupMessage.value = message;
    showPopup.value = true;
};

const closePopup = () => {
    popupMessage.value = '';
    showPopup.value = false;
};

// Realizar la solicitud al backend cuando el componente se haya montado
onMounted(() => {
    sendOTP();  // Enviar el OTP automáticamente al cargar el componente
});

const validateOtpCode = () => {
    if (!touched.otpCode) {
        errors.otpCode = null;
        return;
    }
    changePasswordStore.setStep2OtpCode(form.otpCode);
    errors.otpCode = validateOtp(form.otpCode);
};


// Computada para saber si hay errores en el formulario
const hasErrors = computed(() => {
    return Object.values(errors).some(error => error !== null) || !form.otpCode;
});

const sendOTP = async () => {
    try {
        await changePasswordSservice.sendOtp();
        otpSent.value = true;
        startTimer();
    } catch (error) {
        openPopup(error.message);
    }
};

const startTimer = () => {
    // Detener el intervalo anterior si ya existe
    if (intervalId) {
        clearInterval(intervalId);
    }
    timer.value = 60;  // Resetear el timer a 60 segundos
    isExpired.value = false;
    intervalId = setInterval(() => {
        if (timer.value > 0) {
            timer.value--;  // Decrementar en 1 cada segundo
        } else {
            isExpired.value = true;
            clearInterval(intervalId);  // Detener el intervalo cuando expire
        }
    }, 1000);  // Ejecutar cada 1000ms (1 segundo)
};

const resendOTP = () => {
    changePasswordStore.clearStep2();
    sendOTP();
    startTimer();
};

// Limpiar el temporizador al destruir el componente
onBeforeUnmount(() => {
    clearInterval(intervalId);
});

// Actualizar el estado global cuando cambie la validez del formulario
watch(hasErrors, (newVal) => {
    changePasswordStore.setStep2IsValid(!newVal);
});
</script>
