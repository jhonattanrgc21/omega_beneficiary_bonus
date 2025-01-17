<template>
    <div class="w-full mb-6 sm:px-1 md:px-6">
        <div class="p-6 bg-white border border-gray-300 rounded-lg shadow-md">
            <h2 class="mb-4 text-base font-semibold text-orangeBright">
                La contraseña debe cumplir con las siguientes reglas:
            </h2>
            <ul class="text-sm list-disc list-inside text-translucentBlack">
                <li>Debe tener un mínimo de 8 caracteres</li>
                <li>Debe tener al menos una letra minúscula</li>
                <li>Debe tener al menos una letra mayúscula</li>
                <li>Debe tener al menos un número</li>
                <li>Solo un carácter especial: .!#$%&()*+-</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
</script>
