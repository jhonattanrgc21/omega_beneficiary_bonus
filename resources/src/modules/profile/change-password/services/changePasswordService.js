import http from "@http/api.js";
import { useSessionStore } from "@stores/useSessionStore";
import { useChangePasswordStore } from '../stores/useChangePasswordStore'
import {
    CHANGE_PASSWORD_SEND_OTP_URL,
    CHANGE_PASSWORD_CHECK_OTP_URL,
    PROFILE_CHANGE_PASSWORD_URL,
} from "@constants/url.js";

const sessionStore = useSessionStore();
const changePasswordStore = useChangePasswordStore();

export const changePasswordSservice = {
    sendOtp: async () => {
        const response = await http.post(CHANGE_PASSWORD_SEND_OTP_URL, {
            IdAfiliado: sessionStore.userInfo.afiId,
            Correo: sessionStore.userInfo.usaCorreo,
            Celular: sessionStore.userInfo.usaCelular,
        });
        if (response.data.code !== 200) {
            throw new Error(
                response.data.message ||
                    "Los datos suministrados son incorrectos"
            );
        }
    },

    checkOTP: async () => {
        const response = await http.post(CHANGE_PASSWORD_CHECK_OTP_URL, {
            IdAfiliado: sessionStore.userInfo.afiId,
            Correo: sessionStore.userInfo.usaCorreo,
            TokenCorreo: changePasswordStore.step2.otpCode,
        });
        if (response.data.code !== 200) {
            throw new Error(
                response.data.message || "El código suministrado es incorrecto"
            );
        }
    },

    change: async () => {
        const response = await http.post(PROFILE_CHANGE_PASSWORD_URL, {
            IdUsuario: sessionStore.userInfo.usaId,
            IdEmisor: sessionStore.userInfo.emiId,
            ContrasenaActual: changePasswordStore.step1.currentPassword,
            ContrasenaNuevaTMP: changePasswordStore.step1.newPassword,
            ConfirmarcontrasenaTMP: changePasswordStore.step1.confirmPassword,
        });
        if (response.data.code !== 200) {
            throw new Error(
                response.data.message || "El código suministrado es incorrecto"
            );
        }
    },
};
