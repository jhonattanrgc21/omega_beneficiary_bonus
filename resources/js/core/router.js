import { createRouter, createWebHistory } from 'vue-router';
import Login from '../Pages/Auth/Login.vue';
import Register from '../Pages/Auth/Register.vue';
import ForgotPassword from '../Pages/Auth/ForgotPassword.vue';
import Dashboard from '../Pages/Profile/Dashboard/Dashboard.vue';

const routes = [
  {
    path: '/',
    redirect: '/auth/login', // Redirige a /auth/login al inicio
  },
  {
    path: '/auth',
    component: () => import('../Pages/Auth/AuthLayout.vue'), // Componente contenedor de las rutas de Auth
    children: [
      {
        path: 'login',
        component: Login, // Ruta para Login
      },
      {
        path: 'register',
        component: Register, // Ruta para Register
      },
      {
        path: 'forgot-password',
        component: ForgotPassword, // Ruta para ForgotPassword
      },
    ],
  },
  {
    path: '/dashboard',
    component: Dashboard, // Ruta para Dashboard
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Protege el acceso al Dashboard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.path === '/dashboard' && !token) {
    next('/'); // Redirige a /auth/login si no hay token
  } else {
    next();
  }
});

export default router;
