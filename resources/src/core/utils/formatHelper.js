export const formatDate = (dateString, outputFormat) => {
    const [day, month, year] = dateString.split(/[-/]/); // Divide la fecha sin importar el separador

    const dateParts = {
        DD: day,
        MM: month,
        YYYY: year,
    };

    return outputFormat.replace(/YYYY|MM|DD/g, (match) => dateParts[match]);
};

export const capitalizeWords = (str) => {
    return str
        .split(" ")
        .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
};
