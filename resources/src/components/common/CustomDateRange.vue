<template>
    <div class="relative">
        <!-- Renderiza el label solo si existe -->
        <label v-if="label" :for="id" class="block mb-2 text-sm font-medium text-translucentBlack">{{ label }}</label>

        <!-- Contenedor para el input y el icono del calendario -->
        <div class="relative">
            <input v-bind="$attrs" v-model="internalValue" type="text" :id="id" :name="id"
                class="w-full px-4 py-3 pr-10 text-sm border rounded-md text-softBlack font-poppins-regular border-transparentBlack focus:outline-none focus:ring-2 focus:ring-orangeLight"
                ref="datepicker" @input="onInput" />

            <!-- Ícono de calendario -->
            <span class="absolute inset-y-0 right-0 flex items-center pr-3">
                <img :src="calendarIcon" alt="icono_calendar">
            </span>
        </div>

        <!-- Mensaje de error -->
        <p v-if="error" class="text-xs font-poppins-regular text-[#F16D85] mt-2 pl-4">{{ error }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import calendarIcon from '@icons/calendar_today.svg';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Spanish } from "flatpickr/dist/l10n/es.js";

// Props
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
    modelValue: {
        type: Object,
        default: () => ({ start: "", end: "" }),
    },
    dateFormat: {
        type: String,
        default: "d/m/Y",
    },
    placeholder: {
        type: String,
        default: "Seleccione un rango de fechas",
    },
});

// Emitir eventos
const emit = defineEmits(["update:modelValue"]);

// Referencia al input de Flatpickr
const datepicker = ref(null);

// Valor interno para manejar el rango de fechas
const internalValue = ref(formatRangeToString(props.modelValue));

// Función para convertir el rango de fechas en una cadena
function formatRangeToString(range) {
    if (!range.start && !range.end) return "";
    const start = range.start || "";
    const end = range.end || "";
    return `${start} to ${end}`;
}

// Función para descomponer la cadena en un rango
function parseStringToRange(value) {
    const [start, end] = value.split(" to ");
    return { start: start || "", end: end || "" };
}

// Emitir al padre cuando se edita el input
const onInput = (event) => {
    internalValue.value = event.target.value;
    emit("update:modelValue", parseStringToRange(internalValue.value));
};

// Sincronizar `modelValue` con el valor interno
watch(
    () => props.modelValue,
    (newValue) => {
        internalValue.value = formatRangeToString(newValue);
        if (datepicker.value?._flatpickr) {
            datepicker.value._flatpickr.setDate(
                [newValue.start, newValue.end].filter(Boolean),
                true
            );
        }
    },
    { deep: true }
);

// Inicializar Flatpickr
onMounted(() => {
    flatpickr(datepicker.value, {
        mode: "range", // Habilitar selección de rango
        dateFormat: props.dateFormat,
        locale: Spanish,
        defaultDate: [props.modelValue.start, props.modelValue.end].filter(Boolean),
        onChange: (selectedDates, dateStr) => {
            const [start, end] = selectedDates.map((date) =>
                date.toISOString().split("T")[0]
            );
            internalValue.value = `${start || ""} to ${end || ""}`;
            emit("update:modelValue", { start, end });
        },
    });
});
</script>
