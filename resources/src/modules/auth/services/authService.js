import http from "@http/api.js";
import { useSessionStore } from "@stores/useSessionStore";

export const authService = {
    login: async (username, password) => {
        const response = await http.post("/auth/login", {
            Username: username,
            Password: password,
        });

        if (response.data.code !== 200) {
            throw new Error(response.data.message || "Credenciales incorrectas");
        }


        const token = response.data.token;
        const userInfo = response.data.data[0];

        const session = useSessionStore();
        session.setToken(token);
        session.setUserInfo(userInfo);
    },

    logout: () => {
        localStorage.removeItem('auth');
        useSessionStore.clearAuth();
    }
};
