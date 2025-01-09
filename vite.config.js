import path from "path";
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/sass/app.scss", "resources/js/app.js"],
            refresh: true,
        }),
        vue(),
        viteStaticCopy({
            targets: [
                {
                    // Copia la carpeta de SVG a ublic/assets/svg
                    src: "resources/assets/svg/*",
                    dest: "assets/svg",
                },
                {
                    // Copia la carpeta de images a ublic/assets/iamges
                    src: "resources/assets/images/*",
                    dest: "assets/images",
                },
            ],
        }),
    ],
    resolve: {
        alias: {
            "@fonts": path.resolve(__dirname, "resources/assets/fonts"),
            "@icons": path.resolve(__dirname, "resources/assets/svg"),
            "@images": path.resolve(__dirname, "resources/assets/images"),
            "@Components": path.resolve(__dirname, "resources/js/Components"),
        },
    },
    server: {
        host: "0.0.0.0",
        port: 3000,
        hmr: {
            host: "localhost",
        },
    },
});
