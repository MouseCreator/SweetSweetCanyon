
export const isValidPhone = (phone) => {
    // regex to validate phone number
    // optionally starts with '+'
    // must contain at least 2 digits
    // may contain ( ) - [space]
    const phoneRegex = /^[+]?[\d\s()-]+$/;

    if(!phoneRegex.test(phone)) {
        return false;
    }
    const digitCount = phone.replace(/[^\d]/g, '').length;
    return digitCount >= 2;
}
export const mapPhone = (phone) => {
    if (!isValidEmail(phone)) {
        return null; // Return null if the phone number is invalid
    }
    return phone.replace(/[^\d]/g, '');
}

export const isValidEmail = (email) => {
    // regex to validate email
    // [str]@[str].[str]
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
}
export const mapEmail = (email) => {
    if (!isValidEmail(email)) {
        return null; // Return null if the email is invalid
    }
    return email.replace(/\./g, '');
}

export const trimStringInput = (str) => {
    if (str === null) {
        return null;
    }
    return str.trim()
}