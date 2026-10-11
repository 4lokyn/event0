export function applyServerErrors(fieldErrors, setError, fields) {
    let first = true;

    Object.entries(fieldErrors).forEach(([field, messages]) => {
        if (!fields.includes(field)) return;   // preskoči polja koja forma nema

        setError(field, { type: 'server', message: messages[0] }, { shouldFocus: first });
        first = false;
    });
}