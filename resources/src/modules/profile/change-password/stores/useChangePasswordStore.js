import { defineStore } from "pinia";
import { reactive } from "vue";

export const useChangePasswordStore = defineStore("change-password", {
    state: () => ({
        step1: reactive({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            isValid: false,
        }),
        step2: reactive({
            otpCode: "",
            isValid: false,
        }),
    }),
    actions: {
        // Setters para cada campo de step1
        setStep1CurrentPassword(value) {
            this.step1.currentPassword = value;
        },
        setStep1NewPassword(value) {
            this.step1.newPassword = value;
        },
        setStep1ConfirmPasswordr(value) {
            this.step1.confirmPassword = value;
        },
        setStep1IsValid(value) {
            this.step1.isValid = value;
        },

        // Setters para cada campo de step2
        setStep2OtpCode(value) {
            this.step2.otpCode = value;
        },
        setStep2IsValid(value) {
            this.step2.isValid = value;
        },

        // Métodos para limpiar cada paso
        clearStep1() {
            this.step1.currentPassword = "";
            this.step1.newPassword = "";
            this.step1.confirmPassword = "";
            this.step1.isValid = false;
        },
        clearStep2() {
            this.step2.otpCode = "";
            this.step2.isValid = false;
        },

        clearAllSteps() {
            this.clearStep1();
            this.clearStep2();
        },
    },
});
