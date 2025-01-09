import { createRouter, createWebHistory } from "vue-router";
import authRoutes from "./authRoutes";
import profileRoutes from "./profileRoutes";

const routes = [
    {
        path: "/",
        redirect: "/auth/login", // Redirige a /auth/login al inicio
    },
    ...authRoutes, // Incluye las rutas de autenticación
    ...profileRoutes,
    {
        path: "/:pathMatch(.*)*", // Ruta catch-all para manejar rutas no definidas
        redirect: (to) => {
            const token = localStorage.getItem("token");
            // Si está autenticado, redirige a profile/account
            if (token) {
                return "/profile/account";
            }
            // Si no está autenticado, redirige a auth/login
            return "/auth/login";
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Protege el acceso al Dashboard
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");

    // Si la ruta requiere autenticación
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        // Si no hay token, redirige a /auth/login
        if (!token) {
            return next("/auth/login");
        }
    }
    next();
});

export default router;
