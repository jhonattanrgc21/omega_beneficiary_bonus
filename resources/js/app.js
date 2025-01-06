import './bootstrap';
import { createApp } from 'vue';
import App from './Pages/App.vue';
import router from './core/router';

const app = createApp(App);
app.use(router);
app.mount('#app');
