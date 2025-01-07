<template>
    <div class="flex justify-center items-center bg-gray-100 min-h-screen px-4 md:px-40 xl:px-96">
        <div class="card-container px-4 py-6 md:px-10 bg-white rounded overflow-hidden shadow-lg">
            <img src="@images/basic_logo.webp" class="mb-4" alt="logo_omega" />
            <div class="mt-4 mb-6 text-center">
                <p class="font-poppins-regular text-translucentBlack text-sm">
                    Bienvenido al sistema de Omega Beneficiario. Para ingresar
                    debes contar con una tarjeta afiliada a nuestra empresa
                </p>
            </div>

            <h2 class="mb-6 text-xl font-poppins-medium text-center text-softBlack">
                Iniciar sesión
            </h2>
            <form @submit.prevent="login" class="flex flex-col justify-between h-full">
                <InputField label="Usuario" id="username" type="text" placeholder="Ingrese su usuario"
                    v-model="username" />

                <InputField class="mt-4 mb-6" label="Contraseña" id="password" type="password"
                    placeholder="Ingrese su contraseña" v-model="password" />

                <!-- Botón Primario con icono -->
                <CustomButton variant="primary" type="submit">
                    Ingresar
                </CustomButton>
            </form>
        </div>
    </div>
</template>

<script>
import http from "../../core/http/api.js";
import router from "../../core/router.js";
import InputField from "@Components/InputField.vue";
import CustomButton from "@Components/CustomButton.vue";

export default {
    data() {
        return {
            username: "",
            password: "",
        };
    },
    components: {
        InputField,
        CustomButton
    },
    methods: {
        async login() {
            try {
                const response = await http.post("/auth/login", {
                    Username: this.username,
                    Password: this.password,
                });

                const data = response.data;
                if (data.code != 200) {
                    alert("Credenciales incorrectas");
                    return;
                }

                const token = data.token;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(data.data[0]));
                router.push("/dashboard");
            } catch (error) {
                console.error(error);
                alert("Error al iniciar sesión");
            }
        },
    },
};
</script>


<style lang="scss" scoped>
.card-container {
    width: 380px;
}

@media (min-width: 768px) {
    .card-container {
        width: 432px;
    }
}
</style>
