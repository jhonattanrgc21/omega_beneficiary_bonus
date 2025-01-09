import { createRouter, createWebHistory } from "vue-router";
import authRoutes from "./authRoutes";
import profileRoutes from "./profileRoutes";
import { useSessionStore } from "@stores/useSessionStore";

const routes = [
    {
        path: "/",
        redirect: "/auth/login",
    },
    // Incluye las rutas de autenticación
    ...authRoutes,
    ...profileRoutes,
    {
        // Ruta catch-all para manejar rutas no definidas
        path: "/:pathMatch(.*)*",
        redirect: (to) => {
            const session = useSessionStore();
            const token = session.token;
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
    const session = useSessionStore();
    const token = session.token;
    if (to.meta.requiresAuth && !token) return next("/auth/login");

    // Verifica el permiso para los modulos del directorio y pago movil
    const isAuthorized = session.userInfo
        ? Boolean(session.userInfo.empPagoMovil)
        : false;
    if (to.meta.requiresSpecialAccess && !isAuthorized)
        return next("/profile/account");

    next();
});

export default router;
