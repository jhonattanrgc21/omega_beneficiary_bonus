import { defineStore } from "pinia";
import { capitalizeWords } from "../utils/formatHelper";

export const useSessionStore = defineStore("omega-beneficiary-session", {
    state: () => ({
        token: null,
        username: "",
        userInfo: null,
    }),
    actions: {
        setToken(token) {
            this.token = token;
        },
        setUserInfo(info) {
            this.userInfo = info;
        },
        setUsername(username) {
            this.username = username;
        },
        getFullName() {
            return capitalizeWords(
                this.userInfo.afiNombre1 + " " + this.userInfo.afiApellido1
            );
        },
        clearAuth() {
            this.token = null;
            this.userInfo = null;
            this.username = '';
        },
    },
    persist: true, // Activar persistencia para este store
});
