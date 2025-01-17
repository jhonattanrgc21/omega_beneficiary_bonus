import http from "@http/api.js";
import { useForgotPasswordStore } from "../stores/useForgotPasswordStore";
import { formatDate } from "@utils/formatHelper.js";
import {
    VALIDATE_AFILIATE_URL,
    ANSWER_CHALLENGE_URL,
    SEND_OTP_URL,
    CHECK_OTP_URL,
    CHANGE_PASSWORD_URL
} from "@constants/url.js";

// Acceder al store de Pinia
const forgotPasswordStore = useForgotPasswordStore();

export const forgotPasswordService = {
    validateAffiliate: async () => {
        const date = formatDate(forgotPasswordStore.step1.date, "MM-DD-YYYY");
        const response = await http.post(VALIDATE_AFILIATE_URL, {
            Cedula: forgotPasswordStore.step1.identification,
            Numero: forgotPasswordStore.step1.cardNumber,
            FechaNacimiento: date,
        });

        if (response.data.code !== 200) {
            throw new Error(
                response.data.message ||
                    "Los datos suministrados son incorrectos"
            );
        }

        forgotPasswordStore.setStep1Response(response.data.data[0]);
    },

    sendOtp: async () => {
        const response = await http.post(SEND_OTP_URL, {
            IdAfiliado: forgotPasswordStore.step1.response.afiId,
            Correo: forgotPasswordStore.step1.response.usaCorreo,
            Celular: forgotPasswordStore.step1.response.usaCelular,
        });
        if (response.data.code !== 200) {
            throw new Error(
                response.data.message ||
                    "Los datos suministrados son incorrectos"
            );
        }
    },

    checkOTP: async () => {
        const response = await http.post(CHECK_OTP_URL, {
            IdAfiliado: forgotPasswordStore.step1.response.afiId,
            Correo: forgotPasswordStore.step1.response.usaCorreo,
            TokenCorreo: forgotPasswordStore.step3a.otpCode,
        });
        if (response.data.code !== 200) {
            throw new Error(
                response.data.message || "El código suministrado es incorrecto"
            );
        }
    },

    answerChallenge: async () => {
        const phone =
            forgotPasswordStore.step3b.phoneCode +
            forgotPasswordStore.step3b.phoneNumber;
        const response = await http.post(ANSWER_CHALLENGE_URL, {
            IdUsuario: forgotPasswordStore.step1.response.usaId,
            IdEmisor: forgotPasswordStore.step1.response.emiId,
            Celular: phone,
            Respuesta1: forgotPasswordStore.step3b.securityQuestionAnswer1,
            Respuesta2: forgotPasswordStore.step3b.securityQuestionAnswer2,
            Respuesta3: forgotPasswordStore.step3b.securityQuestionAnswer3,
        });

        if (response.data.code !== 200) {
            throw new Error(
                response.data.message ||
                    "Los datos suministrados son incorrectos"
            );
        }
    },

    changePassword: async () => {
        const response = await http.post(CHANGE_PASSWORD_URL, {
            IdUsuario: forgotPasswordStore.step1.response.usaId,
            IdEmisor: forgotPasswordStore.step1.response.emiId,
            ContrasenaNuevaTMP: forgotPasswordStore.step4.newPassword,
            ConfirmarcontrasenaTMP: forgotPasswordStore.step4.confirmPassword,
        });

        if (response.data.code !== 200) {
            throw new Error(
                response.data.message ||
                    "Los datos suministrados son incorrectos"
            );
        }
    },
};
