import http from "@http/api.js";
import { useForgotPasswordStore } from "../stores/useForgotPasswordStore";

const VALIDATE_AFILIATE_URL = "/forgot-password/validateAffiliate";

// Acceder al store de Pinia
const forgotPasswordStore = useForgotPasswordStore();

export const forgotPasswordService = {
    validateAffiliate: async (identification, card, date) => {

        // TODO: crear una funcion para formatear la fecha antes delanzar la peticion

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
