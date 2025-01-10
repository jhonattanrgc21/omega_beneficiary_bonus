import { REGEX_USERNAME_FORMAT, REGEX_USERNAME_STARTS_WITH_NUMBER } from "@constants/regex";

export const validateUsername = (username, rules = { required: true, minLength: true, format: true, startsWithNumber: true }) => {
    const trimmedUsername = username.trim();
    const errorsMessages = {
        empty: 'El campo es obligatorio.',
        tooShort: 'El campo debe tener al menos 3 caracteres.',
        format: 'Error, solo se permiten letras, números, guiones bajos y puntos.',
        startsWithNumber: 'El valor no puede iniciar con un número.',
    };

    if (rules.required && trimmedUsername.length === 0) {
        return errorsMessages.empty;
    }

    if (rules.format && !REGEX_USERNAME_FORMAT.test(trimmedUsername)) {
        return errorsMessages.format;
    }

    if (rules.startsWithNumber && REGEX_USERNAME_STARTS_WITH_NUMBER.test(trimmedUsername)) {
        return errorsMessages.startsWithNumber;
    }

    if (rules.minLength && trimmedUsername.length < 3) {
        return errorsMessages.tooShort;
    }

    return null;
};

export const validatePassword = (password, rules = { required: true, minLength: true }) => {
    const trimmedPassword = password.trim();
    const errorsMessages = {
        empty: 'La contraseña es obligatoria.',
        tooShort: 'La contraseña debe tener al menos 8 caracteres.',
    };

    if (rules.required && trimmedPassword.length === 0) {
        return errorsMessages.empty;
    }

    if (rules.minLength && trimmedPassword.length < 8) {
        return errorsMessages.tooShort;
    }

    return null;
};
