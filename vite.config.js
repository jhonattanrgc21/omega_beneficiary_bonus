import path from "path";
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/src/assets/sass/main.scss", "resources/src/main.js"],
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
            "@fonts": path.resolve(__dirname, "resources/src/assets/fonts"),
            "@icons": path.resolve(__dirname, "resources/src/assets/svg"),
            "@images": path.resolve(__dirname, "resources/src/assets/images"),
            "@components": path.resolve(__dirname, "resources/src/components/common"),
            "@http": path.resolve(__dirname, "resources/src/core/http"),
            "@router": path.resolve(__dirname, "resources/src/router"),
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
