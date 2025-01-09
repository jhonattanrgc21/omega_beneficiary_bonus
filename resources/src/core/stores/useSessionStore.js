import { defineStore } from 'pinia';

export const useSessionStore = defineStore('omega-beneficiary-session', {
  state: () => ({
    token: null,
    userInfo: null,
  }),
  actions: {
    setToken(token) {
      this.token = token;
    },
    setUserInfo(info) {
      this.userInfo = info;
    },
    clearAuth() {
      this.token = null;
      this.userInfo = null;
    },
  },
  persist: true, // Activar persistencia para este store
});
