import axios from "axios";
import router from "@routes/index.js";
import { authService } from "../../modules/auth/services/authService";
import { useSessionStore } from "@stores/useSessionStore";
import { useLoadingStore } from '@stores/useLoadingStore.js';


const apiClient = axios.create({
    baseURL: "/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Interceptor para incluir el token de autorización en las solicitudes
apiClient.interceptors.request.use(
    (config) => {
        useLoadingStore().startLoading();
        if (!config.skipAuth) {
            // Si skipAuth no está definido o es false
            const session = useSessionStore();
            const token = session.token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        useLoadingStore().stopLoading();
        return Promise.reject(error);
    }
);

// Interceptor para manejar respuestas y errores globalmente
apiClient.interceptors.response.use(
    (response) => {
        useLoadingStore().stopLoading();
        return response;
    },
    (error) => {
        useLoadingStore().stopLoading();
        if (error.response) {
            const { status, data } = error.response;

            // Mensajes globales opcionales según el código de estado
            switch (status) {
                case 401:
                    authService.logout();
                    router.push("/");
                    break;
                case 403:
                    console.error(
                        "No tienes permisos para realizar esta acción."
                    );
                    break;
                case 500:
                    console.error("Error en el servidor. Inténtalo más tarde.");
                    break;
            }

            // Retornar el mensaje de error del servidor
            return Promise.reject(data);
        }

        if (error.request) {
            return Promise.reject({
                message:
                    "No se pudo conectar con el servidor. Verifica tu conexión a Internet.",
            });
        } else {
            return Promise.reject({
                message: "Ocurrió un error inesperado.",
            });
        }
    }
);

export default apiClient;
