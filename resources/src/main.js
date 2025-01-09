import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPersistedState from 'pinia-plugin-persistedstate';
import './bootstrap';
import router from '@routes/index.js';
import App from './App.vue';

const pinia = createPinia();
pinia.use(piniaPersistedState); // Activar el plugin de persistencia

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');
