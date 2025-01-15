import http from "@http/api.js";
import { useForgotPasswordStore } from "../stores/useForgotPasswordStore";
import { formatDate } from "@utils/formatHelper.js";

const VALIDATE_AFILIATE_URL = "auth/forgot-password/validateAffiliate";
const ANSWER_CHALLENGE_URL = "auth/forgot-password/answerChallenge";

// Acceder al store de Pinia
const forgotPasswordStore = useForgotPasswordStore();

export const forgotPasswordService = {
    validateAffiliate: async (identification, card, date) => {
        date = formatDate(date, "MM-DD-YYYY");
        const response = await http.post(VALIDATE_AFILIATE_URL, {
            Cedula: identification,
            Numero: card,
            FechaNacimiento: date,
        });

        if (response.data.code !== 200) {
            throw new Error(
                response.data.message ||
                    "Los datos suministrados son incorrectos"
            );
        }

        forgotPasswordStore.setStep1Response(response.data);
    },

    answerChallenge: async (phone, response1, response2, response3) => {
        const response = await http.post(ANSWER_CHALLENGE_URL, {
            IdUsuario: forgotPasswordStore.step1.response.userId,
            IdEmisor: forgotPasswordStore.step1.response.emisorId,
            Celular: phone,
            Respuesta1: response1,
            Respuesta2: response2,
            Respuesta3: response3,
        });

        if (response.data.code !== 200) {
            throw new Error(
                response.data.message ||
                    "Los datos suministrados son incorrectos"
            );
        }
    },

    changePassword: async (newPassword, confirmPassword) => {
        const response = await http.post(ANSWER_CHALLENGE_URL, {
            IdUsuario: forgotPasswordStore.step1.response.userId,
            IdEmisor: forgotPasswordStore.step1.response.emisorId,
            ContrasenaNuevaTMP: newPassword,
            ConfirmarcontrasenaTMP: confirmPassword,
        });

        if (response.data.code !== 200) {
            throw new Error(
                response.data.message ||
                    "Los datos suministrados son incorrectos"
            );
        }
    },
};
