import { defineStore } from "pinia";
import { reactive } from "vue";

export const useForgotPasswordStore = defineStore("forgotPassword", {
    state: () => ({
        step1: reactive({
            identification: "",
            date: "",
            cardNumber: "",
            response: null,
            isValid: false,
        }),
        step2: reactive({
            method: 1,
            isValid: true,
        }),
        step3a: reactive({
            otpCode: "",
            isValid: false,
        }),
        step3b: reactive({
            phoneCode: "0412",
            phoneNumber: "",
            securityQuestionAnswer1: "",
            securityQuestionAnswer2: "",
            securityQuestionAnswer3: "",
            isValid: false,
        }),
        step4: reactive({
            newPassword: "",
            confirmPassword: "",
            isValid: false,
        }),
    }),
    actions: {
        // Setters para cada campo de cada paso

        // Step 1
        setStep1Identification(value) {
            this.step1.identification = value;
        },
        setStep1Date(value) {
            this.step1.date = value;
        },
        setStep1CardNumber(value) {
            this.step1.cardNumber = value;
        },
        setStep1Response(value) {
            this.step1.response = value;
        },
        setStep1IsValid(value) {
            this.step1.isValid = value;
        },

        // Step 2
        setStep2Method(value) {
            this.step2.method = value;
        },
        setStep2IsValid(value) {
            this.step2.isValid = value;
        },

        // Step 3a
        setStep3aOtpCode(value) {
            this.step3a.otpCode = value;
        },
        setStep3aIsValid(value) {
            this.step3a.isValid = value;
        },

        // Step 3b
        setStep3bPhoneCode(value) {
            this.step3b.phoneCode = value;
        },
        setStep3bPhoneNumber(value) {
            this.step3b.phoneNumber = value;
        },
        setStep3bSecurityQuestionAnswer1(value) {
            this.step3b.securityQuestionAnswer1 = value;
        },
        setStep3bSecurityQuestionAnswer2(value) {
            this.step3b.securityQuestionAnswer2 = value;
        },
        setStep3bSecurityQuestionAnswer3(value) {
            this.step3b.securityQuestionAnswer3 = value;
        },
        setStep3bIsValid(value) {
            this.step3b.isValid = value;
        },

        // Step 4
        setStep4NewPassword(value) {
            this.step4.newPassword = value;
        },
        setStep4ConfirmPassword(value) {
            this.step4.confirmPassword = value;
        },
        setStep4IsValid(value) {
            this.step4.isValid = value;
        },

        // Métodos para limpiar cada paso
        clearStep1() {
            this.step1.identification = "";
            this.step1.date = "";
            this.step1.cardNumber = "";
            this.step1.response = null;
            this.step1.isValid = false;
        },
        clearStep2() {
            this.step2.method = 1;
            this.step2.isValid = true;
        },
        clearStep3a() {
            this.step3a.otpCode = "";
            this.step3a.isValid = false;
        },
        clearStep3b() {
            this.step3b.phoneCode = "0412";
            this.step3b.phoneNumber = "";
            this.step3b.securityQuestionAnswer1 = "";
            this.step3b.securityQuestionAnswer2 = "";
            this.step3b.securityQuestionAnswer3 = "";
            this.step3b.isValid = false;
        },
        clearStep4() {
            this.step4.newPassword = "";
            this.step4.confirmPassword = "";
            this.step4.isValid = false;
        },
    },
});
