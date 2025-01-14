import {
    REGEX_USERNAME_FORMAT,
    REGEX_USERNAME_STARTS_WITH_NUMBER,
    ONLY_NUMBERS_REGEX,
    TEXT_INPUT_FORMAT_REGEX,
    TEXT_INPUT_STARTS_WITH_LETTER_REGEX,
} from "@constants/regex";

export const validateUsername = (
    username,
    rules = {
        required: true,
        minLength: true,
        format: true,
        startsWithNumber: true,
    }
) => {
    const trimmedUsername = username.trim();
    const errorsMessages = {
        empty: "El campo es obligatorio.",
        tooShort: "El campo debe tener al menos 3 caracteres.",
        format: "Error, solo se permiten letras, números, guiones bajos y puntos.",
        startsWithNumber: "El valor no puede iniciar con un número.",
    };

    if (rules.required && trimmedUsername.length === 0) {
        return errorsMessages.empty;
    }

    if (rules.format && !REGEX_USERNAME_FORMAT.test(trimmedUsername)) {
        return errorsMessages.format;
    }

    if (
        rules.startsWithNumber &&
        REGEX_USERNAME_STARTS_WITH_NUMBER.test(trimmedUsername)
    ) {
        return errorsMessages.startsWithNumber;
    }

    if (rules.minLength && trimmedUsername.length < 3) {
        return errorsMessages.tooShort;
    }

    return null;
};

export const validatePassword = (
    password,
    rules = { required: true, minLength: true }
) => {
    const trimmedPassword = password.trim();
    const errorsMessages = {
        empty: "La contraseña es obligatoria.",
        tooShort: "La contraseña debe tener al menos 8 caracteres.",
    };

    if (rules.required && trimmedPassword.length === 0) {
        return errorsMessages.empty;
    }

    if (rules.minLength && trimmedPassword.length < 8) {
        return errorsMessages.tooShort;
    }

    return null;
};

export const validateIdentification = (
    identification,
    rules = { required: true, maxLength: 11, format: true }
) => {
    const trimmedIdentification = identification.trim();
    const errorsMessages = {
        empty: "El campo es obligatorio.",
        tooLong: "El valor no debe exceder de 11 caracteres.",
        format: "El campo debe contener solo números.",
    };

    // Verificar si el campo es obligatorio
    if (rules.required && trimmedIdentification.length === 0) {
        return errorsMessages.empty;
    }

    // Verificar si solo contiene números
    if (rules.format && !ONLY_NUMBERS_REGEX.test(trimmedIdentification)) {
        return errorsMessages.format;
    }

    // Verificar si no excede el número máximo de caracteres
    if (rules.maxLength && trimmedIdentification.length > rules.maxLength) {
        return errorsMessages.tooLong;
    }

    // Si pasa todas las validaciones, no hay errores
    return null;
};

export const validateDate = (date, rules = { required: true }) => {
    const trimmedDate = date.trim();
    const errorsMessages = {
        empty: "El campo es obligatorio.",
    };

    // Verificar si el campo es obligatorio
    if (rules.required && trimmedDate.length === 0) {
        return errorsMessages.empty;
    }

    // Si no hay errores, devolver null
    return null;
};

export const validateCard = (
    cardNumber,
    rules = { required: true, length: 6, format: true }
) => {
    const trimmedCardNumber = cardNumber.trim();
    const errorsMessages = {
        empty: "El campo es obligatorio.",
        format: "El valor debe contener solo números.",
        length: "El valor debe contener exactamente 6 dígitos.",
    };

    // Verificar si el campo es obligatorio
    if (rules.required && trimmedCardNumber.length === 0) {
        return errorsMessages.empty;
    }

    // Verificar que solo contenga números
    if (rules.format && !ONLY_NUMBERS_REGEX.test(trimmedCardNumber)) {
        return errorsMessages.format;
    }

    // Verificar que tenga exactamente 6 dígitos
    if (rules.length && trimmedCardNumber.length !== rules.length) {
        return errorsMessages.length;
    }

    // Si pasa todas las validaciones, no hay errores
    return null;
};

export const validatePhoneCode = (
    phoneCode,
    rules = { required: true, length: 6, format: true }
) => {
    const trimmedPhoneCode = phoneCode.trim();
    const errorsMessages = {
        empty: "El campo es obligatorio.",
        format: "El campo debe contener solo números.",
    };

    // Verificar si el campo es obligatorio
    if (rules.required && trimmedPhoneCode.length === 0) {
        return errorsMessages.empty;
    }

    // Verificar que solo contenga números
    if (rules.format && !ONLY_NUMBERS_REGEX.test(trimmedPhoneCode)) {
        return errorsMessages.format;
    }

    // Si pasa todas las validaciones, no hay errores
    return null;
};

export const validatePhoneNumber = (
    phoneNumber,
    rules = { required: true, length: 7, format: true }
) => {
    const trimmedPhoneNumber = phoneNumber.trim();
    const errorsMessages = {
        empty: "El campo es obligatorio.",
        format: "El campo debe contener solo números.",
        length: "El campo debe contener exactamente 7 dígitos.",
    };

    // Verificar si el campo es obligatorio
    if (rules.required && trimmedPhoneNumber.length === 0) {
        return errorsMessages.empty;
    }

    // Verificar que solo contenga números
    if (rules.format && !ONLY_NUMBERS_REGEX.test(trimmedPhoneNumber)) {
        return errorsMessages.format;
    }

    // Verificar que tenga exactamente 7 dígitos
    if (rules.length && trimmedPhoneNumber.length !== rules.length) {
        return errorsMessages.length;
    }

    // Si pasa todas las validaciones, no hay errores
    return null;
};

export const validateTextInput = (
    textInput,
    rules = {
        required: true,
        maxLength: 100,
        startsWithLetter: true,
        format: true,
    }
) => {
    const trimmedValue = textInput.trim();
    const errorsMessages = {
        empty: "El campo es obligatorio.",
        tooLong: "El valor no puede exceder de 100 caracteres.",
        startsWithLetter: "El valor debe comenzar con una letra.",
        format: "Error, solo se permiten letras, números, puntos, comas, espacios, paréntesis y guiones.",
    };

    // Verificar si el campo está vacío
    if (rules.required && trimmedValue.length === 0) {
        return errorsMessages.empty;
    }

    // Verificar si el campo tiene más de 100 caracteres
    if (rules.maxLength && trimmedValue.length > rules.maxLength) {
        return errorsMessages.tooLong;
    }

    // Verificar si el campo comienza con una letra
    if (
        rules.startsWithLetter &&
        !TEXT_INPUT_STARTS_WITH_LETTER_REGEX.test(trimmedValue)
    ) {
        return errorsMessages.startsWithLetter;
    }

    // Validar el formato permitido
    if (rules.format && !TEXT_INPUT_FORMAT_REGEX.test(trimmedValue)) {
        return errorsMessages.format;
    }

    // Si pasa todas las validaciones, no hay errores
    return null;
};
