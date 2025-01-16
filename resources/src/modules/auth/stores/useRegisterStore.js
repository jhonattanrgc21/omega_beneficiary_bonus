import { defineStore } from "pinia";
import { reactive } from "vue";

export const useRegisterStore = defineStore("register", {
    state: () => ({
        step1: reactive({
            identification: "",
            date: "",
            cardNumber: "",
            response: null,
            isValid: false,
        }),
        step2: reactive({
            phoneCode: "0412",
            phoneNumber: "",
            email: "",
            isValid: true,
        }),
        step3: reactive({
            otpCode: "",
            isValid: false,
        }),
        step4: reactive({
            question1: "",
            question2: "",
            question3: "",
            response1: "",
            response2: "",
            response3: "",
            isValid: false,
        }),
        step5: reactive({
            username: "",
            newPassword: "",
            confirmPassword: "",
            isValid: false,
        }),
    }),
    actions: {
        // Setters para cada campo de step1
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

        // Setters para cada campo de step2
        setStep2PhoneCode(value) {
            this.step2.phoneCode = value;
        },
        setStep2PhoneNumber(value) {
            this.step2.phoneNumber = value;
        },
        setStep2Email(value) {
            this.step2.email = value;
        },
        setStep2IsValid(value) {
            this.step2.isValid = value;
        },

        // Setters para cada campo de step3
        setStep3OtpCode(value) {
            this.step3.otpCode = value;
        },
        setStep3IsValid(value) {
            this.step3.isValid = value;
        },

        // Setters para cada campo de step4
        setStep4Question1(value) {
            this.step4.question1 = value;
        },
        setStep4Question2(value) {
            this.step4.question2 = value;
        },
        setStep4Question3(value) {
            this.step4.question3 = value;
        },
        setStep4Response1(value) {
            this.step4.response1 = value;
        },
        setStep4Response2(value) {
            this.step4.response2 = value;
        },
        setStep4Response3(value) {
            this.step4.response3 = value;
        },
        setStep4IsValid(value) {
            this.step4.isValid = value;
        },

        // Setters para cada campo de step5
        setStep5Username(value) {
            this.step5.username = value;
        },
        setStep5NewPassword(value) {
            this.step5.newPassword = value;
        },
        setStep5ConfirmPassword(value) {
            this.step5.confirmPassword = value;
        },
        setStep5IsValid(value) {
            this.step5.isValid = value;
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
            this.step2.phoneCode = "0412";
            this.step2.phoneNumber = "";
            this.step2.email = "";
            this.step2.isValid = true;
        },
        clearStep3() {
            this.step3.otpCode = "";
            this.step3.isValid = false;
        },
        clearStep4() {
            this.step4.question1 = "";
            this.step4.question2 = "";
            this.step4.question3 = "";
            this.step4.response1 = "";
            this.step4.response2 = "";
            this.step4.response3 = "";
            this.step4.isValid = false;
        },
        clearStep5() {
            this.step5.username = "";
            this.step5.newPassword = "";
            this.step5.confirmPassword = "";
            this.step5.isValid = false;
        },

        clearAllSteps() {
            this.clearStep1();
            this.clearStep2();
            this.clearStep3();
            this.clearStep4();
            this.clearStep5();
        },
    },
});
