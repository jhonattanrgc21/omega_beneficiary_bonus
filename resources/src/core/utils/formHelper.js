import { reactive } from "vue";

// Gestiona el estado del formulario
export const useForm = (initialState) => {
    const form = reactive({ ...initialState });
    const touched = reactive(
        Object.keys(initialState).reduce(
            (acc, key) => ({ ...acc, [key]: false }),
            {}
        )
    );
    const errors = reactive(
        Object.keys(initialState).reduce(
            (acc, key) => ({ ...acc, [key]: null }),
            {}
        )
    );

    // Función para marcar el campo como tocado
    const setTouched = (field) => {
        touched[field] = true;
    };

    return { form, touched, errors, setTouched };
};
