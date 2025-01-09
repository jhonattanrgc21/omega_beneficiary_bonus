export default [
    {
      path: '/auth',
      component: () => import('../components/layouts/AuthLayout.vue'), // Layout para Auth
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('../modules/auth/pages/Login.vue'), // Carga dinámica
        },
        {
          path: 'register',
          name: 'Register',
          component: () => import('../modules/auth/pages/Register.vue'),
        },
        {
          path: 'forgot-password',
          name: 'ForgotPassword',
          component: () => import('../modules/auth/pages/ForgotPassword.vue'),
        },
      ],
    },
  ];
