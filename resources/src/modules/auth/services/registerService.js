import http from "@http/api.js";
import { useRegisterStore } from "../stores/useRegisterStore";
import { authService } from "../services/authService.js";
import { formatDate } from "@utils/formatHelper.js";
import {
    VERIFY_AFFILIATE_URL,
    SEND_OTP_URL,
    CHECK_OTP_URL,
    QUESTION_LIST_URL,
    REGISTER_URL,
} from "@constants/url.js";

const registerStore = useRegisterStore();

export const registerService = {
    verifyAffiliate: async () => {
        const date = formatDate(registerStore.step1.date, "MM-DD-YYYY");
        const response = await http.post(VERIFY_AFFILIATE_URL, {
            Cedula: registerStore.step1.identification,
            Numero: registerStore.step1.cardNumber,
            FechaNacimiento: date,
        });

        if (response.data.code !== 200) {
            throw new Error(
                response.data.message ||
                    "Los datos suministrados son incorrectos"
            );
        }

        registerStore.setStep1Response(response.data.data[0]);
    },

    sendOtp: async () => {
        const phone =
            registerStore.step2.phoneCode + registerStore.step2.phoneNumber;
        const response = await http.post(SEND_OTP_URL, {
            IdAfiliado: registerStore.step1.response.afiId,
            Correo: registerStore.step2.email,
            Celular: phone,
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
            IdAfiliado: registerStore.step1.response.afiId,
            Correo: registerStore.step2.email,
            TokenCorreo: registerStore.step3.otpCode,
        });
        if (response.data.code !== 200) {
            throw new Error(
                response.data.message || "El código suministrado es incorrecto"
            );
        }
    },

    getQuestionList: async () => {
        const response = await http.get(QUESTION_LIST_URL);
        if (response.data.code !== 200) {
            throw new Error(
                response.data.message || "Ocurrió un error inesperado."
            );
        }
        return response.data.data;
    },

    register: async () => {
        const response = await http.post(REGISTER_URL, {
            IdAfiliado: registerStore.step1.response.afiId,
            desafio1: registerStore.step4.question1,
            desafio2: registerStore.step4.question2,
            desafio3: registerStore.step4.question3,
            Respuesta1: registerStore.step4.response1,
            Respuesta2: registerStore.step4.response2,
            Respuesta3: registerStore.step4.response3,
            IdEmisor: registerStore.step1.response.emisorId,
            Usuario: registerStore.step5.username,
            Contrasena: registerStore.step5.newPassword,
            ConfirmarContrasena: registerStore.step5.confirmPassword,
            Correo: registerStore.step2.email,
            Celular:
                registerStore.step2.phoneCode + registerStore.step2.phoneNumber,
        });
        if (response.data.code !== 200) {
            throw new Error(
                response.data.message || "El código suministrado es incorrecto"
            );
        }

        await authService.login(
            registerStore.step5.username,
            registerStore.step5.newPassword
        );
    },
};
