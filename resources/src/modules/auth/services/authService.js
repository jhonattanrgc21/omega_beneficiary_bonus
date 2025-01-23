import http from "@http/api.js";
import { useSessionStore } from "@stores/useSessionStore";
import { LOGIN_URL } from "@constants/url";

const session = useSessionStore();

export const authService = {
    login: async (username, password) => {
        const response = await http.post(LOGIN_URL, {
            Username: username,
            Password: password,
        });

        if (response.data.code !== 200) {
            throw new Error(
                response.data.message || "Credenciales incorrectas"
            );
        }

        const token = response.data.token;
        const userInfo = response.data.data[0];

        session.setToken(token);
        session.setUsername(username);
        session.setUserInfo(userInfo);
    },

    logout: () => {
        localStorage.removeItem("omega-beneficiary-session");
        session.clearAuth();
        session.$dispose();
    },
};
