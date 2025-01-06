<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="w-full max-w-md bg-white shadow-md rounded-lg p-8">
            <img src="@images/basic_logo.webp" class="mb-6" alt="logo_omega">
            <h2 class="text-2xl font-poppins-semibold text-center text-gray-700 mb-6">Iniciar Sesión</h2>
            <form @submit.prevent="login" class="space-y-4">
                <div>
                    <label for="username" class="block text-sm font-medium text-gray-700">Usuario:</label>
                    <input type="text" v-model="username" id="username" required
                        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700" />
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Contraseña:</label>
                    <input type="password" v-model="password" id="password" required
                        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700" />
                </div>
                <button type="submit"
                    class="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
                    Iniciar Sesión
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import http from '../../core/http/api.js';
import router from '../../core/router.js';

export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        async login() {
            try {
                const response = await http.post('/auth/login', {
                    Username: this.username,
                    Password: this.password,
                });

                const data = response.data;
                if (data.code != 200) {
                    alert('Credenciales incorrectas');
                    return;
                }

                const token = data.token;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(data.data[0]));
                router.push('/dashboard');
            } catch (error) {
                console.error(error);
                alert('Error al iniciar sesión');
            }
        },
    },
};
</script>
