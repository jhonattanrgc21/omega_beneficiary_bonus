import http from "@http/api.js";
import { useForgotPasswordStore } from "../stores/useForgotPasswordStore";
import { formatDate } from '@utils/formatHelper.js';

const VALIDATE_AFILIATE_URL = "auth/forgot-password/validateAffiliate";

// Acceder al store de Pinia
const forgotPasswordStore = useForgotPasswordStore();

export const forgotPasswordService = {
    validateAffiliate: async (identification, card, date) => {
        date = formatDate(date, 'MM-DD-YYYY')
        const response = await http.post(VALIDATE_AFILIATE_URL, {
            Cedula: identification,
            Numero: card,
            FechaNacimiento: date,
        });

        if (response.data.code !== 200) {
            throw new Error(
                response.data.message || "Los datos suministrados son incorrectos"
            );
        }

        forgotPasswordStore.setStep1Response(response.data);
    },
};
