// Solo letras, números, guiones bajos y puntos
export const REGEX_USERNAME_FORMAT = /^[a-zA-Z0-9_.]+$/;
// Inicia con un número
export const REGEX_USERNAME_STARTS_WITH_NUMBER = /^\d/;

export const ONLY_NUMBERS_REGEX = /^\d+$/;

// Expresión regular para validar el formato permitido
export const TEXT_INPUT_FORMAT_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑãõÃÕ0-9\s(),.-]+$/;

// Expresión regular para verificar que el texto comience con una letra
export const TEXT_INPUT_STARTS_WITH_LETTER_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑãõÃÕ]/;

// Expresiones para el establecimiento de contraseñas
export const LOWERCASE_REGEX = /[a-z]/;
export const UPPERCASE_REGEX = /[A-Z]/;
export const DIGIT_REGEX = /\d/;
export const SPECIAL_CHAR_REGEX = /[.!#$%&()*+-]/;
export const INVALID_SPECIAL_CHAR_REGEX = /[^a-zA-Z0-9.!#$%&()*+-]/;

// Expresión regular para verificar el formato del correo
export const EMAIL_REGEX = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

// Expresión regular para validar que el valor contenga al menos una letra

export const REGEX_CONTAINS_LETTER = /[a-zA-Z]/;
