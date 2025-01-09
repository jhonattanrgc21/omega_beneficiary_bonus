import http from "@http/api.js";

export const authService = {
    login: async (username, password) => {
        const response = await http.post("/auth/login", {
            Username: username,
            Password: password,
        });

        if (response.data.code !== 200) {
            throw new Error("Credenciales incorrectas");
        }

        const token = response.data.token;
        const user = response.data.data[0];

        // Guardar en localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
    },
};
