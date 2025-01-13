<template>
    <div class="relative">
        <!-- Renderiza el label solo si existe -->
        <label v-if="label" :for="id" class="block text-sm font-medium text-translucentBlack mb-2">{{ label }}</label>

        <!-- Contenedor para el input y el icono del calendario -->
        <div class="relative">
            <input v-bind="$attrs" v-model="internalValue" type="text" :id="id" :name="id"
                class="w-full text-sm text-softBlack font-poppins-regular px-4 py-3 pr-10 border border-transparentBlack rounded-md focus:outline-none focus:ring-2 focus:ring-orangeLight"
                ref="datepicker" @input="onInput" />

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
import { ref, onMounted, watch } from 'vue';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css'; // Estilos de Flatpickr
import { Spanish } from 'flatpickr/dist/l10n/es.js'; // Importar idioma español

// Definir los props
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
    modelValue: {  // Para el v-model
        type: String,
        default: "",
    }
});

// Definir el emisor de eventos
const emit = defineEmits(['update:modelValue']); // Declarar eventos emitidos

const datepicker = ref(null);

// Variable reactiva interna para manejar el valor
const internalValue = ref(props.modelValue);

// Calcular la fecha actual menos 18 años
const date18YearsAgo = new Date();
date18YearsAgo.setFullYear(date18YearsAgo.getFullYear() - 18);

// Fecha actual
const today = new Date();

// Emitir el valor al padre
const onInput = (event) => {
    internalValue.value = event.target.value; // Actualizar el valor interno
    emit('update:modelValue', internalValue.value); // Emitir al padre
};

// Observar cambios en el prop `modelValue` para sincronizar con el valor interno
watch(() => props.modelValue, (newValue) => {
    internalValue.value = newValue;
    // Actualizar el valor del calendario si la fecha es válida
    if (newValue) {
        const date = flatpickr.parseDate(newValue, props.dateFormat);
        if (date && datepicker.value?._flatpickr) {
            datepicker.value._flatpickr.setDate(date, true); // Actualizar calendario
        }
    }
});

// Inicializar Flatpickr
onMounted(() => {
    flatpickr(datepicker.value, {
        dateFormat: props.dateFormat,
        locale: Spanish,
        maxDate: props.showFutureDates ? null : date18YearsAgo, // Configurar fecha máxima
        defaultDate: props.modelValue || null, // Configurar la fecha inicial desde `modelValue`
        onChange: (selectedDates, dateStr) => {
            // Actualizar el valor interno y emitir al padre
            internalValue.value = dateStr;
            emit('update:modelValue', dateStr);
        },
        onOpen: () => {
            // Ajustar la posición inicial del calendario
            const defaultPosition = props.initialDateToday ? today : date18YearsAgo;
            if (!internalValue.value) {
                datepicker.value._flatpickr.setDate(defaultPosition, true);
            }
        },
    });
});
</script>
