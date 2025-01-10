<template>
    <div class="relative">
        <!-- Renderiza el label solo si existe -->
        <label v-if="label" :for="id" class="block text-sm font-medium text-translucentBlack mb-2">{{ label }}</label>

        <!-- Contenedor para el input y el icono del calendario -->
        <div class="relative">
            <input v-bind="$attrs" v-model="value" type="text" :id="id" :name="id"
                class="w-full text-sm text-softBlack font-poppins-regular px-4 py-3 pr-10 border border-transparentBlack rounded-md focus:outline-none focus:ring-2 focus:ring-orangeLight"
                ref="datepicker" />

            <!-- Ícono de calendario -->
            <span class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <img src="@icons/calendar_today.svg" alt="icono_calendar">
            </span>
        </div>

        <!-- Mensaje de error -->
        <p v-if="error" class="text-xs font-poppins-regular text-[#F16D85] mt-2 pl-4">{{ error }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css'; // Estilos de Flatpickr
import { Spanish } from 'flatpickr/dist/l10n/es.js'; // Importar idioma español

// Se utiliza para hacer un match con el v-model
const value = ref("");

// Parámetros del componente
const props = defineProps({
    label: {
        type: String,
        default: null,
    },
    id: {
        type: String,
        required: true,
    },
    error: {
        type: String,
        default: null,
    },
    dateFormat: {
        type: String,
        default: "d/m/Y",
    },
    showFutureDates: {
        type: Boolean,
        default: false, // Si `false`, no muestra fechas posteriores a la fecha límite
    },
    initialDateToday: {
        type: Boolean,
        default: false, // Si `true`, posiciona el calendario en la fecha actual
    },
});

const datepicker = ref(null);

// Calcular la fecha actual menos 18 años
const date18YearsAgo = new Date();
date18YearsAgo.setFullYear(date18YearsAgo.getFullYear() - 18);

// Fecha actual
const today = new Date();

// Inicializar Flatpickr
onMounted(() => {
    flatpickr(datepicker.value, {
        dateFormat: props.dateFormat,
        locale: Spanish,
        maxDate: props.showFutureDates ? (props.showFutureDates ? null : today) : date18YearsAgo ,
        onOpen: () => {
            // Ajusta la posición inicial al abrir el calendario
            const defaultPosition = props.initialDateToday ? today : date18YearsAgo;
            datepicker.value._flatpickr.setDate(defaultPosition, true);
        },
    });
});
</script>
