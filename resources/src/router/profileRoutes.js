export default [
    {
        path: "/profile",
        component: () => import("../components/layouts/ProfileLayout.vue"), // Layout para Auth
        meta: { requiresAuth: true }, // Agrega meta para verificar autenticación
        children: [
            {
                path: "account",
                name: "Account",
                component: () =>
                    import("../modules/profile/account/pages/Account.vue"), // Carga dinámica
            },
            {
                path: "change-password",
                name: "ChangePayment",
                component: () =>
                    import(
                        "../modules/profile/change-password/pages/ChangePayment.vue"
                    ),
            },
            {
                path: "directory",
                name: "Directory",
                component: () =>
                    import("../modules/profile/directory/pages/Directory.vue"),
            },
            {
                path: "mobile-payment",
                name: "MobilePayment",
                component: () =>
                    import(
                        "../modules/profile/mobile-payment/pages/MobilePayment.vue"
                    ),
            },
        ],
    },
];
